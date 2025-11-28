export class CreateCategoryDto {
  name!: string;
  slug!: string;
  description?: string;
  parentId?: string;
}

export class UpdateCategoryDto {
  name?: string;
  slug?: string;
  description?: string;
  parentId?: string;
}
