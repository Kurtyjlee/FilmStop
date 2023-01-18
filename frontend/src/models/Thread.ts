import { Post } from "./Post";


// Default user values
export class Thread {
    constructor(
      public id: number,
      public name: String,
      public posts: Post[]
    ) {
    }
  }
  