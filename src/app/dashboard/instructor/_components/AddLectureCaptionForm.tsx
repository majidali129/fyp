"use client";

import TextArea from "@/components/TextArea";
import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";

const captionSchema = z.object({
  caption: z.string().min(2, { message: "Caption is mendatory." }),
});

type NameType = z.infer<typeof captionSchema>;

function AddLectureCaptionForm({
  onCancel,
  sectionId,
  lectureId,
  handleAddCaption,
}: {
  onCancel?: () => void;
  sectionId?: string;
  lectureId?: string;
  handleAddCaption?: (
    sectionId: string,
    lectureId: string,
    caption: string
  ) => void;
}) {
  const form = useForm<z.infer<typeof captionSchema>>({
    resolver: zodResolver(captionSchema),
    defaultValues: {
      caption: "",
    },
  });

  const {isValid} = useFormState({control: form.control})

  const onSubmit = (data: NameType) => {
    // handleAddCaption(sectionId, lectureId, data.caption);
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
          name="caption"
          label="Caption"
          placeholder="Write your lecture caption here...."
        />

        <FormMessage className="text-error-500" />

        <div className="flex-between">
          <Button type="button" variant={"transparentGhost"} onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={!isValid} >Add Caption</Button>
        </div>
      </form>
    </Form>
  );
}

export default AddLectureCaptionForm;
