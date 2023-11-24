require([
    "esri/layers/FeatureLayer",
    "esri/dijit/FeatureTable",
    "dojo/dom",
    "dojo/parser",
    "dojo/ready",
], function (
    FeatureLayer, FeatureTable,
    dom, parser, ready
) {

    parser.parse();

    ready(function () {
        console.log(">>> TablaResultadoSae:ready.." );
        // Create the feature layer
        var myFeatureLayerSae = new esri.layers.FeatureLayer("https://sae.igac.gov.co/arcgis/rest/services/SAE/PREDIOS_SAE/MapServer/38", {
            mode: FeatureLayer.MODE_ONDEMAND,
            //outFields: ["", "", "", "", ""],
            outFields: ["*"],
            visible: true,
            id: "fLayerSae"
        });

        myTableSae = new esri.dijit.FeatureTable({
            featureLayer: myFeatureLayerSae,
            showGridMenu: false,
            //hiddenFields: ["", "", ""]  // field that end-user can show, but is hidden on startup
        }, "myTableNodeSae");

        myTableSae.startup();

    });
});