document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    const viewCartBtn = document.getElementById('view-cart-btn');
    const modal = document.createElement('div');
    modal.className = 'modal';
    document.body.appendChild(modal);

    // Function to update the cart count
    function updateCartCount() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Function to display the cart
    function displayCart() {
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close';
        closeBtn.textContent = '×';
        closeBtn.addEventListener('click', () => modal.style.display = 'none');
        modalContent.appendChild(closeBtn);

        const cartItemsContainer = document.createElement('div');
        cartItemsContainer.id = 'cart-items';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
                cartItemsContainer.appendChild(itemDiv);
            });
        }

        const checkoutBtn = document.createElement('button');
        checkoutBtn.id = 'checkout-btn';
        checkoutBtn.textContent = 'Checkout';
        checkoutBtn.addEventListener('click', () => {
            alert('Checkout functionality is not implemented yet.');
            modal.style.display = 'none';
        });
        modalContent.appendChild(cartItemsContainer);
        modalContent.appendChild(checkoutBtn);

        modal.innerHTML = ''; // Clear previous content
        modal.appendChild(modalContent);
        modal.style.display = 'flex';
    }

    // Function to save the cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Function to add a product to the cart
    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += product.quantity;
        } else {
            cart.push(product);
        }
        updateCartCount();
        saveCart(); // Save to localStorage
    }

    // Add to Cart button event listeners
    document.querySelectorAll('.add-product-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const id = parseInt(productCard.getAttribute('data-id'));
            const name = productCard.querySelector('h2').textContent;
            const price = parseFloat(productCard.querySelector('.price').textContent.replace('Price: $', ''));
            const quantity = parseInt(productCard.querySelector('input[type="number"]').value);

            const product = { id, name, price, quantity };
            addToCart(product);
        });
    });

    // View Cart button
    viewCartBtn.addEventListener('click', displayCart);

    // Update the cart count on page load
    updateCartCount();
});
