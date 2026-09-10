import * as cheerio from "cheerio";


function isIndianExpressMeta(text: string): boolean {
  return (
    /\d+\s+min\s+read/i.test(text) ||
    /Updated:\s*/i.test(text) ||
    /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b.*\b\d{4}\b/i.test(text)
  );
}


export function cleanArticleContent(html: string, source: string): string {
  const $ = cheerio.load(html);

  if (source === "Indian Express") {
    $("script, style, noscript").remove();

    // Remove the metadata paragraph
    const firstParagraph = $("p").first();

    if (isIndianExpressMeta(firstParagraph.text())) {
      firstParagraph.remove();
    }

    // Remove image containers
    $("img").each((_, img) => {
      $(img).closest("p").remove();
    });

    return $("body").text().replace(/\s+/g, " ").trim();
  }

  return $("body").text().replace(/\s+/g, " ").trim();
}
