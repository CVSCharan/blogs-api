export class CreatePostDto {
  title!: string;
  content!: string;
  authorId!: string;
  slug?: string;
  excerpt?: string;
  coverImage?: string;
  status?: string;
  visibility?: string;
  categoryIds?: string[];
  tagIds?: string[];
}

export class UpdatePostDto {
  title?: string;
  content?: string;
  slug?: string;
  excerpt?: string;
  coverImage?: string;
  status?: string;
  visibility?: string;
  categoryIds?: string[];
  tagIds?: string[];
}
