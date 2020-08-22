


d3.json('samples.json').then((data) => {
    console.log(data);

    subjectIDs = data.names;

    //console.log(subjectIDs);

    subjectIDs.forEach((id) => {
        var option = document.createElement("option");
        option.text = id;
        option.value = id;
        var select = document.getElementById("selDataset");
        select.appendChild(option);
    });

    function buildInitPlot() {
        first_row_samples = data.samples[0];
        first_row_metadata = data.metadata[0];
        //console.log(first_row_samples);

        first_row_sample_values = first_row_samples.sample_values;
        first_row_otuIDs = first_row_samples.otu_ids;
        first_row_labels = first_row_samples.otu_labels;

        first_row_top10_sample_values = first_row_sample_values.slice(0, 10).reverse();
        first_row_top10_otuIDs = first_row_otuIDs.slice(0, 10).map(String).reverse();
        first_row_top10_labels = first_row_labels.slice(0, 10).map(String).reverse();

        var trace1 = {
            x: first_row_top10_sample_values,
            y: first_row_top10_otuIDs,
            text: first_row_top10_labels,
            type: "bar",
            orientation: "h"
        };

        var trace2 = {
            x: first_row_otuIDs,
            y: first_row_sample_values,
            text: first_row_top10_labels,
            mode: 'markers',
            marker: {
                color: first_row_otuIDs,
                colorscale: 'YlGnBu',
                size: first_row_sample_values,
                sizeref: 1.5,
                sizemode: 'radius'
            }
        };

        var data1 = [trace1];

        var data2 = [trace2];

        var data3 = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: first_row_metadata.wfreq,
                title: { text: 'Washes per Week' },
                type: 'indicator',
                mode: 'gauge+number',
                gauge: {
                    axis: { range: [0, 9] },
                    bar: { color: '#1F77B4' }
                }
            }
        ];

        var layout1 = {
            yaxis: {
                type: 'category',
                title: 'OTU ID'
            },
            xaxis: {
                title: 'Sample Value'
            }
        };

        var layout2 = {
            yaxis: {
                title: 'Sample Value'
            },
            xaxis: {
                title: 'OTU ID'
            }
        };



        Plotly.newPlot("bar", data1, layout1);
        Plotly.newPlot('bubble', data2, layout2);
        Plotly.newPlot('gauge', data3);

        //first_row_metadata = data.metadata[0];
        //console.log(first_row_metadata);
        panel = d3.select("#sample-metadata");
        new_list = panel.append('ul');
        //console.log(new_list);
        Object.entries(first_row_metadata).forEach(([key, value]) => {
            //console.log(key, value);
            new_div = panel.append('div');
            new_div.text(`${key}:  ${value}`);

        });


    };

    buildInitPlot();

    //function optionChanged(id) {
    //var selection = d3.select("#selDataset");
    // var id = selection.node().value;

    //    var samples = data.samples;
    //    var current_samples = samples.filter((sample => sample.id === id));
    //     console.log(current_samples);
    // };






});

function buildPlot(id) {
    d3.json('samples.json').then(function (data) {

        filtered_samples = data.samples.filter(sample => sample.id === id);
        filtered_metadata = data.metadata.filter(item => item.id == id);
        filtered_labels = filtered_samples[0].otu_labels;
        filtered_wfreq = filtered_metadata[0].wfreq;
        console.log(filtered_labels);
        console.log(filtered_samples);
        console.log(filtered_metadata);
        console.log(filtered_wfreq);
        console.log(data.metadata);

        sample_values = filtered_samples[0].sample_values;
        otuIDs = filtered_samples[0].otu_ids;
        console.log(sample_values);

        top10_sample_values = sample_values.slice(0, 10).reverse();
        top10_otuIDs = otuIDs.slice(0, 10).map(String).reverse();

        var trace1 = {
            x: top10_sample_values,
            y: top10_otuIDs,
            text: filtered_labels,
            type: "bar",
            orientation: "h"
        };

        var trace2 = {
            x: otuIDs,
            y: sample_values,
            text: filtered_labels,
            mode: 'markers',
            marker: {
                color: otuIDs,
                colorscale: 'YlGnBu',
                size: sample_values,
                sizeref: 1.5,
                sizemode: 'radius'
            }
        };

        var data1 = [trace1];

        var data2 = [trace2];

        var data3 = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: filtered_wfreq,
                title: { text: 'Washes per Week' },
                type: 'indicator',
                mode: 'gauge+number',
                colorscale: 'YlGnBu',
                gauge: {
                    axis: { range: [0, 9] },
                    bar: { color: '#1F77B4' }
                }
            }
        ];

        var layout1 = {
            yaxis: {
                type: 'category',
                title: 'OTU ID'
            },
            xaxis: {
                title: 'Sample Value'
            }
        };

        var layout2 = {
            yaxis: {
                title: 'Sample Value'
            },
            xaxis: {
                title: 'OTU ID'
            }
        };

        Plotly.newPlot("bar", data1, layout1);
        Plotly.newPlot('bubble', data2, layout2);
        Plotly.newPlot('gauge', data3);

        filtered_metadata = data.metadata.filter(item => item.id == id);
        console.log(filtered_metadata[0].wfreq);
        panel = d3.select("#sample-metadata");
        panel.html("");
        //new_list = panel.append('ul');
        console.log(new_list);

        Object.entries(filtered_metadata[0]).forEach(([key, value]) => {
            console.log(key, value);
            new_div = panel.append('div');
            new_div.text(`${key}:  ${value}`);




        });
    });
};

function optionChanged(sel) {
    buildPlot(sel);
};




