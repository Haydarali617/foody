AOS.init();

function filterCards(category) {
    let cards = document.querySelectorAll('.card');
    let btn1 = document.querySelector('.extra-prod-btn1');
    let btn2 = document.querySelector('extra-prod-btn');
    let btn3 = document.querySelector('extra-prod-btn2');
    cards.forEach((card) => {
        if (category === 'all') {
            card.classList.remove('hide');
            setTimeout(() => card.classList.remove('hidden'));
        } else if (category === 'mobile') {
            if (card.classList.contains('mobile')) {
                card.classList.remove('hide');
                setTimeout(() => card.classList.remove('hidden'));
            } else {
                card.classList.add('hide');
                setTimeout(() => card.classList.add('hidden'));
            }
        } else if (category === 'web') {
            if (card.classList.contains('web')) {
                card.classList.remove('hide');
                setTimeout(() => card.classList.remove('hidden'));
            } else {
                card.classList.add('hide');
                setTimeout(() => card.classList.add('hidden'));
            }
        }
    });
    btn1.classList.remove('b3');
    btn2.classList.remove('b3');
    btn3.classList.remove('b3');

    // Faqat tanlangan kategoriya tugmasiga 'b3' qo‘shamiz
    if (category === 'all') {
        btn1.classList.add('b3');
    } else if (category === 'web') {
        btn2.classList.add('b3');
    } else if (category === 'mobile') {
        btn3.classList.add('b3');
    }
}

function addToCart(button) {
    const card = button.closest('.card');
    const title = card.querySelector('.product-card-title').innerText;
    const priceText = card
        .querySelector('.product-price')
        .childNodes[0].textContent.trim();
    const image = card.querySelector('img.product-img').src;

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Yangi mahsulot qo‘shamiz
    cartItems.push({ title, price: priceText, image, quantity: 1 });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Tugmani o‘zgartiramiz
    button.innerHTML = `<span><i class="fa-solid fa-check"></i></span> Added`;
    button.disabled = true;

    // addedItems ga image src ni qo‘shamiz (unikal identifikator sifatida)
    let addedItems = JSON.parse(localStorage.getItem('addedItems')) || [];
    if (!addedItems.includes(image)) {
        addedItems.push(image);
        localStorage.setItem('addedItems', JSON.stringify(addedItems));
    }
}

// Sahifa yuklanganda: faqat added bo‘lgan card tugmalarini bloklaymiz
window.addEventListener('DOMContentLoaded', () => {
    const addedItems = JSON.parse(localStorage.getItem('addedItems')) || [];

    document.querySelectorAll('.card').forEach((card) => {
        const image = card.querySelector('img.product-img').src;
        const button = card.querySelector('button.add-card');

        if (addedItems.includes(image)) {
            button.innerHTML = `<span><i class="fa-solid fa-check"></i></span> Added`;
            button.disabled = true;
        }
    });
});
