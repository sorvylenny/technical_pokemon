
# PokeAPI Project

Este es un proyecto completo de PokeAPI que simula la funcionalidad de ventas de tarjetas de Pokémon. La aplicación está dividida en dos partes: un `backend` desarrollado con Node.js, postgresSQL y Express, y un `frontend` en Angular 17V. Toda la aplicación está dockerizada para facilitar el despliegue y ejecución.

## Estructura del Proyecto

```
├── backend/                 # Código del servidor y lógica de negocio
│   ├── controllers/         # Controladores para gestionar las rutas
│   ├── middleware/          # Middleware para la autenticación y autorización
│   ├── models/              # Definición de modelos de la base de datos
│   ├── repositories/        # Repositorios para interactuar con los modelos
│   ├── routes/              # Definición de las rutas del API
│   ├── seed/                # Scripts para poblar la base de datos con datos iniciales
│   ├── services/            # Lógica de negocio y servicios utilizados por los controladores
│   ├── views/               # Plantillas para el frontend (si aplica)
│   ├── index.js             # Punto de entrada principal del backend
│   └── package.json         # Dependencias del backend
│
├── frontend/                # Aplicación de Angular para el frontend
│   ├── src/                 # Código fuente de la aplicación Angular
│   ├── server.ts            # Configuración del servidor para la aplicación Angular
│   ├── angular.json         # Configuración de Angular
│   └── package.json         # Dependencias del frontend
│
├── collection/              # Colección de Postman para probar el API
│   └── pokeApi.postman_collection.json
│
├── .env                     # Archivo de configuración de variables de entorno
├── .env.template            # Plantilla de variables de entorno
├── docker-compose.yaml      # Configuración principal de Docker Compose
├── Dockerfile.backend       # Dockerfile para el backend
├── Dockerfile.frontend      # Dockerfile para el frontend
└── README.md                # Documentación del proyecto
```

## Prerrequisitos

- [Docker](https://www.docker.com/) instalado en tu máquina.
- [Docker Compose](https://docs.docker.com/compose/) para la orquestación de contenedores.

## Variables de Entorno

Antes de ejecutar el proyecto, necesitas configurar las variables de entorno en el archivo `.env`. Puedes basarte en el archivo `.env.template` y actualizarlo con tus propias configuraciones:

- `DB_USER`: Usuario de la base de datos PostgreSQL.
- `DB_PORT`: Puerto de la base de datos.
- `DB_PASSWORD`: Contraseña de la base de datos PostgreSQL.
- `DB_CONTAINER`: Nombre del contenedor bd.
- `DB_NAME`: Nombre de la base de datos.
- `GMAIL_USER`: Usuario de Gmail para Nodemailer.
- `GMAIL_PASSWORD`: Contraseña de Gmail para Nodemailer.
- `FROM`: Dirección de correo electrónico para Nodemailer.

Ejemplo de `.env`:

```
# Base de datos PostgreSQL
DB_PASSWORD=your_dB_PASSWORD
DB_NAME= ejemplo pokeapi
DB_CONTAINER= Ejemplo PokeApi
DB_USER=your_postgres_user
DB_PORT= ejemplo 5552

# Configuración de Nodemailer
GMAIL_USER=your_gmail_user
GMAIL_PASSWORD=your_gmail_password
FROM=your_email_address

#auth
JWT_SECRET= your__password
```

## Configuración y Ejecución con Docker

1. **Clonar el repositorio**:

   ```bash
   git clone https:[//github.com/tu-usuario/pokeapi.git](https://github.com/sorvylenny/technical_pokemon)
   cd technical_pokemon
   ```

2. **Crear el archivo `.env` a partir del `.env.template`**:

   ```bash
   cp .env.template .env
   ```

   Luego, edita el archivo `.env` con los valores correspondientes.

3. **Construir y ejecutar los contenedores de Docker**:

   Desde la raíz del proyecto (donde se encuentra el `docker-compose.yaml`), ejecuta:

   ```bash
   docker-compose up --build
   ```

   Esto levantará tres contenedores principales:

   - **Backend**: Servidor Express corriendo en `http://localhost:3000`.
   - **Frontend**: Aplicación Angular corriendo en `http://localhost:4000`.
   - **PostgreSQL**: Base de datos para la aplicación.

4. **Acceder a la Aplicación**:

   - **Frontend**: [http://localhost:4000](http://localhost:4000)
   - **Backend** (API): [http://localhost:3000](http://localhost:3000)

## Colección de Postman

En la carpeta `collection/` encontrarás el archivo `pokeApi.postman_collection.json`, que contiene todas las rutas y endpoints del backend para probar la funcionalidad de la API.

### Instrucciones para Usar la Colección de Postman

1. Abre Postman.
2. Ve a **File > Import**.
3. Selecciona el archivo `pokeApi.postman_collection.json`.
4. Ahora tendrás acceso a todos los endpoints organizados para probar las funcionalidades del backend.
5. Después de ejecutar la collection y arrancar la aplicacion es importante ejecutar el ep seed.

## Despliegue de la Base de Datos con Sequelize

El proyecto utiliza Sequelize como ORM para gestionar la base de datos PostgreSQL. El script de seed inicial se encuentra en la carpeta `backend/seed/` y se ejecutará automáticamente al levantar el contenedor de Docker.

## Scripts de npm

### Backend

- **`npm start`**: Inicia el servidor en producción.
- **`npm run dev`**: Inicia el servidor en modo desarrollo con `nodemon`.
- **`npm run seed`**: Población de la base de datos con datos de ejemplo.

### Frontend

- **`ng serve`**: Inicia la aplicación Angular en modo desarrollo.
- **`ng build`**: Construye la aplicación para producción.

## Consideraciones Finales

- **Migraciones**: Si se realizan cambios en los modelos, es importante actualizar la base de datos con Sequelize.
- **Nodemailer**: La integración de correos electrónicos requiere que tengas habilitado el acceso a aplicaciones menos seguras en tu cuenta de Gmail.

## Autor

Desarrollado por Katherine Flores. Para más información o sugerencias, puedes contactarme en <floresmKatherine@gmail.com>