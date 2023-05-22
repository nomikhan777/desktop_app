window.onload = () => {
  if (!localStorage.getItem("isUserLoggedIn")) {
    logoutUser();
  }
};

document.getElementById("logoutUserBtn").addEventListener("click", (e) => {
  logoutUser();
});

function logoutUser() {
  localStorage.removeItem("isUserLoggedIn");
  localStorage.removeItem("username");
  document.getElementById("loginNavigator").click();
}
async function getEmployees() {
  const response = await fetch("http://localhost:8080/employees");
  const employees = await response.json();
  console.log(employees);
  const tbody = document.getElementById("attendance__table__tbody");
  employees.forEach((employee) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
              <td>${employee.id}</td>
              <td>${employee.name}</td>
              <td>${employee.division}</td>
              <td>${employee.division}</td>
              <td>${employee.division}</td>
              <td>${employee.division}</td>
              <td>${employee.target_hrs}</td>
              
              `;
    tbody.appendChild(tr);
  });
}
window.onload = () => {
  getEmployees();
};
