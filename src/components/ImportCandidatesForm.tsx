import { useCandidateStore } from "@/stores";
import { Button, Group, Stack, Textarea } from "@mantine/core";
import { modals } from "@mantine/modals";
import { ChangeEvent, useState } from "react";

export function ImportCandidatesForm() {
  const [error, setError] = useState('')
  const [candidates, setCandidates] = useState([])
  const addCandidate = useCandidateStore((state) => state.add);
  const clear = useCandidateStore((state) => state.clear)

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const json = e.target.value
      const candidates = JSON.parse(json)
      setCandidates(candidates)
    } catch (err) {
      setError('Định dạng dữ liệu lỗi, vui lòng kiểm tra lại.')
    }
  }

  const handleImport = () => {
    clear()
    for (const candidate of candidates) {
      addCandidate(candidate);
    }
    modals.closeAll()
  }

  return (
    <Stack>
      <Textarea autosize minRows={4} onChange={handleInputChange} error={error} />
      <Group gap={8} justify="flex-end">
        <Button variant="default" onClick={() => modals.closeAll()}>Hủy</Button>
        <Button onClick={handleImport} disabled={candidates.length === 0}>Thêm</Button>
      </Group>
    </Stack>
  )
}
