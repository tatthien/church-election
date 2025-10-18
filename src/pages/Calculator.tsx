import { AppLayout, TableResult } from "@/components";
import { ActionIcon, Alert, Box, Button, Flex, Group, Stack, Text, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { Allotment } from "allotment";
import { useEffect, useMemo } from "react";
import sumBy from 'lodash/sumBy'
import flatMap from 'lodash/flatMap'
import groupBy from 'lodash/groupBy'
import { Candidate } from "@/types";
import { setCalculatorData, useCandidateStore } from "@/stores";

export default function Calculator() {
  const { calculatorData } = useCandidateStore.getState()

  const form = useForm({
    initialValues: {
      data: calculatorData,
    }
  })

  useEffect(() => {
    setCalculatorData(form.values.data)
  }, [form.values.data])

  const { totalBallots, candidates } = useMemo(() => {
    const defaultResult = { totalBallots: 0, candidates: [] }

    if (!Array.isArray(form.values.data)) return defaultResult
    if (form.values.data.length === 0) return defaultResult

    try {
      const jsonData = form.values.data.filter(v => v.trim() !== '').map(v => JSON.parse(v))

      const totalBallots = sumBy(jsonData, 'totalBallots')

      const allCandidates = groupBy(flatMap(jsonData, 'candidates'), 'name')

      const candidates = Object.entries(allCandidates).map((e) => ({
        name: e[0],
        votes: sumBy(e[1], 'votes')
      })) as Candidate[]

      return {
        totalBallots,
        candidates,
      }
    } catch {
      return defaultResult
    }
  }, [form.values.data])

  const fields = form.values.data.map((_, index) => (
    <Group key={index}>
      <Textarea
        label={`Nhóm ${index + 1}`}
        placeholder="Cung cấp dữ liệu kiểm phiếu"
        style={{ flex: 1 }}
        {...form.getInputProps(`data.${index}`)}
      />
      <ActionIcon variant="light" color="red" radius="lg" onClick={() => { form.removeListItem('data', index) }}>
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  ))

  return (
    <AppLayout>
      <Box style={{ height: 'calc(100vh - 40px)' }}>
        <Allotment>
          <Allotment.Pane minSize={530} preferredSize={600}>
            <Title order={1} fz={32} p={16}>Tính tổng số</Title>
            <Box px={16}>
              <Alert title="Lưu ý" mb={16}>
                Để tính tổng số phiếu của từng ứng viên chính xác thì tên các ứng viên từ các nguồn phải giống nhau.
              </Alert>
              <Stack style={{ overflowY: 'auto', height: 'calc(100vh - 230px)' }}>
                {form.values.data.length === 0 && <Text fz="sm" c="gray.7">Chưa có dữ liệu. Bấm "Thêm dữ liệu" để bắt đầu.</Text>}
                {fields}
                <Flex>
                  <Button variant="default" onClick={() => {
                    form.insertListItem('data', '')
                  }}>Thêm dữ liệu</Button>
                </Flex>
              </Stack>
            </Box>
          </Allotment.Pane>
          <Allotment.Pane minSize={530}>
            <Box px={16} py={10}>
              <Box mb={16}>
                <Text span fz="lg">{`Tổng số phiếu từ ${form.values.data.length} nhóm:`} <Text span fw={600} inherit>{totalBallots}</Text></Text>
              </Box>
              <TableResult totalBallots={totalBallots} candidates={candidates} />
            </Box>
          </Allotment.Pane>
        </Allotment>
      </Box>
    </AppLayout>
  );
}
