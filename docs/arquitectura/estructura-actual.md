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

Incluye middlewares de autenticacion, autorizacion por rol, preparacion de datos comunes para vistas y cabeceras no-cache para paginas HTML dinamicas.

### `src/config/`

Centraliza configuración reutilizable, como el cliente Prisma.

### `public/`

Contiene CSS, imágenes y JavaScript servido como recurso estático.

Los scripts específicos de geolocalizacion son:

- `public/js/address-search.js`: busqueda explicita de direcciones de Madrid;
- `public/js/map-view.js`: inicializacion de mapas Leaflet, puntos visibles, panel lateral de eventos y seleccion de ubicaciones.

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

- Voluntario: `Inicio`, desplegable `Eventos` con `Ver eventos`, `Mapa` y `Calendario`, `Notificaciones`, `Historial`, `Perfil`.
- Entidad: `Inicio`, `Eventos`, `Mapa`, `Calendario`, `Notificaciones`, `Historial`, `Perfil`.
- Administrador: perfil en `/admin/perfil`, mapa en `/admin/mapa` y panel operativo en `/admin/area`.

El login de administrador redirige a `/admin/perfil`. Desde esa pantalla se muestran datos basicos de la cuenta y se permite cerrar sesion; el panel administrativo sigue accesible desde el menu.

Las entidades pueden registrarse directamente desde `/entidades/registro`, enlazado desde `/registro`. El alta crea un usuario con rol `ENTIDAD` y una entidad en estado `PENDIENTE`; hasta que el administrador la marque como `VERIFICADA`, la cuenta queda dirigida a `/entidad/estado` y no puede acceder a la operativa principal.

## Mapas y geolocalizacion

La funcionalidad de mapas se limita a Madrid y se apoya en coordenadas opcionales guardadas en `Event` y `Entity`: `latitude`, `longitude` y `normalizedAddress`.

La busqueda de direcciones se realiza desde el backend mediante `/api/geocoding/madrid`, usando Nominatim/OpenStreetMap solo con busqueda explicita. Las coordenadas se validan con el rango configurado para Madrid antes de guardarse o usarse.

Las rutas principales de visualizacion son:

- `/eventos/mapa`: eventos visibles para voluntarios;
- `/entidad/mapa`: eventos propios y ubicacion de la organizacion;
- `/admin/mapa`: eventos y entidades con coordenadas.

La renderizacion se hace con Leaflet y OpenStreetMap. Los registros antiguos sin coordenadas siguen siendo compatibles y simplemente no aparecen como marcadores.

La interaccion principal del mapa se realiza desde un panel lateral. El panel lista los eventos disponibles; al seleccionar uno, el mapa se centra en su ubicacion, el punto se resalta y se muestra un enlace al detalle. Los eventos de varios dias no se duplican en el mapa.

## Eventos de varios dias

El modelo `Event` mantiene `startsAt` como fecha/hora de inicio y anade `endsAt` como fecha/hora de fin opcional para compatibilidad con eventos antiguos.

La logica comun de fechas se agrupa en `src/services/events/event-date-range.service.js`. Este servicio permite:

- parsear fecha y hora de inicio/fin desde formularios;
- obtener la fecha efectiva de fin con `endsAt || startsAt`;
- expandir visualmente un evento en calendarios sin duplicarlo en base de datos;
- construir filtros de solapamiento para consultar eventos que cruzan un mes o una fecha concreta.

Los calendarios de voluntario y entidad muestran un evento de varios dias en cada dia del rango. Listados y mapas mantienen un unico registro.

## Seguridad de paginas dinamicas

Las respuestas HTML dinamicas usan cabeceras `Cache-Control`, `Pragma` y `Expires` para evitar que el navegador muestre estados antiguos al volver atras. El partial comun de cabecera incluye ademas un listener de `pageshow` que recarga la pagina si se restaura desde BFCache.

Esta medida no se aplica a recursos estaticos como CSS, JavaScript, imagenes, favicon o assets externos de Leaflet.
