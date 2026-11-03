# ChatGPT Bulk Delete

Select multiple ChatGPT conversations, review their titles, and delete them one at a time from one panel. Works as an unpacked extension for Chrome and Microsoft Edge.

> **Status:** The selection and deletion flow has been tested with simulated responses. Actual deletion on a live ChatGPT account has not yet been verified. Test with one expendable conversation first. ChatGPT can change its unofficial web interface at any time.

## Install

1. On this GitHub repository, click **Code → Download ZIP**. Extract the downloaded ZIP. Alternatively, clone the repository.
2. In Chrome, open `chrome://extensions`. In Edge, open `edge://extensions`.
3. Turn on **Developer mode**, then click **Load unpacked**.
4. Select the extracted project folder containing `manifest.json`.
5. Open or refresh [ChatGPT](https://chatgpt.com/) and sign in. Click the extensions puzzle-piece icon, then **ChatGPT Bulk Delete**. You can pin it to your toolbar.

The extension is not currently available in a browser extension store. Keep the extracted folder on your computer; removing it will break the installation.

## Use

1. On `chatgpt.com`, open the extension and click **Load chats**. Click **Load more** to fetch older chats.
2. Check individual chats, or filter loaded titles and click **Select visible**. Filtering does not search chats that haven't been loaded. Archived chats may not appear.
3. Click **Review deletion**, check every selected title, then choose **Delete permanently**. Deletion cannot be undone.
4. Refresh ChatGPT to update its sidebar. If a request fails, the extension stops. Check your chat list before retrying; a failed or interrupted request may have completed on the server even if the extension could not confirm it.

## Privacy and permissions

The extension requests `activeTab` and `scripting` permissions so it can open its panel on the ChatGPT tab after you click its toolbar button. It accesses the current ChatGPT session token in memory to request conversation titles and delete selected chats. It makes its requests to `chatgpt.com`; the code contains no analytics or third-party data collection. It does not store the token or chat titles in extension storage. Read the source before installing if you want to verify this yourself.

Do not post screenshots, diagnostic logs, authentication tokens, or exported chat data in public issues. The repository's source code is not a chat backup.

## Limitations

- This is an independent project, not affiliated with or endorsed by OpenAI.
- It relies on undocumented ChatGPT web endpoints that can change, fail, or behave differently for different accounts and workspaces. Availability is not guaranteed.
- Selection covers only chats actually loaded into the panel. It does not automatically load all chats.
- ChatGPT's own retention policies apply after deletion.

## Updating

Download and extract a newer version, then open your browser's extensions page and reload the extension. If you replaced the folder path, remove the old extension and use **Load unpacked** again.
