const btnAdd = document.querySelector(".btn-add");
const input = document.querySelector(".input");
const list = document.querySelector("ul");
let tasks = [];
const radioOpen = document.querySelector("#radio-open");
const radioDone = document.querySelector("#radio-done");
const radioAll = document.querySelector("#radio-all");
const btnRemove = document.querySelector(".btn-remove");
const apiUrl = "http://localhost:4730/todos/";

loadTasks();

function renderTasks() {
  list.innerText = "";
  for (const task of tasks) {
    const newItem = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "task" + task.id;
    checkbox.checked = task.done;
    checkbox.taskObject = task;
    label.htmlFor = checkbox.id;
    label.innerText = task.description;
    newItem.append(checkbox, label);
    list.appendChild(newItem);
  }
}

async function loadTasks() {
  try {
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();
      tasks = data;
      renderTasks();
    }
  } catch (err) {
    console.error(err);
  }
}

// Add task
btnAdd.addEventListener("click", async function (event) {
  event.preventDefault();

  if (
    tasks.some(function (task) {
      return task.description.toLowerCase() === input.value.toLowerCase();
    })
  ) {
    alert("That is already on your list!");
    return;
  }

  if (input.value.trim() !== "") {
    const postTask = {
      description: input.value,
      done: false,
    };

    try {
      const response = await fetch(apiUrl, {
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
      input.value = "";
    } catch (err) {
      console.error(err);
    }
  }
});

// Toggle done = true/false
list.addEventListener("change", async function (event) {
  const updatedTask = event.target.taskObject;
  updatedTask.done = !updatedTask.done;

  try {
    const response = await fetch(apiUrl + updatedTask.id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    if (response.ok) {
    }
  } catch (err) {
    console.error(err);
  }
});

// Remove finished tasks
btnRemove.addEventListener("click", async function (event) {
  event.preventDefault();

  if (
    confirm(
      "Are you sure you want to delete ALL finished tasks? No takesies-backsies!"
    ) === true
  ) {
    try {
      for (let i = tasks.length - 1; i >= 0; i--) {
        let task = tasks[i];
        if (task.done === true) {
          const response = await fetch(apiUrl + task.id, {
            method: "DELETE",
          });
          if (response.ok) {
            tasks.splice(i, 1);
          }
        }
      }
      renderTasks();
    } catch (err) {
      console.error(err);
    }
  }
});

// Show all tasks
radioAll.addEventListener("click", function showAll() {
  for (const task of tasks) {
    const listElement = document.querySelector(`#task${task.id}`);
    listElement.parentNode.style.display = "";
  }
});

//filter tasks
function filter(status) {
  for (const task of tasks) {
    const listElement = document.querySelector(`#task${task.id}`);
    if (task.done === status) {
      listElement.parentNode.style.display = "none";
    } else {
      listElement.parentNode.style.display = "";
    }
  }
}
radioOpen.addEventListener("click", function () {
  filter(true);
});
radioDone.addEventListener("click", function () {
  filter(false);
});
