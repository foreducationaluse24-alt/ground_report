export function excerpt(text: string | null, maxLength: number) {
  if (!text) return "";

  const cleanText = text.replace(/\s+/g, " ").trim();

  if (cleanText.length <= maxLength) return cleanText;

  return cleanText.slice(0, maxLength).trim() + "...";
}