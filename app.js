const button = document.querySelector("#button")
const container = document.querySelector("#container")

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    console.log(notes);
    const data = [];
    notes.forEach(
        (note) => data.push(note.value)
    )
    if(data.length===0){
        localStorage.removeItem("notes")
    }else{
        localStorage.setItem("notes",JSON.stringify(data))
    }
}

button.addEventListener(
    "click",
    function(){
        addNote()
    }
)

const addNote = (text = "")  =>  {
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
            <div class="tool">
                <p  class="para">Write A Notes Here Only</p>
                <i  class="trash fa-regular fa-trash-can"></i>
                <i  class="save fa-regular fa-floppy-disk"></i>
            </div> 
            <textarea>${text}</textarea>
            `;
            note.querySelector(".trash").addEventListener(
                "click",
                function(){
                    note.remove()
                    saveNotes()
                }
            )
            note.querySelector(".save").addEventListener(
                "click",
                function(){
                    saveNotes()
                }
            )
            container.appendChild(note);
            saveNotes()
}
(
    function(){
        const notes = JSON.parse(localStorage.getItem("notes"));
        if(notes===null){
            addNote()
        }else{
            notes.forEach(
                (notes) => {
                    addNote(notes)
                }
            )
        }
    }
)()