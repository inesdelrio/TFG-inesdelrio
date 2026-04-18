# TFG Voluntariado

Base tecnica inicial de una aplicacion web de voluntariado con Node.js, Express, EJS, PostgreSQL y Prisma.

## Estado actual

Actualmente estan cerrados los requisitos:

- PRE01 - Preparacion del entorno de desarrollo
- PRE02 - Inicializacion base de Node + Express + EJS y preparacion de Prisma/PostgreSQL

## Stack

- Node.js
- Express
- EJS
- PostgreSQL
- Prisma

## Puesta en marcha

1. Instalar dependencias:

```bash
npm install
```

2. Revisar variables de entorno en `.env`.

3. Arrancar en desarrollo:

```bash
npm run dev
```

4. Abrir `http://localhost:3000`.

## Scripts disponibles

```bash
npm run dev
npm run start
npm run prisma:generate
npm run prisma:migrate
npm run prisma:validate
```

## Documentacion

- [PRE01](docs/requisitos/PRE01.md)
- [PRE02](docs/requisitos/PRE02.md)
- [Estructura inicial](docs/arquitectura/estructura-inicial.md)
