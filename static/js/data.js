var DataFrame = dfjs.DataFrame;

function year() {
  //Fetch new data each time a new sample is selected
  console.log('I am here')
  var year = d3.select("#selDataset").property("value")
  d3.json("/byRace", function (dataSet) {
    // console.log(dataSet)
    buildCharts(dataSet, year);
  })
}

function buildDtaSet(dataSet, yearToBeFiltered) {
  console.log("inside buildDataSet " + yearToBeFiltered)
  //console.log("Dataset")
  //console.log(dataSet)
  // From a collection (easier)
  //  var column1 = Object.entries(dataSet.year.values)
  var year = Object.values(dataSet.year);
  var categoryindex = Object.values(dataSet.categoryindex);
  var median_weekly_earnings = Object.values(dataSet.median_weekly_earnings);
  // console.log(year)
  // console.log(categoryindex)
  // console.log(median_weekly_earnings)

  // From a dictionnary (Hash)
  var raceDataFilteredByYear = new DataFrame(
    {
      year: year,
      categoryindex: categoryindex,
      median_weekly_earnings: median_weekly_earnings
    },
    ['year', 'categoryindex', 'median_weekly_earnings']
  ).filter(row => row.get("year") === parseInt(yearToBeFiltered, 10))
  console.log(raceDataFilteredByYear)
  return raceDataFilteredByYear;

}

function buildCharts(dataSet, year) {
  console.log("Inside buildCharts")
  console.log(dataSet)
  //console.log(Object.entries(dataSet.categoryindex))

  var filterdData = buildDtaSet(dataSet, year)
  var menData = {}
  var womenData = {}
  var totalData = {}
  var dataPoints = {}

  var filterdCollection = filterdData.toCollection()
  // console.log("filterdCollection")
  // console.log(filterdCollection)

  for (var i = 0; i < filterdCollection.length; i++) {

    var temp = filterdCollection[i]
    // console.log("temp")
    // console.log(temp)
    var value = temp["categoryindex"]
    if (temp["categoryindex"].includes("Total_Men")) {
      dataPoints[value] = temp["median_weekly_earnings"] //dataSet.median_weekly_earnings[`${key}`];
    }
    if (temp["categoryindex"].includes("Total_Women")) {
      dataPoints[value] = temp["median_weekly_earnings"] // dataSet.median_weekly_earnings[`${key}`];
    }

    if (temp["categoryindex"].includes("_Men")) {
      menData[value] = temp["median_weekly_earnings"] // dataSet.median_weekly_earnings[`${key}`]

    }
    else if (temp["categoryindex"].includes("_Women")) {
      womenData[value] = temp["median_weekly_earnings"] // dataSet.median_weekly_earnings[`${key}`]
    }
    else {
      //console.log(temp)
      totalData[value] = temp["median_weekly_earnings"] // dataSet.median_weekly_earnings[`${key}`]
    }
  };

  // console.log("womenData")
  // console.log(womenData)

  var Categories = Object.keys(totalData)
  var menEarnings = Object.values(menData)
  // var womenCategories = Object.keys(womenData)
  var womenEarnings = Object.values(womenData)
  var trace1 = {
    x: Categories,
    y: menEarnings,
    //text: ratio_2016,
    marker: {
      color: 'rgb(158,202,225)',
      opacity: 0.6,
      line: {
        color: 'rgb(8,48,107)',
        width: 1.5
      }
    },
    name: 'Men',
    type: 'bar'
  };
  var trace2 = {
    x: Categories,
    y: womenEarnings,
    //text: ratio_2016,
    marker: {
      color: 'rgb(255,153,255)',
      opacity: 0.6,
      line: {
        color: 'rgb(8,48,107)',
        width: 1.5
      }
    },
    name: 'Women',
    type: 'bar'
  };

  var data = [trace1, trace2];

  var layout = {
    barmode: 'group',
    title: 'Gender Pay Gap By Race',
    width: 800,
    height: 500,
    xaxis: {
      tickfont: {
        size: 14,
        color: 'rgb(107, 107, 107)'
      }
    },
    yaxis: {
      title: 'Weekly Earnings Median (USD)',
      titlefont: {
        size: 16,
        color: 'rgb(107, 107, 107)'
      },
      tickfont: {
        size: 14,
        color: 'rgb(107, 107, 107)'
      }
    },

    barmode: 'group',
    bargap: 0.15,

  };

  Plotly.newPlot('byracebar', data, layout);
  //#########################################
 
};

 // Pie chart
 function createDonutsCharts(dataSet, year) {

 // set the dimensions and margins of the graph
 var filterdData = buildDtaSet(dataSet, year)
 var filterdCollection = filterdData.toCollection()
 var dataPoints = {}
 for (var i = 0; i < filterdCollection.length; i++) {
   var temp = filterdCollection[i]
   var value = temp['categoryindex']
   if (temp['categoryindex'].includes('Total_Men')) {
     dataPoints[value] = temp['median_weekly_earnings'] //dataSet.median_weekly_earnings[${key}];
   }
   if (temp['categoryindex'].includes('Total_Women')) {
     dataPoints[value] = temp['median_weekly_earnings']
   }
 };



  // set the dimensions and margins of the graph
  var width = 450
  var height = 450
  var margin = 40
  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin
  console.log(dataPoints)
  var svg = d3.select("#byracepie")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  var color = d3.scaleOrdinal()
    .domain(dataPoints)
    .range(["#9ecae1", "#ff99ff"])
  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .value(function (d) {
      console.log("pie value : " + d.value)
      return d.value;
    })
  var arc = d3.arc().innerRadius(radius * 0.9).outerRadius(radius * 0.6);

  var outerArc = d3.arc()
    .outerRadius(radius * 0.5)
    .innerRadius(radius * 0.5);



  var data_ready = pie(d3.entries(dataPoints))
  console.log(data_ready)

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll('whatever')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function (d) {
      console.log("fill color : ")
      console.log(d.data.key)
      return (color(d.data.key))
    })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
  svg.append('g').classed('labels', true);


  //   })
  var label = svg.select('.labels').selectAll('text')
    .data(data_ready)
    .enter().append('text')
    .attr('dy', '.45em')
    .html(function (d) {
      return d.data.key;
    })
    .attr('transform', function (d) {
      var pos = outerArc.centroid(d);
      pos[1] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
      return 'translate(' + pos + ')';
    })
    .style('text-anchor', function (d) {
      return (midAngle(d)) < Math.PI ? 'start' : 'end';
    });

  svg.append('text')
    .attr('class', 'toolCircle')
    .attr('dy', 15)
    .html('Earnings by Gender')
    .style('font-size', '.9em')
    .style('text-anchor', 'middle');

  function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }

  }

function init() {

  // d3.json("/byEducation").then((education) => {
  d3.json("/byEducation", function (education) {

    var category = Object.keys(education.education_level).map(item => education.education_level[item]);
    // //Ploting the graph for 2016
    //   var earnings_2016 = Object.keys(education.median_weekly_earnings_in_2016).map(item => education.median_weekly_earnings_in_2016[item]);
    //   var ratio_2016 = getRatio(earnings_2016)
    //   // console.log(array)
    //   var trace1 = {
    //     x: category.slice(0,9),
    //     y: earnings_2016.slice(0,9),
    //     marker: {
    //       color: 'skyblue'
    //     },
    //     name: 'Men',
    //     type: 'bar'
    //   };

    //   var trace2 = {
    //     x: category.slice(0,9),
    //     y: earnings_2016.slice(9),
    //     text: ratio_2016,
    //     marker: {
    //       color: 'red'
    //     },
    //     name: 'Women',
    //     type: 'bar'
    //   };

    //   var data = [trace1, trace2];

    //   var layout = {
    //     barmode: 'group',
    //     title: 'Weekly earnings by education level in 2016',
    //     font:{
    //           family: 'Raleway, sans-serif'
    //          },
    // };

    //   Plotly.newPlot('graph_2016', data, layout);

    //   //Ploting the graph for 2017
    //   var category_2017 = Object.keys(education.education_level).map(item => education.education_level[item]);
    //   var earnings_2017 = Object.keys(education.median_weekly_earnings_in_2017).map(item => education.median_weekly_earnings_in_2017[item]);
    //   var ratio_2017 = getRatio(earnings_2017)
    //   // console.log(xArray_2017)
    //   var men_trace_2017 = {
    //     x: category_2017.slice(0,9),
    //     y: earnings_2017.slice(0,9),
    //     marker: {
    //       color: 'skyblue'
    //     },
    //     name: 'Men',
    //     type: 'bar'
    //   };

    //   var women_trace_2017 = {
    //     x: category_2017.slice(0,9),
    //     y: earnings_2017.slice(9),
    //     text: ratio_2017,
    //     marker: {
    //       color: 'red'
    //     },
    //     name: 'Women',
    //     type: 'bar'
    //   };

    //   var data1 = [men_trace_2017, women_trace_2017];
    //   var layout_2017 = {
    //     barmode: 'group',
    //     title: 'Weekly earnings by education level in 2017',
    //     font:{
    //           family: 'Raleway, sans-serif'
    //          },
    // };

    //   Plotly.newPlot('graph_2017', data1, layout_2017);

    //Ploting the graph for 2018
    var category_2018 = Object.keys(education.education_level).map(item => education.education_level[item]);
    var earnings_2018 = Object.keys(education.median_weekly_earnings_in_2018).map(item => education.median_weekly_earnings_in_2018[item]);
    var ratio_2018 = getRatio(earnings_2018)

    var men_trace_2018 = {
      x: category_2018.slice(0, 9),
      y: earnings_2018.slice(0, 9),
      marker: {
        color: 'rgb(158,202,225)'
      },
      name: 'Men',
      type: 'bar'
    };

    var women_trace_2018 = {
      x: category_2018.slice(0, 9),
      y: earnings_2018.slice(9),
      text: ratio_2018,
      marker: {
        color: 'rgb(255,153,255)'
      },
      name: 'Women',
      type: 'bar'
    };

    var data2 = [men_trace_2018, women_trace_2018];
    var layout_2018 = {
      barmode: 'group',
      title: 'Weekly earnings by education level in 2018',
      font: {
        family: 'Raleway, sans-serif'
      },
    };

    Plotly.newPlot('graph_2018', data2, layout_2018);
  });
  // });

  function getRatio(data) {
    var ratio = [];
    for (i = 0; i < 9; i++) {

      // console.log(data[i])
      ratio.push('Ratio: ' + parseFloat(data[9 + i] / data[i]).toFixed(2));
    }
    // console.log(ratio)
    return ratio
  }

  // Browser
  var dataSet = d3.json("/byRace", function (dataSet) {
    var allYears = Object.values(dataSet.year)
    var yearValues = [...new Set(allYears)];
    console.log(yearValues[0]);
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
    yearValues.forEach((year) => {

      selector
        .append("option")
        .text(year)
        .property("value", year);
    });
    // buildMetaData(yearValues[0])
    buildCharts(dataSet, yearValues[0])
    createDonutsCharts(dataSet, yearValues[0])

  });

}

// Initialize the dashboard
init();