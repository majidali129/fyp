"use client";

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
import { useForm } from "react-hook-form";
import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const lecFileFormSchema = z.object({
  file: z.any().refine((files) => {
    // Only run validation if file exists
    if (!files || files.length === 0) return true;
    return files[0]?.size <= MAX_FILE_SIZE;
  }, `Max file size is 5MB.`),
});

type LecFileFormType = z.infer<typeof lecFileFormSchema>;

function AddLectureFileForm({
  onCancel,
  sectionId,
  lectureId,
}: {
  onCancel?: () => void;
  sectionId?: string;
  lectureId?: string;
}) {
  const [attachedFile, setAttachedFile] = useState<File | undefined>(undefined);
  const form = useForm<z.infer<typeof lecFileFormSchema>>({
    resolver: zodResolver(lecFileFormSchema),
    defaultValues: {
      file: undefined,
    },
  });


  const onSubmit = (data: LecFileFormType) => {
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
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormLabel
                  htmlFor="lecFile"
                  className="w-full flex-center border border-gray-100 py-5"
                >
                  <div>
                    {!attachedFile ? (
                      <div className="flex space-y-1.5 flex-col items-center">
                        <h6>Attach File</h6>
                        <p className="text-gray-500 text-sm">
                          Drag and drop a file or{" "}
                          <span className="text-gray-900">Browse file</span>{" "}
                        </p>
                      </div>
                    ) : (
                      <span>{attachedFile.name}</span>
                    )}
                  </div>
                  <Input
                    name={field.name}
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      setAttachedFile(e.target.files?.[0] || undefined);
                    }}
                    type="file"
                    className="hidden"
                    id="lecFile"
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
          <Button type="submit" disabled={attachedFile === undefined}>
            Add Description
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AddLectureFileForm;
