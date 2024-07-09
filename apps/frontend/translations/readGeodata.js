const fs = require('fs');
const path = require('path');

// Path to the JSON file
const filePath = path.join(__dirname, './geodata/districts.json');

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    // Parse the JSON data
    const communes = JSON.parse(data);
    communes.sort((a, b) => parseInt(a.id, 10) > parseInt(b.id, 10));

    // Create an object to store the communes
    const communeList = {};

    // Iterate over the communes and add them to the object
    communes.forEach(commune => {
      communeList[commune.id] = commune.name_en;
    });

    // Convert the object to an array of [id, name_en] pairs and sort by ID numerically
    const sortedCommuneList = Object.entries(communeList).sort(
      (a, b) => parseInt(a[0], 10) - parseInt(b[0], 10),
    );

    // Output the sorted commune list
    sortedCommuneList.forEach(([id, name]) => {
      console.log(`"${id}": "${name}",`);
    });
  } catch (err) {
    console.error('Error parsing JSON:', err);
  }
});
