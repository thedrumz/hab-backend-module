# Verificación de usuarios

Cuando un usuario navega por nuestra página web hay ciertas acciones para las cuáles vamos a exigir que dicho usuario sea miembro de nuestra web. Por ejemplo, tomando como referencia el diario de viajes creado anteriormente:

- Crear una nueva entrada.

- Editar una nueva entrada.

- Borrar una entrada.

Debemos cerciorarnos de que el usuario que está intentando realizar cualquiera de esas acciones se ha registrado y está logeado como un miembro de nuestra página. Para lograr ese objetivo le ortorgaremos un *token* al usuario cuando realice un login con la información correcta.

&nbsp;

## Token

Un *token* no es más que una cadena de texto codificada. En nuestro caso haremos uso de *JWT* (*Json Web Token*). Se divide en tres partes y tiene un formato como el que sigue:

![Json Web Token](https://research.securitum.com/wp-content/uploads/sites/2/2019/10/jwt_ng1_en.png)

- **Header**: encabezado dónde se indica, como mínimo, el algoritmo y el tipo de token.
    
- **Payload**: en esta parte se incluyenlos datos del usuario y del propio token, así como toda la información que queramos añadir a mayores.
    
- **Signature**: firma que nos permite verificar si el token es válido. La firma (o *signature*) se construye con la ayuda del algoritmo [*HMACSHA256*](https://docs.microsoft.com/es-es/dotnet/api/system.security.cryptography.hmacsha256?view=net-5.0) , cifrado además con el algoritmo [SHA de 256 bits](https://es.wikipedia.org/wiki/SHA-2). 

&nbsp;

## Construcción 

Para lograr la estructura real del *JWT* (tres partes separadas por puntos), el *header* y el *payload* deben codificarse con *Base64*, posteriormente se crea el *signature* y finalmente el token:

```javascript
const base64Header = base64Encode(header);
// Resultado = eyJhbGciOiJlUzl1NilslnR5cCl61kpXVCJ9

const base64Payload = base64Encode(payload);
// Resultado = eyJzdWIiOilxMjMONTY30DkwliwibmFtZSl61kpvaG4gRG911iwiaWFOljoxNTE2MjM5MDlyfQ

const signature = HS256(base64Header + '.' + base64Payload, secret);
// Resultado = XbPfblHMl6arZ3Y922BhjWgQzWXcXNrzOogtVhfEd2o 

// Esto dará como resultado un token JWT como el que figura en la imagen anterior. 
const token = base64Header + '.' + base64Payload + '.' + signature;
```

> Para crear la firma debemos proporcionar un *secret*. Esto no es más que un string alfanumérico que podemos crear por nuestra cuenta y que se utiliza para crear la firma. Se supone que cada aplicación tiene su propio secreto y no deberíamos compartirlo con nadie.

&nbsp;

## Json Web Token

Con la finalidad de asignar un token a nuestros usuarios cada vez que hagan login en nuestra página utilizaremos el módulo `jsonwebtoken`:

```node
npm i jsonwebtoken
```

```javascript
const jwt = require('jwt');

// Cadena alfanumérica aleatoria. Es recomendable guardar este secreto en el ".env".
const SECRET = 'jd67SgY7s5Mnbsjs3DnYGHE3';

// Creamos un objeto con la info extra que querramos agregar al token.
const tokenInfo = {
    idUser: 5,
    role: 'normal'
}

// Generamos el token con el método "sign" el cuál recibe como argumentos un objeto con la info
// extra, el secreto y el tiempo de vencimiento del token.
const token = jwt.sign(tokenInfo, SECRET, {
    expiresIn: 7d // 7 días
});

console.log(token);
```

&nbsp;

## Decodificando el token

Cuando un usuario se logea en nuestra página retornaremos al cliente un token válido que deberá ser almacenado en un lugar seguro. Cada vez que el usuario quiera realizar alguna acción en nuestra página que requiera permisos, el cliente deberá enviar al servidor la cabecera de autorización con el *token* correspondiente junto a la petición en cuestión:

```javascript
Headers {
    Authentication: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJKV1QiLCJpYXQiOjE2MjM5Mjk4..."
}
```

&nbsp;

La labor del backend será decodificar esta información para comprobar si se trata de un usuario válido. Este trabajo se suele realizar en un *middleware* que posteriormente inyectará la información del *token* en la *request* crando una nueva propiedad:
```javascript
const  jwt = require('jsonwebtoken');

const  authUser = async (req, res, next) => {
    try {
        const { authorization } = req.header;

        // Si no hay cabecera de autorización...
        if(!authorization) throw new Error('Se requirere una cabezera de autorización');

        // Debemos usar el mismo secreto que utilizamos para crear el token.
        const SECRET = 'jd67SgY7s5Mnbsjs3DnYGHE3';

        // Variable donde almacenaré la info del token si todo va bien.
        let tokenInfo;

        try {
            // Intentamos verificar el token.
            tokenInfo = jwt.verify(authorization, SECRET);
        } catch (_) {
            // Si algo va mal lanzamos este error.
            throw new Error('El token no es válido');
        }

        // Si llegamos hasta aquí quiere decir que el token es válido. Lo habitual en este punto
        // es crear una nueva propiedad en la "request" que incluya la info del token para poder
        // hacer uso de esta información en los próximos middlewares o endpoints.
        req.userAuth = tokenInfo;
        
        // Pasamos el control al siguiente middleware / endpoint.
        next();
    } catch(error) {
        next(error);
    }
}

module.exports = authUser;
```

> A partir de este momento todos los *endpoints* donde usemos este *middleware* dispondrán de una nueva propiedad en la *request* que contendrá la info sobre el usuario que está realizando la consulta.