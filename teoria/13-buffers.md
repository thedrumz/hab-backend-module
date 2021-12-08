# Buffers

Un búfer es un espacio en la memoria (en general, RAM) que almacena datos binarios. Podemos acceder a estos espacios de memoria haciendo uso de la clase `Buffer`. Los búferes almacenan datos de forma similar a un array. La principal diferencia es que una vez creado el buffer este no puede ser modificado.

Cuando se realizan solicitudes HTTP, estas devuelven flujos de datos que se almacenan temporalmente en un búfer interno. Por ejemplo, cuando el servidor recibe una petición de tipo `post`, esta incluye un `body` en formato buffer. Si queremos descifrar la información de dicho `body` debemos convertir el buffer a un formato más adecuado, es decir, debemos deserializar el buffer.

## Serialización

Serializar consiste en el proceso de convertir un objeto en memoria en una cadena de bytes para poder guardarlo en el disco o enviarlo a través de la red. Veamos que sucede en el lado del cliente:

```javascript
// Imaginemos que un nuevo usuario se registra en nuestra web. Lo que haremos en el
// cliente será enviar una petición al backend incluyendo un body con todos los datos.
const body = {
    username: 'david97',
    email: 'david@email.com',
    password: '123456',
};

// Pero antes de enviar la información debemos convertir el objeto en un texto. Podemos
// hacer uso del método "stringuify" de "JSON".
const stringifyBody = querystring.stringify(body);

// Por último, para facilitar el viaje de este body a través de la red lo convertimose en
// un buffer de datos. Este proceso se llama serialización.
const serializedBody = Buffer.from(stringifyBody);
```

Por norma general, este proceso suele estar automatizado por lo que suele pasar desapercibido, pero es imprescindible para que la información pueda circular a través de la red.

## Deserialización

Deserializar es el proceso inverso: convertir una cadena de bytes en un objeto en memoria. Ahora le ha llegado el turno al lado del servidor. Tomaremos como referencia el ejemplo anterior:

```javascript
// Un usuario se ha registrado en nuestra web y el cliente ha enviado una petición de
// registro al servidor con los datos del usuario, pero esta información (el body) nos
// llega en un buffer de datos, debemos deserializarla.

// Creamos un array donde pushearemos todos los buffers que nos lleguen.
const bufferArray = [];

// Pusheamos el buffer de datos.
bufferArray.push(serializedBody);

// Concatenamos todos los buffers y los transformamos en una cadena de texto. El método
// "concat" de la clase buffer requiere como argumento un array de buffers, no podemos
// pasarle el buffer directamente aunque solo sea uno.
const deserializedBody = Buffer.concat(bufferArray).toString();

// Transformamos el texto anterior en un objeto JS y... ¡listo!
const parsedBody = querystring.parse(deserializedBody);
```
