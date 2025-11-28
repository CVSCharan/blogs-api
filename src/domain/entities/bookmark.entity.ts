export class Bookmark {
  constructor(
    public id: string,
    public userId: string,
    public postId: string,
    public createdAt: Date,
  ) {}
}
