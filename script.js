//Checks to see if the document is loaded before trying to access different elements

if (document.readyState == "loading") {
	document.addEventListener("DOMContentLoaded", ready);
} else {
	ready();
}
// activate remove buttons
// add an event to say when the button is clicked the item should be removed
function ready() {
	let removeCartButtonItems = document.getElementsByClassName(
		"button-purchase"
	);
	for (let i = 0; i < removeCartButtonItems.length; i++) {
		let button = removeCartButtonItems[i];
		button.addEventListener("click", removeCartItem);
	}

	// event listener to determine any time the quanity input changes its value
	// quantity change function
	let quantityInputs = document.getElementsByClassName("basket-quantity-input");
	for (let i = 0; i < quantityInputs.length; i++) {
		let input = quantityInputs[i];
		input.addEventListener("change", quantityChanged);
	}
	// add to cart buttons
	let addToCartButtons = document.getElementsByClassName("shop-item-button");
	for (let i = 0; i < addToCartButtons.length; i++) {
		let button = addToCartButtons[i];
		button.addEventListener("click", addToCartClicked);

		document
			.getElementsByClassName("button-purchase")[0]
			.addEventListener("click", purchaseClicked);
	}
}

// Creates an alert to confirm you've purchased an item
function purchaseClicked() {
	alert("Thank you for your purchase");
	let cartItems = document.getElementsByClassName("basket-items")[0];
	while (cartItems.hasChildNodes()) {
		cartItems.removeChild(cartItems.firstChild);
	}

	updateCartTotal();
}
//removes cart item
function removeCartItem(event) {
	let buttonClicked = event.target;
	buttonClicked.parentElement.parentElement.remove();
	updateCartTotal();
}
// function for quantity input, checks input to see if it's a number
function quantityChanged(event) {
	var input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateCartTotal();
}
// adds item, images and price to cart by class name
function addToCartClicked(event) {
	let button = event.target;
	let shopItem = button.parentElement.parentElement;
	let title = shopItem.getElementsByClassName("product-title")[0].innerText;
	let price = shopItem.getElementsByClassName("product-price")[0].innerText;
	let imageSrc = shopItem.getElementsByClassName("product-image")[0].src;
	addItemToCart(title, price, imageSrc);
	updateCartTotal();
}

//creates cart row/element for item to cart items
function addItemToCart(title, price, imageSrc) {
	let cartRow = document.createElement("div");
	cartRow.classList.add("basket-row");
	let cartItems = document.getElementsByClassName("basket-items")[0];
	let cartItemNames = cartItems.getElementsByClassName("basket-item-title");
	//stops items in basket duplicating
	for (let i = 0; i < cartItemNames.length; i++) {
		if (cartItemNames[i].innerText == title) {
			alert("This item is already in your cart");
			return;
		}
	}
	let cartRowContents = `
	<div class="basket-item cart-column">
	<img class="basket-item-image" src="${imageSrc}">
	<span class="basket-item-title"><p>${title}</p></span>
</div>
<span class="basket-price cart-column"><p>${price}</p> </span>
<div class="basket-quantity cart-column">
	<input class="basket-quantity-input" type="number" value="1">
	<button class="button button-purchase" type="button">REMOVE</button>
</div>
</div>`;
	cartRow.innerHTML = cartRowContents;
	cartItems.append(cartRow);

	//removes cart items after the remove button has been clicked
	cartRow
		.getElementsByClassName("button-purchase")[0]
		.addEventListener("click", removeCartItem);

	cartRow
		.getElementsByClassName("basket-quantity-input")[0]
		.addEventListener("change", quantityChanged);
}

// Update cart total
// Find the price of all items in each row and the quanity and multiply them
// Add together to get the total
function updateCartTotal() {
	let cartItemContainer = document.getElementsByClassName("basket-items")[0];
	let cartRows = cartItemContainer.getElementsByClassName("basket-row");
	let total = 0;
	for (let i = 0; i < cartRows.length; i++) {
		let cartRow = cartRows[i];
		let priceElement = cartRow.getElementsByClassName("basket-price")[0];
		let quantityElement = cartRow.getElementsByClassName(
			"basket-quantity-input"
		)[0];
		let price = parseFloat(priceElement.innerText.replace("£", ""));
		let quantity = quantityElement.value;
		total = total + price * quantity;
	}

	//rounds total to two decimal places
	total = Math.round(total * 100) / 100;
	document.getElementsByClassName("basket-total-price")[0].innerText =
		"£" + total;
}
