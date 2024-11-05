const nameInput = document.getElementById("name");
const professionInput = document.getElementById("profession");
const ageInput = document.getElementById("age");
const addButton = document.getElementById("add-employee");
const messageEl = document.querySelector(".message");
const employeeListEl = document.getElementById("employees");

let employees = [];

addButton.addEventListener("click", addEmployee);

function addEmployee() {
  const name = nameInput.value.trim();
  const profession = professionInput.value.trim();
  const age = parseInt(ageInput.value.trim());

  // Clear previous message
  messageEl.textContent = "";

  // Check for empty fields
  if (!name || !profession || isNaN(age)) {
    messageEl.textContent = "Please fill in all fields correctly.";
    messageEl.classList.add("error");
    return;
  }

  // Generate unique ID
  const id = employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;

  const newEmployee = {
    id,
    name,
    profession,
    age,
  };

  employees.push(newEmployee);

  // Clear input fields
  nameInput.value = "";
  professionInput.value = "";
  ageInput.value = "";

  messageEl.textContent = "Employee added successfully!";
  messageEl.classList.add("success");

  renderEmployees();
}

function renderEmployees() {
  employeeListEl.innerHTML = ""; // Clear previous list

  if (employees.length === 0) {
    employeeListEl.textContent = "No employees added yet.";
    return;
  }

  employees.forEach((employee) => {
    const employeeEl = document.createElement("div");
    employeeEl.classList.add("employee");
    employeeEl.innerHTML = `
      <span>${employee.name} - ${employee.profession} (${employee.age})</span>
      <button data-id="${employee.id}">Delete</button>
    `;

    employeeEl.querySelector("button").addEventListener("click", () => {
      deleteEmployee(employee.id);
    });

    employeeListEl.appendChild(employeeEl);
  });
}

function deleteEmployee(id) {
  employees = employees.filter((employee) => employee.id !== id);
  renderEmployees();
}
