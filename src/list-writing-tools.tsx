import { Action, ActionPanel, Alert, confirmAlert, Icon, List } from "@raycast/api";
import { useLocalStorage } from "@raycast/utils";
import CustomPromptForm from "./components/CustomPromptForm";
import ResultView from "./components/ResultView";
import { CustomPrompt, useCustomPrompts } from "./custom-prompts";
import { writingTools } from "./writing-tools";

type Item = {
  key: string;
  title: string;
  icon: Icon;
  section: string;
  instructions: string;
  temperature?: number;
  custom?: CustomPrompt;
};

export default function Command() {
  const { prompts, isLoading: isLoadingPrompts, save, remove } = useCustomPrompts();
  const {
    value: storedPins,
    setValue: setPins,
    isLoading: isLoadingPins,
  } = useLocalStorage<string[]>("pinnedCommands", []);
  const pins = storedPins ?? [];

  const items: Item[] = [
    ...writingTools.map((tool) => ({
      key: tool.title,
      title: tool.title,
      icon: tool.icon,
      section: tool.category,
      instructions: tool.instructions,
      temperature: tool.temperature,
    })),
    ...prompts.map((prompt) => ({
      key: `custom:${prompt.id}`,
      title: prompt.title,
      icon: Icon.Stars,
      section: "Custom Prompts",
      instructions: prompt.instructions,
      custom: prompt,
    })),
  ];

  const togglePin = (key: string) => setPins(pins.includes(key) ? pins.filter((p) => p !== key) : [...pins, key]);

  const movePin = (key: string, direction: "up" | "down") => {
    const index = pins.indexOf(key);
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (index === -1 || newIndex < 0 || newIndex >= pins.length) return;
    const updated = [...pins];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setPins(updated);
  };

  const newPromptAction = (
    <Action.Push
      title="New Custom Prompt"
      icon={Icon.Plus}
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      target={<CustomPromptForm onSave={save} />}
    />
  );

  const renderItem = (item: Item, pinned: boolean) => (
    <List.Item
      key={item.key}
      title={item.title}
      icon={item.icon}
      accessories={[{ text: "On Device", icon: Icon.HardDrive }]}
      actions={
        <ActionPanel>
          <Action.Push
            title="Run"
            icon={item.icon}
            target={<ResultView title={item.title} instructions={item.instructions} temperature={item.temperature} />}
          />
          <Action
            title={pinned ? "Unpin" : "Pin"}
            icon={pinned ? Icon.PinDisabled : Icon.Pin}
            shortcut={{ modifiers: ["cmd", "shift"], key: "p" }}
            onAction={() => togglePin(item.key)}
          />
          {pinned && (
            <>
              <Action
                title="Move Pin Up"
                icon={Icon.ArrowUp}
                shortcut={{ modifiers: ["cmd", "shift"], key: "arrowUp" }}
                onAction={() => movePin(item.key, "up")}
              />
              <Action
                title="Move Pin Down"
                icon={Icon.ArrowDown}
                shortcut={{ modifiers: ["cmd", "shift"], key: "arrowDown" }}
                onAction={() => movePin(item.key, "down")}
              />
            </>
          )}
          {newPromptAction}
          {item.custom && (
            <>
              <Action.Push
                title="Edit Custom Prompt"
                icon={Icon.Pencil}
                shortcut={{ modifiers: ["cmd"], key: "e" }}
                target={<CustomPromptForm prompt={item.custom} onSave={save} />}
              />
              <Action
                title="Delete Custom Prompt"
                icon={Icon.Trash}
                style={Action.Style.Destructive}
                shortcut={{ modifiers: ["ctrl"], key: "x" }}
                onAction={async () => {
                  const confirmed = await confirmAlert({
                    title: `Delete "${item.title}"?`,
                    primaryAction: { title: "Delete", style: Alert.ActionStyle.Destructive },
                  });
                  if (confirmed) await remove(item.custom!.id);
                }}
              />
            </>
          )}
        </ActionPanel>
      }
    />
  );

  const pinnedItems = pins.map((key) => items.find((item) => item.key === key)).filter((item) => item !== undefined);
  const sections = ["Improve", "Transform", "Custom Prompts"];

  return (
    <List isLoading={isLoadingPrompts || isLoadingPins} actions={<ActionPanel>{newPromptAction}</ActionPanel>}>
      {pinnedItems.length > 0 && (
        <List.Section title="Pinned">{pinnedItems.map((i) => renderItem(i, true))}</List.Section>
      )}
      {sections.map((section) => (
        <List.Section key={section} title={section}>
          {items.filter((i) => i.section === section && !pins.includes(i.key)).map((i) => renderItem(i, false))}
        </List.Section>
      ))}
      <List.EmptyView title="No Writing Tools" />
    </List>
  );
}
