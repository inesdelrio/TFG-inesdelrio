# PRE01 - Preparacion del entorno de desarrollo

## Estado del requisito

Completado en el repositorio. La unica parte que no puede certificarse solo desde el codigo es la instalacion global de herramientas de sistema fuera del repo.

## Que ya estaba hecho antes de esta implementacion

- Existia el repositorio Git.
- Existia un `README.md` minimo.
- Ya estaba creada la estructura inicial de carpetas del proyecto:
  - `src/`
  - `public/`
  - `tests/`
  - `docs/`
  - `prisma/`
- Las carpetas vacias estaban preservadas con ficheros `.gitkeep`.
- Estaban disponibles `Node.js v20.18.0` y `npm 10.8.2` en el entorno.

## Que se ha hecho

### 1. Inicializacion del proyecto Node.js

- Se ha ejecutado `npm init -y`.
- Se ha generado `package.json`.
- Se ha redefinido `main` para usar `app.js`.

### 2. Instalacion de dependencias base

Se han instalado:

- `express`
- `ejs`
- `dotenv`
- `express-session`
- `bcrypt`
- `pg`
- `prisma`
- `@prisma/client`

Como dependencia de desarrollo se ha instalado:

- `nodemon`

### 3. Configuracion de scripts npm

Se han creado los scripts:

- `npm run dev`
- `npm run start`
- `npm run prisma:generate`
- `npm run prisma:migrate`
- `npm run prisma:validate`

### 4. Arranque minimo de Express

Se han creado:

- `app.js` como punto de entrada
- `src/app.js` como configuracion de Express
- `src/routes/index.js` para las rutas base
- `src/middlewares/error.middleware.js` para 404 y 500

### 5. Configuracion de EJS y recursos estaticos

Se ha configurado:

- EJS como motor de vistas
- `src/views/` como directorio de plantillas
- `public/` como directorio de estaticos

Se han creado las vistas minimas:

- pagina de inicio
- error 404
- error 500

### 6. Gitignore y variables de entorno

Se han creado:

- `.gitignore`
- `.env.example`
- `.env`

## Como se ha hecho

1. Se ha auditado el estado real del repositorio para no duplicar trabajo.
2. Se ha aprovechado la estructura de carpetas ya creada.
3. Se ha inicializado npm y se han instalado dependencias reales.
4. Se ha añadido una app Express minima con EJS y recursos estaticos.
5. Se han creado ficheros de configuracion reproducibles para el arranque local.

## Validacion realizada

- El proyecto dispone ya de `package.json` y `package-lock.json`.
- La app puede arrancar con `npm run start`.
- La ruta `/` renderiza una vista EJS.
- Los estaticos se sirven desde `public/`.

## Comprobacion manual

1. Ejecutar `npm install`.
2. Ejecutar `npm run dev`.
3. Abrir `http://localhost:3000`.
4. Verificar que carga la portada inicial.
5. Abrir `http://localhost:3000/health`.
6. Verificar que devuelve un JSON de estado.

## Observaciones

- La instalacion de Node.js y npm ya estaba resuelta antes de esta intervencion.
- La estructura inicial de carpetas ya estaba creada antes de empezar PRE01.
