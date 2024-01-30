const app = document.getElementById("page");
const home = document.querySelector(".container");
const notes = document.querySelector(".all-notes");
const todo = document.querySelector(".todo");
const createIdeaPage = document.querySelector(".create-idea");
const saveTextPage = document.querySelector(".save-text");
const settingsPage = document.querySelector(".settings");
const loginPage = document.querySelector(".login");
const header = document.querySelector(".header");
const navigation = document.querySelector(".navigation");
const headerText = document.querySelector(".head_text h1");
const newNoteOptions = document.querySelector(".new-note");
const homeBtn = document.querySelector("li.home_tab");
const NotesBtn = document.querySelector("li.notes_tab");
const todoBtn = document.querySelector("li.todo_tab");
const createIdeaBtn = document.querySelector(".think");
const saveTextBtn = document.querySelector(".write");
const settingBtn = document.querySelector(".setting");
const createNewBtn = document.getElementById("plus");
const createOptions = document.querySelector(".new-note");
const createNewIdea = document.getElementById("create_idea_icon");
const saveNewText = document.getElementById("create_text_icon");
const saveIdeaPromptBtn = document.querySelector("#save-idea");
const cancelIdeaPromptBtn = document.querySelector("#cancel-idea");
const saveTextPromptBtn = document.querySelector("#save-text");
const cancelTextPromptBtn = document.querySelector("#cancel-text");
const saveTodoPromptBtn = document.querySelector("#save-todo");
const cancelTodoPromptBtn = document.querySelector("#cancel-todo");
const formSubmitBtn = document.getElementById("submit-form-btn");
const loginForm = document.querySelector(".login-form");
const theme = document.querySelector(".theme");
const font = document.querySelector(".font");
const copyBtn = document.querySelectorAll(".copy");
const clearAllNotesBtn = document.querySelector(".clear_all_notes");
const clearAllTodosBtn = document.querySelector(".clear_all_todos");
const createNewTodoBtn = document.querySelector(".todo_header button");
const createNewTodoPage = document.querySelector(".create-todo");

// localStorage.clear();
const allNotes = JSON.parse(localStorage.getItem("Notes")) || [];
const allTodos = JSON.parse(localStorage.getItem("Todos")) || [];
const newTodos = [];
const newNotes = [];
let promptId = allNotes.length;
let todoId = allTodos.length;

// show the homepage
function showHomePage() {
  const user = sessionStorage.getItem("User");
  if (user) {
    console.log("home button clicked");
    home.style.display = "block";
    notes.style.display = "none";
    createIdeaPage.style.display = "none";
    saveTextPage.style.display = "none";
    createNewTodoPage.style.display = "none";
    settingsPage.style.display = "none";
    header.style.display = "flex";
    navigation.style.display = "block";
    todo.style.display = "none";
    homeBtn.classList.add("active");
    NotesBtn.classList.remove("active");
    todoBtn.classList.remove("active");
  }
}

function showSettingsPage() {
  console.log("setting button clicked!!");
  home.style.display = "none";
  createIdeaPage.style.display = "none";
  saveTextPage.style.display = "none";
  createNewTodoPage.style.display = "none";
  notes.style.display = "none";
  settingsPage.style.display = "block";
  header.style.display = "flex";
  navigation.style.display = "block";
  todo.style.display = "none";
  homeBtn.classList.remove("active");
  NotesBtn.classList.remove("active");
  todoBtn.classList.remove("active");
}

function showTodoPage() {
  console.log("todo button clicked!!");
  home.style.display = "none";
  createIdeaPage.style.display = "none";
  saveTextPage.style.display = "none";
  createNewTodoPage.style.display = "none";
  notes.style.display = "none";
  settingsPage.style.display = "none";
  header.style.display = "flex";
  navigation.style.display = "block";
  todo.style.display = "block";
  homeBtn.classList.remove("active");
  NotesBtn.classList.remove("active");
  todoBtn.classList.add("active");

  const currentTodos = JSON.parse(localStorage.getItem("Todos")) || [];
  console.log(currentTodos);

  if (currentTodos.length < 1) {
    document.querySelector(
      ".todo_list"
    ).innerHTML = `<h3> No Todos Available</h3>`;
  } else {
    document.querySelector(".todo_list").innerHTML = currentTodos
      .map((todo) => {
        const date = new Date().toLocaleDateString("en-US").split("/");
        const todoDate = todo.date.split("/");
        const time = new Date().toLocaleTimeString("en-US").split(":");
        const todoTime = todo.time.split(":");

        function getDifference() {
          if (Number(date[2]) > Number(todoDate[2])) {
            if (Number(date[2]) - Number(todoDate[2] == 1)) {
              return `${Number(date[2]) - Number(todoDate[2])} year ago`;
            }
            return `${Number(date[2]) - Number(todoDate[2])} years ago`;
          } else if (Number(date[0]) > Number(todoDate[0])) {
            if (Number(date[0]) - Number(todoDate[0] == 1)) {
              return `${Number(date[0]) - Number(todoDate[0])} month ago`;
            }
            return `${Number(date[0]) - Number(todoDate[0])} months ago`;
          } else if (Number(date[1]) - Number(todoDate[1]) > 7) {
            week = Math.floor((Number(date[1]) - Number(todoDate[1])) / 7);
            if (week == 1) {
              return `${week} week ago`;
            }
            return `${week} weeks ago`;
          } else if (Number(date[1]) - Number(todoDate[1])) {
            day = Math.floor(Number(date[1]) - Number(todoDate[1]));
            if (day == 1) {
              return `${day} day ago`;
            }
            return `${day} days ago`;
          } else if (Number(time[0]) > Number(todoTime[0])) {
            if (Number(time[0]) - Number(todoTime[0]) == 1) {
              return `${Number(time[0]) - Number(todoTime[0])} hour ago`;
            }
            return `${Number(time[0]) - Number(todoTime[0])} hours ago`;
          } else if (Number(time[1]) - Number(todoTime[1])) {
            if (Number(time[1]) - Number(todoTime[1]) == 1) {
              return `${Number(time[1]) - Number(todoTime[1])} minute ago`;
            }
            return `${Number(time[1]) - Number(todoTime[1])} minutes ago`;
          } else {
            return `${
              Number(time[2].split(" ")[0]) - Number(todoTime[2].split(" ")[0])
            } seconds ago`;
          }
        }

        return `
        <div class="todo_card">
            <input type="checkbox" name="completed" id="completed" />
            <p class="todo_title">${todo.title}</p>
            <div class="todo_details">
                <div class="todo_status">
                  <span class="status_title">Status</span>
                  <span class="status">${todo.status}</span>
                </div>
                <div class="todo_duedate">
                  <div class="duedate_header">
                    <img src="./assets/clock_unfill.svg" width="14px" alt="" />
                    <span class="status_title">Due Date</span>
                  </div>
                  <span class="status">${todo.date}</span>
                </div>
                <img
                  src="./assets/more-vertical.svg"
                  class="todo_options"
                  height="22px"
                  title="more options"
                  alt="more options"
                  onclick="showTodoOptions()"
                />
              </div>
          </div>
               `;
      })
      .join(" ");
  }
}

// show the notes page
function showNotesPage() {
  console.log("notes button clicked");
  home.style.display = "none";
  createIdeaPage.style.display = "none";
  saveTextPage.style.display = "none";
  createNewTodoPage.style.display = "none";
  notes.style.display = "block";
  settingsPage.style.display = "none";
  header.style.display = "flex";
  navigation.style.display = "block";
  todo.style.display = "none";
  homeBtn.classList.remove("active");
  NotesBtn.classList.add("active");
  todoBtn.classList.remove("active");
  const currentNotes = JSON.parse(localStorage.getItem("Notes")) || [];
  console.log(currentNotes);

  if (currentNotes.length < 1) {
    document.querySelector(".notes").innerHTML = `<h3> No Notes Available</h3>`;
  } else {
    document.querySelector(".notes").innerHTML = currentNotes
      .map((note) => {
        const date = new Date().toLocaleDateString("en-US").split("/");
        const noteDate = note.date.split("/");
        const time = new Date().toLocaleTimeString("en-US").split(":");
        const noteTime = note.time.split(":");

        function getDifference() {
          if (Number(date[2]) > Number(noteDate[2])) {
            if (Number(date[2]) - Number(noteDate[2] == 1)) {
              return `${Number(date[2]) - Number(noteDate[2])} year ago`;
            }
            return `${Number(date[2]) - Number(noteDate[2])} years ago`;
          } else if (Number(date[0]) > Number(noteDate[0])) {
            if (Number(date[0]) - Number(noteDate[0] == 1)) {
              return `${Number(date[0]) - Number(noteDate[0])} month ago`;
            }
            return `${Number(date[0]) - Number(noteDate[0])} months ago`;
          } else if (Number(date[1]) - Number(noteDate[1]) > 7) {
            week = Math.floor((Number(date[1]) - Number(noteDate[1])) / 7);
            if (week == 1) {
              return `${week} week ago`;
            }
            return `${week} weeks ago`;
          } else if (Number(date[1]) - Number(noteDate[1])) {
            day = Math.floor(Number(date[1]) - Number(noteDate[1]));
            if (day == 1) {
              return `${day} day ago`;
            }
            return `${day} days ago`;
          } else if (Number(time[0]) > Number(noteTime[0])) {
            if (Number(time[0]) - Number(noteTime[0]) == 1) {
              return `${Number(time[0]) - Number(noteTime[0])} hour ago`;
            }
            return `${Number(time[0]) - Number(noteTime[0])} hours ago`;
          } else if (Number(time[1]) - Number(noteTime[1])) {
            if (Number(time[1]) - Number(noteTime[1]) == 1) {
              return `${Number(time[1]) - Number(noteTime[1])} minute ago`;
            }
            return `${Number(time[1]) - Number(noteTime[1])} minutes ago`;
          } else {
            return `${
              Number(time[2].split(" ")[0]) - Number(noteTime[2].split(" ")[0])
            } seconds ago`;
          }
        }

        return `
                  <div class="note">
                    <div class="card-head">
                      <div class="calendar">
                          <img src="./assets/calendar.svg" alt="" /><span>${
                            note.date
                          }
                          </span>
                      </div>
                      <div class="time">
                          <img src="./assets/clock_unfill.svg" alt="" />
                          <span>${getDifference()}</span>
                      </div>
                    <p class="card-tag" style=" ${
                      note.tag == "Text" && "background-color: rgba(0,0,223,.2)"
                    }">
                    ${note.tag}</p>
                  </div>
                  <p class="card-title">${note.title}</p>
                  <p class="card-details">
                   ${note.detail}
                  </p>
                  <div class="actions">
                          <img src="./assets/copy.svg" width="25px" title="copy"  id=${
                            note.pid
                          } onClick=copyNote(${note.pid}) />
                    <img src="./assets/delete.svg" width="25px" title="delete" onClick= deleteNote(${
                      note.pid
                    }) />
                  </div>
                </div>
               `;
      })
      .join(" ");
  }
}

// copy function
async function copyNote(id) {
  const note = JSON.parse(localStorage.getItem("Notes")).find(
    (note) => note.pid == id
  );
  await navigator.clipboard.writeText(
    `Title: ${note.title}\n Detail: ${note.detail}`
  );
  alert("Copied!!");
}

// delete function
function deleteNote(id) {
  const notes = JSON.parse(localStorage.getItem("Notes")).filter(
    (note) => note.pid !== id
  );
  localStorage.setItem("Notes", JSON.stringify(notes));
  console.log(notes);
  showNotesPage();
}

//create idea page
function showCreateIdeaPage() {
  console.log("notes button clicked");
  home.style.display = "none";
  notes.style.display = "none";
  createIdeaPage.style.display = "block";
  saveTextPage.style.display = "none";
  createNewTodoPage.style.display = "none";
  settingsPage.style.display = "none";
  header.style.display = "flex";
  navigation.style.display = "block";
  homeBtn.classList.remove("active");
  NotesBtn.classList.remove("active");
  todoBtn.classList.remove("active");
}

function showCreateTodoPage() {
  console.log("Create todo button clicked");
  home.style.display = "none";
  notes.style.display = "none";
  createIdeaPage.style.display = "none";
  saveTextPage.style.display = "none";
  createNewTodoPage.style.display = "block";
  settingsPage.style.display = "none";
  header.style.display = "flex";
  navigation.style.display = "block";
  homeBtn.classList.remove("active");
  NotesBtn.classList.remove("active");
  todoBtn.classList.remove("active");
}

//  save text
function showSaveTextPage() {
  home.style.display = "none";
  createIdeaPage.style.display = "none";
  saveTextPage.style.display = "block";
  notes.style.display = "none";
  settingsPage.style.display = "none";
  header.style.display = "flex";
  navigation.style.display = "block";
  homeBtn.classList.remove("active");
  NotesBtn.classList.remove("active");
  todoBtn.classList.remove("active");
}

// open menu options for creating something new
function showOptions() {
  createOptions.classList.toggle("active");
}

// show action buttons for copying and deleting
function showActions() {
  noteCard.classList.toggle("active");
}

function clear(title, detail) {
  console.log("cleared", title, detail);
}

// generic function for saving
function savePrompt(prompt) {
  console.log("save clicked");

  if (prompt.title != " " && prompt.detail != "") {
    newNotes.unshift(prompt);
    const notesTogether = newNotes.concat(allNotes);
    localStorage.setItem("Notes", JSON.stringify(notesTogether));
    alert("Prompt Saved");
    console.log(newNotes);
  }
}

function saveTodoPrompt(prompt) {
  console.log("save todo clicked");
  if (prompt.title != " ") {
    newTodos.unshift(prompt);
    const todosTogether = newTodos.concat(allTodos);
    localStorage.setItem("Todos", JSON.stringify(todosTogether));
    alert("Todo Saved");
    console.log(newTodos);
  }
}

// generic function to cancel
function cancelPrompt() {
  alert(
    "Warning !! , Are you Sure You Want to cancel, You'll lose all prompts"
  );
  console.log("cancel clicked");
}

// sort the date and night for each note
function sortDate() {
  const date = new Date();
  return date.toLocaleString("en-US");
}

// Saves an Idea
function saveIdea(promptId) {
  const title = document.getElementById("idea-title").value;
  const detail = document.getElementById("idea-detail").value;
  const prompt = {
    title,
    detail,
    tag: "Idea",
    date: sortDate().split(",")[0],
    time: sortDate().split(",")[1],
    promptId,
  };
  console.log(prompt);
  promptId++;
  savePrompt(prompt);
  document.getElementById("idea-title").value = "";
  document.getElementById("idea-detail").value = "";
}

// Save any other text, passwords, secret keys etc.
function saveText(promptId) {
  const title = document.getElementById("text-title").value;
  const detail = document.getElementById("text-detail").value;
  const prompt = {
    title,
    detail,
    tag: "Text",
    date: sortDate().split(",")[0],
    time: sortDate().split(",")[1],
    promptId,
  };
  savePrompt(prompt);
  promptId++;
  document.getElementById("text-title").value = "";
  document.getElementById("text-detail").value = "";
}
function saveTodo(todoId) {
  const title = document.getElementById("todo-title").value;
  const prompt = {
    title,
    date: sortDate().split(",")[0],
    time: sortDate().split(",")[1],
    status: "In-progress",
    todoId,
  };
  console.log(prompt);
  todoId++;
  saveTodoPrompt(prompt);
  document.getElementById("todo-title").value = "";
}

function cancelTodo() {
  if (document.getElementById("todo-title").value != "") {
    cancelPrompt();
    document.getElementById("todo-title").value = "";
  } else {
    alert("You've not put down any todo yet");
  }
}
// cancel any Idea and start over
function cancelIdea() {
  if (
    document.getElementById("idea-title").value != "" &&
    document.getElementById("idea-detail").value != ""
  ) {
    cancelPrompt();
    document.getElementById("idea-title").value = "";
    document.getElementById("idea-detail").value = "";
  } else {
    alert("You've not put down any Idea yet");
  }
}

// cancel any text
function cancelText() {
  if (
    document.getElementById("text-title").value != "" &&
    document.getElementById("text-detail").value != ""
  ) {
    cancelPrompt();
    document.getElementById("text-title").value = "";
    document.getElementById("text-detail").value = "";
  } else {
    alert("You've not put down any text yet");
  }
}

//  Change app theme
function changeTheme(e) {
  // console.log(e.target.checked);
  if (e.target.type == "checkbox" && e.target.checked == true) {
    document.body.style.backgroundColor = "rgba(0,0,0,0.96)";
    document.body.style.color = "white";
    header.style.boxShadow = "0px 3px 6px #121212";
    headerText.style.color = "rgb(152, 2, 150)";
    newNoteOptions.style.boxShadow = "none";
  } else {
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "black";
    newNoteOptions.style.boxShadow =
      "20px 20px 39px #bfbfbf,-20px -20px 39px #ffffff";
    headerText.style.color = "rgb(112,2,112)";
    header.style.boxShadow = "0px 3px 3px #e0e0e0";
  }
}

//  Change app Font Size
function changeFont(e) {
  const fontSize = 12 + 16 * (e.target.value / 80);
  // console.log(`${fontSize}px`);
  document.body.style.fontSize = `${fontSize}px`;
  document.getElementById("%size").textContent = `${fontSize}px`;
  // sessionStorage.setItem("font", fontSize);
}

function submitForm(e) {
  if (e.target.type == "submit") {
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const userDetails = [name, password];

    if (userDetails[0] == "Felix" && userDetails[1] == "2026") {
      document.getElementById("login-message").textContent =
        "Login Sucessful ✔ ";
      document.getElementById("login-message").style.color = "green";
      sessionStorage.setItem("User", userDetails);
      console.log(userDetails);
      setTimeout(() => {
        loginPage.style.display = "none";
        showHomePage();
      }, 2000);
    } else {
      document.getElementById("login-message").textContent =
        "Incorrect UserName or Password ⚠";
      document.getElementById("login-message").style.color = "red";
    }
  }
}

function clearMemory(item) {
  console.log("clear button clicked");
  const reply = prompt(
    `Are you Sure You want to Clear all ${item}  ? \n If yes type "YES" in the space provided below `
  );
  if (reply.toUpperCase() == "YES") {
    localStorage.removeItem(item);
  } else {
    alert('You didn\'t type "YES"');
  }
}

function showTodoOptions() {}
/*      
    All vent Listeners 
                              and their callback functions  
                                                                       */
homeBtn.addEventListener("click", showHomePage);
NotesBtn.addEventListener("click", showNotesPage);

createIdeaBtn.addEventListener("click", showCreateIdeaPage);
saveTextBtn.addEventListener("click", showSaveTextPage);
createNewBtn.addEventListener("click", showOptions);
saveNewText.addEventListener("click", showSaveTextPage);
settingBtn.addEventListener("click", showSettingsPage);
createNewIdea.addEventListener("click", showCreateIdeaPage);
todoBtn.addEventListener("click", showTodoPage);
saveIdeaPromptBtn.addEventListener("click", saveIdea);
cancelIdeaPromptBtn.addEventListener("click", cancelIdea);
saveTodoPromptBtn.addEventListener("click", saveTodo);
cancelTodoPromptBtn.addEventListener("click", cancelTodo);
saveTextPromptBtn.addEventListener("click", saveText);
cancelTextPromptBtn.addEventListener("click", cancelText);
theme.addEventListener("click", (e) => changeTheme(e));
font.addEventListener("change", (e) => changeFont(e));
loginForm.addEventListener("click", (e) => submitForm(e));
clearAllNotesBtn.addEventListener("click", () => clearMemory("Notes"));
clearAllTodosBtn.addEventListener("click", () => clearMemory("Todos"));
createNewTodoBtn.addEventListener("click", showCreateTodoPage);

// copyBtn.addEventListener("click", () => console.log("copied !!"));
