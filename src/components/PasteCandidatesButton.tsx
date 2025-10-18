import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconClipboard } from "@tabler/icons-react";
import { ImportCandidatesForm } from "./ImportCandidatesForm";

export function PasteCandidatesButton() {
  const handleOpenModal = () => {
    modals.open({
      title: "Nạp dữ liệu từ danh sách có sẵn",
      children: <ImportCandidatesForm />,
      size: 'lg',
    })
  }

  return (
    <Button
      variant="default"
      leftSection={<IconClipboard size={18} />}
      onClick={handleOpenModal}
    >
      Nạp từ dánh sách có sẵn
    </Button>
  )
}
