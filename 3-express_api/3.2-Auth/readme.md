# Autenticación / Autorización

Queremos que nustra API tenga un sistema de autenticación de usuarios y autorización para algunos de los _endpoints_. Así que vamos a añadir lo siguiente.

1. Añadiremos el endpoint `POST /auth/register` que recibirá un `user` en el _body_, y:
    - comprobará que el user tiene `email` y `password` como mínimo
    - comprobará que el email que nos llega no existe en ninguno de los usuarios ya guardados (los email tienen que ser únicos)
    - encriptará el password usando el módulo `bcrypt` (documentación [aquí](https://www.npmjs.com/package/bcrypt))
    - guardará el usuario (con el password encriptado)
    - devolverá el usuario guardado (sin el password IMPORTANTE!)

<br/>

2. Añadiremos el endpoint `POST /auth/login` que recibirá unas credenciales ´{ email: String, password: String }´ en el _body_ y:
    - comprobará que las credenciales no estén vacías
    - comprobará que el usuario existe (buscando por email)
    - comprobará que el password coincide con el almacenado (usando el módulo `bcrypt`)
    - generará un `JWT` con el módulo `jsonwebtoken` (documentación [aquí](https://jwt.io/introduction)) y añadira el `user.id` y una fecha de expiración al payload del token (Ej, `{ exp: en_una_hora, user: { id: 1 } }`)
    - devolverá el token al cliente

<br/>

3. Crearemos un middleware que compruebe que la autorización es correcta. Este middleware estará a nivel de endpoint (no a nivel de aplicación), de esta forma podremos añadirlo a los endpoints en los que queremos requerir autorización. El middleware hará lo siguiente:
    - comprobar que las peticiones tienen un token en el header `Authorization` y es válido (usando el módulo `jsonwebtoken`con nuestra clave privada)
    - Si no existe token en la cabecera o es inválido devolveremos inmediatamente un error en la `response` con el código correspondiente
    - Si el token es válido almacenaremos el usuario (que hemos añadido previamente al crear el token en el `payload`) en un objeto `user` (este objeto no es de la request de express, lo estamos creando nosotros) y pasaremos al siguiente middleware
