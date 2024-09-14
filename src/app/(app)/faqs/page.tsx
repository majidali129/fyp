import Banner from "@/app/(platform)/_components/Banner";
import AskQuestionForm from "@/components/AskQuestionForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { questionAns } from "@/data/faqs";

const topics: Array<{ id: string; topic: string }> = [
  { id: "general", topic: "General Information" },
  { id: "enrollment", topic: "Course Enrollment" },
  { id: "payment", topic: "Payment and Subscriptions" },
  { id: "material-access", topic: "Course Materials and Access" },
  { id: "certification", topic: "Certifications and Assessments" },
  { id: "technical-support", topic: "Technical Support" },
  { id: "instructor-community", topic: "Instructor and Community" },
  { id: "account-management", topic: "Account Management" },
];

const FAQsPage = () => {
  return (
    <>
      <Banner />
      <section className="py-8">
        <div className="container max-w-6xl">
          <div className="space-y-8">
              <h2>Frequently asked questions</h2>
            <div className="grid lg:grid-cols-[9fr_3fr] lg:gap-4 gap-5  ">
              <div className="h-full ">
                <Tabs
                  defaultValue="general"
                  className="grid md:grid-cols-[3fr_6fr] gap-3 lg:gap-4 h-full"
                >
                  <TabsList className="md:flex-col flex-between overflow-x-scroll tablist px-0 py-0 h-fit border border-gray-100">
                    {topics.map((topic) => (
                      <TabsTrigger
                        className="py-2.5 md:border-b border-b-gray-100 last-of-type:border-b-0 w-full data-[state=active]:bg-primary-500 data-[state=active]:text-gray-white"
                        key={topic.id}
                        value={topic.id}
                      >
                        {topic.topic}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <div className="">
                    {questionAns.map((item) => (
                      <TabsContent  key={item.topic} value={item.topic}>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem className="border-b-0 border border-gray-100 -mt-2 !mb-4" value={item.topic}>
                            <AccordionTrigger className="text-[1rem] [&>div]:flex-between [&>div]:px-3 [&>div]:py-2 [&>div]:!gap-x-0 ">{item.question}</AccordionTrigger>
                            <AccordionContent className="px-3">{item.answer}</AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </TabsContent>
                    ))}
                  </div>
                </Tabs>
              </div>

              {/* ASK QUESTION FORM */}
              <div className="bg-gray-50 py-5 px-4 rounded-[4px] space-y-2.5">
                <h5>Don&apos;t find your answer!</h5>
                <p className="text-sm">
                  Don’t worry, write your question here and our support team
                  will help you.
                </p>

                <AskQuestionForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQsPage;
