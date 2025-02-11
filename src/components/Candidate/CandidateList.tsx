import { useCandidateStore } from "@/stores";
import { CandidateItem } from "./CandidateItem";
import { Box, ActionIcon, Button, Group, Text, Tooltip, Stack } from "@mantine/core";
import {
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconRefresh,
  IconColumns,
  IconList,
  IconUsers,
} from "@tabler/icons-react";
import { useState } from "react";
import { modals } from "@mantine/modals";
import classes from "./Candidate.module.css";
import { clsx } from "clsx";
import { Candidate } from "@/types";

export function CandidateList() {
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "left",
  );
  const [layout, setLayout] = useState<"list" | "column">("list");
  const candidates = useCandidateStore((state) => state.candidates);
  const clearData = useCandidateStore((state) => state.clear);
  const addCandidate = useCandidateStore((state) => state.add);
  const updateTotalBallots = useCandidateStore((state) => state.updateTotalBallots);

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

  if (!candidates.length) {
    return (
      <Stack align="center" gap={24} my={24}>
        <Stack align="center" gap={0}>
          <Text c='blue.3' span>
            <IconUsers size={60} strokeWidth={1} color="currentColor" />
          </Text>
          <Text ta="center" color="gray.7">
            Chưa có ứng viên
          </Text>
        </Stack>
        <Button onClick={handlePopulateSampleData}>Nạp dữ liệu mẫu</Button>
      </Stack>
    )
  }

  return (
    <Box>
      <Group align="center" justify="space-between" px={16} py={10}>
        <Group align="center">
          <ActionIcon.Group>
            <Tooltip label="Canh trái">
              <ActionIcon
                radius="xs"
                variant="default"
                c={textAlign === "left" ? "blue" : "dark"}
                onClick={() => setTextAlign("left")}
              >
                <IconAlignLeft size={20} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Canh giữa">
              <ActionIcon
                radius="xs"
                variant="default"
                c={textAlign === "center" ? "blue" : "dark"}
                onClick={() => setTextAlign("center")}
              >
                <IconAlignCenter size={20} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Canh phải">
              <ActionIcon
                radius="xs"
                variant="default"
                c={textAlign === "right" ? "blue" : "dark"}
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
                c={layout === "list" ? "blue" : "dark"}
                onClick={() => setLayout("list")}
              >
                <IconList size={20} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Giao diện cột">
              <ActionIcon
                radius="xs"
                variant="default"
                c={layout === "column" ? "blue" : "dark"}
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
        data-test='candidate-list'
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
    </Box>
  );
}
