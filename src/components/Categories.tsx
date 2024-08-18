import Image from "next/image";

import img from "../../public/images/business.png";
import Section from "./Section";
import { formateNumber } from "@/helpers";
import LinkBtn from "./LinkButton";

interface Category {
  name: string;
  icon: string;
  courses: number;
  id: number;
}

const categories: Category[] = [
  {
    id: 10,
    name: "Label",
    icon: "/public/images/label.png",
    courses: 21345
  },
  {
    id: 11,
    name: "Business",
    icon: "/public/images/business.png",
    courses: 3251
  },
  {
    id: 12,
    name: "Finance",
    icon: "/public/images/finance.png",
    courses: 32323
  },
  {
    id: 13,
    name: "IT & Software",
    icon: "/public/images/IT.png",
    courses: 230990
  },
  {
    id: 14,
    name: "Personal Development",
    icon: "/public/images/personal.png",
    courses: 23323
  },
  {
    id: 15,
    name: "Office Productivity",
    icon: "/public/images/productivity.png",
    courses: 2344
  },
  {
    id: 16,
    name: "Marketing",
    icon: "/public/images/marketing.png",
    courses: 12223
  },
  {
    id: 17,
    name: "Lifestyle",
    icon: "/public/images/lifestyle.png",
    courses: 12342
  },
  {
    id: 18,
    name: "Design   ",
    icon: "/public/images/design.png",
    courses: 2122
  },
  {
    id: 19,
    name: "Healh & Fitness",
    icon: "/public/images/health.png",
    courses: 23232
  }
];

const Categories = () => {
  return (
    <Section>
      <div className="tw-container ">
        <h2 className="text-center">Browse top category</h2>

        <ul className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-4">
          {categories.map((category: Category) => (
            <Category key={category.id} category={category} />
          ))}
        </ul>

        <p className="text-center text-sm">
          We have more category & subcategory.{" "}
          <LinkBtn className="text-normal text-primary-500" direction="forward">
            Browse All{" "}
          </LinkBtn>
        </p>
      </div>
    </Section>
  );
};

export default Categories;

const Category = ({ category }: { category: Category }) => {
  const { id, name, courses, icon } = category;
  return (
    <div className="flex items-center gap-x-2 bg-gray-100 py-4 px-3 rounded-sm">
      <div className="basis-14 flex-center">
        <div className="bg-white p-2 flex-center rounded-sm">
          <Image
            src={img}
            alt="category type image"
            width={30}
            height={30}
            priority
          />
        </div>
      </div>
      <div className="flex flex-col ">
        <p className="text-[1rem] text-gray-900">{name}</p>
        <p className="text-sm">{formateNumber(courses)}</p>
      </div>
    </div>
  );
};
