import { useCandidateStore } from "@/stores";
import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconRefresh } from "@tabler/icons-react";

export function ResetDataButton() {
  const clearData = useCandidateStore((state) => state.clear);

  const handleResetData = () => {
    modals.openConfirmModal({
      title: "Xóa dữ liệu",
      children: (
        <Text>
          Bạn có chắc muốn xóa hết dữ liệu? Hành động này không thể khôi phục.
        </Text>
      ),
      labels: { confirm: "Xóa", cancel: "Hủy bỏ" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => clearData(),
    });
  };

  return (
    <Button
      size="xs"
      color="red"
      variant="light"
      radius="xs"
      leftSection={<IconRefresh size={18} />}
      onClick={handleResetData}
    >
      Xóa dữ liệu
    </Button>
  )
}
