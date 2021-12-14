# Rutas o endpoints

Vamos a crear una API con Express en la que tendremos los siguientes endpoints:

- GET   /users
- GET   /users/:userId
- GET   /users?from=xx&limit=yy ===> No es necesario hacer una ruta nueva, solo modificar la ruta /users
- POST  /users ===> Debe crear un id (el siguiente número al último usuario), almacenarlo y devolver el usuario con el id
- PUT   /users/:userId ===> Debe devolver el usuario modificado
- DELETE /users/:userId

El recurso `usuario` tendrá la siguiente información
```javascript
{
  id: Number,
  username: String,
  email: String,
  password: String
}
```

El repositorio de usuarios será `inMemoryUsersRepository.js` que almacenará los usuarios en un array en memoria (ten en cuenta que al parar el servidor este repositorio volverá al estado inicial)