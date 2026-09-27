// Structured data for search engines. `<` is escaped so a string inside the
// payload can never close the script tag (see Next's JSON-LD guide).
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
