import { Converter } from "./lib/converter";

/** Split arbitrary text into words on separators and camelCase/acronym boundaries. */
function words(s: string): string[] {
  return s
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean);
}

const cap = (w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();

function convert(input: string, mode: string): string {
  const w = words(input);
  if (w.length === 0) return "";
  const lower = w.map((x) => x.toLowerCase());
  switch (mode) {
    case "camel":
      return lower[0] + w.slice(1).map(cap).join("");
    case "pascal":
      return w.map(cap).join("");
    case "snake":
      return lower.join("_");
    case "constant":
      return lower.join("_").toUpperCase();
    case "kebab":
      return lower.join("-");
    case "title":
      return w.map(cap).join(" ");
    case "sentence":
      return cap(lower.join(" "));
    case "lower":
      return lower.join(" ");
    case "upper":
      return lower.join(" ").toUpperCase();
    default:
      return "";
  }
}

export default function Command() {
  return (
    <Converter
      inputPlaceholder="Any text or identifier…"
      modes={[
        { value: "camel", title: "camelCase" },
        { value: "pascal", title: "PascalCase" },
        { value: "snake", title: "snake_case" },
        { value: "constant", title: "CONSTANT_CASE" },
        { value: "kebab", title: "kebab-case" },
        { value: "title", title: "Title Case" },
        { value: "sentence", title: "Sentence case" },
        { value: "lower", title: "lower case" },
        { value: "upper", title: "UPPER CASE" },
      ]}
      transform={convert}
    />
  );
}
