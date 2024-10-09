import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const nameSchema = z.object({
  sectionName: z
    .string()
    .min(5, { message: "Section name must be grater than 5 letters." }),
});

type NameType = z.infer<typeof nameSchema>;

function EditSectionNameForm({
  onCancel,
  sectionId,
  handleUpdateSectionName,
}: {
  onCancel: () => void;
  sectionId: string;
  handleUpdateSectionName: (sectionId: string, newName: string) => void;
}) {
  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      sectionName: "",
    },
  });

  console.log(sectionId);


  const onSubmit = (data: NameType) => {
    console.log(data);
    handleUpdateSectionName(sectionId, data.sectionName)
    onCancel?.()
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3.5 md:space-y-2.5 2xl:space-y-5"
      >
        <TextInput
          control={form.control}
          name="sectionName"
          label="Section"
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

export default EditSectionNameForm;
