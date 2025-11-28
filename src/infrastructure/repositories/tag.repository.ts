import { TagRepositoryInterface } from "../../domain/repositories/tag.repository.interface";
import { Tag } from "../../domain/entities/tag.entity";
import { prisma } from "../database/prisma.service";

export class TagRepository implements TagRepositoryInterface {
  async create(tag: Tag): Promise<Tag> {
    const created = await prisma.tag.create({
      data: {
        name: tag.name,
        slug: tag.slug,
      },
    });
    return this.mapToEntity(created);
  }

  async findById(id: string): Promise<Tag | null> {
    const found = await prisma.tag.findUnique({ where: { id } });
    return found ? this.mapToEntity(found) : null;
  }

  async findBySlug(slug: string): Promise<Tag | null> {
    const found = await prisma.tag.findUnique({ where: { slug } });
    return found ? this.mapToEntity(found) : null;
  }

  async findAll(): Promise<Tag[]> {
    const found = await prisma.tag.findMany();
    return found.map(this.mapToEntity);
  }

  async delete(id: string): Promise<void> {
    await prisma.tag.delete({ where: { id } });
  }

  private mapToEntity(data: any): Tag {
    return new Tag(data.id, data.name, data.slug, data.createdAt);
  }
}
