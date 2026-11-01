export function splitName(name: string) {
  const words = name.trim().split(/\s+/);
  return {
    prefix: words.slice(0, -1).join(" "),
    last: words[words.length - 1],
  };
}
