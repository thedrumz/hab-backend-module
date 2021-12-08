# Cómo funciona Internet

Internet es una red masiva de máquinas interconectadas que intercambian datos siguiendo el protocolo _TCP/IP_. Cada máquina conectada a la red envía a otras máquinas información dividida en pequeños paquetes de datos.

El protocolo _TCP/IP_ establece una serie de reglas para la transmisión de esos paquetes de datos. La parte _IP_ establece como se divide la información múltiples paquetes y el destino de cada uno de ellos y el protocolo _TCP_ se encarga de hacer las comprobaciones necesarias para saber que la transmisión se realizó correctamente.

Podemos usar el comando `traceroute` para ver los nodos del camino que recorre la información que enviamos desde nuestro ordenador para llegar al destino. Estos nodos pueden variar en base a al estado de la red en cada momento.

El tráfico en internet se gestiona mediante una serie de acuerdos de intercambio, que garantizan que la información pueda llegar a cualquier punto de la red aunque un nodo intermedio esté caido.

Como ya hemos dicho, el destino de los paquetes se establece mediante direcciones _IP_, es decir, una serie de números únicos que determinan inequívocamente una identidad. Por ejemplo: 212.70.125.1 (_IPv4_) o 2607:f0d0:1002:0051:0000:0000:0000:0004 (_IPv6_).

Este último formato soporta muchas más combinaciones diferentes y se ha hecho necesario en los últimos años porque las direcciones _IPv4_ se están acabando. El proceso de cambio de _IPv4_ a _IPv6_ está actualmente en marcha.

## Qué es un DNS (Domain Name System)

Las direcciones _IP_ son poco amigables para los humanos, por ello se estableció desde los primeros tiempos de internet un sistema llamado _DNS_. Éste establece una relación entre nombres de dominio, formados por palabras, y las direcciones _IP_. Por ello cuando ponemos un dominio, por ejemplo: `google.com` en nuestro navegador lo primero que hace el ordenador es usar el sistema _DNS_ para convertir ese dominio en la dirección _IP_ asociada y empezar la transferencia de datos usando esa dirección.

El sistema _DNS_ es una base de datos descentralizada de relación entre nombres de dominio y direcciones _IP_, los servidores _DNS_ tienen una dirección _IP_ a la que los ordenadores le hacen constantemente preguntas sobre las direcciones reales de los dominios.

Este sistema de nombres está organizado en dominios de varios niveles, ordenados de derecha a izquierda. Los dominios de primer nivel son _.com, .net, .org, .es, .gal, etc._, gestionados por la _Internet Assigned Numbers Authority_. Los dominios de segundo nivel está gestionado por diferentes organizaciones y gobiernos de todo el mundo. Los dominios de tercer nivel y siguientes son los llamados genericamente subdominios y están gestionado por el propietario del dominio de segundo nivel.

Ejemplo, en la dirección `https://drive.google.com`, tendríamos los componentes:

-   `https://`: define el protocolo que se está usando, en este caso _HTTP_ securizado.

-   `drive`: define el dominio de tercer nivel, gestionado internamente por _Google_.

-   `google`: define el dominio de segundo nivel, comprado por _Google_ a un proveedor de direcciones.

-   `com`: define el dominio de primer nivel, gestionado por _Internet Assigned Numbers Authority_.

## Qué es un host

Un _host_ en internet es llamado a una máquina conectada a la red con una dirección _IP_, a la cual está asociada un nombre de dominio. Los _hosts_ reciben paquetes de datos. Por lo general usamos el término cliente para referirnos a una máquina (un ordenador, un móvil, un coche, etc.) o al software (un navegador, una aplicación de mensajería, etc.) que envía peticiones a un _host_.

Los _hosts_ pueden recibir miles de peticiones de muchos tipos cada segundo. Para ordenarlas usan puertos, una convención numérica que establece una serie de entradas posibles de datos. Cada entrada normalmente está gestionada por una aplicación, por ejemplo:

| Puerto  | Aplicacion |

|---------|-------------------------------|

| 80      | Servidor web (http)           |

| 443     | Servidor web seguro (https)   |

| 22      | Shell seguro (ssh)            |

| 20/21   | Transmisión de ficheros (ftp) |

## Peticiones HTTP

Un servidor web es un programa de software. Este programa se encarga de gestionar peticiones _HTTP_. Estas peticiones llegan al _host_ a través del puerto 80 o el 443. Estas peticiones son realizadas en su mayoría por navegadores, pero potencialmente pueden ser enviadas desde otras aplicaciones.

Las peticiones _HTTP_ intercambian información entre un cliente y un servidor a través de URLs.

Por ejemplo imaginemos la petición: `https://dominio.com/css/style.css`. Esta petición realmente nuestro navegador la transformará internamente y la enviará al puerto 433 del host `dominio.com` como:

```bash
GET /css/style.css HTTP/1.1
Host: dominio.com
Accept-Language: en
Connection: Keep-Alive
```

Vemos que en una petición sencilla, se transmite información acerca del método (`GET`), el protocolo exacto (`HTTP/1.1`), el lenguaje esperado en la respuesta, e incluso se indica que se quiere mantener viva la conexión porque se pretende enviar más peticiones próximamente.

La respuesta del servidor tendrá una forma parecida a esta:

```bash
HTTP/1.1 200 OK
Date: Mon, 27 Apr 2020 11:28:02 GMT
Server: nginx
Content-Length: 9743
Content-Type: text/css
```

De nuevo, vemos que al cliente, además de propio archivo `.css` que ha pedido, se le transmiten más metadatos sobre la propia respuesta del servidor.

Cabe destacar una de las cabeceras de la respuesta más importantes, el _status code_. Los _status code_ se usan en los servidores para indicar el resultado de la operación que se ha ejecutado con motivo de la _request_. Los ejemplos más corrientes son:

-   200 - Ok
-   400 - Bad Request
-   403 - Forbidden
-   404 - Not Found
-   500 - Internal Server Error

El [listado completo](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) incluye muchos más códigos.
