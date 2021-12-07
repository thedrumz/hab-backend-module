# Testing

Para asegurarnos de que nustra aplicación funciona correctamente (y dormir tranquilos por las noches) añadiremos tests a nuestra función `formatStundent`cubriendo todos los casos de uso. Para ello crearemos varias funciones que le pasen datos a `formatStundent` y comprueben que los valores devueltos son correctos

## Los casos de uso serán:

- La función debe devolver el nombre del estudiante en formato `Apellido_1 Apellido_2, Nombre`
- Si el nombre del estudiante es compuesto el formato de salida debe ser `Apellido_1 Apellido_2, Nombre compuesto`
- Si el DNI es vacío o null devolverá una excepción
- Si el DNI es inválido (no cumple con las reglas 8 dígitos y una letra al final) la función devolverá una excepción
- Las calificaciones deberán transformarse a formato texto de la siguiente manera:

  - < 5 insuficiente
  - \> 5 < 7 aprobado
  - \> 7 < 9 notable
  - \> 9 sobresaliente
