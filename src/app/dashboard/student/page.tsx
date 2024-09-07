import Image from "next/image";
import instructor from "../../../../public/images/instructor2.png";
import { Button } from "@/components/ui/button";
import { LuMoveRight } from "react-icons/lu";
import { Tabs, TabsContent} from "@/components/ui/tabs";
import DashboardTabList from "@/app/dashboard/student/_components/DashboardTabList";
import Dashboard from "./_components/Dashboard";
import Courses from "./_components/Courses";
import Teachers from "./_components/Teachers";
import Wishlist from "./_components/Wishlist";
import PurchaseHistory from "./_components/PurchaseHistory";
import Settings from "./_components/Settings";
import Messages from "./_components/Messages";

const StudentHomePage = () => {
  return (
    <section>
      <div className="w-full bg-primary-100 min-h-52"></div>
      {/* <div className=" min-h-screen"> */}
      <div className=" min-h-screen">
        <div className="container !px-0 md:max-w-6xl bg-white mx-auto rounded absolute top-16 left-1/2 -translate-x-1/2">
          <div className="w-full *:px-7">
            {/* INSTRUCTOR INFO CARD */}
            <div className="py-7 flex max-md:flex-col max-md:gap-y-3 md:flex-between">
              <div className="flex-start !gap-x-3.5">
                <Image
                  src={instructor}
                  alt="instructor"
                  priority
                  height={80}
                  width={80}
                  className="rounded-full"
                />
                <div>
                  <h5>Majid Ali</h5>
                  <span className="text-gray-500 text-sm">
                    Frontend | Backend Engineer
                  </span>
                </div>
              </div>
              <Button variant={"secondaryPrimary"}>
                Become Instructor <LuMoveRight className="h-4 w-4" />
              </Button>
            </div>

            {/* TABS */}
            <Tabs className="!px-0" defaultValue="dashboard">
              <DashboardTabList />
              <div className="w-full pt-6 max-lg:px-7">
              <TabsContent value="dashboard">
                <Dashboard />
              </TabsContent>
              <TabsContent value="courses">
                <Courses />
              </TabsContent>
              <TabsContent value="teachers">
                <Teachers />
              </TabsContent>
              <TabsContent value="messages">
                <Messages />
              </TabsContent>
              <TabsContent value="wishlist">
                <Wishlist />
              </TabsContent>
              <TabsContent value="purchase-history">
                <PurchaseHistory />
              </TabsContent>
              <TabsContent value="settings">
                <Settings />
              </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentHomePage;
