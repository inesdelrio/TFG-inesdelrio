# PRE03 - Configuracion de PostgreSQL

## Estado del requisito

Cerrado definitivamente y validado en entorno local.

## Objetivo

Preparar la base de datos relacional del proyecto para que la aplicacion pueda trabajar con PostgreSQL desde local y dejar una configuracion reproducible para desarrollo.

## Que queda cubierto

- Base de datos local `tfg_inesdelrio` creada y accesible.
- Servicio `postgresql-x64-18` operativo durante la validacion.
- Cadena de conexion configurada en `.env` mediante `DATABASE_URL`.
- Conexion real verificada desde la aplicacion y desde Prisma.
- Convencion inicial de nombres definida para esta fase.
- Instruccion de reseteo disponible para desarrollo.

## Implementacion realizada

### 1. Base de datos y conexion

- Se ha configurado `DATABASE_URL` en `.env`.
- La conexion apunta a `localhost:5432`.
- La base de datos activa para desarrollo es `tfg_inesdelrio`.

### 2. Verificacion desde la aplicacion

- La ruta `/health/db` ejecuta una comprobacion real contra PostgreSQL mediante Prisma.
- La respuesta actual confirma que la base de datos esta disponible.

### 3. Convencion de nombres aplicada

- Base de datos en `snake_case`: `tfg_inesdelrio`.
- Esquema PostgreSQL por defecto: `public`.
- Tablas generadas por Prisma en singular segun el modelo actual.
- Campos de aplicacion en `camelCase` dentro de Prisma.
- Claves tecnicas primarias con `id`.
- Marcas temporales homogeneas con `createdAt` y `updatedAt`.

### 4. Reseteo para desarrollo

- Se ha dejado disponible el script `npm run prisma:reset`.
- Ese script resetea la base de datos de desarrollo, reaplica migraciones y regenera el estado desde Prisma.

## Validacion realizada

- La configuracion de `.env` apunta a PostgreSQL local.
- `npx prisma migrate status` confirma acceso a `tfg_inesdelrio`.
- La comprobacion `SELECT 1` mediante Prisma se ejecuta correctamente.
- La ruta `/health/db` ha respondido `200`.

## Comprobacion manual

1. Revisar `DATABASE_URL` en `.env`.
2. Confirmar que PostgreSQL local esta en ejecucion.
3. Ejecutar `npx prisma migrate status`.
4. Arrancar la app con `npm run dev`.
5. Abrir `http://localhost:3000/health/db`.
6. Verificar el mensaje `Base de datos disponible`.

## Trazabilidad con tareas

- `RI03-01` completada: base de datos creada.
- `RI03-02` completada: credenciales locales definidas en `DATABASE_URL`.
- `RI03-03` completada: cadena de conexion configurada en `.env`.
- `RI03-04` completada: conexion verificada desde local.
- `RI03-05` completada: convencion inicial de nombres documentada.
- `RI03-06` completada: instruccion de reseteo disponible con `npm run prisma:reset`.
- `RI03-07` completada: configuracion minima documentada en este fichero.
