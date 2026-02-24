export function getContrastYIQ(hexColor: string): string {
  const normalized = hexColor.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 138 ? "#1A1A1A" : "#F7F4EF";
}
