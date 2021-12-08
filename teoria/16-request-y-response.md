# Request y Response

Vamos a ver algunas propiedades útiles que _express_ añade automáticamente a `request` y `response`:

```javascript
// Dirección ip desde donde se originó la petición.
request.ip;

// Ruta de la url (sin querystring).
request.path;

// Método que establece el estado HTTP de la respuesta (200, 404, etc.).
response.status(code);

// Método que finaliza y envía una respuesta al cliente. Esta respuesta puede ir sin body.
response.end();

// Método que finaliza la respuesta y envía un objeto al cliente.
response.send(content);

// Método que envía el contenido del fichero en ese path.
response.sendFile(path);

// Método que establece headers en la respuesta.
response.set(header, value);
```

¿Qué diferencia existe entre `response.end` y `response.send`?

-   `response.end`: este método nos permite enviar una respuesta al cliente sin necesidad de enviar ningún dato. En caso de que usemos este método para enviar información será necesario que establezcamos como mínimo la propiedad `Content-type` en el `header`.

-   `response.send`: este método asume que necesitamos enviar información al cliente por lo que trata de facilitarnos el trabajo. Para ello comprueba los datos que estamos enviando y establece los `headers` necesarios de forma automática. Finalmente envía la respuesta por medio de un `res.end`.

## Información que recibimos en la request

A modo de resumen, podemos decir que las formas más habituales que usa un cliente para enviar información al servidor son:

-   Mediante _path params_ en la URL: `/users/:idUser`

-   Mediante _query params_ (o _querystring_) en la URL: `/characters?type=human&status=alive`

-   Mediante el _body_ de la _request_:

    ```json
    {
        "email": "juan87@gmail.com",
        "password": "abcd1234"
    }
    ```

    > El `body` puede venir en distintos formatos. Los más comunes son `raw`, `x-www-form-urlencoded`, `form-data`. Por norma general, haremos uso del primero de ellos, el formato `raw`. Este formato envía la información en formato _JSON_.

### Path params

Otra característica importante de las rutas es que se pueden definir rutas variables (patrones) definiendo parte de las mismas como parámetros. Por ejemplo, en _express_ se puede definir una ruta así (imaginemos que _handler_ es una referencia al _middleware_ encargado de gestionar la ruta):

```javascript
app.get('/news/:year/:month', handler);
```

En este caso `:year` y `:month` son lo que se conoce como _path params_. Es decir, lo definimos como variables cuyos valores serán definidos por la propia ruta. Por ejemplo, en la ruta anterior se procesarían peticiones cuya ruta cumpla el siguiente formato:

```bash
/news/2020/3
/news/2020/april
/news/2021/myFavoriteMonth
/news/thisYear/6
```

Como se puede observar, estamos definiendo los nombres de las variables cuyos valores serán tomados del string que forma la ruta real enviada por el cliente. Pero cuidado, en nigún momento estamos validando que el primer _path param_ sea un número, ni que el segundo esté en entre el 1 y 12 (debería ser un mes). Simplemente establecemos una correspondencia clave-valor.

```javascript
app.get('/users/:idUser/fotos/:category', (req, res) => {
    console.log(req.params);
});
```

Si hacemos una petición de tipo GET al endpoint `/users/34/fotos/naturaleza`, obtendremos, en `req.params` un objeto así:

```javascript
{
    idUser: '34',
    category: 'naturaleza'
}
```

### Query params

En el caso de que los datos lleguen a través de los _query params_ es posible acceder a su contenido usando la propiedad `query` del objeto `request`:

```javascript
// GET "/search?tema=noticias&since=2010"
app.get('/search', (req, res) => {
    res.send(req.query); // { tema: 'noticias', since: '2010' }
});
```

### Request body

Hemos visto que por defecto el _body_ de la _request_ está vacío en _express_. Para procesar un _body_ de tipo _JSON_ podemos usar el método `express.json()` :

```javascript
const express = require('express');

const app = express();

app.use(express.json());

app.post('/', (req, res) => {
    res.send(req.body);
});

app.listen(3000);
```

Simplemente estamos configurando el método `express.json()` como un _middleware_ a nivel de aplicación. Es decir, todas las _requests_ que se hagan al servidor pasan por esta función.

Nótese la mejora en cuanto a claridad y simplicidad con respecto a la solución usando _buffers_ y eventos que hemos visto previamente en el módulo `http` de _Node_.

## File upload

Para la subida de ficheros a un servidor _express_ es necesario especificar el `content-type` de la _request_ en un _header_. Para enviar bodies de tipo _JSON_ se usa `Content-Type: application/json`, pues bien, para la subida de archivos el cliente deberá incluir en el `header` de la _request_ la propiedad `Content-Type: multipart/form-data`.

Al contrario que para los bodies de tipo _JSON_, para procesar la subida de ficheros necesitaremos instalar una dependencia especial. Aunque existen varias opciones, la más popular es [express-fileupload](https://www.npmjs.com/package/express-fileupload).

```bash
npm i express-fileupload
```

_Multer_ también expone una función que podemos usar como middleware. Primero, es necesario especificar el directorio del sistema de ficheros del servidor web donde se almacenarán los archivos subidos (aunque también es posible trabajar con ficheros volátiles en memoria para cada request, sin persistirlos a disco). Tras ello, es tan sencillo como definir el nombre del field del formulario en el que se espera que el cliente envíe el contenido del archivo a subir.

```javascript
app.post('/upload', function (req, res) {
    console.log(req.files.foo); // the uploaded file object
});
```

-   `req.files.miArchivo.name`: por ejemplo, "car.jpg".

-   `req.files.miArchivo.mv`: Método que mueve el archivo a otro lugar del servidor. Puede recibir un callback o retornar una promesa.

-   `req.files.miArchivo.mimetype`: El _mimetype_ del archivo

-   `req.files.miArchivo.data`: Una representación en _buffer_ del archivo. Retorna un buffer vacío en caso de que la opción `useTempFiles` sea inicializado a `true`.

-   `req.files.miArchivo.tempFilePath`: Ruta al archivo temporal en caso de que `useTempFiles` sea inicializado a `true`.

-   `req.files.miArchivo.truncated`: Un booleano que representa si el archivo supera el tamaño límite.

-   `req.files.miArchivo.size`: Tamaño del archivo en bytes.

-   `req.files.miArchivo.md5`: La suma de comprobación MD5 es un algoritmo matemático que suele constar de 32 caracteres hexadecimales (letras y números) calculados en un archivo con una herramienta especial que utiliza una función _hash_ criptográfica que genera un valor de hash de 128 bits (16 bytes). Sirve para codificar cualquier tipo de archivo.

    ```javascript
    // Note that this option available for versions 1.0.0 and newer.
    app.use(
        fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
        })
    );
    ```

## File download

Pueden existir ficheros almacenados en un servidor web que no estén sujetos a modificaciones por parte de los clientes. Es lo que se conoce como ficheros estáticos (_static files_). Puede ser que un cliente nos solicite el contenido de uno de estos ficheros (por ejemplo un fichero `.css` o un archivo de imagen `.jpg`). Para estas situaciones lo que se suele hacer es definir un directorio específico en el servidor (por lo general llamado `static`) y hacer un puente entre la _request_ y ese directorio usando un _middleware_ especial de _express_.

Para tal fin podemos usar el método la función `express.static()`. Ejemplo:

```javascript
const path = require('path');
const express = require('express');
const app = express();

const port = 3000;

const staticPath = path.resolve(__dirname, 'static');

app.use(express.static(staticPath));

app.listen(port, () => console.log(`Escuchando en ${port}`));
```
