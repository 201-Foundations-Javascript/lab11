'use strict';

ProductImages.allProductsArray = [];
ProductImages.rounds = 25;

function ProductImages(name, imageSrc, clickCount = 0, views = 0) {
  this.clickCount = clickCount;
  this.name = name;
  this.imageSrc = imageSrc;
  this.views = views;
  ProductImages.allProductsArray.push(this);
}

ProductImages.prototype.render = function () {
  var ulTarget = document.getElementById('products');
  var createLi = document.createElement('li');
  var createImage = document.createElement('img');
  var createPElement = document.createElement('p');

  createPElement.textContent = 'Total Clicks for this product: ' + this.clickCount;
  createImage.src = this.imageSrc;
  createImage.id = this.name;

  createLi.appendChild(createImage);
  createLi.appendChild(createPElement);
  ulTarget.appendChild(createLi);
};
var totalCliclsPerImage = 0;

function productImageClicks(event) {
  if (totalCliclsPerImage < ProductImages.rounds) {
    totalCliclsPerImage++;

    for (var i = 0; i < ProductImages.allProductsArray.length; i++) {
      if (event.target.id === ProductImages.allProductsArray[i].name) {
        ProductImages.allProductsArray[i].clickCount++;
      }

    }

    var stringifiedAllProducts = JSON.stringify(ProductImages.allProductsArray);
    localStorage.setItem('allProducts', stringifiedAllProducts);


    renderProductImages();

  }
  if (totalCliclsPerImage === ProductImages.rounds) {
    var ulTarget = document.getElementById('products');
    ulTarget.innerHTML = '';
    popitup('results.html', 'results');
    // setTimeout(() => window.open('results.html', 'width=200, height=200'), 1000);
    totalCliclsPerImage = 0;
    // var ctx = document.getElementById('results').getContext('2d');

    var imageName = [];
    var clickTotal = [];
    var viewTotal = [];

    for (i = 0; i < ProductImages.allProductsArray.length; i++) {
      imageName.push(ProductImages.allProductsArray[i].name);
      clickTotal.push(ProductImages.allProductsArray[i].clickCount);
      viewTotal.push(ProductImages.allProductsArray[i].views);
    }
    var stringifiedImageName = JSON.stringify(imageName);
    localStorage.setItem('imageName', stringifiedImageName);
    var stringifiedClickTotal = JSON.stringify(clickTotal);
    localStorage.setItem('clickTotal', stringifiedClickTotal);
    var stringifiedViewTotal = JSON.stringify(clickTotal);
    localStorage.setItem('viewTotal', stringifiedViewTotal);
  }
}
// https://stackoverflow.com/questions/14351771/open-popup-window-using-javascript

function popitup(url, windowName) {
  var newwindow = window.open(url, windowName, 'height=600,width=1250');
  if (window.focus) { newwindow.focus(); }
  return false;
}
ProductImages.random = [];
ProductImages.duplicateImages = [];
function renderProductImages() {
  // debugger;
  var ulTarget = document.getElementById('products');
  ulTarget.innerHTML = '';
  if (ProductImages.random) {
    ProductImages.duplicateImages = ProductImages.random;
  }
  ProductImages.random = [];
  var randomImage;

  for (var i = 0; i < 3; i++) {

    do {
      randomImage = Math.floor(Math.random() * ProductImages.allProductsArray.length);
    }
    while (ProductImages.duplicateImages.includes(randomImage) || ProductImages.random.includes(randomImage));

    ProductImages.random.push(randomImage);
    ProductImages.allProductsArray[randomImage].render();
    ProductImages.allProductsArray[randomImage].views++;
  }
}




var ulEl = document.getElementById('products');
ulEl.addEventListener('click', productImageClicks);

function checkLocalStorage() {
  if (localStorage.getItem('allProducts')) {
    var parsedAllProducts = JSON.parse(localStorage.getItem('allProducts'));
    // console.log(parsedAllProducts);
    for (var i = 0; i < parsedAllProducts.length; i++) {
      new ProductImages(
        parsedAllProducts[i].name,
        parsedAllProducts[i].imageSrc,
        parsedAllProducts[i].clickCount,
        parsedAllProducts[i].views);
    }
  }
  else {
    new ProductImages('Bag', 'Images/bag.jpg');
    new ProductImages('Banana', 'Images/banana.jpg');
    new ProductImages('Bathroom', 'Images/bathroom.jpg');
    new ProductImages('Boots', 'Images/boots.jpg');
    new ProductImages('Breakfast', 'Images/breakfast.jpg');
    new ProductImages('Bubblegum', 'Images/bubblegum.jpg');
    new ProductImages('Chair', 'Images/chair.jpg');
    new ProductImages('Cthulhu', 'Images/cthulhu.jpg');
    new ProductImages('Dog Duck', 'Images/dog-duck.jpg');
    new ProductImages('Dragon', 'Images/dragon.jpg');
    new ProductImages('Pen', 'Images/pen.jpg');
    new ProductImages('Pet Sweep', 'Images/pet-sweep.jpg');
    new ProductImages('Scissors', 'Images/scissors.jpg');
    new ProductImages('Shark', 'Images/shark.jpg');
    new ProductImages('Sweep', 'Images/sweep.png');
    new ProductImages('TaunTaun', 'Images/tauntaun.jpg');
    new ProductImages('Unicorn', 'Images/unicorn.jpg');
    new ProductImages('USB', 'Images/usb.gif');
    new ProductImages('Water Can', 'Images/water-can.jpg');
    new ProductImages('Wine Glass', 'Images/wine-glass.jpg');

  }

}

// eslint-disable-next-line no-unused-vars
function reload() {
  var promptresult = confirm('Do you want to reset your data?');
  if (promptresult) {
    alert('You have reset your product selection');
    localStorage.clear();
    location.reload();
  }
}

checkLocalStorage();
renderProductImages();
