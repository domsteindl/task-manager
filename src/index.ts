type Task = {
    id: number;
    title: string;
    done: boolean;
};

const tasks: Task[] = [];

const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addButton = document.getElementById("addTaskButton") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

addButton.addEventListener("click", () => {
    const title = taskInput.value.trim();

    if (!title) return;

    tasks.push({
        id: Date.now(),
        title,
        done: false,
    });

    taskInput.value = "";
    render();
});

function toggleTask(id: number) {
    const task = tasks.find(t => t.id === id);
    if (task) task.done = !task.done;
    render();
}

function deleteTask(id: number) {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) tasks.splice(index, 1);
    render();
}

function render() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "flex justify-between bg-gray-100 p-3 rounded";

        const span = document.createElement("span");
        span.textContent = task.title;
        span.style.textDecoration = task.done ? "line-through" : "none";
        span.onclick = () => toggleTask(task.id);

        const del = document.createElement("button");
        del.textContent = "Delete";
        del.className = "text-red-500";
        del.onclick = () => deleteTask(task.id);

        li.append(span, del);
        taskList.appendChild(li);
    });
}