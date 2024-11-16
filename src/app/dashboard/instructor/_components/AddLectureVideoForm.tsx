"use client";

import { Badge } from "@/components/ui/badge";
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
import { formatedDuration } from "@/helpers/calculateDuration";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 1024 * 4;

const lecFileFormSchema = z.object({
  video: z.any().refine((files) => {
    if (!files || files.length === 0) return true;
    return files[0]?.size <= MAX_FILE_SIZE;
  }, `Max file size is 4GB.`),
});

type LecFileFormType = z.infer<typeof lecFileFormSchema>;

function AddLectureVideoForm({
  onCancel,
  sectionId,
  lectureId,
  onFileUpload
}: {
  onCancel?: () => void;
  sectionId: string,
  lectureId: string
  onFileUpload: (video: File, secId: string, lecId: string) => void;
}) {
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [videoDuration, setVideoDuration] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof lecFileFormSchema>>({
    resolver: zodResolver(lecFileFormSchema),
    defaultValues: {
      video: null,
    },
  });

  const handleFileChange = (files: FileList | null) => {
    if (files?.[0]) {
      setAttachedFile(files[0]);
    } else {
      setAttachedFile(null);
      setVideoDuration(null);
    }
  };


  useEffect(() => {
    let objectURL: string | null = null;

    if (attachedFile) {
      // Create a video element to load the video and extract its duration
      const videoElement = document.createElement("video");
      objectURL = URL.createObjectURL(attachedFile);
      videoElement.src = objectURL;
      setPreview(objectURL);

      // When metadata is loaded, extract the duration
      videoElement.onloadedmetadata = () => {
        const formattedDuration = formatedDuration(videoElement.duration);
        setVideoDuration(formattedDuration);
      };
      return () => {
        // Cleanup the object URL
        if (objectURL) URL.revokeObjectURL(objectURL);
      };
    }

    return () => {
      if (objectURL) URL.revokeObjectURL(objectURL);
    };
  }, [attachedFile]);

  const onSubmit = (data: LecFileFormType) => {
    onFileUpload?.(data.video[0], sectionId, lectureId)
    onCancel?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3.5 md:space-y-5 2xl:space-y-5"
      >
        {!attachedFile ? (
          <div className="space-y-1.5">
            <FormField
              control={form.control}
              name="video"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <div className="grid lg:grid-cols-[auto_23%]">
                        <div className=" border border-gray-100 grid grid-cols-[20%_auto] lg:grid-cols-[30%_auto]">
                          <FormLabel
                            htmlFor="lecVideo"
                            className="px-1.5 py-2   text-gray-900 flex items-center justify-center"
                          >
                            Upload File
                          </FormLabel>
                          <Input
                            name={field.name}
                            onChange={(e) => {
                              field.onChange(e.target.files);
                              handleFileChange(e.target.files);
                            }}
                            type="file"
                            className="bg-transparent text-transparent focus:bg-transparent  video-upload ring-0"
                            id="lecVideo"
                            accept="video/*"
                          />
                        </div>
                        <label
                          htmlFor="lecVideo"
                          className="bg-gray-100 px-1.5 py-2 hidden  text-gray-900 lg:flex items-center justify-center"
                        >
                          Upload File
                        </label>
                      </div>{" "}
                    </div>
                  </FormControl>
                  <FormMessage className="text-error-400" />
                </FormItem>
              )}
            />
            <p className="text-sm">
              Note: All files should be at least 720p and less than 4.0 GB.
            </p>
          </div>
        ) : (
          <div className="py-2 grid items-center gap-3">
            {preview ? (
              <video className="w-full" preload="none" key={attachedFile?.name}>
                <source src={preview} />
              </video>
            ) : (
              <p>Generating Preview. Please wait...</p>
            )}

            <div>
              <div className="flex items-center justify-start gap-1.5">
                <Badge
                  variant="transparent"
                  className="text-success-500 border-none"
                >
                  File Uploaded
                </Badge>

                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                {videoDuration && <span>{videoDuration}</span>}
              </div>
              <p className="text-gray-900 line-clamp-2">{attachedFile?.name}</p>
              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <div className="">
                          <div>
                            <Input
                              name={field.name}
                              onChange={(e) => {
                                field.onChange(e.target.files);
                                // setAttachedFile(e.target.files?.[0] || null);
                                handleFileChange(e.target.files);
                              }}
                              type="file"
                              className="bg-transparent hidden text-transparent focus:bg-transparent  video-upload ring-0"
                              id="lecVideo"
                              accept="video/*"
                            />
                          </div>
                          <label
                            htmlFor="lecVideo"
                            className="text-secondary-500 flex items-center w-fit justify-center"
                          >
                            Upload File
                          </label>
                        </div>{" "}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        <div className="flex-between">
          <Button type="button" variant={"transparentGhost"} onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={!attachedFile}>
            Upload Video
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AddLectureVideoForm;
