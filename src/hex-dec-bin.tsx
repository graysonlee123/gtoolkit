import { Converter } from "./lib/converter";

const PREFIX: Record<string, string> = { "16": "0x", "8": "0o", "2": "0b" };
const VALID: Record<string, RegExp> = {
  "16": /^[0-9a-f]+$/,
  "10": /^[0-9]+$/,
  "8": /^[0-7]+$/,
  "2": /^[01]+$/,
};

function detectBase(s: string): string {
  if (/^0x/i.test(s)) return "16";
  if (/^0o/i.test(s)) return "8";
  if (/^0b/i.test(s)) return "2";
  return "10";
}

function parse(raw: string, mode: string): bigint {
  let s = raw.trim().replace(/[_\s]/g, "");
  let neg = false;
  if (s.startsWith("-")) {
    neg = true;
    s = s.slice(1);
  }
  const base = mode === "auto" ? detectBase(s) : mode;
  // strip a matching prefix if present
  s = s.replace(/^0[xob]/i, "");
  s = s.toLowerCase();
  if (!s) throw new Error("Enter a number");
  if (!VALID[base].test(s)) throw new Error(`Not a valid base-${base} number`);
  const prefix = PREFIX[base] ?? "";
  const value = BigInt(prefix + s);
  return neg ? -value : value;
}

function convert(input: string, mode: string): string {
  if (!input.trim()) return "";
  const n = parse(input, mode);
  const sign = n < 0n ? "-" : "";
  const abs = n < 0n ? -n : n;
  return [
    `Dec:  ${n.toString(10)}`,
    `Hex:  ${sign}0x${abs.toString(16)}`,
    `Oct:  ${sign}0o${abs.toString(8)}`,
    `Bin:  ${sign}0b${abs.toString(2)}`,
  ].join("\n");
}

export default function Command() {
  return (
    <Converter
      inputTitle="Number"
      inputPlaceholder="255  0xff  0b1010  0o17"
      modes={[
        { value: "auto", title: "Auto-detect" },
        { value: "10", title: "Decimal" },
        { value: "16", title: "Hexadecimal" },
        { value: "8", title: "Octal" },
        { value: "2", title: "Binary" },
      ]}
      transform={convert}
    />
  );
}
