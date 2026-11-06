const form = document.getElementById("assignment-form");
const assignmentList = document.getElementById("assignment-list");
const emptyMessage = document.getElementById("empty-message");
const statusFilter = document.getElementById("status-filter");

const totalCount = document.getElementById("total-count");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");

const sortOrder = document.getElementById("sort-order");

sortOrder.addEventListener("change", function () {
  renderAssignments();
});

statusFilter.addEventListener("change", function () {
  renderAssignments();
});

const STORAGE_KEY = "student-assignments";

// Load saved assignments, or start with an empty array.
let assignments = [];

try {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved !== null) {
    const parsed = JSON.parse(saved);

    // Check that the saved data has the structure we expect.
    if (
      Array.isArray(parsed) &&
      parsed.every(
        (assignment) =>
          assignment !== null &&
          typeof assignment === "object" &&
          typeof assignment.id === "string" &&
          typeof assignment.title === "string" &&
          typeof assignment.subject === "string" &&
          typeof assignment.deadline === "string" &&
          typeof assignment.completed === "boolean"
      )
    ) {
      assignments = parsed;
    }
  }
} catch (error) {
  console.error("Could not load saved assignments:", error);
}

// Save the current array in the browser.
function saveAssignments() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
  } catch (error) {
    console.error("Could not save assignments:", error);
    alert("Your changes could not be saved. They may be lost on refresh.");
  }
}

// Display all assignments from the array.
function renderAssignments() {
  assignmentList.replaceChildren();

  const total = assignments.length;

const completed = assignments.filter(function (assignment) {
  return assignment.completed;
}).length;

const pending = total - completed;

totalCount.textContent = total;
pendingCount.textContent = pending;
completedCount.textContent = completed;


  const selectedStatus = statusFilter.value;

  const visibleAssignments = assignments.filter(function (assignment) {
    if (selectedStatus === "pending") {
      return !assignment.completed;
    }

    if (selectedStatus === "completed") {
      return assignment.completed;
    }

    return true;
  });

  emptyMessage.hidden = visibleAssignments.length > 0;

  if (assignments.length === 0) {
    emptyMessage.textContent =
      "No assignments yet. Add your first one above!";
  } else {
    emptyMessage.textContent =
      "No assignments match this filter.";
  }


visibleAssignments.sort(function (a, b) {
  if (sortOrder.value === "latest") {
    return b.deadline.localeCompare(a.deadline);
  }

  return a.deadline.localeCompare(b.deadline);
});

  visibleAssignments.forEach(function (assignment) {
    const item = document.createElement("li");
    item.classList.add("assignment");
    item.classList.toggle("completed", assignment.completed);

    const heading = document.createElement("h3");
    heading.textContent = assignment.title;

    const details = document.createElement("p");
    details.textContent =
      `${assignment.subject} — Due: ${assignment.deadline}`;

      // Get today's date at midnight in your local time.
const today = new Date();
today.setHours(0, 0, 0, 0);

// Read the deadline as a local date.
const deadlineDate = new Date(`${assignment.deadline}T00:00:00`);

const isOverdue =
  !assignment.completed && deadlineDate < today;

if (isOverdue) {
  item.classList.add("overdue");
  details.textContent += " — Overdue";
}


    const actions = document.createElement("div");
    actions.classList.add("assignment-actions");

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.textContent = assignment.completed
      ? "Mark pending"
      : "Mark completed";

    completeButton.setAttribute(
      "aria-pressed",
      String(assignment.completed)
    );

    completeButton.addEventListener("click", function () {
      assignment.completed = !assignment.completed;

      saveAssignments();
      renderAssignments();
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", function () {
      assignments = assignments.filter(function (currentAssignment) {
        return currentAssignment.id !== assignment.id;
      });

      saveAssignments();
      renderAssignments();
    });

    actions.append(completeButton, deleteButton);
    item.append(heading, details, actions);
    assignmentList.appendChild(item);
  });
}

// Add a new assignment.
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const deadline = document.getElementById("deadline").value;

  if (!title || !subject || !deadline) {
    return;
  }

  const newAssignment = {
    id: crypto.randomUUID(),
    title: title,
    subject: subject,
    deadline: deadline,
    completed: false
  };

  assignments.push(newAssignment);

  saveAssignments();
  renderAssignments();

  form.reset();
  document.getElementById("title").focus();
});

// Show saved assignments when the page first opens.
renderAssignments();