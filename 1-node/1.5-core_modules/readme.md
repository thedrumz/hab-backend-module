# Core Modules

Para finalizar nuestra aplicación el cliente nos dice que los datos de sus estudiantes están en un fichero `students.csv` y necesitan que la aplicación pueda leerlo, formatear los datos y guardar los datos formateados en un fichero `students.txt`. El formato en el que deben guardarse es:

```
Apellido_1 Apellido_2, Nombre
dni
calificación

Apellido_1 Apellido_2, Nombre
dni
calificación

...
```

Vamos a crear entonces un módulo `csvReader.js` y un módulo `csvWriter.js` que hagan uso del módulo `fs` de `node`. Esta es la documentación de este módulo [https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_promises_api](https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_promises_api). Recuerda que usaremos la API de promesas de `fs`.

**NOTA:** Por brevedad, teniendo en cuenta que esto es solo un ejercicio, estos dos módulos los dejaremos por ahora sin tests (pero que no sirva de precedente... 👹)