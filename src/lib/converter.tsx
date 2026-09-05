import { useMemo, useState } from "react";
import { Action, ActionPanel, Form } from "@vicinae/api";

export type Mode = { value: string; title: string };

export type ConverterProps = {
  inputTitle?: string;
  inputPlaceholder?: string;
  modes?: Mode[];
  defaultMode?: string;
  /** Return output string, or throw to surface an error under the output field. */
  transform: (input: string, mode: string) => string;
};

/**
 * Generic live converter: dropdown (optional) + input textarea + readonly output.
 * Recomputes on every keystroke; errors show under the output field.
 */
export function Converter({
  inputTitle = "Input",
  inputPlaceholder,
  modes,
  defaultMode,
  transform,
}: ConverterProps) {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState(defaultMode ?? modes?.[0]?.value ?? "");

  const { output, error } = useMemo(() => {
    try {
      return { output: transform(input, mode), error: undefined as string | undefined };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : String(e) };
    }
  }, [input, mode, transform]);

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.CopyToClipboard title="Copy Output" content={output} />
          <Action.Paste title="Paste Output to Active App" content={output} />
        </ActionPanel>
      }
    >
      {modes && modes.length > 0 && (
        <Form.Dropdown id="mode" title="Mode" value={mode} onChange={setMode}>
          {modes.map((m) => (
            <Form.Dropdown.Item key={m.value} value={m.value} title={m.title} />
          ))}
        </Form.Dropdown>
      )}
      <Form.TextArea
        id="input"
        title={inputTitle}
        placeholder={inputPlaceholder}
        value={input}
        onChange={setInput}
      />
      {/* Output is display-only. A TextArea can't be updated programmatically —
          Vicinae gates controlled `value` behind an eventCount that only advances
          on the field's own onChange. Form.Description has no such gate. */}
      <Form.Description
        title="Output"
        text={input && error ? `⚠ ${error}` : output || " "}
      />
    </Form>
  );
}
