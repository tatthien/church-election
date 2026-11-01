import { splitName } from "@/helpers";
import { Candidate } from "@/types";

export type SortOrder = "none" | "asc" | "desc";

function getSortKey(name: string) {
  return splitName(name).last;
}

export function sortCandidates(candidates: Candidate[], order: SortOrder) {
  if (order === "none") return candidates;
  const direction = order === "asc" ? 1 : -1;
  return [...candidates].sort(
    (a, b) =>
      direction * getSortKey(a.name).localeCompare(getSortKey(b.name), "vi"),
  );
}
