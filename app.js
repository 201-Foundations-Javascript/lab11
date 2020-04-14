'use strict';



ProductImages.allProductsArray = [];
ProductImages.rounds = 25;

function ProductImages(name, imageSrc) {
    this.clickCount = 0;
    this.name = name;
    this.imageSrc = imageSrc;
    this.views = 0;
    ProductImages.allProductsArray.push(this);
}

ProductImages.prototype.render = function() {
    var ulTarget = document.getElementById('products');
    var createLi = document.createElement('li');
    var createPElement = document.createElement('p');
    var createImage = document.createElement('img');
    
    createPElement.textContent = 'Total Clicks for this product: ' + this.clickCount;
    createImage.src = this.imageSrc;
    createImage.id = this.name;

    createLi.appendChild(createImage);
    createLi.appendChild(createPElement);
    ulTarget.appendChild(createLi);
}

var totalCliclsPerImage = 0;

function productImageClicks (event) {
    if(totalCliclsPerImage < ProductImages.rounds) {
        totalCliclsPerImage++;
        
        for(var i = 0; i < ProductImages.allProductsArray.length; i++) {
            if(event.target.id === ProductImages.allProductsArray[i].name){
                ProductImages.allProductsArray[i].clickCount++
            }
        
        }
        renderProductImages();
      
    }
    if(totalCliclsPerImage === ProductImages.rounds) {
        var ulTarget = document.getElementById('products');
        ulTarget.innerHTML = '';
        var ctx = document.getElementById('results').getContext('2d');

        var imageName = [];

        for(i = 0; i < ProductImages.allProductsArray.length; i++){
            imageName.push(ProductImages.allProductsArray[i].name);
        }

        var clickTotal = [];

        for(i = 0; i < ProductImages.allProductsArray.length; i++){
            clickTotal.push(ProductImages.allProductsArray[i].clickCount);
        }

        var viewTotal = [];

        for(i = 0; i < ProductImages.allProductsArray.length; i++){
            viewTotal.push(ProductImages.allProductsArray[i].views);
        }


        var chart = new Chart(ctx, {

    type: 'bar',

    data: {
        labels: imageName,
        datasets: [
            {
          label: 'Product Clicks',
          backgroundColor: 'rgb(255, 99, 132, 0.4)',
          borderColor: 'rgb(255, 99, 132)',
          data: clickTotal
        },
        {
          label: 'Product Views',
          backgroundColor: 'rgb(30, 99, 132, 0.4)',
          borderColor: 'rgb(30, 99, 132)',
          data: viewTotal
        }
    ]
      },

    options: {}
}
);

    }
}
ProductImages.random = [];
ProductImages.duplicateImages = [];
function renderProductImages() {
    // debugger;
    var ulTarget = document.getElementById('products');
    ulTarget.innerHTML = '';
    if(ProductImages.random){
        ProductImages.duplicateImages = ProductImages.random;
    }
    ProductImages.random = [];
    var randomImage; 
    
    for(var i = 0; i < 3; i++) {
        do {
            randomImage = Math.floor(Math.random() * ProductImages.allProductsArray.length);
        }
        while(ProductImages.duplicateImages.includes(randomImage) || ProductImages.random.includes(randomImage))
        
        ProductImages.random.push(randomImage);
        ProductImages.allProductsArray[randomImage].render();
        ProductImages.allProductsArray[randomImage].views++
    }
    console.log(ProductImages.random);
    console.log(ProductImages.duplicateImages);
}


var ulEl = document.getElementById('products');
ulEl.addEventListener('click', productImageClicks);

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


renderProductImages();
