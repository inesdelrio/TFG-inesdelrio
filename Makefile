.PHONY: install db seed dev start test check run

install:
	npm install

db:
	npm run prisma:validate
	npm run prisma:generate
	npm run prisma:migrate

seed:
	npm run seed:admin

dev:
	npm run dev

start:
	npm start

test:
	npm test

check:
	npm test
	npm run prisma:validate

run: install db dev
