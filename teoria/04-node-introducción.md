# Introducción a Node.js

_NodeJS_ es un entorno de ejecución _JS_ en el servidor.

-   Está basado el motor V8 liberado por _Google_, lo que permite el uso de _JavaScript_ en el servidor

-   Por defecto, corre en un único proceso, haciendo uso del _Event Loop_, un sistema que permite I/O sin bloqueos sin recurrir al uso de threads (compleja gestión de memoria, condiciones de carrera, etc.)

-   Es ideal para que los equipos de desarrollo trabajen en un único lenguaje en frontend y backend, lo que también facilita e impulsa la figura del desarrollador _full-stack_.

-   Al ser _JS_ un lenguaje de tipado dinámico e interpretado, usando el _Node_ REPL podemos probar código _JS_ de manera muy fácil para el programador. Para usar el REPL simplemente ejecutamos el comando `node`

-   Para ejecutar un módulo de _Node_, simplemente escribimos `node` seguido del nombre del fichero.

## REPL

REPL (Read-Eval-Print-Loop) se traslada al Español a Leer-Evaluar-Imprimir-Repetir. El REPL de _Node_ es una herramienta de consola que te permite evaluar declaraciones en JavaScript y ver sus resultados inmediatamente.

Esta funcionalidad nos permite ejecutar código JavaScript directamente en la línea de comandos. Para abrir un REPL, una vez instalado _Node.js_ en nuestra máquina, simplemente abrimos el terminal y tecleamos `node`. A partir de ese momento podremos ejecutar código _JavaScript_ directamente:

```javascript
console.log('¡Bienvenido a Node!');
```

Si ejecutamos la orden anterior veremos como el REPL muestra un `undefined`. Esto es debido a que la línea que hemos ejecutado no ha devuelto ningún valor (sólo ha impreso un string por pantalla).

Si por ejemplo ejecutamos:

```javascript
const a = 2;
const b = 3;
Math.pow(a, b);
```

La ejecución de la última línea imprime `8` por pantalla en lugar de `undefined`. En resumen, siempre que la instrucción que insertemos no retorne ningún valor se mostrará un `undefined` (tras la declaración de variables, tras la ejecución de un `console.log`, etc.).

Para salir de este REPL debemos presionar **CTRL + C** dos veces.

## Ejecución de ficheros

Aunque ejecutar código usando el REPL es una forma fácil de probar cosas, resolver dudas, y jugar con _Node.js_, la forma más habitual de trabajar es ejecutando archivos que contienen código _JavaScript_. Por ejemplo, podemos usar nuestro editor favorito para crear un fichero que contenga el código del ejemplo anterior:

```javascript
const a = 2;
const b = 3;
Math.pow(a, b);
```

Ahora podemos usar _Node.js_ para ejecutar el fichero que hemos guardado en nuestra máquina con nombre `pow.js`:

```bash
node pow.js
```

Vemos que el archivo se ejecuta, pero no se muestra nada por pantalla. No ha habido ningún error y nuestro código se ha ejecutado perfectamente, pero no hay ninguna orden que indique a _Node_ que tiene que mostrar algo por pantalla.

Podemos modificar nuestro código para que el ejemplo sea un poco más visual:

```javascript
const a = 2;
const b = 3;

const result = Math.pow(a, b);

console.log(`El resultado es: ${result}`);
```

Y ahora sí deberíamos ver:

```bash
El resultado es: 8
```

> Aunque en estos ejemplos hemos usando `node mi_fichero.js`, podríamos haber usado simplemente `node mi_fichero`. La extensión `.js` está implícita cuando ejecutamos archivos con _Node_.

## Eventos

Podemos usar `process` para asignar eventos al proceso que se está ejecutando. Por ejemplo, si queremos hacer algo antes de que el proceso de _Node_ se pare, podemos asignar una función que se ejecute justo antes de parar:

```javascript
process.on('exit', function () {
    console.log('El proceso de Node va a parar');
});
```

Cuando en _Node_ ocurre un error que no tengamos controlado el proceso se interrumpe. Podemos asignar una acción al evento de error (`uncaughtException`) y evitar que el proceso de _Node_ se detenga:

```javascript
process.on('uncaughtException', function (err) {
    console.error('Ocurrió un error grave!');
    console.error(err.stack);
});
```

Por ejemplo, si creamos un archivo que contenga este código y lo ejecutamos:

```javascript
process.on('exit', () => console.log('El proceso de Node va a parar'));

process.on('uncaughtException', function (err) {
    console.error('Ocurrió un error grave!');
    console.error(err.stack);
});

throw new Error('Este es el mensaje de error');
```

Vemos que se muestra por pantalla algo parecido a esto:

```bash
Ocurrió un error grave!

Error: Este es el mensaje de error
at Object.<anonymous> (/Users/hectorgv/projects/hackaboss/delete/start.js:8:7)
at Module._compile (internal/modules/cjs/loader.js:1063:30)
at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
at Module.load (internal/modules/cjs/loader.js:928:32)
at Function.Module._load (internal/modules/cjs/loader.js:769:14)
at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
at internal/main/run_main_module.js:17:47

El proceso de node va a parar
```

Como vemos _Node.js_ ha detectado que se ha producido un error, por lo que se ha ejecutado el código que hay definido para el _listener_ que maneja el evento `uncaughtException`.

Posteriormente, ha ejecutado el código que hay definido para el _listener_ del evento `exit`. Más información sobre eventos y como manejarlos en la documentación oficial: [Events](https://nodejs.org/docs/latest-v14.x/api/events.html#events_emitter_on_eventname_listener)
