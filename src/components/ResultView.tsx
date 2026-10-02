import { Action, ActionPanel, Detail, getPreferenceValues, Icon } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { useState } from "react";
import { getInputText } from "../input";
import { runPrompt } from "../model";
import Preferences from "../Preferences";

type Props = {
  title: string;
  instructions: string;
  temperature?: number;
  /** Text to work on. When omitted, the selected text (or the clipboard) is used. */
  input?: string;
};

export default function ResultView({ title, instructions, temperature, input }: Props) {
  const { primaryAction } = getPreferenceValues<Preferences>();
  const [showOriginal, setShowOriginal] = useState(false);

  const { data, isLoading, error, revalidate } = usePromise(
    async (text?: string) => {
      const original = text ?? (await getInputText()).text;
      const output = await runPrompt(original, instructions, temperature);
      return { original, output };
    },
    [input],
  );

  const markdown = error
    ? `## Couldn't run ${title}\n\n${error.message}`
    : data
      ? showOriginal
        ? `${data.output}\n\n---\n\n**Original**\n\n${data.original}`
        : data.output
      : "";

  const paste = data && <Action.Paste key="paste" title="Paste Result" content={data.output} />;
  const copy = data && <Action.CopyToClipboard key="copy" title="Copy Result" content={data.output} />;

  return (
    <Detail
      navigationTitle={title}
      isLoading={isLoading}
      markdown={markdown}
      actions={
        <ActionPanel>
          {primaryAction === "copy" ? [copy, paste] : [paste, copy]}
          <Action
            title="Try Again"
            icon={Icon.ArrowClockwise}
            shortcut={{ modifiers: ["cmd"], key: "r" }}
            onAction={revalidate}
          />
          {data && (
            <Action
              title={showOriginal ? "Hide Original" : "Show Original"}
              icon={Icon.Eye}
              shortcut={{ modifiers: ["cmd"], key: "o" }}
              onAction={() => setShowOriginal(!showOriginal)}
            />
          )}
        </ActionPanel>
      }
    />
  );
}
