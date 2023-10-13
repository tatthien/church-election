import { useCandidateStore } from "@/stores";
import { CandidateItem } from "./CandidateItem";
import { Box, ActionIcon, Button, Group, Text, Tooltip } from "@mantine/core";
import {
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconRefresh,
  IconColumns,
  IconList,
} from "@tabler/icons-react";
import { useState } from "react";
import { modals } from "@mantine/modals";
import classes from "./Candidate.module.css";
import { clsx } from "clsx";

export function CandidateList() {
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "left",
  );
  const [layout, setLayout] = useState<"list" | "column">("list");
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
            <Group align="center">
              <ActionIcon.Group>
                <Tooltip label="Canh trái">
                  <ActionIcon
                    radius="xs"
                    variant="default"
                    onClick={() => setTextAlign("left")}
                  >
                    <IconAlignLeft size={20} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Canh giữa">
                  <ActionIcon
                    radius="xs"
                    variant="default"
                    onClick={() => setTextAlign("center")}
                  >
                    <IconAlignCenter size={20} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Canh phải">
                  <ActionIcon
                    radius="xs"
                    variant="default"
                    onClick={() => setTextAlign("right")}
                  >
                    <IconAlignRight size={20} />
                  </ActionIcon>
                </Tooltip>
              </ActionIcon.Group>
              <ActionIcon.Group>
                <Tooltip label="Giao diện danh sách">
                  <ActionIcon
                    radius="xs"
                    variant="default"
                    onClick={() => setLayout("list")}
                  >
                    <IconList size={20} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Giao diện cột">
                  <ActionIcon
                    radius="xs"
                    variant="default"
                    onClick={() => setLayout("column")}
                  >
                    <IconColumns size={20} />
                  </ActionIcon>
                </Tooltip>
              </ActionIcon.Group>
            </Group>
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
          <Box
            px={16}
            py={10}
            className={clsx([
              classes.list,
              layout === "list" ? classes.layoutList : classes.layoutColumn,
            ])}
          >
            {candidates.map((candidate, index) => (
              <CandidateItem
                key={candidate.id}
                item={candidate}
                index={index}
                textAlign={textAlign}
              />
            ))}
          </Box>
        </>
      ) : (
        <Text ta="center" color="gray.7" py={16}>
          Chưa có ứng viên
        </Text>
      )}
    </Box>
  );
}
