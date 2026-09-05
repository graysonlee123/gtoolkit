import { useCallback, useState } from "react";
import { Action, ActionPanel, Icon, List } from "@vicinae/api";
import { randomBytes, randomUUID } from "crypto";

const NIL = "00000000-0000-0000-0000-000000000000";

function uuidv7(): string {
  const bytes = randomBytes(16);
  const ts = Date.now();
  bytes[0] = Math.floor(ts / 2 ** 40) & 0xff;
  bytes[1] = Math.floor(ts / 2 ** 32) & 0xff;
  bytes[2] = Math.floor(ts / 2 ** 24) & 0xff;
  bytes[3] = Math.floor(ts / 2 ** 16) & 0xff;
  bytes[4] = Math.floor(ts / 2 ** 8) & 0xff;
  bytes[5] = ts & 0xff;
  bytes[6] = (bytes[6] & 0x0f) | 0x70; // version 7
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant
  const h = bytes.toString("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

type Item = { id: string; value: string; subtitle: string };

function build(): Item[] {
  const v4 = randomUUID();
  const v7 = uuidv7();
  return [
    { id: "v4", value: v4, subtitle: "UUID v4 (random)" },
    { id: "v4-upper", value: v4.toUpperCase(), subtitle: "UUID v4 (uppercase)" },
    { id: "v4-nodash", value: v4.replace(/-/g, ""), subtitle: "UUID v4 (no dashes)" },
    { id: "v7", value: v7, subtitle: "UUID v7 (time-ordered)" },
    { id: "nil", value: NIL, subtitle: "Nil UUID" },
  ];
}

export default function Command() {
  const [items, setItems] = useState<Item[]>(build);
  const regenerate = useCallback(() => setItems(build()), []);

  return (
    <List searchBarPlaceholder="Filter variants…">
      {items.map((it) => (
        <List.Item
          key={it.id}
          title={it.value}
          subtitle={it.subtitle}
          icon={Icon.Fingerprint}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard title="Copy" content={it.value} />
              <Action.Paste title="Paste to Active App" content={it.value} />
              <Action
                title="Regenerate"
                icon={Icon.ArrowClockwise}
                shortcut={{ modifiers: ["cmd"], key: "r" }}
                onAction={regenerate}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
