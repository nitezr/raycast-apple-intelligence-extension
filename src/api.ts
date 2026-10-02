import { closeMainWindow, getPreferenceValues, showToast, Toast } from "@raycast/api";
import { runAppleScript } from "@raycast/utils";
import { escapeAppleScriptString } from "./applescript";
import Preferences from "./Preferences";

/** Opens the system Writing Tools panel for the selected text, through the frontmost app's Edit menu. */
export async function showWritingTools() {
  const preferences = getPreferenceValues<Preferences>();
  const localizedEdit = escapeAppleScriptString(preferences.localizedEdit);
  const localizedWritingTools = escapeAppleScriptString(preferences.localizedWritingTools);

  await closeMainWindow();

  try {
    await runAppleScript(`
      tell application "System Events"
        try
          tell (first process whose frontmost is true)
            click menu bar item "${localizedEdit}" of menu bar 1
            set writingToolsItem to menu item "${localizedWritingTools}" of menu "${localizedEdit}" of menu bar item "${localizedEdit}" of menu bar 1
            click writingToolsItem
            click menu item 1 of menu 1 of writingToolsItem
          end tell
        on error
          key code 53 -- Press "escape" key
          error "Failed to show Writing Tools"
        end try
      end tell
      `);
  } catch (error) {
    console.error(error);

    await showToast({
      title: "Failed to show Writing Tools",
      message: "This app doesn't show Writing Tools in its Edit menu.",
      style: Toast.Style.Failure,
    });
  }
}
