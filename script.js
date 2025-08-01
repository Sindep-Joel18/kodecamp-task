// document.addEventListener("DOMContentLoaded", function () 
// waits until the full page has loaded before running any JavaScript
// The next lines 
// const addBtn
// const taskInput et al.. connects JavaScript to HTML elements 
// using their IDs as declared in the index.html

document.addEventListener("DOMContentLoaded", function () {
	const addBtn = document.getElementById("add-btn");
	const taskInput = document.getElementById("task-input");
	const taskList = document.getElementById("task-list");
	const emptyState = document.getElementById("empty-state");

	const totalTasks = document.getElementById("total-tasks");
	const completedTasks = document.getElementById("completed-tasks");
	const pendingTasks = document.getElementById("pending-tasks");

	// Function to Update Task Statistics for all task and completed task
	function updateStats() {
		const allTasks = taskList.querySelectorAll("li");
		const completed = taskList.querySelectorAll("li.completed");

		totalTasks.textContent = allTasks.length;
		completedTasks.textContent = completed.length;
		pendingTasks.textContent = allTasks.length - completed.length;

		emptyState.style.display = allTasks.length === 0 ? "block" : "none";
	}

	// Adds a New Task when the Enter Key is pressed
	taskInput.addEventListener("keydown", function (e) {
		if (e.key === "Enter") {
			e.preventDefault(); // Prevents accidental form submission
			addBtn.click(); // Triggers the same action as clicking "Add Task"
		}
	});

	addBtn.addEventListener("click", function () {
		const taskText = taskInput.value.trim();

		if (taskText === "") {
			alert("Please enter a task."); //Ensures a null task is not accepted
			return;
		}

		const taskItem = document.createElement("li");
		taskItem.className = "task-item";
		taskItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div class="actions">
                <button class="complete-btn">✔</button>
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">🗑️</button>
            </div>
        `;

		taskList.appendChild(taskItem);
		taskInput.value = "";
		updateStats();
	});

	taskList.addEventListener("click", function (e) {
		const target = e.target;
		const taskItem = target.closest("li");

		// Delete task
		if (target.classList.contains("delete-btn")) {
			if (confirm("Are you sure you want to delete this task?")) {
				//Confirms if you want to delet a task
				taskItem.remove();
				updateStats();
			}
		}

		// Edit task
		if (target.classList.contains("edit-btn")) {
			const taskTextEl = taskItem.querySelector(".task-text");
			const currentText = taskTextEl.textContent;

			const newText = prompt("Edit your task:", currentText);
			if (newText !== null) {
				const trimmed = newText.trim();
				if (trimmed !== "") {
					taskTextEl.textContent = trimmed;
				} else {
					alert("Task cannot be empty.");
				}
			}
		}

		// Toggle complete
		if (target.classList.contains("complete-btn")) {
			taskItem.classList.toggle("completed");
			updateStats();
		}
	});

	// Filter buttons: responsible for showing/hiding tasks based on their completion status
	const filterBtns = document.querySelectorAll(".filter-btn");
	filterBtns.forEach((btn) => {
		btn.addEventListener("click", function () {
			filterBtns.forEach((b) => b.classList.remove("active"));
			btn.classList.add("active");

			const filter = btn.dataset.filter;
			const tasks = taskList.querySelectorAll("li");

			tasks.forEach((task) => {
				if (filter === "all") {
					task.style.display = "flex";
				} else if (filter === "completed") {
					task.style.display = task.classList.contains("completed")
						? "flex"
						: "none";
				} else if (filter === "pending") {
					task.style.display = !task.classList.contains("completed")
						? "flex"
						: "none";
				}
			});
		});
	});

	updateStats();
});
