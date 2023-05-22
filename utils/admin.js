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
  const response = await fetch("http://localhost:8080/admin-employees");
  const employees = await response.json();
  console.log(employees);
  const tbody = document.getElementById("attendance__table__tbody");
  employees.forEach((employee) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
              <td>${employee.id}</td>
              <td>${employee.name}</td>
              <td>${employee.division}</td>
              <td>${employee.day_time}</td>
              <td>${employee.week_time}</td>
              <td>${employee.status == 0 ? "Incomplete" : "Completed"}</td>
              <td>${employee.target_hrs}</td>
              
              `;
    tbody.appendChild(tr);
  });
}

document.getElementById("addUserBtn").addEventListener("click", (e) => {
  console.log("add user btn clicked");
  const name = document.getElementById("name").value;
  const division = document.getElementById("division").value;
  addUser(name, division);
});

async function addUser(name, division) {
  const response = await fetch("http://localhost:8080/addEmployee", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "name=" +
      encodeURIComponent(name) +
      "&division=" +
      encodeURIComponent(division),
  });
  try {
    const message = await response.json();
    document.getElementById("error").innerHTML = message.message;
  } catch (error) {
    console.log(error);
    document.getElementById("error").innerHTML = "Some Error Occured!!";
  }
}

window.onload = () => {
  getEmployees();
};
