# Servidores HTTP

En el apartado anterior tuvimos nuestro primer contacto con el módulo `http`. A continuación veremos múltiples ejemplos de servidores con funcionalidades diferentes.

## Ejemplo 1 - Simple Response

En el primer ejemplo nos topamos con un servidor que envía la misma respuesta a cualquier solicitud sin importar el tipo de método que se utilice (GET, POST, DELETE, etc.).

```javascript
const http = require('http');

// Creamos un servidor HTTP.
const server = http.createServer();

// Definimos el puerto.
const PORT = 3000;

// Configuramos una función que se ejecutará cuando al servidor le llegue
// una petición.
server.on('request', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.end('<h1>Hello World</h1>');
});

// Ponemos el servidor a escuchar peticiones en el puerto 3000.
server.listen(PORT, () => {
    console.log(`El servidor está funcionando en http://localhost:${PORT}`);
});
```

## Ejemplo 2 - Query Params

En este caso veremos como lidiar con los parámetros de la _URL_ para filtrar la respuesta. Tomaremos como ejemplo el parámetro `type`, el cuál se espera que tome el valor de `human` o `alien`. Si el valor no se corresponde a ninguna de esas opciones supondremos que no hay filtros y lo devolveremos todo.

Para este ejemplo simplemente devolveremos un mensaje pero la idea sería poder filtrar humanos y aliens de un array de objetos.

```javascript
const http = require('http');
const querystring = require('querystring');

const server = http.createServer();

const PORT = 3000;

server.on('request', (req, res) => {
    // Hacemos un split en el caracter interrogación para dividir los queryparams
    // del resto de la ruta. Nos quedamos con el index 1 del array que se genera
    // (el querystring).
    const myQueryString = req.url.split('?')[1];

    // Transformamos el querystring en un objeto JavaScript haciendo uso de core
    // module "querystring".
    const parsedParams = querystring.parse(myQueryString);

    // Obtenemos el valor de la propiedad "type".
    const { type } = parsedParams;

    // Como todas las respuestas van a recibir el mismo "statusCode" y van a enviar
    // el mismo tipo de dato podemos definir esa información aquí mismo.
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');

    // En función del valor de "type" enviamos una respuesta u otra.
    if (type === 'human') {
        res.end('<h1>Has filtrado a los humanos</h1>');
    } else if (type === 'alien') {
        res.end('<h1>Has filtrado a los aliens</h1>');
    } else {
        res.end('<h1>Obtienes a todos los humanos y aliens</h1>');
    }
});

server.listen(PORT, () => {
    console.log(`El servidor está funcionando en http://localhost:${PORT}`);
});
```

## Ejemplo 3 - Body

En el tercer ejemplo veremos como deserializar un body para transformalo nuevamente a un objeto _JSON_.

```javascript
const http = require('http');
const querystring = require('querystring');

const server = http.createServer();

const PORT = 3000;

// Función que deserializa el body.
const bodyParser = (req) => {
    return new Promise((resolve) => {
        // Array donde almacenaremos los buffers (chunks) que vayan llegando.
        let body = [];

        // El evento "data" se ejecuta cada vez que llegan nuevos datos. El parámetro
        // "chunk" hace referencia a un objeto de tipo Buffer.
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        // El evento "end" se ejecuta cuando ya no hay más datos.
        req.on('end', () => {
            // Deserializamos el body con la ayuda del método "concat" seguido de "toString".
            // En este proceso transformamos el Buffer en texto.
            body = Buffer.concat(body).toString();

            // Retornamos con el resolve el body parseado a un objeto JS. ¡OJO! El body que recibe
            // el servidor debe estar en formato "raw". Si está en formato "x-www-form-urlencoded"
            // debemos importar "querystring" y usar "querystring.parse(body)"
            resolve(JSON.parse(body));
        });
    });
};

server.on('request', async (req, res) => {
    // Llamamos a la función "bodyParser" y le pasamos la request. Debemos hacer uso
    // de async & await dado que "bodyParser" retorna una promesa.
    const body = await bodyParser(req);

    // Mostramos el body ya convertido en un objeto JS.
    console.log(body);

    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');

    // Retornamos el body que hemos recibido. Para tal fin debemos convertir el objeto
    // JS a texto JSON.
    res.end(JSON.stringify(body));
});

// Ponemos el servidor a escuchar.
server.listen(PORT, () => {
    console.log(`El servidor está funcionando en http://localhost:${PORT}`);
});
```

## Ejemplo 4 - JSON

Vamos a devolver al cliente el fichero `users.json` configurando el _status code_, los _headers_ y el _body_:

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

```javascript
const http = require('http');

const PORT = 3000;

const server = http.createServer();

server.on('request', (req, res) => {
    // Leemos el fichero "users.json" y lo transformamos en un objeto JS.
    const users = require('./users.json');

    // En este punto "users" es un array de usuarios por lo que podríamos obtener un nuevo usuario
    // del body, pushearlo en el array, y guardar los cambios con el método "writeFile" de "fs"

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    // Convertimos el objeto users en texto JSON nuevamente para
    // poder enviarlo.
    res.end(JSON.stringify(users));
});

server.listen(PORT, () => {
    console.log(`El servidor está funcionando en http://localhost:${PORT}`);
});
```
