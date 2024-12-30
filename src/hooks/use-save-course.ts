// import { apiClient } from '@/lib/axios-client';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { toast } from 'react-toastify';

// export const useSaveCourse = (courseMetadata: any, trailer: File, thumbnail: File, sections: any) => {
//   const queryClient = useQueryClient();

//   // Step 1: Save Course Metadata
//   const saveMetadataMutation = useMutation({
//     mutationFn: async () => {
//       const response = await apiClient.post('/courses/create-new-course', courseMetadata, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       return response.data.data.courseId;
//     },
//     onSuccess: (courseId) => {
//       toast.success('Course metadata saved successfully.');
//       saveMediaMutation.mutate(courseId); // Proceed to media upload
//     },
//     onError: (error) => {
//       toast.error(`Failed to save course metadata: ${error.message}`);
//     },
//   });

//   // Step 2: Upload Media
//   const saveMediaMutation = useMutation({
//     mutationFn: async (courseId: string)=> {
//       const formData = new FormData();
//       formData.append('trailer', trailer);
//       formData.append('thumbnail', thumbnail);
//       formData.append('courseId', courseId as string);
//       await apiClient.patch('/courses/create-new-course/upload-course-media', formData);
//     },
//     onSuccess: (courseId: string) => {
//       toast.success('Media files uploaded successfully.');
//       saveSectionsMutation.mutate(courseId); // Proceed to save sections
//     },
//     onError: (error) => {
//       toast.error(`Failed to upload media: ${error.message}`);
//     },
//   });

//   // Step 3: Save Sections
//   const saveSectionsMutation = useMutation({
//     mutationFn: async (courseId)=> {
//       for (const section of sections) {
//         const sectionPayload = {
//           courseId,
//           section,
//         };
//         await apiClient.patch('/courses/create-new-course/add-curriculum', sectionPayload);
//       }
//     },
//     onSuccess: () => {
//       toast.success('All sections saved successfully.');
//       queryClient.invalidateQueries({ queryKey: ['courses'] }); // Refresh courses cache
//     },
//     onError: (error) => {
//       toast.error(`Failed to save sections: ${error.message}`);
//     },
//   });

//   const startSave = () => {
//     saveMetadataMutation.mutate();
//   };

//   const isLoading =
//     saveMetadataMutation.isPending ||
//     saveMediaMutation.isPending ||
//     saveSectionsMutation.isPending;

//   return { startSave, isLoading };
// };
