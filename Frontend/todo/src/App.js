import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import {
  DropdownItem,
  Dropdown,
  DropdownButton,
  DropdownMenu,
} from "react-bootstrap";

function App() {
  var [todos, setTodos] = useState([]);
  var [todoList,setTodoList] = useState([])
  useEffect(() => {
    Axios.get("http://localhost:3001/").then((response) => {
      console.log("todolist ***********************");
      console.log(response.data);
      setTodos([...todos, ...response.data]);
    });
  }, []);

  const [todo, setTodo] = useState([]);
  var onInputChange = (e) => {
    console.log(e.target.value);
    setTodo(e.target.value);
    console.log("todo valuess **********");
    console.log(todo);
  };
  var onAdd = () => {
    console.log("ivdenn pova");
    console.log(todo);
    Axios.post("http://localhost:3001/", { todo }).then((response) => {
      console.log("reponse of todo");
      console.log(response);
      Axios.get("http://localhost:3001/").then((response) => {
        console.log("todolist ***********************");
        console.log(response.data);
        setTodos([...response.data]);
      });
    });
  };
  const deleItem = (elemIndex, id) => {
    console.log("dlete item ", elemIndex);
    todos.splice(elemIndex, 1);
    console.log(id);
    setTodos([...todos]);
    Axios.post("http://localhost:3001/delete", { id }).then((response) => {
      console.log("deleted");
      console.log(response);
    });
  };
  const checkStatus = (index, e) => {
    console.log("check status");

    console.log(e._id);
    let currentStatus = e.status;
    let id = e._id;
    if (e.status == false) {
      todos[index].status = !e.status;
      setTodos([...todos]);
      console.log(e.status);
      Axios.post("http://localhost:3001/change-status", {
        currentStatus,
        id,
      }).then((response) => {
        console.log("change status");
        console.log(response.data);
      });
    } else {
      todos[index].status = !e.status;
      setTodos([...todos]);
      Axios.post("http://localhost:3001/change-status", {
        currentStatus,
        id,
      }).then((response) => {
        console.log("change status");
        console.log(response.data);
      });
    }
  };
  let displayItems =()=>{

    console.log("display items")
    Axios.get("http://localhost:3001/").then((response) => {
      console.log("In display items ***********************");
      console.log(response.data);
      setTodos([...todos, ...response.data]);
    });
    
  }
  let completedItems =()=>{
    Axios.get("http://localhost:3001/").then((response) => {
      console.log("In display items ***********************");
      console.log(response.data);
      let result = response.data
      let completed = result.filter(e=> e.status==true)
      console.log("filtered result")
      console.log(completed)
      setTodos([...completed])
    });
  }
  let pendingItems=()=>{
    Axios.get("http://localhost:3001/").then((response) => {
      console.log("In display items ***********************");
      console.log(response.data);
      let result = response.data
      let pending = result.filter(e=> e.status==false)
      console.log("filtered result")
      console.log(pending)
      setTodos([...pending])
    });
  }
  return (
    <div className="main_class">
      <h1>Toddo App</h1>
      <div class="dropdown">
        <button class="dropbtn">Check Todo</button>
        <div class="dropdown-content">
          <a  onClick={displayItems}>All items</a>
          <a onClick={completedItems}>Done</a>
          <a onClick={pendingItems}>Pending</a>
        </div>
      </div>

      <div className="input">
        <input
          onChange={onInputChange}
          type="text"
          placeholder="Enter your activities"
        />
        <i onClick={onAdd} className="fas fa-plus"></i>
      </div>

      {todos.map((e, index) => (
        <div className="toddo_list">
          <div className="inner_toddo">
            <div className="check_box">
              <input
                checked={e.status}
                onChange={() => checkStatus(index, e)}
                type="checkbox"
              />
              
              <p style={e.status ? { textDecoration: "line-through" } : null}>
                {e.list}
              </p>
            </div>
            <div className="remove_icon">
              <i
                onClick={() => deleItem(index, e._id)}
                className="fa-solid fa-xmark"
              ></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
