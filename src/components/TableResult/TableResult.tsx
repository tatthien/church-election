import { Table, Paper, Flex, Group, Button, Select, Text } from "@mantine/core";
import { useCandidateStore } from "@/stores";
import { useCallback, useMemo, useState } from "react";
import { TableResultRow } from "./TableResultRow";
import { utils, writeFile } from "xlsx";
import { IconDownload } from "@tabler/icons-react";

const headers = ["#", "Họ Tên", "Số Phiếu", "Phần Trăm"];

export function TableResult() {
  const [filterByResult, setFilterByResult] = useState("all");
  const [sortByVotes, setSortByVotes] = useState("high_to_low");
  const candidates = useCandidateStore((state) => state.candidates);
  const totalBallots = useCandidateStore((state) => state.totalBallots);

  const calculatePercentage = useCallback(
    (votes: number) => {
      return (votes * 100) / totalBallots;
    },
    [totalBallots],
  );

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
    writeFile(workbook, `danh-sach-ung-vien-${Date.now().toString()}.xlsx`);
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

  const rows = sortedCandidates.map((element, index) => (
    <TableResultRow item={element} index={index} key={element.id} />
  ));

  return (
    <Paper shadow="xs" radius="xs" withBorder>
      <Flex p={16} align="center" justify="space-between" bg="gray.0">
        <Group>
          <Flex align="center">
            <Text component="span" size="sm" mr={4} color="gray.7">
              Lọc:
            </Text>
            <Select
              size="sm"
              variant="unstyled"
              radius="xs"
              value={filterByResult}
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
            <Text component="span" size="sm" mr={4} color="gray.7">
              Sắp xếp:
            </Text>
            <Select
              size="sm"
              variant="unstyled"
              radius="xs"
              value={sortByVotes}
              data={[
                { value: "default", label: "Mặc định" },
                { value: "low_to_high", label: "Tăng dần" },
                { value: "high_to_low", label: "Giảm dần" },
              ]}
              w={140}
              onChange={(value) => setSortByVotes(value as string)}
            />
          </Flex>
        </Group>
        <Button
          size="xs"
          variant="default"
          radius="xs"
          leftSection={<IconDownload size={16} />}
          onClick={handleDownloadFile}
        >
          Tải file
        </Button>
      </Flex>
      <Table highlightOnHover={false}>
        <Table.Thead fz="md">
          <Table.Tr>
            {headers.map((header) => (
              <Table.Th key={header}>{header}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
}
