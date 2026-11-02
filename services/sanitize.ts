const CONTROL_CHARS = new RegExp(
  "[\\u0000-\\u001F\\u007F-\\u009F\\u200E\\u200F\\u202A-\\u202E\\u2066-\\u2069]",
  "g",
);

export function sanitizeText(input: string, maxLength = 500): string {
  return input.replace(CONTROL_CHARS, "").slice(0, maxLength).trim();
}
