// Creado por Digital House Schools para demostrar uso de Hojas de Cálculo como fuente de datos para páginas web simples.

function doGet(e) {

  var miArchivo = SpreadsheetApp.getActiveSpreadsheet();
  var nombreArchivo = miArchivo.getName();
  var hojasDelArchivo = miArchivo.getSheets();
  var nombresHojas = hojasDelArchivo.map(hoja => hoja.getName());

  var hojaConsultar = hojasDelArchivo[0];
  var nombreHojaConsultar = nombresHojas[0];

  var cantidadColumnas = hojaConsultar.getLastColumn();
  var cantidadFilas = hojaConsultar.getLastRow()-1;

  var encabezadosColumnas = hojaConsultar.getRange(1,1,1,cantidadColumnas).getValues()[0];
  var datosCrudos = hojaConsultar.getRange(2, 1, cantidadFilas, cantidadColumnas).getValues();

  // Mapear arrays de objetos simples a un array de objetos

  var misDatos = datosCrudos.map((fila) =>
    encabezadosColumnas.reduce((o, h, j) => Object.assign(o, { [h]: fila[j] }), {})
  );

  var respuesta = {
    nombreArchivo: nombreArchivo,
    nombresHojas: nombresHojas,
    hojaConsultada: nombreHojaConsultar,
    cantidadFilas: cantidadFilas,
    cantidadColumnas: cantidadColumnas,
    datos: misDatos
  };

  console.log(respuesta);

  return ContentService.createTextOutput(JSON.stringify(respuesta)).setMimeType(ContentService.MimeType.JSON);

}
