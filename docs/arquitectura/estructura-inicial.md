# Estructura inicial del proyecto

## Objetivo

Definir una base mantenible para el proyecto antes de implementar requisitos funcionales.

## Estructura creada

```text
/
|-- app.js
|-- docs/
|   |-- arquitectura/
|   `-- requisitos/
|-- prisma/
|   |-- migrations/
|   `-- schema.prisma
|-- public/
|   |-- css/
|   |-- img/
|   `-- js/
|-- src/
|   |-- app.js
|   |-- config/
|   |-- controllers/
|   |-- middlewares/
|   |-- routes/
|   |-- services/
|   |-- utils/
|   |-- validators/
|   `-- views/
`-- tests/
    |-- fixtures/
    |-- integration/
    `-- unit/
```

## Criterios aplicados

- Separacion entre arranque (`app.js`) y configuracion de Express (`src/app.js`).
- Rutas, controladores y servicios organizados para crecer por modulo.
- Vistas EJS agrupadas por tipo de pagina y compartiendo parciales.
- Recursos estaticos servidos desde `public/`.
- Prisma aislado en `prisma/` y cliente reutilizable en `src/config/prisma.js`.
