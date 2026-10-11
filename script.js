console.log("script loaded");

const taskForm = document.querySelector("#task-form");
const taskDescription = document.querySelector("#task-description");
const taskMinutes = document.querySelector("#task-minutes");
const formMessage = document.querySelector("#form-message");
const taskCount = document.querySelector("#task-count");
const emptyMessage = document.querySelector("#empty-message");
const taskList = document.querySelector("#task-list");

let completedTasks = 0;

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const description = taskDescription.value.trim();
    const minutes = Number(taskMinutes.value);

    formMessage.textContent = "";

    // Check task description
    if (description === "") {
        formMessage.textContent = "Please enter a task description.";
        taskDescription.focus();
        return;
    }

    // Check estimated minutes
    if (!Number.isFinite(minutes) || minutes <= 0) {
        formMessage.textContent = "Please enter a positive number of minutes.";
        taskMinutes.focus();
        return;
    }

    // Create list item
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    // Create task information section
    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";

    // Create task description
    const descriptionElement = document.createElement("p");
    descriptionElement.className = "task-description";
    descriptionElement.textContent = description;

    // Create duration
    const durationElement = document.createElement("p");
    durationElement.className = "task-duration";
    durationElement.textContent =
        `Estimated time: ${minutes} minutes`;

    // Create Complete button
    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.className = "complete-btn";
    completeButton.textContent = "Complete";

    // Put information inside task info
    taskInfo.appendChild(descriptionElement);
    taskInfo.appendChild(durationElement);

    // Put task info and button inside list item
    listItem.appendChild(taskInfo);
    listItem.appendChild(completeButton);

    // Add task to the list
    taskList.appendChild(listItem);

    // Hide empty message
    emptyMessage.hidden = true;

    // Complete button functionality
    completeButton.addEventListener("click", function () {

        if (listItem.classList.contains("completed")) {
            return;
        }

        listItem.classList.add("completed");
        completeButton.textContent = "Completed";
        completeButton.disabled = true;

        completedTasks += 1;

        taskCount.textContent =
            `Completed: ${completedTasks}`;
    });

    // Clear form
    taskForm.reset();

    // Focus on task description
    taskDescription.focus();
});