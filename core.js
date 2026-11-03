(() => {
  const API = "/backend-api";
  const idPattern = /^[a-zA-Z0-9_-]{1,128}$/;
  async function request(fetcher, path, options = {}) {
    const response = await fetcher(path, {credentials: "same-origin", ...options});
    if (!response.ok) throw new Error(`Request failed (${response.status}). ${response.status === 401 || response.status === 403 ? "Please sign in or refresh ChatGPT." : "Try again later."}`);
    return response;
  }
  async function getToken(fetcher) {
    const response = await request(fetcher, "/api/auth/session", {cache: "no-store"});
    const session = await response.json();
    if (typeof session.accessToken !== "string" || !session.accessToken) throw new Error("Could not access your ChatGPT session. Refresh the page and sign in again.");
    return session.accessToken;
  }
  async function listPage(fetcher, token, offset, limit = 100) {
    const response = await request(fetcher, `${API}/conversations?offset=${offset}&limit=${limit}&order=updated`, {headers: {Authorization: `Bearer ${token}`}, cache: "no-store"});
    const data = await response.json();
    if (!Array.isArray(data.items)) throw new Error("ChatGPT returned an unexpected chat list. No chats were deleted.");
    return data.items.map(item => {
      if (!item || typeof item.id !== "string" || !idPattern.test(item.id)) throw new Error("ChatGPT returned an invalid chat ID. No chats were deleted.");
      return {id: item.id, title: typeof item.title === "string" && item.title.trim() ? item.title : "Untitled chat", updated: item.update_time || ""};
    });
  }
  async function deleteChat(fetcher, token, id) {
    if (!idPattern.test(id)) throw new Error("Invalid chat ID; deletion stopped.");
    const response = await request(fetcher, `${API}/conversation/${encodeURIComponent(id)}`, {method: "PATCH", headers: {Authorization: `Bearer ${token}`, "Content-Type": "application/json"}, body: JSON.stringify({is_visible: false})});
    let result;
    try { result = await response.json(); } catch { throw new Error("Could not verify ChatGPT's response. Check the chat list before retrying."); }
    if (!result || result.success !== true) throw new Error("ChatGPT did not confirm deletion. Check the chat list before retrying.");
  }
  globalThis.BulkChatCore = {getToken, listPage, deleteChat};
})();