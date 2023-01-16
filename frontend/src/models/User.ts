import { Comments } from "./comments";
import { Post } from "./Post";
import { Role } from "./Role";

// Default user values
export class User {
  constructor(
    public id = 0,
    public user_name = "",
    public email = "",
    public role = new Role(),
    // public posts: Post[],
    // public comment: Comments[]
  ) {
  }

  get name() {
    return this.user_name;
  }
}
