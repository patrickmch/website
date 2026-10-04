/** Path to a file in public/, correct for any Vite base (absolute in production, relative in previews). */
export function asset(name: string): string {
  return `${import.meta.env.BASE_URL}${name}`;
}
