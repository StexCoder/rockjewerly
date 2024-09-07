function myFunction(imgs) {
    // Get the expanded image
    var expandImg = document.getElementById("expandedImg");
    // Get the image text
    var imgText = document.getElementById("imgtext");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    // Use the value of the alt attribute of the clickable image as text inside the expanded image
    imgText.innerHTML = imgs.alt;
    // Show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "block";
  }

  window.addEventListener('load', () => {
    document.getElementById('loading').style.display = 'none';
});

function addToCart(product, price) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push({ product, price });
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  alert(`${product} has been added to the cart!`);
}
