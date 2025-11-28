export class Comment {
  constructor(
    public id: string,
    public postId: string,
    public authorId: string,
    public content: string,
    public createdAt: Date,
    public updatedAt: Date,
    public parentId?: string | null,
    public status?: string,
    public likeCount?: number,
  ) {}
}
