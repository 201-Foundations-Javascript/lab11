'use strict';



var allProductsArray = [];
var rounds = 25;

function ProductImages(name, imageSrc) {
    this.clickCount = 0;
    this.name = name;
    this.imageSrc = imageSrc;
    this.views = 0;
    allProductsArray.push(this);
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
    if(totalCliclsPerImage < rounds) {
        totalCliclsPerImage++;
        
        for(var i = 0; i < allProductsArray.length; i++) {
            if(event.target.id === allProductsArray[i].name){
                allProductsArray[i].clickCount++
            }
        
        }
        renderProductImages();
      
    }
    if(totalCliclsPerImage === rounds) {
        var ulTarget = document.getElementById('products');
        ulTarget.innerHTML = '';
        var ctx = document.getElementById('results').getContext('2d');
        var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {}
});
       
        // for (var j = 0; j < allProductsArray.length; j++) {
        //     var ulTarget = document.getElementById('results');
        //     var createH1 = document.createElement('h1');
        //     var createTotalViews = document.createElement('li');
        //     var createTotalClicks = document.createElement('li');

        //     createTotalViews.textContent = 'Total Views: ' + allProductsArray[j].views;
        //     createTotalClicks.textContent = 'Total Clicks: ' + allProductsArray[j].clickCount;
        //     createH1.textContent = allProductsArray[j].name;
        //     ulTarget.appendChild(createH1);
        //     ulTarget.appendChild(createTotalViews);
        //     ulTarget.appendChild(createTotalClicks);
        // }
    }
}
ProductImages.random = [];

function renderProductImages() {
    // debugger;
    console.log('starting render');
    var ulTarget = document.getElementById('products');
    ulTarget.innerHTML = '';
    var left = Math.floor(Math.random() * allProductsArray.length);
    
    do {
        var center = Math.floor(Math.random() * allProductsArray.length);
    }
    while(left === center); 
    console.log(left, center);
    ProductImages.random.push(center);
    ProductImages.random.push(left);
    
    do {
        var right = Math.floor(Math.random() * allProductsArray.length);
    }
    while(right === center || right === left); 
    
    ProductImages.random.push(right);
    
    
    for(var i = 0; i < 3; i++) {
        // console.log(ProductImages.random[i]);
        allProductsArray[ProductImages.random[i]].render();
    allProductsArray[ProductImages.random[i]].views++;
}
}

var ulEl = document.getElementById('products');
ulEl.addEventListener('click', productImageClicks);

new ProductImages('Bag', 'Images/bag.jpg');
new ProductImages('Banana', 'Images/banana.jpg');
new ProductImages('Bathroom', 'Images/bathroom.jpg');
new ProductImages('Boots', 'Images/boots.jpg');
new ProductImages('Breakfast', 'Images/breakfast.jpg');
new ProductImages('Bubblegum', 'Images/bubblegum.jpg');
// new ProductImages('Chair', 'Images/chair.jpg');
// new ProductImages('Cthulhu', 'Images/cthulhu.jpg');
// new ProductImages('Dog Duck', 'Images/dog-duck.jpg');
// new ProductImages('Dragon', 'Images/dragon.jpg');
// new ProductImages('Pen', 'Images/pen.jpg');
// new ProductImages('Pet Sweep', 'Images/pet-sweep.jpg');
// new ProductImages('Scissors', 'Images/scissors.jpg');
// new ProductImages('Shark', 'Images/shark.jpg');
// new ProductImages('Sweep', 'Images/sweep.png');
// new ProductImages('TaunTaun', 'Images/tauntaun.jpg');
// new ProductImages('Unicorn', 'Images/unicorn.jpg');
// new ProductImages('USB', 'Images/usb.gif');
// new ProductImages('Water Can', 'Images/water-can.jpg');
// new ProductImages('Wine Glass', 'Images/wine-glass.jpg');


renderProductImages();
