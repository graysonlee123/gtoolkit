import { Converter } from "./lib/converter";

function stats(input: string): string {
  if (input === "") return "";
  const words = input.trim().match(/\S+/g)?.length ?? 0;
  const lines = input.split(/\r\n|\r|\n/).length;
  const sentences = input.match(/[.!?]+(\s|$)/g)?.length ?? 0;
  const chars = [...input].length; // Unicode code points
  const noSpaces = [...input.replace(/\s/g, "")].length;
  const bytes = Buffer.byteLength(input, "utf8");

  const rows: [string, number][] = [
    ["Characters", chars],
    ["Characters (no spaces)", noSpaces],
    ["Words", words],
    ["Lines", lines],
    ["Sentences", sentences],
    ["Bytes (UTF-8)", bytes],
  ];
  return rows
    .map(([label, n]) => `${label}: ${n.toLocaleString()}`)
    .join("\n");
}

export default function Command() {
  return (
    <Converter inputPlaceholder="Paste or type text…" transform={stats} />
  );
}
