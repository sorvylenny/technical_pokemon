# Pokeplace

**Pokeplace** es una aplicación web construida en Angular que permite a los usuarios visualizar, comprar y gestionar tarjetas de Pokémon. La aplicación está diseñada con un enfoque moderno, utilizando características como lazy loading y un modelo standalone para optimizar la carga y el rendimiento.

## Características

1. **Visualización de Tarjetas de Pokémon**:
   - Muestra visualmente las tarjetas en un diseño atractivo sobre diferentes Pokémones.

2. **Detalles Específicos**:
   - Los usuarios pueden ver detalles específicos del Pokémon (nombre, tipo, habilidades, etc.) y su valor de venta.

3. **Registro y Autenticación de Usuarios**:
   - Los usuarios deben iniciar sesión para realizar compras. También pueden registrarse proporcionando la información necesaria.

4. **Proceso de Compra**:
   - Implementa un sistema que permite a los usuarios realizar la compra de tarjetas a través de una plataforma de pago (simulada o real).
   - Al completar la compra, se registra la venta y se envía un correo electrónico de confirmación al usuario.

5. **Almacenamiento de Ventas**:
   - Las ventas se almacenan en una base de datos relacional.
   - Se incluye una sección para el administrador que muestra el total de las ventas realizadas.

## Tecnologías Utilizadas

- **Frontend**: Angular, Bootstrap
- **Backend**: Node.js, Express (simulado en este caso)
- **API**: Pokémon API
- **Gestión de Estado**: RxJS

## Dependencias

Este proyecto utiliza las siguientes dependencias:

- [@angular/animations](https://angular.io/api/animations) (^17.3.0)  
- [@angular/common](https://angular.io/api/common) (^17.3.0)  
- [@angular/compiler](https://angular.io/api/compiler) (^17.3.0)  
- [@angular/core](https://angular.io/api/core) (^17.3.0)  
- [@angular/forms](https://angular.io/api/forms) (^17.3.0)  
- [@angular/platform-browser](https://angular.io/api/platform-browser) (^17.3.0)  
- [@angular/platform-browser-dynamic](https://angular.io/api/platform-browser-dynamic) (^17.3.0)  
- [@angular/platform-server](https://angular.io/api/platform-server) (^17.3.0)  
- [@angular/router](https://angular.io/api/router) (^17.3.0)  
- [@angular/ssr](https://angular.io/api/ssr) (^17.3.5)  
- [@nguniversal/express-engine](https://github.com/angular/universal/tree/main/modules/express-engine) (^16.2.0)  
- [@ngx-pwa/local-storage](https://github.com/cyrilletuzi/angular-ngx-pwa-local-storage) (^18.0.0)  
- [bootstrap](https://getbootstrap.com/) (^5.3.3)  
- [bootstrap-icons](https://icons.getbootstrap.com/) (^1.11.3)  
- [chart.js](https://www.chartjs.org/) (^4.4.4)  
- [express](https://expressjs.com/) (^4.18.2)  
- [ngx-infinite-scroll](https://github.com/NearHuscarl/ngx-infinite-scroll) (^18.0.0)  
- [ngx-notifier](https://github.com/ngx-notifier/ngx-notifier) (^13.0.0)  
- [primeicons](https://primefaces.org/primeicons/) (^7.0.0)  
- [primeng](https://www.primefaces.org/primeng/) (^17.18.9)  
- [rxjs](https://rxjs.dev/) (~7.8.0)  
- [schematics-scss-migrate](https://github.com/angular/schematics-scss-migrate) (^2.3.17)  
- [tslib](https://github.com/microsoft/tslib) (^2.3.0)  
- [zone.js](https://zone.js.org/) (~0.14.3)  

### Herramientas de Desarrollo

- `@angular/cli`: Herramienta de línea de comandos de Angular para desarrollo.
- `@angular-devkit/build-angular`: Herramientas de construcción de Angular CLI.
- Herramientas de testing como `jasmine`, `karma`, para asegurar la calidad del código.

## Cómo Empezar

Para ejecutar este proyecto localmente, sigue los siguientes pasos:

1. Asegúrate de tener instalado [Node.js](https://nodejs.org/) y [Angular CLI](https://github.com/angular/angular-cli).
2. Clona este repositorio en tu máquina local: (`https://github.com/sorvylenny/technical_pokemon`)
3. Navega a la carpeta del proyecto y ejecuta `npm install` para instalar las dependencias.
4. Una vez completada la instalación, ejecuta `ng serve` para iniciar el servidor de desarrollo.
5. Abre tu navegador y visita `http://localhost:4200/` para ver la aplicación

## Compilación y Despliegue

- Ejecuta `ng build` para compilar el proyecto. El resultado se almacenará en el directorio `dist/`. Usa la bandera `--prod` para una compilación de producción.

## Autor

Desarrollado por Katherine Flores. Para más información o sugerencias, puedes contactarme en <floresmKatherine@gmail.com>
