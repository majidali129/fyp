"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import SocielInput from "./SocielInput";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";
import SubmitBtn from "@/components/SubmitBtn";
import { z } from "zod";
import { instructorSocialFormSchema } from "@/schemas/instructor-social-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiGlobe } from "react-icons/ci";

type SocialFormValues = z.infer<typeof instructorSocialFormSchema>

export default function SocialSettingsForm() {
  const form = useForm<z.infer<typeof instructorSocialFormSchema>>(
      {
        resolver: zodResolver(instructorSocialFormSchema),
    defaultValues: {
      'website-url': "",
      'facebook-username': '',
      'insta-username': '',
      'linkedin-username': '',
      'twitter-username': '',
      'whatsapp-number': '',
      'youtube-username': ''
    },
  });

  const onSubmit = (data: SocialFormValues) => {
    console.log(data);
  }

  return (
    <Card className="w-full rounded-sm border-none">
      <CardHeader>
        <CardTitle>Social Profile</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form} >
          <form className="space-y-3 lg:space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <SocielInput
              icon={<CiGlobe className="w-5 h-5 text-primary-500" />}
              label="Personal Website"
              name="website-url"
              control={form.control}
              placeholder="Personal website or portfolio url..."
            />
            <div className="grid lg:grid-cols-3 lg:gap-4 gap-5">
            <SocielInput
              icon={<FaFacebookF className="w-5 h-5 text-primary-500"/>}
              label="Facebook"
              name="facebook-username"
              control={form.control}
              placeholder="Username"
            />
            <SocielInput
              icon={<FaInstagram className="w-5 h-5 text-primary-500"/>}
              label="Instagram"
              name="insta-username"
              control={form.control}
              placeholder="Username"
            />
            <SocielInput
              icon={<FaLinkedinIn className="w-5 h-5 text-primary-500"/>}
              label="Linkedin"
              name="linkedin-username"
              control={form.control}
              placeholder="Username"
            />
            </div>
            <div className="grid lg:grid-cols-3 lg:gap-4 gap-5">
            <SocielInput
              icon={<FaTwitter className="w-5 h-5 text-primary-500"/>}
              label="Twitter"
              name="twitter-username"
              control={form.control}
              placeholder="Username"
            />
            <SocielInput
              icon={<FaWhatsapp className="w-5 h-5 text-primary-500"/>}
              label="Whatsapp"
              name="whatsapp-number"
              control={form.control}
              placeholder="Phone number"
            />
            <SocielInput
              icon={<FaYoutube className="w-5 h-5 text-primary-500"/>}
              label="Youtube"
              name="youtube-username"
              control={form.control}
              placeholder="Username"
            />
            </div>

            <div>
                <SubmitBtn>Save Changes</SubmitBtn>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
