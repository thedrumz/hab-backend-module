# Formateador de estudiantes

El departamento de artes del **I.E.S In-ven Tao** nos ha encargado una aplicación que formatee datos de estudiantes y que los imprima por consola. El formato de entrada de cada un estudiante será:

```javascript
const student = {
  fullname: "Max Gómez Parada",
  dni: "53115111S",
  grade: 5,
};
```

## Reglas de negocio

Desde el departamento nos dicen que los datos de salida deben cumplir los siguientes criterios:

- El formato de entrada del nombre siempre será `Nombre Apellido_1 Apellido_2`
- El formato de salida para el nombre debe ser `Apellido_1 Apellido_2, Nombre` (hay que tener en cuenta que los nombres pueden ser compuestos. Ej: José Manuel Díaz González)
- El DNI puede estar vacío o ser `null`
- El DNI tiene que tener un formato válido (8 dígitos y una letra al final)
- En caso de que el DNI no sea válido ese estudiante se descartará y no se imprimirá
- Las calificaciones serán numéricas y del 0 al 10
- Las calificaciones se pasarán a formato texto de la siguiente manera:

  - < 5 insuficiente
  - \> 5 < 7 aprobado
  - \> 7 < 9 notable
  - \> 9 sobresaliente
