function results() {
  var ctx = document.getElementById('results').getContext('2d');

  var parsedImageName = JSON.parse(localStorage.getItem('imageName'));
  var parsedClickedTotal = JSON.parse(localStorage.getItem('clickTotal'));
  var parsedViewedTotal = JSON.parse(localStorage.getItem('viewTotal'));


  // eslint-disable-next-line no-undef
  new Chart(ctx, {

    type: 'bar',

    data: {
      labels: parsedImageName,
      datasets: [
        {
          label: 'Product Clicks',
          backgroundColor: 'rgb(255, 99, 132, 0.4)',
          borderColor: 'rgb(255, 99, 132)',
          data: parsedClickedTotal
        },
        {
          label: 'Product Views',
          backgroundColor: 'rgb(30, 99, 132, 0.4)',
          borderColor: 'rgb(30, 99, 132)',
          data: parsedViewedTotal
        }
      ]
    },

    options: {}
  }
  );

}

results();
