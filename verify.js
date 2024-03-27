document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Load JSON file containing user data
    fetch("users.json")
      .then((response) => response.json())
      .then((users) => {
        var authenticatedUser = users.find(
          (user) => user.username === username && user.password === password
        );
        if (authenticatedUser) {
          alert("Login successful!");
          // Redirect or do further actions here after successful login
        } else {
          alert("Invalid username or password. Please try again."); // Display error message
        }
      })
      .catch((error) => {
        console.error("Error loading users:", error);
        alert("Error loading users. Please try again later.");
      });
  });
