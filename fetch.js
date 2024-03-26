fetch('http://localhost:3000/items') // Adjust URL to where your items.json is served from
  .then(response => response.json())
  .then(items => {
    console.log(items); // Process your items here
  })
  .catch(error => console.error('Error fetching items:', error));
