
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
- **Descripción:** Preparar el entorno base de trabajo en local para poder desarrollar la aplicación.
- **Criterio de validación:** El proyecto puede abrirse, instalar dependencias y arrancar sin errores en un entorno local limpio.
- **Estimación:** 6 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - Instalar Node.js LTS y npm en el equipo de desarrollo — **0,5**
  - Crear el proyecto base con npm init — **0,5**
  - Instalar Express, EJS y dependencias iniciales del proyecto — **0,8**
  - Instalar nodemon como dependencia de desarrollo — **0,5**
  - Crear la estructura inicial de carpetas del proyecto — **0,8**
  - Configurar app.js y el servidor Express mínimo — **1,0**
  - Configurar EJS como motor de vistas y la carpeta public — **0,8**
  - Añadir scripts npm run dev y npm start en package.json — **0,5**
  - Crear el archivo .gitignore base para un proyecto Node.js — **0,3**
  - Levantar la aplicación en local y comprobar que responde sin errores
  - Documentar la configuración realizada para que pueda reproducirse desde cero  

### PRE02 — Inicialización de la aplicación Node + Express + EJS
- **Descripción:** Configurar la base técnica de la aplicación web.
- **Criterio de validación:** La aplicación arranca con Express, renderiza una vista EJS y sirve recursos estáticos correctamente.
- **Estimación:** 6 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - Instalar PostgreSQL en el entorno local de desarrollo — **0,8**
  - Crear la base de datos inicial del proyecto — **0,5**
  - Instalar Prisma CLI y @prisma/client en el proyecto — **0,5**
  - Ejecutar prisma init para generar la estructura inicial de Prisma — **0,5**
  - Configurar DATABASE_URL en el archivo .env — **0,5**
  - Configurar PostgreSQL como provider en schema.prisma — **0,5**
  - Crear un modelo base de prueba para validar la integración — **0,8**
  - Generar la primera migración con prisma migrate dev — **0,8**
  - Probar la conexión a base de datos desde la aplicación — **0,8**
  - Añadir un script útil de Prisma en package.json para el desarrollo — **0,3**
  - Documentar la configuración realizada para que pueda reproducirse desde cero — **0,5**

### PRE03 — Configuración de PostgreSQL
- **Estado:** Cerrado
- **Descripción:** Preparar la base de datos relacional del proyecto.
- **Criterio de validación:** Existe una base de datos accesible desde la aplicación y preparada para trabajar con Prisma.
- **Estimación:** 5 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - RI03-01: Crear base de datos del proyecto en PostgreSQL
  - RI03-02: Crear usuario y credenciales de acceso si procede
  - RI03-03: Configurar cadena de conexión en `.env`
  - RI03-04: Verificar conexión a la base de datos desde local
  - RI03-05: Decidir convención de nombres para tablas y campos
  - RI03-06: Crear script o instrucción de reseteo de base de datos para desarrollo
  - RI03-07: Documentar configuración mínima de PostgreSQL para el proyecto

### PRE04 — Configuración inicial de Prisma
- **Estado:** Cerrado
- **Descripción:** Preparar Prisma como herramienta de modelado y acceso a datos.
- **Criterio de validación:** Prisma está inicializado, conectado a PostgreSQL y permite ejecutar migraciones.
- **Estimación:** 5 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - RI04-01: Inicializar Prisma en el proyecto
  - RI04-02: Crear `schema.prisma` inicial
  - RI04-03: Configurar datasource y generator de Prisma
  - RI04-04: Crear primer modelo temporal de prueba
  - RI04-05: Ejecutar primera migración
  - RI04-06: Generar cliente Prisma
  - RI04-07: Crear utilidad de acceso a Prisma reutilizable
  - RI04-08: Probar lectura y escritura mínima en base de datos
  - RI04-09: Documentar flujo de migraciones y uso básico de Prisma

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
  - RF03-06: Crear las rutas GET/POST del registro de entidad
  - RF03-07: Implementar el controlador de alta de entidad
  - RF03-08: Guardar la entidad con estado inicial PENDIENTE en la base de datos
  - RF03-09: Preparar el campo para documento identificativo o información justificativa
  - RF03-10: Mostrar mensaje de solicitud enviada correctamente
  - RF03-11: Añadir test unitario del alta de entidad y del estado pendiente inicial
  - RF03-12: Documentar el requisito y su validación manual

### RF04 — Verificación de entidades
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
- **Descripción:** Permitir a la entidad consultar y modificar su información visible.
- **Criterio de validación:** La entidad puede editar los campos permitidos y visualizar los cambios actualizados.
- **Estimación:** 6 h
- **Prioridad:** Should
- **Riesgo:** Bajo
- **Tareas:**
  - RF06-01: Crear la vista EJS del perfil de entidad
  - RF06-02: Mostrar los datos actuales de la entidad en el formulario
  - RF06-03: Añadir estilos CSS de la pantalla de perfil de entidad
  - RF06-04: Crear la ruta GET/POST para editar el perfil de entidad
  - RF06-05: Implementar el controlador de actualización del perfil de entidad
  - RF06-06: Actualizar los datos permitidos de la entidad en la base de datos
  - RF06-07: Validar los campos editables y restricciones básicas
  - RF06-08: Añadir test unitario de actualización de perfil de entidad
  - RF06-09: Documentar el requisito

### RF07 — Publicación de eventos
- **Descripción:** Permitir a entidades verificadas crear actividades o eventos.
- **Criterio de validación:** Una entidad verificada puede publicar un evento con sus datos básicos y verlo en el listado público.
- **Estimación:** 9 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - RF07-01: Definir los campos del formulario de creación de evento
  - RF07-02: Crear la vista EJS de alta de evento
  - RF07-03: Añadir estilos CSS y validaciones de cliente del formulario
  - RF07-04: Definir el modelo de evento en Prisma
  - RF07-05: Crear y ejecutar la migración de eventos
  - RF07-06: Crear las rutas GET/POST para publicar eventos
  - RF07-07: Implementar el controlador de creación de evento
  - RF07-08: Guardar el evento vinculado a la entidad en la base de datos
  - RF07-09: Validar fecha, hora, plazas y entidad verificada en servidor
  - RF07-10: Mostrar mensaje de publicación creada correctamente
  - RF07-11: Añadir test unitario de creación de evento y bloqueo a entidades no verificadas
  - RF07-12: Documentar el requisito

### RF08 — Edición y eliminación de eventos
- **Descripción:** Permitir a la entidad autora editar o eliminar sus publicaciones.
- **Criterio de validación:** Solo la entidad propietaria puede modificar o retirar sus eventos.
- **Estimación:** 7 h
- **Prioridad:** Should
- **Riesgo:** Medio
- **Tareas:**
  - RF08-01: Crear la vista EJS de edición de evento
  - RF08-02: Precargar los datos actuales del evento en el formulario
  - RF08-03: Crear las rutas GET/POST de edición y la ruta de eliminación
  - RF08-04: Implementar el controlador de actualización del evento
  - RF08-05: Implementar el controlador de eliminación del evento
  - RF08-06: Comprobar que solo la entidad propietaria puede editar o borrar
  - RF08-07: Actualizar o eliminar el registro en la base de datos
  - RF08-08: Actualizar mensajes de confirmación y error en interfaz
  - RF08-09: Añadir test unitario de edición y eliminación de publicación propia
  - RF08-10: Documentar el requisito

### RF09 — Listado y detalle de eventos
- **Descripción:** Mostrar actividades disponibles y su información detallada.
- **Criterio de validación:** El usuario puede consultar el listado de eventos activos y acceder al detalle de cada uno.
- **Estimación:** 7 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - RF09-01: Crear la vista EJS del listado de eventos
  - RF09-02: Crear la vista EJS de detalle de evento
  - RF09-03: Implementar la consulta de eventos activos en el controlador
  - RF09-04: Implementar la consulta del detalle por id
  - RF09-05: Mostrar información de la entidad organizadora en la vista de detalle
  - RF09-06: Añadir paginación o carga ordenada básica del listado
  - RF09-07: Añadir estilos CSS del listado y la ficha de detalle
  - RF09-08: Añadir test unitario de consulta de listado y detalle
  - RF09-09: Documentar el requisito

### RF10 — Búsqueda y filtros de eventos
- **Descripción:** Permitir filtrar actividades por criterios básicos.
- **Criterio de validación:** El listado se ajusta a filtros como fecha, entidad, categoría o ubicación.
- **Estimación:** 6 h
- **Prioridad:** Should
- **Riesgo:** Medio
- **Tareas:**
  - RF10-01: Definir los filtros disponibles en la interfaz
  - RF10-02: Añadir el formulario de filtros al listado de eventos
  - RF10-03: Leer parámetros de búsqueda desde query string
  - RF10-04: Adaptar la consulta a base de datos para aplicar filtros
  - RF10-05: Mantener los filtros seleccionados al recargar la página
  - RF10-06: Controlar el caso de búsqueda sin resultados
  - RF10-07: Añadir test unitario de búsqueda y combinación de filtros
  - RF10-08: Documentar el requisito

### RF11 — Suscripción a entidades
- **Descripción:** Permitir a voluntarios seguir entidades para recibir avisos.
- **Criterio de validación:** El voluntario puede suscribirse a una entidad sin duplicar registros.
- **Estimación:** 6 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - RF11-01: Definir el modelo de suscripción voluntario-entidad en Prisma
  - RF11-02: Crear y ejecutar la migración de suscripciones
  - RF11-03: Añadir botón de seguir entidad en la vista correspondiente
  - RF11-04: Crear la ruta POST para suscribirse a una entidad
  - RF11-05: Implementar el controlador de suscripción
  - RF11-06: Guardar la relación de suscripción en la base de datos
  - RF11-07: Evitar suscripciones duplicadas
  - RF11-08: Actualizar el estado del botón en la interfaz
  - RF11-09: Añadir test unitario de suscripción y control de duplicados
  - RF11-10: Documentar el requisito

### RF12 — Inscripción en actividades
- **Descripción:** Permitir que un voluntario se apunte a un evento con plazas disponibles.
- **Criterio de validación:** La inscripción queda registrada, no duplica al usuario y actualiza plazas.
- **Estimación:** 8 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - RF12-01: Definir el modelo de inscripción en Prisma
  - RF12-02: Crear y ejecutar la migración de inscripciones
  - RF12-03: Añadir botón de apuntarse en el detalle del evento
  - RF12-04: Crear la ruta POST para inscribirse en una actividad
  - RF12-05: Implementar el controlador de inscripción
  - RF12-06: Comprobar disponibilidad de plazas antes de guardar
  - RF12-07: Guardar la inscripción en la base de datos
  - RF12-08: Actualizar plazas disponibles tras la inscripción
  - RF12-09: Evitar inscripciones duplicadas del mismo voluntario
  - RF12-10: Añadir test unitario de inscripción correcta, sin plazas y duplicada
  - RF12-11: Documentar el requisito

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
  - RF13-04: Actualizar el estado de la inscripción o eliminar el registro según diseño
  - RF13-05: Liberar la plaza del evento en base de datos
  - RF13-06: Actualizar la interfaz tras la cancelación
  - RF13-07: Sincronizar la cancelación con el calendario del voluntario
  - RF13-08: Añadir test unitario de cancelación y liberación de plaza
  - RF13-09: Documentar el requisito

### RF14 — Consulta de inscritos por parte de la entidad
- **Descripción:** Permitir que la entidad vea los voluntarios apuntados a sus eventos.
- **Criterio de validación:** La entidad propietaria puede acceder al listado de inscritos de sus actividades.
- **Estimación:** 6 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - RF14-01: Crear la vista EJS del listado de inscritos por evento
  - RF14-02: Crear la ruta para consultar inscritos de un evento propio
  - RF14-03: Implementar el controlador de listado de inscritos
  - RF14-04: Consultar las inscripciones de un evento en la base de datos
  - RF14-05: Mostrar datos relevantes del voluntario en la tabla de inscritos
  - RF14-06: Comprobar que solo la entidad propietaria accede al listado
  - RF14-07: Añadir test unitario de consulta de inscritos con control de permisos
  - RF14-08: Documentar el requisito

### RF15 — Notificaciones internas
- **Descripción:** Generar avisos internos cuando una entidad seguida publica o modifica una actividad.
- **Criterio de validación:** El voluntario suscrito recibe notificaciones y puede marcarlas como leídas.
- **Estimación:** 8 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - RF15-01: Definir el modelo de notificación en Prisma
  - RF15-02: Crear y ejecutar la migración de notificaciones
  - RF15-03: Crear la lógica para generar notificaciones al publicar un evento
  - RF15-04: Crear la lógica para generar notificaciones al modificar un evento
  - RF15-05: Obtener la lista de voluntarios suscritos a la entidad
  - RF15-06: Guardar las notificaciones en la base de datos
  - RF15-07: Crear la vista o bloque de listado de notificaciones del voluntario
  - RF15-08: Añadir opción para marcar una notificación como leída
  - RF15-09: Añadir test unitario de generación y lectura de notificaciones
  - RF15-10: Documentar el requisito

### RF16 — Calendario personal del voluntario
- **Descripción:** Mostrar dentro de la aplicación un calendario con los eventos a los que el voluntario está inscrito.
- **Criterio de validación:** El calendario refleja correctamente las actividades inscritas y enlaza con su detalle.
- **Estimación:** 7 h
- **Prioridad:** Should
- **Riesgo:** Medio
- **Tareas:**
  - RF16-01: Elegir el componente o formato de calendario a utilizar en la vista
  - RF16-02: Crear la vista EJS del calendario personal
  - RF16-03: Recuperar las inscripciones activas del voluntario desde la base de datos
  - RF16-04: Transformar eventos inscritos al formato que necesita el calendario
  - RF16-05: Mostrar cada evento en su día y hora correspondiente
  - RF16-06: Enlazar cada evento del calendario con su vista de detalle
  - RF16-07: Actualizar el calendario al inscribirse o cancelar una actividad
  - RF16-08: Añadir test unitario de carga de eventos en el calendario
  - RF16-09: Documentar el requisito

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
  - RF17-05: Implementar consultas básicas para mostrar listados administrativos
  - RF17-06: Añadir contadores o métricas simples en el panel
  - RF17-07: Comprobar que solo el rol ADMIN puede acceder
  - RF17-08: Añadir test unitario de acceso al panel y carga básica de datos
  - RF17-09: Documentar el requisito

### RF18 — Moderación y suspensión
- **Descripción:** Permitir al administrador suspender entidades y retirar contenido.
- **Criterio de validación:** La moderación actualiza estados y oculta el contenido o acceso correspondiente.
- **Estimación:** 7 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - RF18-01: Añadir acciones de suspensión de entidad en el panel de administración
  - RF18-02: Añadir acción de bloqueo o retirada de publicación
  - RF18-03: Crear las rutas POST de moderación
  - RF18-04: Implementar el controlador de moderación
  - RF18-05: Actualizar el estado de la entidad o publicación en base de datos
  - RF18-06: Ocultar en interfaz el contenido bloqueado
  - RF18-07: Registrar la acción administrativa realizada
  - RF18-08: Añadir test unitario de suspensión y retirada de contenido
  - RF18-09: Documentar el requisito

### RF19 — Historial de participación
- **Descripción:** Permitir al voluntario consultar sus actividades pasadas y futuras.
- **Criterio de validación:** El sistema muestra el historial clasificado y con acceso al detalle.
- **Estimación:** 6 h
- **Prioridad:** Should
- **Riesgo:** Bajo
- **Tareas:**
  - RF19-01: Crear la vista EJS del historial del voluntario
  - RF19-02: Implementar la consulta de inscripciones del voluntario
  - RF19-03: Separar actividades futuras y pasadas en el controlador
  - RF19-04: Mostrar estado y datos básicos de cada actividad en la vista
  - RF19-05: Añadir acceso al detalle desde el historial
  - RF19-06: Añadir filtros básicos por estado o fecha si procede
  - RF19-07: Añadir test unitario de carga del historial
  - RF19-08: Documentar el requisito

## 7. Requisitos no funcionales

### RNF01 — Usabilidad e interfaz coherente
- **Descripción:** Mantener una navegación clara y una interfaz consistente.
- **Criterio de validación:** Los flujos principales se completan sin pasos innecesarios y con mensajes comprensibles.
- **Estimación:** 5 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - RNF01-01: Revisar y simplificar el flujo de navegación principal
  - RNF01-02: Unificar textos, etiquetas y mensajes de la interfaz
  - RNF01-03: Añadir mensajes de error y éxito claros en formularios
  - RNF01-04: Reducir campos y pasos innecesarios en los flujos principales
  - RNF01-05: Hacer una prueba manual completa de registro, login e inscripción
  - RNF01-06: Documentar criterios de usabilidad aplicados

### RNF02 — Diseño responsive
- **Descripción:** Adaptar la aplicación a escritorio, tablet y móvil.
- **Criterio de validación:** Las vistas principales mantienen estructura usable en distintos tamaños de pantalla.
- **Estimación:** 5 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - RNF02-01: Definir los breakpoints principales de la aplicación
  - RNF02-02: Adaptar el layout general para móvil, tablet y escritorio
  - RNF02-03: Ajustar formularios y botones a pantallas pequeñas
  - RNF02-04: Ajustar listados de eventos y tarjetas responsive
  - RNF02-05: Adaptar el menú o navegación para móvil
  - RNF02-06: Probar visualmente las vistas principales en varios tamaños
  - RNF02-07: Documentar la validación responsive

### RNF03 — Seguridad de contraseñas
- **Descripción:** Evitar almacenamiento o comparación insegura de contraseñas.
- **Criterio de validación:** Las contraseñas se guardan con hash y el login compara correctamente contra ese hash.
- **Estimación:** 4 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - RNF03-01: Instalar y configurar bcrypt en el proyecto
  - RNF03-02: Crear utilidad común para hashear contraseñas
  - RNF03-03: Crear utilidad común para comparar contraseñas en login
  - RNF03-04: Sustituir cualquier guardado en claro por hash antes de persistir
  - RNF03-05: Revisar los flujos de registro y login para usar bcrypt
  - RNF03-06: Añadir test unitario del hash y la comparación de contraseña
  - RNF03-07: Documentar el requisito

### RNF04 — Control de acceso por roles
- **Descripción:** Restringir acciones según rol y estado de validación.
- **Criterio de validación:** Solo los perfiles autorizados acceden a las rutas y acciones que les corresponden.
- **Estimación:** 5 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - RNF04-01: Definir los roles del sistema en el modelo de usuario
  - RNF04-02: Crear middleware de autenticación
  - RNF04-03: Crear middleware de autorización por rol
  - RNF04-04: Proteger las rutas de voluntario, entidad y administrador
  - RNF04-05: Ocultar en la interfaz las opciones no permitidas según el rol
  - RNF04-06: Añadir test unitario de acceso permitido y acceso denegado
  - RNF04-07: Documentar el requisito

### RNF05 — Integridad de datos
- **Descripción:** Mantener coherencia entre usuarios, entidades, eventos, suscripciones e inscripciones.
- **Criterio de validación:** El sistema evita relaciones inválidas, duplicados y estados inconsistentes.
- **Estimación:** 5 h
- **Prioridad:** Must
- **Riesgo:** Medio
- **Tareas:**
  - RNF05-01: Definir relaciones y claves foráneas en el esquema Prisma
  - RNF05-02: Añadir restricciones `unique` y `required` en entidades principales
  - RNF05-03: Validar reglas de negocio en backend antes de guardar datos
  - RNF05-04: Controlar estados permitidos para entidad, evento e inscripción
  - RNF05-05: Revisar borrados y actualizaciones para evitar datos huérfanos
  - RNF05-06: Añadir test unitario de restricciones e integridad básica
  - RNF05-07: Documentar el requisito

### RNF06 — Rendimiento básico
- **Descripción:** Mantener tiempos razonables en operaciones frecuentes.
- **Criterio de validación:** Los flujos más habituales cargan sin demoras excesivas en desarrollo local.
- **Estimación:** 4 h
- **Prioridad:** Should
- **Riesgo:** Medio
- **Tareas:**
  - RNF06-01: Revisar las consultas más frecuentes de listado y detalle
  - RNF06-02: Optimizar consultas que cargan datos relacionados innecesarios
  - RNF06-03: Añadir paginación básica en listados largos
  - RNF06-04: Crear índices básicos en campos de búsqueda habituales
  - RNF06-05: Reducir recargas o consultas duplicadas en la interfaz
  - RNF06-06: Hacer pruebas manuales de tiempos en flujos principales
  - RNF06-07: Documentar las mejoras aplicadas

### RNF07 — Mantenibilidad del proyecto
- **Descripción:** Organizar el código para facilitar extensión y mantenimiento.
- **Criterio de validación:** El proyecto está estructurado por módulos y con convenciones homogéneas.
- **Estimación:** 4 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - RNF07-01: Separar rutas, controladores, servicios y acceso a datos por módulos
  - RNF07-02: Reordenar la estructura de carpetas del proyecto
  - RNF07-03: Extraer lógica repetida a utilidades o servicios comunes
  - RNF07-04: Unificar nombres de archivos, variables y rutas
  - RNF07-05: Eliminar código duplicado o provisional que ya no se use
  - RNF07-06: Añadir documentación básica de estructura del proyecto

### RNF08 — Configuración y arranque del proyecto
- **Descripción:** Facilitar la puesta en marcha del proyecto desde un entorno limpio.
- **Criterio de validación:** Un tercero puede instalar dependencias, configurar variables y arrancar la aplicación.
- **Estimación:** 4 h
- **Prioridad:** Must
- **Riesgo:** Bajo
- **Tareas:**
  - RNF08-01: Crear o revisar el archivo `.env.example` con variables necesarias
  - RNF08-02: Configurar scripts npm para desarrollo y arranque del proyecto
  - RNF08-03: Preparar la conexión a base de datos para entorno local
  - RNF08-04: Añadir manejo básico de errores al arrancar la aplicación
  - RNF08-05: Documentar instalación y puesta en marcha paso a paso
  - RNF08-06: Probar el arranque en limpio en un entorno nuevo

### RNF09 — Trazabilidad administrativa
- **Descripción:** Registrar acciones críticas realizadas por administradores.
- **Criterio de validación:** El sistema guarda al menos las acciones de validación, rechazo, suspensión y bloqueo.
- **Estimación:** 5 h
- **Prioridad:** Should
- **Riesgo:** Medio
- **Tareas:**
  - RNF09-01: Definir el modelo de log de acciones administrativas en Prisma
  - RNF09-02: Crear y ejecutar la migración de trazabilidad administrativa
  - RNF09-03: Crear helper o servicio para registrar acciones del administrador
  - RNF09-04: Registrar acciones de validación, rechazo, suspensión y bloqueo
  - RNF09-05: Crear vista o tabla básica para consultar el histórico de acciones
  - RNF09-06: Añadir test unitario del registro de acciones administrativas
  - RNF09-07: Documentar el requisito

## 8. Tests de integración previstos

### INT01 — Flujo de registro e inicio de sesión de voluntario
- **Descripción:** Probar el flujo completo desde alta de voluntario hasta acceso al área personal.
- **Criterio de validación:** El flujo crea el usuario, permite iniciar sesión y renderiza su área autenticada.
- **Tareas:**
  - INT01-01: Preparar datos de prueba para registro de voluntario
  - INT01-02: Simular petición de alta y persistencia en base de datos de test
  - INT01-03: Simular login posterior con sesión
  - INT01-04: Verificar redirección y acceso al área del voluntario
  - INT01-05: Documentar el test de integración

### INT02 — Flujo de alta y validación de entidad
- **Descripción:** Probar el alta de entidad y su validación desde administración.
- **Criterio de validación:** La entidad pasa de PENDIENTE a VERIFICADA y queda habilitada para publicar eventos.
- **Tareas:**
  - INT02-01: Preparar datos de prueba de entidad nueva
  - INT02-02: Ejecutar flujo de solicitud de alta
  - INT02-03: Ejecutar validación desde usuario administrador
  - INT02-04: Comprobar cambio de estado en base de datos
  - INT02-05: Verificar habilitación para publicar eventos
  - INT02-06: Documentar el test de integración

### INT03 — Flujo de publicación e inscripción en evento
- **Descripción:** Probar el flujo entre entidad verificada y voluntario inscrito.
- **Criterio de validación:** Una entidad publica un evento y un voluntario puede inscribirse correctamente.
- **Tareas:**
  - INT03-01: Crear entidad verificada de prueba
  - INT03-02: Publicar un evento de prueba
  - INT03-03: Consultar el evento desde el listado
  - INT03-04: Ejecutar inscripción del voluntario
  - INT03-05: Verificar disminución de plazas y creación de inscripción
  - INT03-06: Documentar el test de integración

### INT04 — Flujo de cancelación y actualización del calendario
- **Descripción:** Probar la cancelación de una inscripción y su reflejo en calendario.
- **Criterio de validación:** Al cancelar una inscripción se libera la plaza y el evento deja de mostrarse en el calendario del voluntario.
- **Tareas:**
  - INT04-01: Partir de una inscripción válida existente
  - INT04-02: Ejecutar cancelación desde el área del voluntario
  - INT04-03: Verificar liberación de plaza
  - INT04-04: Verificar cambio en historial y calendario
  - INT04-05: Documentar el test de integración

### INT05 — Flujo de notificación a voluntarios suscritos
- **Descripción:** Probar la generación de avisos cuando una entidad seguida publica o modifica un evento.
- **Criterio de validación:** Los voluntarios suscritos reciben una notificación interna visible en su área personal.
- **Tareas:**
  - INT05-01: Crear suscripción de voluntario a entidad
  - INT05-02: Publicar o modificar evento de prueba
  - INT05-03: Generar notificación en base de datos
  - INT05-04: Consultar la notificación desde el área del voluntario
  - INT05-05: Documentar el test de integración

## 9. Orden recomendado de implementación

1. RI01 — Preparación del entorno
2. RI02 — Inicialización Node/Express/EJS
3. RI03 — Configuración PostgreSQL
4. RI04 — Configuración Prisma
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
33. INT01 a INT05 — Tests de integración
34. Actualización final de `README.md`

## 10. Definition of Done por requisito

Un requisito se considerará terminado cuando:
- su estructura técnica necesaria esté creada
- su lógica principal esté implementada
- esté conectado a base de datos si corresponde
- tenga validaciones mínimas en servidor
- tenga al menos un test unitario relacionado
- tenga su documentación básica en `docs/requisitos/`
- si forma parte de un flujo completo, tenga test de integración o quede enlazado al flujo correspondiente
- el `README.md` se actualice solo cuando el requisito ya esté realmente cerrado

## 11. Uso previsto de este documento

Este archivo sirve como referencia principal para:
- entender el alcance técnico del proyecto
- guiar la implementación de cada requisito
- ayudar a asistentes de código o herramientas de apoyo a mantener contexto del sistema
- evitar que se den por hechas tareas de instalación, configuración, conexión o validación
- mantener una trazabilidad clara entre requisito, tareas, pruebas y documentación
