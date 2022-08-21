import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import TodoItem from "./components/todoitem";
import Button from "@mui/material/Button";
import Footer from "./components/Footer/Footer";

function App() {
  const [todoItems, setTodoItems] = useState(null);

  //Date
  const current = new Date();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekday[current.getDay()];
  let longMonth = current.toLocaleString("en-us", { month: "long" });
  let date = `${longMonth} ${current.getDate()}`;

  useEffect(() => {
    console.log("useEffect Loaded.");

    if (!todoItems) {
      fetch("http://localhost:8080/api/todoItems")
        .then((response) => response.json())
        .then((data) => {
          console.log("Todo Items List:", data);
          setTodoItems(data);
        });
    }
  }, [todoItems]);

  function addNewTodoItem() {
    fetch("http://localhost:8080/api/todoItems", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        setTodoItems([...todoItems, data]);
        console.log(data);
      });
  }

  function handleDeleteTodoItem(item) {
    const updatedTodoItems = todoItems.filter((data) => data.id !== item.id);
    setTodoItems([...updatedTodoItems]);
  }

  return (
    <>
      <div className="main-body">
        <div className="todo-container">
          <div className="above-label">
            <h2 style={{ textTransform: "uppercase" }}>Todo List</h2>
          </div>

          <div className="date">
            <h3>
              Today is {day}, {date}
            </h3>
          </div>

          <div className="addbtn">
            <Button variant="contained" onClick={addNewTodoItem}>
              Add task
            </Button>
          </div>

          <div className="todoitems">
            {" "}
            {todoItems
              ? todoItems.map((todoItem) => {
                  return (
                    <TodoItem
                      data={todoItem}
                      key={todoItem.id}
                      emitDeleteTodoItem={handleDeleteTodoItem}
                    />
                  );
                })
              : "loading data..."}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
