$(document).ready(function() {
    // Function to load products
    function loadProducts() {
        $.getJSON('/ecom/data/items.json', function(data) {
            var productList = $('#product-list');
            productList.empty();
            $.each(data.products, function(index, product) {
                var row = '<tr>' +
                            '<td>' + product.id + '</td>' +                
                            '<td><img src="' + product.image + '" class="product-image" alt="Product Image"></td>' +
                            '<td>' + product.name + '</td>' +
                            '<td>' + product.quantity + '</td>' +
                            '<td>' + product.price + '</td>' +
                            '<td><button class="delete-product" data-id="' + product.id + '">Delete</button></td>' +
                          '</tr>';
                productList.append(row);
            });
        });

        $(document).ready(function() {
            // Fetch JSON data using AJAX
            $.getJSON('/ecom/data/history.json', function(data) {
                var soldList = $('#sold-list');
                soldList.empty();
                $.each(data, function(index, purchase) {
                    var row = '<tr>' +
                                '<td>' + purchase.user + '</td>' +                
                                '<td>' + purchase.firstName + '</td>' +
                                '<td>' + purchase.address + '</td>' +
                                '<td>' + purchase.productName + '</td>' +
                                '<td>QAR ' + purchase.price + '</td>' +
                                '<td>' + purchase.quantity + '</td>' +
                                '<td>QAR ' + purchase.totalCost + '</td>' +
                            '</tr>';
                    soldList.append(row);
                });
            });
        });

        $(document).ready(function() {
            // Fetch user value from session storage
            var currentUser = sessionStorage.getItem('user');
        
            // Fetch JSON data using AJAX
            $.getJSON('/ecom/data/history.json', function(data) {
                var boughtList = $('#bought-list');
                boughtList.empty();
        
                // Filter data based on currentUser
                var filteredData = data.filter(function(purchase) {
                    return purchase.user === currentUser;
                });
        
                // Iterate over filtered data
                $.each(filteredData, function(index, purchase) {
                    var row = '<tr>' +
                                  '<td>' + purchase.productName + '</td>' +
                                  '<td>' + purchase.address + '</td>' +
                                  '<td>QAR ' + purchase.price + '</td>' +
                                  '<td>' + purchase.quantity + '</td>' +
                                  '<td>QAR ' + purchase.totalCost + '</td>' +
                              '</tr>';
                    boughtList.append(row);
                });
            });
        });        
        
    }

    // Initial load
    loadProducts();


// Add product
$('#add-product-form').submit(function(event) {
    event.preventDefault();
    var name = $('#name').val();
    var quantity = $('#quantity').val(); // corrected variable name
    var image = $('#image').val();
    var price = $('#price').val();
    $.ajax({
        url: '/ecom/php/add_product.php',
        type: 'POST',
        dataType: 'json',
        data: {
            name: name,
            quantity: quantity,
            image: image,
            price: price
        },
        success: function(response) {
            console.log('Add product success:', response);
            if (response.success) {
                loadProducts();
                $('#name').val('');
                $('#quantity').val('');
                $('#image').val('');
                $('#price').val('');
            } else {
                alert('Failed to add product');
            }
        },
        error: function() {
            console.error('Add product request failed');
            alert('Failed to add product');
        }
    });
});

// Delete product
$('#product-list').on('click', '.delete-product', function(event) {
    event.preventDefault();
    var productId = $(this).data('id');
    $.ajax({
        url: '/ecom/php/delete_product.php',
        type: 'POST',
        dataType: 'json',
        data: {
            id: productId
        },
        success: function(response) {
            console.log('Delete product success:', response);
            if (response.success) {
                loadProducts();
            } else {
                alert('Failed to delete product');
            }
        },
        error: function() {
            console.error('Delete product request failed');
            alert('Failed to delete product');
        }
    });
});


});