import { User } from "../../models/User";

// Need to check the actions, in tutorial action: {type: string, user: User}
export const setUserReducer = (state = {}, action: any) => {
  switch (action.type) {
    case "SET_USER":
      return {
        // Keeping the state the same
        ...state,
        user: action.user
      }
    default:
      return state;
  }
}
