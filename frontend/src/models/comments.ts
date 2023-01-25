export class Comments{
  constructor(
    public id: number,
    public description: string,
    public total_likes: number,
    public user_id: number,
  ) {
  }
}
