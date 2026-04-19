# PRE02 - Configuracion inicial de PostgreSQL y Prisma

## Estado del requisito

Cerrado definitivamente y validado en entorno local.

## Objetivo

Configurar la base tecnica de la aplicacion para dejar Express, EJS, PostgreSQL y Prisma funcionando de forma integrada en entorno local.

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
- La ruta ya responde correctamente indicando que la base de datos esta disponible.
- La aplicacion ya conecta correctamente con PostgreSQL mediante Prisma.

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

- Prisma CLI instalada en el proyecto.
- `schema.prisma` creado y conectado a `DATABASE_URL`.
- `prisma validate` ejecutado correctamente.
- Cliente Prisma preparado en el codigo.
- PostgreSQL local instalado y operativo.
- Servicio `postgresql-x64-18` en ejecucion.
- Base de datos `tfg_inesdelrio` creada en local.
- `npx prisma migrate status` confirma que el esquema esta al dia.
- La migracion inicial `20260418123000_init` ya esta aplicada.
- La aplicacion conecta correctamente con PostgreSQL mediante Prisma.
- La ruta `/health/db` responde correctamente con estado disponible.

## Comprobacion manual

1. Revisar `DATABASE_URL` en `.env`.
2. Ejecutar `npm run dev`.
3. Abrir `http://localhost:3000/health/db`.
4. Verificar que aparece el mensaje `Base de datos disponible`.
5. Ejecutar `npx prisma migrate status` y comprobar que indica `Database schema is up to date!`.

## Evidencia de cierre

- `prisma validate` ejecutado correctamente sobre el esquema actual.
- `npx prisma migrate status` confirma que la migracion inicial esta aplicada y que la base esta al dia.
- La comprobacion real de `SELECT 1` mediante Prisma se ha ejecutado correctamente contra PostgreSQL.
- La ruta `/health/db` ha respondido `200` mostrando que la base de datos esta disponible.

## Observaciones

- PRE02 queda cerrado con PostgreSQL operativo, Prisma conectado y base de datos actualizada con las migraciones aplicadas.
