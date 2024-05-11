document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting normally

      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;

      // Load JSON file containing user data
      fetch("/ecom/data/users.json")
        .then((response) => {
          if (!response.ok) {
            // Check if the response is successful
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse response into JSON format
        })
        .then((users) => {
          var authenticatedUser = users.find(
            (user) => user.username === username && user.password === password
          );
          if (authenticatedUser) {
            alert("Login successful!");

            // Set session storage variable indicating user is logged in
            sessionStorage.setItem("isLoggedIn", true);

            switch (authenticatedUser.role) {
              case "seller":
                sessionStorage.setItem("user", "seller");
                window.location.href = "seller.html";
                break;
              case "customer":
                sessionStorage.setItem("user", username);
                window.location.href = "index.html";
                break;
              case "admin":
                sessionStorage.setItem("user", "admin");
                window.location.href = "admin.html";
                break;
            }
          } else {
            alert("Invalid username or password. Please try again."); // Display error message
          }
        })
        .catch((error) => {
          console.error("Error loading users:", error);
          alert("Error loading users. Please try again later.");
        });
    });
});