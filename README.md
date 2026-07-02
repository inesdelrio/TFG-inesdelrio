# VolunRed

VolunRed es una aplicación web orientada a conectar personas voluntarias con entidades verificadas que publican actividades de apoyo comunitario.

El objetivo principal del proyecto es centralizar la publicación, búsqueda e inscripción en actividades de voluntariado, evitando que las oportunidades se pierdan en canales informales o poco estructurados.

## Funcionalidades principales

La aplicación incluye actualmente:

- Registro de voluntarios.
- Inicio y cierre de sesión.
- Registro directo de entidades desde `/entidades/registro`, con estado inicial `PENDIENTE`.
- Enlace al registro de entidad desde el registro normal de voluntario.
- Consulta, validación y cambio de estado de entidades por parte de administración.
- Perfil editable de voluntario.
- Perfil editable de entidad.
- Perfil de administrador con datos básicos y cierre de sesión.
- Publicación, edición y retirada de eventos por entidades verificadas.
- Eventos de un día o de varios días medíante `startsAt` y `endsAt`.
- Listado, detalle y filtros de eventos.
- Inscripción y cancelación de inscripción en eventos.
- Visualización de eventos completos.
- Redirección actualizada tras inscripción y cancelación.
- Seguimiento y cancelación de seguimiento de entidades.
- Notificaciones internas para voluntarios y entidades, con detalle propio, marcado como leída/no leída y borrado.
- Calendario personal del voluntario.
- Calendario de entidad.
- Historial de participación.
- Historial de eventos de entidad.
- Búsqueda de direcciones de Madrid y guardado de coordenadas.
- Mapa de eventos disponibles para voluntarios.
- Mapa de eventos propios y organización para entidades.
- Mapa global de eventos y entidades para administración.
- Panel lateral de eventos en mapas, con puntos visibles, selección de evento y acceso al detalle.
- Consulta de inscritos dentro del detalle del evento para entidades propietarias.
- Panel de administración con listado de entidades, filtros por estado y detalle gestionable.
- Moderación de publicaciones.
- Baja definitiva de cuenta medíante anonimización y bloqueo de acceso.

## Roles del sistema

La aplicación contempla tres roles:

- `VOLUNTARIO`: usuario que consulta eventos, sigue entidades, se inscribe en actividades y consulta su calendario e historial.
- `ENTIDAD`: organización validada que puede publicar eventos, consultar inscritos, revisar calendario e historial y gestionar su información.
- `ADMIN`: usuario administrador encargado de consultar y gestionar entidades, cambiar su estado, moderar contenido y acceder a su perfil administrativo.

Las entidades registradas quedan inicialmente en estado `PENDIENTE`. Hasta que administración las marque como `VERIFICADA`, se muestran en `/entidad/estado` y no pueden acceder a la operativa de publicacion o gestion de eventos. Los estados posibles son `PENDIENTE`, `VERIFICADA`, `RECHAZADA` y `SUSPENDIDA`.

## Identidad visual

La interfaz usa la identidad visual de VolunRed de forma centralizada:

- Logo horizontal en la cabecera: `public/img/brand/volunred-logo-horizontal.png`.
- Isotipo como favicon: `public/img/brand/volunred-logo.png`.
- Color principal: `#bd3e3d`, definido en `public/css/main.css`.
- Tipografía principal: `Quicksand`, cargada en `src/views/partials/head.ejs`.
- La cabecera comun se renderiza desde `src/views/partials/header.ejs`.

## Navegación principal

- Sin sesión: `Inicio`, `Eventos`, `Registro`, `Iniciar sesión`.
- Voluntario: `Inicio`, desplegable `Eventos` con `Ver eventos`, `Mapa` y `Calendario`, `Notificaciones`, `Historial`, `Perfil`.
- Entidad: `Inicio`, `Eventos`, `Mapa`, `Calendario`, `Notificaciones`, `Historial`, `Perfil`.
- Administrador: acceso a `Perfil` en `/admin/perfil`, `Mapa` en `/admin/mapa` y `Panel admin` en `/admin/area`.

## Mapas y geolocalización

VolunRed incluye mapas limitados a Madrid:

- `/eventos/mapa`: eventos activos, futuros, verificados y con coordenadas para voluntarios.
- `/entidad/mapa`: eventos propios y ubicacion de la organización para entidades.
- `/admin/mapa`: mapa global de eventos y entidades con coordenadas para administración.

La búsqueda de direcciones se realiza con una búsqueda explicita medíante Nominatim/OpenStreetMap. No se usa autocomplete continuo por cada tecla. Los mapas se renderizan con Leaflet y OpenStreetMap.

En las vistas de mapa, los eventos aparecen como puntos de color pastel. El panel lateral lista los eventos disponibles; al selecciónar uno, el mapa se centra en su ubicacion, resalta el punto y muestra un boton hacia el detalle. En el mapa publico el boton permite continuar al detalle para inscribirse.

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

## Arquitectura del proyecto

VolunRed se organiza como una aplicación web monolítica modular con separación por capas:

- presentación: vistas EJS y recursos estáticos;
- control: rutas y controladores Express;
- negocio: servicios de aplicación;
- validación: validadores y middlewares;
- persistencia: Prisma y PostgreSQL.

Esta estructura permite mantener el proyecto dentro de un alcance razonable para el Trabajo de Fin de Grado, sin añadir complejidad innecesaria, pero separando la lógica principal para facilitar mantenimiento, pruebas y ampliaciones futuras.

Las decisiones principales de arquitectura, diseño de datos, seguridad, mapas, despliegue y validación se recogen en la memoria del TFG. Por este motivo, no se mantiene una carpeta independiente de documentación de arquitectura dentro de `docs/`.


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
make seed-admin
make dev
make start
make test
make check
make prisma-validate
make migrate-status
make migrate-dev
make run
```

Descripción:

- `make install`: instala dependencias.
- `make db`: valida Prisma, genera el cliente y aplica migraciones pendientes.
- `make seed`: crea o actualiza el administrador configurado en `.env`.
- `make seed-admin`: alias explícito para crear o actualizar el administrador configurado en `.env`.
- `make dev`: arranca la aplicación en desarrollo.
- `make start`: arranca la aplicación en modo normal.
- `make test`: ejecuta los tests unitarios.
- `make check`: ejecuta tests y validación de Prisma.
- `make prisma-validate`: valida el esquema Prisma.
- `make migrate-status`: comprueba el estado de migraciones.
- `make migrate-dev`: aplica migraciones de desarrollo con el script existente.
- `make run`: instala dependencias, prepara la base de datos y arranca en desarrollo.

En Windows puede ser necesario instalar `make` o ejecutar estos comandos desde Git Bash.

## Scripts npm

```bash
npm run dev
npm start
npm run prisma:generate
npm run prisma:migrate
npm run prisma:deploy
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

## Seguridad y sesiónes

- Las contraseñas se almacenan con `bcrypt`.
- La autenticación se basa en `express-session`.
- En producción, `SESSION_SECRET` es obligatorio y no debe guardarse en Git.
- Las cookies de sesión usan `httpOnly`; en producción se marcan como seguras cuando `NODE_ENV=production`.
- La configuración usa `sameSite: "lax"`.
- Las rutas sensibles se protegen medíante sesión activa y control de roles.
- Las entidades no verificadas quedan bloqueadas para operaciones como publicar o gestionar eventos.
- Las páginas HTML dinámicas evitan mostrar estados antiguos al volver atrás medíante cabeceras no-cache y recarga controlada al restaurar desde BFCache.
- CSRF queda como mejora futura; no se documenta como funcionalidad implementada.

## Despliegue en Render

La plataforma recomendada para desplegar VolunRed es Render, usando un Web Service de Node.js y una base de datos PostgreSQL gestionada por Render.

El repositorio incluye `render.yaml`, por lo que se puede desplegar como Render Blueprint. Ese archivo define:

- Web Service Node.js `volunred`.
- Base PostgreSQL `volunred-db`.
- `DATABASE_URL` enlazada a la base medíante la conexión interna de Render.
- `SESSION_SECRET` generado automáticamente por Render.
- `ADMIN_EMAIL` y `ADMIN_PASSWORD` como variables no sincronizadas para introducirlas en Render sin guardarlas en Git.

Pasos recomendados con Blueprint:

1. Crear un nuevo Blueprint en Render desde el repositorio de GitHub.
2. Revisar que Render cree el Web Service y la base PostgreSQL.
3. Introducir `ADMIN_EMAIL` y `ADMIN_PASSWORD` cuando Render lo solicite.
4. Confirmar el despliegue.
5. Crear el usuario administrador después del primer despliegue.

Pasos equivalentes sin Blueprint:

1. Crear una base de datos PostgreSQL en Render.
2. Crear un Web Service conectado al repositorio de GitHub.
3. Configurar las variables de entorno del servicio.
4. Usar `migrate deploy` para aplicar migraciones en producción.
5. Crear el usuario administrador después del primer despliegue.

Variables de entorno necesarias:

```env
NODE_ENV=production
DATABASE_URL="postgresql://..."
SESSION_SECRET="valor-largo-y-seguro"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="contraseña-inicial-segura"
```

`DATABASE_URL`, `SESSION_SECRET` y `ADMIN_PASSWORD` no deben subirse nunca a Git. En producción, la aplicación falla al arrancar si `SESSION_SECRET` no está configurada.

Configuración recomendada en Render:

```bash
Build Command: npm ci && npx prisma generate
Start Command: npm run prisma:deploy && npm start
```

Después del primer despliegue, ejecutar desde Render Shell:

```bash
npm run seed:admin
```

El comando `npm run prisma:deploy` ejecuta `prisma migrate deploy`, que es el flujo adecuado para aplicar migraciones ya creadas en entornos de producción.

Actualmente las sesiónes usan el store por defecto de `express-session` (`MemoryStore`). Para una demo o defensa de TFG con una sola instancia puede ser suficiente, asumiendo que las sesiónes se pierden al reiniciar o redesplegar. Para producción real se recomienda sustituirlo por un almacén persistente, por ejemplo PostgreSQL con `connect-pg-simple` o Redis.

Limitaciones del plan gratuito de Render a tener en cuenta:

- Las bases PostgreSQL gratuitas expiran a los 30 días desde su creacion; para conservar datos de forma estable conviene pasar a un plan de pago antes de la expiracion.
- Los servicios web gratuitos pueden quedarse dormidos tras un periodo sin tráfico y tardar alrededor de un minuto en responder al primer acceso posterior.

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

La documentación técnica principal se encuentra en:

- `tfg_backlog.md`: planificación, seguimiento y trazabilidad general del desarrollo.
- `docs/requisitos/`: documentación individual de los requisitos funcionales y no funcionales.

Los requisitos funcionales se documentan de forma individual en `docs/requisitos/`, manteniendo la numeración final RF01-RF28. En esta versión, las funcionalidades incorporadas al final del desarrollo quedan numeradas de forma consecutiva:

- RF26: historial de eventos de entidad.
- RF27: mapa de eventos y entidades.
- RF28: eventos de uno o varios días.

La arquitectura y las decisiones técnicas principales se documentan en este `README.md` y en la memoria del Trabajo de Fin de Grado.

## Consideraciones importantes

- No subir nunca el archivo `.env`.
- Usar `.env.example` para documentar variables necesarias sin credenciales reales.
- No modificar `schema.prisma` sin revisar si hace falta migración.
- Después de cambios funcionales, ejecutar `npm test` y `npm run prisma:validate`.
- Antes de cerrar un cambio, revisar `git status --short`.
