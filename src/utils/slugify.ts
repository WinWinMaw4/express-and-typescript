import slugifyLib from "slugify";

export const generateSlug = (title: string) =>
  slugifyLib(title, { lower: true, strict: true });
