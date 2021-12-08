# Errores y JSON

## Tratamiento de errores

Todas las funciones del módulo **fs** pueden lanzar errores. Los más comunes pueden consultarse [en la documentación](https://nodejs.org/api/errors.html#errors_common_system_errors). Para manejar estos errores haremos uso del bloque `try...catch`.

Por ejemplo, pongámonos en el caso de que intentamos borrar un fichero que no existe. En ese caso *Node* nos lo indicará mediante el error `ENOENT`. Para manejar ese caso y evitar que nuestra aplicación termine su ejecución con un error, podemos hacer un tratamiento del error dentro del bloque `catch`. Por ejemplo, podemos imprimir el mensaje de error por pantalla y seguir con la ejecución.

Por lo general, cuando ocurre un error no sólo querremos imprimirlo por consola, sino que querremos hacer algún tipo de lógica con él (informar al administrador, generar un reporte en el servidor, enviar una alerta a otro sistema, etc.)

```javascript
const fs = require('fs').promises;

async  function deleteFile(filename) {
    try {
        await fs.unlink(filename);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('No se encontro el archivo');
        } else {
            throw err;
        }
    }
}

deleteFile('fil3.txt');
```

## Trabajando con JSON

*JSON* es el formato más habitual en el que guardar datos.

Como ya sabemos, para leer un archivo se puede usar el módulo `fs`, por ejemplo, imaginemos que tenemos un archivo que se llama `provincias.json` y cuyo contenido es:

```javascript
{
"provincias": ["lugo", "coruña", "ourense", "pontevedra"]
}
```

```javascript
const fs = require('fs').promises;

async  function myFunction() {
    try {
        const data = await fs.readFile('provincias.json', 'utf-8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

myFunction();
```

Para facilitar el tratamiento de *JSON* en *Node* tenemos una manera más fácil de leer estos archivos:

```javascript
const provincias = require('./provincias.json');

console.log(provincias);
```

El método `JSON.parse` procesa strings y los convierte en objetos *JS*. `JSON.stringify` hace exactamente lo contrario. Podemos usar este método para escribir objetos *JS* en ficheros *JSON*:

```javascript
const fs = require('fs').promises;

const myFunction = async () => {
    const dimensions = { height: 300, width: 200 };
    try {
        await fs.writeFile('dimensions.json', JSON.stringify(dimensions))
    } catch (err) {
        console.error(err);
    }
}

myFunction();
```

Imaginemos que tenemos una web donde los usuarios pueden registrarse. Podríamos guardar los datos del registro en el fichero `users.json` como si de un array de objetos se tratara:
```json
[
	{
		"email": "pablowsky@gmail.com",
		"password": "abcd1234"
	},
	{
	    "email": "luciita@gmail.com",
	    "password": "lucialu28"
	}
]
```

¿Cómo podríamos guardar un nuevo usuario en el fichero anterior?

```javascript
const fs = require('fs').promises;
const users = require('./users.json');

const addUser = async (user) => {
	// En estos momentos "users" es un array, así que podemos hacer push.
    users.push(user);
    try {
        await fs.writeFile('users.json', JSON.stringify(users))
    } catch (err) {
        console.error(err);
    }
}

// Pasamos como argumento un objeto con las propiedades de un usuario.
addUser({
    "email": "carlitos96@yahoo.com",
    "password": "123456"
});
```

```javascript
const users = require('./users.json');

function gerUser(email) {
    return users.find(user => user.email === email)
}
```