# Servidor web con Node.js

Nuestra aplicación funciona imprimiendo los resultados por consola. Eso está muy bien, pero para eso el cliente necesita tener la aplicación en cada ordenador en el que quiera usarla. Vamos a facilitarle un poco la tarea convirtiendola en una API a la que pueda llamar desde cualquier parte

Para eso, vamos a crear un servidor `HTTP` con _Node.js_

1. Creamos un servidor
2. Desde el callback de `app.on('request', callback)` ejecutaremos nuestra aplicación y haremos que devuelva el resultado en la `response`

**NOTA:** Ten en cuenta que la response tiene que ser un string, y debe tener un header con el content-type que corresponda al tipo de datos devuelto