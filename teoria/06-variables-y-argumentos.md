# Variables y argumentos

## Variables globales

_Node.js_ pone a disposición pocos identificadores globales pero algunos son muy importantes.

-   `process`: este objeto global contiene información sobre el proceso de _Node.js_ que se está ejecutando. Muy útil para trabajar con las variables de entorno y para gestionar la ejecución del propio proceso.

-   `console`: nos permite escribir información en el _output_ del proceso. Dentro de este objeto hay varios objetos que nos permite escribir por diferentes salidas, por ejemplo `console.log`, `console.warn` o `console.error`.

-   `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval`: para crear y controlar _timers_.

-   `module`: es una referencia al módulo (fichero) y nos permitirá exportar objetos mediante `module.exports`.

-   `__filename`: contiene la ruta completa del fichero.

-   `__dirname`: contiene la ruta completa del directorio donde está el fichero.

-   `require`: esta función nos permite incluir otros módulos.

## Variables de entorno

Mediante el objeto `process.env`, podemos acceder a las variables de entorno del proceso de _Node_ que se está ejecutando. Estas variables de entorno suelen almacenar información crítica en nuestros servidores _Node.js_. Por ejemplo, el usuario y contraseña de una base de datos, el código secreto para verificar _tokens_ de usuario, etc.

Si queremos imprimir todas las variables de entorno por pantalla:

```javascript
console.log(process.env);
```

> Jamás deberíamos hacer esto puesto que suelen contener información sensible.

Para imprimir el contenido de una variable en concreto, por ejemplo `PATH`:

```javascript
console.log(process.env.PATH);
```

Por lo general, no querremos imprimir ni modificar las variables de entorno en nuestra aplicación _Node.js_. La mayoría de veces tomaremos información de estas variables para configurar nuestro servidor.

## Argumentos de entrada

Hemos visto que los comandos en _Bash_ aceptan una serie de argumentos. Por ejemplo, cuando ejecutamos `node app.js 33 hello world` le estamos pasando al comando `node` los argumentos `app.js`, `33`, `hello` y `world`.

Podemos acceder a esos argumentos usando el objeto `process.argv`, un _array_ que contiene todos los argumentos con los que se ejecutó el proceso actual. Los dos primeros argumentos siempre serán la ruta donde se encuentra el ejecutable de _Node_, y la ruta donde se encuentra el fichero que estamos ejecutando (`app.js`).

Podemos verlo si creamos un fichero `app.js` con estos contenidos:

```javascript
console.log('Imprimiendo los argumentos de entrada:');

console.log(process.argv);
```

Ahora lo ejecutamos:

```bash
node app.js hola que tal
```

Imprimirá algo parecido a:

```bash
[
'/usr/local/bin/node',
'/Users/username/projects/hackaboss/app.js',
'hola',
'que',
'tal'
]
```
