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
          <button class="btn btn-sm btn-outline-danger mt-2" data-id="${product.id}">Remove</button>
        </div>
      </div>
    `;

    li.querySelector("button").addEventListener("click", () => removeProduct(product.id));
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
