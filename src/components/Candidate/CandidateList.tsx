import { useCandidateStore } from "@/stores";
import { CandidateItem } from "./CandidateItem";
import { Flex, Box, ActionIcon, Button, Group, Text } from "@mantine/core";
import {
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconRefresh,
} from "@tabler/icons-react";
import { useState } from "react";
import { modals } from "@mantine/modals";
import classes from "./Candidate.module.css";

export function CandidateList() {
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "left",
  );
  const candidates = useCandidateStore((state) => state.candidates);
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
    <Box>
      {candidates.length > 0 ? (
        <>
          <Group align="center" justify="space-between" px={16} py={10}>
            <ActionIcon.Group>
              <ActionIcon
                radius="xs"
                variant="default"
                onClick={() => setTextAlign("left")}
              >
                <IconAlignLeft size={20} />
              </ActionIcon>
              <ActionIcon
                variant="default"
                onClick={() => setTextAlign("center")}
              >
                <IconAlignCenter size={20} />
              </ActionIcon>
              <ActionIcon
                radius="xs"
                variant="default"
                onClick={() => setTextAlign("right")}
              >
                <IconAlignRight size={20} />
              </ActionIcon>
            </ActionIcon.Group>
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
          </Group>
          <Flex
            direction="column"
            px={16}
            py={10}
            gap={10}
            className={classes.list}
          >
            {candidates.map((candidate, index) => (
              <CandidateItem
                key={candidate.id}
                item={candidate}
                index={index}
                textAlign={textAlign}
              />
            ))}
          </Flex>
        </>
      ) : (
        <Text ta="center" color="gray.7" py={16}>
          Chưa có ứng viên
        </Text>
      )}
    </Box>
  );
}
