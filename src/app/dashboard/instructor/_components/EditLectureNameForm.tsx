import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const captionSchema = z.object({
  caption: z
    .string()
    .min(5, { message: "Caption must be grater than 5 letters." }),
});

type CaptionType = z.infer<typeof captionSchema>;

function EditLectureCaptionForm({
  sectionId,
  lectureId,
  handleCaptionUpdate,
  onCancel,
}: {
  sectionId: string;
  lectureId: string;
  handleCaptionUpdate: (newCaption: string ,secId: string, lecId: string) => void;
  onCancel: () => void;
}) {
  const form = useForm<z.infer<typeof captionSchema>>({
    resolver: zodResolver(captionSchema),
    defaultValues: {
        caption: "",
    },
  });


  const onSubmit = (data: CaptionType) => {
    handleCaptionUpdate(data.caption, sectionId, lectureId)
    onCancel?.()
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3.5 md:space-y-5 2xl:space-y-5"
      >
        <TextInput
          control={form.control}
          name="caption"
          label="Caption"
          placeholder="Write your section name here"
        />

        <div className="flex-between">
          <Button type="button" variant={"transparentGhost"} onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}

export default EditLectureCaptionForm;
