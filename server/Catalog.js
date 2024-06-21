const queryDatabase = require('./queryDatabase.js');

exports = module.exports = class {
    async addToCatalog(itemList) {
        const query = `INSERT INTO catalog (catalog_id, name, price, image_src, description)
        VALUES ${itemList.map(item => {
            return `('${item.catalogId}', '${item.name}', ${item.price}, '${item.imageSrc}', '${item.description}')`
        }).join(",\n")}`
        
        await queryDatabase(query)
        .then(console.log("Successfully added items to catalog"))
        .catch(err => console.error(err.stack));
    }

    async removeFromCatalog(itemList) {
        const query = `DELETE FROM catalog WHERE catalog_id IN (${itemList.map(item => `'${item.catalogId}'`).join(", ")})`
        await queryDatabase(query)
        .then(console.log("Successfully removed items from catalog"))
        .catch(err => console.error(err.stack));
    }

    async updateCatalog(itemList) {
        const query = `UPDATE catalog SET name = '${itemList.name}', price = ${itemList.price}, image_src = '${itemList.imageSrc}', description = '${itemList.description}'
        WHERE catalog_id IN (${itemList.map(item => `'${item.catalogId}'`).join(", ")})`
        await queryDatabase(query)
        .then(console.log("Successfully updated items in catalog"))
        .catch(err => console.error(err.stack)); 

    }

    async getCatalog(offset=0) {
        const query = `SELECT * FROM catalog LIMIT 500 OFFSET ${500 * offset}`
        return await queryDatabase(query)
        .then(res => {
            console.log("Successfully fetched catalog");
            return res.rows;
        })
        .catch(err => console.error(err.stack));
    }
}