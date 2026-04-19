# TFG — Backlog técnico y guía de implementación

## 1. Contexto del proyecto

Este repositorio corresponde al desarrollo de una aplicación web de voluntariado orientada a conectar voluntarios con entidades verificadas que publican actividades, eventos o necesidades de apoyo.

La aplicación debe permitir:
- registro y autenticación de voluntarios, entidades y administradores
- validación de entidades antes de que puedan publicar actividades
- publicación y gestión de eventos por parte de entidades verificadas
- inscripción, cancelación, seguimiento y consulta de actividades por parte de voluntarios
- notificaciones internas y calendario personal dentro de la propia aplicación
- gestión y moderación desde un panel de administración

## 2. Alcance técnico

La primera versión del sistema se desarrollará como una aplicación web responsive con arquitectura cliente-servidor de tres capas.

### Stack previsto
- **Backend:** Node.js + Express
- **Frontend renderizado en servidor:** EJS
- **Estilos e interacción:** CSS + JavaScript
- **Base de datos:** PostgreSQL
- **ORM:** Prisma
- **Autenticación:** sesión con `express-session`
- **Hash de contraseñas:** `bcrypt`

### Roles del sistema
- **VOLUNTARIO**
- **ENTIDAD**
- **ADMIN**

### Estado de validación de entidad
- **PENDIENTE**
- **VERIFICADA**
- **RECHAZADA**
- **SUSPENDIDA**

## 3. Reglas de trabajo para implementación

Cada requisito debe cerrarse siguiendo este orden:

1. preparar estructura técnica necesaria
2. implementar vistas, rutas, controladores, modelos y lógica
3. conectar con base de datos y validar reglas de negocio
4. añadir test unitario del requisito
5. documentar el requisito y cómo comprobarlo manualmente
6. cuando exista un flujo completo, añadir test de integración asociado
7. actualizar `README.md` al final, cuando el requisito o flujo ya esté realmente cerrado

No se debe dar por hecho ningún paso técnico importante. Si algo requiere instalación, configuración, migración, conexión o preparación previa, debe aparecer como tarea.

## 4. Estructura recomendada del repositorio

```text
/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── prisma/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── views/
├── public/
│   ├── css/
│   ├── js/
│   └── img/
├── tests/
│   ├── unit/
│   └── integration/
├── docs/
│   └── requisitos/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env
├── .env.example
├── package.json
└── README.md
```

## 5. Requisitos iniciales de trabajo

### PRE01 — Preparación del entorno de desarrollo
- **Estado:** Cerrado
- **Descripción:** Preparar el entorno base de trabajo en local para poder desarrollar la aplicación.
- **Criterio de validación:** El proyecto puede abrirse, instalar dependencias y arrancar sin errores en un entorno local limpio.
- **Estimación:** 6 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - PRE01-01: Instalar Node.js LTS y npm en el equipo de desarrollo
  - PRE01-02: Crear el proyecto base con npm init
  - PRE01-03: Instalar Express, EJS y dependencias iniciales del proyecto
  - PRE01-04: Instalar nodemon como dependencia de desarrollo
  - PRE01-05: Crear la estructura inicial de carpetas del proyecto
  - PRE01-06: Configurar app.js y el servidor Express mínimo
  - PRE01-07: Configurar EJS como motor de vistas y la carpeta public
  - PRE01-08: Añadir scripts npm run dev y npm start en package.json
  - PRE01-09: Crear el archivo .gitignore base para un proyecto Node.js
  - PRE01-10: Levantar la aplicación en local y comprobar que responde sin errores
  - PRE01-11: Documentar la configuración realizada para que pueda reproducirse desde cero

### PRE02 — Configuración inicial de PostgreSQL y Prisma
- **Estado:** Cerrado
- **Descripción:** Configurar la base técnica de la aplicación web.
- **Criterio de validación:** La aplicación arranca con Express, renderiza una vista EJS y sirve recursos estáticos correctamente.
- **Estimación:** 6 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - PRE02-01: Instalar PostgreSQL en el entorno local de desarrollo
  - PRE02-02: Crear la base de datos inicial del proyecto
  - PRE02-03: Instalar Prisma CLI y @prisma/client en el proyecto
  - PRE02-04: Ejecutar prisma init para generar la estructura inicial de Prisma
  - PRE02-05: Configurar DATABASE_URL en el archivo .env
  - PRE02-06: Configurar PostgreSQL como provider en schema.prisma
  - PRE02-07: Crear un modelo base de prueba para validar la integración
  - PRE02-08: Generar la primera migración con prisma migrate dev
  - PRE02-09: Probar la conexión a base de datos desde la aplicación
  - PRE02-10: Añadir un script útil de Prisma en package.json para el desarrollo
  - PRE02-11: Documentar la configuración realizada para que pueda reproducirse desde cero

### PRE03 — Configuración de PostgreSQL
- **Estado:** Cerrado
- **Descripción:** Preparar la base de datos relacional del proyecto.
- **Criterio de validación:** Existe una base de datos accesible desde la aplicación y preparada para trabajar con Prisma.
- **Estimación:** 5 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - PRE03-01: Crear base de datos del proyecto en PostgreSQL
  - PRE03-02: Crear usuario y credenciales de acceso si procede
  - PRE03-03: Configurar cadena de conexión en `.env`
  - PRE03-04: Verificar conexión a la base de datos desde local
  - PRE03-05: Decidir convención de nombres para tablas y campos
  - PRE03-06: Crear script o instrucción de reseteo de base de datos para desarrollo
  - PRE03-07: Documentar configuración mínima de PostgreSQL para el proyecto

### PRE04 — Configuración inicial de Prisma
- **Estado:** Cerrado
- **Descripción:** Preparar Prisma como herramienta de modelado y acceso a datos.
- **Criterio de validación:** Prisma está inicializado, conectado a PostgreSQL y permite ejecutar migraciones.
- **Estimación:** 5 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - PRE04-01: Inicializar Prisma en el proyecto
  - PRE04-02: Crear `schema.prisma` inicial
  - PRE04-03: Configurar datasource y generator de Prisma
  - PRE04-04: Crear primer modelo temporal de prueba
  - PRE04-05: Ejecutar primera migración
  - PRE04-06: Generar cliente Prisma
  - PRE04-07: Crear utilidad de acceso a Prisma reutilizable
  - PRE04-08: Probar lectura y escritura mínima en base de datos
  - PRE04-09: Documentar flujo de migraciones y uso básico de Prisma

## 6. Requisitos funcionales

### RF01 — Registro de voluntario
- **Estado:** Cerrado
- **Descripción:** Permitir que una persona cree una cuenta como voluntario.
- **Criterio de validación:** Un usuario no autenticado puede registrarse, guardarse en base de datos y acceder posteriormente con sus credenciales.
- **Estimación:** 8 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - RF01-01: Definir los campos del formulario de registro del voluntario
  - RF01-02: Crear la vista EJS de registro de voluntario
  - RF01-03: Añadir estilos CSS y validaciones básicas en cliente para el formulario
  - RF01-04: Crear las rutas GET y POST del registro de voluntario
  - RF01-05: Definir el modelo de usuario con rol VOLUNTARIO en Prisma
  - RF01-06: Crear y ejecutar la migración de usuario voluntario
  - RF01-07: Implementar el controlador de alta con validación de datos en servidor
  - RF01-08: Hashear la contraseña con bcrypt antes de guardar
  - RF01-09: Persistir el nuevo usuario en la base de datos
  - RF01-10: Mostrar mensajes de error y confirmación en la interfaz
  - RF01-11: Añadir test unitario del registro correcto y del registro con datos inválidos
  - RF01-12: Documentar el requisito técnico y cómo comprobarlo manualmente

### RF02 — Inicio y cierre de sesión
- **Estado:** Cerrado
- **Descripción:** Permitir autenticación y cierre de sesión para los distintos tipos de cuenta.
- **Criterio de validación:** El usuario puede iniciar sesión, quedar autenticado en sesión y salir correctamente de la aplicación.
- **Estimación:** 8 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - RF02-01: Crear la vista EJS de inicio de sesión
  - RF02-02: Añadir estilos CSS y validaciones básicas del formulario de login
  - RF02-03: Instalar y configurar express-session en el proyecto
  - RF02-04: Crear las rutas de login y logout
  - RF02-05: Implementar el controlador de autenticación
  - RF02-06: Consultar el usuario por email en la base de datos
  - RF02-07: Comparar la contraseña introducida con bcrypt
  - RF02-08: Guardar el usuario autenticado en sesión
  - RF02-09: Redirigir al área correspondiente según el rol
  - RF02-10: Añadir la acción de cierre de sesión en el layout o menú principal
  - RF02-11: Añadir test unitario de login válido, login inválido y logout
  - RF02-12: Documentar el requisito técnico y cómo comprobarlo manualmente

### RF03 — Solicitud de alta de entidad
- **Estado:** Cerrado
- **Descripción:** Permitir que una entidad solicite el alta en la plataforma.
- **Criterio de validación:** La entidad queda registrada con estado inicial PENDIENTE y vinculada a un usuario del sistema.
- **Estimación:** 8 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - RF03-01: Definir los campos obligatorios del formulario de alta de entidad
  - RF03-02: Crear la vista EJS de registro de entidad
  - RF03-03: Añadir estilos CSS y validaciones básicas del formulario
  - RF03-04: Definir el modelo de entidad y su estado de validación en Prisma
  - RF03-05: Crear y ejecutar la migración de entidad
  - RF03-06: Crear las rutas GET y POST del registro de entidad
  - RF03-07: Implementar el controlador de alta de entidad
  - RF03-08: Guardar la entidad con estado inicial PENDIENTE en la base de datos
  - RF03-09: Preparar el campo para documento identificativo o información justificativa
  - RF03-10: Mostrar mensaje de solicitud enviada correctamente
  - RF03-11: Añadir test unitario del alta de entidad y del estado pendiente inicial
  - RF03-12: Documentar el requisito técnico y cómo comprobarlo manualmente

### RF04 — Verificación de entidades
- **Estado:** Cerrado
- **Descripción:** Permitir que el administrador valide, rechace o suspenda entidades.
- **Criterio de validación:** El administrador puede cambiar el estado de una entidad y las restricciones del sistema se aplican correctamente.
- **Estimación:** 8 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - RF04-01: Crear la vista del listado de entidades pendientes para el administrador
  - RF04-02: Crear la vista de detalle de solicitud de entidad
  - RF04-03: Definir las rutas de administración para aprobar, rechazar y suspender
  - RF04-04: Implementar el controlador de cambio de estado de entidad
  - RF04-05: Actualizar el estado de validación de la entidad en la base de datos
  - RF04-06: Mostrar el estado actual de la entidad en la interfaz de administración
  - RF04-07: Bloquear la publicación de eventos si la entidad no está verificada
  - RF04-08: Registrar la acción administrativa realizada
  - RF04-09: Añadir test unitario del cambio de estado y de la restricción de publicación
  - RF04-10: Documentar el requisito técnico y cómo comprobarlo manualmente

### RF05 — Perfil de voluntario
- **Estado:** Cerrado
- **Descripción:** Permitir al voluntario consultar y editar sus datos autorizados.
- **Criterio de validación:** El voluntario puede ver y modificar sus datos personales permitidos.
- **Estimación:** 6 h
- **Prioridad:** Should
- **Riesgo:** Bajo
- **Tareas:**
  - RF05-01: Crear la vista EJS del perfil del voluntario
  - RF05-02: Crear la ruta GET para mostrar el perfil
  - RF05-03: Cargar los datos actuales del voluntario en el formulario
  - RF05-04: Añadir estilos CSS de la pantalla de perfil
  - RF05-05: Crear la ruta POST para guardar cambios del perfil
  - RF05-06: Implementar el controlador de actualización del perfil
  - RF05-07: Validar los campos personales que sí se pueden editar
  - RF05-08: Actualizar los datos del voluntario en la base de datos
  - RF05-09: Mostrar mensajes de éxito y error tras guardar
  - RF05-10: Añadir test unitario de edición correcta y edición inválida
  - RF05-11: Documentar el requisito técnico y cómo comprobarlo manualmente

### RF06 — Perfil de entidad
- **Estado:** Cerrado
- **Descripción:** Permitir a la entidad consultar y modificar su información visible.
- **Criterio de validación:** La entidad puede editar los campos permitidos y visualizar los cambios actualizados.
- **Estimación:** 6 h
- **Prioridad:** Should
- **Riesgo:** Bajo
- **Tareas:**
  - RF06-01: Crear la vista EJS del perfil de entidad
  - RF06-02: Crear la ruta GET para mostrar el perfil institucional
  - RF06-03: Cargar los datos actuales de la entidad en el formulario
  - RF06-04: Añadir estilos CSS de la pantalla de perfil de entidad
  - RF06-05: Crear la ruta POST para guardar cambios del perfil institucional
  - RF06-06: Implementar el controlador de actualización del perfil de entidad
  - RF06-07: Validar los campos institucionales que sí se pueden editar
  - RF06-08: Actualizar los datos permitidos de la entidad en la base de datos
  - RF06-09: Mostrar mensaje de actualización correcta en la interfaz
  - RF06-10: Añadir test unitario de actualización de perfil de entidad
  - RF06-11: Documentar el requisito técnico y cómo comprobarlo manualmente

### RF07 — Publicación de eventos
- **Estado:** Cerrado
- **Descripción:** Permitir a entidades verificadas crear actividades o eventos.
- **Criterio de validación:** Una entidad verificada puede publicar un evento con sus datos básicos y verlo en el listado público.
- **Estimación:** 9 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - RF07-01: Definir los campos del formulario de creación de evento
  - RF07-02: Crear la vista EJS de alta de evento
  - RF07-03: Añadir estilos CSS y validaciones básicas del formulario
  - RF07-04: Definir el modelo de evento en Prisma
  - RF07-05: Crear y ejecutar la migración de eventos
  - RF07-06: Crear las rutas GET y POST para publicar eventos
  - RF07-07: Implementar el controlador de creación de evento
  - RF07-08: Validar fecha, hora, plazas y entidad verificada en servidor
  - RF07-09: Guardar el evento vinculado a la entidad en la base de datos
  - RF07-10: Publicar el evento en el listado general de actividades
  - RF07-11: Añadir test unitario de creación de evento y bloqueo a entidades no verificadas
  - RF07-12: Documentar el requisito técnico y cómo comprobarlo manualmente

### RF08 — Edición y eliminación de eventos
- **Estado:** Cerrado
- **Descripción:** Permitir a la entidad autora editar o eliminar sus publicaciones.
- **Criterio de validación:** Solo la entidad propietaria puede modificar o retirar sus eventos.
- **Estimación:** 7 h
- **Prioridad:** Should
- **Riesgo:** Medio
- **Tareas:**
  - RF08-01: Crear la vista EJS de edición de evento
  - RF08-02: Precargar los datos actuales del evento en el formulario
  - RF08-03: Crear la ruta GET de edición del evento
  - RF08-04: Crear la ruta POST para actualizar el evento
  - RF08-05: Crear la ruta POST para eliminar el evento
  - RF08-06: Implementar el controlador de actualización del evento
  - RF08-07: Implementar el controlador de eliminación del evento
  - RF08-08: Comprobar que solo la entidad propietaria puede editar o borrar
  - RF08-09: Actualizar o eliminar el registro en la base de datos
  - RF08-10: Mostrar mensajes de confirmación y error en la interfaz
  - RF08-11: Añadir test unitario de edición y eliminación de publicación propia
  - RF08-12: Documentar el requisito técnico y cómo comprobarlo manualmente

### RF09 — Listado y detalle de eventos
- **Estado:** Cerrado
- **Descripción:** Mostrar actividades disponibles y su información detallada.
- **Criterio de validación:** El usuario puede consultar el listado de eventos activos y acceder al detalle de cada uno.
- **Estimación:** 7 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - RF09-01: Crear la vista EJS del listado de eventos
  - RF09-02: Crear la vista EJS de detalle de evento
  - RF09-03: Crear las rutas públicas de listado y detalle
  - RF09-04: Implementar la consulta de eventos activos ordenados en el controlador
  - RF09-05: Implementar la consulta del detalle de evento por id
  - RF09-06: Cargar en el detalle la información de la entidad organizadora
  - RF09-07: Añadir paginación o carga ordenada básica del listado
  - RF09-08: Aplicar estilos CSS al listado y a la ficha de detalle
  - RF09-09: Añadir test unitario de consulta de listado y detalle
  - RF09-10: Documentar el requisito técnico y cómo comprobarlo manualmente

### RF10 — Búsqueda y filtros de eventos
- **Estado:** Cerrado
- **Descripción:** Permitir filtrar actividades por criterios básicos.
- **Criterio de validación:** El listado se ajusta a filtros como fecha, entidad, categoría o ubicación.
- **Estimación:** 6 h
- **Prioridad:** Should
- **Riesgo:** Medio
- **Tareas:**
  - RF10-01: Definir los filtros disponibles en la interfaz
  - RF10-02: Añadir el formulario de filtros al listado de eventos
  - RF10-03: Leer los parámetros de búsqueda desde la query string
  - RF10-04: Adaptar la consulta de base de datos para aplicar filtros
  - RF10-05: Mantener los filtros seleccionados al recargar la página
  - RF10-06: Añadir una acción para limpiar filtros y volver al listado completo
  - RF10-07: Controlar el caso de búsqueda sin resultados
  - RF10-08: Añadir test unitario de búsqueda y combinación de filtros
  - RF10-09: Documentar el requisito técnico y cómo comprobarlo manualmente

### RF11 — Suscripción a entidades
- **Descripción:** Permitir a voluntarios seguir entidades para recibir avisos.
- **Criterio de validación:** El voluntario puede suscribirse a una entidad sin duplicar registros.
- **Estimación:** 6 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - RF11-01: Definir el modelo de suscripción voluntario-entidad en Prisma
  - RF11-02: Crear y ejecutar la migración de suscripciones
  - RF11-03: Añadir el botón de seguir entidad en la vista correspondiente
  - RF11-04: Crear la ruta POST para suscribirse a una entidad
  - RF11-05: Implementar el controlador de suscripción
  - RF11-06: Comprobar que la entidad existe antes de crear la relación
  - RF11-07: Guardar la relación de suscripción en la base de datos
  - RF11-08: Evitar suscripciones duplicadas mediante validación y restricción unique
  - RF11-09: Actualizar el estado del botón en la interfaz
  - RF11-10: Añadir test unitario de suscripción y control de duplicados
  - RF11-11: Documentar el requisito técnico y cómo comprobarlo manualmente

### RF12 — Inscripción en actividades
- **Descripción:** Permitir que un voluntario se apunte a un evento con plazas disponibles.
- **Criterio de validación:** La inscripción queda registrada, no duplica al usuario y actualiza plazas.
- **Estimación:** 8 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - RF12-01: Definir el modelo de inscripción en Prisma
  - RF12-02: Crear y ejecutar la migración de inscripciones
  - RF12-03: Añadir el botón de apuntarse en el detalle del evento
  - RF12-04: Crear la ruta POST para inscribirse en una actividad
  - RF12-05: Implementar el controlador de inscripción
  - RF12-06: Comprobar que el evento existe y sigue activo
  - RF12-07: Comprobar disponibilidad de plazas antes de guardar
  - RF12-08: Evitar inscripciones duplicadas del mismo voluntario
  - RF12-09: Guardar la inscripción en la base de datos
  - RF12-10: Actualizar las plazas disponibles tras la inscripción
  - RF12-11: Añadir test unitario de inscripción correcta, sin plazas y duplicada
  - RF12-12: Documentar el requisito técnico y cómo comprobarlo manualmente

### RF13 — Cancelación de inscripción
- **Descripción:** Permitir al voluntario cancelar su participación en una actividad.
- **Criterio de validación:** La inscripción puede anularse y la plaza vuelve a quedar disponible.
- **Estimación:** 6 h
- **Prioridad:** Should
- **Riesgo:** Bajo
- **Tareas:**
  - RF13-01: Añadir la acción de cancelar inscripción en la vista del voluntario
  - RF13-02: Crear la ruta POST para cancelar la inscripción
  - RF13-03: Implementar el controlador de cancelación
  - RF13-04: Comprobar que la inscripción pertenece al usuario autenticado
  - RF13-05: Actualizar el estado de la inscripción o eliminar el registro según el diseño
  - RF13-06: Liberar la plaza del evento en la base de datos
  - RF13-07: Actualizar la interfaz tras la cancelación
  - RF13-08: Sincronizar la cancelación con el calendario del voluntario
  - RF13-09: Añadir test unitario de cancelación y liberación de plaza
  - RF13-10: Documentar el requisito técnico y cómo comprobarlo manualmente

### RF14 — Consulta de inscritos por parte de la entidad
- **Descripción:** Permitir que la entidad vea los voluntarios apuntados a sus eventos.
- **Criterio de validación:** La entidad propietaria puede acceder al listado de inscritos de sus actividades.
- **Estimación:** 6 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - RF14-01: Crear la vista EJS del listado de inscritos por evento
  - RF14-02: Crear la ruta protegida para consultar inscritos de un evento propio
  - RF14-03: Implementar el controlador de listado de inscritos
  - RF14-04: Consultar las inscripciones del evento en la base de datos
  - RF14-05: Cargar los datos básicos del voluntario asociados a cada inscripción
  - RF14-06: Comprobar que solo la entidad propietaria accede al listado
  - RF14-07: Mostrar la información permitida en una tabla o listado
  - RF14-08: Añadir test unitario de consulta de inscritos con control de permisos
  - RF14-09: Documentar el requisito técnico y cómo comprobarlo manualmente

### RF15 — Notificaciones internas
- **Descripción:** Generar avisos internos cuando una entidad seguida publica o modifica una actividad.
- **Criterio de validación:** El voluntario suscrito recibe notificaciones y puede marcarlas como leídas.
- **Estimación:** 8 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - RF15-01: Definir el modelo de notificación interna en Prisma
  - RF15-02: Crear y ejecutar la migración de notificaciones
  - RF15-03: Implementar la lógica para generar notificaciones al publicar un evento
  - RF15-04: Implementar la lógica para generar notificaciones al modificar un evento
  - RF15-05: Obtener la lista de voluntarios suscritos a la entidad
  - RF15-06: Guardar las notificaciones generadas en la base de datos
  - RF15-07: Crear la vista o bloque de listado de notificaciones del voluntario
  - RF15-08: Crear la ruta para consultar notificaciones
  - RF15-09: Añadir la opción para marcar una notificación como leída
  - RF15-10: Añadir test unitario de generación y lectura de notificaciones
  - RF15-11: Documentar el requisito técnico y cómo comprobarlo manualmente

### RF16 — Calendario personal del voluntario
- **Descripción:** Mostrar dentro de la aplicación un calendario con los eventos a los que el voluntario está inscrito.
- **Criterio de validación:** El calendario refleja correctamente las actividades inscritas y enlaza con su detalle.
- **Estimación:** 7 h
- **Prioridad:** Should
- **Riesgo:** Medio
- **Tareas:**
  - RF16-01: Elegir el componente o formato de calendario que se va a utilizar
  - RF16-02: Crear la vista EJS del calendario personal del voluntario
  - RF16-03: Crear la ruta protegida del calendario
  - RF16-04: Recuperar las inscripciones activas del voluntario desde la base de datos
  - RF16-05: Transformar los eventos inscritos al formato que necesita el calendario
  - RF16-06: Mostrar cada evento en su día y hora correspondiente
  - RF16-07: Enlazar cada evento del calendario con su vista de detalle
  - RF16-08: Actualizar el calendario al inscribirse o cancelar una actividad
  - RF16-09: Añadir test unitario de carga de eventos en el calendario
  - RF16-10: Documentar el requisito técnico y cómo comprobarlo manualmente

### RF17 — Panel principal de administración
- **Descripción:** Crear el área base de administración de la plataforma.
- **Criterio de validación:** El administrador puede acceder a un panel con accesos a entidades, usuarios y publicaciones.
- **Estimación:** 6 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - RF17-01: Crear el layout EJS del panel de administración
  - RF17-02: Crear el menú interno del área de administración
  - RF17-03: Definir las rutas protegidas del panel admin
  - RF17-04: Crear la vista de resumen con accesos a entidades, usuarios y publicaciones
  - RF17-05: Implementar las consultas básicas para mostrar listados o contadores
  - RF17-06: Añadir contadores o métricas simples en el panel
  - RF17-07: Conectar la navegación del panel con las secciones de administración
  - RF17-08: Comprobar que solo el rol ADMIN puede acceder
  - RF17-09: Añadir test unitario de acceso al panel y carga básica de datos
  - RF17-10: Documentar el requisito técnico y cómo comprobarlo manualmente

### RF18 — Moderación y suspensión
- **Descripción:** Permitir al administrador suspender entidades y retirar contenido.
- **Criterio de validación:** La moderación actualiza estados y oculta el contenido o acceso correspondiente.
- **Estimación:** 7 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - RF18-01: Añadir la acción de suspensión de entidad en el panel de administración
  - RF18-02: Añadir la acción de bloqueo o retirada de publicación
  - RF18-03: Crear las rutas POST de moderación administrativa
  - RF18-04: Implementar el controlador de moderación
  - RF18-05: Actualizar el estado de la entidad o publicación en la base de datos
  - RF18-06: Impedir que una entidad suspendida siga operando en la plataforma
  - RF18-07: Ocultar en la interfaz pública el contenido bloqueado o retirado
  - RF18-08: Registrar la acción administrativa realizada
  - RF18-09: Añadir test unitario de suspensión y retirada de contenido
  - RF18-10: Documentar el requisito técnico y cómo comprobarlo manualmente

### RF19 — Historial de participación
- **Descripción:** Permitir al voluntario consultar sus actividades pasadas y futuras.
- **Criterio de validación:** El sistema muestra el historial clasificado y con acceso al detalle.
- **Estimación:** 6 h
- **Prioridad:** Should
- **Riesgo:** Bajo
- **Tareas:**
  - RF19-01: Crear la vista EJS del historial del voluntario
  - RF19-02: Crear la ruta protegida del historial
  - RF19-03: Implementar la consulta de inscripciones del voluntario
  - RF19-04: Separar actividades futuras y pasadas en el controlador
  - RF19-05: Mostrar estado y datos básicos de cada actividad en la vista
  - RF19-06: Añadir acceso al detalle del evento desde el historial
  - RF19-07: Añadir filtros básicos por estado o fecha si se consideran necesarios
  - RF19-08: Añadir test unitario de carga del historial
  - RF19-09: Documentar el requisito técnico y cómo comprobarlo manualmente

## 7. Requisitos no funcionales

### RNF01 — Usabilidad e interfaz coherente
- **Descripción:** Mantener una navegación clara y una interfaz consistente.
- **Criterio de validación:** Los flujos principales se completan sin pasos innecesarios y con mensajes comprensibles.
- **Estimación:** 5 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - RNF01-01: Definir una navegación general simple y coherente para toda la aplicación
  - RNF01-02: Unificar textos, etiquetas y mensajes de la interfaz
  - RNF01-03: Crear un estilo común para botones, formularios y mensajes flash
  - RNF01-04: Reducir campos o pasos innecesarios en los flujos principales
  - RNF01-05: Revisar manualmente el flujo de registro, login e inscripción
  - RNF01-06: Corregir puntos de fricción detectados en la navegación
  - RNF01-07: Comprobar que las acciones principales se entienden sin instrucciones extra
  - RNF01-08: Documentar el requisito técnico y cómo comprobarlo manualmente

### RNF02 — Diseño responsive
- **Descripción:** Adaptar la aplicación a escritorio, tablet y móvil.
- **Criterio de validación:** Las vistas principales mantienen estructura usable en distintos tamaños de pantalla.
- **Estimación:** 5 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - RNF02-01: Definir los breakpoints principales de la aplicación
  - RNF02-02: Adaptar el layout general para escritorio, tablet y móvil
  - RNF02-03: Ajustar formularios y botones a pantallas pequeñas
  - RNF02-04: Ajustar listados de eventos y tarjetas a diseño responsive
  - RNF02-05: Adaptar el menú o navegación principal para móvil
  - RNF02-06: Revisar perfiles, panel admin y calendario en diferentes tamaños
  - RNF02-07: Probar las pantallas clave en varios tamaños de ventana
  - RNF02-08: Documentar el requisito técnico y cómo comprobarlo manualmente

### RNF03 — Seguridad de contraseñas
- **Descripción:** Evitar almacenamiento o comparación insegura de contraseñas.
- **Criterio de validación:** Las contraseñas se guardan con hash y el login compara correctamente contra ese hash.
- **Estimación:** 4 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - RNF03-01: Instalar y configurar bcrypt en el proyecto
  - RNF03-02: Crear una utilidad común para hashear contraseñas
  - RNF03-03: Crear una utilidad común para comparar contraseñas en login
  - RNF03-04: Integrar el hash en el registro de usuarios
  - RNF03-05: Integrar el hash en cualquier flujo de cambio de contraseña
  - RNF03-06: Comprobar que nunca se guarda la contraseña en texto plano
  - RNF03-07: Añadir test unitario del hash y la comparación de contraseña
  - RNF03-08: Documentar el requisito técnico y cómo comprobarlo manualmente

### RNF04 — Control de acceso por roles
- **Descripción:** Restringir acciones según rol y estado de validación.
- **Criterio de validación:** Solo los perfiles autorizados acceden a las rutas y acciones que les corresponden.
- **Estimación:** 5 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - RNF04-01: Definir los roles del sistema dentro del modelo de usuario
  - RNF04-02: Crear middleware de autenticación para comprobar sesión
  - RNF04-03: Crear middleware de autorización por rol
  - RNF04-04: Proteger las rutas de voluntario, entidad y administrador
  - RNF04-05: Restringir acciones según el rol y el estado de validación de la entidad
  - RNF04-06: Ocultar en la interfaz las opciones no permitidas para cada usuario
  - RNF04-07: Añadir test unitario de acceso permitido y acceso denegado
  - RNF04-08: Documentar el requisito técnico y cómo comprobarlo manualmente

### RNF05 — Integridad de datos
- **Descripción:** Mantener coherencia entre usuarios, entidades, eventos, suscripciones e inscripciones.
- **Criterio de validación:** El sistema evita relaciones inválidas, duplicados y estados inconsistentes.
- **Estimación:** 5 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - RNF05-01: Definir las relaciones y claves foráneas en el esquema de Prisma
  - RNF05-02: Añadir restricciones unique y required en las entidades principales
  - RNF05-03: Validar referencias antes de crear registros dependientes
  - RNF05-04: Controlar los estados permitidos para entidad, evento e inscripción
  - RNF05-05: Revisar borrados y actualizaciones para evitar datos huérfanos
  - RNF05-06: Añadir comprobaciones de integridad en los controladores principales
  - RNF05-07: Añadir test unitario de restricciones e integridad básica
  - RNF05-08: Documentar el requisito técnico y cómo comprobarlo manualmente

### RNF06 — Rendimiento básico
- **Descripción:** Mantener tiempos razonables en operaciones frecuentes.
- **Criterio de validación:** Los flujos más habituales cargan sin demoras excesivas en desarrollo local.
- **Estimación:** 4 h
- **Prioridad:** Should
- **Riesgo:** Medio
- **Tareas:**
  - RNF06-01: Revisar las consultas más frecuentes de listado y detalle
  - RNF06-02: Optimizar consultas que cargan datos relacionados innecesarios
  - RNF06-03: Añadir paginación básica en listados largos si hace falta
  - RNF06-04: Crear índices básicos en campos de búsqueda habituales
  - RNF06-05: Reducir consultas duplicadas entre controlador y vistas
  - RNF06-06: Hacer pruebas manuales de tiempos en los flujos principales
  - RNF06-07: Aplicar ajustes básicos de rendimiento detectados en las pruebas
  - RNF06-08: Documentar el requisito técnico y cómo comprobarlo manualmente

### RNF07 — Mantenibilidad del proyecto
- **Descripción:** Organizar el código para facilitar extensión y mantenimiento.
- **Criterio de validación:** El proyecto está estructurado por módulos y con convenciones homogéneas.
- **Estimación:** 4 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - RNF07-01: Separar el proyecto por carpetas de rutas, controladores, servicios y vistas
  - RNF07-02: Reordenar los módulos por áreas funcionales del sistema
  - RNF07-03: Extraer lógica repetida a utilidades o servicios comunes
  - RNF07-04: Unificar nombres de archivos, variables y rutas
  - RNF07-05: Eliminar código duplicado o provisional que ya no se utilice
  - RNF07-06: Revisar que la estructura sea coherente para seguir creciendo
  - RNF07-07: Añadir una documentación técnica básica de la estructura del proyecto

### RNF08 — Configuración y arranque del proyecto
- **Descripción:** Facilitar la puesta en marcha del proyecto desde un entorno limpio.
- **Criterio de validación:** Un tercero puede instalar dependencias, configurar variables y arrancar la aplicación.
- **Estimación:** 4 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - RNF08-01: Crear o revisar el archivo `.env.example` con las variables necesarias
  - RNF08-02: Configurar los scripts npm de desarrollo y arranque del proyecto
  - RNF08-03: Preparar la conexión a base de datos para entorno local
  - RNF08-04: Configurar la lectura del puerto y variables de entorno en la aplicación
  - RNF08-05: Añadir manejo básico de errores al arrancar la aplicación
  - RNF08-06: Documentar la instalación y puesta en marcha paso a paso
  - RNF08-07: Probar el arranque en limpio en un entorno nuevo

### RNF09 — Trazabilidad administrativa
- **Descripción:** Registrar acciones críticas realizadas por administradores.
- **Criterio de validación:** El sistema guarda al menos las acciones de validación, rechazo, suspensión y bloqueo.
- **Estimación:** 5 h
- **Prioridad:** Should
- **Riesgo:** Medio
- **Tareas:**
  - RNF09-01: Definir el modelo de log de acciones administrativas en Prisma
  - RNF09-02: Crear y ejecutar la migración de trazabilidad administrativa
  - RNF09-03: Crear un helper o servicio para registrar acciones del administrador
  - RNF09-04: Registrar las acciones de validación, rechazo, suspensión y bloqueo
  - RNF09-05: Crear una consulta o vista básica para revisar el histórico de acciones
  - RNF09-06: Mostrar fecha, usuario administrador y acción realizada
  - RNF09-07: Añadir test unitario del registro de acciones administrativas
  - RNF09-08: Documentar el requisito técnico y cómo comprobarlo manualmente

### RNF10 — Pruebas de integración del sistema
- **Descripción:** Definir y automatizar pruebas de integración para los flujos principales del sistema.
- **Criterio de validación:** Existe un conjunto ejecutable de pruebas de integración que cubre los recorridos críticos de la aplicación.
- **Estimación:** 8 h
- **Prioridad:** Should
- **Riesgo:** Medio
- **Tareas:**
  - RNF10-01: Elegir el framework de pruebas de integración para Express
  - RNF10-02: Configurar un entorno de test separado con base de datos de pruebas
  - RNF10-03: Preparar datos semilla mínimos para los flujos completos
  - RNF10-04: Crear el test de integración de registro y login de voluntario
  - RNF10-05: Crear el test de integración de alta de entidad, validación y publicación de evento
  - RNF10-06: Crear el test de integración de inscripción y cancelación de actividad
  - RNF10-07: Crear el test de integración de suscripción, notificaciones y calendario
  - RNF10-08: Crear el test de integración de moderación desde administración
  - RNF10-09: Añadir un script npm run test:integration
  - RNF10-10: Documentar cómo ejecutar los tests de integración y qué flujo valida cada uno

## 8. Orden recomendado de implementación

1. RI01 — Preparación del entorno
2. RI02 — Inicialización Node/Express/EJS
3. PRE03 — Configuración PostgreSQL
4. PRE04 — Configuración Prisma
5. RNF07 — Estructura mantenible del proyecto
6. RNF08 — Configuración y arranque
7. RNF03 — Seguridad de contraseñas
8. RNF04 — Control de acceso por roles
9. RF01 — Registro de voluntario
10. RF02 — Inicio y cierre de sesión
11. RF03 — Alta de entidad
12. RF04 — Verificación de entidades
13. RF05 — Perfil de voluntario
14. RF06 — Perfil de entidad
15. RF07 — Publicación de eventos
16. RF08 — Edición y eliminación de eventos
17. RF09 — Listado y detalle de eventos
18. RF10 — Filtros de eventos
19. RF11 — Suscripción a entidades
20. RF12 — Inscripción en actividades
21. RF13 — Cancelación de inscripción
22. RF14 — Gestión de inscritos
23. RF15 — Notificaciones internas
24. RF16 — Calendario personal
25. RF17 — Panel de administración
26. RF18 — Moderación y suspensión
27. RF19 — Historial de participación
28. RNF01 — Usabilidad
29. RNF02 — Responsive
30. RNF05 — Integridad de datos
31. RNF06 — Rendimiento básico
32. RNF09 — Trazabilidad administrativa
33. RNF10 — Pruebas de integración del sistema
34. Actualización final de `README.md`

## 9. Definition of Done por requisito

Un requisito se considerará terminado cuando:
- su estructura técnica necesaria esté creada
- su lógica principal esté implementada
- esté conectado a base de datos si corresponde
- tenga validaciones mínimas en servidor
- tenga al menos un test unitario relacionado
- tenga su documentación básica en `docs/requisitos/`
- si forma parte de un flujo completo, tenga test de integración o quede enlazado al flujo correspondiente
- el `README.md` se actualice solo cuando el requisito ya esté realmente cerrado

## 10. Uso previsto de este documento

Este archivo sirve como referencia principal para:
- entender el alcance técnico del proyecto
- guiar la implementación de cada requisito
- ayudar a asistentes de código o herramientas de apoyo a mantener contexto del sistema
- evitar que se den por hechas tareas de instalación, configuración, conexión o validación
- mantener una trazabilidad clara entre requisito, tareas, pruebas y documentación
