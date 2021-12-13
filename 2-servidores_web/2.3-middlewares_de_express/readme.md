# Middlewares de Express.js

Necesitamos añadir algo de seguridad a nuestra aplicación, no queremos que todo el mundo tenga acceso. Para ello vamos a requerir una clave privada para cada una de las peticiones de nuestro servidor.

Vamos a implementar esta funcionalidad usando un middleware que compruebe si la clave proporcionada en el header `authorization` coincide con nuestra clave de acceso. En caso afirmativo pasaremos la request al siguiente middleware, si no informaremos de que la clave proporcionada no es válida (con el código http correspondiente 😉)