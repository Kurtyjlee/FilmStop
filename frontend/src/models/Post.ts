import { Comments } from "./comments";
import { Thread } from "./Thread";
import { User } from "./User";

export class Post {
  constructor(
    public id: number,
    public title: string,
    public image: string,
    public description: string,
    public total_likes: number,
    public total_comments: number,
    public user_id: number,
    public user: User,
    public thread_id: number,
    public thread: Thread,
    public comments: Comments[]
  ){
  }
}