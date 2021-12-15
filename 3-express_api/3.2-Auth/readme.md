# Autenticación / Autorización

Queremos que nustra API tenga un sistema de autenticación de usuarios y autorización para algunos de los _endpoints_. Así que vamos a añadir lo siguiente.

1. Añadiremos el endpoint `POST /auth/register` que recibirá un `user` en el _body_, y:
    - comprobará que el user tiene `email` y `password` como mínimo
    - comprobará que el usuario no existe
    - encriptará el password usando el módulo `bcrypt` (documentación [aquí](https://www.npmjs.com/package/bcrypt))
    - guardará el usuario (con el password encriptado)
    - devolverá el usuario guardado (sin el password IMPORTANTE!)

<br/>

2. Añadiremos el endpoint `POST /auth/login` que recibirá unas credenciales ´{ email: String, password: String }´ en el _body_ y:
    - comprobará que las credenciales no estén vacías
    - comprobará que el usuario existe (buscando por email)
    - comprobará que el password coincide con el almacenado (usando el módulo `bcrypt`)
    - generará un `JWT` con en módulo `jsonwebtoken` (documentación [aquí](https://jwt.io/introduction))
    - devolverá el token al cliente
