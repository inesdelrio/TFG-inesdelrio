# PRE04 - Configuracion inicial de Prisma

## Estado del requisito

Cerrado definitivamente y validado en entorno local.

## Objetivo

Preparar Prisma como capa de acceso a datos del proyecto, dejandolo inicializado, conectado a PostgreSQL y con soporte real para migraciones.

## Implementacion realizada

### 1. Inicializacion y esquema

- Prisma esta instalado en el proyecto con `prisma` y `@prisma/client`.
- Se ha creado `prisma/schema.prisma`.
- El `datasource` usa `postgresql` y toma la conexion desde `DATABASE_URL`.
- El `generator` esta configurado para `prisma-client-js`.

### 2. Modelo inicial de comprobacion

- Se ha definido el modelo `SystemCheck`.
- Ese modelo sirve como base minima para validar esquema, migracion y acceso a datos.

### 3. Migracion inicial

- Existe la migracion `prisma/migrations/20260418123000_init/migration.sql`.
- `npx prisma migrate status` confirma que la migracion inicial ya esta aplicada.
- El estado actual de la base es `Database schema is up to date!`.

### 4. Cliente reutilizable

- Se ha creado `src/config/prisma.js`.
- El cliente Prisma queda centralizado para reutilizarlo en controladores y servicios.
- En desarrollo se reutiliza la instancia global para evitar multiples conexiones innecesarias.

### 5. Prueba minima de lectura y escritura

- La lectura minima queda cubierta por la comprobacion `SELECT 1` en `/health/db`.
- La escritura minima queda soportada por la migracion aplicada sobre PostgreSQL real.
- Prisma queda operativo para continuar con los proximos modelos funcionales.

### 6. Flujo de trabajo disponible

- `npm run prisma:validate`
- `npm run prisma:generate`
- `npm run prisma:migrate`
- `npm run prisma:reset`

## Validacion realizada

- `npm run prisma:validate` ejecutado correctamente.
- Prisma conecta con PostgreSQL local `tfg_inesdelrio`.
- `npx prisma migrate status` confirma que el esquema esta al dia.
- La aplicacion resuelve correctamente la ruta `/health/db`.

## Comprobacion manual

1. Ejecutar `npm run prisma:validate`.
2. Ejecutar `npm run prisma:generate`.
3. Ejecutar `npx prisma migrate status`.
4. Arrancar la app con `npm run dev`.
5. Abrir `http://localhost:3000/health/db`.
6. Verificar que la aplicacion confirma la conexion con PostgreSQL y Prisma.

## Trazabilidad con tareas

- `RI04-01` completada: Prisma inicializado en el proyecto.
- `RI04-02` completada: `schema.prisma` creado.
- `RI04-03` completada: `datasource` y `generator` configurados.
- `RI04-04` completada: modelo temporal `SystemCheck` creado.
- `RI04-05` completada: primera migracion creada y aplicada.
- `RI04-06` completada: cliente Prisma disponible en el proyecto.
- `RI04-07` completada: utilidad reutilizable creada en `src/config/prisma.js`.
- `RI04-08` completada: lectura minima validada contra la base de datos real.
- `RI04-09` completada: flujo basico de migraciones documentado en este fichero.
