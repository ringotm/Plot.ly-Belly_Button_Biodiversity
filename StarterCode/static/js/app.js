

function buildPlots(id) {
    d3.json('../data/samples.json').then((data) => {
        console.log(data);

        subjectIDs = data.names;

        console.log(subjectIDs);

        subjectIDs.forEach((id) => {
            var option = document.createElement("option");
            option.text = id;
            option.value = id;
            var select = document.getElementById("selDataset");
            select.appendChild(option);
        });

        var samples = data.samples;
        //var test2 = test1.map(item => item.id);
        //console.log(test1[0].id);
        //console.log(test2);
        //console.log(test1);

        var top10samples = [];
        var top10_otuIDs = [];
        var reversed_samples = [];
        var reversed_otuIDS = [];

        samples.forEach((sample) => {
            if (sample.id === id) {
                //console.log(sample.otu_ids);
                // var otuIDS = sample.otu_ids;
                // var sorted_by_sample_values = sample.sort((a, b) => b.sample_values - a.sample_values);
                // var sample_values_sorted = sample_values.sort((a, b) => b - a);
                top10_samples = sample.sample_values.slice(0, 10).reverse();
                top10_otuIDs = sample.otu_ids.slice(0, 10).map(String).reverse();
                console.log(top10_samples);
                console.log(top10_otuIDs);
                // Slice the first 10 objects for plotting
                //slicedData = sortedByGreekSearch.slice(0, 10);

            }
        });

        var samples_test = samples.filter((sample => sample.id === id));
        console.log(samples_test);
        console.log(top10_samples);
        console.log(top10_otuIDs);
        var trace1 = {
            x: top10_samples,
            y: top10_otuIDs,
            type: "bar",
            orientation: "h"
        };

        var data1 = [trace1];

        var layout = {
            yaxis: { type: 'category' }
        };

        Plotly.newPlot("bar", data1, layout);


        //var otuIDS = data.samples[`$`].otu_ids;
        //console.log(otuIDS);

    })
};

function optionChanged(selection) {
    // d3.event.preventDefault();

    var id = selection;
    console.log(id);
}

