import React, { memo, useRef } from "react";
import { useState } from "react";
import "./modal.css";
import "./Todo.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const TodoComponent = () => {
  const initialState = { title: "", completed: "" }; //initialise id
  const [todoList, setTodoList] = useState([]);
  const [todoItem, setTodoItem] = useState(initialState);
  const [isEditItem, setIsEditItem] = useState(null);
  const [toggleItem, setToggleItem] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [bgColor, setBgColor] = useState("");
  const myTimer = useRef();
  const inputRef = useRef();

  function inputFocusFunction() {
    inputRef.current.focus();
  }

  //function to handle the input values
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTodoItem({
      ...todoItem,
      [name]: value,
      completed: false,
      id: todoList.length + 1,
    });
  };

  //function to delete the todo from the list
  const deleteHandler = (id) => {
    setTodoList(todoList.filter((todo) => todo.id != id));
    setBgColor("red");
    setAlertType("Todo Deleted ");
    modalTimeout();
  };

  //function to edit the todo
  const editHandler = (id) => {
    const editTodo = todoList.find((todo) => todo.id == id);
    setTodoItem(editTodo); // setTodoItem is set to edit to make sure the edit todo title shows in input field
    setToggleItem(false); //toggleitem false means update
    setIsEditItem(id); // to identify the edit item id
    initialState.title = editTodo.title;
  };

  //button for update handler
  function updateTodo() {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === isEditItem) {
        // if todo edit is found then update its title
        return { ...todo, title: todoItem.title };
      } else {
        // other item apart from edit item
        return { ...todo };
      }
    });
    setBgColor("yellow");
    setAlertType("Todo Updated ");
    modalTimeout();
    setTodoList(updatedTodoList);
    setTodoItem(initialState);
    setToggleItem(true); // after update show the add todo again (true value )
  }

  //for adding the new todo item
  function addTodo() {
    modalTimeout();
    setBgColor("green");
    setAlertType("Todo Added"); //alert value set to adding item title
    if (todoItem.title == "") {
      setAlertType("Input file Required");
      setBgColor("red");
      modalTimeout();
      setTodoList([...todoList]);
      setTodoItem(initialState);
    } else {
      setTodoList([...todoList, todoItem]); // adding new todo to the list
      setTodoItem(initialState); // set todoitem back to initial state
    }
  }

  //function to check the todo for complete or not completed
  const completedHandler = (id) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id == id) {
          return { ...todo, completed: true };
        } else return { ...todo };
      })
    );
  };

  //function for the modal
  function modalTimeout() {
    setShowModal(true);
    if (myTimer.current) {
      clearTimeout(myTimer.current);
    }
    myTimer.current = setTimeout(() => {
      setShowModal(false);
    }, 5000);
  }

  const AddUpdateButtonHandler = () => {
    inputFocusFunction();
    if (toggleItem) {
      addTodo();
    } else {
      updateTodo();
    }
  };

  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <h1>Todolist App</h1>
        <input
          ref={inputRef}
          type="text"
          placeholder="enter todo title here ... "
          name="title"
          value={todoItem.title}
          onChange={changeHandler}
        />{" "}
        <button onClick={AddUpdateButtonHandler}>
          {toggleItem ? "Add Todo" : "Update Todo"}
        </button>
      </div>
      <div style={{border:"1px solid red"}}>
            {todoList.map((todo, index) => {
              return (
                <div key={todo.id} style={{display:"grid",gridTemplateColumns:"10% 50% 25%"}}>
                  <div>{index + 1}</div>
                  <div
                    style={{ textDecoration:todo.completed ? "line-through" : "" }}
                  >
                    {todo.title}
                  </div>
                  <div>
                    <button onClick={() => editHandler(todo.id)}>
                      <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                    </button>{" "}
                    <button onClick={() => deleteHandler(todo.id)}>
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </button>
                    {todo.completed ? (
                      <button>
                        <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                      </button>
                    ) : (
                      <button onClick={() => completedHandler(todo.id)}>
                        🚫
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
      </div>
      {showModal && (
        <div
          className="modal"
          style={{
            //   height: "100vh",
            width: "100vw  ",
            top: "0",
            left: "0",
            position: "fixed",
          }}
        >
          <div className="overlay">
            <div
              className="modal-content"
              style={{
                border: "1px solid black",
                borderRadius: "10px",
                padding: "5px",
                width: " 15%",
                margin: "10px auto",
                backgroundColor: bgColor,
              }}
            >
              <p style={{ display: "inline", padding: "0 20px" }}>
                {alertType}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoComponent;
