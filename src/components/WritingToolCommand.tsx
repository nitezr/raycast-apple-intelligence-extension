import { getWritingTool } from "../writing-tools";
import ResultView from "./ResultView";

export default function WritingToolCommand({ id }: { id: string }) {
  const tool = getWritingTool(id);
  return <ResultView title={tool.title} instructions={tool.instructions} temperature={tool.temperature} />;
}
