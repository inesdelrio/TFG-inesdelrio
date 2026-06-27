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

Los controladores de mapas se agrupan en `src/controllers/maps/` para las vistas de voluntario, entidad y administracion.

### `src/services/`

Contiene la lógica de negocio y el acceso a datos mediante Prisma. Es la capa preferente para añadir tests unitarios.

Los servicios de mapas se agrupan en `src/services/maps/` y preparan marcadores ya filtrados para cada rol.

### `src/validators/`

Agrupa validaciones de formularios y datos de entrada.

### `src/views/`

Contiene vistas EJS organizadas por páginas y parciales reutilizables.

Las vistas de mapas principales son:

- `src/views/pages/events/map.ejs`;
- `src/views/pages/entities/map.ejs`;
- `src/views/pages/admin/map.ejs`;
- `src/views/partials/map-shell.ejs`.

### `src/middlewares/`

Incluye middlewares de autenticación, autorización por rol y preparación de datos comunes para vistas.

### `src/config/`

Centraliza configuración reutilizable, como el cliente Prisma.

### `public/`

Contiene CSS, imágenes y JavaScript servido como recurso estático.

Los scripts específicos de geolocalizacion son:

- `public/js/address-search.js`: busqueda explicita de direcciones de Madrid;
- `public/js/map-view.js`: inicializacion de mapas Leaflet y marcadores.

Los recursos de identidad visual se ubican en `public/img/brand/`:

- `volunred-logo-horizontal.png`: logo horizontal usado en la cabecera.
- `volunred-logo.png`: isotipo usado como favicon.

El color principal `#bd3e3d` y la tipografia `Quicksand` se aplican desde `public/css/main.css`, con la carga de fuente y favicon centralizada en `src/views/partials/head.ejs`.

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
- Navegacion comun por rol desde `src/views/partials/header.ejs`.
- Uso de migraciones para versionar cambios de base de datos.
- Documentación individual de requisitos.
- Pruebas unitarias para servicios y controladores principales.

## Navegacion y areas principales

- Voluntario: `Inicio`, `Eventos`, `Mapa`, `Calendario`, `Notificaciones`, `Historial`, `Perfil`.
- Entidad: `Inicio`, `Eventos`, `Mapa`, `Calendario`, `Notificaciones`, `Historial`, `Perfil`.
- Administrador: perfil en `/admin/perfil`, mapa en `/admin/mapa` y panel operativo en `/admin/area`.

El login de administrador redirige a `/admin/perfil`. Desde esa pantalla se muestran datos basicos de la cuenta y se permite cerrar sesion; el panel administrativo sigue accesible desde el menu.

## Mapas y geolocalizacion

La funcionalidad de mapas se limita a Madrid y se apoya en coordenadas opcionales guardadas en `Event` y `Entity`: `latitude`, `longitude` y `normalizedAddress`.

La busqueda de direcciones se realiza desde el backend mediante `/api/geocoding/madrid`, usando Nominatim/OpenStreetMap solo con busqueda explicita. Las coordenadas se validan con el rango configurado para Madrid antes de guardarse o usarse.

Las rutas principales de visualizacion son:

- `/eventos/mapa`: eventos visibles para voluntarios;
- `/entidad/mapa`: eventos propios y ubicacion de la organizacion;
- `/admin/mapa`: eventos y entidades con coordenadas.

La renderizacion se hace con Leaflet y OpenStreetMap. Los registros antiguos sin coordenadas siguen siendo compatibles y simplemente no aparecen como marcadores.
