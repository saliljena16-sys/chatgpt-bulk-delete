# ChatGPT Bulk Delete

I made this extension because deleting ChatGPT chats one at a time gets annoying. It lets you select a bunch of chats and delete them together.

It works in Chrome and Microsoft Edge.

## How to install

1. Click the green **Code** button at the top of this page, then click **Download ZIP**.
2. Extract the ZIP file.
3. Open a new tab and go to:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
4. Turn on **Developer mode**, then click **Load unpacked**.
5. Choose the extracted folder that contains the `manifest.json` file.
6. Open or refresh [ChatGPT](https://chatgpt.com/). Click the puzzle piece in your browser's toolbar, then select **ChatGPT Bulk Delete**.

You can pin the extension to your toolbar to make it easier to find. Keep the extracted folder on your computer so the extension keeps working.

## How to use it

1. Open ChatGPT and click the extension.
2. Click **Load chats**. If you want to see older chats, click **Load more**.
3. Check the chats you want to delete. You can also search through the chats you've loaded and click **Select visible**.
4. Click **Review deletion**, check the list, and then click **Delete permanently**.
5. Refresh ChatGPT to update your sidebar.

**Deleted chats can't be recovered**, so double-check the list before confirming. If the extension stops because of an error, check your chat history before trying again. A request might have gone through even if the extension couldn't confirm it.

## Privacy

The extension uses your ChatGPT session to load your chat titles and delete the chats you select. It sends requests to ChatGPT, doesn't use analytics, and doesn't save your session token or chat titles in extension storage. You can check the code yourself.

It asks for permission to run on the active tab when you click the extension. You don't need to enter your password into it.

## A few things to know

- Search only looks through chats you've already loaded. Archived chats might not show up.
- I tested an earlier version on a real ChatGPT account. The later changes were tested with simulated responses, so try it with a chat you don't need first.
- This extension uses parts of ChatGPT's website that could change, so it might need updates in the future.
- This is a personal project and isn't affiliated with OpenAI.

If you run into a problem, feel free to open an issue. Please don't include your login details, session token, private chats, or screenshots with personal information.

## Updating

Download and extract the new version, then reload the extension from your browser's extensions page. If the folder is in a different location, remove the old extension and use **Load unpacked** again.
