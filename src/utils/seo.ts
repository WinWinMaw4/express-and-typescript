export const generateMeta = (title: string, content: string) => {
  const description = content.length > 160 ? content.substring(0, 157) + "..." : content;

  return {
    title,
    description,
  };
};
