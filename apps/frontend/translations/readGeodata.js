const fs = require('fs');
const path = require('path');

// Path to the JSON file
// const filePath = path.join(__dirname, './geodata/districts.json');
const filePath = path.join(__dirname, './geodata/communes.json');

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);

    return;
  }

  try {
    // Parse the JSON data
    const adminAreas = JSON.parse(data);

    // Create an object to store the adminAreas
    const adminAreaList = {};

    // Iterate over the adminAreas and add them to the object
    adminAreas.forEach(adminArea => {
      adminAreaList[adminArea.id] = adminArea.name_km;
    });

    // Convert the object to an array of [id, name_en] pairs and sort by ID numerically
    const sortedAdminAreaList = Object.entries(adminAreaList).sort(
      (a, b) => parseInt(a[0], 10) - parseInt(b[0], 10),
    );

    // Output the sorted adminArea list
    sortedAdminAreaList.forEach(([id, name]) => {
      console.log(`"${id}": "${name}",`);
    });
  } catch (parsErr) {
    console.error('Error parsing JSON:', parsErr);
  }
});
