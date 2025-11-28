import { Request, Response } from "express";
import { PostService } from "../../application/services/post.service";
import { CreatePostDto, UpdatePostDto } from "../../application/dtos/post.dto";

export class PostController {
  constructor(private postService: PostService) {}

  async createPost(req: Request, res: Response) {
    try {
      const dto: CreatePostDto = req.body;
      const post = await this.postService.createPost(dto);
      res.status(201).json(post);
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getPostById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await this.postService.getPostById(id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getPostBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const post = await this.postService.getPostBySlug(slug);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await this.postService.getAllPosts();
      res.json(posts);
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dto: UpdatePostDto = req.body;
      const post = await this.postService.updatePost(id, dto);
      res.json(post);
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.postService.deletePost(id);
      res.status(204).send();
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
