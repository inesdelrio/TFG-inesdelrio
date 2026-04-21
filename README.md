# TFG Voluntariado

Base tecnica inicial de una aplicacion web de voluntariado con Node.js, Express, EJS, PostgreSQL y Prisma.

## Estado actual

Actualmente estan cerrados los requisitos:

- PRE01 - Preparacion del entorno de desarrollo
- PRE02 - Configuracion inicial de PostgreSQL y Prisma
- PRE03 - Configuracion de PostgreSQL
- PRE04 - Configuracion inicial de Prisma
- RF01 - Registro de voluntario
- RF02 - Inicio y cierre de sesion
- RF03 - Solicitud de alta de entidad
- RF04 - Verificacion de entidades
- RF05 - Perfil de voluntario
- RF06 - Perfil de entidad
- RF07 - Publicacion de eventos
- RF08 - Edicion y eliminacion de eventos
- RF09 - Listado y detalle de eventos
- RF10 - Busqueda y filtros de eventos
- RF11 - Suscripcion a entidades
- RF12 - Inscripcion en actividades
- RF13 - Cancelacion de inscripcion
- RF14 - Consulta de inscritos por parte de la entidad

Estado tecnico validado:

- PostgreSQL local operativo con la base de datos `tfg_inesdelrio`
- Prisma conectado correctamente y con las migraciones actuales aplicadas
- Ruta `http://localhost:3000/health/db` respondiendo correctamente

## Stack

- Node.js
- Express
- EJS
- PostgreSQL
- Prisma

## Puesta en marcha

1. Instalar dependencias:

```bash
npm install
```

2. Revisar variables de entorno en `.env`.

3. Arrancar en desarrollo:

```bash
npm run dev
```

4. Abrir `http://localhost:3000`.

5. Verificar la base de datos en `http://localhost:3000/health/db`.

## Scripts disponibles

```bash
npm run dev
npm run start
npm run prisma:generate
npm run prisma:migrate
npm run prisma:reset
npm run prisma:validate
```

## Documentacion

- [PRE01](docs/requisitos/PRE01.md)
- [PRE02](docs/requisitos/PRE02.md)
- [PRE03](docs/requisitos/PRE03.md)
- [PRE04](docs/requisitos/PRE04.md)
- [RF01](docs/requisitos/RF01.md)
- [RF02](docs/requisitos/RF02.md)
- [RF03](docs/requisitos/RF03.md)
- [RF04](docs/requisitos/RF04.md)
- [RF05](docs/requisitos/RF05.md)
- [RF06](docs/requisitos/RF06.md)
- [RF07](docs/requisitos/RF07.md)
- [RF08](docs/requisitos/RF08.md)
- [RF09](docs/requisitos/RF09.md)
- [RF10](docs/requisitos/RF10.md)
- [RF11](docs/requisitos/RF11.md)
- [RF12](docs/requisitos/RF12.md)
- [RF13](docs/requisitos/RF13.md)
- [RF14](docs/requisitos/RF14.md)
- [Estructura inicial](docs/arquitectura/estructura-inicial.md)
