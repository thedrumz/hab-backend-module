# Peticiones

El trabajo de programación de backend se resume en programar respuestas para peticiones. En algunos casos la respuesta será enviar un fichero que existe en el disco del servidor pero en otros casos será hacer una consulta a una base de datos, llamar a otro servidor, procesar información de entrada, etc.

Los tipos de peticiones más comunes son:

-   **GET**: se utiliza para pedir datos al servidor. Por lo general sin _body_.

-   **POST**: se utiliza para crear un nuevo recurso en el servidor. La información del recurso se incluye en el _body_.

-   **PUT**: se utiliza para actualizar un recurso en el servidor. La información del recurso se incluye en el _body_.

-   **DELETE**: se utiliza para borrar un recurso en el servidor. Por lo general sin _body_.

## GET

Las peticiones `GET` que son las más tradicionales. Se usan para pedir datos al servidor. Opcionalmente pueden también enviar datos al servidor usando la propia ruta de la url, concretamente una parte de ella llamada _query-string_.

```
https://dominio.com/buscar?cadena=Texto&results=100
```

```
Protocolo: https://
Host: dominio.com
Ruta: /buscar
QueryString: ?cadena=Texto&results=100
```

Un _query-string_ es una sucesión de `variable=valor` separados por `&`, todo ello separado de la ruta por una `?`.

En el servidor tenemos que procesar este _query-string_ y convertirlo a un objeto similar a este:

```javascript
{
    cadena: "Texto",
    results: 100
}
```

La _query-string_ está incluída en la URL por lo que es completamente visible en cada petición. No es recomendable para enviar datos de los que no controlemos el tamaño dado que el límite de caracteres, aunque es grande, está limitado a la URL.

En _node_ procesaremos estos _query-strings_ con el _core module_ `querystring`. Ejemplo:

```javascript
const querystring = require('querystring');

const str = 'foo=bar&abc=xyz&abc=123';

const data = querystring.parse(str);

// Imprime un objeto JS.
console.log(data);

// Imprime el string re-procesado.
console.log(querystring.stringify(data));
```

## POST

El método tradicional de enviar información desde el cliente al servidor web son las peticiones con método POST. Estas peticiones al igual que las respuestas tienen cabeceras o _headers_, y un cuerpo o _body_, donde el cliente especifica los datos que se envían al servidor.

Aunque hay más tipos de _body_, trabajaremos mayoritariamente con el tipo _raw_, donde el cliente enviará objetos _JSON_ para que sean procesados por el servidor. Estos _bodies_ llevan un _header_ especial que indica al servidor el formato de los datos que se incluyen en el _body_, este _header_ es `content-type: application/json`

```bash
POST / HTTP/1.1
Content-Type: application/json; charset=utf-8
Host: localhost:8080
Content-Length: 16

{
    "name": "Héctor"
}
```

## Módulo HTTP

El módulo `http` de _Node_ es un _core module_ que permite realizar operaciones relacionadas con las peticiones _HTTP_. Usando este módulo podemos crear un servidor web que atienda a peticiones _HTTP_ y permita construír respuestas.

Lo primero será importar el módulo `http` y usar el método `.createServer`:

```javascript
// Requerimos el módulo http.
const http = require('http');

// Creamos el servidor web.
const server = http.createServer();

// Creamos un event listener que responda al evento "request". Este envento
// se ejecuta cada vez que en el servidor entra una petición.
server.on('request', (request, response) => {
    // Aquí tenemos acceso a los objetos request y response.
});

// Le decimos al servidor que escuche peticiones en el puerto 3000.
server.listen(3000);
```

Como vemos, dentro del _callback_ que se ejecuta cuando la _request_ llega al servidor, tenemos acceso a dos objetos muy importantes:

-   **request**: objeto con información sobre la petición entrante.

-   **response**: objeto que determina la respuests que vamos a enviar. Inicialmente estará vacía.

### Objeto request

Del objeto _request_ se puede sacar toda la información sobre la petición entrante. Las partes más importantes de una petición son:

-   **método**: GET, POST, PUT, etc.

-   **ruta** (incluído _query-string_)

-   **headers**

-   **body**

```javascript
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
    // Extraemos mediante destructuring las siguientes propiedades
    // de la request.
    const { method, url, headers } = req;

    console.log(method);
    console.log(url);
    console.log(headers);

    // Enviamos una respuesta al cliente por medio del método "end"
    // del response.
    res.end('Hello!');
});

server.listen(3000);
```

El _body_ es ligeramente más complicado de procesar ya que no se garantiza que llegue todo al mismo tiempo, por lo que tenemos que procesarlo por partes:

```javascript
const http = require('http');
const querystring = require('querystring');
const server = http.createServer();

// Función que analiza el body y lo transfoma a un objeto JS.
const bodyParser = (request) => {
    return new Promise((resolve) => {
        let body = [];

        // Agregamos a la request un event listener que responde al evento
        // "data". Este evento tiene lugar cada vez que llegan datos.
        request.on('data', (chunk) => {
            // Un chunk no es más que un objeto de clase Buffer.
            body.push(chunk);
        });

        // Agregamos a la request un event listener que responde al evento
        // "end". Este evento tiene lugar cuando ya no hay más datos.
        request.on('end', () => {
            body = Buffer.concat(body).toString();
            resolve(querystring.parse(body));
        });
    });
};

server.on('request', (req, res) => {
    const body = await bodyParser(req);
    console.log(body);
    res.end('Hello!');
});

server.listen(3000);
```

Así pues, cuando termina de procesarse la _request_, nuestro servidor ya estará listo para generar una respuesta.

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
const server = http.createServer();

server.on('request', (req, res) => {
    // Leemos el fichero "users.json" y lo transformamos en un objeto JS.
    const users = require('./users.json');

    // Indicamos el status code.
    res.statusCode = 200;

    // Asignamos la propiedad "content-type" en el header e indicamos
    // el tipo de dato que enviaremos de vuelta al cliente.
    res.setHeader('Content-Type', 'application/json');

    // Convertimos el objeto users en texto JSON nuevamente para
    // poder enviarlo.
    res.end(JSON.stringify(users));
});

server.listen(3000);
```
