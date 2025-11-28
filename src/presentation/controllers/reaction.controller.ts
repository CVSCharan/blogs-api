import { Request, Response } from "express";
import { ReactionService } from "../../application/services/reaction.service";
import { AddReactionDto } from "../../application/dtos/reaction.dto";

export class ReactionController {
  constructor(private reactionService: ReactionService) {}

  async addLike(req: Request, res: Response) {
    try {
      const dto: AddReactionDto = req.body;
      const like = await this.reactionService.addLike(dto);
      res.status(201).json(like);
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async removeLike(req: Request, res: Response) {
    try {
      const { userId, postId } = req.params;
      await this.reactionService.removeLike(userId, postId);
      res.status(204).send();
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async addBookmark(req: Request, res: Response) {
    try {
      const dto: AddReactionDto = req.body;
      const bookmark = await this.reactionService.addBookmark(dto);
      res.status(201).json(bookmark);
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async removeBookmark(req: Request, res: Response) {
    try {
      const { userId, postId } = req.params;
      await this.reactionService.removeBookmark(userId, postId);
      res.status(204).send();
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
