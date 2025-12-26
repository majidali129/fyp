

export const isOwner = (authorId: string, currentUserId: string): boolean => {
    return authorId === currentUserId;
}