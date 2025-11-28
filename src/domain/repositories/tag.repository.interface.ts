import { Tag } from "../entities/tag.entity";

export interface TagRepositoryInterface {
  create(tag: Tag): Promise<Tag>;
  findById(id: string): Promise<Tag | null>;
  findBySlug(slug: string): Promise<Tag | null>;
  findAll(): Promise<Tag[]>;
  delete(id: string): Promise<void>;
}
