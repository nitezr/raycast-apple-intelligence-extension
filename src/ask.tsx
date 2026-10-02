import { Action, ActionPanel, Icon, List, showToast, Toast, Keyboard } from "@raycast/api";
import { useCachedState } from "@raycast/utils";
import { useState } from "react";
import { ChatMessage, runChat } from "./model";

const INSTRUCTIONS =
  "You are a helpful assistant running on the user's Mac with Apple Intelligence. Answer clearly and concisely. Use Markdown when it helps.";

// The on-device model has a small context window, so only the most recent turns are sent
const MAX_HISTORY = 8;

type Turn = { question: string; answer?: string };

export default function Command() {
  const [turns, setTurns] = useCachedState<Turn[]>("conversation", []);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string>();

  async function send() {
    const question = draft.trim();
    if (!question || isLoading) return;

    const history: ChatMessage[] = turns
      .filter((turn) => turn.answer !== undefined)
      .flatMap((turn): ChatMessage[] => [
        { role: "user", content: turn.question },
        { role: "assistant", content: turn.answer! },
      ])
      .slice(-MAX_HISTORY);

    const pending = [...turns, { question }];
    setTurns(pending);
    setDraft("");
    setSelectedId(String(pending.length - 1));
    setIsLoading(true);

    try {
      const answer = await runChat([...history, { role: "user", content: question }], INSTRUCTIONS);
      setTurns([...turns, { question, answer }]);
    } catch (error) {
      setTurns(turns);
      setDraft(question);
      await showToast({
        style: Toast.Style.Failure,
        title: "Couldn't get an answer",
        message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setIsLoading(false);
    }
  }

  const sendAction = <Action title="Send" icon={Icon.Message} onAction={send} />;
  const newConversationAction = (
    <Action
      title="New Conversation"
      icon={Icon.PlusCircle}
      shortcut={Keyboard.Shortcut.Common.New}
      onAction={() => {
        setTurns([]);
        setSelectedId(undefined);
      }}
    />
  );

  return (
    <List
      isLoading={isLoading}
      isShowingDetail={turns.length > 0}
      searchText={draft}
      onSearchTextChange={setDraft}
      filtering={false}
      searchBarPlaceholder={turns.length ? "Ask a follow-up..." : "Ask Apple Intelligence..."}
      selectedItemId={selectedId}
      onSelectionChange={(id) => setSelectedId(id ?? undefined)}
      actions={<ActionPanel>{sendAction}</ActionPanel>}
    >
      {turns.length === 0 ? (
        <List.EmptyView
          icon={Icon.Stars}
          title="Ask Apple Intelligence"
          description="Type a question and press Enter. Answers are generated on this Mac."
        />
      ) : (
        [...turns]
          .map((turn, index) => ({ turn, index }))
          .reverse()
          .map(({ turn, index }) => (
            <List.Item
              key={index}
              id={String(index)}
              title={turn.question}
              detail={<List.Item.Detail markdown={`**${turn.question}**\n\n${turn.answer ?? "_Thinking..._"}`} />}
              actions={
                <ActionPanel>
                  {draft.trim() && sendAction}
                  {turn.answer && <Action.CopyToClipboard title="Copy Answer" content={turn.answer} />}
                  {turn.answer && (
                    <Action.Paste
                      title="Paste Answer"
                      content={turn.answer}
                      shortcut={{ modifiers: ["cmd", "shift"], key: "v" }}
                    />
                  )}
                  {newConversationAction}
                </ActionPanel>
              }
            />
          ))
      )}
    </List>
  );
}
