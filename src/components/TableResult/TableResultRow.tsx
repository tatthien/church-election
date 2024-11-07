import { Candidate } from "@/types";
import { Table, Flex, Box, Text } from "@mantine/core";
import { useCandidateStore } from "@/stores";
import { useMemo } from "react";
import { IconCircleCheckFilled } from "@tabler/icons-react";

interface TableResultRowProps {
  item: Candidate;
  index: number;
  fontSize?: number;
}

export function TableResultRow({ item, index, fontSize }: TableResultRowProps) {
  const totalBallots = useCandidateStore((state) => state.totalBallots);

  const passed = useMemo(() => {
    return totalBallots > 0 && item.votes >= totalBallots / 2;
  }, [item, totalBallots]);

  const percentage = useMemo(() => {
    return totalBallots === 0 ? 0 : (item.votes * 100) / totalBallots;
  }, [item, totalBallots]);

  return (
    <Table.Tr key={item.id} fz={fontSize ?? 14}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>
        <Flex align="center" gap={4}>
          {passed && (
            <Box
              component="span"
              style={(theme) => ({
                color: theme.colors.green[6],
                fontSize: 0,
              })}
            >
              <IconCircleCheckFilled />
            </Box>
          )}
          {item.name}
        </Flex>
      </Table.Td>
      <Table.Td>
        <Text
          component="span"
          fw={700}
          c={passed ? "green.6" : "dark"}
          fz={fontSize}
        >
          {item.votes}
        </Text>
        {`/${totalBallots}`}
      </Table.Td>
      <Table.Td>{`${percentage.toFixed(2)}%`}</Table.Td>
    </Table.Tr>
  );
}
