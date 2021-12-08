# Express

El módulo nativo _http_ de _Node_ se usa para crear servidores web, pero a pesar de ser un módulo muy potente no destaca por su simplicidad. Por ello, para simplificar esta tarea estaremos haciendo uso de [express](https://www.npmjs.com/package/express), un _framework_ para construir servidores web en _Node_. Existen otros _frameworks_ similares a _express_ como [koa](https://www.npmjs.com/package/koa), [fastify](https://www.npmjs.com/package/fastify), o [nest.js](https://www.npmjs.com/package/@nestjs/core). Todos tienes sus ventajas y desventajas, pero _express_ es el más utilizado a día de hoy.

El módulo _express_ es una extensión del módulo `http` por lo que realmente cuando lo usamos, por detrás _express_ está usando el módulo `http` para realizar las acciones. Para instalar esta dependencia:

```bash
npm i express
```

Ejemplo de servidor web en express:

```javascript
const express = require('express');

const app = express();

app.use((req, res) => res.send('Hello express!'));

app.listen(3000);
```

En el ejemplo anterior le indicamos a _express_ que escuche peticiones en el puerto 3000, pero podría ser cualquier otro puerto de nuestra máquina siempre que no esté en uso por otro proceso. También hay que tener en cuenta que la función `app.listen` acepta como segundo argumento un callback, que será ejecutado inmediatamente después de que el servidor haya arrancado. Por ejemplo:

```javascript
app.listen(4000, () =>
    console.log('Servidor listo, escuchando en localhost:4000')
);
```

## Middleware

Para entender _express_ es imprescindible entender el concepto de _middleware_. Este módulo recibe una _request_ y genera una _response_. La diferencia con el módulo `http`, es que `express` hace que todas las _request_ pasen por un _array_ configurable de funciones. Cada una de estas funciones por las que pasan los objetos _request_ y _response_ es lo que llamamos _middlewares_.

![Express middleware](https://miro.medium.com/max/1400/1*ptNjzuT0m2BQ9YpQTVwVLg.png)

-   Los _middlewares_ pueden ser funciones propias o funciones de módulos instalados mediante `npm`.

-   El array de _middlewares_ está ordenado, se ejecutarán siguiendo siempre el flujo de código.

-   Cada _middleware_ tiene acceso a la _request_ y la _response_, por lo que podrá leerlas y modificarlas.

-   Opcionalmente puede tener acceso a un objeto que contendrá un posible `Error` lanzado por el _middleware_ anterior.

-   Cada _middleware_ tiene acceso a la función `next()`, una función especial de _express_ que transfiere el control al siguiente _middleware_ del _array_.

---

### Reutilización de código y predectibilidad

El beneficio de tener las operaciones de un servidor web definidas como una cadena de funciones es la reutilización de código y la predectibilidad. Por ejemplo, imaginemos que los usuarios nos mandan un _string_ para identificarse en cada _request_:

1. Podríamos definir un _middleware_ que procesase esa identificación, dejando pasar la _request_ al siguiente _middleware_ sólo si la identificación es correcta.

2. Si no lo es, redirigimos la _request_ a otro _middleware_ que se encarga de gestionar los errores.

3. Una vez tenemos esos dos _middlewares_ podemos indicarle a **express** que queremos usarlos en cada ruta de nuestro servidor, y nos ahorramos escribir el mismo código una y otra vez.

Para asignar middlewares a la app usamos `app.use(<function>)`, donde `<function>` sería el _middleware_ que queremos ejecutar.

```javascript
const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('Middleware número 1');
    next(); //pasamos al siguiente middleware
});

app.use((req, res, next) => {
    if (req.headers.authorization === 'superSecreto') {
        next();
    } else {
        res.statusCode = 401;
        res.end('Identificación incorrecta');
    }
});

app.use((req, res) => {
    res.statusCode = 200;
    console.log('Middleware número 2');
    res.end('¡Bienvenid@!');
});

app.listen(3000);
```

---

### Morgan

Existen módulos instalables mediante `npm` que se pueden usar como _middleware_. Un ejemplo es el módulo `morgan`, encargado de procesar información de todos los eventos que ocurren en un servidor web. Este tipo de módulos se conoce como _logger_, es decir, un componente del sistema encargado de las labores de registro de actividad.

`morgan` puede usarse para imprimir por pantalla datos de cada petición sin tener que hacer un `console.log`. Para realizar la instalación:

```bash
npm i morgan -D
```

```javascript
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev')); // Otros formatos: combined, tiny, etc.

app.use((req, res) => {
    res.statusCode = 200;
    res.end('¡Bienvenid@!');
});

app.listen(3000);
```

## Rutas o endpoints

Las rutas (también conocidas como _URLs_, _endpoints_, etc.) son unos _middlewares_ especiales que sólo responden a peticiones _HTTP_ realizadas a una determinada _URL_ (o patrón) y con un determinado método. Por lo general procesan información entrante y envían una respuesta al cliente.

Por ejemplo, un servidor web que tenga una página principal en la ruta `/` y una página de contacto en la ruta `/contact`. Cualquier otra ruta devolverá un error 404 (not found).

```javascript
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.end('Página principal');
});

app.get('/contact', (req, res) => {
    res.statusCode = 200;
    res.end('Página de contacto');
});

// Sólo se ejecuta si no entra en ninguna de las rutas anteriores
app.use((req, res) => {
    res.statusCode = 404;
    res.end('Not found :(');
});

app.listen(3000);
```

Cabe señalar también que cada ruta puede definir varios _middlewares_ que se aplicarán secuencialmente. Por ejemplo, una ruta con un único _middleware_ puede definirse como:

```javascript
const handler = () => {
    console.log('Función middleware 1');
    next();
};

app.get('/api/ruta', handler);
```

Y una ruta con varios _middlewares_:

```javascript
const express = require('express');

const app = express();

const handler = (req, res, next) => {
    console.log('Función middleware 1');
    next();
};

const handler2 = (req, res, next) => {
    console.log('Función middleware 2');
    next();
};

const handler3 = (req, res) => {
    console.log('Función middleware 3');
    res.send();
};

app.get('/api/ejemplo', handler, handler2, handler3);

app.listen(3000);
```

Esto aplicaría secuencialmente el primer _middleware_, que haría uso de la función `next` para indicar a _express_ que debe transferir el flujo de ejecucion a la siguiente función configurada como _middleware_. Así hasta llegar al último _middleware_ que se encarga de enviar la respuesta al cliente con `res.send()`.
