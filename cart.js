// Initialize EmailJS
emailjs.init('GHIENftTeLyVvcypW'); // Replace with your actual User ID

window.addEventListener('load', () => {
    // Load cart from localStorage when the cart page is loaded
    cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    updateCart();
});

// Cart logic
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let totalPrice = 0;
const discount = 0.10; // 10% discount
let isDiscountApplied = false;

// Adding product to cart
function addToCartInCartPage(product, price) {
    cartItems.push({ product, price });
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save cart to localStorage
    updateCart();
} // Missing closing brace for this function

// Remove product from cart
function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
    updateCart();
}

// Update cart display and total
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    totalPrice = 0;
    cartItems.forEach((item, index) => {
        console.log('Adding item to cart:', item); // Debugging line
        cartItemsContainer.innerHTML += `
            <div>
                <span>${item.product}</span>
                <span>$${item.price}</span>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        totalPrice += parseFloat(item.price);
    });

    document.getElementById('total-price').innerText = `Total: $${totalPrice.toFixed(2)}`;
    console.log('Updated total price:', totalPrice); // Debugging line
}

// Apply 10% discount if email is provided
document.getElementById('email').addEventListener('input', function () {
    const email = this.value;
    if (email.length > 0 && !isDiscountApplied) {
        totalPrice = totalPrice - totalPrice * discount;
        isDiscountApplied = true;
        document.getElementById('total-price').innerText = `Total (with 10% discount): $${totalPrice.toFixed(2)}`;
    } else if (email.length === 0 && isDiscountApplied) {
        isDiscountApplied = false;
        updateCart(); // Recalculate total without discount
    }
});

// Handle form submission and email sending
document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect form data
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const postcode = document.getElementById('postcode').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    // Send email using EmailJS
    emailjs.send('service_l4tterl', 'template_khyq0s3', {
        name: name,
        surname: surname,
        state: state,
        city: city,
        postcode: postcode,
        phone: phone,
        email: email,
        cartItems: JSON.stringify(cartItems),
        totalPrice: totalPrice.toFixed(2)
    }).then(() => {
        // Clear cart after checkout
        cartItems = [];
        localStorage.removeItem('cartItems');
        updateCart();

        alert('Order placed successfully! Check your email for the details.');
    }).catch((error) => {
        console.error('Email sending failed:', error);
        alert('There was an error placing your order. Please try again.');
    });
});
