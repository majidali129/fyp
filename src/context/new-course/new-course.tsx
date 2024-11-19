'use client'

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { NewCourseMetadataState, NewCourseContextProviderProp, NewCourseValue } from "./defs";
import { CourseStatus, Duration, Level, PricingType } from "@/models/newCourse.model";


const NewCourseContext = createContext<NewCourseValue | undefined>(undefined);


const initialState: NewCourseMetadataState = {
  // Basic Course Info
  title: "",
  subTitle: "",
  category: "",
  subCategory: "",
  topic: "",
  language: "",
  subtitleLanguage: undefined,
  courseLevel: Level.Beginner,
  courseDuration: Duration["1-3 Months"],
  pricingType: PricingType.Paid,
  price: 0,
  discount: 0,
  enrollmentLimit: 0,
  format: "",
  status: CourseStatus.Draft,

  // Advance Info
  thumbnail: null,
  trailer: null,
  briefSummary: "",
  description: "",
  whatYouWillTeach: [],
  targetAudience: [],
  courseRequirements: [],

  // Curriculum
  sections: [],

  // Publish Course
  welcomeMessage: "",
  congratulationMessage: "",
  courseInstructors: [],
};

const NewCourseProvider = ({ children }: NewCourseContextProviderProp) => {
  const [metadata, setMetadata] = useState<NewCourseMetadataState>(initialState);

  console.log("Rerender in NewCourseProvider");

  const updateMetadata = (newData: Partial<NewCourseMetadataState>) => {
    console.log(`state updater called with`, newData);

    setMetadata((prevData) => ({...prevData, ...newData}));
  }
  const value: NewCourseValue = useMemo(() => {
    console.log("Object re-created");

    return {
      ...metadata,
      setMetadata:updateMetadata
    };
  }, [metadata]);

  return (
    <NewCourseContext.Provider value={value}>
      {children}
    </NewCourseContext.Provider>
  );
};

// CUSTOM HOOK FOR ACCESSING THE CONTEXT
const useNewCourseProvider = () => {
  const ctx = useContext(NewCourseContext);
  if (!ctx) {
    throw new Error(
      "You overlooked wrapping with NewCourseContextProvider or your initial state is falsy"
    );
  }

  return ctx;
};

export { NewCourseContext, NewCourseProvider, useNewCourseProvider };
