const cartToggleBtn = document.querySelector(".cart-toggle-btn");
const cart = document.querySelector(".cart");
const closeBtn = document.querySelector(".close-btn");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotal = document.querySelector("#cart-amount");
let cartItems = [];

function addToCart(name, quantity, price) {
  const existingItem = cartItems.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ name, quantity, price });
  }

  updateCartDisplay();
}

function updateCartDisplay() {
  cartItemsContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");

    cartItemElement.textContent = `${item.name} (x${item.quantity}) - $${(
      item.quantity * item.price
    ).toFixed(2)}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      cartItems = cartItems.filter((cartItem) => cartItem.name !== item.name);
      updateCartDisplay();
    });
    cartItemElement.appendChild(removeBtn);

    cartItemsContainer.appendChild(cartItemElement);
  });

  const cartTotalValue = calculateCartTotal();
  cartTotal.textContent = cartTotalValue.toFixed(2);
}

function calculateCartTotal() {
  let total = 0;
  cartItems.forEach((item) => (total += item.quantity * item.price));
  return total;
}

document.querySelectorAll(".menu-item").forEach((menuItem) => {
  const addToCartBtn = menuItem.querySelector(".add-to-cart-btn");

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const dishName = menuItem.querySelector(
        ".menu-item-content h3"
      ).textContent;
      const quantityInput = menuItem.querySelector(".quantity-container input");
      const quantity = parseInt(quantityInput.value);
      const dish = dishes.find((dish) => dish.name === dishName);
      const price = dish.price;

      addToCart(dishName, quantity, price);
    });
  }
});

cartToggleBtn.addEventListener("click", () => {
  cartToggleBtn.classList.toggle("active");
  cart.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
  cartToggleBtn.classList.remove("active");
  cart.classList.remove("active");
});

const darkModeToggle = document.querySelector(".dark-mode-toggle");
const bodyElement = document.body;

darkModeToggle.addEventListener("click", () => {
  bodyElement.classList.toggle("dark-mode");
});

const menuItemsContainer = document.querySelector(".menu-items");

const dishes = [
  {
    name: "Spicy Thai Noodles",
    ingredients: "Rice noodles, vegetables, tofu (optional), peanut sauce",
    price: 12.99,
    genre: "Main Course, Vegan",
  },
  {
    name: "Loaded Veggie Burger",
    ingredients: "Black bean patty, avocado, tomato, lettuce, onion, vegan bun",
    price: 10.99,
    genre: "Main Course, Vegan",
  },
  {
    name: "Crispy Chicken Wings",
    ingredients: "Chicken wings, hot sauce, blue cheese dressing (optional)",
    price: 8.99,
    genre: "Appetizer",
  },
  {
    name: "BBQ Pulled Pork Sandwich",
    ingredients: "Pulled pork, BBQ sauce, coleslaw, brioche bun",
    price: 14.5,
    genre: "Main Course",
  },
  {
    name: "Classic Caesar Salad",
    ingredients: "Romaine lettuce, croutons, parmesan cheese, Caesar dressing",
    price: 7.5,
    genre: "Appetizer",
  },
  {
    name: "Garlic Bread",
    ingredients: "White bread, garlic, olive oil, salt, pepper",
    price: 3.99,
    genre: "Appetizer",
  },
  {
    name: "Hummus Mezze",
    ingredients:
      " zesty tabbouleh, smoky grilled eggplant, and warm pita bread",
    price: 7.99,
    genre: "Appetizer, Vegan",
  },
  {
    name: "Marinara Dip",
    ingredients:
      "Tomato sauce, garlic, oregano, black pepper, Crispy veggie chips",
    price: 5.99,
    genre: "Appetizer, Vegan",
  },
  {
    name: "Teriyaki Chicken Bowl",
    ingredients:
      "Marinated grilled chicken, steamed rice, mixed vegetables, teriyaki sauce, sesame seeds (optional)",
    price: 14.5,
    genre: "Main Course",
  },
  {
    name: "Pesto Pasta Primavera",
    ingredients:
      "Pesto sauce, assorted seasonal vegetables (e.g., zucchini, broccoli, sun-dried tomatoes), penne pasta, parmesan cheese (optional)",
    price: 12.99,
    genre: "Main Course, Vegan",
  },
];

function createFoodCard(dish) {
  const card = document.createElement("div");
  card.classList.add("menu-item");

  const image = document.createElement("img");
  image.src = "images/" + dish.name + ".jpg";
  image.alt = dish.name;
  card.appendChild(image);

  const content = document.createElement("div");
  content.classList.add("menu-item-content");

  const title = document.createElement("h3");
  title.textContent = dish.name;
  content.appendChild(title);

  const description = document.createElement("p");
  description.textContent = dish.ingredients;
  content.appendChild(description);

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = `$${dish.price.toFixed(2)}`;
  content.appendChild(price);

  const quantityContainer = document.createElement("div");
  quantityContainer.classList.add("quantity-container");

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.min = 1;
  quantityInput.value = 1;
  quantityContainer.appendChild(quantityInput);

  const addToCartBtn = document.createElement("button");
  addToCartBtn.textContent = "Add to Cart";
  addToCartBtn.addEventListener("click", () => {
    const quantity = parseInt(quantityInput.value);

    addToCart(dish.name, quantity, dish.price);
  });

  quantityContainer.appendChild(addToCartBtn);

  content.appendChild(quantityContainer);

  const genreTags = document.createElement("div");
  genreTags.classList.add("genre-tags");

  const genreList = dish.genre.split(",");

  if (genreList.length === 2) {
    genreTags.textContent = genreList[0].trim() + " " + genreList[1].trim();
  } else {
    genreList.forEach((genre) => {
      const genreTag = document.createElement("span");
      genreTag.classList.add("genre-tag");
      genreTag.textContent = genre.trim();
      genreTags.appendChild(genreTag);
    });
  }

  content.appendChild(genreTags);

  card.appendChild(content);

  return card;
}

function displayDishes() {
  dishes.forEach((dish) => {
    const card = createFoodCard(dish);
    menuItemsContainer.appendChild(card);
  });
}

displayDishes();

const filterButtons = document.querySelectorAll(".filter-btn");

function filterDishes(genre) {
  menuItemsContainer.innerHTML = "";

  dishes.forEach((dish) => {
    const genres = dish.genre.split(",");
    let match = false;

    if (genre === "all") {
      match = true;
    } else {
      genres.forEach((dishGenre) => {
        if (dishGenre.trim() === genre) {
          match = true;
          return;
        }
      });
    }

    if (match) {
      const card = createFoodCard(dish);
      menuItemsContainer.appendChild(card);
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filterGenre = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    filterDishes(filterGenre);
  });
});

filterDishes("all");
