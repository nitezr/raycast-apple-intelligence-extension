# Apple Intelligence Changelog

## [Direct Model Access] - {PR_MERGE_DATE}

Writing tools now call Apple's on-device model directly through the Foundation Models framework, instead of clicking through the Edit menu. Requires macOS 26 or later.

- **⚡️ Direct model access**: Proofread, Rewrite, Summarize, and the other writing tools run on the selected text (or the clipboard) and show the result in Raycast, ready to paste or copy. They work in any app, including apps without Writing Tools in their Edit menu
- **✍️ Custom prompts**: Create your own writing tools from List Writing Tools
- **💬 Ask Apple Intelligence**: Chat with the on-device model
- **🖊️ Compose**: Now writes new text from your request with the on-device model
- **👁️ Visual Intelligence**: New command to ask about what's on your screen (macOS Golden Gate)
- **🐛 Create Image**: Prompts containing quotes no longer break the command
- Updated Raycast dependencies

## [Localization] - 2025-05-01

This update introduces localization for the extension.

Through the extension's preferences, you can now configure the extension to use a locale that is not English. In particular, correctly accessing Apple Intelligence requires the edit menu's name, the translation for _Writing Tools_, and the translation for _Show Writing Tools_. 

## [macOS 15.2 Update] - 2024-12-17

A few goodies for macOS Sequoia 15.2!

### What's new?

- **🖼️ Create Image**: Directly create a original image in Image Playground, with the new Create Image command
- **🖊️ Compose**: You can now use the Compose Writing Tool, to collaborate with ChatGPT on your writing

## [Initial Version] - 2024-11-06

Introducing the Apple Intelligence extension for Raycast!

### Writing Tool Commands

Access Apple Intelligence Writing Tool commands, directly from the comfort of Raycast.

Apple won't give you hotkeys for Writing Tools, but that's not a problem... assign a hotkey to these commands, and use Apple Intelligence with hotkeys!

### List Writing Tools

Find all the writing tools in one place! In this list view, you can Pin and rearrange your favorite Writing Tools.

It also displays whether the Writing Tools are local, or run with Private Cloud Compute (server).
