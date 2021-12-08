# Node Package Manager (npm)

_Node Package Manager_ o _npm_ es un software que permite descargar e instalar módulos de _Node_. Estos módulos son hechos por individuos u organizaciones y se almacenan en un registro global. Aparte de nuestros propios módulos y los _core modules_ , podemos usar los módulos publicados en el registro de _npm_, algunos de ellos muy famosos y con cientos de miles de descargas diarias. Estos módulos sirven para cosas muy diversas, desde conversores de fechas a editores de imágenes o a servidores web completos.

Podemos instalar nuevos módulos en el directorio local o de forma global, haciéndolos disponibles en cualquier directorio de nuestro sistema operativo.

## package.json

Toda aplicación _Node_ empieza mediante la definición de un archivo _package.json_. Este archivo contendrá, entre otras cosas:

-   Metadata de la aplicación.

-   Listado de módulos necesarios para que la aplicación funcione (_dependencias_).

-   Scripts de ejecución.

Para generar un nuevo _package.json_ en el directorio actual, debemos usar el comando `npm init`. Esto iniciará un proceso para ayudarnos a configurar nuestra aplicación. Si queremos inicializar con la configuración por defecto podríamos utilizar `npm init -y`, esto nos ahorrará tiempo.

### Metadata

Una de las funciones del `package.json` es guardar metadata del proyecto: nombre, descripción, versión, licencia, etc. Ejemplo:

```json
{
    "name": "mi-proyecto",
    "version": "0.1",
    "description": "Descripción de mi proyecto",
    "main": "index.js", // Fichero de entrada.
    "license": "MIT"  // Tipo de licencia.
    ...
}

```

### Dependencias

Dentro del `package.json`, también se especifican las dependencias de la aplicación. Es decir, se especifican el conjunto de módulos o paquetes que son necesiarios para que la propia aplicación funcione. Ejemplo:

```json
    ...
    "dependencies": {
        "bcryptjs": "^2.4.3",
        "dotenv": "^8.2.0",
        "express": "^4.17.1",
        "joi": "^17.3.0",
        "jsonwebtoken": "^8.5.1",
        "mysql2": "^2.2.5"
    },
    "devDependencies": {
        "nodemon": "^2.0.6",
        "eslint": "^4.19.1",
        "jest": "^26.6.3"
    }
    ...
```

La función principal de _npm_ es facilitarnos la reutilización de paquetes de software. Podemos instalar un paquete con `npm install <modulo>` o `npm i <modulo>`. Esto buscará el módulo en el registro de _npm_ y, si lo encuentra, lo descargará y lo colocará en el directorio `node_modules` de la carpeta actual.

Cabe destacar que podemos tener dependencias de ejecución en producción (_dependencies_) y dependencias de ejecución en entornos de desarrollo (_devDependencies_). Las dependencias de desarrollo no se instalarán en los servidores finales de producción (para no malgastar recursos) dado que si se especifican como dependencias de desarrollo se entiende que sólo son necesarias durante el desarrollo. Para instalar una dependencia de desarrollo se usa `npm i -D <modulo>`.

Otra forma de instalar un paquete con _npm_ es instalarlo globalmente. Esto hará que el paquete esté disponible en cualquier parte del sistema de ficheros y no se añadirán a ningún `package.json`. Podemos instalar paquetes globalmente con `npm i -g <modulo>` (dependiendo del sistema podría ser necesario ejecutar este comando como administrador).

### Scripts

En el fichero `package.json` se pueden especificar scripts de inicialización de la aplicación. Podríamos tener varias formas de ejecutar una aplicación usando _npm_:

```json
...
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "debug": "nodemon server.js --inspect-brk=9229",
    "test": "./node_modules/.bin/jest"
},
...
```

Así, escribiendo en bash la orden correspondiente, por ejemplo `npm run start` o `npm run dev`, ejecutaríamos el script correspondiente.
