import { Action, ActionPanel, Color, Icon, List } from "@vicinae/api";

type Status = { code: number; name: string; desc: string };

const STATUSES: Status[] = [
  { code: 100, name: "Continue", desc: "Interim response; client should continue the request." },
  { code: 101, name: "Switching Protocols", desc: "Server is switching protocols as requested." },
  { code: 103, name: "Early Hints", desc: "Preload hints while the final response is prepared." },
  { code: 200, name: "OK", desc: "Request succeeded." },
  { code: 201, name: "Created", desc: "Request succeeded and a new resource was created." },
  { code: 202, name: "Accepted", desc: "Request accepted for processing, not yet completed." },
  { code: 204, name: "No Content", desc: "Success with no response body." },
  { code: 206, name: "Partial Content", desc: "Partial resource delivered (range request)." },
  { code: 301, name: "Moved Permanently", desc: "Resource permanently moved to a new URL." },
  { code: 302, name: "Found", desc: "Resource temporarily at a different URL." },
  { code: 303, name: "See Other", desc: "Retrieve the resource with a GET at another URL." },
  { code: 304, name: "Not Modified", desc: "Cached copy is still valid; not re-sent." },
  { code: 307, name: "Temporary Redirect", desc: "Temporary redirect; method preserved." },
  { code: 308, name: "Permanent Redirect", desc: "Permanent redirect; method preserved." },
  { code: 400, name: "Bad Request", desc: "Malformed request the server won't process." },
  { code: 401, name: "Unauthorized", desc: "Authentication required or failed." },
  { code: 403, name: "Forbidden", desc: "Authenticated but not allowed to access." },
  { code: 404, name: "Not Found", desc: "Resource does not exist." },
  { code: 405, name: "Method Not Allowed", desc: "HTTP method not supported for this resource." },
  { code: 406, name: "Not Acceptable", desc: "No representation matches the Accept headers." },
  { code: 408, name: "Request Timeout", desc: "Server timed out waiting for the request." },
  { code: 409, name: "Conflict", desc: "Request conflicts with current server state." },
  { code: 410, name: "Gone", desc: "Resource permanently removed." },
  { code: 413, name: "Payload Too Large", desc: "Request body exceeds server limits." },
  { code: 415, name: "Unsupported Media Type", desc: "Request payload format not supported." },
  { code: 418, name: "I'm a Teapot", desc: "April Fools' joke (RFC 2324); server refuses to brew coffee." },
  { code: 422, name: "Unprocessable Entity", desc: "Well-formed but semantically invalid request." },
  { code: 429, name: "Too Many Requests", desc: "Rate limit exceeded." },
  { code: 431, name: "Request Header Fields Too Large", desc: "Headers are too large to process." },
  { code: 451, name: "Unavailable For Legal Reasons", desc: "Blocked for legal reasons." },
  { code: 500, name: "Internal Server Error", desc: "Generic server-side failure." },
  { code: 501, name: "Not Implemented", desc: "Server doesn't support the functionality." },
  { code: 502, name: "Bad Gateway", desc: "Invalid response from an upstream server." },
  { code: 503, name: "Service Unavailable", desc: "Server overloaded or down for maintenance." },
  { code: 504, name: "Gateway Timeout", desc: "Upstream server didn't respond in time." },
  { code: 505, name: "HTTP Version Not Supported", desc: "HTTP version not supported by the server." },
  { code: 511, name: "Network Authentication Required", desc: "Client must authenticate to gain network access." },
];

const CLASSES: Record<number, { label: string; color: Color }> = {
  1: { label: "Informational", color: Color.Blue },
  2: { label: "Success", color: Color.Green },
  3: { label: "Redirection", color: Color.Yellow },
  4: { label: "Client Error", color: Color.Orange },
  5: { label: "Server Error", color: Color.Red },
};

export default function Command() {
  return (
    <List isShowingDetail searchBarPlaceholder="Search by code or name…">
      {STATUSES.map((s) => {
        const cls = CLASSES[Math.floor(s.code / 100)];
        const mdn = `https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/${s.code}`;
        return (
          <List.Item
            key={s.code}
            title={String(s.code)}
            subtitle={s.name}
            keywords={[s.name, cls.label]}
            icon={{ source: Icon.Dot, tintColor: cls.color }}
            detail={
              <List.Item.Detail
                markdown={`# ${s.code} ${s.name}\n\n**${cls.label}**\n\n${s.desc}\n\n[MDN reference →](${mdn})`}
              />
            }
            actions={
              <ActionPanel>
                <Action.CopyToClipboard title="Copy Code" content={String(s.code)} />
                <Action.CopyToClipboard
                  title="Copy Code and Name"
                  content={`${s.code} ${s.name}`}
                />
                <Action.OpenInBrowser title="Open in MDN" url={mdn} />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
