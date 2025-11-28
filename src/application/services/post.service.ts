import { PostRepositoryInterface } from "../../domain/repositories/post.repository.interface";
import { Post } from "../../domain/entities/post.entity";
import { CreatePostDto, UpdatePostDto } from "../dtos/post.dto";
import { v4 as uuidv4 } from "uuid";

export class PostService {
  constructor(private postRepository: PostRepositoryInterface) {}

  async createPost(dto: CreatePostDto): Promise<Post> {
    const post = new Post(
      uuidv4(),
      dto.title,
      dto.content,
      dto.authorId,
      new Date(),
      new Date(),
      dto.slug || this.generateSlug(dto.title),
      dto.excerpt,
      dto.coverImage,
      dto.status || "DRAFT",
      dto.visibility || "PUBLIC",
    );
    return this.postRepository.create(post);
  }

  async getPostById(id: string): Promise<Post | null> {
    return this.postRepository.findById(id);
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    return this.postRepository.findBySlug(slug);
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.findAll();
  }

  async updatePost(id: string, dto: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }
    // Basic mapping, in real app use a mapper or object.assign carefully
    const updatedData: Partial<Post> = {
      ...dto,
      updatedAt: new Date(),
    };
    return this.postRepository.update(id, updatedData);
  }

  async deletePost(id: string): Promise<void> {
    return this.postRepository.delete(id);
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
}
