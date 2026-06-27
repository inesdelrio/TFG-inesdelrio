# VolunRed

VolunRed es una aplicación web orientada a conectar personas voluntarias con entidades verificadas que publican actividades de apoyo comunitario.

El objetivo principal del proyecto es centralizar la publicación, búsqueda e inscripción en actividades de voluntariado, evitando que las oportunidades se pierdan en canales informales o poco estructurados.

## Funcionalidades principales

La aplicación incluye actualmente:

- Registro de voluntarios.
- Inicio y cierre de sesión.
- Solicitud de alta de entidades.
- Consulta, validación y cambio de estado de entidades por parte de administración.
- Perfil editable de voluntario.
- Perfil editable de entidad.
- Perfil de administrador con datos basicos y cierre de sesion.
- Publicación, edición y retirada de eventos por entidades verificadas.
- Listado, detalle y filtros de eventos.
- Inscripción y cancelación de inscripción en eventos.
- Visualización de eventos completos.
- Redirección actualizada tras inscripción y cancelación.
- Seguimiento y cancelación de seguimiento de entidades.
- Notificaciones internas para voluntarios.
- Calendario personal del voluntario.
- Calendario de entidad.
- Historial de participación.
- Historial de eventos de entidad.
- Busqueda de direcciones de Madrid y guardado de coordenadas.
- Mapa de eventos disponibles para voluntarios.
- Mapa de eventos propios y organizacion para entidades.
- Mapa global de eventos y entidades para administracion.
- Consulta de inscritos dentro del detalle del evento para entidades propietarias.
- Panel de administración con listado de entidades, filtros por estado y detalle gestionable.
- Moderación de publicaciones.
- Baja definitiva de cuenta mediante anonimización y bloqueo de acceso.

## Roles del sistema

La aplicación contempla tres roles:

- `VOLUNTARIO`: usuario que consulta eventos, sigue entidades, se inscribe en actividades y consulta su calendario e historial.
- `ENTIDAD`: organización validada que puede publicar eventos, consultar inscritos, revisar calendario e historial y gestionar su información.
- `ADMIN`: usuario administrador encargado de consultar y gestionar entidades, cambiar su estado, moderar contenido y acceder a su perfil administrativo.

## Identidad visual

La interfaz usa la identidad visual de VolunRed de forma centralizada:

- Logo horizontal en la cabecera: `public/img/brand/volunred-logo-horizontal.png`.
- Isotipo como favicon: `public/img/brand/volunred-logo.png`.
- Color principal: `#bd3e3d`, definido en `public/css/main.css`.
- Tipografia principal: `Quicksand`, cargada en `src/views/partials/head.ejs`.
- La cabecera comun se renderiza desde `src/views/partials/header.ejs`.

## Navegacion principal

- Sin sesion: `Inicio`, `Eventos`, `Registro`, `Iniciar sesion`.
- Voluntario: `Inicio`, `Eventos`, `Mapa`, `Calendario`, `Notificaciones`, `Historial`, `Perfil`.
- Entidad: `Inicio`, `Eventos`, `Mapa`, `Calendario`, `Notificaciones`, `Historial`, `Perfil`.
- Administrador: acceso a `Perfil` en `/admin/perfil`, `Mapa` en `/admin/mapa` y `Panel admin` en `/admin/area`.

## Mapas y geolocalizacion

VolunRed incluye mapas limitados a Madrid:

- `/eventos/mapa`: eventos activos, futuros, verificados y con coordenadas para voluntarios.
- `/entidad/mapa`: eventos propios y ubicacion de la organizacion para entidades.
- `/admin/mapa`: mapa global de eventos y entidades con coordenadas para administracion.

La busqueda de direcciones se realiza con una busqueda explicita mediante Nominatim/OpenStreetMap. No se usa autocomplete continuo por cada tecla. Los mapas se renderizan con Leaflet y OpenStreetMap.

## Stack técnico

- Node.js
- Express
- EJS
- PostgreSQL
- Prisma
- express-session
- bcrypt
- HTML, CSS y JavaScript

La aplicación utiliza PostgreSQL como base de datos relacional y Prisma como ORM para modelar datos, ejecutar migraciones y realizar consultas desde el backend.

## Estructura general

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
│   ├── unit/
│   └── integration/
├── docs/
│   ├── arquitectura/
│   └── requisitos/
├── .env.example
├── package.json
├── Makefile
└── README.md
```

## Configuración inicial

1. Instalar dependencias:

```bash
npm install
```

2. Crear un archivo `.env` a partir de `.env.example`.

3. Configurar la conexión a PostgreSQL:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/tfg_inesdelrio?schema=public"
SESSION_SECRET="cambiar_en_local"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="cambiar_en_local"
```

4. Preparar Prisma y base de datos:

```bash
npm run prisma:validate
npm run prisma:generate
npm run prisma:migrate
```

5. Crear o actualizar el usuario administrador:

```bash
npm run seed:admin
```

6. Arrancar la aplicación:

```bash
npm run dev
```

La aplicación quedará disponible en:

```text
http://localhost:3000
```

## Comandos con Make

Si el entorno tiene `make` instalado:

```bash
make install
make db
make seed
make dev
make start
make test
make check
make run
```

Descripción:

- `make install`: instala dependencias.
- `make db`: valida Prisma, genera el cliente y aplica migraciones pendientes.
- `make seed`: crea o actualiza el administrador configurado en `.env`.
- `make dev`: arranca la aplicación en desarrollo.
- `make start`: arranca la aplicación en modo normal.
- `make test`: ejecuta los tests unitarios.
- `make check`: ejecuta tests y validación de Prisma.
- `make run`: instala dependencias, prepara la base de datos y arranca en desarrollo.

En Windows puede ser necesario instalar `make` o ejecutar estos comandos desde Git Bash.

## Scripts npm

```bash
npm run dev
npm start
npm run prisma:generate
npm run prisma:migrate
npm run prisma:reset
npm run prisma:validate
npm run seed:admin
npm test
```

## Base de datos

Base de datos usada en desarrollo:

```text
PostgreSQL
Base de datos: tfg_inesdelrio
Host: localhost
Puerto: 5432
Schema: public
```

Para abrir Prisma Studio:

```bash
npx prisma studio
```

## Pruebas

Ejecutar tests unitarios:

```bash
npm test
```

Validar el esquema de Prisma:

```bash
npm run prisma:validate
```

Comprobar estado de migraciones:

```bash
npx prisma migrate status
```

## Documentación del proyecto

La documentación técnica se encuentra en:

- `tfg_backlog.md`
- `docs/arquitectura/estructura-inicial.md`
- `docs/arquitectura/estructura-actual.md`
- `docs/requisitos/`

Los requisitos se documentan de forma individual en `docs/requisitos/`.

## Consideraciones importantes

- No subir nunca el archivo `.env`.
- Usar `.env.example` para documentar variables necesarias sin credenciales reales.
- No modificar `schema.prisma` sin revisar si hace falta migración.
- Después de cambios funcionales, ejecutar `npm test` y `npm run prisma:validate`.
- Antes de cerrar un cambio, revisar `git status --short`.
