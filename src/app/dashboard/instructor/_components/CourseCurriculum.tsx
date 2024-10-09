"use client";

import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Trash2 } from "lucide-react";
import { useId, useState } from "react";

import { GoPlus } from "react-icons/go";
import { IoMenuOutline } from "react-icons/io5";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { z } from "zod";
import EditSectionNameForm from "./EditSectionNameForm";
import EditLectureNameForm from "./EditLectureNameForm";

const lectureSchema = z.object({
  name: z.string().min(1, "Lecture name is required"),
  id: z.string(),
});

const sectionSchema = z.object({
  name: z.string().min(1, "Section name is required"),
  id: z.string(),
  lectures: z.array(lectureSchema),
});

type Section = z.infer<typeof sectionSchema>;
type Lecture = z.infer<typeof lectureSchema>;

const CourseCurriculum = () => {
  const [editSectionId, setEditSectionId] = useState<string | null>(null);
  const [editLectureId, setEditLectureId] = useState<string | null>(null);
  const id = useId();
  const [sections, setSections] = useState<Array<Section>>([
    {
      name: "Section 01",
      id: id + String(Math.random() * 1000),
      lectures: [
        { name: "Lecture 1 is here", id: id + String(Math.random() * 1000) },
      ],
    },
    {
      name: "Section 02",
      id: id + String(Math.random() * 1000),
      lectures: [
        { name: "Lecture 1 is here", id: id + String(Math.random() * 1000) },
      ],
    },
  ]);

  console.log(sections);

  function addNewSection() {
    const newSection: Section = {
      id: id + String(Math.random() * 1000),
      name: `Section ${sections.length + 1}`,
      lectures: [],
    };

    setSections((prev) => [...prev, newSection]);
    alert("new section added");
  }

  const handleUpdateSectionName = (sectionId: string, newName: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            name: newName,
          };
        }
        return section;
      })
    );
  };

  const deleteSection = (sectionId: string) => {
    console.log(sectionId);

    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const addLecture = (sectionId: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            lectures: [
              ...section.lectures,
              { id: id + String(Math.random() * 1000), name: "New Lecture" },
            ],
          };
        }
        return section;
      })
    );

    alert("new lectrue added");
  };

  const deleteLecture = (lectureId: string, sectionId: string) => {
    console.log(lectureId, sectionId);

    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            lectures: section.lectures.filter(
              (lecture) => lecture.id !== lectureId
            ),
          };
        }
        return section;
      })
    );
  };
  const handleUpdateLectureName = (
    sectionId: string,
    lectureId: string,
    newName: string
  ) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            lectures: section.lectures.map((lecture) =>
              lecture.id === lectureId ? { ...lecture, name: newName } : lecture
            ),
          };
        }
        return section;
      })
    );
  };

  return (
    <section className="*:px-4 lg:*:px-7 space-y-5">
      {/* header */}
      <div className="flex-between py-4 border-b border-b-gray-100">
        <h4>Course Curriculum</h4>
        <div className="md:space-x-2">
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
              key={section.id}
              className="bg-gray-50 p-4 px-3 lg:px-5 space-y-4"
            >
              {/* SECTION HEADER */}
              <div className="flex-between py-2">
                <div className="flex gap-3.5 *:gap-1.5">
                  <div className="flex items-center">
                    <IoMenuOutline className="w-5 h-5 mb-1 text-gray-800" />
                    <span className="font-semibold">Section {index + 1}:</span>
                  </div>
                  <p>{section.name}</p>
                </div>
                <div className="space-x-3 *:text-gray-500 hover:*:text-gray-800 flex items-center *:cursor-pointer">
                  <GoPlus
                    className="w-5 h-5 "
                    onClick={() => addLecture(section.id)}
                  />
                  <RiEdit2Line
                    className="w-5 h-5 "
                    onClick={() => {
                      setEditSectionId(section.id);
                    }}
                  />
                  <Modal
                    isOpen={editSectionId === section.id}
                    onClose={() => setEditSectionId(null)}
                    title="Edit Section Name"
                  >
                    <EditSectionNameForm
                      sectionId={section.id}
                      handleUpdateSectionName={handleUpdateSectionName}
                      onCancel={() => setEditSectionId(null)}
                    />
                  </Modal>
                  <RiDeleteBin6Line
                    className="w-5 h-5 hover:!text-error-500"
                    onClick={() => deleteSection(section.id)}
                  />
                </div>
              </div>

              {/* SECTION LECTURES */}
              <ul className="space-y-3">
                {section.lectures.map((lecture, index) => (
                  <div
                    key={lecture.id + Math.random()}
                    className="flex-between bg-white px-4 py-3 rounded-sm"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <IoMenuOutline className="w-5 h-5 text-gray-800/70" />
                        <span>{lecture.name}</span>
                      </div>
                    </div>
                    <div className="space-x-3 *:text-gray-500 grid grid-cols-[120px_auto_auto] items-center *:cursor-pointer">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="secondaryPrimary"
                            size="sm"
                            className="!text-primary-500"
                          >
                            Contents <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="z-50">
                          <DropdownMenuItem>Video</DropdownMenuItem>
                          <DropdownMenuItem>Attach File</DropdownMenuItem>
                          <DropdownMenuItem>Captions</DropdownMenuItem>
                          <DropdownMenuItem>Description</DropdownMenuItem>
                          <DropdownMenuItem>Lecture Notes</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <RiEdit2Line
                        className="w-5 h-5 hover:text-gray-800"
                        onClick={() => setEditLectureId(lecture.id)}
                      />
                      <Modal
                        isOpen={editLectureId === lecture.id}
                        onClose={() => setEditLectureId(null)}
                        title="Edit Lecture Name"
                      >
                        <EditLectureNameForm
                          sectionId={section.id}
                          lectureId={lecture.id}
                          handleUpdateLectureName={handleUpdateLectureName}
                          onCancel={() => setEditLectureId(null)}
                        />
                      </Modal>
                      <Trash2
                        className="h-5 w-5 hover:text-error-500 "
                        onClick={() => deleteLecture(lecture.id, section.id)}
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
    </section>
  );
};

export default CourseCurriculum;
