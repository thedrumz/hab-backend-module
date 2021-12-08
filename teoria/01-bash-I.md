# Bash I

**Bash** es un interprete de comandos, o lo que es lo mismo, un `shell`. Existen otros intérpretes de comandos, pero tal vez `bash` es el más extendido y uno de los más amigables para el usuario.

- Puede usarse para ejecutar comandos o para automatizar tareas usando scripts.

- Es *case-sensitive* (distingue mayúsculas y minúsculas).

- Permite moverse por el sistema de ficheros (pwd, cd, ls...).

- Permite manipular ficheros y directorios (mkdir, cp, mv, rm...).

- Permite consultar su propio historial de comandos usando `history`.

&nbsp;

## 	Comandos básicos

- `pwd`: consultar la ruta del directorio actual

- `cd`: moverse a otro directorio.

- `ls`: listar archivos y directorio.

- `mkdir`: crear nuevos directorios.

- `cp`: copiar ficheros o directorios.

- `mv`: mover o renombrar ficheros y directorios.

- `rm`: borrar ficheros o directorios.

&nbsp;

## Argumentos de un comando

Los comandos están compuestos por el nombre del comando y una serie de argumentos. Los argumentos que no empiezan por guión son argumentos de entrada, por ejemplo:

```bash
cp test.txt final.txt
```

En ese caso `cp` es el comando y recibe dos argumentos de entrada: `test.txt` y `final.txt`. Lo que hará será copiar el fichero `test.txt` en `final.txt`. Si este último no existe lo crea.

Si los argumentos que empiezan por un guión determinan una serie de opciones del comando:

```bash
ls -l -a -h
```

También se pueden combinar en una sola opción. El comando anterior sería equivalente a:

```bash
ls -lah
```

Para ver qué hace cada argumento podemos ejecutar `man nombre_comando` en este caso:

```bash
man ls
```

Además de `man`, podemos usar `tldr` (en inglés: *too long; didn't read*) para ver los usos y una breve descripción sobre la utilidad de un comando en particular. 

Este paquete no está instalado por defecto en la mayoría de distribuciones Linux (ni en MacOS) por lo que para usarlo es necesaria una instalaciónm previa:

```bash
sudo apt install tldr # Ubuntu
brew install tldr # MacOS
```
