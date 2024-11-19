"use client";

import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dynamic from "next/dynamic";
import { ChevronDown, Trash2 } from "lucide-react";
import { useId, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoMenuOutline } from "react-icons/io5";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { z } from "zod";
import EditSectionNameForm from "./EditSectionNameForm";
import AddLectureNotesForm from "./AddLectureNotesForm";
import AddLectureCaptionForm from "./AddLectureCaptionForm";
import AddLectureDescriptionForm from "./AddLectureDescriptionForm";
import { BsThreeDotsVertical } from "react-icons/bs";
import EditLectureCaptionForm from "./EditLectureNameForm";
import { useNewCourseProvider } from "@/context/new-course/new-course";
import { usePathname, useRouter } from "next/navigation";
const AddLectureVideoForm = dynamic(() => import("./AddLectureVideoForm"), {
  loading: () => <p>Loading...</p>, // Add a loader if needed
  ssr: false, // Disable server-side rendering for this component
});

const lectureSchema = z.object({
  publicId: z.string().min(1, "Public ID is required"),
  title: z.string().min(1, "Lecture caption is required"),
  caption: z.string().min(1, "Lecture caption is required"),
  description: z.string().min(1, "Lecture description is required"),
  order: z.number().nonnegative("Order must be non-negative"),
  tags: z.array(z.string()).optional(),
  video: z.any().refine((files) => {
    if (!files || files.length === 0) return true;
    return files[0]?.size <= 1024 * 1024 * 1024 * 4;
  }, `Max file size is 4GB.`),
});

const sectionSchema = z.object({
  title: z.string().min(1, "Section name is required"),
  publicId: z.string(),
  order: z.number().nonnegative("Order must be non-negative"),
  lectures: z.array(lectureSchema),
});

type Section = z.infer<typeof sectionSchema>;
type Lecture = z.infer<typeof lectureSchema>;

const CourseCurriculumForm = () => {
  const [editSectionId, setEditSectionId] = useState<string | null>(null);
  const [editLectureId, setEditLectureId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean | null>(null);
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [secOrder, setSecOrder] = useState<number>(1);
  const [lecOrder, setLecOrder] = useState<number>(1);

  const { setMetadata } = useNewCourseProvider();

  const router = useRouter();
  const currentPath = usePathname();
  const newPath =
    currentPath.split("/")?.slice(0, -1).join("/") + "/publish-course";

  const openModalWithForm = (formType: string, title: string) => {
    setSelectedForm(formType);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedForm(null);
    setModalTitle("");
  };

  const id = useId(); // for unique
  const [sections, setSections] = useState<Array<Section>>([]);

  function addNewSection() {
    setSecOrder((prevOrder) => prevOrder + 1);
    const newSection: Section = {
      publicId: id + String(Math.random() * 1000),
      title: `Section ${secOrder}`,
      order: secOrder,
      lectures: [],
    };

    setSections((prev) => [...prev, newSection]);
  }

  const handleUpdateSectionName = (sectionId: string, newTitle: string) => {
    setSections(
      sections.map((section) => {
        if (section.publicId === sectionId) {
          return {
            ...section,
            title: newTitle,
          };
        }
        return section;
      })
    );
  };

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter((section) => section.publicId !== sectionId));
    setSecOrder((currentOrder) => currentOrder - 1);
  };

  const addLecture = (sectionId: string) => {
    const newLecture: Lecture = {
      title: "Lecture 1",
      caption: "little caption for lecture is here",
      description: "",
      video: null,
      // notes: {
      //   message: "",
      //   file: null,
      // },
      order: lecOrder,
      publicId: id + String(Math.random() * 1000),
    };

    setSections(
      sections.map((section) => {
        if (section.publicId === sectionId) {
          return {
            ...section,
            lectures: [...section.lectures, newLecture],
          };
        }
        return section;
      })
    );

    setLecOrder((prevOrder) => prevOrder + 1);
  };

  const deleteLecture = (lectureId: string, sectionId: string) => {
    setSections(
      sections.map((section) => {
        if (section.publicId === sectionId) {
          return {
            ...section,
            lectures: section.lectures.filter(
              (lecture) => lecture.publicId !== lectureId
            ),
          };
        }
        return section;
      })
    );
    setLecOrder((prevOrder) => prevOrder - 1);
  };
  const handleLecCaptionUpdate = (
    newCaption: string,
    secId: string,
    lecId: string
  ) => {
    console.log("update lec called...");

    setSections(
      sections.map((section) => {
        if (section.publicId === secId) {
          return {
            ...section,
            lectures: section.lectures.map((lecture) =>
              lecture.publicId === lecId
                ? { ...lecture, caption: newCaption }
                : lecture
            ),
          };
        }
        return section;
      })
    );
  };
  const handleLecDescriptionUpload = (
    description: string,
    secId: string,
    lecId: string
  ) => {
    setSections(
      sections.map((section) => {
        if (section.publicId === secId) {
          return {
            ...section,
            lectures: section.lectures.map((lecture) =>
              lecture.publicId === lecId ? { ...lecture, description } : lecture
            ),
          };
        }
        return section;
      })
    );
  };
  const handleLecCaptionUpload = (
    caption: string,
    secId: string,
    lecId: string
  ) => {
    setSections(
      sections.map((section) => {
        if (section.publicId === secId) {
          return {
            ...section,
            lectures: section.lectures.map((lecture) =>
              lecture.publicId === lecId ? { ...lecture, caption } : lecture
            ),
          };
        }
        return section;
      })
    );
  };

  const handleLecVideoUpload = (video: File, secId: string, lecId: string) => {
    setSections(
      sections.map((section) => {
        if (section.publicId === secId) {
          return {
            ...section,
            lectures: section.lectures.map((lecture) =>
              lecture.publicId === lecId ? { ...lecture, video } : lecture
            ),
          };
        }
        return section;
      })
    );
  };
  const handleLecNotesUpload = (
    notes: { file: File; message: string },
    secId: string,
    lecId: string
  ) => {
    setSections(
      sections.map((section) => {
        if (section.publicId === secId) {
          return {
            ...section,
            lectures: section.lectures.map((lecture) =>
              lecture.publicId === lecId ? { ...lecture, notes } : lecture
            ),
          };
        }
        return section;
      })
    );
  };

  const renderForm = (secId: string, lecId: string) => {
    switch (selectedForm) {
      case "upload-video":
        return (
          <AddLectureVideoForm
            onCancel={closeModal}
            onFileUpload={handleLecVideoUpload}
            sectionId={secId}
            lectureId={lecId}
          />
        );
      case "add-notes":
        return (
          <AddLectureNotesForm
            onCancel={closeModal}
            onNotesUpload={handleLecNotesUpload}
            sectionId={secId}
            lectureId={lecId}
          />
        );
      case "add-caption":
        return (
          <AddLectureCaptionForm
            onCancel={closeModal}
            onCaptionAdd={handleLecCaptionUpload}
            sectionId={secId}
            lectureId={lecId}
          />
        );
      case "add-description":
        return (
          <AddLectureDescriptionForm
            onCancel={closeModal}
            onDescriptionAdd={handleLecDescriptionUpload}
            sectionId={secId}
            lectureId={lecId}
          />
        );
      default:
        return null;
    }
  };

  const handleSaveCurriculum = () => {
    setMetadata({ sections });
    handleMoveNext();
  };

  function handleMoveNext() {
    router.push(newPath);
  }

  return (
    <section className="*:px-4 lg:*:px-7 space-y-5">
      {/* header */}
      <div className="md:flex-between space-y-3 py-4 border-b border-b-gray-100">
        <h4>Course Curriculum</h4>
        <div className="md:space-x-2 max-sm:flex-end">
          <Button size="sm" variant="secondaryPrimary">
            Save
          </Button>
          <Button size="sm" variant="transparentPrimary">
            Save & Preview
          </Button>
        </div>
      </div>

      <div className="pt-2 pb-8 min-h-72">
        <div className="space-y-7">
          {sections.map((section, index) => (
            <div
              key={section.publicId}
              className="bg-gray-50 p-4 px-3 lg:px-5 space-y-4"
            >
              {/* SECTION HEADER */}
              <div className="flex-between py-2">
                <div className="flex gap-3.5 *:gap-1.5">
                  <div className="flex items-center">
                    <IoMenuOutline className="w-5 h-5 mb-1 text-gray-800" />
                    <span className="font-semibold">
                      Section {section.order}:
                    </span>
                  </div>
                  <p>{section.title}</p>
                </div>
                <div className="space-x-3 *:text-gray-500 hover:*:text-gray-800 flex items-center *:cursor-pointer">
                  <GoPlus
                    className="md:w-5 w-4 md:h-5 h-4 "
                    onClick={() => addLecture(section.publicId)}
                  />
                  <RiEdit2Line
                    className="md:w-5 w-4 md:h-5 h-4 "
                    onClick={() => {
                      setEditSectionId(section.publicId);
                    }}
                  />
                  <Modal
                    isOpen={editSectionId === section.publicId}
                    onClose={() => setEditSectionId(null)}
                    title="Edit Section Name"
                  >
                    <EditSectionNameForm
                      sectionId={section.publicId}
                      handleUpdateSectionName={handleUpdateSectionName}
                      onCancel={() => setEditSectionId(null)}
                    />
                  </Modal>
                  <RiDeleteBin6Line
                    className="md:w-5 w-4 md:h-5 h-4 hover:!text-error-500"
                    onClick={() => deleteSection(section.publicId)}
                  />
                </div>
              </div>

              {/* SECTION LECTURES */}
              <ul className="space-y-3">
                {section.lectures.map((lecture, index) => (
                  <div
                    key={lecture.publicId + Math.random()}
                    className="flex-between bg-white px-3 md:px-4 py-3 rounded-sm"
                  >
                    <div>
                      <div className="grid grid-cols-[20px_auto] items-center gap-1.5">
                        <IoMenuOutline className="w-5 h-5 text-gray-800/70 " />
                        <span className="line-clamp-1">{lecture.caption}</span>
                      </div>
                    </div>
                    <div className="space-x-3 *:text-gray-500 grid grid-cols-[30px_auto_auto] md:grid-cols-[120px_auto_auto] items-center *:cursor-pointer ">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            variant="secondaryPrimary"
                            size="sm"
                            className="!text-primary-500 max-sm:px-1"
                          >
                            <div className="hidden md:flex-start">
                              Contents <ChevronDown className="ml-2 h-4 w-4" />
                            </div>
                            <BsThreeDotsVertical className="w-4 h-4 md:hidden" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="py-2 *:cursor-pointer bg-white hover:*:bg-primary-100 border-gray-100">
                          <DropdownMenuItem
                            onClick={() =>
                              openModalWithForm("upload-video", "Lecture Video")
                            }
                          >
                            Video
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              openModalWithForm(
                                "add-caption",
                                "Add Lecture Caption"
                              )
                            }
                          >
                            Captions
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              openModalWithForm(
                                "add-description",
                                "Add Lecture Description"
                              )
                            }
                          >
                            Description
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              openModalWithForm(
                                "add-notes",
                                "Add Lecture Notes"
                              )
                            }
                          >
                            Lecture Notes
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Modal
                        title={modalTitle}
                        onClose={closeModal}
                        isOpen={isModalOpen!}
                      >
                        {renderForm(section.publicId, lecture.publicId)}
                      </Modal>
                      <RiEdit2Line
                        className="md:w-5 w-4 md:h-5 h-4 hover:text-gray-800"
                        onClick={() => setEditLectureId(lecture.publicId)}
                      />
                      <Modal
                        isOpen={editLectureId === lecture.publicId}
                        onClose={() => setEditLectureId(null)}
                        title="Edit Lecture Caption"
                      >
                        <EditLectureCaptionForm
                          sectionId={section.publicId}
                          lectureId={lecture.publicId}
                          handleCaptionUpdate={handleLecCaptionUpdate}
                          onCancel={() => setEditLectureId(null)}
                        />
                      </Modal>
                      <Trash2
                        className="md:w-5 w-4 md:h-5 h-4 hover:text-error-500 "
                        onClick={() =>
                          deleteLecture(lecture.publicId, section.publicId)
                        }
                      />
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          ))}
          <Button
            variant="secondaryPrimary"
            className="w-full rounded-none -z-20"
            onClick={addNewSection}
          >
            Add Section
          </Button>
        </div>
      </div>

      <div className="md:flex-between max-sm:*:w-full py-2 space-y-3">
        <Button type="button" variant="outline">
          Previous
        </Button>

        <Button type="button" onClick={handleSaveCurriculum}>
          Save & Next
        </Button>
      </div>
    </section>
  );
};

export default CourseCurriculumForm;
