

export const isOnwer = (authorId: string, currentUserId: string): boolean => {
    return authorId === currentUserId;
}