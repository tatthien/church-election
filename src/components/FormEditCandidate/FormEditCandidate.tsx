import { useCandidateStore } from "@/stores";
import { Candidate } from "@/types";
import {
  TextInput,
  Group,
  Button,
  FocusTrap,
  NumberInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { z } from "zod";

interface FormEditCandidateProps {
  data: Candidate;
}

interface FormData {
  name: string;
  votes: number;
}

const schema = z.object({
  name: z.string().min(1, "Họ tên là bắt buộc"),
  votes: z.number().min(0),
});

export function FormEditCandidate({ data }: FormEditCandidateProps) {
  const updateCandidate = useCandidateStore((state) => state.update);

  const form = useForm<FormData>({
    initialValues: {
      name: data.name,
      votes: data.votes,
    },
    transformValues: (values: FormData) => ({
      name: values.name,
      votes: Number(values.votes) || 0,
    }),
    validate: zodResolver(schema),
  });

  const handleSubmit = (values: FormData) => {
    updateCandidate({
      id: data.id,
      ...values,
    });
    modals.closeAll();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <FocusTrap active={true}>
        <TextInput
          label="Họ tên"
          placeholder="Nhập họ và tên"
          data-autofocus
          radius="xs"
          mb={8}
          {...form.getInputProps("name")}
        />
        <NumberInput
          label="Số phiếu"
          hideControls
          radius="xs"
          {...form.getInputProps("votes")}
        />
      </FocusTrap>
      <Group justify="flex-end" mt="md">
        <Button type="submit" radius="xs">
          Cập nhật
        </Button>
      </Group>
    </form>
  );
}
