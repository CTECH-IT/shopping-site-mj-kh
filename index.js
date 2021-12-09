var cart = {};

window.addEventListener('load', () => {
    //deal with pre loaded items
    const items = document.querySelectorAll('galleryItem');
    const CARTMODAL = document.querySelector('cartmodal');
    const CARTITEMS = CARTMODAL.querySelector('items');
    const GALLERY = document.querySelector('gallery');

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

    /*
    functions
    */
    function seralizeGalleryItem(galleryElement) {
        var data = {};
        data.id = galleryElement.getAttribute('id');
        data.name = galleryElement.querySelector('is').innerHTML;
        data.description = galleryElement.querySelector('about').innerHTML;
        data.price = parseInt(
            galleryElement
            .querySelector('price')
            .innerText.replace(/[^\d]/g, '')
        );
        data.img = galleryElement.querySelector('img').getAttribute('src');
        data.quantity = parseInt(
            galleryElement
            .querySelector('div')
            .querySelector('div')
            .querySelector('input').value
        );
        return data;
    }

    function addToCart(galleryElement) {
        galleryElement.querySelector('button').style.display = 'none'; //hide add to cart button
        galleryElement.appendChild(createInCartButton(galleryElement)); // amount changer, remove from cart
        const data = seralizeGalleryItem(galleryElement); // get the data from this thing
        cart[data.id] = data;
        CARTMODAL.querySelector(
            'is'
        ).innerText = `Shopping Cart - ${Object.keys(cart).length} Items`;
        CARTMODAL.querySelector('information').querySelector(
            'price'
        ).innerText = `$${calculateTotal()}`;
        CARTITEMS.appendChild(createCartItem(data));
        popCart();
    }

    function removeFromCart(id) {
        delete cart[id]; // remove from cart object
        if (Object.keys(cart).length == 0) {
            unPopCart(); //hide cart if there are no items
        }
        //remove item from cart element
        const toRemove = CARTITEMS.querySelector(`[id=${id}]`);
        if (toRemove) toRemove.remove();
        //remove quantity selector from galleryItem
        const galleryItem = GALLERY.querySelector(`[id=${id}]`);
        galleryItem.querySelector('button').style.display = 'block';
        galleryItem.querySelector('div').remove();
    }

    function createInCartButton(galleryElement) {
        const div = document.createElement('div');
        const amountControls = document.createElement('div');

        const removeFromCartElement = document.createElement('button');
        removeFromCartElement.innerText = 'Remove';
        removeFromCartElement.addEventListener('click', () => {
            removeFromCart(galleryElement.getAttribute('id'));
        });

        const left = document.createElement('button');
        left.innerText = '-';
        const amount = document.createElement('input');
        amount.value = 1;
        const right = document.createElement('button');
        right.innerText = '+';
        const id = galleryElement.getAttribute('id');
        left.addEventListener('click', () => {
            updateItemQuantity(id, Number(amount.value) - 1);
        });
        right.addEventListener('click', () => {
            updateItemQuantity(id, Number(amount.value) + 1);
        });

        amountControls.appendChild(left);
        amountControls.appendChild(amount);
        amountControls.appendChild(right);
        div.appendChild(removeFromCartElement);
        div.appendChild(amountControls);
        return div;
    }

    function createCartItem({ id, name, price, quantity, img }) {
        const item = document.createElement('cartitem');
        item.setAttribute('id', id);
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', img);

        item.appendChild(imgElement);

        const namePrice = document.createElement('nameprice');
        const is = document.createElement('is');
        is.innerText = name;
        const priceElement = document.createElement('price');
        if (quantity == 1) {
            priceElement.innerText = `$${price * quantity}`;
        } else {
            priceElement.innerText = `$${price * quantity} ($${price} each)`;
        }

        namePrice.appendChild(is);
        namePrice.appendChild(priceElement);
        item.appendChild(namePrice);

        const quantityElement = document.createElement('quantity');
        const left = document.createElement('button');
        left.innerText = '-';
        const amount = document.createElement('input');
        amount.value = 1;
        const right = document.createElement('button');
        right.innerText = '+';
        left.addEventListener('click', () => {
            updateItemQuantity(id, Number(amount.value) - 1);
        });
        right.addEventListener('click', () => {
            updateItemQuantity(id, Number(amount.value) + 1);
        });

        quantityElement.appendChild(left);
        quantityElement.appendChild(amount);
        quantityElement.appendChild(right);
        item.appendChild(quantityElement);

        return item;
    }

    function updateItemQuantity(id, quantity) {
        const displays = document.querySelectorAll(`[id=${id}]`);
        for (display of displays) {
            const input = display.getElementsByTagName('input')[0]; //lol
            input.value = quantity;
        }
    }

    function popCart() {
        if (CARTMODAL.style.display != 'flex') {
            CARTMODAL.style.display = 'flex';
        }
    }

    function unPopCart() {
        CARTMODAL.style.display = 'none';
    }

    function calculateTotal() {
        var total = 0;
        for (item of Object.values(cart)) {
            total += item.price * item.quantity;
        }
        return total;
    }

    function checkOut() {
        // ONLY SEND IDS AND AMOUNTS TO THE SERVER, CALCULATE COST, ETC ON SERVER
    }
});