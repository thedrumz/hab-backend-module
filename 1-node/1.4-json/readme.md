# JSON

Nuestra aplicación ya puede formatear los datos de un estudiante correctamente. Pero nuestro cliente quiere que pueda imprimir por consola muchos registros formateados a la vez. Así que vamos a implementar esa funcionalidad haciendo uso de un JSON que nos han pasado con unos cuantos registros de estudiantes.

Para este ejercicio vamos a usar TDD (Test Driven Development o desarrollo guiado por test). La idea de esto es hacer primero el test y luego implementar la funcionalidad

1. Crea el test para la funcionalidad de formatear muchos estudiantes (el test tiene que fallar porque la funcionalidad todavía no existe)
2. Implementa la función que formatea multiples estudiantes (haz que el test pase)
3. Refactoriza el código 🪄
4. Imprime por consola todos los registros usando el archivo `students.json`