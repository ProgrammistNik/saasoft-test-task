export const tagsArrayToString = (tags: { text: string }[]) => tags.map((t) => t.text).join('; ');

export const stringToTagsArray = (str: string) =>
  str
    .split(';')
    .map((tag) => tag.trim())
    .filter((tag) => tag)
    .map((tag) => ({ text: tag }));
