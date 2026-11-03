chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id || !tab.url || !/^https:\/\/chatgpt\.com\//.test(tab.url)) return;
  try {
    await chrome.scripting.executeScript({target: {tabId: tab.id}, files: ["core.js", "panel.js"]});
  } catch (error) { console.error("Could not open ChatGPT Bulk Delete:", error); }
});