
# Conexión MySQL

Si queremos guardar la información que nos llega desde el cliente en una base de datos necesitamos establecer una conexión con nuestra base de datos desde el backend. Para tal fin vamos a hacer uso del módulo [mysql2](https://www.npmjs.com/package/mysql2):

```node
npm i mysql2
```

&nbsp;

## createPool & getConnection

Para crear la conexión es recomendable crear un grupo de conexiones. Los grupos de conexiones ayudan a reducir el tiempo dedicado a conectarse al servidor MySQL al reutilizar una conexión anterior. Para tal fin disponemos del método `createPool`, al cuál debemos pasar como argumento un objeto con una serie de propiedades (mínimo host, usuario, contraseña y base de datos a utilizar).

Vamos a crear las variables necesarias en el archivo `.env`:

```bash
MYSQL_HOST=localhost
MYSQL_USER=demo
MYSQL_PASSWORD=123456
MYSQL_DATABASE=diario_viajes
```

> Debes rellenar las cuatro variables con tus datos. También será necesario que crees previamente la base de datos que vayas a utilizar.

&nbsp;

Ahora vamos a definir en nuestro backend una función que se encargue de conectarnos a la base de datos:

```javascript
// Permitimos al proceso acceder a las variables de entorno que definimos
// en el fichero ".env".
require('dotenv').config();

const mysql = require('mysql2/promise');

// Hacemos destructuring para obtener las siguientes variables de entorno.
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

// Variable que almacenará la conexión.
let pool;

// Función que retorna una conexión a la base de datos.
const getDB = async () => {

    // Si no hay una conexión...
    if (!pool) {
        // Creamos un grupo de conexiones
        pool = mysql.createPool({
            connectionLimit: 10,
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASSWORD,
            database: MYSQL_DATABASE,
            timezone: 'Z',
        });
    }
    
    // Si ya existe un pool de conexiones, ejecutamos el método "getConnection" 
    // de dicho pool y retornamos una conexión.
    return await pool.getConnection();
    
};

// Exportamos la función anterior.
module.exports = getDB;
```

&nbsp;

## query

Ya tenemos a nuestra disposición una función que se encarga de conectarnos con la base de datos. Llegó la hora de realizar nuestra primera *query* haciendo uso de un método que lleva el mismo nombre:

```javascript
const getDB = require('./getDB');

const getEntry = async(idEntry) => {
    let connection;

    try {
        connection = await getDB();

        // Realizamos la consulta y guardamos la información en "results".
        const result = await connection.query(
            'SELECT place, description FROM entries WHERE id = ?;',
            [idEntry]
        );

        // El método "query" retorna un array de arrays. La información sobre la consulta siempre
        // vendrá en la posición 0 del array retornado, así que hacemos destructuring de esa posición.
        const [entry] = result;

        // La constante "entry" es un array de objetos. En esta constante vendrán todos los usuarios
        // que coincidan con la query realizada. En este caso hemos seleccionado una entrada por id
        // por lo que solo cabe esperar un resultado, nos quedamos con la posición 0.
        console.log(entry[0]);

    { catch (error) {
        console.log(error.message);
    } finally {
        // Tanto si la operación ha ido bien como si algo ha salido mal debemos cerrar la conexión.
        // Para tal fin haremos uso del método "release".
        if(connection) connection.release();
    }
}

// Llamamos a la función anterior y le pasamos el argumento "idEntry".
getEntry(1);
```

> Debemos suponer que existe una tabla `entries` en nuestra base de datos así como una entrada con id 1, de lo contrario el código anterior no funcionará.

&nbsp;

## Petición de tipo SELECT

Al realizar una petición de tipo `SELECT` como la realizada en el ejemplo anterior, el método `query` nos retornará un array de arrays como este:

```javascript
[
    [
        TextRow {
            id: 1,
            place: 'A Coruña',
            description: 'Lorem ipsum dolor amet.',
        }
    ],
    [
        ColumnDefinition {
            _buf: <Buffer 01 00 00 01 06 34 00 ... 416 more  bytes>,
            encoding: 'binary',
            name: 'id',
            ...
        },
        ColumnDefinition {
            _buf: <Buffer 01 00 00 01 06 34 00 ... 416 more  bytes>,
            encoding: 'utf8',
            name: 'place',
            ...
        },
        ColumnDefinition {
            _buf: <Buffer 01 00 00 01 06 34 00 ... 416 more  bytes>,
            encoding: 'utf8',
            name: 'description',
            ...
        }
    ]
]
```

La información acerca de la consulta se encontrará siempre en la primera posición de este array, que será un array de objetos:

```javascript
[
    TextRow {
        id: 1,
        place: 'A Coruña',
        description: 'Lorem ipsum dolor amet.',
    }
]
```

Cuando hacemos una consulta de tipo `SELECT`, cada objeto *TextRow* de este array representa las filas (*rows*) que retorna dicha consulta. Si tratamos de seleccionar a un usuario por medio de un id se nos retornará un array con un máximo de un objeto (damos por hecho que los ids no son únicos).

&nbsp;

## Petición de tipo INSERT, UPDATE & DELETE 

En las consultas de tipo `INSERT`, `UPDATE` y `DELETE` el array retornado por el método `query` sería algo así como:

```javascript
[
    ResultSetHeader {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 2, // Valor 0 si la consulta es de tipo UPDATE o DELETE.
        info: '',
        serverStatus: 2,
        warningStatus: 0
    },
    undefined
]
```

En la primera posición de este array tenemos el objeto *ResultSetHeader*. Este objeto tiene una propiedad que nos indica el nuevo id del elemento insertado `insertId`. Puede ser de gran utilidad en determinadas ocasiones. Podríamos acceder a esta propiedad de la siguiente manera:

```javascript
const result = await connection.query(
    'INSERT INTRO entries (place, description) VALUES (?, ?);',
    [idEntry]
);

// Opción A
const idNewEntry = result[0].insertId;

// Opción B 
const { insertId } = result[0];
```

>Las consultas de tipo `UPDATE` y `DELETE` presentan siempre el valor `0` en esta propiedad dado que una actualización o un borrado no genera un nuevo id.