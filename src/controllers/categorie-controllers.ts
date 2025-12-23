import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/api-error";
import { apiResponse } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { Category } from "@prisma/client";

type NewCategory = Pick<Category, 'name' | 'slug'> & {
    subCategories: {
        name: string;
        slug: string;
    }[];
}; 
export const addCategory = asyncHandler(async (req, res) => {
    const { name, slug, subCategories }: NewCategory = req.body;

    const existingCategory = await prisma.category.findUnique({
        where: { slug },
    });
    if(existingCategory) throw new ApiError(400, 'Category with this slug already exists');

    const category = await prisma.category.create({
        data: {
            name,
            slug,
            subCategories: {
                create: subCategories,
            },
        },
        include: {
            subCategories: true,
        },
    });

    return apiResponse(res, 201, 'Category created successfully', category);    

})

export const deleteCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const category = await prisma.category.delete({
        where: { id: categoryId },
    });

    if(!category) throw new ApiError(404, 'Category not found');

    return apiResponse(res, 200, 'Category deleted successfully', category);
})