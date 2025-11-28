import { Like } from "../entities/like.entity";
import { Bookmark } from "../entities/bookmark.entity";

export interface ReactionRepositoryInterface {
  addLike(like: Like): Promise<Like>;
  removeLike(userId: string, postId: string): Promise<void>;
  countLikes(postId: string): Promise<number>;

  addBookmark(bookmark: Bookmark): Promise<Bookmark>;
  removeBookmark(userId: string, postId: string): Promise<void>;
  hasBookmarked(userId: string, postId: string): Promise<boolean>;
}
