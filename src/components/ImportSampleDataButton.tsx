import { useCandidateStore } from "@/stores";
import { Candidate } from "@/types";
import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

export function ImportSampleDataButton() {
  const addCandidate = useCandidateStore((state) => state.add);
  const updateTotalBallots = useCandidateStore((state) => state.updateTotalBallots);

  const handlePopulateSampleData = () => {
    const candidates: Candidate[] = [
      {
        id: "1",
        name: "Nguyen Van A",
        votes: 0,
      },
      {
        id: "2",
        name: "Nguyen Van B",
        votes: 3,
      },
      {
        id: "3",
        name: "Nguyen Van C",
        votes: 20,
      },
      {
        id: "4",
        name: "Nguyen Van D",
        votes: 0,
      },
    ]

    // Add candidates
    for (const candidate of candidates) {
      addCandidate(candidate);
    }

    // Update total ballots
    updateTotalBallots(40);
  }

  return (
    <Button leftSection={<IconDownload size={18} />} onClick={handlePopulateSampleData}>Nạp dữ liệu mẫu</Button>
  )
}
