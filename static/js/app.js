function buildMetadata(sample) {
  console.log(sample)
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  // Fetch the JSON data and console log it

  url = "http://127.0.0.1:5000/metadata/" + sample
  console.log(url)

  //collect the metadata
  d3.json(url).then(function(data) {
    console.log("The MetaData", data);
  
    Object.entries(data).forEach(([key, value]) => {
      // Log the key and value
     // console.log("object entry");
      //console.log(`Key: ${key} and Value ${value}`);
       metapanel.append('li').text(`${key} : ${value}`);
    });


  });

 
    // Use d3 to select the panel with id of `#sample-metadata`
  metapanel = d3.select("#sample-metadata")

  //see what is already in the panel
  console.log("select panel", metapanel)

    // Use `.html("") to clear any existing metadata
  metapanel.html("");
  
  //check to make sure it's clear
  console.log("clear panel", metapanel)

    // Use `Object.entries` to add each key and value pair to the panel
  /*Object.entries(data2).forEach(([key, value]) => {
    // Log the key and value
    console.log("object entry");
    console.log(`Key: ${key} and Value ${value}`);
  });*/
     // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);*/
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  url = "http://127.0.0.1:5000/samples/" + sample
  console.log(url)

  //collect the data
  data3 = d3.json(url).then(function(data) {
    console.log("The Sample Data", data);

  });
    // @TODO: Build a Bubble Chart using the sample data


 
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
 
        d3.json(url).then(function(data){
            console.log(data.otu_ids.sort(function(a, b){return b - a}).slice(0,10));
            subdata = data.otu_ids.sort(function(a, b){return b - a}).slice(0,10);
            var layout = {title: "Test Pie Chart"}
            Plotly.plot("pie", subdata.otu_ids, layout);
        });


}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
