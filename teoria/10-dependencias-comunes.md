# Dependencias comunes

Como hemos visto, _npm_ nos permite instalar dependencias en nuestra máquina local y especificar estas dependencias como dependencias de aplicación para que, una vez llegadas a producción, sean instaladas también.

Veamos algunas de las dependencias más habituales.

## dotenv

Hemos visto como funcionan las variables de entorno en _Node_. Las variables de entorno se toman del sistema operativo y también pueden configurarse cuando se lanza el proceso de _Node_, de esta forma:

```bash
VARIABLE1=foo VARIABLE2=bar VARIABLE3=baz node app.js
```

Pero especificar un gran número de variables de esta forma es costoso, engorroso y propenso a errores. Para solucionar ese problema surje [dotenv](https://www.npmjs.com/package/dotenv). Para instalarlo en nuestra apliación y definirlo como dependencia:

```bash
npm i dotenv
```

Después, deberíamos requerirlo al inicio de la aplicación e indicarle mediante la función `config()` que use la configuración por defecto:

```javascript
const dotenv = require('dotenv');
dotenv.config();
```

Ahora podemos crear un fichero `.env` en la raíz de nuestro proyecto:

```bash
VARIABLE1=valor1
VARIABLE2=valor2
VARIABLE3=valor3
```

Y automáticamente nuestro `process.env` contendrá esas variables de entorno:

```javascript
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.VARIABLE1); // "valor1"
console.log(process.env.VARIABLE2); // "valor2"
console.log(process.env.VARIABLE3); // "valor3"
```

El archivo `.env` suele contener información sensible (rutas a recursos, passwords, tokens, etc.) por lo que suele añadirse a `.gitignore` para que no sea compartido en el repositorio del proyecto.

## nodemon

Cuando trabajamos con _JavaScript_ en el navegador y hacemos un cambio a un archivo _JS_ sólo tenemos que actualizar la página para ver reflejados los cambios. En _Node_ los cambios no tendrán efecto hasta que paremos la aplicación y la volvamos a iniciar.

El paquete _nodemon_ permite que el proceso de Node se reinicie automáticamente tras cualquier cambio. Para conseguir esto instalamos el módulo _nodemon_ (por lo general sólo será necesario para el desarrollo):

```bash
npm i -D nodemon
```

Para lanzar el proyecto con _nodemon_, debemos añadir un script en `package.json`:

```json
...
"scripts": {
    "start": "node app.js",
    // En este caso "app.js" sería el fichero que iniciaría el proyecto.
    "dev": "nodemon app.js"
},
...
```

Ahora podríamos iniciar nuestra applicación usando:

```bash
npm run dev
```

## date-fns

Manejar fechas es una de las tareas más habituales en el desarrollo de backend, pero el manejo de fechas en _JS_ no es especialmente amigable para el desarrollador.

```javascript
// Fecha actual.
const now = new Date();

// Fri Apr 24 2020 11:24:53 GMT+0200 (Central European Summer Time)
console.log(now);

// 1617636198032 (unix-time, milisegundos desde el 01-01-1970)
now.getTime();
```

```javascript
// Nueva fecha a partir de un unix-time.
new Date(1617636198032);

// Nueva fecha a partir de un string.
new Date('March 2 2021 07:00');

// Nueva fecha contruida por partes.
new Date(2021, 2, 2, 17, 22, 30, 0);
```

Hacer operaciones sencillas como sumar o restar periodos de tiempo, comparar fechas, o imprimirlas en formatos diferentes al formato por defecto, no es sencillo con _JS_ nativo. Por ello existen [date-fns](https://www.npmjs.com/package/date-fns) o [moment.js](https://www.npmjs.com/package/moment), son paquetes que simplifican el manejo de fechas en _JS_.

Podemos instalar `date-fns` usando:

```bash
npm i date-fns
```

```javascript
const { add, sub, format } = require('date-fns');

const fecha = new Date();

console.log(fecha); // 2021-04-05T15:36:37.559Z

const fecha2 = add(fecha, { months: 2, days: 4 });

console.log(fecha2); // 2021-06-09T15:36:37.559Z

const fecha3 = sub(fecha2, { years: 5 });

console.log(fecha3); // 2016-06-09T15:36:37.559Z

const fecha3Formateada = format(fecha3, 'dd/MM/yyyy');

console.log(fecha3Formateada); // 09/06/2016
```
