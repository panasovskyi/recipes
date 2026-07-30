import slugify from "slugify";
import crypto from "crypto";

export const generateSlug = (title: string): string => {
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    locale: "uk",
  });
  const hash = crypto.randomBytes(3).toString("hex");
  return `${baseSlug}-${hash}`;
};