import { CommentRepositoryInterface } from "../../domain/repositories/comment.repository.interface";
import { Comment } from "../../domain/entities/comment.entity";
import { CreateCommentDto, UpdateCommentDto } from "../dtos/comment.dto";
import { v4 as uuidv4 } from "uuid";

export class CommentService {
  constructor(private commentRepository: CommentRepositoryInterface) {}

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    const comment = new Comment(
      uuidv4(),
      dto.postId,
      dto.authorId,
      dto.content,
      new Date(),
      new Date(),
      dto.parentId,
      "APPROVED", // Default status
      0,
    );
    return this.commentRepository.create(comment);
  }

  async getCommentsByPostId(postId: string): Promise<Comment[]> {
    return this.commentRepository.findByPostId(postId);
  }

  async updateComment(id: string, dto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.findById(id);
    if (!comment) {
      throw new Error("Comment not found");
    }
    const updatedData: Partial<Comment> = {
      content: dto.content,
      status: dto.status,
      updatedAt: new Date(),
    };
    return this.commentRepository.update(id, updatedData);
  }

  async deleteComment(id: string): Promise<void> {
    return this.commentRepository.delete(id);
  }
}
