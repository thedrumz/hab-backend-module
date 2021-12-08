# Sistema de módulos

*Node.js* usa el sistema modular *CommonJS* (*ES6 Modules* de forma experimental).

- Cada fichero con extensión `.js` que creamos define un nuevo módulo. Se supone que cada módulo se encargará de una pequeña parte del código de nuestro servidor.

- Exportaremos ciertas partes de nuestros módulos a otros módulos. Esto nos permitirá separar la lógica de nuestra aplicación dando una mayor legibilidad de nuestro código.

- Para exportar un módulo usaremos el objeto `module.exports`.

- Para importar funcionalidades de otros módulos usando `require`.

- Además de los módulos que nosotros definamos, *Node.js* expone una serie de módulos que nos permiten interactuar con el sistema operativo y otras utilidades. Son los llamados *core modules* (`http`, `fs`, `path`, etc.). 

## Definición de módulos

Como hemos dicho, existen numerosos módulos que *Node.js* pone a nuestra disposición para facilitarnos el desarrollo. Estos módulos cubren tareas comunes y ahorran al programador tener que reescribir utilidades que se necesitan en cualquier servidor web. Tal es el caso de módulos de uso general como `http`, `fs`, `path`, `crypto`, etc. 

Veamos cómo definir nuestros propios módulos. Por ejemplo, pongamos que tenemos que calcular la suma de los elementos de un array de números que sean mayores que 3. Para ello definimos una función que recibe el array como parámetro y devuelve dicha suma:

```javascript
function arraySum(arr) {
    return arr
        .filter(i => i > 3)
        .reduce((sum, i) => sum + i);
}
```

O usando **arrow functions**:

```javascript

const arraySum = (arr) => arr
    .filter(i => i > 3)
    .reduce((sum, i) => sum + i);

```

Definir esta funcionalidad en un módulo nos permite aislarla del resto del código, de tal forma que simplemente importándola en otro punto de nuestro programa podemos usarla sin tener que reescribirla. Así pues, vamos a exportarla. 

Para ello debemos guardar la referencia a esta función dentro del objeto `module.exports` de nuestro archivo:

```javascript
const arraySum = (arr) => arr
    .filter(i => i > 3)
    .reduce((sum, i) => sum + i);

module.exports = { arraySum };
```

Esto hará que `arraySum` sea una función pública, es decir, que podamos importarla desde otro punto de nuestro código usando `require`. Así, por ejemplo, imaginemos que yo guardo este código en un archivo que se llama `sum.js`.

Ahora creamos un archivo `index.js` en el mismo directorio que `sum.js` y agregamos lo siguiente:

```javascript
const { arraySum } = require('./sums');

const array = [1, 2, 3, 4, 5, 6, 7];

const result = arraySum(array);

console.log(`El resultado es ${result}.`);
```

Si ejecutamos el archivo `index.js` veremos que todo funciona correctamente. Estamos utilizando la función `arraySum` que hemos definido en el módulo `sum.js`.

- Se ha importado directamente la función `arraySum` mediante *destructuring*. Otra opción sería:
	```javascript
	const sum = require('./sum');

	const array = [1, 2, 3, 4, 5, 6, 7];

	// En este caso si quisiéramos invocar a la función "sum" 
	// deberíamos hacerlo tal que así:
	const result = sum.arraySum(array);
	 
	console.log(`El resultado es ${result}.`);
	```

- Se ha omitido la extensión `.js` en el `require`. Al igual que el **REPL**, se entiende que cuando no se especifica extensión esta es `.js`.

- La palabra `require` hace referencia a un archivo que está en la misma carpeta que el que se está ejecutando. En otro caso, debemos especificar la ruta. Por ejemplo, si `sum.js` estuviese en la carpeta `utils`: 

  ```javascript
  const { arraySum } = require('./utils/sums');
  ```

  
