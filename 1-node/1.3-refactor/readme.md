# Refactor

Tenemos nuestra aplicación hecha y sabemos que funciona correctamente, porque hemos testeado todos los casos de uso. Pero el código notiene muy buena pinta 😅... Demasiado código en el mismo archivo, eso hace que leerlo sea tedioso y complejo. Además está mezclada nuestra lógica de la aplicación con los tests 💩, y dentro de nustra función `formatStundent` hay mucha lógica que podría estar separada en funciones

Vamos a intetar refactorizar un poco. Vamos a hacerlo por pasos, como tenemos tests cada paso que hagamos podemos ejecutarlos y comprobar que no hemos roto nada 🤗

1. Separar los tests de la lógica de la aplicación
2. Ejecutar los tests para ver que no se ha roto nada ✅
3. Trocear la función `formatStundent` en funciones más pequeñas, cada una que se ocupe de una responsabilidad, para hacer nustro código más legible y fácil de entender.
4. Ejecutar los tests para ver que no se ha roto nada ✅
5. Refactorizar los tests para que testeen las nuevas funciones pequeñas que hemos hecho, en vez de la función principal `formatStundent`
6. Ejecutar los tests para ver que no se ha roto nada ✅