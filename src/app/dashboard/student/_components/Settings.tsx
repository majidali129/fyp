"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { PiUploadSimple } from "react-icons/pi";
import { IoCloudUploadOutline } from "react-icons/io5";
import SubmitBtn from "@/components/SubmitBtn";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/TextInput";
import { updatePasswordSchema } from "@/schemas/passwordSchemas";
import UpdateUserInfoForm from "./UpdateUserInfoForm";
import ChangeStudentPasswordForm from "./UpdatePasswordForm";




const Settings = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }


  return (
    <div className="space-y-9 *:space-y-5">
      <div className="*:px-5">
        <h3>Account Settings</h3>

        <div className="grid md:grid-cols-[3fr_9fr] md:gap-8 lg:gap-16">
          {/* IMAGE UPLOAD SECTION */}
          <div className="p-6 space-y-2.5 border max-h-[23rem] md:flex flex-col items-center justify-center border-gray-200">
            <div className=" h-60 md:w-60">
              <Label
                htmlFor="img"
                className="flex-center h-full w-full bg-secondary-50 relative"
              >
                {!preview && (
                  <IoCloudUploadOutline className="w-16 h-16 text-secondary-300" />
                )}
                <div className="flex-center absolute bg-secondary-600/10 py-2 w-full bottom-0 left-0 right-0 *:text-secondary-900">
                  <PiUploadSimple className="h-5 w-5" />
                  <span>Upload Phote</span>
                </div>
                <Input
                  type="file"
                  id="img"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                {image && (
                  <Image
                    src={preview!}
                    width={240}
                    height={240}
                    className="object-cover aspect-video"
                    priority
                    alt="user profile photo"
                  />
                )}
              </Label>
            </div>
            <p className="text-gray-500 px-1.5 text-sm text-center">
              Image size should be under 1MB and image ratio needs to be 1:1
            </p>
          </div>
          {/* USER INFO UPDATE SECTION */}
          <div className="space-y-4">
          <h3>Profile Info</h3>
            <UpdateUserInfoForm userPhoto={image} />
          </div>
        </div>

        <div className="py-10 space-y-4">
        <h3>Change Password</h3>
        <div className="">
            <div className="lg:w-1/3 ">
            <ChangeStudentPasswordForm />
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;


