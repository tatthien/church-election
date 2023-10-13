import { Candidate } from "@/types";
import {
  Paper,
  Text,
  Flex,
  Group,
  ActionIcon,
  NumberInput,
  Menu,
  rem,
} from "@mantine/core";
import {
  IconPlus,
  IconMinus,
  IconPencil,
  IconTrash,
  IconDotsVertical,
} from "@tabler/icons-react";
import classes from "./Candidate.module.css";
import { useCandidateStore } from "@/stores";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FormEditCandidate } from "@/components";
import { modals } from "@mantine/modals";

interface CandidateItemProps {
  item: Candidate;
  index: number;
  textAlign: "left" | "center" | "right";
}

export function CandidateItem({ item, textAlign }: CandidateItemProps) {
  const [votes, setVotes] = useState(item.votes);
  const totalBallots = useCandidateStore((state) => state.totalBallots);
  const updateCandidate = useCandidateStore((state) => state.update);
  const deleteCandidate = useCandidateStore((state) => state.delete);

  useEffect(() => {
    setVotes(item.votes);
  }, [item.votes]);

  const handleUpVote = () => {
    updateCandidate({
      id: item.id,
      votes: item.votes + 1,
    });
  };

  const handleDownVote = () => {
    updateCandidate({
      id: item.id,
      votes: item.votes - 1,
    });
  };

  const handleSubmitVotes = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    const votes = Number(event.currentTarget.value);
    if (votes > totalBallots || votes < 0) {
      toast.error(`Số phiếu bầu phải lớn hơn 0 hoặc nhỏ hơn ${totalBallots}`);
      setVotes(item.votes);
      return;
    }
    updateCandidate({
      id: item.id,
      votes,
    });
    event.currentTarget.blur();
  };

  const handleOpenEditModal = () => {
    modals.open({
      title: "Cập nhật thông tin ứng viên",
      children: <FormEditCandidate data={item} />,
    });
  };

  const handleOpenDeleteConfirmModal = () => {
    modals.openConfirmModal({
      title: "Xóa ứng viên",
      children: (
        <Text>
          {"Bạn có chắc muốn xóa ứng viên "}
          <Text fw={600} component="span">
            {item.name}
          </Text>
        </Text>
      ),
      labels: { confirm: "Xóa", cancel: "Hủy bỏ" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => deleteCandidate(item.id),
    });
  };

  return (
    <Paper withBorder radius="sm" py={6} px={12}>
      <Flex justify="space-between" align="center" gap={12}>
        <Text fw={600} fz={24} className={classes.name} ta={textAlign}>
          {item.name}
        </Text>
        <Group align="center" gap={8}>
          <ActionIcon
            radius="sm"
            size="lg"
            aria-label="Downvote by one"
            variant="light"
            disabled={item.votes === 0}
            onClick={handleDownVote}
          >
            <IconMinus size={20} stroke={3} />
          </ActionIcon>
          <ActionIcon
            radius="sm"
            size="lg"
            aria-label="Upvote by one"
            variant="light"
            disabled={item.votes >= totalBallots}
            onClick={handleUpVote}
          >
            <IconPlus size={20} stroke={3} />
          </ActionIcon>
          <NumberInput
            classNames={{
              input: classes.input,
            }}
            radius="sm"
            value={votes}
            hideControls
            data-autofocus
            onChange={(value: number) => setVotes(value)}
            onKeyPress={handleSubmitVotes}
          />
          <Menu shadow="md" radius="sm" width={200} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="white" color="gray">
                <IconDotsVertical size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconPencil style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={handleOpenEditModal}
              >
                Chỉnh sửa
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={
                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={handleOpenDeleteConfirmModal}
              >
                Xóa
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Flex>
    </Paper>
  );
}
