export interface TestimonialType {
    username: string;
    company: string;
    position: string;
    review: string
}

 export const TESTIMONIALS: Array<TestimonialType> = [
    {
      username: "John Doe",
      company: "EduTech Solutions",
      position: "CEO",
      review: "The LMS platform has completely transformed the way we manage our employee training programs. It's user-friendly, flexible, and saves us so much time!",
    },
    {
      username: "Jane Smith",
      company: "LearnPro",
      position: "Training Manager",
      review: "We’ve been using this platform for over a year, and it has streamlined our course management like never before. The support team is also top-notch!",
    },
    {
      username: "Alex Johnson",
      company: "SkillMasters Inc.",
      position: "Product Lead",
      review: "This LMS is perfect for delivering and tracking online courses. The analytics tools are incredibly detailed and help us improve the learning experience for our users.",
    }
  ];
