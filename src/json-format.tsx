import { Converter } from "./lib/converter";

export default function Command() {
  return (
    <Converter
      inputPlaceholder="Paste JSON…"
      modes={[
        { value: "pretty", title: "Pretty (2-space)" },
        { value: "minify", title: "Minify" },
      ]}
      transform={(input, mode) => {
        if (!input.trim()) return "";
        const parsed = JSON.parse(input);
        return mode === "minify"
          ? JSON.stringify(parsed)
          : JSON.stringify(parsed, null, 2);
      }}
    />
  );
}
