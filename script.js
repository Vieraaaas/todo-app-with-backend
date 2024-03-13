const btnAdd = document.querySelector(".btn-add");
const input = document.querySelector(".input");
const list = document.querySelector("ul");
let tasks = [];
const radioOpen = document.querySelector("#radio-open");
const radioDone = document.querySelector("#radio-done");
const radioAll = document.querySelector("#radio-all");
const btnRemove = document.querySelector(".btn-remove");

async function loadTasks() {
  try {
    const response = await fetch("http://localhost:4730/todos/");

    if (response.ok) {
      const data = await response.json();
      tasks = data;
      renderTasks();
    }
  } catch (err) {
    console.error(err);
  }
}

async function addTask(event) {
  const postTask = {
    description: input.value,
    done: false,
  };
  event.preventDefault();

  try {
    const response = await fetch("http://localhost:4730/todos/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postTask),
    });
    if (response.ok) {
      const data = await response.json();
      tasks.push(data);
      renderTasks();
    }
  } catch (err) {
    console.error(err);
  }
}

function renderTasks() {
  list.innerText = "";
  for (task of tasks) {
    const newItem = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "task" + task.id;
    checkbox.checked = task.done;
    checkbox.taskObject = task;
    console.log(checkbox);
    label.htmlFor = checkbox.id;
    label.innerText = task.description;
    newItem.append(checkbox, label);
    list.appendChild(newItem);
  }
}

loadTasks();

btnAdd.addEventListener("click", addTask);
