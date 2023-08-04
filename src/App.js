import React, { useState,useEffect } from "react";
import List from './components/List';
import Alert from './components/Alert';
import './App.css';

function App() {

  const getLocalStorage=()=>{
    let list=localStorage.getItem("list");
    if(list){
      return (list=JSON.parse(localStorage.getItem("list")));
    }else{
      return [];
    }
  };
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [filter, setFilter] = useState("all"); 

  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(list));
  },[list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Please Enter Value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "Value Changed");
    } else {
      showAlert(true, "success", "Item Added to the List");
      const newItem = { id: new Date().getTime().toString(), title: name, completed: false };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "Item Removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(editItem.title);
  };

  const checkItem = (id) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const toggleCompletion = (id) => {
    setList((prevList) =>
      prevList.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const clearList = () => {
    if (filter === "completed") {
      showAlert(true, "danger", "Completed tasks cleared");
      setList(list.filter((item) => !item.completed));
    } else if(filter==="incomplete"){
      showAlert(true, "danger", "Incomplete tasks cleared");
      setList(list.filter((item) => item.completed));
    }else {
      showAlert(true, "danger", "All tasks cleared");
      setList([]);
    }
  };

  const handleFilter = (type) => {
    setFilter(type);
  };

  const filteredList = list.filter((item) => {
    if (filter === "completed") {
      return item.completed;
    } else if (filter === "incomplete") {
      return !item.completed;
    }
    return true;
  });

  
  return (
    <section className="section-center" >
      <div className="filter-buttons">
        <button
          className={`btn ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => handleFilter("all")}
        >
          Show All Tasks
        </button>
        <button
          className={`btn ${filter === "completed" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => handleFilter("completed")}
        >
          Show Completed Tasks
        </button>
        <button
          className={`btn ${filter === "incomplete" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => handleFilter("incomplete")}
        >
          Show Incomplete Tasks
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3 style={{ marginBottom: '1.5rem', textAlign: "center" }}>ToDo list</h3>
        <div className="mb-3 form">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button type="submit" className="btn btn-success">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>

      {filteredList.length > 0 &&
        (
          <div style={{ marginTop: "2rem" }}>
            <List
              items={filteredList}
              removeItem={removeItem}
              editItem={editItem}
              checkItem={checkItem}
              toggleCompletion={toggleCompletion}
            />
            <div className="text-center">
              <button className="btn btn-warning" onClick={clearList}>Clear All</button>
            </div>
          </div>
        )
      }
    </section>
  );

}

export default App;
