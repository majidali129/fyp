const courseCategories: { label: string; value: string }[] = [
    { label: "Web Development", value: "web-development" },
    { label: "Data Science", value: "data-science" },
    { label: "Artificial Intelligence", value: "artificial-intelligence" },
    { label: "Business & Management", value: "business-management" },
    { label: "Design & Creative Arts", value: "design-creative-arts" },
    { label: "Marketing", value: "marketing" },
    { label: "Mobile App Development", value: "mobile-app-development" },
    { label: "Cybersecurity", value: "cybersecurity" },
    { label: "Health & Fitness", value: "health-fitness" },
    { label: "Photography", value: "photography" },
    { label: "Finance & Accounting", value: "finance-accounting" },
    { label: "Language Learning", value: "language-learning" },
    { label: "Music & Audio", value: "music-audio" },
    { label: "Engineering", value: "engineering" },
    { label: "Personal Development", value: "personal-development" },
  ];

  const courseSortOptions: { label: string; value: string }[] = [
    { label: "Most Popular", value: "most-popular" },
    { label: "Highest Rated", value: "highest-rated" },
    { label: "Latest", value: "latest" },
    { label: "Oldest", value: "oldest" },
    { label: "Price: Low to High", value: "price-low-to-high" },
    { label: "Price: High to Low", value: "price-high-to-low" },
    { label: "Duration: Short to Long", value: "duration-short-to-long" },
    { label: "Duration: Long to Short", value: "duration-long-to-short" },
    { label: "Enrolled: High to Low", value: "enrolled-high-to-low" },
    { label: "Enrolled: Low to High", value: "enrolled-low-to-high" },
  ];

  const courseRatingOptions: { label: string; value: string }[] = [
    { label: "4 Stars & Up", value: "4-stars-up" },
    { label: "3 Stars & Up", value: "3-stars-up" },
    { label: "2 Stars & Up", value: "2-stars-up" },
    { label: "1 Star & Up", value: "1-star-up" },
    { label: "Below 4 Stars", value: "below-4-stars" },
    { label: "Below 3 Stars", value: "below-3-stars" },
    { label: "Below 2 Stars", value: "below-2-stars" },
    { label: "Only 5 Stars", value: "only-5-stars" },
  ];




  export {courseCategories, courseSortOptions, courseRatingOptions}