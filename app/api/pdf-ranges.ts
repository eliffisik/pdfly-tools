type ParsePageRangesOptions = {
  allowEmpty?: boolean;
};

export function parsePageRanges(
  input: string,
  pageCount: number,
  options: ParsePageRangesOptions = {}
) {
  const trimmedInput = input.trim();

  if (!trimmedInput && options.allowEmpty) {
    return Array.from({ length: pageCount }, (_, index) => index);
  }

  const parts = trimmedInput
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  const pages: number[] = [];

  if (parts.length === 0) {
    throw new Error("Enter at least one page or page range.");
  }

  for (const part of parts) {
    const match = part.match(/^(\d+)(?:-(\d+))?$/);

    if (!match) {
      throw new Error("Use page ranges like 1-3,5,8-10.");
    }

    const start = Number(match[1]);
    const end = match[2] ? Number(match[2]) : start;

    if (start < 1 || end < 1 || start > end) {
      throw new Error("Page ranges must start at 1 and move forward.");
    }

    if (end > pageCount) {
      throw new Error(`This PDF has ${pageCount} page(s).`);
    }

    for (let page = start; page <= end; page += 1) {
      pages.push(page - 1);
    }
  }

  return [...new Set(pages)];
}
