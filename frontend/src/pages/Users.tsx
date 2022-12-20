import React from "react";
import { TodoList } from "../components/TodoList";
import { Wrapper } from "../components/Wrapper";

export const Users = () => {
  return (
    <Wrapper>
      <div className="user">
        <TodoList todos={[
          {title: "do dishes", description: "Dis is description", isCompleted: true},
          {title: "keep  dishes", isCompleted: true}
        ]} />
      </div>
    </Wrapper>
    
  )
}
