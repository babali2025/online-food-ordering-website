document.addEventListener("DOMContentLoaded", function () {

  const splash = document.getElementById("splash");

  if (splash) {

    if (sessionStorage.getItem("splashShown") === "true") {
      splash.remove();
    } else {

      splash.style.opacity = "1";

      setTimeout(function () {

        splash.style.opacity = "0";

        setTimeout(function () {
          splash.remove();
          sessionStorage.setItem("splashShown", "true");
        }, 800);

      }, 2000);
    }
  }

});


function searchFood() {

  const inputElement = document.getElementById("searchInput");
  if (!inputElement) return;

  const input = inputElement.value.toLowerCase();

  const items = document.querySelectorAll(
    ".food-item, .v-card, .nv-card, .product-card, .res-food-card"
  );

  items.forEach(item => {

    const title =
      item.querySelector("h3") ||
      item.querySelector("h2");

    if (!title) return;

    const name = title.innerText.toLowerCase();

    if (input.trim() === "") {
      item.style.display = "";
    }
    else if (name.includes(input)) {
      item.style.display = "";
    }
    else {
      item.style.display = "none";
    }

  });

}


let slides = document.querySelectorAll(".slide");
let slideIndex = 0;

function showSlide() {

  if (slides.length === 0) return;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex].style.display = "block";

  slideIndex++;

  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }

}

if (slides.length > 0) {
  setInterval(showSlide, 4000);
  showSlide();
}





function viewOrders(){
  alert("🍔 Showing your food orders soon!");
}

function login(){
  alert("You have login successfully!");

}

function editProfile(){
  alert("✏️ Edit profile feature coming soon!");
}

function logout(){

  const confirmLogout = confirm("Are you sure you want to logout?");

  if(confirmLogout){
    alert("🚪 You have logged out successfully!");
  }
localStorage.removeItem("logout");
    location.reload();
}

function done(){
  alert("YOUR REVIEW HAS BEEN ADDED!");
}
function bookTable(){

  const confirmBooking = confirm("🍽️ Do you want to book this table?");

  if(confirmBooking){
      alert("✅ Your table has been booked successfully!");
  }
  else{
      alert("❌ Booking cancelled.");
  }

}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartValue = document.querySelector(".cart-value");
const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");
const cartTab = document.querySelector(".cart-tab");
const cartIcon = document.querySelector(".cart-icon");
const closeBtn = document.querySelector(".close-btn");



function parsePrice(price){
  if(!price) return 0;
  return Number(price.replace(/[^0-9]/g,""));
}



function updateCartCount(){
  if(cartValue){
    cartValue.innerText = cart.length;
  }
}



function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}



function renderCart(){

  if(!cartList) return;

  cartList.innerHTML = "";

  let total = 0;

  cart.forEach((item,index)=>{

    total += item.price * item.quantity;

    cartList.innerHTML += `
    <div class="item">

      <div class="item-image">
        <img src="${item.img}">
      </div>

      <div>
        <h4>${item.name}</h4>
        <h4>₹${item.price}</h4>
      </div>

      <div class="quantity-container">

        <button class="quantity-btn minus" data-index="${index}">-</button>

        <span class="quantity-value">${item.quantity}</span>

        <button class="quantity-btn plus" data-index="${index}">+</button>

      </div>

    </div>
    `;
  });

  if(cartTotal){
    cartTotal.innerText = "₹" + total;
  }

  saveCart();
  updateCartCount();
}



document.addEventListener("click",function(e){

  if(e.target.classList.contains("plus")){

    const index = e.target.dataset.index;

    if(cart[index]){
      cart[index].quantity++;
      renderCart();
    }

  }

  if(e.target.classList.contains("minus")){

    const index = e.target.dataset.index;

    if(cart[index]){

      cart[index].quantity--;

      if(cart[index].quantity <=0){
        cart.splice(index,1);
      }

      renderCart();
    }

  }

});



function addToCart(button){

  const card = button.closest(".v-card, .nv-card, .product-card, .food-item");

  if(!card) return;

  const name =
    card.querySelector("h2")?.innerText ||
    card.querySelector("h3")?.innerText ||
    "";

  const priceText =
  card.querySelector(".v-price")?.innerText ||
  card.querySelector(".nv-price")?.innerText ||
  card.querySelector(".price")?.innerText ||
  card.querySelector("h4")?.innerText ||
  card.querySelector("p")?.innerText ||
  "";

  const price = parsePrice(priceText);

  const img = card.querySelector("img")?.src || "";

  const existing = cart.find(item => item.name === name);

  if(existing){
    alert("Item already added in cart");
    return;
  }

  cart.push({
    name:name,
    price:price,
    img:img,
    quantity:1
  });

  renderCart();

}



document.querySelectorAll(".btn").forEach(button=>{

  button.addEventListener("click",(e)=>{

    e.preventDefault();

    addToCart(button);

  });

});



if(cartIcon && cartTab){

  cartIcon.addEventListener("click",()=>{
    cartTab.classList.add("cart-tab-active");
  });

}

if(closeBtn && cartTab){

  closeBtn.addEventListener("click",()=>{
    cartTab.classList.remove("cart-tab-active");
  });

}



renderCart();
updateCartCount();

function showPopup(){
    alert("🎉 Payment Successful!\nYour order has been placed successfully!");
    localStorage.removeItem("cart");
    location.reload();
}