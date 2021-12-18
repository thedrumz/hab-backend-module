# MySQL

Vamos a cambiar el repositorio que estábamos usando `inMemoryUsersRepository.js` por un repositorio que use MySQL. Para ello vamos a usar el módulo `mysql2` (documentación [aquí](https://github.com/sidorares/node-mysql2#readme))

1. Lo primero será instalar el módulo
2. Crearemos el repositorio `mysqlUsersRepository.js` que exportará las mismas funciones que el `inMemoryUsersRepository.js`, así cuando sustituyamos uno por otro en el `index.js` la API seguirá funcionando igual
3. Crearemos un archivo `mysqlConnection.js` que tendrá la configuración de la conexión a nuestra base de datos local. Usaremos la función `createPool` del módulo `mysql2` para crear una pool de conexiones. Usaremos la api de promesas del módulo al importarlo `const mysql = require('mysql2/promise')`
3. En cada una de las funciones de `mysqlUsersRepository.js` haremos las consultas a la base de datos local de mysql y devolveremos los resultados en el mismo formato en que lo hacíamos con `mysqlUsersRepository.js`

**NOTA:** La conexión con MySQL es asíncrona, así que todas nuestras funciones de `mysqlUsersRepository.js` serán asíncronas, ten en cuenta lo que eso supondrá para el `index.js`