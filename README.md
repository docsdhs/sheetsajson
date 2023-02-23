# sheetsajson
<p>Extracto de código que permite configurar un endpoint de consulta de datos para cualquier Hoja de Cálculo de Google.</p>

<p>Simplemente debes copiar los contenidos del archivo codigo.gs a un Proyecto de Apps Script vinculado a tu Hoja de Cálculo e "Implementarlo" como "Aplicación Web" (debe poder ser ejecutada por "Cualquier Usuario").</p>

<p>La consulta simple a la URL generada devolverá un JSON con la siguiente estructura:</p>
<ul>
  <li>mensaje: Mensaje de status de realización de la consulta (éxito/fracaso/errores)</li>
  <li>nombreArchivo: Nombre del Archivo Consultado</li>
  <li>hojasArchivo: Array de nombres de hojas que contiene el archivo</li>
  <li>hojaConsultada: Hoja de la cual se brindarán datos (por defecto, la primera)</li>
  <li>nombresColumnas: Array con los nombres de los encabezados de cada columna de la hoja consultada</li>
  <li>cantidadFilas</li>
  <li>cantidadColumnas</li>
  <li>datos: Array de objetos. Cada fila/registro será un objeto, con los encabezados de las columnas como nombres de propiedades.</li>
</ul>

<hr>
<h2>Ejemplo uso simple</h2>
<i>Caso de uso sin parámetros especiales - con la URL tal cual es generada por Apps Script</i>
<br><br>
<pre>
<code>
{
  "mensaje": "Consulta realizada exitosamente",
  "nombreArchivo": "Listado Productos",
  "nombresHojas": ["Celulares", "Cámaras", "Televisores"],
  "hojaConsultada": "Celulares",
  "nombresColumnas": ["idCelular", "marca", "modelo", "precio", "lanzamiento", "imagen"],
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
}</pre></code>

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
    <tr>
      <td>CEL_0002</td>
      <td>Apple</td>
      <td>iPhone 11 Pro Max</td>
      <td>$1099</td>
      <td>2019</td>
      <td>https://i.ibb.co/smkq4bC/image.png</td>
    </tr>
    <tr>
      <td>CEL_0003</td>
      <td>Google</td>
      <td>Pixel 5</td>
      <td>$699</td>
      <td>2020</td>
      <td>https://i.ibb.co/FYRDkCJ/image.png</td>
    </tr>
  </tbody>
</table>

<hr>

<h2>Parámetros para el <i>queryString</i></h2>
<p>Puedes usar los parámetros <i>hoja</i> y <i>columnaFiltro</i> + <i>criterioFiltro</i> a la hora de construir una consulta.</p>

<h3>Selección de hoja</h3>

<p>Por defecto, el script entrega datos de la primera hoja del archivo, pero puedes especificar la hoja deseada según su nombre de la siguiente manera:</p>

<pre><code>https://script.google.com/macros/s/......./exec?hoja=Celulares</pre></code>
<pre><code>https://script.google.com/macros/s/......./exec?hoja=Televisores</pre></code>

<i>Si indicas una hoja que no existe en el archivo, recibirás un mensaje de error.</i>

<h3>Filtros</h3>

<p>Puedes filtrar los datos que se obtendrán en la consulta especificando una <i>columnaFiltro</i> y el <i>criterioFiltro</i> que deben cumplir los valores de cada fila en <i>esa</i> columna para "pasar" el filtro.</p> 

<p>Por ejemplo, para obtener los celulares de la marca Google:</p>

<pre><code>https://script.google.com/macros/s/......./exec?columnaFiltro=marca&criterioFiltro=Google</pre></code>

<p>Para obtener un celular según su "id"</p>

<pre><code>https://script.google.com/macros/s/......./exec?columnaFiltro=idCelular&criterioFiltro=CEL_0005</pre></code>

<p><i>Ten en cuenta que por más que tu filtro sea muy "puntual" y entregue un único resultado, el valor de "datos" siempre será un array de objetos, aunque tenga un solo elemento.</i></p>
<p><i>Si indicas una columnaFiltro que no se encuentra en la hoja consultada, recibirás un mensaje de error. Si especificas una columna válida pero olvidas determinar el valor para criterioFiltro, también se producirá un error.</i></p>

<hr>

<h2>Limitaciones</h2>
<p>Al ejecutar un script de Apps Script, estarás sujeto a las <a href="https://developers.google.com/apps-script/guides/services/quotas?hl=es-419">limitaciones de los servicios gratuitos de Google</a>. Por ejemplo, este tipo de scripts soportan únicamente 30 ejecuciones en simultáneo (pedidos concurrentes). Para páginas web que deban brindar servicios de gran escala, es recomendable explorar otras opciones. Pasarse de los límites no generará ninguna penalización de parte de Google ni un cargo económico: el script simplemente dejará de funcionar informando el exceso.</p>

<h4>Seguridad</h4>
<p>El código del script realiza únicamente acciones de "lectura" de datos, y solamente puede actuar sobre el archivo en el que fue instalado.</p>
<p>De todas formas, si configuras la Aplicación Web para que "Cualquier Usuario" pueda ejecutar la función doGet() mediante la URL generada, debes tener en cuenta que:</p>
<ul>
  <li>Si dejas la URL visible en algún archivo "de front-end" (como un script del lado de cliente), otras personas podrán copiarla y usarla. Teniendo la URL <b>no</b> podrán ver el código de tu script, ni modificar las acciones que realiza, ni acceder a la hoja de cálculo original, pero podrán ejecutar la consulta desde otros entornos y ver todos los datos que puede entregar.</li>
  <li>Además, al ejecutar las consultas, podrán afectar la medición de tu 'uso' del servicio con respecto a los límites/cuotas establecidos por Google y generarte un "exceso" no previsto.</li>
</ul>
