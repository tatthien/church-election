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
        name: "Nguyễn Văn A",
        votes: 0,
      },
      {
        id: "2",
        name: "Nguyễn Văn B",
        votes: 3,
      },
      {
        id: "3",
        name: "Nguyễn Văn C",
        votes: 20,
      },
      {
        id: "4",
        name: "Nguyễn Văn D",
        votes: 0,
      },
      {
        id: "4",
        name: "Nguyễn Văn E",
        votes: 12,
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
