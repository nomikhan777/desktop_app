async function getEmployees() {
  const response = await fetch("http://localhost:8080/admin-employees");
  const employees = await response.json();
  console.log(employees);
  const tbody = document.getElementById("attendance__table__tbody");
  employees.forEach(async (employee) => {
    const tr = document.createElement("tr");
    const userData = await fetch(
      `http://localhost:8080/emp-day-record?emp_id=${
        employee.id
      }&currentDate=${getDateFormatted()}`
    );
    console.log(await userData.json());
    tr.innerHTML = `
            <td>${employee.name}</td>
            <td>${
              employee.isCheckedIn
                ? `<p style="color:green;">Already Checked In</p>`
                : `<button id="checkinBtn" onclick='checkin(${employee.id})'>Checkin</button>`
            }</td>
            <td>${
              employee.isCheckedOut
                ? `<p style="color:green;">Already Checked Out</p>`
                : `<button id="checkinBtn" onclick='checkout(${employee.id})'>Checkout</button>`
            }</td>
            `;
    tbody.appendChild(tr);
  });
}

async function checkin(id) {
  //get current date and time in  format yyyy-mm-dd hh:mm:ss "2023-05-21%2014:00:00"
  const formattedDate = getFormattedDate();
  const formattedDateOnly = getDateFormatted();
  console.log(formattedDate);
  const response = await fetch(
    `http://localhost:8080/add-employee-record?emp_id=${id}&currentDate=${formattedDateOnly}&checkin=${formattedDate}`
  );
  window.location.reload();
  console.log(await response.json());
}

async function checkout(id) {
  const formattedDate = getFormattedDate();
  const formattedDateOnly = getDateFormatted();
  console.log(formattedDate);
  const response = await fetch(
    `http://localhost:8080/update-checkout?emp_id=${id}&currentDate=${formattedDateOnly}&checkout=${formattedDate}`
  );
  window.location.reload();
  console.log(await response.json());
}

function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

function getDateFormatted() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
window.onload = () => {
  console.log("called");
  getEmployees();
};
