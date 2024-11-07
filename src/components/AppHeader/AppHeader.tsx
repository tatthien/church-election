import {
  Flex,
  Text,
  NumberInput,
  ActionIcon,
  FocusTrap,
  Group,
} from "@mantine/core";

import classes from "./AppHeader.module.css";
import { useCandidateStore } from "@/stores";
import { useState } from "react";
import { IconBulb, IconEdit, IconX } from "@tabler/icons-react";

export function AppHeader() {
  const totalBallots = useCandidateStore((state) => state.totalBallots);
  const [total, setTotal] = useState(totalBallots);
  const [isEditing, setIsEditing] = useState(false);
  const updateTotalBallots = useCandidateStore(
    (state) => state.updateTotalBallots,
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateTotalBallots(total);

    setIsEditing(false);
  };

  return (
    <Group className={classes.header} justify="space-between" align="center">
      <Flex align="center" gap={8}>
        <Text fw={600} fz={24} color="gray.6">
          Tổng số phiếu
        </Text>
        {!isEditing ? (
          <Text fw={600} fz={24}>
            {totalBallots}
          </Text>
        ) : (
          <form onSubmit={handleSubmit}>
            <FocusTrap active={true}>
              <NumberInput
                classNames={{
                  input: classes.input,
                }}
                radius="sm"
                value={total}
                hideControls
                data-autofocus
                onChange={(value) => setTotal(Number(value))}
              />
            </FocusTrap>
          </form>
        )}
        <ActionIcon
          variant="white"
          color="dark"
          size="lg"
          radius="xs"
          onClick={() => setIsEditing(!isEditing)}
        >
          {!isEditing ? <IconEdit size={20} /> : <IconX size={20} />}
        </ActionIcon>
      </Flex>
      <Text fw={500} fz='sm' c="blue" style={{ display: 'flex', gap: 6 }}>
        <IconBulb size={20} />
        Dữ liệu sẽ được lưu lại trên trình duyệt của bạn
      </Text>
    </Group>
  );
}
