# Core Modules

_Node_ trae por defecto una serie de módulos para realizar tareas comunes, en su mayoría relacionadas con el sistema, ficheros, red, etc... A estos módulos se les conoce como _core modules_. Podemos requerirlos en nuestro código en cualquier momento porque vienen incluídos en la instalación de _Node_.

Toda la información sobre los _core modules_ puede verse en la [documentación oficial](https://nodejs.org/api/modules.html) del proyecto.

Los más comunes son:

-   **os**: ofrece información proveniente del propio sistema operativo en el que corre nuestra aplicación _Node_.

-   **path**: permite trabajar con rutas del sistema de ficheros.

-   **fs**: permite trabajar con ficheros y directorios del sistema de ficheros.

## Módulo os

El módulo `os` nos permite conseguir información sobre el sistema operativo donde se está ejecutando el proceso de _Node_. Cosas como la memoria total, la memoria libre, el número, estado de los procesadores y otras cosas relacionadas.

```javascript
const os = require('os');

// Total de memoria del sistema.
os.totalmem();

// Total de memoria libre.
os.freemem();

// Nombre del host (máquina donde corre el proceso de Node).
os.hostname();

// Ruta del directorio personal del usuario que ejecuta el proceso de Node.
os.homedir();

// Ruta del directorio temporal para trabajar con archivos volátiles.
os.tmpdir();
```

## Módulo path

El módulo `path` nos servirá para manejar y transformar _paths_ (rutas) del sistema de ficheros. Es un módulo importante ya que las rutas en los diferentes sistemas operativos no tienen un formato común y este módulo nos garantiza que nuestra aplicación funciona bien en cualquier sistema.

```javascript
const path = require('path');

// Construye un path por partes de forma segura e independiente
// del sistema operativo.
path.join(x);

// Combina una serie de paths para convertirlos en un path absoluto.
path.resolve(x);

// Normaliza un path.
path.normalize(x);

// Retorna la extensión del fichero apuntado por el path.
path.extname(x);
```

Además, el módulo `path` nos sirve para componer rutas usando `path.join`. Por ejemplo, para componer la ruta al archivo `mi_archivo.txt` dentro del directorio actual, podemos hacer uso de `path.join` en conjunción con la variable global `__dirname` de _Node_.

```javascript
const path = require('path');

const myPath = path.join(__dirname, 'mi_archivo.txt');
```

## Módulo fs

Nos permite leer, crear, escribir o borrar ficheros y directorios.

Este módulo proporciona una versión síncrona y otra asíncrona. Intentaremos usar siempre la asíncrona dado que proporciona un mejor rendimiento. Veamos varios ejemplos equivalentes:

```javascript
const fs = require('fs');

fs.writeFile('file.txt', 'Hello world!', function (err) {
    if (err) {
        console.error(err);
    }
    console.log('El fichero se escribió correctamente');
});
```

```javascript
const fs = require('fs');

fs.writeFile('file.txt', 'Hello world!', (err) => {
    if (err) {
        console.error(err);
    }
    console.log('El fichero se escribió correctamente');
});
```

```javascript
const fs = require('fs');

const callback = (err) => {
    if (err) {
        console.error(err);
    }
    console.log('El fichero se escribió correctamente');
};

fs.writeFile('file.txt', 'Hello world!', callback);
```

```javascript
const fs = require('fs');

const callback = (err) =>
    err
        ? console.error(err)
        : console.log('El fichero se escribió correctamente');

fs.writeFile('file.txt', 'Hello world!', callback);
```

En estos fragmentos estamos usando la versión asíncrona de la función `writeFile`. La ejecución asíncrona permite que _Node_ siga ejecutando el resto del código mientras `writeFile` se ejecuta en paralelo, es decir, no espera a que `writeFile` termine su ejecución. Esto como hemos dicho mejora mucho el rendimiento en aplicaciones complejas, ya que permite paralelizar tareas que requieren acceso al disco duro, a servidores externos, etc.

La versión síncrona de estas funciones suele tener el sufijo `Sync`. La versión síncrona puede ser útil para probar código rápidamente. Ejemplo:

```javascript
const fs = require('fs');

fs.writeFileSync('file.txt', 'Hello world!');
```

Volviendo a las funciones asíncronas, es importante notar que los callbacks son funciones corrientes. Para hacer nuestro código más legible y no [anidar callbacks](https://i.ytimg.com/vi/fr67u98nckk/maxresdefault.jpg), en las últimas versiones de Node, ya podemos hacer uso del patrón **Promise** de JS en la mayoría de **core modules**, por ejemplo, para el módulo **fs**:

```javascript
const fs = require('fs').promises;

async function readFile(filename) {
    const data = await fs.readFile(filename);
    return console.log(data.toString());
}

// Imaginemos que "file.txt" se encuentra en el directorio actual.
readFile('file.txt');
```

Esto nos facilita también la gestión de errores, ya que podemos hacer uso de bloques `try-catch`, en lugar de estar comprobando si el callback retorna un argumento `error` como hacíamos en los ejemplos anteriores.

```javascript
const fs = require('fs').promises;

async function readFile(filename) {
    try {
        const data = await fs.readFile(filename);
        return console.log(data.toString());
    } catch (err) {
        console.error(`error reading file ${filename}`);
    }
}

// El archivo "fil3.txt" no existe en el directorio actual.
readFile('fil3.txt');
```

Vemos que para leer el contenido de un fichero estamos siempre usando el método `toString()`. Esto se debe a que por defecto los ficheros se leen como `Buffer`, es decir, se leen como cadenas de código binario. Otra opción para obtener el contenido de un fichero como una cadena de caracteres es indicar el formato esperado, por ejemplo:

```javascript
const fs = require('fs').promises;

async function readFile(filename) {
    const data = await fs.readFile(filename, 'utf8');
    return console.log(data.toString());
}

readFile('file.txt');
```

A partir de ahora, usaremos siempre que sea posible _Promises_ para trabajar con el módulo `fs`.

### Escribiendo ficheros

```javascript
const fs = require('fs').promises;

async function myFunction() {
    try {
        await fs.writeFile('mensaje.txt', 'Hola, mundo!');
    } catch (err) {
        console.error(err);
    }
}

myFunction();
```

### Leyendo ficheros

```javascript
const fs = require('fs').promises;

async function myFunction() {
    try {
        const data = await fs.readFile('mensaje.txt', 'utf-8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

myFunction();
```

### Borrando ficheros

```javascript
const fs = require('fs').promises;

async function myFunction() {
    try {
        await fs.unlink('mensaje.txt');
    } catch (err) {
        console.error(err);
    }
}

myFunction();
```

### Ver metadata de un fichero

```javascript
const fs = require('fs').promises;

async function myFunction() {
    try {
        const data = await fs.stat('mensaje.txt', 'utf-8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

myFunction();
```

Existen otras muchas funciones en el módulo **fs**, como siempre, podemos consultar la documentación oficial para conocerlas.
