var itemData = {};
var orders = {};

/*
example order:
{
    id: '6969',
    items: [{
        id: 'beet1',
        quantity: 5
    }]
}
*/

window.addEventListener('load', async() => {
    let res = await fetch('/galleryItems.json');
    itemData = await res.json();
    res = await fetch('/api/get');
    orders = await res.json();

    const orderContainer = document.querySelector('orders');

    const orderObjects = Object.values(orders);
    if (orderObjects.length == 0) {
        orderContainer.innerText = 'There are no orders to review at this time.';
    } else {
        for (order of orderObjects) {
            orderContainer.append(createOrder(order));
        }
    }
});

function createOrder({ id, items }) {
    const order = document.createElement('order');
    order.setAttribute('id', id);
    var cost = 0;
    var itemArray = [];
    for (item of items) {
        let currentItemData = itemData[item.id];
        const name = currentItemData.name;
        const amount = item.quantity;
        const price = currentItemData.price;
        const itemCost = amount * price;
        cost += itemCost;
        itemArray.push(`${name} x${amount} ($${itemCost} [$${price} each])`);
    }
    const itemsElement = document.createElement('items');
    itemsElement.innerText = itemArray.join(', ');
    order.appendChild(itemsElement);
    const div = document.createElement('div');
    order.appendChild(div);
    const priceElement = document.createElement('price');
    priceElement.innerText = `$${cost}`;
    div.appendChild(priceElement);
    const buttonHolder = document.createElement('div');
    div.appendChild(buttonHolder);
    const reject = document.createElement('button');
    reject.innerText = 'Reject';
    reject.addEventListener('click', () => {
        rejectOrder(id);
    });
    buttonHolder.appendChild(reject);
    const fuilfill = document.createElement('button');
    fuilfill.innerText = 'Fulfill';
    fuilfill.addEventListener('click', () => {
        fuilfillOrder(id);
    });
    buttonHolder.appendChild(fuilfill);

    return order;
}

function rejectOrder(id) {
    removeOrder(id);
}

function fuilfillOrder(id) {
    removeOrder(id);
}

async function removeOrder(id) {
    document.getElementById(id).remove(); // remove from html

    const res = await fetch('/api/removeID?id=' + id, {
        method: 'POST'
    });
    console.log(await res.text());
}