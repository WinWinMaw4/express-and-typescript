import slugifyLib from "slugify";

export const generateSlug = (title: string, id?: number) => {
  let slug = slugifyLib(title, { lower: true, strict: true });
  if (id) slug += `-${id}`;
  return slug;
};
