import { Request, Response } from "express";
import { TagService } from "../../application/services/tag.service";
import { CreateTagDto } from "../../application/dtos/tag.dto";

export class TagController {
  constructor(private tagService: TagService) {}

  async createTag(req: Request, res: Response) {
    try {
      const dto: CreateTagDto = req.body;
      const tag = await this.tagService.createTag(dto);
      res.status(201).json(tag);
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getTagById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const tag = await this.tagService.getTagById(id);
      if (!tag) {
        return res.status(404).json({ error: "Tag not found" });
      }
      res.json(tag);
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getTagBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const tag = await this.tagService.getTagBySlug(slug);
      if (!tag) {
        return res.status(404).json({ error: "Tag not found" });
      }
      res.json(tag);
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllTags(req: Request, res: Response) {
    try {
      const tags = await this.tagService.getAllTags();
      res.json(tags);
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteTag(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.tagService.deleteTag(id);
      res.status(204).send();
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
