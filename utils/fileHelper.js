const fs = require('fs');

const getProductsData = (path) => {
    if (!fs.existsSync(path)) return [];
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
};

const saveProductsData = (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

module.exports = { getProductsData, saveProductsData };
