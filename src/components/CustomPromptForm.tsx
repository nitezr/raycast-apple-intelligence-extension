import { Action, ActionPanel, Form, useNavigation } from "@raycast/api";
import { randomUUID } from "crypto";
import { CustomPrompt } from "../custom-prompts";

type Props = {
  prompt?: CustomPrompt;
  onSave: (prompt: CustomPrompt) => Promise<void>;
};

export default function CustomPromptForm({ prompt, onSave }: Props) {
  const { pop } = useNavigation();

  return (
    <Form
      navigationTitle={prompt ? "Edit Prompt" : "New Prompt"}
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Save Prompt"
            onSubmit={async (values: { title: string; instructions: string }) => {
              await onSave({ id: prompt?.id ?? randomUUID(), title: values.title, instructions: values.instructions });
              pop();
            }}
          />
        </ActionPanel>
      }
    >
      <Form.TextField id="title" title="Name" placeholder="Translate to Hindi" defaultValue={prompt?.title} />
      <Form.TextArea
        id="instructions"
        title="Instructions"
        placeholder="Translate the user's text into Hindi. Reply with only the translation."
        info="Tells the model what to do with the selected text."
        defaultValue={prompt?.instructions}
      />
    </Form>
  );
}
