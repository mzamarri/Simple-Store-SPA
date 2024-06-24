// Description: This file contains the list of products that are available in the store. Will evetually be fetched from a database.

function createItem(id, name, price, image, description) {
    return {
        catalogId: id,
        name: name,
        price: price,
        imageSrc: image,
        description: description
    }
}

const items = (() => {
    let tempItems = [];
    for (let i = 1; i <= 15; i++) {
        tempItems.push(createItem(`${i}`, `Item ${i}`, i*10, "#", `This is item ${i}`));
    }
    return tempItems;
})()


exports = module.exports = items;