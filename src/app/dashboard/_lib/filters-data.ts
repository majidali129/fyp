type ItemType = {value: string, label: string}

const courseCategories: Array<ItemType> = [
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

  const courseSortOptions: Array<ItemType> = [
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

  const courseRatingOptions: Array<ItemType> = [
    { label: "4 Stars & Up", value: "4-stars-up" },
    { label: "3 Stars & Up", value: "3-stars-up" },
    { label: "2 Stars & Up", value: "2-stars-up" },
    { label: "1 Star & Up", value: "1-star-up" },
    { label: "Below 4 Stars", value: "below-4-stars" },
    { label: "Below 3 Stars", value: "below-3-stars" },
    { label: "Below 2 Stars", value: "below-2-stars" },
    { label: "Only 5 Stars", value: "only-5-stars" },
  ];

  const courseLanguages: Array<ItemType> = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "chinese", label: "Chinese" },
    { value: "hindi", label: "Hindi" },
    { value: "arabic", label: "Arabic" },
    { value: "portuguese", label: "Portuguese" },
    { value: "russian", label: "Russian" },
    { value: "japanese", label: "Japanese" },
  ];

  const courseFormats: Array<ItemType> = [
    { value: "self-paced", label: "Self-paced" },
    { value: "live", label: "Live" },
  ]

  const coursePricingTypes: Array<ItemType> = [
    { value: "Free", label: "Free" },
    { value: "Paid", label: "Paid" },
  ]



  const subtitleLanguages: Array<ItemType> = [
    { value: "none", label: "No Subtitles" },
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "chinese", label: "Chinese" },
    { value: "hindi", label: "Hindi" },
    { value: "portuguese", label: "Portuguese" },
    { value: "russian", label: "Russian" },
    { value: "japanese", label: "Japanese" },
  ];

  const courseLevels: Array<ItemType> = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
    { value: "Expert", label: "Expert" },
    { value: "All Levels", label: "All Levels" },
  ];

  const courseDurations: Array<ItemType> = [
    { value: "6-12 Months", label: "6-12 Months" },
    { value: "3-6 Months", label: "3-6 Months" },
    { value: "1-3 Months", label: "1-3 Months" },
    { value: "1-4 Weeks", label: "1-4 Weeks" },
    { value: "1-7 Days", label: "1-7 Days" },
    { value: "self-paced", label: "self-paced" },
  ];

  const courseSbuCategories: {
    label: string;
    value: string;
    subCategories: { label: string; value: string }[]
  }[] = [
    {
      label: "Web Development",
      value: "web-development",
      subCategories: [
        { label: "Frontend Development", value: "frontend-development" },
        { label: "Backend Development", value: "backend-development" },
        { label: "Full Stack Development", value: "full-stack-development" },
        { label: "JavaScript Frameworks", value: "javascript-frameworks" },
        { label: "Web Performance Optimization", value: "web-performance-optimization" },
        { label: "APIs & Microservices", value: "apis-microservices" },
      ],
    },
    {
      label: "Data Science",
      value: "data-science",
      subCategories: [
        { label: "Data Analysis", value: "data-analysis" },
        { label: "Machine Learning", value: "machine-learning" },
        { label: "Deep Learning", value: "deep-learning" },
        { label: "Data Visualization", value: "data-visualization" },
        { label: "Big Data", value: "big-data" },
        { label: "Statistics & Probability", value: "statistics-probability" },
      ],
    },
    {
      label: "Artificial Intelligence",
      value: "artificial-intelligence",
      subCategories: [
        { label: "Natural Language Processing", value: "natural-language-processing" },
        { label: "Computer Vision", value: "computer-vision" },
        { label: "Reinforcement Learning", value: "reinforcement-learning" },
        { label: "AI Ethics", value: "ai-ethics" },
        { label: "Neural Networks", value: "neural-networks" },
        { label: "Robotics", value: "robotics" },
      ],
    },
    {
      label: "Business & Management",
      value: "business-management",
      subCategories: [
        { label: "Project Management", value: "project-management" },
        { label: "Entrepreneurship", value: "entrepreneurship" },
        { label: "Leadership", value: "leadership" },
        { label: "Marketing Strategies", value: "marketing-strategies" },
        { label: "Business Analytics", value: "business-analytics" },
        { label: "Human Resources", value: "human-resources" },
      ],
    },
    {
      label: "Design & Creative Arts",
      value: "design-creative-arts",
      subCategories: [
        { label: "Graphic Design", value: "graphic-design" },
        { label: "UX/UI Design", value: "ux-ui-design" },
        { label: "3D Modeling & Animation", value: "3d-modeling-animation" },
        { label: "Digital Illustration", value: "digital-illustration" },
        { label: "Photography Design", value: "photography-design" },
        { label: "Video Editing", value: "video-editing" },
      ],
    },
    {
      label: "Marketing",
      value: "marketing",
      subCategories: [
        { label: "Digital Marketing", value: "digital-marketing" },
        { label: "SEO", value: "seo" },
        { label: "Social Media Marketing", value: "social-media-marketing" },
        { label: "Content Marketing", value: "content-marketing" },
        { label: "Email Marketing", value: "email-marketing" },
        { label: "Marketing Analytics", value: "marketing-analytics" },
      ],
    },
    {
      label: "Mobile App Development",
      value: "mobile-app-development",
      subCategories: [
        { label: "Android Development", value: "android-development" },
        { label: "iOS Development", value: "ios-development" },
        { label: "Cross-Platform Development", value: "cross-platform-development" },
        { label: "Mobile UI/UX Design", value: "mobile-ui-ux-design" },
        { label: "Mobile App Security", value: "mobile-app-security" },
        { label: "Game Development for Mobile", value: "game-development-for-mobile" },
      ],
    },
    {
      label: "Cybersecurity",
      value: "cybersecurity",
      subCategories: [
        { label: "Ethical Hacking", value: "ethical-hacking" },
        { label: "Network Security", value: "network-security" },
        { label: "Cybersecurity Fundamentals", value: "cybersecurity-fundamentals" },
        { label: "Penetration Testing", value: "penetration-testing" },
        { label: "Cryptography", value: "cryptography" },
        { label: "Security Compliance & Regulations", value: "security-compliance-regulations" },
      ],
    },
    {
      label: "Health & Fitness",
      value: "health-fitness",
      subCategories: [
        { label: "Nutrition & Dietetics", value: "nutrition-dietetics" },
        { label: "Fitness Training", value: "fitness-training" },
        { label: "Mental Health & Wellness", value: "mental-health-wellness" },
        { label: "Yoga & Meditation", value: "yoga-meditation" },
        { label: "Sports Science", value: "sports-science" },
        { label: "Public Health", value: "public-health" },
      ],
    },
    {
      label: "Photography",
      value: "photography",
      subCategories: [
        { label: "Portrait Photography", value: "portrait-photography" },
        { label: "Landscape Photography", value: "landscape-photography" },
        { label: "Product Photography", value: "product-photography" },
        { label: "Photo Editing & Retouching", value: "photo-editing-retouching" },
        { label: "Wedding Photography", value: "wedding-photography" },
        { label: "Travel Photography", value: "travel-photography" },
      ],
    },
    {
      label: "Finance & Accounting",
      value: "finance-accounting",
      subCategories: [
        { label: "Financial Analysis", value: "financial-analysis" },
        { label: "Investment Strategies", value: "investment-strategies" },
        { label: "Tax Preparation & Planning", value: "tax-preparation-planning" },
        { label: "Auditing", value: "auditing" },
        { label: "Corporate Finance", value: "corporate-finance" },
        { label: "Budgeting & Forecasting", value: "budgeting-forecasting" },
      ],
    },
    {
      label: "Language Learning",
      value: "language-learning",
      subCategories: [
        { label: "English Language", value: "english-language" },
        { label: "Spanish Language", value: "spanish-language" },
        { label: "French Language", value: "french-language" },
        { label: "German Language", value: "german-language" },
        { label: "Chinese Language", value: "chinese-language" },
        { label: "Language Proficiency Exams", value: "language-proficiency-exams" },
      ],
    },
    {
      label: "Music & Audio",
      value: "music-audio",
      subCategories: [
        { label: "Music Production", value: "music-production" },
        { label: "Audio Engineering", value: "audio-engineering" },
        { label: "Instrument Lessons", value: "instrument-lessons" },
        { label: "Singing & Vocal Training", value: "singing-vocal-training" },
        { label: "Sound Design", value: "sound-design" },
        { label: "Music Theory", value: "music-theory" },
      ],
    },
    {
      label: "Engineering",
      value: "engineering",
      subCategories: [
        { label: "Civil Engineering", value: "civil-engineering" },
        { label: "Mechanical Engineering", value: "mechanical-engineering" },
        { label: "Electrical Engineering", value: "electrical-engineering" },
        { label: "Software Engineering", value: "software-engineering" },
        { label: "Chemical Engineering", value: "chemical-engineering" },
        { label: "Environmental Engineering", value: "environmental-engineering" },
      ],
    },
    {
      label: "Personal Development",
      value: "personal-development",
      subCategories: [
        { label: "Productivity & Time Management", value: "productivity-time-management" },
        { label: "Personal Finance", value: "personal-finance" },
        { label: "Public Speaking", value: "public-speaking" },
        { label: "Meditation & Mindfulness", value: "meditation-mindfulness" },
        { label: "Self-Discipline", value: "self-discipline" },
        { label: "Career Development", value: "career-development" },
      ],
    },
  ];


  export {courseCategories, courseFormats, coursePricingTypes, courseSortOptions, courseRatingOptions, courseDurations, courseLevels, subtitleLanguages, courseLanguages}