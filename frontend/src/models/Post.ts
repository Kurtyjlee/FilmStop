import { Comments } from "./comments";

export class Post {
  constructor(
    public id: number,
    public title: string,
    public image: string,
    public description: string,
    public total_likes: number,
    public total_comments: number,
    public comments: Comments[]
  ){
  }
}