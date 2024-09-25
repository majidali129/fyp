import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import { MdOndemandVideo, MdOutlineDateRange } from "react-icons/md";

const tabs: Array<{ label: string; value: string; icon: ReactNode }> = [
  {
    label: "Basic Information",
    value: "basic-info",
    icon: <FiLayers className="w-4 h-4" />,
  },
  {
    label: "Advance Information",
    value: "advance-info",
    icon: <MdOutlineDateRange className="w-4 h-4" />,
  },
  {
    label: "Curriculum",
    value: "curriculum",
    icon: <MdOndemandVideo className="w-4 h-4" />,
  },
  {
    label: "Publish Course",
    value: "publish-course",
    icon: <FaRegPlayCircle className="w-4 h-4" />,
  },
];
const CreateNewCoursePage = () => {
  return (
    <section className="py-5">
      <div className="space-y-8 lg:space-y-5 *:bg-white *:rounded-sm">
        <div className="py-3">
          <Tabs defaultValue="basic-info">
            <TabsList className="px-0 overflow-x-scroll tablist h-auto max-sm:max-w-[21.4rem]  whitespace-nowrap py-2 w-full justify-between rounded-none lg:gap-2 *:!px-3 lg:*:px-4 *:w-full *:justify-start">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={`gap-2 border-b-2 border-b-white md:text-[1rem] text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-b-primary-500 `}
                >
                  {tab.icon} {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="px-4">
              <TabsContent value="basic-info">Basic Info</TabsContent>
              <TabsContent value="advance-info">Advance Info</TabsContent>
              <TabsContent value="curriculum">Curriculum</TabsContent>
              <TabsContent value="publish-course">Publish Course</TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CreateNewCoursePage;
