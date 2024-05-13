//Nagłówek
class specialheader extends HTMLElement {
    connectedCallback(){
        this.innerHTML = ` 
<header>   
        <div class="nav cont">
        <!-- Ikona Menu -->
        <i class='bx bx-menu' id="menu-icon"></i>
        <!-- Menu -->
    <div class="men-cont">
        <div class="menu">
            <h1 class="menu-title">Menu</h1>
            <a href="main.html" class="menu-link">strona główna</a>
            <a href="" class="menu-link">Kontakt</a>
            <a href="" class="menu-link">mężczyźni</a>
            <a href="" class="menu-link">kobiety</a>
            <a href="" class="menu-link">akcesoria</a>
            <!-- zamknięcie menu -->
            <i class='bx bx-x' id="close-menu"></i>
        </div>
    </div>

        <!-- Logo -->
        <a href="main.html" class="logo">Cursed</a>
        <!-- Ikona koszyka -->
        <i class="bx bx-shopping-bag" id="cart-icon" ><span id="quantity-bg" data-quantity="0"></span></i>
        <!-- koszyk -->
        <div class="cart">
            <h1 class="cart-title">Twój koszyk</h1>
            <div class="cart-content"></div>
            <div class="total"></div>
            <div class="total-title">Suma:</div>
            <div class="total-price">0zł</div>
            <!-- Przycisk Kup -->
            <button type="button" class="btn-buy">Kup Teraz</button>
            <!-- zamknięcie koszyka -->
            <i class='bx bx-x' id="close-cart"></i>
        </div>
    </div>
</header>`
    }
} 

//Stopka
class specialfooter extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `            
        <footer>
            <div>
                <h1 class="logo">C</h1>
            </div>
            <div>
                <h3>Kontakt</h3>
                <p>cursedshopofficial@gmail.com</p>
            </div>
            <div>
                <h3>Informacja</h3>
                <p><a>Regulamin</a></p>
                <p><a>Polityka prywatności</a></p>
                <p><a>Dostawa i płatności</a></p>
                <p><a>Zwroty i reklamacje</a></p>
            </div>
            <div>
                <h3>Bądź na bieżąco!</h3>
                <p><a>Instagram</a></p>     
                <p><a>Facebook</a></p>
                <p><a>Tik Tok</a></p>
            </div>
    </footer>`
    }
}
customElements.define('special-header', specialheader)
customElements.define('special-footer', specialfooter)
// Obraz przekazany do podstrony
const div_shopContent = document.querySelector(".shop-content");
div_shopContent.querySelectorAll('a').forEach((elem) => {
    elem.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.assign(`/product.html?id=${elem.dataset.product}&test=tka`);
    })
})
//Data-product == src
document.addEventListener('DOMContentLoaded', function() {
    var productBoxes = document.querySelectorAll('.product-box');
    productBoxes.forEach(function(box) {
        var imgElement = box.querySelector('.product-img');
        var aElement = imgElement.parentElement;
        var dataProductValue = imgElement.getAttribute('src');
        aElement.setAttribute('data-product', dataProductValue);
    });
});
//Nazwa produktu
const productBoxes = document.querySelectorAll('.product-box');

   productBoxes.forEach(box => {
    const img = box.querySelector('.product-img');
    const h2 = box.querySelector('.product-title');

    h2.innerText = img.getAttribute('src').slice(5, img.getAttribute('src').lastIndexOf('.'));
 });

// Menu
let menuIcon = document.querySelector('#menu-icon');
let menu = document.querySelector('.menu');
let closeMenu = document.querySelector('#close-menu');

// Otwórz
menuIcon.onclick = () =>{
    menu.classList.add("active");
};

// Zamknij Menu
closeMenu.onclick = () =>{
    menu.classList.remove("active");
};

// Koszyk
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// Otwórz
cartIcon.onclick = () =>{
    cart.classList.add("active");
};

// Zamknij koszyk
closeCart.onclick = () =>{
    cart.classList.remove("active");
};

// JS Koszyk
if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready();
}

// Tworzenie funkcji
function ready(){
    // usuwanie z koszyka
    var reomveCartButtons = document.getElementsByClassName("cart-remove");
    console.log(reomveCartButtons);
    for ( var i = 0; i < reomveCartButtons.length; i++){
        var button = reomveCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    // zmiany wartości
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for ( var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[0];
        input.addEventListener("change", quantityChanged);
    }
    // Dodawanie do koszyka
    var addCart = document.getElementsByClassName("add-cart");
    for ( var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
        
    }
    
    // loadCartItems();
    // przycisk kup teraz
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}
function buyButtonClicked(){
    alert("Twoje zamówienie zostało złożone");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
    updateCartIcon()
}

// usuwanie koszyka
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
    // saveCartItems();
    updateCartIcon()
}
// zmiany wartości
function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
    // saveCartItems();
    updateCartIcon()
}
// dodaj do koszyka
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("cena")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    //animacja shake
    var button = event.target;
    cartIcon.classList.add("shake");
    setTimeout(function() {
      cartIcon.classList.remove("shake");
    }, 500);
    updatetotal();
    // saveCartItems();
    updateCartIcon()
}
function addProductToCart(title, price, productImg){
var cartShopBox = document.createElement("div");
cartShopBox.classList.add("cart-box");
var cartItems = document.getElementsByClassName("cart-content")[0];
var cartBoxContent = `
<img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}
        <input type="number" value="1" class="cart-quantity">
        </div>
    </div>
<!-- Usuń koszyk -->
<i class='bx bx-x cart-remove'></i>`
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
    // saveCartItems();
}

// Suma
function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i =0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("zł", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        // Cena po przecinku
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = total + "zł";
    
}
// wartość dodanych przedmiotów do koszyka
function updateCartIcon(){
    var cartBoxes = document.getElementsByClassName("cart-box");
    var quantity = 0;

    for (var i=0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        quantity+= parseInt(quantityElement.value);
    }
    var cartIcon = document.querySelector("#quantity-bg");
    cartIcon.setAttribute("data-quantity", quantity);
}


// // zachowaj sumę po odświeżeniu
//     localStorage.setItem("cartTotal", total);
// // Zachowanie produktów w koszyku po odświeżeniu
// function saveCartItems (){
//     var cartContent = document.getElementsByClassName("cart-content")[0];
//     var cartBoxes =cartContent.getElementsByClassName("cart-box");
//     var cartItems = [];
//     for(var i=0; i < cartBoxes.lenght; i++){
//         cartBox = cartBoxes[i];
//         var titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
//         var priceElement = cart.getElementsByClassName("cart-price")[0];
//         var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
//         var productImg = cartBox.getElementsByClassName("cart-img")[0].src;

//         var item = {
//             title: titleElement.innerText,
//             price: priceElement.innerText,
//             quantity: quantityElement.value,
//             productImg: productImg,
//         };
//         cartItems.push(item);
//     }
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
// }
// zawartość w koszyku
// function loadCartItems(){
//     var cartItems = localStorage.getItem("cartItems");
//     if (cartItems){
//         cartItems = JSON.parse(cartItems);

//         for (var i = 0; i < cartItems.lenght; i++){
//             var item = cartItems[i];
//             addProductToCart(item.title, item.price, item.productImg);

//             var cartBoxes = document.getElementsByClassName("cart-box");
//             var cartBox = cartBoxes[cartBoxes.lenght - 1];
//             var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
//             quantityElement.value = item.quantity;

//         }
//     }
//     var cartTotal = localStorage.getItem("cartTotal");
//     if(cartTotal){
//         document.getElementsByClassName("total-price")[0].innerText = "zł" + cartTotal;
//     }
// }