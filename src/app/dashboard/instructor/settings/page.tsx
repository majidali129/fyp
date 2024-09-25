import React from "react";
import SocialSettingsForm from "../_components/SocialSettingsForm";
import InstructorUpdatePasswordForm from "../_components/InstructorUpdatePasswordForm";
import NotificationsForm from "../_components/NotificationsForm";
import InstructorAccountSettingsForm from "../_components/InstructorAccountSettingsForm";

const InstructorSettingsPage = () => {
  return (
    <section className="py-5">
      <div className="space-y-8 lg:space-y-5 *:rounded-sm">
        <div className="bg-white">
          <InstructorAccountSettingsForm />
        </div>
        <div className="bg-white">
          <SocialSettingsForm />
        </div>
        <div className="grid lg:grid-cols-2 *:bg-white gap-4">
          <div>
            <NotificationsForm />
          </div>
          <div>
            <InstructorUpdatePasswordForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorSettingsPage;
