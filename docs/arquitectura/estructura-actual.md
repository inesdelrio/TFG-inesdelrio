# Estructura técnica actual del proyecto

## Objetivo

Documentar la organización actual del repositorio VolunRed y las decisiones principales de arquitectura aplicadas durante el desarrollo.

## Arquitectura general

La aplicación se organiza como una aplicación web monolítica modular con separación por capas:

- capa de presentación: vistas EJS y recursos estáticos;
- capa de control: rutas y controladores Express;
- capa de negocio: servicios;
- capa de validación: validadores;
- capa de persistencia: Prisma y PostgreSQL.

Esta estructura permite mantener el proyecto simple para el alcance del TFG, pero suficientemente ordenado para ampliar funcionalidades.

## Estructura principal

```text
/
├── app.js
├── src/
│   ├── app.js
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   └── views/
├── public/
│   ├── css/
│   ├── img/
│   └── js/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── tests/
│   ├── fixtures/
│   ├── integration/
│   └── unit/
└── docs/
    ├── arquitectura/
    └── requisitos/
```

## Carpetas principales

### `src/routes/`

Define las rutas HTTP de la aplicación y delega la lógica en controladores.

### `src/controllers/`

Gestiona la petición y la respuesta: lectura de parámetros, llamada a servicios, renderizado de vistas y redirecciones.

### `src/services/`

Contiene la lógica de negocio y el acceso a datos mediante Prisma. Es la capa preferente para añadir tests unitarios.

### `src/validators/`

Agrupa validaciones de formularios y datos de entrada.

### `src/views/`

Contiene vistas EJS organizadas por páginas y parciales reutilizables.

### `src/middlewares/`

Incluye middlewares de autenticación, autorización por rol y preparación de datos comunes para vistas.

### `src/config/`

Centraliza configuración reutilizable, como el cliente Prisma.

### `public/`

Contiene CSS, imágenes y JavaScript servido como recurso estático.

### `prisma/`

Contiene el esquema de datos y el histórico de migraciones.

### `tests/`

Contiene pruebas unitarias y estructura preparada para pruebas de integración.

## Criterios de diseño aplicados

- Separación entre arranque del servidor y configuración de Express.
- Organización por módulos funcionales.
- Servicios reutilizables para lógica de negocio.
- Validaciones en servidor para proteger operaciones principales.
- Uso de roles para controlar el acceso.
- Uso de migraciones para versionar cambios de base de datos.
- Documentación individual de requisitos.
- Pruebas unitarias para servicios y controladores principales.
