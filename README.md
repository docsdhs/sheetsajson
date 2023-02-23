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

<p>Ejemplo:</p>

<pre><code>
{
  "nombreArchivo": "Listado Productos",
  "nombresHojas": ["Celulares", "Cámaras", "Televisores"],
  "hojaConsultada": "Celulares",
  "cantidadFilas": "102",
  "cantidadColumnas": "6",
  "datos": [
    {
      "idCelular": "CEL_0001",
      "marca": "Apple ",
      "modelo": "iPhone 11",
      "precio": "$699",
      "lanzamiento": "2019",
      "imagen": "https://i.ibb.co/6n3FBS7/image.png"
    },
    {
      "idCelular": "CEL_0002",
      "marca": "Apple ",
      "modelo": "iPhone 11 Pro Max",
      "precio": "$1099",
      "lanzamiento": "2019",
      "imagen": "https://i.ibb.co/smkq4bC/image.png"
    },
  ]
}
</pre></code>

<p><i>El ejemplo está basado en una  tabla como esta:</i></p>

<table>
  <thead>
    <tr>
      <th>idCelular</th>
      <th>marca</th>
      <th>modelo</th>
      <th>precio</th>
      <th>lanzamiento</th>
      <th>imagen</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CEL_0001</td>
      <td>Apple</td>
      <td>Iphone 11</td>
      <td>$699</td>
      <td>2019</td>
      <td>https://i.ibb.co/6n3FBS7/image.png</td>
    </tr>
  </tbody>
</table>
