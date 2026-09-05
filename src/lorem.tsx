import { useMemo, useState } from "react";
import { Action, ActionPanel, Form, Icon } from "@vicinae/api";

const WORDS =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(
    " ",
  );

const CLASSIC =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const rand = (n: number) => Math.floor(Math.random() * n);
const word = () => WORDS[rand(WORDS.length)];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function words(n: number): string {
  return Array.from({ length: n }, word).join(" ");
}

function sentence(): string {
  const n = 6 + rand(9); // 6–14 words
  const parts = Array.from({ length: n }, word);
  // sprinkle a comma somewhere in the middle
  if (n > 6 && rand(2)) {
    const at = 2 + rand(n - 4);
    parts[at] = parts[at] + ",";
  }
  return cap(parts.join(" ")) + ".";
}

function paragraph(): string {
  const n = 3 + rand(4); // 3–6 sentences
  return Array.from({ length: n }, sentence).join(" ");
}

function generate(unit: string, count: number, classic: boolean): string {
  const n = Math.max(1, Math.min(count || 1, 500));
  if (unit === "words") {
    const body = words(n);
    return classic ? cap(body) : body;
  }
  if (unit === "sentences") {
    const out = Array.from({ length: n }, sentence);
    if (classic) out[0] = CLASSIC;
    return out.join(" ");
  }
  const out = Array.from({ length: n }, paragraph);
  if (classic) out[0] = CLASSIC + " " + out[0];
  return out.join("\n\n");
}

export default function Command() {
  const [unit, setUnit] = useState("paragraphs");
  const [count, setCount] = useState("3");
  const [classic, setClassic] = useState(true);
  const [seed, setSeed] = useState(0);

  const output = useMemo(
    () => generate(unit, parseInt(count, 10), classic),
    [unit, count, classic, seed],
  );

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.CopyToClipboard title="Copy Text" content={output} />
          <Action.Paste title="Paste to Active App" content={output} />
          <Action
            title="Regenerate"
            icon={Icon.ArrowClockwise}
            shortcut={{ modifiers: ["cmd"], key: "r" }}
            onAction={() => setSeed((s) => s + 1)}
          />
        </ActionPanel>
      }
    >
      <Form.Dropdown id="unit" title="Unit" value={unit} onChange={setUnit}>
        <Form.Dropdown.Item value="paragraphs" title="Paragraphs" />
        <Form.Dropdown.Item value="sentences" title="Sentences" />
        <Form.Dropdown.Item value="words" title="Words" />
      </Form.Dropdown>
      <Form.TextField
        id="count"
        title="Amount"
        placeholder="3"
        value={count}
        onChange={setCount}
      />
      <Form.Checkbox
        id="classic"
        label="Start with classic “Lorem ipsum…”"
        value={classic}
        onChange={setClassic}
      />
      {/* key={output} forces remount so the passive field picks up new value;
          Vicinae only applies controlled `value` when the field's own eventCount advances. */}
      <Form.TextArea key={output} id="output" title="Output" value={output} />
    </Form>
  );
}
