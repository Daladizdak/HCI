const products = [
  { id: 1, name: "T-Shirt", price: 15.00, category: "Clothing", image: "LV.png" },
  { id: 2, name: "Jeans", price: 25.00, category: "Clothing", image: "gucci.png"  },
  { id: 3, name: "Headphones", price: 60.00, category: "Electronics", image: "Supreme.png"  },
  { id: 4, name: "Bananas", price: 2.50, category: "Fragrances", image: "Haltane.png"  },
  { id: 5, name: "Mouse", price: 30.00, category: "Electronics", image: "5090.png"  },
  { id: 6, name: "Bread", price: 1.50, category: "Fragrances", image: "Tweet.png"  },
  { id: 7, name: "Hoodie", price: 35.00, category: "Electronics", image: "Asus.png"  },
  { id: 8, name: "Laptop", price: 600.00, category: "Electronics", image: "Beats.png"  },
  { id: 9, name: "Milk", price: 1.20, category: "Fragrances", image: "Megamare.png"  },
  { id: 10, name: "Sneakers", price: 45.00, category: "Electronics", image: "ps5.png"  }
];

function displayProducts() {
  const productList = document.getElementById("product-list");
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card mb-3";
    card.innerHTML = `
      <div class="card-content">
        <h1>${product.name}</h1>
        <p>£${product.price.toFixed(2)}</p>
        <button class="btn btn-danger" data-id="${product.id}">Add to Basket</button>
      </div>`;
    card.querySelector("button").addEventListener("click", () => addToBasket(product.id));
    productList.appendChild(card);
  });
}

function addToBasket(productId) {
  let basket = JSON.parse(localStorage.getItem('basket')) || [];
  const product = products.find(p => p.id === productId);
  const existing = basket.find(p => p.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    basket.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('basket', JSON.stringify(basket));
  alert(`${product.name} added to your basket!`);
}

displayProducts();
