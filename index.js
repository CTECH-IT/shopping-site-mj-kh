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
    console.log(galleryElement);
    var data = {};
    data.id = galleryElement.getAttribute('id');
    data.name = galleryElement.querySelector('is').innerHTML;
    data.description = galleryElement.querySelector('about').innerHTML;
    data.price = galleryElement.querySelector('price').innerHTML;
    return data;
}

function addToCart(galleryElement) {
    const data = seralizeGalleryItem(galleryElement);
    galleryElement.querySelector('button').style.display = 'none';
}

function createInCartButton() {
    const div = document.createElement('div');
    const left = document.createElement('button');
    const amount = document.createElement('input');
    amount.setAttribute('type', 'number');
    const right = document.createElement('button');

    div.appendChild(left);
    div.appendChild(amount);
    div.appendChild(right);
    return div;
}

function checkOut() {
    // ONLY SEND IDS AND AMOUNTS TO THE SERVER, CALCULATE COST, ETC ON SERVER
}
