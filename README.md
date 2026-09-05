# Grayson Toolbox

Vicinae extension — common dev tools as launcher commands.

## Commands

| Command | Mode | Does |
| --- | --- | --- |
| Generate UUID | list | v4, v4 uppercase/no-dash, v7 (time-ordered), nil. Copy/paste/regenerate. |
| Base64 Encode / Decode | form | Round-trip-validated Base64. |
| URL Encode / Decode | form | `encodeURIComponent` / `decodeURIComponent`. |
| Format JSON | form | Pretty (2-space) or minify. |
| Hash Text | form | MD5 / SHA-1 / SHA-256 / SHA-512 hex. |
| Unix Timestamp Converter | form | Unix ↔ date, both s and ms. |
| Decode JWT | form | Header + payload (no signature verify) + exp/iat/nbf notes. |

All logic is local — no network, no auth. Runs on Node (uses `crypto`, `Buffer`).

## Develop

```sh
npm install
npm run dev      # vici develop — hot-reloads into the running Vicinae server
```

Open Vicinae; commands appear under **Grayson Toolbox**.

## Build / install

```sh
npm run build    # vici build — bundles into the Vicinae extensions dir
npm run lint     # validate package.json manifest
```

## Adding a command

1. Add an entry to `commands[]` in `package.json` (`name` must match the file).
2. Create `src/<name>.tsx` with a default-exported React component.
3. Form-based converters can reuse `src/lib/converter.tsx` — pass a `transform(input, mode)` that returns a string or throws to show an error.
