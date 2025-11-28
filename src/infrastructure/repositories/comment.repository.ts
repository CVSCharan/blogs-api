import { CommentRepositoryInterface } from "../../domain/repositories/comment.repository.interface";
import { Comment } from "../../domain/entities/comment.entity";
import { prisma } from "../database/prisma.service";

export class CommentRepository implements CommentRepositoryInterface {
  async create(comment: Comment): Promise<Comment> {
    const created = await prisma.comment.create({
      data: {
        postId: comment.postId,
        authorId: comment.authorId,
        content: comment.content,
        parentId: comment.parentId,
        status: (comment.status as any) || "APPROVED", // Default to APPROVED for now
      },
    });
    return this.mapToEntity(created);
  }

  async findById(id: string): Promise<Comment | null> {
    const found = await prisma.comment.findUnique({ where: { id } });
    return found ? this.mapToEntity(found) : null;
  }

  async findByPostId(postId: string): Promise<Comment[]> {
    const found = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "desc" },
    });
    return found.map(this.mapToEntity);
  }

  async update(id: string, comment: Partial<Comment>): Promise<Comment> {
    const updated = await prisma.comment.update({
      where: { id },
      data: {
        content: comment.content,
        status: comment.status as any,
      },
    });
    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.comment.delete({ where: { id } });
  }

  private mapToEntity(data: any): Comment {
    return new Comment(
      data.id,
      data.postId,
      data.authorId,
      data.content,
      data.createdAt,
      data.updatedAt,
      data.parentId,
      data.status,
      data.likeCount,
    );
  }
}
