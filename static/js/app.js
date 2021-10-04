// create init function to build inital plot when refreshed
function init(){
    buildPlot()
};

//create function that will apply once the option has changed
function optionChanged() {
    // Build the revised plot
    buildPlot();
  };

//create a function that builds plot
function buildPlot(){

    d3.json("data/samples.json").then((data) =>{
        //get a list of all the id names
        var idValues = data.names;
        console.log(idValues);

        // Create the drop down menu by inserting every id
        idValues.forEach(id => d3.select('#selDataset').append('option').text(id).property("value", id));

        // Use D3 to select the current ID and store in a variable to work with
        var currentID = d3.selectAll("#selDataset").node().value;
        console.log(currentID);

        //filter the data based on selection
        filtered = data.samples.filter(entry => entry.id == currentID);
        console.log(filtered);

                // create the demographics panel
        filterData2 = data.metadata.filter(entry => entry.id == currentID)

        // create a demographics object to add to panel body
        var panelDemo = {
            'id: ': filterData2[0].id,
            'ethnicity: ': filterData2[0].ethnicity,
            'gender: ': filterData2[0].gender,
            'age: ': filterData2[0].age,
            'location: ': filterData2[0].location,
            'bbtype: ': filterData2[0].bbtype,
            'wfreq: ': filterData2[0].wfreq
            }
        
        console.log(panelDemo)    
        //select the id to append the key value pair under demographics panel
        panelBody = d3.select("#sample-metadata")
      
        // remove the current demographic info to make way for new currentID
        panelBody.html("")
              
        //append the key value pairs from demographics into the demographics panel
        Object.entries(panelDemo).forEach(([key, value]) => {
            panelBody.append('p').attr('style', 'font-weight: bold').text(key + value)
            });
        //testing for x values
        console.log(filtered[0].sample_values);
        console.log(filtered[0].sample_values.slice(0,10));
    
        //y vales test
        console.log(filtered[0].otu_ids.slice(0,10).reverse());
        console.log(filtered[0].otu_ids.slice(0,10).reverse().map(id => "OTU " + id.toString()));

        // horizontal bar chart
        var data = [{
            type: 'bar',
            x: filtered[0].sample_values.slice(0,10).reverse(),
            y: filtered[0].otu_ids.slice(0,10).reverse().map(id => "OTU " + id.toString()),
            orientation: 'h'
        }];
      
      Plotly.newPlot('bar', data);

    });





    // bubble chart
    var trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 11, 12, 13],
        text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
        mode: 'markers',
        marker: {
          size: [400, 600, 800, 1000],
          sizemode: 'area'
        }
      };
      
      var trace2 = {
        x: [1, 2, 3, 4],
        y: [14, 15, 16, 17],
        text: ['A</br>size: 40</br>sixeref: 0.2', 'B</br>size: 60</br>sixeref: 0.2', 'C</br>size: 80</br>sixeref: 0.2', 'D</br>size: 100</br>sixeref: 0.2'],
        mode: 'markers',
        marker: {
          size: [400, 600, 800, 1000],
          //setting 'sizeref' to lower than 1 decreases the rendered size
          sizeref: 2,
          sizemode: 'area'
        }
      };
      
      var trace3 = {
        x: [1, 2, 3, 4],
        y: [20, 21, 22, 23],
        text: ['A</br>size: 40</br>sixeref: 2', 'B</br>size: 60</br>sixeref: 2', 'C</br>size: 80</br>sixeref: 2', 'D</br>size: 100</br>sixeref: 2'],
        mode: 'markers',
        marker: {
          size: [400, 600, 800, 1000],
          //setting 'sizeref' to less than 1, increases the rendered marker sizes
          sizeref: 0.2,
          sizemode: 'area'
        }
      };
      
      // sizeref using above forumla
      var desired_maximum_marker_size = 40;
      var size = [400, 600, 800, 1000];
      var trace4 = {
        x: [1, 2, 3, 4],
        y: [26, 27, 28, 29],
        text: ['A</br>size: 40</br>sixeref: 1.25', 'B</br>size: 60</br>sixeref: 1.25', 'C</br>size: 80</br>sixeref: 1.25', 'D</br>size: 100</br>sixeref: 1.25'],
        mode: 'markers',
        marker: {
          size: size,
          //set 'sizeref' to an 'ideal' size given by the formula sizeref = 2. * max(array_of_size_values) / (desired_maximum_marker_size ** 2)
          sizeref: 2.0 * Math.max(...size) / (desired_maximum_marker_size**2),
          sizemode: 'area'
        }
      };
      
      var data = [trace1, trace2, trace3, trace4];
      
      var layout = {
        title: 'Bubble Chart Size Scaling',
        showlegend: false,
        height: 600,
        width: 600
      };
      
      Plotly.newPlot('bubble', data, layout);  


      var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: 450,
          title: { text: "Speed" },
          type: "indicator",
          mode: "gauge+number+delta",
          delta: { reference: 380 },
          gauge: {
            axis: { range: [null, 500] },
            steps: [
              { range: [0, 250], color: "lightgray" },
              { range: [250, 400], color: "gray" }
            ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: 490
            }
          }
        }
      ];
      
        var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);
 

};

//run init to  set the main page
init();