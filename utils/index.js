async function getEmployees() {
  const response = await fetch("http://localhost:8080/employees");
  const employees = await response.json();
  const tbody = document.getElementById("attendance__table__tbody");
  employees.forEach((employee) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${employee.name}</td>
            <td>${`<button id="checkinBtn" onclick='checkin(${employee.id})'>Checkin</button>`}</td>
            <td><button id="checkinBtn" onclick='checkout(${
              employee.id
            })'>Checkout</button></td>
            `;
    tbody.appendChild(tr);
  });
}

async function checkin(id) {
  //get current date and time in  format yyyy-mm-dd hh:mm:ss "2023-05-21%2014:00:00"
  const formattedDate = getFormattedDate();
  console.log(formattedDate);
  const response = await fetch(
    `http://localhost:8080/update-checkin?id=${id}&checkin="${formattedDate}"`
  );
  console.log(await response.json());
}
async function checkout(id) {
  const formattedDate = getFormattedDate();
  console.log(formattedDate);
  const response = await fetch(
    `http://localhost:8080/update-checkout?id=${id}&checkout="${formattedDate}"`
  );
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
window.onload = () => {
  console.log("called");
  getEmployees();
};
