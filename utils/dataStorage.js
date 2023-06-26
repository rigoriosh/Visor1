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
    consulNotariadoRegistro: "consulNotariadoRegistro",
    unirGeometrias: "unirGeometrias",
    widgetMyResultados: "widgets_MyWidgetResultados_Widget_41",
    widgetMyResultadosPanel: "widgets_MyWidgetResultados_Widget_41_panel",
    widgetAddAtributes: "widgets_AddAtributes_Widget_43",
    widgetAddAtributesPanel: "widgets_AddAtributes_Widget_43_panel",
    notas: {
        consultaSimple: [
            {
                titulo: 'Lo sentimos',
                body: 'Fallo de comunicación con el sistema.'
            },
            {
                titulo: 'Atensión',
                body: 'Recuerda que todos los campos deben estar diligenciados.'
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
    consultas:{
        consultaSimple: 'consultaSimple',
        consultaAvanzada: 'consultaAvanzada',
        edicionCartografica: 'edicionCartografica',
    },
    edicionCartografica: "edicionCartografica",
    GEOMETRIAS:{
        PUNTO:"point",
        LINEA:"polyline",
        POLIGONO:"polygon",
        line:'line'
    }
    
    
}
//console.log("dataStorage", dataStorage);