function init() {

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
      console.log(sampleNames)

      var array = Object.keys(sampleNames.education_level).map(item => sampleNames.education_level[item]);
      var array_1 = Object.keys(sampleNames.median_weekly_earnings_in_2016).map(item => sampleNames.median_weekly_earnings_in_2016[item]);
      var ratio_2016 = getRatio(array_1)
      console.log(array)
      var trace1 = {
        x: array.slice(0,9),
        y: array_1.slice(0,9),
        text: ratio_2016,
        name: 'Men',
        type: 'bar'
      };
      
      var trace2 = {
        x: array.slice(0,9),
        y: array_1.slice(9),
        text: ratio_2016,
        name: 'Women',
        type: 'bar'
      };
      
      var data = [trace1, trace2];
      
      var layout = {barmode: 'group'};
        
      Plotly.newPlot('myDiv', data, layout);
    });

function getRatio (data) {
  var ratio = [];
  for (i = 0; i<9; i++) {
  
  // console.log(data[i])
  ratio.push(parseFloat(data[9+i]/data[i]).toFixed(2));
  }
  console.log(ratio)
  return ratio
}

}

// Initialize the dashboard
init();