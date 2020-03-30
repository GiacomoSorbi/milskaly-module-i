const carousel = document.querySelector(".carousel");
const product = carousel.querySelector(".products");
const leftButton = document.querySelector(".slide-left");
const rightButton = document.querySelector(".slide-right");

// Limit the direction in which the carousel can slide/ control how much the carousel advances by each time.
const carouselWidth = carousel.offsetWidth;
const productStyle = product.currentStyle || window.getComputedStyle(product);
const productMarginRight = Number(productStyle.marginRight.match(/\d+/g)[0]);

// Product Count
const productCount = carousel.querySelectorAll(".products").length;

// Define an offset property to dynamically update by clicking the button controls and a maxX property so the carousel knows when to stop at the upper limit
let offset = 0;
const maxX = -(
	(productCount / 3) * carouselWidth +
	productMarginRight * (productCount / 3) -
	carouselWidth -
	productMarginRight
);

leftButton.addEventListener("click", function() {
	if (offset !== 0) {
		offset += carouselWidth + productMarginRight;
		carousel.style.transform = `translateX(${offset}px)`;
	}
});

rightButton.addEventListener("click", function() {
	if (offset !== maxX) {
		offset -= carouselWidth + productMarginRight;
		carousel.style.transform = `translateX(${offset}px)`;
	}
});
