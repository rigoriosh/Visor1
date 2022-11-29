var dataStorage = {
    departamentos: [],
    municipios: []
};
var consts = {
    avaluosMultiple: "Consulta de avalúos multiple",
    avaluosUnica: "Consulta de avalúos única",
    seleccione: "Seleccione...",
    consulAvaluoMasivo: "consulAvaluoMasivo",
    consulAvaluoUnica: "consulAvaluoUnica",
    consulCatastro: "consulCatastro",
    widgetMyResultados: "widgets_MyWidgetResultados_Widget_41",
    fieldsToRemove: ['OBJECTID_1', 'OBJECTID', 'Shape_Leng', 'Shape', 'Shape.STArea()', 'Shape.STLength()'],
    notas: {
        consultaSimple: [
            {
                titulo: 'Lo sentimos',
                body: 'En estos momentos presentamos inconvenientes en la comunicación con nuestros servidores, por favor intentalo mas tarde.'
            },
            {
                titulo: 'Atensión',
                body: 'Recuerda que todos los campos debes estar completados.'
            }
        ],
        crearGeometrias: [
            {
                titulo: 'Nota',
                body: 'La rotación no aplica para este tipo de geometría.'
            },
            {
                titulo: 'Nota',
                body: 'La edición no aplica para este tipo de geometría.'
            }
        ]
    }


}
console.log("dataStorage", dataStorage);