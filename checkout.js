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
            <button class="btn btn-sm btn-outline-danger mt-2" data-id="${product.id}">Remove</button>
            <button class="btn btn-sm btn-outline-secondary increase" data-id="${product.id}">+</button>
          </div>
        </div>
      </div>
    `;

    li.querySelector("button").addEventListener("click", () => removeProduct(product.id));
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
      basket = basket.filter(product => product.id !== id); // remove completely
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
  basket = basket.filter(item => item.id !== id);
  localStorage.setItem('basket', JSON.stringify(basket));
  displayBasket();
  updateBasketCounter();
}



document.getElementById("checkout-btn").addEventListener("click", () => {
  let total = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);
  alert(`Thank you! You paid £${total.toFixed(2)}.`);
  basket = [];
  localStorage.removeItem('basket');
  displayBasket();
  updateBasketCounter();
});

displayBasket();
updateBasketCounter();
