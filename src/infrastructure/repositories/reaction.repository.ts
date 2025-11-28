import { ReactionRepositoryInterface } from "../../domain/repositories/reaction.repository.interface";
import { Like } from "../../domain/entities/like.entity";
import { Bookmark } from "../../domain/entities/bookmark.entity";
import { prisma } from "../database/prisma.service";

export class ReactionRepository implements ReactionRepositoryInterface {
  async addLike(like: Like): Promise<Like> {
    const created = await prisma.like.create({
      data: {
        userId: like.userId,
        postId: like.postId,
      },
    });

    // Increment like count on post
    await prisma.post.update({
      where: { id: like.postId },
      data: { likeCount: { increment: 1 } },
    });

    return new Like(
      created.id,
      created.userId,
      created.postId,
      created.createdAt,
    );
  }

  async removeLike(userId: string, postId: string): Promise<void> {
    await prisma.like.delete({
      where: {
        userId_postId: { userId, postId },
      },
    });

    // Decrement like count on post
    await prisma.post.update({
      where: { id: postId },
      data: { likeCount: { decrement: 1 } },
    });
  }

  async countLikes(postId: string): Promise<number> {
    return prisma.like.count({ where: { postId } });
  }

  async addBookmark(bookmark: Bookmark): Promise<Bookmark> {
    const created = await prisma.bookmark.create({
      data: {
        userId: bookmark.userId,
        postId: bookmark.postId,
      },
    });
    return new Bookmark(
      created.id,
      created.userId,
      created.postId,
      created.createdAt,
    );
  }

  async removeBookmark(userId: string, postId: string): Promise<void> {
    await prisma.bookmark.delete({
      where: {
        userId_postId: { userId, postId },
      },
    });
  }

  async hasBookmarked(userId: string, postId: string): Promise<boolean> {
    const count = await prisma.bookmark.count({
      where: { userId, postId },
    });
    return count > 0;
  }
}
