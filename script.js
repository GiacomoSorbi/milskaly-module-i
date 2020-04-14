//Checks to see if the document is loaded before trying to access different elements

if (document.readyState == "loading") {
	document.addEventListener("DOMContentLoaded", ready);
} else {
	ready();
}
// activate remove buttons
// add an event to say when the button is clicked the item should be removed
function ready() {
	let removeBasketButtonItems = document.getElementsByClassName(
		"button-purchase"
	);
	for (let i = 0; i < removeBasketButtonItems.length; i++) {
		let button = removeBasketButtonItems[i];
		button.addEventListener("click", removeBasketItem);
	}

	// event listener to determine any time the quanity input changes its value
	// quantity change function
	let quantityInputs = document.getElementsByClassName("basket-quantity-input");
	for (let i = 0; i < quantityInputs.length; i++) {
		let input = quantityInputs[i];
		input.addEventListener("change", quantityChanged);
	}
	// add to Basket buttons
	let addToBasketButtons = document.getElementsByClassName("shop-item-button");
	for (let i = 0; i < addToBasketButtons.length; i++) {
		let button = addToBasketButtons[i];
		button.addEventListener("click", addToBasketClicked);

		document
			.getElementsByClassName("button-purchase")[0]
			.addEventListener("click", purchaseClicked);
	}
}

// Creates an alert to confirm you've purchased an item
function purchaseClicked() {
	alert("Thank you for your purchase");
	let basketItems = document.getElementsByClassName("basket-items")[0];
	while (basketItems.hasChildNodes()) {
		basketItems.removeChild(basketItems.firstChild);
	}

	updateBasketTotal();
}
//removes Basket item
function removeBasketItem(event) {
	let buttonClicked = event.target;
	buttonClicked.parentElement.parentElement.remove();
	updateBasketTotal();
}
// function for quantity input, checks input to see if it's a number
function quantityChanged(event) {
	var input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateBasketTotal();
}
// adds item, images and price to Basket by class name
function addToBasketClicked(event) {
	let button = event.target;
	let shopItem = button.parentElement.parentElement;
	let title = shopItem.getElementsByClassName("product-title")[0].innerText;
	let price = shopItem.getElementsByClassName("product-price")[0].innerText;
	let imageSrc = shopItem.getElementsByClassName("product-image")[0].src;
	addItemToBasket(title, price, imageSrc);
	updateBasketTotal();
}

//creates Basket row/element for item to Basket items
function addItemToBasket(title, price, imageSrc) {
	let basketRow = document.createElement("div");
	basketRow.classList.add("basket-row");
	let basketItems = document.getElementsByClassName("basket-items")[0];
	let basketItemNames = basketItems.getElementsByClassName("basket-item-title");
	//stops items in basket duplicating
	for (let i = 0; i < basketItemNames.length; i++) {
		if (basketItemNames[i].innerText === title) {
			alert("This item is already in your basket");
			return;
		}
	}
	let basketRowContents = `
	<div class="basket-item">
	<img class="basket-item-image" src="${imageSrc}">
	<div class="basket-item-title"><p>${title}</p></div>
</div>
<div class="basket-price"><p>${price}</p> </div>
<div class="basket-quantity">
	<input class="basket-quantity-input" type="number" value="1">
	<button class="button button-remove fa fa-trash" type="button"></button>
</div>
</div>`;

	basketRow.innerHTML = basketRowContents;
	basketItems.append(basketRow);

	//removes Basket items after the remove button has been clicked
	basketRow
		.getElementsByClassName("button-remove")[0]
		.addEventListener("click", removeBasketItem);

	basketRow
		.getElementsByClassName("basket-quantity-input")[0]
		.addEventListener("change", quantityChanged);
}

// Update Basket total
// Find the price of all items in each row and the quanity and multiply them
// Add together to get the total
function updateBasketTotal() {
	let basketItemContainer = document.getElementsByClassName("basket-items")[0];
	let basketRows = basketItemContainer.getElementsByClassName("basket-row");
	let total = 0;
	for (let i = 0; i < basketRows.length; i++) {
		let basketRow = basketRows[i];
		let priceElement = basketRow.getElementsByClassName("basket-price")[0];
		let quantityElement = basketRow.getElementsByClassName(
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
