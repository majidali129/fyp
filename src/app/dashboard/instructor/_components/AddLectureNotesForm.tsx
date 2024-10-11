"use client";

import TextArea from "@/components/TextArea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const notesFormSchema = z.object({
  message: z.string().min(2, { message: "Notes message is mendatory." }),
  noteFile: z.any().refine((files) => {
    // Only run validation if file exists
    if (!files || files.length === 0) return true;
    return files[0]?.size <= MAX_FILE_SIZE;
  }, `Max file size is 5MB.`),
});

type NotesFormType = z.infer<typeof notesFormSchema>;

function AddLectureNotesForm({
  onCancel,
  sectionId,
  lectureId,
}: {
  onCancel?: () => void;
  sectionId?: string;
  lectureId?: string;
}) {
  const [file, setFile] = useState<File | undefined>(undefined);
  const form = useForm<z.infer<typeof notesFormSchema>>({
    resolver: zodResolver(notesFormSchema),
    defaultValues: {
      message: "",
      noteFile: undefined,
    },
  });


  const {isValid} = useFormState({control: form.control})

  const onSubmit = (data: NotesFormType) => {
    // handleAddDescription(sectionId, lectureId, data.description);
    console.log(data);
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
          name="message"
          label="Notes"
          rows={7}
          placeholder="Write your lecture Notes here...."
        />

        <FormField
          control={form.control}
          name="noteFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormLabel
                  htmlFor="noteFile"
                  className="w-full flex-center border border-gray-100 py-4"
                >
                  <div>
                    {!file ? (
                      <div className="flex space-y-1.5 flex-col items-center">
                        <h6>Upload Notes</h6>
                        <p className="text-gray-500 text-sm">
                          Drag and drop a file or{" "}
                          <span className="text-gray-900">Browse file</span>{" "}
                        </p>
                      </div>
                    ) : (
                      <span>{file.name}</span>
                    )}
                  </div>
                  <Input
                    name={field.name}
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      setFile(e.target.files?.[0] || undefined);
                    }}
                    type="file"
                    className="hidden"
                    id="noteFile"
                    accept="image/*"
                  />
                </FormLabel>
              </FormControl>
              <FormMessage className="text-error-400" />
            </FormItem>
          )}
        />

        <div className="flex-between">
          <Button type="button" variant={"transparentGhost"} onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={!isValid}>Add Description</Button>
        </div>
      </form>
    </Form>
  );
}

export default AddLectureNotesForm;
