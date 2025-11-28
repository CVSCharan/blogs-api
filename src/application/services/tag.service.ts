import { TagRepositoryInterface } from "../../domain/repositories/tag.repository.interface";
import { Tag } from "../../domain/entities/tag.entity";
import { CreateTagDto } from "../dtos/tag.dto";
import { v4 as uuidv4 } from "uuid";

export class TagService {
  constructor(private tagRepository: TagRepositoryInterface) {}

  async createTag(dto: CreateTagDto): Promise<Tag> {
    const tag = new Tag(uuidv4(), dto.name, dto.slug, new Date());
    return this.tagRepository.create(tag);
  }

  async getTagById(id: string): Promise<Tag | null> {
    return this.tagRepository.findById(id);
  }

  async getTagBySlug(slug: string): Promise<Tag | null> {
    return this.tagRepository.findBySlug(slug);
  }

  async getAllTags(): Promise<Tag[]> {
    return this.tagRepository.findAll();
  }

  async deleteTag(id: string): Promise<void> {
    return this.tagRepository.delete(id);
  }
}
