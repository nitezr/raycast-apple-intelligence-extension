import { LaunchProps } from "@raycast/api";
import ResultView from "./components/ResultView";

const INSTRUCTIONS =
  "You are a writing assistant. Write the text the user asks for. Reply with only the text itself, ready to paste, without an introduction or closing remarks.";

export default function Command(props: LaunchProps<{ arguments: Arguments.Compose }>) {
  return <ResultView title="Compose" instructions={INSTRUCTIONS} input={props.arguments.request} />;
}
