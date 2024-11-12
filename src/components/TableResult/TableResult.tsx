import {
  Table,
  Paper,
  Flex,
  Group,
  Button,
  Select,
  Text,
  Box,
  ActionIcon,
} from "@mantine/core";
import { useCandidateStore } from "@/stores";
import { useCallback, useMemo, useState } from "react";
import { TableResultRow } from "./TableResultRow";
import { utils, writeFile } from "xlsx";
import {
  IconDownload,
  IconFiles,
  IconPercentage,
  IconRefresh,
  IconTextDecrease,
  IconTextIncrease,
  IconUser,
} from "@tabler/icons-react";
import classes from "./TableResult.module.css";

const headers = [
  {
    label: "#",
    icon: "",
  },
  {
    label: "Họ tên",
    icon: <IconUser size={18} />,
  },
  {
    label: "Số phiếu",
    icon: <IconFiles size={18} />,
  },
  {
    label: "Phần trăm",
    icon: <IconPercentage size={18} />,
  },
];

const fontSizeMin = 14;
const fontSizeMax = 28;
const fontSizeStep = 2;

const FONT_SIZE = {
  default: 16,
  min: 14,
  max: 28,
  step: 2,
}

export function TableResult() {
  const [filterByResult, setFilterByResult] = useState("all");
  const [sortByVotes, setSortByVotes] = useState("high_to_low");
  const [tableFontSize, setTableFontSize] = useState(FONT_SIZE.default);
  const candidates = useCandidateStore((state) => state.candidates);
  const totalBallots = useCandidateStore((state) => state.totalBallots);

  const calculatePercentage = useCallback(
    (votes: number) => {
      return (votes * 100) / totalBallots;
    },
    [totalBallots],
  );

  function increaseTableFontSize() {
    if (tableFontSize >= FONT_SIZE.max) return;
    setTableFontSize(tableFontSize + FONT_SIZE.step);
  }

  function decreaseTableFontSize() {
    if (tableFontSize <= FONT_SIZE.min) return;
    setTableFontSize(tableFontSize - FONT_SIZE.step);
  }

  function handleDownloadFile() {
    const worksheet = utils.json_to_sheet(
      sortedCandidates.map((candidate, index) => {
        return {
          "#": index + 1,
          "Họ Tên": candidate.name,
          "Số Phiếu": candidate.votes,
          "Phần Trăm": calculatePercentage(candidate.votes).toFixed(2) + "%",
        };
      }),
    );
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    writeFile(workbook, `danh-sach-ung-vien-${new Date().toLocaleDateString()}.xlsx`);
  }

  const sortedCandidates = useMemo(() => {
    const items = [...candidates].sort((a, b) => {
      if (sortByVotes === "low_to_high") return a.votes - b.votes;
      if (sortByVotes === "high_to_low") return b.votes - a.votes;
      return 0;
    });
    switch (filterByResult) {
      case "passed":
        return items.filter((item) => item.votes >= totalBallots / 2);
      case "not_passed":
        return items.filter((item) => item.votes < totalBallots / 2);
    }
    return items;
  }, [candidates, filterByResult, sortByVotes, totalBallots]);

  const rows =
    sortedCandidates.length > 0 ? (
      sortedCandidates.map((element, index) => (
        <TableResultRow
          item={element}
          index={index}
          key={element.id}
          fontSize={tableFontSize}
        />
      ))
    ) : (
      <Table.Tr>
        <Table.Td colSpan={4} ta="center">
          Chưa có ứng viên
        </Table.Td>
      </Table.Tr>
    );

  return (
    <Paper radius="sm" withBorder>
      <Flex
        style={{ borderBottom: "1px solid var(--mantine-color-gray-3)" }}
        py={8}
        px={16}
        align="center"
        justify="space-between"
      >
        <Group>
          <Flex align="center">
            <Text component="span" size="sm" mr={4} c="gray.7">
              Lọc:
            </Text>
            <Select
              size="sm"
              variant="unstyled"
              radius="xs"
              value={filterByResult}
              checkIconPosition="right"
              aria-label="Filter by results select"
              data={[
                { value: "all", label: "Tất cả" },
                { value: "passed", label: "Quá bán" },
                { value: "not_passed", label: "Chưa quá bán" },
              ]}
              w={140}
              onChange={(value) => setFilterByResult(value as string)}
            />
          </Flex>
          <Flex align="center">
            <Text component="span" size="sm" mr={4} c="gray.7">
              Sắp xếp:
            </Text>
            <Select
              size="sm"
              variant="unstyled"
              radius="xs"
              value={sortByVotes}
              checkIconPosition="right"
              aria-label="Sort by votes select"
              data={[
                { value: "default", label: "Mặc định" },
                { value: "low_to_high", label: "Phiếu tăng dần" },
                { value: "high_to_low", label: "Phiếu giảm dần" },
              ]}
              w={150}
              onChange={(value) => setSortByVotes(value as string)}
            />
          </Flex>
        </Group>
        <Group gap={8}>
          <ActionIcon.Group>
            <ActionIcon
              variant="default"
              radius="xs"
              onClick={decreaseTableFontSize}
            >
              <IconTextDecrease size={20} />
            </ActionIcon>
            <ActionIcon
              variant="default"
              radius="xs"
              onClick={() => setTableFontSize(FONT_SIZE.default)}
            >
              <IconRefresh size={18} />
            </ActionIcon>
            <ActionIcon
              variant="default"
              radius="xs"
              onClick={increaseTableFontSize}
            >
              <IconTextIncrease size={20} />
            </ActionIcon>
          </ActionIcon.Group>
          <Button
            size="xs"
            variant="default"
            radius="xs"
            leftSection={<IconDownload size={18} />}
            onClick={handleDownloadFile}
          >
            Tải file
          </Button>
        </Group>
      </Flex>
      <Box className={classes.tableContainer}>
        <Table highlightOnHover={false} className={classes.table}>
          <Table.Thead className={classes.thead}>
            <Table.Tr>
              {headers.map((header) => (
                <Table.Th key={header.label} fw={400} c="gray.7">
                  <Flex align="center" gap={4}>
                    {header.icon}
                    {header.label}
                  </Flex>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </Paper>
  );
}
