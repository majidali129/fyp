

import { PrismaClient } from '@prisma/client';

const categorySubcategoryMap = [
  {
    "name": "Development",
    "slug": "development",
    "subCategories": [
      { "name": "Web Development", "slug": "web-development" },
      { "name": "Mobile Development", "slug": "mobile-development" },
      { "name": "Game Development", "slug": "game-development" },
      { "name": "Programming Languages", "slug": "programming-languages" },
      { "name": "Software Testing", "slug": "software-testing" }
    ]
  },
  {
    "name": "Business",
    "slug": "business",
    "subCategories": [
      { "name": "Entrepreneurship", "slug": "entrepreneurship" },
      { "name": "Communication", "slug": "communication" },
      { "name": "Management", "slug": "management" },
      { "name": "Sales", "slug": "sales" },
      { "name": "Business Strategy", "slug": "business-strategy" }
    ]
  },
  {
    "name": "Finance & Accounting",
    "slug": "finance-accounting",
    "subCategories": [
      { "name": "Accounting", "slug": "accounting" },
      { "name": "Cryptocurrency & Blockchain", "slug": "cryptocurrency-blockchain" },
      { "name": "Finance", "slug": "finance" },
      { "name": "Investing", "slug": "investing" },
      { "name": "Economics", "slug": "economics" }
    ]
  },
  {
    "name": "IT & Software",
    "slug": "it-software",
    "subCategories": [
      { "name": "IT Certification", "slug": "it-certification" },
      { "name": "Network & Security", "slug": "network-security" },
      { "name": "Hardware", "slug": "hardware" },
      { "name": "Operating Systems", "slug": "operating-systems" },
      { "name": "Other IT & Software", "slug": "other-it-software" }
    ]
  },
  {
    "name": "Design",
    "slug": "design",
    "subCategories": [
      { "name": "Graphic Design", "slug": "graphic-design" },
      { "name": "UX/UI Design", "slug": "ux-ui-design" },
      { "name": "3D & Animation", "slug": "3d-animation" },
      { "name": "Fashion Design", "slug": "fashion-design" },
      { "name": "Interior Design", "slug": "interior-design" }
    ]
  }
]


const prisma = new PrismaClient();


const seedCategories = async () => {
    await prisma.subCategory.deleteMany()
    await prisma.category.deleteMany()

    // we can't use createMany two times. only possible if we use create for catetory and createMany for subcategory
    for (const categoryData of categorySubcategoryMap) {
        const { subCategories, ...categoryInfo } = categoryData;
        await prisma.category.create({
            data: {
                ...categoryInfo,
                subCategories: {
                    createMany: {data: subCategories}
                }
            },
            include: {
                subCategories: true
            }
        })
                }
    
}

seedCategories()