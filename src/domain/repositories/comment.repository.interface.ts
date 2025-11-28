import { Comment } from "../entities/comment.entity";

export interface CommentRepositoryInterface {
  create(comment: Comment): Promise<Comment>;
  findById(id: string): Promise<Comment | null>;
  findByPostId(postId: string): Promise<Comment[]>;
  update(id: string, comment: Partial<Comment>): Promise<Comment>;
  delete(id: string): Promise<void>;
}
