import { CategoryRepositoryInterface } from "../../domain/repositories/category.repository.interface";
import { Category } from "../../domain/entities/category.entity";
import { prisma } from "../database/prisma.service";

export class CategoryRepository implements CategoryRepositoryInterface {
  async create(category: Category): Promise<Category> {
    const created = await prisma.category.create({
      data: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        parentId: category.parentId,
      },
    });
    return this.mapToEntity(created);
  }

  async findById(id: string): Promise<Category | null> {
    const found = await prisma.category.findUnique({ where: { id } });
    return found ? this.mapToEntity(found) : null;
  }

  async findBySlug(slug: string): Promise<Category | null> {
    const found = await prisma.category.findUnique({ where: { slug } });
    return found ? this.mapToEntity(found) : null;
  }

  async findAll(): Promise<Category[]> {
    const found = await prisma.category.findMany();
    return found.map(this.mapToEntity);
  }

  async update(id: string, category: Partial<Category>): Promise<Category> {
    const updated = await prisma.category.update({
      where: { id },
      data: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        parentId: category.parentId,
      },
    });
    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.category.delete({ where: { id } });
  }

  private mapToEntity(data: any): Category {
    return new Category(
      data.id,
      data.name,
      data.slug,
      data.description,
      data.parentId,
      data.createdAt,
      data.updatedAt,
    );
  }
}
