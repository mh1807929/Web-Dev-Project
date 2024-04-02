<?php

// Function to read JSON file
function readJsonFile($filename) {
    $jsonString = file_get_contents($filename);
    return json_decode($jsonString, true);
}

// Function to write JSON file
function writeJsonFile($filename, $data) {
    $jsonString = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents($filename, $jsonString);
}

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect data sent via POST request
    $name = $_POST['name'];
    $quantity = $_POST['quantity'];
    $image = $_POST['image'];
    $price = $_POST['price'];

    // Validate the received data (you may want to add more validation)
    if (!empty($name) && !empty($image) && !empty($quantity) && !empty($price)) {
        // Read existing JSON data
        $productsData = readJsonFile('../data/items.json');

        // Calculate the next product ID
        $nextProductId = 1; // Initialize ID to 1
        if (!empty($productsData['products'])) {
            // If products exist, find the maximum ID and increment it
            $maxId = max(array_column($productsData['products'], 'id'));
            $nextProductId = $maxId + 1;
        }

        // Create the new product
        $newProduct = array(
            'id' => $nextProductId,
            'name' => $name,
            'quantity' => $quantity,
            'image' => $image,
            'price' => $price
        );

        // Add the new product to the products array
        $productsData['products'][] = $newProduct;

        // Write the updated JSON data back to the file
        writeJsonFile('../data/items.json', $productsData);

        // Send success response
        $response = array("success" => true);
        echo json_encode($response);
    } else {
        // If any of the required fields are empty
        $response = array("success" => false);
        echo json_encode($response);
    }
} else {
    // If the request method is not POST
    $response = array("success" => false);
    echo json_encode($response);
}

?>
