export function parseArticleDate(
  extractedDate?: string | null,
  rssDate?: string | null,
): Date | null {
  const dateString = extractedDate ?? rssDate;

  if (!dateString) {
    return null;
  }

  const date = new Date(dateString);

  //check if date is valid date bzc date.getTime() return a total second pass from 1 jan 1970 id date is a valid date.
   if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}