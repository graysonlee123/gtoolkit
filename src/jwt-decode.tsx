import { Converter } from "./lib/converter";

function b64urlToJson(part: string): unknown {
  const b64 = part.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 ? "=".repeat(4 - (b64.length % 4)) : "";
  const json = Buffer.from(b64 + pad, "base64").toString("utf8");
  return JSON.parse(json);
}

export default function Command() {
  return (
    <Converter
      inputTitle="JWT"
      inputPlaceholder="eyJhbGciOi…"
      transform={(input) => {
        const token = input.trim();
        if (!token) return "";
        const parts = token.split(".");
        if (parts.length < 2) throw new Error("Not a JWT (expected header.payload.signature)");
        const header = b64urlToJson(parts[0]);
        const payload = b64urlToJson(parts[1]) as Record<string, unknown>;

        const notes: string[] = [];
        for (const [k, label] of [["exp", "Expires"], ["iat", "Issued"], ["nbf", "Not before"]] as const) {
          if (typeof payload[k] === "number") {
            notes.push(`${label}: ${new Date((payload[k] as number) * 1000).toISOString()}`);
          }
        }
        if (typeof payload.exp === "number") {
          notes.push(payload.exp * 1000 < Date.now() ? "Status: EXPIRED" : "Status: valid");
        }

        return [
          "=== Header ===",
          JSON.stringify(header, null, 2),
          "",
          "=== Payload ===",
          JSON.stringify(payload, null, 2),
          ...(notes.length ? ["", "=== Claims ===", ...notes] : []),
        ].join("\n");
      }}
    />
  );
}
