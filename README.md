# Apple Intelligence On-Device

Proofread, rewrite, summarize, and chat with Apple's on-device model, right from Raycast.

Writing tools run on Apple's on-device model through the Foundation Models framework, so text stays on your Mac and works in any app.

## Requirements

- macOS 26 or later on a Mac that supports Apple Intelligence
- Apple Intelligence turned on in System Settings → Apple Intelligence & Siri
- Visual Intelligence needs macOS Golden Gate (macOS 27)

## Install

This extension isn't in the Raycast Store, so you install it from source. It takes about 10 minutes the first time.

1. Install [Raycast](https://raycast.com), [Node.js](https://nodejs.org) 22 or later, and Xcode 26 or later from the Mac App Store
2. Clone and run it:

   ```sh
   git clone https://github.com/nitezr/raycast-apple-intelligence-extension.git
   cd raycast-apple-intelligence-extension
   npm install && npm run dev
   ```

3. Wait for `built extension successfully`. The commands now appear in Raycast
4. Press `Ctrl+C` to stop. The extension stays installed in Raycast

To update later, run `git pull && npm install && npm run dev` in the same folder.

## Commands

- **Proofread, Rewrite, Make Friendly, Make Professional, Make Concise, Summarize, Create Key Points, Make List, Make Table**: run on the selected text, or the clipboard when nothing is selected
- **Compose**: write new text from a request
- **List Writing Tools**: browse every tool, pin favorites, and create custom prompts
- **Ask Apple Intelligence**: chat with the on-device model
- **Show Writing Tools**: open the system Writing Tools panel
- **Create Image**: open Image Playground with a prompt
- **Visual Intelligence**: ask about what's on your screen

Assign hotkeys to any command to use Apple Intelligence without leaving the keyboard.
