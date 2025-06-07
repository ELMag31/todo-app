

function done (task, checkbox) {
    if (checkbox.checked) {
    task.style.color = "#ff009d";
    task.style.textDecoration = "line-through";
}
    else {
        task.style.color = "black";
        task.style.textDecoration = "none";

    }
};

function disappear (element) {
    element.style.display = "none";
};
function appear (element) {
    element.style.display = "";
};


//--------můj kód---------//
const input = document.getElementById("myInput");
const addButton = document.getElementById("addBtn");
const form = document.getElementById("myForm");
let all = [];
let complated = [];
let uncomplated = [];
const allButton = document.getElementById("allBtn");
const complatedButton = document.getElementById("complatedBtn");
const uncomplatedButton = document.getElementById("uncomplatedBtn");


addButton.addEventListener("click", (event) => {
    event.preventDefault();
    const taskText = input.value;

    if (taskText === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Pozor!',
            text: 'Přidejte text!',
            confirmButtonColor: '#ff009d',
            customClass: {
                popup: 'custom-swal-border'
            }
        });
        return;
    }



    const container = document.createElement("div");
    container.className = "task-item-container";
    form.appendChild(container);

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.id = "checkbox";
    container.appendChild(checkboxInput);

    const taskTextElement = document.createElement("span");
    taskTextElement.id = "taskTextEl";
    taskTextElement.innerText = taskText;
    container.appendChild(taskTextElement);

    const editButton = document.createElement("button");
    editButton.textContent = "Upravit";
    container.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    container.appendChild(deleteButton);

     const taskObj = {
        text: taskText,
        completed: false,
        container: container,
        checkbox: checkboxInput,
        span: taskTextElement
    };

    all.push(taskObj);
    
    deleteButton.addEventListener("click", () => {
        container.remove();
        all = all.filter(task => task !== taskObj);
        });

    checkboxInput.addEventListener("click", () => {
        done(taskTextElement, checkboxInput);
        taskObj.completed = checkboxInput.checked;
        })
        
        
        

    editButton.addEventListener("click", (event) => {
        event.preventDefault();

        disappear(taskTextElement);
        disappear(editButton);
        disappear(deleteButton);
        disappear(checkboxInput);

        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = taskTextElement.innerText;
        editInput.className = "edit-input";

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Uložit";
        saveBtn.className = "save-btn";

        container.insertBefore(editInput, deleteButton);
        container.insertBefore(saveBtn, deleteButton);

        saveBtn.addEventListener("click", (event) => {
            event.preventDefault();
            const novyText = editInput.value;

            if (novyText === "" && taskText !== "") {
                Swal.fire({
            icon: 'warning',
            title: 'Pozor!',
            text: '"Text úkolu nemůže být prázdný! Ponechávám původní text."',
            confirmButtonColor: '#ff009d',
            customClass: {
                popup: 'custom-swal-border'
            }
        });
        } 
            else if (novyText !== "") {
                taskTextElement.innerText = novyText;
        }
            container.removeChild(editInput);
            container.removeChild(saveBtn);

            appear(taskTextElement); 
            appear(editButton);
            appear(deleteButton);
            appear(checkboxInput);
    });
    });

    input.value = "";

});


allButton.addEventListener("click", (event) => {
    all.forEach(task => {
        event.preventDefault();
        task.container.style.display = "";
    });
});

complatedButton.addEventListener("click", (event) => {
    event.preventDefault();
    all.forEach(task => {
        if (task.completed) {
            task.container.style.display = "";
        } else {
            task.container.style.display = "none";
        }
    });
});

uncomplatedButton.addEventListener("click", (event) => {
    event.preventDefault();
    all.forEach(task => {
        if (!task.completed) {
            task.container.style.display = "";
        } else {
            task.container.style.display = "none";
        }
    });
});



