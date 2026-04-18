# PRE02 - Inicializacion de la aplicacion Node + Express + EJS y base Prisma/PostgreSQL

## Estado del requisito

Implementado en el repositorio con validacion parcial por entorno. La parte de PostgreSQL local no ha podido validarse completamente porque la maquina no dispone de `psql` ni de un servicio PostgreSQL accesible durante esta ejecucion.

## Que ya estaba hecho antes de esta implementacion

- Estaba creada la carpeta `prisma/`.
- Estaba creada la carpeta `prisma/migrations/`.
- Estaban instaladas en el proyecto las dependencias de Prisma porque se han incluido al completar PRE01 dentro del mismo trabajo.

## Que se ha hecho

### 1. Prisma preparado para PostgreSQL

- Se ha creado `prisma/schema.prisma`.
- Se ha definido `postgresql` como provider.
- Se ha definido `DATABASE_URL` mediante variable de entorno.
- Se ha creado el modelo base `SystemCheck` para validar la integracion inicial.
- Se ha generado una migracion inicial en `prisma/migrations/20260418123000_init/migration.sql`.

### 2. Cliente Prisma reutilizable

- Se ha creado `src/config/prisma.js`.
- El cliente queda centralizado para reutilizarlo en controladores y servicios.

### 3. Conexion preparada desde la aplicacion

- Se ha creado la ruta `/health/db`.
- Esa ruta intenta ejecutar `SELECT 1` mediante Prisma.
- Si la base de datos esta disponible, devuelve la pagina con estado correcto.
- Si no lo esta, devuelve un mensaje controlado y no rompe la aplicacion.

### 4. Scripts utiles para desarrollo

Se han añadido:

- `npm run prisma:generate`
- `npm run prisma:migrate`
- `npm run prisma:validate`

## Como se ha hecho

1. Se ha intentado inicializar Prisma con la CLI.
2. La inicializacion automatica no pudo completarse porque ya existia la carpeta `prisma/`.
3. Se ha creado manualmente el `schema.prisma` con la estructura equivalente necesaria.
4. Se ha preparado el cliente Prisma y una comprobacion de conexion integrada en la app.

## Validacion realizada

### Validado

- Prisma CLI instalada en el proyecto.
- `schema.prisma` creado y conectado a `DATABASE_URL`.
- `prisma validate` ejecutado correctamente.
- `prisma generate` ejecutado correctamente.
- Cliente Prisma preparado en el codigo.
- Migracion inicial SQL generada desde el schema.
- Ruta de comprobacion de base de datos integrada.

### No validado completamente por entorno

- Instalacion local de PostgreSQL.
- Creacion real de la base de datos local.
- Ejecucion real de `prisma migrate dev`.
- Conexion satisfactoria contra una base de datos PostgreSQL real.

## Comprobacion manual

1. Instalar PostgreSQL localmente si aun no esta disponible.
2. Crear la base de datos `tfg_inesdelrio`.
3. Ajustar `DATABASE_URL` en `.env` si usuario, password, host o puerto cambian.
4. Ejecutar `npm run prisma:generate`.
5. Ejecutar `npm run prisma:migrate -- --name init`.
6. Ejecutar `npm run dev`.
7. Abrir `http://localhost:3000/health/db`.
8. Verificar que aparece el mensaje de conexion correcta.

## Evidencia de bloqueo de entorno

Durante la validacion se ha comprobado que:

- `psql` no esta disponible en el sistema.
- no se ha detectado un servicio PostgreSQL accesible desde el entorno actual.
- la ruta `/health/db` responde de forma controlada con error 503 cuando no existe conexion real a PostgreSQL.

## Observaciones

- PRE02 queda preparado en codigo y configuracion.
- Para marcarlo como validado al 100 % en local solo falta disponer de PostgreSQL operativo y ejecutar la primera migracion real.
