import { Converter } from "./lib/converter";

function slugify(input: string, mode: string): string {
  const sep = mode === "underscore" ? "_" : "-";
  const slug = input
    .normalize("NFKD") // decompose accents
    .replace(/[̀-ͯ]/g, "") // strip diacritic marks
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, sep) // non-alphanumeric -> separator
    .replace(new RegExp(`\\${sep}{2,}`, "g"), sep); // collapse repeats
  // trim leading/trailing separators
  return slug.replace(new RegExp(`^\\${sep}+|\\${sep}+$`, "g"), "");
}

export default function Command() {
  return (
    <Converter
      inputPlaceholder="A Post Title: Héllo, World!"
      modes={[
        { value: "hyphen", title: "hyphen-separated" },
        { value: "underscore", title: "underscore_separated" },
      ]}
      transform={slugify}
    />
  );
}
