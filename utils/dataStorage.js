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
    widgetMyResultadosPanel: "widgets_MyWidgetResultados_Widget_41_panel",
    notas: {
        consultaSimple: [
            {
                titulo: 'Lo sentimos',
                body: 'Fallo de comunicación del sistema.'
            },
            {
                titulo: 'Atensión',
                body: 'Recuerda que todos los campos debes estar diligenciados.'
            },
            {
                titulo: '!Hola',
                body: 'No se encontraron resultados para esta busqueda'
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
    },
    consultaSimple:{
        consultaSimple: 'consultaSimple'
    }


}
console.log("dataStorage", dataStorage);