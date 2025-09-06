const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popup = document.querySelector(".popup");
const closeIcon = document.querySelector(".bx-x");
const form = document.querySelector("form");
const formBtn = document.querySelector("#form-btn");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const noteList = document.querySelector(".wrapper");
const popupTitle = document.querySelector("#popup-title");
const popopBtn = document.querySelector("#form-btn");
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
let isUpdate;
let updateId;
let setActiveMenu = (item) => {
  item.target.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName !== "I" || e.target !== item.target) {
      item.target.parentElement.classList.remove("show");
    }
  });
};

let deleteNote = (item) => {
  const response = confirm("Are you sure you want to delete this note?");
  if (response) {
    let noteId = item.target.closest(".note").dataset.id;
    notes = notes.filter((note) => note.id != noteId);
    localStorage.setItem("noteItem", JSON.stringify(notes));
    showNotes();
  } else {
    console.log("cancelled");
  }
};
let editNote = (item) => {
  let noteId = Number(item.target.closest(".note").dataset.id);
  let foundedNote = notes.find((note) => note.id == noteId);
  popupBox.classList.add("show");
  popup.classList.add("show");
  document.body.style.overflow = "hidden";
  title.value = foundedNote.title;
  description.value = foundedNote.description;
  isUpdate = true;
  updateId = noteId;
  popopBtn.innerText = "Update Note";
  popupTitle.innerText = "Update Note";

};
noteList.addEventListener("click", (e) => {
  if (e.target.classList.contains("bx")) {
    setActiveMenu(e);
  } else if (e.target.classList.contains("delete-icon")) {
    deleteNote(e);
  } else if (e.target.classList.contains("edit-icon")) {
    editNote(e);
  }
});

addBox.addEventListener("click", () => {
  popupBox.classList.add("show");
  popup.classList.add("show");

  document.body.style.overflow = "hidden";
});
closeIcon.addEventListener("click", () => {
  popupBox.classList.remove("show");
  popup.classList.remove("show");
  document.body.style.overflow = "auto";
  popopBtn.innerText = "Add Note";
  popupTitle.innerText = "New Note";
  title.value=""
 description.value=""
 
});
let notes = JSON.parse(localStorage.getItem("noteItem")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const noteTitle = title.value;
  const noteDescription = description.value;
  if (!noteTitle || !noteDescription) {
    alert("Please fill in all fields");
    return;
  }
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let updatedMonth = monthNames[month];
  let year = date.getFullYear();
  let id = date.getTime();
  if (isUpdate) {
  let editIndex = notes.findIndex((note)=>note.id==updateId)
  notes[editIndex]={
    title: noteTitle,
    description: noteDescription,
    date: `${day}, ${updatedMonth}, ${year}`,
    id,

  }
  
  } else {
    let noteItem = {
      title: noteTitle,
      description: noteDescription,
      date: `${day}, ${updatedMonth}, ${year}`,
      id,
    };
    notes.push(noteItem);
  }

  localStorage.setItem("noteItem", JSON.stringify(notes));
  //   title.value = "";
  //   description.value = "";
  form.reset();
  popupBox.classList.remove("show");
  popup.classList.remove("show");
  document.body.style.overflow = "auto";
  showNotes();
});

let removeNote = () => {
  document.querySelectorAll(".note").forEach((note) => {
    note.remove();
  });
};
const showNotes = () => {
  removeNote();

  notes.forEach((note) => {
    let noteItem = `
         <div class="note" data-id=${note.id}>
       
        <div class="details">
          <h2>${note.title}</h2>
          <p>${note.description}</p>
        </div>

     
        <div class="bottom">
          
          <p>${note.date}</p>

         
          <div class="settings">
         
            <i class="bx bx-dots-horizontal-rounded"></i>

        
            <ul class="menu">
              <li class="edit-icon"><i class="bx bx-edit"></i> Edit</li>
              <li class="delete-icon">
                <i class="bx bx-trash"></i>
                Delete
              </li>
            </ul>
          </div>
        </div>
      </div>
        `;
    noteList.insertAdjacentHTML("beforeend", noteItem);
  });
};
showNotes();
