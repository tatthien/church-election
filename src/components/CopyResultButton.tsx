import { useCandidateStore } from "@/stores";
import { Button } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";

export function CopyResultButton() {
  const [copied, setCopied] = useState(false)
  const { candidates, totalBallots } = useCandidateStore.getState()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify({
        candidates,
        totalBallots,
      }))
      setCopied(true)
      setTimeout(() => { setCopied(false) }, 1500)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Button
      size="compact-sm"
      variant="light"
      leftSection={copied ? <IconCheck size={20} /> : <IconCopy size={20} />}
      onClick={handleCopy}
    >
      Copy kết quả
    </Button>
  )
}
