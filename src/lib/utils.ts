// Minimal cn helper compatible with Tailwind v4 without extra deps
export function cn(
  ...classes: Array<string | number | false | null | undefined>
) {
  return classes.filter(Boolean).join(" ");
}

