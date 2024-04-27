const productList = document.getElementById("productList");
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");
const sortOrder = document.getElementById("sortOrder");

// Fetch all products from FakeStoreAPI
fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(products => {
    displayProducts(products);

    // Populate category filter options
    const categories = [...new Set(products.map(product => product.category))];
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  });

function displayProducts(products) {
  productList.innerHTML = ""; // Clear previous product list

  products.forEach(product => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.price}</p>
    `;
    productList.appendChild(productItem);
  });
}

// Event listeners for filtering, searching, and sorting
categoryFilter.addEventListener("change", filterProducts);
searchInput.addEventListener("input", searchProducts);
sortOrder.addEventListener("change", sortProducts);

function filterProducts() {
  // Filter products based on selected category
  const selectedCategory = categoryFilter.value;
  const filteredProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;
  displayProducts(filteredProducts);
}

function searchProducts() {
  // Search products by title
  const searchTerm = searchInput.value.toLowerCase();
  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm));
  displayProducts(filteredProducts);
}

function sortProducts() {
  // Sort products by price
  const order = sortOrder.value === "asc" ? 1 : -1;
  const sortedProducts = products.slice().sort((a, b) => order * (a.price - b.price));
  displayProducts(sortedProducts);
}
