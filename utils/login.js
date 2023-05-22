async function loginUser(e) {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "username=" +
      encodeURIComponent(username) +
      "&password=" +
      encodeURIComponent(password),
  });
  const data = await response.json();
  if (data.status === 201) {
    localStorage.setItem("isUserLoggedIn", true);
    localStorage.setItem("username", username);
    document.getElementById("adminDashboardNavigator").click();
  } else if (data.status === 401) {
    document.getElementById("loginError").innerHTML =
      "Invalid username or password";
  }
}

document.getElementById("submitBtn").addEventListener("click", (e) => {
  loginUser(e);
});

window.onload = () => {
  if (localStorage.getItem("isUserLoggedIn")) {
    document.getElementById("adminDashboardNavigator").click();
  }
};
