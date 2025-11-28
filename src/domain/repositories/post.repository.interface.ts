import { Post } from "../entities/post.entity";

export interface PostRepositoryInterface {
  create(post: Post): Promise<Post>;
  findById(id: string): Promise<Post | null>;
  findBySlug(slug: string): Promise<Post | null>;
  findAll(): Promise<Post[]>;
  update(id: string, post: Partial<Post>): Promise<Post>;
  delete(id: string): Promise<void>;
}
