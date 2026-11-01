import { useCandidateStore } from "@/stores";
import { CandidateItem } from "./CandidateItem";
import {
  Box,
  ActionIcon,
  Group,
  Text,
  Tooltip,
  Stack,
  Select,
} from "@mantine/core";
import {
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconColumns,
  IconList,
  IconUsers,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import classes from "./Candidate.module.css";
import { SortOrder, sortCandidates } from "./sortCandidates";
import { clsx } from "clsx";
import { CopyCandidatesButton } from "../CopyCandidatesButton";
import { ImportSampleDataButton } from "../ImportSampleDataButton";
import { ResetDataButton } from "../ResetDataButton";
import { PasteCandidatesButton } from "../PasteCandidatesButton";

export function CandidateList() {
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "left",
  );
  const [layout, setLayout] = useState<"list" | "column">("list");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");
  const candidates = useCandidateStore((state) => state.candidates);
  const sortedCandidates = useMemo(
    () => sortCandidates(candidates, sortOrder),
    [candidates, sortOrder],
  );

  if (!candidates.length) {
    return (
      <Stack align="center" gap={24} my={24}>
        <Stack align="center" gap={0}>
          <Text c="blue.3" span>
            <IconUsers size={60} strokeWidth={1} color="currentColor" />
          </Text>
          <Text ta="center" c="gray.7">
            Chưa có ứng viên
          </Text>
        </Stack>
        <Group>
          <ImportSampleDataButton />
          <Text>hoặc</Text>
          <PasteCandidatesButton />
        </Group>
      </Stack>
    );
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
          <Group gap={6}>
            <Text component="label" fz="sm" htmlFor="sorting-by-name">
              Sắp theo tên
            </Text>
            <Select
              id="sorting-by-name"
              size="xs"
              radius="xs"
              w={140}
              allowDeselect={false}
              aria-label="Sắp xếp theo tên"
              data={[
                { value: "none", label: "Không sắp xếp" },
                { value: "asc", label: "A → Z" },
                { value: "desc", label: "Z → A" },
              ]}
              value={sortOrder}
              onChange={(value) => setSortOrder((value as SortOrder) ?? "none")}
            />
          </Group>
        </Group>
        <Group gap={6}>
          <CopyCandidatesButton />
          <ResetDataButton />
        </Group>
      </Group>
      <Box
        px={16}
        py={10}
        className={clsx([
          classes.list,
          layout === "list" ? classes.layoutList : classes.layoutColumn,
        ])}
        data-test="candidate-list"
      >
        {sortedCandidates.map((candidate, index) => (
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
