import { PostRepositoryInterface } from "../../domain/repositories/post.repository.interface";
import { Post } from "../../domain/entities/post.entity";
import { prisma } from "../database/prisma.service";
import { Category } from "../../domain/entities/category.entity";
import { Tag } from "../../domain/entities/tag.entity";

export class PostRepository implements PostRepositoryInterface {
  async create(post: Post): Promise<Post> {
    const created = await prisma.post.create({
      data: {
        title: post.title,
        slug: post.slug!,
        content: post.content,
        authorId: post.authorId,
        excerpt: post.excerpt,
        coverImage: post.coverImage,
        status: post.status as any, // Cast to enum if needed, or string
        visibility: post.visibility as any,
        publishedAt: post.status === "PUBLISHED" ? new Date() : null,
      },
      include: {
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    });
    return this.mapToEntity(created);
  }

  async findById(id: string): Promise<Post | null> {
    const found = await prisma.post.findUnique({
      where: { id },
      include: {
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    });
    return found ? this.mapToEntity(found) : null;
  }

  async findBySlug(slug: string): Promise<Post | null> {
    const found = await prisma.post.findUnique({
      where: { slug },
      include: {
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    });
    return found ? this.mapToEntity(found) : null;
  }

  async findAll(): Promise<Post[]> {
    const found = await prisma.post.findMany({
      include: {
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    });
    return found.map(this.mapToEntity);
  }

  async update(id: string, post: Partial<Post>): Promise<Post> {
    const updated = await prisma.post.update({
      where: { id },
      data: {
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        coverImage: post.coverImage,
        status: post.status as any,
        visibility: post.visibility as any,
      },
      include: {
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    });
    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.post.delete({ where: { id } });
  }

  private mapToEntity(data: any): Post {
    const categories =
      data.categories?.map(
        (c: any) =>
          new Category(
            c.category.id,
            c.category.name,
            c.category.slug,
            c.category.description,
            c.category.parentId,
            c.category.createdAt,
            c.category.updatedAt,
          ),
      ) || [];

    const tags =
      data.tags?.map(
        (t: any) => new Tag(t.tag.id, t.tag.name, t.tag.slug, t.tag.createdAt),
      ) || [];

    return new Post(
      data.id,
      data.title,
      data.content,
      data.authorId,
      data.createdAt,
      data.updatedAt,
      data.slug,
      data.excerpt,
      data.coverImage,
      data.status,
      data.visibility,
      categories,
      tags,
    );
  }
}
