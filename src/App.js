import React, {useState} from "react";
import ToDoItem from "./components/ToDoItem";


import './App.css';

function App() {

  const [allItems, setAllItems] = new React.useState([]);
  const [selectedItems, setSelectedItems] = new React.useState([]);
  const [counter, setCount] = new React.useState(0);

  const getItems = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/user/1/todos");
      const jsonData = await response.json();

      setAllItems(jsonData);
      setSelectedItems(jsonData);
      setCount(jsonData.filter(item => item.completed == false).length)
    } catch (err) {
      console.error(err.message);
    }
  };

  React.useEffect(() => {
    getItems();
  }, []);


  const selectAllItems = (e) => {
    e.preventDefault();
    if(e.target.className == "all bottom-menu-item checked") {}
    else {
      e.target.parentNode.querySelector(".checked").className = "bottom-menu-item";
      e.target.className = "all bottom-menu-item checked";
      setSelectedItems(allItems);
    }
  }

  const selectActiveItems = (e) => {
    e.preventDefault();
    if(e.target.className == "bottom-menu-item checked") {}
    else {
      e.target.parentNode.querySelector(".checked").className = "bottom-menu-item";
      e.target.className = "bottom-menu-item checked";
      setSelectedItems(allItems.filter(items => items.completed == false));
    }
  }


  const selectCompletedItems = (e) => {
    e.preventDefault();
    if(e.target.className == "bottom-menu-item checked") {}
    else {
      e.target.parentNode.querySelector(".checked").className = "bottom-menu-item";
      e.target.className = "bottom-menu-item checked";
      setSelectedItems(allItems.filter(item => item.completed == true));
    }
  }

  const deleteCompletedItems = async () => {
    await allItems.map((item) => {
      if(item.completed == true) {
        // fetch(`https://jsonplaceholder.typicode.com/users/1/todos`, {
        //   method: 'DELETE'
        // });
      }
    })
  }


  const handleChange = async (item, value) => {
    let newArray = [...allItems];

    for(let i = 0; i < newArray.length; i++) {
      if(newArray[i].id == value) {
        if(newArray[i].completed == true) {
          newArray[i].completed = false;
          setCount(counter + 1);
        } else {
          newArray[i].completed = true;
          setCount(counter - 1);
        }
      }
    }
    setAllItems(newArray);

    let response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'PUT',
      
      body: JSON.stringify({
        userId: 1,
        id: item.id,
        title: item.title,
        completed: !item.completed
      },),

      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

  }


  const addItem = async (e) => {
    e.preventDefault();
    let input = e.target.closest(".add-item").querySelector('.input');
    if(input.value.trim() == "") return;
    let response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      
      body: JSON.stringify({
        userId: 1,
        title: input.value,
        completed: false
      },),

      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    input.value = "";

    const jsonData = await response.json();

    setAllItems([...allItems, jsonData]);

    let el = document.querySelector(".checked");
    if(el.className != "all bottom-menu-item checked") {
      el.className = "bottom-menu-item";
      document.querySelector(".all").className = "all bottom-menu-item checked";
    }
    
    
    setCount(counter + 1)
    setSelectedItems([...allItems, jsonData])
  }



  return (
    <div className="App">
      <div className="content">
        <div className="logo">
          <div class="text-logo">TODO</div>
          <div class="theme-style">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>
          </div>
        </div>

        <div className="top-menu">
        <div className="todo-item add-item">
            <div className="circle-input completed-false" onClick={(e) => addItem(e)}>
                <div className="completed-false-circle"></div>
            </div>
            <div className="description"><input class="input" type={"text"} placeholder={"Create a new todo..."}/></div>
            {/* Хрестик при наведенні */}
            <div className="cross"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg></div>
        </div>
        </div>
        
        <div className="items-box">
          {
            selectedItems.map((item) => {        
              return <ToDoItem
                key={item.id}
                description={item.title}
                completed={item.completed}
                handleChange={() => {handleChange(item, item.id) }}
                // userId={item.userId}
              />
            })
          }
          <div className="items-bottom">
            <div className="count-items">{counter} item left</div>
            <div className="menu-all-active desc">
              <div className="all bottom-menu-item checked" onClick={(e) => selectAllItems(e)}>All</div>
              <div className="bottom-menu-item"  onClick={(e) => selectActiveItems(e)}>Active</div>
              <div className="bottom-menu-item"  onClick={(e) => selectCompletedItems(e)}>Completed</div>
            </div>
            <div className="clear" onClick={() => deleteCompletedItems()}>Clear Completed</div>
          </div>
        </div>

        <div className="menu-all-active mobile">
          <div className="all bottom-menu-item checked" onClick={(e) => selectAllItems(e)}>All</div>
          <div className="bottom-menu-item"  onClick={(e) => selectActiveItems(e)}>Active</div>
          <div className="bottom-menu-item"  onClick={(e) => selectCompletedItems(e)}>Completed</div>
        </div>

        <div className="content-bottom">Drag and drop to reorder list</div>
      </div>
    </div>
  );
}

export default App;
