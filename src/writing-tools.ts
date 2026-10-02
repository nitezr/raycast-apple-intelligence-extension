import { Icon } from "@raycast/api";

export type WritingTool = {
  id: string;
  title: string;
  icon: Icon;
  category: "Improve" | "Transform";
  instructions: string;
  temperature?: number;
};

const SHARED_RULES =
  "Reply with only the resulting text. Do not add an introduction, explanation, quotes, or closing remarks. Keep the language of the original text.";

export const writingTools: WritingTool[] = [
  {
    id: "proofread",
    title: "Proofread",
    icon: Icon.MagnifyingGlass,
    category: "Improve",
    instructions: `Fix spelling, grammar, and punctuation in the user's text. Change as little as possible and keep the author's wording and tone. ${SHARED_RULES}`,
    temperature: 0,
  },
  {
    id: "rewrite",
    title: "Rewrite",
    icon: Icon.ArrowCounterClockwise,
    category: "Improve",
    instructions: `Rewrite the user's text so it reads more clearly, keeping its meaning and tone. ${SHARED_RULES}`,
  },
  {
    id: "make-friendly",
    title: "Make Friendly",
    icon: Icon.Emoji,
    category: "Improve",
    instructions: `Rewrite the user's text in a warm, friendly, conversational tone, keeping its meaning. ${SHARED_RULES}`,
  },
  {
    id: "make-professional",
    title: "Make Professional",
    icon: Icon.Building,
    category: "Improve",
    instructions: `Rewrite the user's text in a polished, professional tone, keeping its meaning. ${SHARED_RULES}`,
  },
  {
    id: "make-concise",
    title: "Make Concise",
    icon: Icon.ShortParagraph,
    category: "Improve",
    instructions: `Rewrite the user's text to be as short as possible without losing any important information. ${SHARED_RULES}`,
  },
  {
    id: "summarize",
    title: "Summarize",
    icon: Icon.Document,
    category: "Transform",
    instructions: `Summarize the user's text in a short paragraph. ${SHARED_RULES}`,
  },
  {
    id: "create-key-points",
    title: "Create Key Points",
    icon: Icon.BulletPoints,
    category: "Transform",
    instructions: `List the key points of the user's text as a Markdown bulleted list. ${SHARED_RULES}`,
  },
  {
    id: "make-list",
    title: "Make List",
    icon: Icon.NumberList,
    category: "Transform",
    instructions: `Turn the user's text into a Markdown list, one item per idea, keeping the original wording where possible. ${SHARED_RULES}`,
  },
  {
    id: "make-table",
    title: "Make Table",
    icon: Icon.AppWindowGrid2x2,
    category: "Transform",
    instructions: `Turn the user's text into a Markdown table with sensible column headers. ${SHARED_RULES}`,
  },
];

export function getWritingTool(id: string) {
  const tool = writingTools.find((t) => t.id === id);
  if (!tool) throw new Error(`Unknown writing tool: ${id}`);
  return tool;
}
