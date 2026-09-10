export function isValidArticle(
  title: string,
  content: string | null
): boolean {
  if (!title.trim()) {
    return false;
  }

  if (!content || !content.trim()) {
    return false;
  }

  const wordCount = content.trim().split(/\s+/).length;

  if (wordCount < 40) {
    return false;
  }

  return true;
}