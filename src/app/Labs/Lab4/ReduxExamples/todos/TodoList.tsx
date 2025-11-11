import React from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
export default function TodoList() {
  const { todos } = useSelector((state: any) => state.todosReducer);
  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm key={"td-item-1"} />
        {todos.map((todo: any) => (
          <TodoItem
          key={todo.id} 
          todo={todo}
           />
        ))}
      </ListGroup>
      <hr/>
    </div>
);}