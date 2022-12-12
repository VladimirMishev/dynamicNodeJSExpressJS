const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');

function getFileData() {
    const fileData = fs.readFileSync(filePath);

    const arrayFileData = JSON.parse(fileData);

    return arrayFileData;
}

function addNewList(restaurants) {
    fs.writeFileSync(filePath, JSON.stringify(restaurants));
}

module.exports = {
    getFileData: getFileData,
    addNewList: addNewList
}