<?php

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect product ID sent via POST request
    $productId = $_POST['id'];

    // Read existing JSON data
    $productsData = json_decode(file_get_contents('../data/items.json'), true);

    // Search for the product by ID and remove it
    foreach ($productsData['products'] as $key => $product) {
        if ($product['id'] == $productId) {
            unset($productsData['products'][$key]);
            // Rewrite the updated JSON data back to the file
            file_put_contents('../data/items.json', json_encode($productsData, JSON_PRETTY_PRINT));
            // Send success response
            $response = array("success" => true);
            echo json_encode($response);
            exit; // Exit after deletion
        }
    }

    // If product with the given ID was not found
    $response = array("success" => false);
    echo json_encode($response);
} else {
    // If the request method is not POST
    $response = array("success" => false);
    echo json_encode($response);
}

?>
