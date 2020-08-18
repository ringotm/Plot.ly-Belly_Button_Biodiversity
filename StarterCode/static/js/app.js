d3.json('../data/samples.json').then((data) => {
    console.log(data);

    names = data.names;

    console.log(names);

    var select = document.getElementById("selDataset");

    names.forEach((name) => {
        var option = document.createElement("option");
        option.text = name;
        option.value = name;
        var select = document.getElementById("selDataset");
        select.appendChild(option);
    });

    var otuIDS = data.samples[0].otu_ids;
    console.log(otuIDS);

});