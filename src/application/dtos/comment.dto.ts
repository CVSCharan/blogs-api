export class CreateCommentDto {
  postId!: string;
  authorId!: string;
  content!: string;
  parentId?: string;
}

export class UpdateCommentDto {
  content!: string;
  status?: string;
}
