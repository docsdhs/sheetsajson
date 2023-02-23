# sheetsajson
<p>Extracto de código que permite configurar un endpoint de consulta de datos para cualquier Hoja de Cálculo de Google.</p>

<p>Simplemente debes copiar los contenidos del archivo codigo.gs a un Proyecto de Apps Script vinculado a tu Hoja de Cálculo e "Implementarlo" como "Aplicación Web" (debe poder ser ejecutada por "Cualquier Usuario").</p>

<p>La consulta simple a la URL generada devolverá un JSON con la siguiente estructura:</p>
<ul>
  <li>nombreArchivo: Nombre del Archivo Consultado</li>
  <li>hojasArchivo: Array de nombres de hojas que contiene el archivo</li>
  <li>hojaConsultada: Hoja de la cual se brindarán datos (por defecto, la primera)</li>
  <li>cantidadFilas</li>
  <li>cantidadColumnas</li>
  <li>datos: Array de objetos. Cada fila/registro será un objeto, con los encabezados de las columnas como nombres de propiedades.</li>
</ul>
