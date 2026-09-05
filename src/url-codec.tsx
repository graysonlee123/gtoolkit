import { Converter } from "./lib/converter";

export default function Command() {
  return (
    <Converter
      inputPlaceholder="Text or %-encoded string…"
      modes={[
        { value: "encode", title: "Encode" },
        { value: "decode", title: "Decode" },
      ]}
      transform={(input, mode) => {
        if (!input) return "";
        return mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input);
      }}
    />
  );
}
