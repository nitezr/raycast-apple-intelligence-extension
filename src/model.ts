import { generate, chat } from "swift:../swift";

export type ChatMessage = { role: "user" | "assistant"; content: string };

export async function runPrompt(prompt: string, instructions: string, temperature?: number): Promise<string> {
  const result: string = await generate(prompt, instructions, temperature);
  return result.trim();
}

export async function runChat(messages: ChatMessage[], instructions: string): Promise<string> {
  const result: string = await chat(messages, instructions);
  return result.trim();
}
