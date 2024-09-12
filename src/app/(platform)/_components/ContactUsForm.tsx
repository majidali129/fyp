'use client'

import SubmitBtn from "@/components/SubmitBtn"
import TextInput from "@/components/TextInput"
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MdSend } from "react-icons/md";


const contactFormSchema = z.object({
    firstName: z.string().min(3, {message: "First name is required & can't be less than 3 characters"}),
    lastName: z.string().min(3, {message: "Last name is required & can't be less than 3 characters"}),
    email: z.string({required_error: 'Email is required'}).email({message: "Please enter a valid email address"}),
    subject: z.string().min(3, {message: "Subject is required"}),
    message: z.string().min(10, {message: "Please add a descriptive message"})
})

type ContactFormValues = z.infer<typeof contactFormSchema>
const ContactUsForm = () => {

    const form = useForm<z.infer<typeof contactFormSchema>>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: ''
        }
      });

      const onSubmit = async (data: ContactFormValues) => {
        console.log(data);

      };
  return (
    <div className="space-y-4">
        <h5>Get In touch</h5>
        <p className="text-sm text-gray-500">Feel free contact with us, we love to make new partners & friends.</p>
        <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-3.5 xl:space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <TextInput
                  control={form.control}
                  name="firstName"
                  label="First Name"
                  placeholder="Majid"
                />
                <TextInput
                  control={form.control}
                  name="lastName"
                  label="Last Name"
                  placeholder="Ali"
                />
              </div>
              <TextInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Email address"
                type="email"
              />

              <TextInput
                control={form.control}
                name="subject"
                label="Subject"
                placeholder="Message Subject"
              />
              <TextInput
                control={form.control}
                name="message"
                label="Message"
                placeholder="Your message..."
              />


              <div className="flex items-center justify-end py-2">
                <SubmitBtn>Submit <MdSend className="w-5 h-5 text-gray-white" /></SubmitBtn>
              </div>
            </form>
          </Form>

    </div>
  )
}

export default ContactUsForm