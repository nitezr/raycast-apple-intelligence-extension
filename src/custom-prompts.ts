import { useLocalStorage } from "@raycast/utils";

export type CustomPrompt = {
  id: string;
  title: string;
  instructions: string;
};

export function useCustomPrompts() {
  const { value, setValue, isLoading } = useLocalStorage<CustomPrompt[]>("customPrompts", []);
  const prompts = value ?? [];

  return {
    prompts,
    isLoading,
    save: (prompt: CustomPrompt) => {
      const exists = prompts.some((p) => p.id === prompt.id);
      return setValue(exists ? prompts.map((p) => (p.id === prompt.id ? prompt : p)) : [...prompts, prompt]);
    },
    remove: (id: string) => setValue(prompts.filter((p) => p.id !== id)),
  };
}
