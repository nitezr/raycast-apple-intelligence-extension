import { closeMainWindow, showToast, Toast } from "@raycast/api";
import { runAppleScript } from "@raycast/utils";

export default async function main() {
  await closeMainWindow();

  try {
    // macOS Golden Gate opens Visual Intelligence with Command-Shift-Space
    await runAppleScript(`
      tell application "System Events"
        key code 49 using {command down, shift down}
      end tell
      `);
  } catch (error) {
    console.error(error);

    await showToast({ title: "Failed to open Visual Intelligence", style: Toast.Style.Failure });
  }
}
