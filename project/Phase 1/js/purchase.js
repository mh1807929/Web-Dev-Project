document.addEventListener("DOMContentLoaded", function() {

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
            })
            .catch(error => {
                console.error("Error fetching balance:", error);
            });
        } else {
        // User is not logged in, hide the balance button
        document.getElementById("balance-btn").hidden = true;
        }
        // Fetch items.json and display its contents
        fetch('/ecom/data/items.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Work with JSON data here
            const urlParams = new URLSearchParams(window.location.search);
            const itemId = parseInt(urlParams.get('item')); // Convert to integer for comparison
            const products = data.products;
        
            let itemFound = false;
            for (const product of products) {
                if (product.id === itemId) {
                    // Create list item HTML
                    const listItem = `
            <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
                <h6 class="my-0" id="productName">${product.name}</h6>
                <small class="text-muted">Quantity</small>
                <input type="number" class="form-control" id="quantity" value="1" required>
            </div>
            <span class="text-muted">QAR</span>
            <span id="price" class="text-muted">${product.price}</span>
            </li>
        `;
        
                    // Append the list item to the product list
                    document.getElementById('product-list').innerHTML = listItem;
                    itemFound = true;
                    break;
                }
            }
            if (!itemFound) {
                console.error('Item not found.');
            }
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });


        var form = document.querySelector('form.needs-validation');

        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                var user = sessionStorage.getItem('user');
                var firstName = document.getElementById('firstName').value;
                var lastName = document.getElementById('lastName').value;
                var productName = document.getElementById('productName').textContent;
                var price = parseFloat(document.getElementById('price').textContent);
                var address = document.getElementById('address').value;
                var quantity = parseInt(document.getElementById('quantity').value);
        
                // Fetch user's data from users.json
                fetch('/ecom/data/users.json')
                    .then(response => response.json())
                    .then(users => {
                        var currentUser = users.find(u => u.username === user);
                        if (currentUser) {
                            var totalCost = price * quantity;
                            if (totalCost > currentUser.balance) {
                                alert('Insufficient balance. Please add funds to your account.');
                            } else {
                                var data = {
                                    user: user,
                                    firstName: firstName,
                                    lastName: lastName,
                                    productName: productName,
                                    price: price,
                                    address: address,
                                    quantity: quantity,
                                    totalCost: totalCost
                                };
        
                                // Send data to PHP script for processing
                                var xhr = new XMLHttpRequest();
                                xhr.open('POST', '/ecom/php/history.php', true);
                                xhr.setRequestHeader('Content-Type', 'application/json');
                                xhr.onreadystatechange = function() {
                                    if (xhr.readyState == 4 && xhr.status == 200) {
                                        console.log(xhr.responseText);
                                        alert("Payment successful!");
                                        window.location.href = "index.html";
                                    }
                                };
                                xhr.send(JSON.stringify(data));
                            }
                        } else {
                            alert('User not found.');
                        }
                    })
                    .catch(error => console.error('Error fetching user data:', error));
            }
            form.classList.add('was-validated');
        }, false);
        


});
