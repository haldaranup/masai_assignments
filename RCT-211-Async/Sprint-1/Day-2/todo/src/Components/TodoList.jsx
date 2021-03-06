import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  toggleTodoFailure,
  toggleTodoRequest,
  toggleTodoSuccess,
} from "../State/action";

const TodoList = ({ todoList, getTodos }) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteTodoRequest());
    axios
      .delete(`/todos/${id}`)
      .then(() => {
        getTodos();
        dispatch(deleteTodoSuccess());
      })
      .catch((e) => dispatch(deleteTodoFailure(e)));
  };
  const toggleTodo = (id, status) => {
    dispatch(toggleTodoRequest());
    axios
      .patch(`/todos/${id}`, {isComplete: status})
      .then((r) => {
        dispatch(toggleTodoSuccess(r.data));
      })
      .catch((e) => dispatch(toggleTodoFailure(e)));
  };

  return (
    <div>
      {todoList.map((i) => {
        return (
          <div key={i.id} className="list">
            <h6>{i.task}</h6>
            <button onClick={() =>toggleTodo(i.id, !i.isComplete)} className={i.isComplete ? "btn green" : "btn yellow"}>
              {i.isComplete ? "Completed" : "Pending"}
            </button>
            <div>
              <Link to={`/todos/${i.id}/edit`}>
                <button className="btn yellow">Edit</button>
              </Link>
              <button className="btn red" onClick={() => handleDelete(i.id)}>
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
