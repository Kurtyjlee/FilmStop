import React from "react";
import { TodoList } from "../components/TodoList";

export const Users = () => {
  return (
    <div className="user">
      <TodoList todos={[
        {title: "do dishes", description: "Dis is description", isCompleted: true},
        {title: "keep  dishes", isCompleted: true}
      ]} />
    </div>
  )
}
