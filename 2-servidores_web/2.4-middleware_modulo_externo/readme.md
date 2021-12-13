# Middlewares con módulos externos

Existen módulos instalables mediante `npm` que se pueden usar como _middleware_. Un ejemplo es el módulo `morgan`, encargado de procesar información de todos los eventos que ocurren en un servidor web. Este tipo de módulos se conoce como _logger_, es decir, un componente del sistema encargado de las labores de registro de actividad.

`morgan` puede usarse para imprimir por pantalla datos de cada petición sin tener que hacer un `console.log`. Para realizar la instalación:

```bash
npm i morgan -D
```

Vamos a añadirlo a nuestro proyecto para tener un registro de las peticiones que vamos haciendo