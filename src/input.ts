import { Clipboard, getSelectedText } from "@raycast/api";

/** Returns the text selected in the frontmost app, or the clipboard text when nothing is selected. */
export async function getInputText(): Promise<{ text: string; source: "selection" | "clipboard" }> {
  try {
    const selected = await getSelectedText();
    if (selected.trim()) return { text: selected, source: "selection" };
  } catch {
    // No selection, fall back to the clipboard
  }

  const clipboard = await Clipboard.readText();
  if (clipboard?.trim()) return { text: clipboard, source: "clipboard" };

  throw new Error("Select some text, or copy it to the clipboard, and try again.");
}
