// script.js

// 用於儲存所有商品的陣列
let products = [];
// 用於儲存購物車內商品的陣列
let cart = [];

// 當 DOM 加載完成時執行
document.addEventListener('DOMContentLoaded', function () {
  // 使用 fetch 從 test.json 中獲取商品數據
  fetch('test.json')
    .then(response => response.json())
    .then(data => {
      // 將商品數據存儲在全局變數中
      products = data.products;
      // 顯示商品列表
      displayProducts(products);
    });
});

// 顯示商品列表
function displayProducts(products) {
  // 獲取包含商品列表的元素
  let productList = document.getElementById('product-list');
  
  // 遍歷每個商品，創建元素並附加到商品列表中
  products.forEach(product => {
    let productItem = document.createElement('div');
    productItem.innerHTML = `
      <p>${product.name} - $${product.price}</p>
      <button onclick="addToCart('${product.id}')">加入購物車</button>
    `;
    productList.appendChild(productItem);
  });
}

// 將商品添加到購物車
function addToCart(productId) {
  // 根據商品 ID 獲取商品
  let product = getProductById(productId);
  // 如果找到商品，將其添加到購物車並顯示購物車
  if (product) {
    cart.push(product);
    displayCart();
  }
}

// 根據商品 ID 獲取商品
function getProductById(productId) {
  return products.find(function(product) {
    return product.id === productId;
  });
}

// 顯示購物車內容
function displayCart() {
  // 獲取包含購物車內容的元素
  let cartList = document.getElementById('cart');
  // 清空購物車內容
  cartList.innerHTML = '';
  // 初始化總計金額
  let total = 0;

  // 遍歷購物車中的每個商品
  cart.forEach(product => {
    let cartItem = document.createElement('li');
    cartItem.textContent = `${product.name} - $${product.price}`;
    cartList.appendChild(cartItem);
    // 累加總計金額
    total += product.price;
  });

  // 更新總計金額顯示
  document.getElementById('total').textContent = `總計: $${total}`;
}

// 顯示購物車
function showCart() {
  document.getElementById('cart-overlay').style.display = 'block';
}

// 隱藏購物車
function hideCart() {
  document.getElementById('cart-overlay').style.display = 'none';
}

// 結帳
function checkout() {
  alert('結帳成功！感謝您的購買！');
  // 清空購物車並更新顯示
  cart = [];
  displayCart();
  // 隱藏購物車
  hideCart();
}
