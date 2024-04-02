async function fetchData() {
  try {
    const response = await fetch('/ecom/data/items.json');
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

function displayProducts(products) {
  const productContainer = document.getElementById('product-container');

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('col', 'mb-5');
    productCard.innerHTML = `
        <div class="card h-100">
          <img class="card-img-top" src="${product.image}" alt="..." />
          <div class="card-body p-4">
            <div class="text-center">
              <h5 class="fw-bolder">${product.name}</h5>
              QAR ${product.price}
            </div>
          </div>
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><button class="btn btn-outline-dark mt-auto buy-now-btn" data-link="purchase.html?item=${product.id}">Buy Now</button></div>
          </div>
        </div>
      `;
    productContainer.appendChild(productCard);
  });

  // Check if the user is logged in
  if (sessionStorage.getItem("isLoggedIn") === "true") {
    // Fetch user's balance
    fetch("/ecom/data/users.json")
      .then(response => response.json())
      .then(users => {
        // Assuming the user is the first one in the JSON file (customer1)
        const user = users[0];
        const balance = user.balance;

        // Update the HTML to display the balance
        document.getElementById("balance-display").innerHTML = "Balance: QAR " + balance;
        document.getElementById("login-btn").innerHTML = "Log Out";
      })
      .catch(error => {
        console.error("Error fetching balance:", error);
      });
  } else {
    // User is not logged in, hide the balance button
    document.getElementById("balance-btn").hidden = true;
  }

  // Add event listener to the login button
  document.getElementById("login-btn").addEventListener("click", function () {
    // Set isLoggedIn to false
    sessionStorage.setItem("isLoggedIn", "false");
    // Redirect to login.html
    window.location.href = "login.html";
  });

  // Add event listener to each Buy Now button
  const buyNowButtons = document.querySelectorAll('.buy-now-btn');
  buyNowButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Check if user is logged in
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');
      if (!isLoggedIn || isLoggedIn !== 'true') {
        alert('Please Login First');
      } else {
        // Redirect user to product's action link
        const link = this.getAttribute('data-link');
        window.location.href = link;
      }
    });
  });
}


// Load data and display products when the page loads
window.onload = async function () {
  const products = await fetchData();
  displayProducts(products);
};


function filterProducts() {
  var input, filter, products, product, title, i;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  products = document.getElementById("product-container").getElementsByClassName("col");

  for (i = 0; i < products.length; i++) {
    product = products[i];
    title = product.querySelector(".fw-bolder");
    if (title.innerText.toUpperCase().indexOf(filter) > -1) {
      product.style.display = "";
    } else {
      product.style.display = "none";
    }
  }
}