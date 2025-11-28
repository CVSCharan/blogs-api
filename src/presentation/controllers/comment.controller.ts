import { Request, Response } from "express";
import { CommentService } from "../../application/services/comment.service";
import {
  CreateCommentDto,
  UpdateCommentDto,
} from "../../application/dtos/comment.dto";

export class CommentController {
  constructor(private commentService: CommentService) {}

  async createComment(req: Request, res: Response) {
    try {
      const dto: CreateCommentDto = req.body;
      const comment = await this.commentService.createComment(dto);
      res.status(201).json(comment);
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getCommentsByPostId(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const comments = await this.commentService.getCommentsByPostId(postId);
      res.json(comments);
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateComment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dto: UpdateCommentDto = req.body;
      const comment = await this.commentService.updateComment(id, dto);
      res.json(comment);
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteComment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.commentService.deleteComment(id);
      res.status(204).send();
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
