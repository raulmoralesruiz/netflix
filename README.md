# Netflix

#### Raúl Morales Ruiz

---

## Introducción

El objetivo del proyecto es trabajar sobre un sistema de contenido en streaming, como Netflix.

En el desarrollo de este proyecto se combinarán diferentes asignaturas:

- DWES, apartado back/servidor realizada con Spring.
- DIW, apartado front realizado con Bootstrap.
- DWEC, apartado front/visual realizado con Angular.

En el apartado de funciones disponibles se indican las distintas posibilidades del proyecto.

## Requisitos

- Tener instalado [Spring Tool Suite](https://spring.io/tools), para la parte backend.
- Utilizar base de datos [MySQL](https://www.mysql.com/), para la parte de backend.
- Utilizar algún navegador web (preferiblemente [Google Chrome](https://www.google.com/intl/es_es/chrome/)), para la parte frontend.

## Preparación del entorno

Para utilizar la aplicación web, primero debemos descargar los entornos backend y frontend.

- Descargamos el [proyecto backend](https://github.com/raulmoralesruiz/DWES_netflix) desde el siguiente enlace:
  https://github.com/raulmoralesruiz/DWES_netflix

- Descargamos el [proyecto frontend](https://github.com/raulmoralesruiz/netflix) desde el siguiente enlace: https://github.com/raulmoralesruiz/netflix

### Backend

- Importamos el proyecto en Spring.

        File -> Import -> Maven -> Existing Maveng Projects

  Una vez agregado el proyecto, Spring descargará las dependencias necesarias (podemos comprobarlo en la esquina inferior derecha.)

- Base de datos.

  - Creamos la base de datos, según las propiedades correspondientes del proyecto backend.

          Revisar fichero /src/main/resources/application.properties

  - Arrancamos la base datos

- Iniciamos el servidor desde Spring

  Tras importar el proyecto, iniciamos el servidor desde el apartado "Boot Dashboard" (normalmente ubicado en la parte inferior izquieda.)

        Desplegamos el botón "local" -> click botón derecho sobre "jacaranda2" -> click sobre start

### Frontend

- Iniciamos el proyecto desde la terminal.

        ng serve -o

  Una vez iniciado el proyecto, se abrirá una ventada del navegador predeterminado del sistema.

- Abrimos el navegador

  Una vez dentro del navegador, podremos utilizar la aplicación.

## Funciones disponibles

En los siguientes apartados se define el comportamiento de cada pantalla.

Cada pantalla comparte el mismo encabezado y pie de página.

### Header

En esta sección se encuentra la barra de navegación de todas las webs.

Dentro de la barra de navegación, se encuentran diferentes elementos:

- **Logo del sitio**

  Sirve para redirigir a la pantalla de bienvenida.

- **Enlaces del sitio**

  Sirve para redirigir a cada sección del sitio web.

- **Buscador**

  Muestra campo de búsqueda junto al botón para ejecutarla.

### Footer

En esta sección se encuentran datos de interés del sitio web junto a enlaces de redes sociales habituales.

### Welcome

En esta sección se encuentra la pantalla de bienvenida para el usuario.

Se muestran varias imágenes en un slider y también un botón que redirige a la sección Home.

### Home (Guest user)

En esta sección se muestra un aviso al usuario comentando que todavía no está registrado en el sistema.

Esta sección sólo se mostrará si el usuario no está registrado.

Se muestran dos opciones, en forma de botón:

- Login

  Este botón redirige al usuario a la sección Login, para iniciar sesión en el sistema.

- Register

  Este botón redirige al usuario a la sección Register, para registrarse en el sistema.

### Register

En esta sección se muestra un formulario donde el usuario introducirá sus datos y los enviará mediante petición POST al servidor, creando un nuevo cliente.

Se muestran diferentes inputs con los correspondientes labels y al final un botón que ejecutará la petición POST para enviar los datos.

### Login

En esta sección se muestra un formulario donde el usuario introducirá su nombre de usuario para acceder al sistema y al final un botón que comprobará si el usuario existe.

- Si el usuario está registrado, se redirige a la sección Home.
- Si el usuario no está registrado, se mostrará un mensaje de aviso indicando que el acceso no se puede realizar.

### Home (Registered user)

En esta sección se muestra un desplegable donde el usuario seleccionará su tipo de subscripción.

Una vez seleccionada, el usuario podrá activarla pulsado el botón que aparece abajo del desplegable.

### Home (Registered admin)

En esta sección se muestra un botón que redirige al usuario administrador al apartado de administración.

Además se muestra lo mismo que puede ver un usuario no administrador, un desplegable donde el usuario seleccionará su tipo de subscripción.

Una vez seleccionada, podrá activarla pulsado el botón que aparece abajo del desplegable.

### home (Subscribed user)

En esta sección se muestra un mensaje de bienvenida al usuario y el contenido disponible específico según su tipo de subscripción.

Primero se muestra un listado de productos disponibles, indicando los detalles de cada producto junto a un botón que permitirá la visualización.

También existe un botón que permite mostrar todas las visualizaciones del usuario.

### Admin

En esta sección se muestran tres apartados:

- **POST**

  En esta sección aparece un formulario donde se introducen los datos de un producto, una vez introducidos se pulsará el botón para enviar los datos al servidor (donde se registrará el producto en base de datos.)

- **GET**

  Se muestran varios botones para visualizar los datos de cada entidad:

  - **Closed**

    Al pulsar este botón, se cerrará cualquier vista activa (Customers, Products, Visuals o Subscriptions).

  - **Customers**

    Al pulsar este botón, se mostrará un conjunto de tarjetas con todos los clientes existentes en el sistema.

    Al final de la tarjeta aparece un botón que permite eliminar el cliente.

  - **Products**

    Al pulsar este botón, se mostrará un conjunto de tarjetas con todos los productos existentes en el sistema.

    Al final de la tarjeta aparece un botón que permite eliminar el producto.

  - **Visuals**

    Al pulsar este botón, se mostrará un conjunto de tarjetas con todas las visualizaciones existentes en el sistema.

    Al final de la tarjeta aparece un botón que permite eliminar la visualización.

  - **Subscriptions**

    Al pulsar este botón, se mostrará un conjunto de tarjetas con todas las subscripciones existentes en el sistema.

    Al final de la tarjeta aparece un botón que permite eliminar la subscripción.

- **SEARCH**

  En esta sección aparece un pequeño formulario donde se introduce el id de un cliente, una vez introducido se pulsará el botón para enviar los datos al servidor.

  Si el usuario existe, se mostrará una tabla con los datos correspondientes.

  Después de la tabla aparece un botón que permite ocultar la tabla.
