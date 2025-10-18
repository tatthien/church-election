import { useCandidateStore } from "@/stores";
import { Button, CopyButton } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

export function CopyCandidatesButton() {
  const candidates = useCandidateStore((state) => state.candidates);

  return (
    <CopyButton value={JSON.stringify(candidates)}>
      {({ copied, copy }) => (
        <Button
          size="xs"
          variant="default"
          radius="xs"
          onClick={copy}
          leftSection={copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
        >
          Copy danh sách
        </Button>
      )}
    </CopyButton>
  )
}
