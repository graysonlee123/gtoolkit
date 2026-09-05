import { Converter } from "./lib/converter";

export default function Command() {
  return (
    <Converter
      inputPlaceholder="Text or Base64…"
      modes={[
        { value: "encode", title: "Encode" },
        { value: "decode", title: "Decode" },
      ]}
      transform={(input, mode) => {
        if (!input) return "";
        if (mode === "encode") return Buffer.from(input, "utf8").toString("base64");
        const decoded = Buffer.from(input, "base64").toString("utf8");
        // Round-trip check: reject input that is not valid Base64.
        if (Buffer.from(decoded, "utf8").toString("base64").replace(/=+$/, "") !==
            input.replace(/\s/g, "").replace(/=+$/, "")) {
          throw new Error("Invalid Base64 input");
        }
        return decoded;
      }}
    />
  );
}
