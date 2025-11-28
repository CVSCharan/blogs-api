import { Category } from "./category.entity";
import { Tag } from "./tag.entity";

export class Post {
  constructor(
    public id: string,
    public title: string,
    public content: string,
    public authorId: string,
    public createdAt: Date,
    public updatedAt: Date,
    public slug?: string,
    public excerpt?: string | null,
    public coverImage?: string | null,
    public status?: string,
    public visibility?: string,
    public categories?: Category[],
    public tags?: Tag[],
  ) {}
}
