# Refactor

Tenemos nuestra aplicaci贸n hecha y sabemos que funciona correctamente, porque hemos testeado todos los casos de uso. Pero el c贸digo notiene muy buena pinta 馃槄... Demasiado c贸digo en el mismo archivo, eso hace que leerlo sea tedioso y complejo. Adem谩s est谩 mezclada nuestra l贸gica de la aplicaci贸n con los tests 馃挬, y dentro de nustra funci贸n `formatStundent` hay mucha l贸gica que podr铆a estar separada en funciones

Vamos a intetar refactorizar un poco. Vamos a hacerlo por pasos, como tenemos tests cada paso que hagamos podemos ejecutarlos y comprobar que no hemos roto nada 馃

1. Separar los tests de la l贸gica de la aplicaci贸n
2. Ejecutar los tests para ver que no se ha roto nada 鉁?
3. Trocear la funci贸n `formatStundent` en funciones m谩s peque帽as, cada una que se ocupe de una responsabilidad, para hacer nustro c贸digo m谩s legible y f谩cil de entender.
4. Ejecutar los tests para ver que no se ha roto nada 鉁?
5. Refactorizar los tests para que testeen las nuevas funciones peque帽as que hemos hecho, en vez de la funci贸n principal `formatStundent`
6. Ejecutar los tests para ver que no se ha roto nada 鉁?