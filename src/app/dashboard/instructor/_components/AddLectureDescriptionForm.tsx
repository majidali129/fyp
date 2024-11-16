"use client";

import TextArea from "@/components/TextArea";
import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";

const descriptionSchema = z.object({
  description: z.string().min(2, { message: "Description is mendatory." }),
});

type DescriptionValue = z.infer<typeof descriptionSchema>;

function AddLectureDescriptionForm({
  onCancel,
  sectionId,
  lectureId,
  onDescriptionAdd,
}: {
  onCancel?: () => void;
  sectionId: string,
  lectureId: string,
  onDescriptionAdd: (description: string, secId: string, lecId: string) => void;
}) {
  const form = useForm<z.infer<typeof descriptionSchema>>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      description: "",
    },
  });

  const { isValid } = useFormState({ control: form.control });

  const onSubmit = (data: DescriptionValue) => {
    onDescriptionAdd?.(data.description, sectionId, lectureId);
    onCancel?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3.5 md:space-y-5 2xl:space-y-5"
      >
        <TextArea
          control={form.control}
          name="description"
          label="Description"
          placeholder="Write your lecture description here...."
        />

        <FormMessage className="text-error-500" />

        <div className="flex-between">
          <Button type="button" variant={"transparentGhost"} onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={!isValid}>
            Add Description
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AddLectureDescriptionForm;
