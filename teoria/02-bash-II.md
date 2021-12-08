# Bash II

## Variables de entorno

Cuando cualquier proceso se ejecuta en nuestra máquina, el sistema operativo, además de un espacio de memoria y otra serie de recursos de hardware, le asigna un *entorno*. Este *entorno* puede definirse como las variables a las que el proceso tiene acceso y puede consultar durante su ejecución. *Bash* no es un una excepción. Podemos consultar el entorno de ejecución en *Bash* con el sencillo comando:

```bash
env
```

Este entorno es crítico en el desarrollo de software, ya que muchas veces se usa para indicarle a un proceso una manera concreta de comportarse. Por ejemplo, podríamos indicarle (como haremos durante el curso) a un servidor web, cuál número de puerto que debe usar durante su ejecución; también podríamos indicarle cuál es la dirección de otro servicio que el servidor necesita (por ejemplo, su base de datos), etc.

&nbsp;

## Manejo de ficheros

*Bash* permite realizar muchas operaciones básicas con ficheros.

### Operaciones de lectura de ficheros

- Imprimir por pantalla todo el contenido de un fichero con `cat`.

- Scroll sobre el contenido de un fichero con `less`.

- Imprimir por pantalla las primeras líneas del contenido de un fichero con `head`.

- Imprimir por pantalla las últimas líneas del contenido de un fichero con `tail`.

- Imprimir por pantalla el número de líneas, palabras y caracteres de un fichero con `wc`.

### Operaciones de escritura de ficheros

- Crear un fichero nuevo vacío con `touch`.

- Editar un fichero con `nano`, `vim` o `emacs`.

### Operaraciones de búsqueda

 - Hacer búsquedas en el sistema de ficheros con `find`.

- Hacer búsquedas sobre el contenido de un fichero con `grep`.

&nbsp;

## Redirecciones y pipes

- La salida de los comandos (output) de bash puede redirigirse. Ejemplo:

   ```bash
   ls -lha > list.txt
   ```

- El output de un comando puede ser input de otro. Ejemplo:

   ```bash
   ls -lha | wc -l
   ```
