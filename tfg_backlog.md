# VolunRed — Backlog técnico y estado del proyecto

## 1. Contexto

VolunRed es una aplicación web de voluntariado que permite conectar personas interesadas en colaborar con entidades verificadas que publican actividades o necesidades de apoyo.

El sistema se plantea como una plataforma centralizada donde las entidades pueden publicar eventos y los voluntarios pueden consultar oportunidades, seguir entidades, recibir notificaciones, inscribirse y revisar su actividad.

## 2. Stack técnico

- Backend: Node.js + Express
- Frontend: EJS, HTML, CSS y JavaScript
- Base de datos: PostgreSQL
- ORM: Prisma
- Autenticación: express-session
- Contraseñas: bcrypt
- Pruebas: tests unitarios ejecutados con `npm test`

## 3. Roles

- `VOLUNTARIO`: consulta eventos, sigue entidades, se inscribe, consulta notificaciones, calendario e historial.
- `ENTIDAD`: publica eventos, gestiona su perfil, consulta inscritos y revisa su calendario e historial.
- `ADMIN`: consulta y gestiona entidades, revisa métricas básicas, modera publicaciones y dispone de perfil propio.

## 4. Estado general

El proyecto cuenta con los flujos principales implementados:

- preparación del entorno;
- conexión con PostgreSQL y Prisma;
- autenticación por sesión;
- registro de voluntarios;
- registro directo, validación y gestión de estado de entidades;
- publicación y gestión de eventos;
- eventos de un dia y de varios dias;
- inscripción y cancelación;
- seguimiento de entidades;
- notificaciones internas;
- calendario de voluntario;
- calendario de entidad;
- historial de participacion del voluntario;
- historial de eventos de entidad;
- mapa de eventos y entidades limitado a Madrid;
- busqueda explicita de direcciones de Madrid con coordenadas;
- consulta de inscritos;
- moderación administrativa;
- baja definitiva de cuenta;
- identidad visual integrada con logo, favicon, color principal y tipografia propia.

## 5. Requisitos cerrados

### Preparación

- PRE01 — Preparación del entorno de desarrollo
- PRE02 — Configuración inicial de PostgreSQL y Prisma
- PRE03 — Configuración de PostgreSQL
- PRE04 — Configuración inicial de Prisma

### Requisitos funcionales

- RF01 — Registro de voluntario
- RF02 — Inicio y cierre de sesión
- RF03 — Solicitud de alta de entidad
- RF04 — Verificación de entidades
- RF05 — Perfil de voluntario
- RF06 — Perfil de entidad
- RF07 — Publicación de eventos
- RF08 — Edición y eliminación de eventos
- RF09 — Listado y detalle de eventos
- RF10 — Búsqueda y filtros de eventos
- RF11 — Suscripción a entidades
- RF12 — Inscripción en actividades
- RF13 — Cancelación de inscripción
- RF14 — Consulta de inscritos por parte de la entidad
- RF15 — Notificaciones internas
- RF16 — Calendario personal del voluntario
- RF17 — Panel principal de administración
- RF18 — Moderación y suspensión
- RF19 — Historial de participación
- RF20 — Calendario de entidad
- RF21 — Baja definitiva de cuenta
- RF22 — Inscritos integrados en el detalle del evento
- RF23 — Mejora de estado y navegación en inscripciones
- RF24 — Cancelación de seguimiento de entidades
- RF25 — Mejora de notificaciones internas
- RF33 — Historial de eventos de entidad
- RF34 — Mapa de eventos y entidades
- RF35 — Eventos de varios dias

### Requisitos no funcionales

- RNF01 — Usabilidad e interfaz coherente
- RNF02 — Diseño responsive
- RNF03 — Seguridad de contraseñas
- RNF04 — Control de acceso por roles
- RNF05 — Integridad de datos
- RNF06 — Rendimiento básico
- RNF07 — Mantenibilidad del proyecto
- RNF08 — Configuración y arranque del proyecto
- RNF09 — Trazabilidad administrativa
- RNF10 — Pruebas de integración del sistema
- RNF11 — Refactorización y limpieza final

## 6. Requisitos previstos para evolución

Estos requisitos quedan planteados como evolución natural del sistema:

- RF26 — Entidades seguidas por el voluntario
- RF27 — URLs amigables para eventos
- RF29 — Zona social y seguimiento de voluntarios
- RF30 — Lista de espera en eventos completos
- RF31 — Notificaciones externas por correo
- RF32 — Verificación de correo y recuperación de cuenta
- RNF12 — Seguridad adicional
- RNF13 — Documentación final y evidencias

## 7. Decisiones técnicas relevantes

### Uso de PostgreSQL y Prisma

El proyecto utiliza PostgreSQL como base de datos relacional y Prisma como ORM. Prisma se encarga del modelado, migraciones y acceso a datos desde los servicios de la aplicación.

### Autenticación

La autenticación se realiza con `express-session`. Las contraseñas se almacenan usando `bcrypt`, evitando guardar contraseñas en texto plano.

El inicio de sesion redirige al area principal correspondiente al rol. En el caso de `ADMIN`, la redireccion actual apunta a `/admin/perfil`, desde donde se muestran los datos basicos del administrador y se permite cerrar sesion. El panel operativo de administracion sigue disponible desde `/admin/area`.

En produccion, `SESSION_SECRET` es obligatorio. Las cookies de sesion se configuran con `httpOnly`, `sameSite: "lax"` y `secure` cuando `NODE_ENV=production`. Las paginas HTML dinamicas usan cabeceras no-cache y recarga controlada al volver desde BFCache para evitar que el navegador muestre estados antiguos tras acciones como inscripciones, seguimientos o cambios de notificaciones.

### Identidad visual

La interfaz usa el logo horizontal de VolunRed en la cabecera y el isotipo como favicon. Los recursos principales estan en `public/img/brand/volunred-logo-horizontal.png` y `public/img/brand/volunred-logo.png`.

La paleta centraliza el color principal `#bd3e3d` en `public/css/main.css`. La fuente principal es `Quicksand`, cargada en `src/views/partials/head.ejs`, y la navegacion comun se mantiene en `src/views/partials/header.ejs`.

### Navegacion por rol

- Voluntario: `Inicio`, desplegable `Eventos` con `Ver eventos`, `Mapa` y `Calendario`, `Notificaciones`, `Historial`, `Perfil`.
- Entidad: `Inicio`, `Eventos`, `Mapa`, `Calendario`, `Notificaciones`, `Historial`, `Perfil`.
- Administrador: `Perfil`, `Mapa` y `Panel admin`.

### Separación por capas

El proyecto separa rutas, controladores, servicios, validadores y vistas. La lógica de negocio debe mantenerse preferentemente en servicios para facilitar pruebas y mantenimiento.

### Entidades verificadas

Las entidades no pueden publicar eventos hasta ser validadas por administración. El estado de entidad permite distinguir entre entidades pendientes, verificadas, rechazadas y suspendidas.

El camino principal de alta de entidad es el registro directo desde `/entidades/registro`, enlazado desde `/registro`. El formulario crea un usuario con rol `ENTIDAD` y una entidad en estado `PENDIENTE`. Mientras no este `VERIFICADA`, la cuenta se dirige a `/entidad/estado` y no puede operar.

El panel de administración permite consultar todas las entidades desde `/admin/entidades`, filtrar por `TODAS`, `PENDIENTE`, `VERIFICADA`, `RECHAZADA` y `SUSPENDIDA`, y cambiar el estado desde el detalle de cada entidad. Cada cambio queda registrado en `AdminActionLog`.

### Moderación

La administración puede retirar publicaciones y suspender entidades. Una entidad `SUSPENDIDA` no puede operar ni publicar eventos, y si vuelve a `VERIFICADA` recupera la capacidad de operar si cumple las reglas actuales. Las acciones administrativas se registran para mantener trazabilidad.

### Baja definitiva de cuenta

La eliminación de cuenta se implementa como baja definitiva con anonimización y bloqueo de acceso, no como borrado físico directo del usuario. Esta decisión evita romper relaciones con eventos, inscripciones, notificaciones y logs administrativos.

### Historial de eventos de entidad

Las entidades disponen de `/entidad/historial` para consultar los eventos que han dado de alta. La vista separa eventos futuros y pasados, y muestra estado, fecha, ubicacion e inscritos.

### Eventos de varios dias

El modelo `Event` usa `startsAt` y `endsAt` para representar eventos de un dia o de varios dias. Los formularios de evento piden dia/hora de inicio y dia/hora de fin. Si la fecha de fin se deja vacia, se interpreta como el mismo dia de inicio.

Los calendarios de voluntario y entidad expanden el evento visualmente por cada dia incluido en el rango, pero el evento sigue siendo un unico registro y una sola inscripcion. Los listados y mapas no duplican eventos de varios dias. El historial usa `endsAt || startsAt` para decidir si un evento ya ha finalizado.

### Mapas y geolocalizacion

Los eventos y entidades pueden almacenar `latitude`, `longitude` y `normalizedAddress`. La ubicacion se limita a Madrid mediante validacion de coordenadas.

La busqueda de direcciones se hace de forma explicita con Nominatim/OpenStreetMap desde `/api/geocoding/madrid`, evitando autocomplete continuo.

La visualizacion de mapas usa Leaflet y OpenStreetMap:

- `/eventos/mapa`: eventos visibles para voluntarios.
- `/entidad/mapa`: eventos propios y organizacion de la entidad.
- `/admin/mapa`: eventos y entidades con coordenadas.

Las paginas de mapa muestran puntos visibles con colores pastel estables por evento y un panel lateral de eventos. Al seleccionar un evento en el panel, el mapa se centra en su ubicacion, resalta el punto y muestra un enlace al detalle. No se usa Google Maps ni API key de mapas, y Nominatim no se usa como autocomplete continuo.

## 8. Reglas de implementación y mantenimiento

Antes de implementar un cambio se debe revisar:

- requisito afectado;
- archivos implicados;
- si hay cambios en Prisma;
- si se necesita migración;
- pruebas necesarias;
- riesgo de mezclar funcionalidades no relacionadas.

Después de implementar:

```bash
npm test
npm run prisma:validate
```

Si hay cambios en Prisma:

```bash
npx prisma migrate status
```

Antes de hacer commit:

```bash
git status --short
git diff --stat
```

## 9. Normas de seguridad y configuración

- No subir `.env`.
- Mantener `.env.example` sin credenciales reales.
- No introducir contraseñas reales en documentación.
- No modificar `schema.prisma` sin revisar migraciones.
- No usar `prisma reset` salvo decisión explícita, porque puede borrar datos locales.
- No mezclar cambios funcionales distintos en el mismo commit si se puede evitar.
- No documentar CSRF ni correo electronico como implementados; quedan como mejoras futuras.
- No subir secretos reales. `DATABASE_URL`, `SESSION_SECRET` y `ADMIN_PASSWORD` deben configurarse fuera de Git.

## 10. Definition of Done

Un requisito se considera cerrado cuando:

- la funcionalidad principal está implementada;
- las rutas y vistas necesarias existen;
- la lógica está conectada con base de datos si corresponde;
- existen validaciones mínimas en servidor;
- hay tests unitarios relacionados;
- el flujo se ha probado manualmente;
- la documentación del requisito está creada o actualizada;
- `npm test` pasa;
- `npm run prisma:validate` pasa.
