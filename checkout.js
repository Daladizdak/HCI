let basket = JSON.parse(localStorage.getItem('basket')) || [];

function displayBasket() {
  const basketList = document.getElementById('basket-list');
  const totalEl = document.getElementById('total');
  basketList.innerHTML = '';
  let total = 0;

  basket.forEach(product => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="basket-item">
        <img src="${product.image}" alt="${product.name}" class="basket-img">
        <div class="basket-item-details">
          <h3>${product.name}</h3>
          <span>£${product.price.toFixed(2)}</span>
          <span>x${product.quantity}</span>
          <div class="quantity-controls">
            <button class="btn btn-sm btn-outline-secondary decrease" data-id="${product.id}">-</button>
            <button class="btn btn-sm btn-outline-danger mt-2 remove" data-id="${product.id}">Remove</button>
            <button class="btn btn-sm btn-outline-secondary increase" data-id="${product.id}">+</button>
          </div>
        </div>
      </div>
    `;

    li.querySelector(".remove").addEventListener("click", () => removeProduct(product.id));
    li.querySelector(".decrease").addEventListener("click", () => decreaseQuantity(product.id));
    li.querySelector(".increase").addEventListener("click", () => increaseQuantity(product.id));
    basketList.appendChild(li);
    total += product.price * product.quantity;
  });

  totalEl.textContent = total.toFixed(2);
}

 // Counter for shopping basket
function updateBasketCounter() {
  const freshBasket = JSON.parse(localStorage.getItem('basket')) || [];
  const count = freshBasket.reduce((sum, item) => sum + item.quantity, 0);
  const counterEl = document.getElementById('basket-count');
  if (counterEl) counterEl.textContent = count;
}

function decreaseQuantity(id) {
  const item = basket.find(product => product.id === id);
  
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      const confirmDelete = confirm(`Quantity is 1. Do you want to remove "${item.name}" from your basket?`);
      if (confirmDelete) {
        basket = basket.filter(product => product.id !== id);
      } else {
        return; // exit without doing anything
      }
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    displayBasket();
    updateBasketCounter();
  }
}

function increaseQuantity(id) {
  const item = basket.find(product => product.id === id);
  if (item) {
    item.quantity += 1;
    localStorage.setItem('basket', JSON.stringify(basket));
    displayBasket();
    updateBasketCounter();
  }
}



function removeProduct(id) {
  const product = basket.find(item => item.id === id);
  const confirmDelete = confirm(`Are you sure you want to remove "${product.name}" from your basket?`);
  if (confirmDelete) {
    basket = basket.filter(item => item.id !== id);
    localStorage.setItem('basket', JSON.stringify(basket));
    displayBasket();
    updateBasketCounter();
  }
}

// Show Bootstrap modal on checkout
const checkoutForm = document.getElementById('checkout-form');
const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (basket.length === 0) {
    alert("Your basket is empty.");
    return;
  }
  checkoutModal.show();
});


// Handle checkout form submit
checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const card = document.getElementById('card-number').value.trim();

  if (!name || !lastName || !card) {
    alert('Please fill in all fields.');
    return;
  }

  let total = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);
  alert(`Thank you, ${name} ${lastName}! You paid £${total.toFixed(2)}.`);

  basket = [];
  localStorage.removeItem('basket');
  displayBasket();
  updateBasketCounter();
  checkoutForm.reset();
  checkoutModal.hide();
});

displayBasket();
updateBasketCounter();
