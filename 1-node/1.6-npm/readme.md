# NPM

Hemos estado haciendo mucho trabajo en nuestra aplicación, pero algunas de las funcionalidades ya existen, hay librerías en `npm` que ya hacen lo que nosotros necesitamos sin necesidad de que lo implementemos. Además, probablemente estas librerías estén siendo usadas por mucha gente, con lo que estarán muy testeadas por la comunidad. Así que, como no queremos reinventar la rueda, vamos a ver como podemos usarlas en nuestro código.

Vamos a hacer dos cambios:

1. Para los tests usaremos `jest`, una de las librerías de testing en javascript más usadas. Nos ofrece muchas funcionalidades que nos van a ayudar mucho a la hora de hacer los tests. Aquí está la documentación [https://jestjs.io/docs/getting-started](https://jestjs.io/docs/getting-started)
2. El archivo `csv` de los estudiantes lo estamos parseando 'a mano', hay formas mucho más eficientes de hacer esto. Así que vamos a usar la librería `csv-parser` que nos va a ayudar en esta tarea. Esta es la documentación [https://www.npmjs.com/package/csv-parser](https://www.npmjs.com/package/csv-parser)

**NOTA:** Recuerda que lo primero que tenemos que hacer es `npm init` para poder luego instalar las dependencias

**NOTA 2:** `jest` al ser una librería de testing, solo queremos usarla durante el tiempo de desarrollo, por eso debemos añadir esta librería en la sección de **devDependencies** (dependencias de desarrollo) del archivo `package.json`
