var itemData = {};
var orders = {};
window.addEventListener('load', async() => {});

function createOrder({ id, items }) {
    const order = document.createElement('order');
    order.setAttribute('id', id);
    var price = 0;
    var itemArray = [];
    for (item of items) {
        const itemData = itemData[item.id];
        const name = itemData.name;
        const amount = itemData.quantity;
        if (amount == 1) {
            itemArray.push(`${name}`);
        } else {
            itemArray.push(`${name} x${amount}`);
        }
    }
    const itemsElement = document.createElement('items');
    itemsElement.innerText = itemArray.join(' , ');
    order.appendChild(itemsElement);

    return order;
}