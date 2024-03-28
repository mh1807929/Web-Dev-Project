document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("sellerloginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting normally

      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;
      const msg = document.getElementById("login-msg");

      // Load JSON file containing user data
      fetch("users.json")
        .then((response) => {
          if (!response.ok) {
            // Check if the response is successful
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse response into JSON format
        })
        .then((users) => {
          var authenticatedUser = users.find(
            (user) =>
              user.username === username &&
              user.password === password &&
              user.role === "seller"
          );
          if (authenticatedUser) {
            alert("Login successful!");
            msg.style.display = "block";
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
