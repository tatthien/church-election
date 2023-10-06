import { AppLayout, TableResult, CandidateList } from "@/components";
import { Allotment } from "allotment";
import { Box, TextInput, rem } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { useCandidateStore } from "@/stores";
import { useState } from "react";

function App() {
  const [candidateName, setCandidateName] = useState("");
  const addCandidate = useCandidateStore((state) => state.add);

  function handleAddCandidate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (candidateName.trim() === "") return;
    addCandidate({
      id: Date.now().toString(),
      name: candidateName.trim(),
      votes: 0,
    });
    setCandidateName("");
  }

  return (
    <AppLayout>
      <Allotment>
        <Allotment.Pane minSize={530}>
          <Box
            px={16}
            py={10}
            style={(theme) => ({
              borderBottom: `1px solid ${theme.colors.gray[3]}`,
            })}
          >
            <form onSubmit={handleAddCandidate}>
              <TextInput
                styles={{
                  input: {
                    fontSize: rem(24),
                  },
                }}
                size="md"
                radius="xs"
                placeholder="Nhập họ tên và nhấn Enter"
                fw={600}
                leftSection={<IconUser />}
                value={candidateName}
                onChange={(e) => setCandidateName(e.currentTarget.value)}
              />
            </form>
          </Box>
          <CandidateList />
        </Allotment.Pane>
        <Allotment.Pane minSize={530}>
          <Box px={16} py={10}>
            <TableResult />
          </Box>
        </Allotment.Pane>
      </Allotment>
    </AppLayout>
  );
}

export default App;
