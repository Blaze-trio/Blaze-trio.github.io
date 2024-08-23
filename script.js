const todoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");

let todo = JSON.parse(localStorage.getItem("todo-list")) || [];
let updateIndex = null;

function CreateToDoItems() {
  if (todoValue.value.trim() === "") {
    setAlertMessage("Please enter your todo text!");
    todoValue.focus();
    return;
  }

  if (updateIndex !== null) {
    // Update existing item
    todo[updateIndex].item = todoValue.value;
    updateIndex = null;
    addUpdate.setAttribute("src", "images/plus.png");
    setAlertMessage("Todo item Updated Successfully!");
  } else {
    // Create new item
    if (todo.some((element) => element.item === todoValue.value.trim())) {
      setAlertMessage("This item already present in the list!");
      return;
    }

    let newItem = { item: todoValue.value, status: false };
    todo.push(newItem);
    setAlertMessage("Todo item Created Successfully!");
  }

  todoValue.value = "";
  setLocalStorage();
  renderToDoItems();
}

function renderToDoItems() {
  listItems.innerHTML = "";
  todo.forEach((element, index) => {
    let li = document.createElement("li");
    let style = element.status ? "style='text-decoration: line-through'" : "";
    let todoItems = `
      <div ${style} ondblclick="CompletedToDoItems(${index})">${element.item}</div>
      <div>
        ${!element.status ? '<img class="edit todo-controls" onclick="UpdateToDoItems(' + index + ')" src="images/pencil.png" />' : ""}
        <img class="delete todo-controls" onclick="DeleteToDoItems(${index})" src="images/delete.png" />
      </div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);
  });
}

function UpdateToDoItems(index) {
  todoValue.value = todo[index].item;
  updateIndex = index;
  addUpdate.setAttribute("src", "images/refresh.png");
  todoValue.focus();
}

function DeleteToDoItems(index) {
  if (confirm(`Are you sure you want to delete this item?`)) {
    todo.splice(index, 1);
    setLocalStorage();
    setAlertMessage("Todo item Deleted Successfully!");
    renderToDoItems();
  }
}

function CompletedToDoItems(index) {
  todo[index].status = true;
  setLocalStorage();
  setAlertMessage("Todo item Completed Successfully!");
  renderToDoItems();
}

function setLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todo));
}

function setAlertMessage(message) {
  todoAlert.innerText = message;
  setTimeout(() => {
    todoAlert.innerText = "";
  }, 2000);
}

addUpdate.addEventListener("click", CreateToDoItems);
renderToDoItems();
