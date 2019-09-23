function buildMetadata(sample) {
    // @TODO: Complete the following function that builds the metadata panel
  
    // Use `d3.json` to fetch the metadata for a sample
      var sampleDict =d3.json(`/metadata/${sample}`).then(function(sample){
      // Use d3 to select the panel with id of `#sample-metadata`
      var dataPanel = d3.select("#sample-metadata")/*.node().value*/;
      // Use `.html("") to clear any existing metadata
      dataPanel.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(sample).forEach(function([key, value]) {
        var row = dataPanel.append('p');
        row.text(`${key}:${value}`)
      })
    });
  
      // BONUS: Build the Gauge Chart
      // buildGauge(data.WFREQ);
  }
  
  function buildCharts(sample) {
    console.log("buildCharts")
  
    // @TODO: Use `d3.json` to fetch the sample data for the plots
    // Plot the default route once the page loads
    var defaultURL = "/samples/" + sample;
  
       // @TODO: Build a Pie Chart
      d3.json(defaultURL).then(function(data) {
      //   var data1 = {
      //     "values": data.otu_ids,
      //     "labels": data.sample_values,
      //     "hoverinfo": data.otu_labels,
      //     "type": "pie"    
      //  }
      // Define pie chart properties. HINT: You will need to use slice() to grab the top 10 sample_values,
      // otu_ids, and labels (10 each).
        var values = data.sample_values.slice(0, 10);
        var labels = data.otu_ids.slice(0, 10);
        var hoverinfo = data.otu_labels.slice(0, 10);
  
        var data1 = {
              "values": values,
              "labels": labels,
              "hoverinfo": hoverinfo,
              "type": "pie"    
           }
        var layout = { title: "Top 10 samples"};
        Plotly.newPlot("pie", [data1], layout);
  
       // @TODO: Build a Bubble Chart using the sample data
       console.log(data.otu_ids)
      //  var xAxis = data.sample_values;
      //  var yAxis = data.otu_ids;
       var xAxis = data.otu_ids;
       var yAxis = data.sample_values;
       var size = data.sample_values;
       console.log(xAxis);
       console.log(yAxis); 
       var data2 = {
          "x": xAxis,
          "y": yAxis,
          "text": data.otu_labels,
          "mode": "markers",
          "marker": {
            color: data.otu_ids,
            size: size,
            symbol: 'circle'
          },          
          "type": "scatter"   
        };
        var layout = {title: "Belly Button Bacteria"}
        Plotly.newPlot("bubble", [data2], layout);
      });
  
  }
  
  function init() {
    // Grab a reference to the dropdown select element
    // var selector = d3.select("#selDataset");
    console.log("a")
    console.log(Plotly)
    console.log("b")
    var trace1 = {
      x: ['giraffes', 'orangutans', 'monkeys'],
      y: [20, 14, 23],
      name: 'SF Zoo',
      type: 'bar'
    };
    
    var trace2 = {
      x: ['giraffes', 'orangutans', 'monkeys'],
      y: [12, 18, 29],
      name: 'LA Zoo',
      type: 'bar'
    };
    
    var data = [trace1, trace2];
    
    var layout = {barmode: 'group'};
    
    Plotly.newPlot('myDiv', data, layout);
    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
        console.log(sampleNames)
      });

 
      // Use the first sample from the list to build the initial plots
    //   const firstSample = sampleNames[0];
    //   buildCharts(firstSample);
    //   // buildMetadata(firstSample);
    // });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();