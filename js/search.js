document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("search-btn").addEventListener("click", function () {
    var searchTerm = document
      .getElementById("search-input")
      .value.toLowerCase();
    var show = document.getElementById("search-results");
    fetch("items.json")
      .then((response) => {
        if (!response.ok) {
          // Check if the response is successful
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse response into JSON format
      })
      .then((items) => {
        var authenticatedItem = items.find((item) => item.name === searchTerm);
        if (authenticatedItem) {
          const result = document.createElement("div");
          result.classList.add("item");
          const image = document.createElement("img");
          image.src = `${authenticatedItem.image}`;
          const h3 = document.createElement("h3");
          h3.innerHTML = `${authenticatedItem.name}`;
          const p = document.createElement("p");
          p.innerText = `${authenticatedItem.price}`;
          result.appendChild(image);
          result.append(h3);
          result.append(p);

          show.appendChild(result);
          //   <img src="item1.jpg" alt="Item 1">
          // <h3>Item 1</h3>
          // <p>$19.99</p>
        } else {
          alert("Item not found. Please try again."); // Display error message
        }
      })
      .catch((error) => {
        console.error("Error loading users:", error);
        alert("Error loading users. Please try again later.");
      });
  });
});
