import { createHash } from "crypto";
import { Converter } from "./lib/converter";

export default function Command() {
  return (
    <Converter
      inputPlaceholder="Text to hash…"
      modes={[
        { value: "md5", title: "MD5" },
        { value: "sha1", title: "SHA-1" },
        { value: "sha256", title: "SHA-256" },
        { value: "sha512", title: "SHA-512" },
      ]}
      defaultMode="sha256"
      transform={(input, mode) => {
        if (!input) return "";
        return createHash(mode).update(input, "utf8").digest("hex");
      }}
    />
  );
}
