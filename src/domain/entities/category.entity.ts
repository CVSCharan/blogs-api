export class Category {
  constructor(
    public id: string,
    public name: string,
    public slug: string,
    public description?: string | null,
    public parentId?: string | null,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
