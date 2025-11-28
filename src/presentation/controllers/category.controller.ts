import { Request, Response } from "express";
import { CategoryService } from "../../application/services/category.service";
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from "../../application/dtos/category.dto";

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  async createCategory(req: Request, res: Response) {
    try {
      const dto: CreateCategoryDto = req.body;
      const category = await this.categoryService.createCategory(dto);
      res.status(201).json(category);
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await this.categoryService.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getCategoryBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const category = await this.categoryService.getCategoryBySlug(slug);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.json(categories);
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dto: UpdateCategoryDto = req.body;
      const category = await this.categoryService.updateCategory(id, dto);
      res.json(category);
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.categoryService.deleteCategory(id);
      res.status(204).send();
    } catch (_error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
