const addNote = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = document.querySelector("header p"),
  closePopup = popupBox.querySelector("header i"),
  addButton = document.querySelector("button"),
  noteTitle = document.querySelector("input"),
  noteDescription = document.querySelector("textarea");
let updated = false,
  updatedId;
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
addNote.onclick = () => {
  popupTitle.innerText = "Add new note";
  addButton.innerText = "Add";
  popupBox.classList.add("show");
  noteTitle.focus();
};

closePopup.onclick = () => {
  updated = false;
  popupBox.classList.remove("show");
  noteTitle.value = "";
  noteDescription.value = "";
};

function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let liTag = `<li class="note">
      <div class="details">
          <p>${note.newNoteTitle}</p>
          <span>${note.newNoteDescription}</span>
      </div>
      <div class="bottom-content">
          <span>${note.date}</span>
          <div class="settings">
              <i onclick = "showMenu(this)" class="uil uil-ellipsis-h"></i>
              <ul class="menu">
                  <li onclick = "updateNote(${index},'${note.newNoteTitle}','${note.newNoteDescription}')"><i class="uil uil-pen"></i>Edit</li>
                  <li onclick ="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
              </ul>
          </div>
      </div>
    </li>`;
    addNote.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();
function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.onclick = (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  };
}
function deleteNote(noteId) {
  let confirmDeletion = confirm("Are you sure you want to delete this note?");
  if (!confirmDeletion) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}
function updateNote(noteId, title, description) {
  updated = true;
  updatedId = noteId;
  addNote.click();
  popupTitle.innerText = "Update note";
  addButton.innerText = "Update";
  noteTitle.value = title;
  noteDescription.value = description;
}
addButton.onclick = (e) => {
  e.preventDefault();
  let title = noteTitle.value;
  let description = noteDescription.value;
  if (title || description) {
    let dateObj = new Date(),
      year = dateObj.getFullYear(),
      month = months[dateObj.getMonth()],
      day = dateObj.getDate();
    let noteInfo = {
      newNoteTitle: title,
      newNoteDescription: description,
      date: `${month} ${day} , ${year}`,
    };
    if (!updated) {
      notes.push(noteInfo);
    } else {
      updated = false;
      notes[updatedId] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    closePopup.click();
    showNotes();
    noteTitle.value = "";
    noteDescription.value = "";
  }
};
