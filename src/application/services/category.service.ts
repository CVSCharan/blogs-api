import { CategoryRepositoryInterface } from "../../domain/repositories/category.repository.interface";
import { Category } from "../../domain/entities/category.entity";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos/category.dto";
import { v4 as uuidv4 } from "uuid";

export class CategoryService {
  constructor(private categoryRepository: CategoryRepositoryInterface) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const category = new Category(
      uuidv4(),
      dto.name,
      dto.slug,
      dto.description,
      dto.parentId,
      new Date(),
      new Date(),
    );
    return this.categoryRepository.create(category);
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return this.categoryRepository.findById(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return this.categoryRepository.findBySlug(slug);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async updateCategory(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }
    const updatedData: Partial<Category> = {
      ...dto,
      updatedAt: new Date(),
    };
    return this.categoryRepository.update(id, updatedData);
  }

  async deleteCategory(id: string): Promise<void> {
    return this.categoryRepository.delete(id);
  }
}
