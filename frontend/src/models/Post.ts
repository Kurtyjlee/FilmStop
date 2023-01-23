import { Comments } from "./comments";
import { Thread } from "./Thread";

export class Post {
  constructor(
    public id: number,
    public title: string,
    public image: string,
    public description: string,
    public total_likes: number,
    public total_comments: number,
    public thread_id: number,
    public thread: Thread,
    public comments: Comments[]
  ){
  }
}