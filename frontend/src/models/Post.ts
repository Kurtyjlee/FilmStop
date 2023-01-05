import { Comments } from "./comments";

export class Post {
  constructor(
    public id: number,
    public title: string,
    public image: string,
    public description: string,
    public likes: number,
    public comments: Comments[]
  ){
  }
}