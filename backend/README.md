# PokeApi

PokeAPI es un backend desarrollado con Node.js y Express para gestionar una aplicación de tarjetas de Pokémon. Este backend simula la funcionalidad de ventas de tarjetas, permite la creación de usuarios y el inicio de sesión, y utiliza Nodemailer para el envío de correos electrónicos.

## Funcionalidades

- **Endpoints de Ventas**: Se han creado endpoints para simular las ventas, incluyendo:
  - **Ventas Diarias**: Endpoint para obtener las ventas realizadas en un día específico.
  - **Ventas Mensuales**: Endpoint para obtener el total de ventas en un mes específico.
  - **Total de Pokémon Más Vendidos**: Endpoint para obtener un listado de los Pokémon más vendidos.

- **Gestión de Usuarios**:
  - **Creación de Usuario**: Endpoint para registrar nuevos usuarios en la aplicación.
  - **Inicio de Sesión**: Endpoint que permite a los usuarios autenticarse y obtener un token de sesión.

- **Envío de Correos Electrónicos**: Integración con [Nodemailer](https://nodemailer.com/) para el envío de correos electrónicos de confirmación a los usuarios tras la realización de una compra. **Asegúrate de configurar las siguientes variables de entorno**:
  - **`GMAIL_USER`**: Tu dirección de correo electrónico de Gmail.
  - **`GMAIL_PASSWORD`**: La contraseña de tu cuenta de Gmail.
  - **`FROM`**: La dirección de correo electrónico desde la cual se enviarán los correos.

## Características

1. **Visualización de Tarjetas de Pokémon**:
   - Utiliza la API de Pokémon para obtener datos sobre diferentes Pokémon y sus tarjetas de colección.
   - Muestra visualmente las tarjetas en un diseño atractivo.

2. **Detalles Específicos**:
   - Al hacer clic en una tarjeta, los usuarios pueden ver detalles específicos del Pokémon (nombre, tipo, habilidades, etc.) y su valor de venta.

3. **Registro y Autenticación de Usuarios**:
   - Los usuarios deben iniciar sesión para realizar compras. También pueden registrarse proporcionando la información necesaria.

4. **Proceso de Compra**:
   - Implementa un sistema que permite a los usuarios realizar la compra de tarjetas a través de una plataforma de pago (simulada o real).
   - Al completar la compra, se registra la venta y se envía un correo electrónico de confirmación al usuario.

5. **Almacenamiento de Ventas**:
   - Las ventas se almacenan en una base de datos relacional.
   - Se incluye una sección para el administrador que muestra el total de las ventas realizadas.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express (simulado en este caso)
- **API**: Pokémon API

### Dependencias Principales

- `bcrypt`: Para hashing de contraseñas.
- `cors`: Para habilitar CORS.
- `dotenv`: Para manejar variables de entorno.
- `express`: Framework de Node.js para construir la aplicación.
- `jsonwebtoken`: Para la gestión de tokens JWT.
- `sequelize`: Para la interacción con PostgreSQL.
- `passport` y `passport-local`: Para la autenticación.

### Dependencias de Desarrollo

- `sequelize-cli`: Herramienta de línea de comandos para facilitar la gestión de migraciones y modelos en Sequelize.

## Cómo Empezar

Para poner en marcha el proyecto localmente, sigue estos pasos:

1. Clona este repositorio: `[git clone <URL_del_repositorio>](https://github.com/sorvylenny/technical_pokemon)`
2. Instala las dependencias: `npm install`
3. Configura las variables de entorno según necesites en un archivo `.env`.
4. Inicia el servidor en modo desarrollo con `npm run dev` o en producción con `npm start`.
5. Asegúrate de tener MongoDB corriendo en tu sistema o configurar un cluster remoto en tu archivo `.env`.
6. El backend está implementado en ExpressJS  y esta dockerizado para que la aplicación sea mas intuitiva.

## Servidor de Desarrollo

Ejecuta `npm run dev` para iniciar el servidor en modo desarrollo. El servidor se reiniciará automáticamente al realizar cambios en el código.

## Compilación y Producción

Ejecuta `npm start` para correr el servidor en modo producción.

## Autor

Este proyecto fue desarrollado por Katherine Flores. Puedes contactarme en <floresmKatherine@gmail.com> para más información.
