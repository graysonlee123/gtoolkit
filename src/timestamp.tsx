import { Converter } from "./lib/converter";

function fromUnix(raw: string): string {
  const digits = raw.trim();
  if (!/^-?\d+$/.test(digits)) throw new Error("Enter an integer Unix timestamp");
  const n = Number(digits);
  // <= 10 digits → seconds, otherwise milliseconds.
  const ms = digits.replace("-", "").length <= 10 ? n * 1000 : n;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) throw new Error("Out of range");
  return [
    `ISO (UTC):   ${d.toISOString()}`,
    `Local:       ${d.toString()}`,
    `Unix (s):    ${Math.floor(ms / 1000)}`,
    `Unix (ms):   ${ms}`,
  ].join("\n");
}

function toUnix(raw: string): string {
  const d = new Date(raw.trim());
  if (Number.isNaN(d.getTime())) throw new Error("Unrecognized date string");
  const ms = d.getTime();
  return [
    `Unix (s):    ${Math.floor(ms / 1000)}`,
    `Unix (ms):   ${ms}`,
    `ISO (UTC):   ${d.toISOString()}`,
  ].join("\n");
}

export default function Command() {
  return (
    <Converter
      inputTitle="Value"
      inputPlaceholder="1700000000  or  2023-11-14T22:13:20Z"
      modes={[
        { value: "from-unix", title: "Unix → Date" },
        { value: "to-unix", title: "Date → Unix" },
      ]}
      transform={(input, mode) => {
        if (!input.trim()) return "";
        return mode === "from-unix" ? fromUnix(input) : toUnix(input);
      }}
    />
  );
}
