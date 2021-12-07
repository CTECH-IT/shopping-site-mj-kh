var cart = {};

window.addEventListener('load', () => {
    //deal with pre loaded items
    const items = document.querySelectorAll('galleryItem');

    for (item of items) {
        const addToCartButton = item.querySelector('button');
        addToCartButton.addEventListener('click', event => {
            const button = event.currentTarget;
            const galleryElement = button.parentElement;
            addToCart(galleryElement);
        });
    }

    //fetch server items
    //fetch blah blah blah
    //for each item
    //new gallery item()
    //register events
});

function seralizeGalleryItem(galleryElement) {
    var data = {};
    data.id = galleryElement.getAttribute('id');
    data.name = galleryElement.querySelector('is').innerHTML;
    data.description = galleryElement.querySelector('about').innerHTML;
    data.price = galleryElement.querySelector('price').innerHTML;
    data.quantity = galleryElement
        .querySelector('div')
        .querySelector('div')
        .querySelector('input').value;
    return data;
}

function addToCart(galleryElement) {
    galleryElement.querySelector('button').style.display = 'none'; //hide add to cart button
    galleryElement.appendChild(createInCartButton()); // amount changer, remove from cart
    const data = seralizeGalleryItem(galleryElement); // get the data from this thing
    cart[data.id] = data;
    popCart();
}

function createInCartButton() {
    const div = document.createElement('div');
    const amountControls = document.createElement('div');

    const removeFromCart = document.createElement('button');
    removeFromCart.innerText = 'Discard';
    removeFromCart.addEventListener('click', () => {
        div.parentElement.querySelector('button').style.display = 'block';
        div.remove();
        //TODO: remove from cart
    });

    const left = document.createElement('button');
    left.innerText = '-';
    const amount = document.createElement('input');
    amount.value = 1;
    const right = document.createElement('button');
    right.innerText = '+';
    left.addEventListener('click', () => {
        amount.value--;
        if (amount.value < 1) {
            div.parentElement.querySelector('button').style.display = 'block';
            div.remove();
            //TODO: remove from cart
        }
    });
    right.addEventListener('click', () => {
        amount.value++;
    });

    amountControls.appendChild(left);
    amountControls.appendChild(amount);
    amountControls.appendChild(right);
    div.appendChild(removeFromCart);
    div.appendChild(amountControls);
    return div;
}

const cartMODAL = document.querySelector('cartmodal');

function popCart() {
    if (cartMODAL.style.display != 'flex') {
        cartMODAL.style.display = 'flex';
    }
}

function checkOut() {
    // ONLY SEND IDS AND AMOUNTS TO THE SERVER, CALCULATE COST, ETC ON SERVER
}
