<?php
$data = json_decode(file_get_contents('php://input'), true);

// Validate and sanitize data if needed

$userFile = '../data/users.json';
$historyFile = '../data/history.json';
$historyData = [];

if (file_exists($historyFile)) {
    $historyData = json_decode(file_get_contents($historyFile), true);
}

$historyData[] = $data;

// Update user's balance
$users = json_decode(file_get_contents($userFile), true);
$userIndex = array_search($data['user'], array_column($users, 'username'));

if ($userIndex !== false) {
    $users[$userIndex]['balance'] -= $data['totalCost'];
} else {
    echo "User not found";
    exit;
}

// Save updated user data
file_put_contents($userFile, json_encode($users, JSON_PRETTY_PRINT));

// Save transaction data
file_put_contents($historyFile, json_encode($historyData, JSON_PRETTY_PRINT));

echo "Data saved successfully";
?>
