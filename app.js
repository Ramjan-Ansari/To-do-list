const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todiList = document.getElementById("todoList");

let editTodo = null;

const addtodo = () => {
  let inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("write somthing , this emt plz try again");
    return false;
  }

  if (addBtn.value === "Edit") {
    //editTodo.target.previousElementSibling.innerHTML = inputText;
    editLocalTodos(inputText);
    addBtn.value = "Add";
    inputBox.value = "";
  } else {
    let li = document.createElement("li");
    let p = document.createElement("p");

    p.innerHTML = inputText;
    li.appendChild(p);

    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("btn", "editbtn");
    li.appendChild(editBtn);

    let delBtn = document.createElement("button");
    delBtn.innerHTML = "Remove";
    delBtn.classList.add("btn", "deletebtn");
    li.appendChild(delBtn);

    todiList.appendChild(li);
    inputBox.value = "";

    saveLocalTodo(inputText);
  }
};

const updaTodo = (e) => {
  // console.log(e.target);
  // console.log(e.target.innerHTML);
  if (e.target.innerHTML === "Remove") {
    todiList.removeChild(e.target.parentElement);
    deletLocalTodos(e.target.parentElement);
  }

  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit";
  }
};

const saveLocalTodo = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      let li = document.createElement("li");
      let p = document.createElement("p");

      p.innerHTML = todo;
      li.appendChild(p);

      let editBtn = document.createElement("button");
      editBtn.innerHTML = "Edit";
      editBtn.classList.add("btn", "editbtn");
      li.appendChild(editBtn);

      let delBtn = document.createElement("button");
      delBtn.innerHTML = "Remove";
      delBtn.classList.add("btn", "deletebtn");
      li.appendChild(delBtn);

      todiList.appendChild(li);
    });
  }
}

const deletLocalTodos = (todo) =>{
    let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let todoText = todo.children[0].innerHTML;
  let todoIndex = todos.indexOf(todoText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
 // console.log(todoIndex);
}

const editLocalTodos = (todo)=>{
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos",JSON.stringify(todos))

}
addBtn.addEventListener("click", addtodo);
todiList.addEventListener("click", updaTodo);
document.addEventListener("DOMContentLoaded", getLocalTodos);
