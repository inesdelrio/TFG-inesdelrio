.PHONY: install db seed seed-admin dev start test check run prisma-validate migrate-status migrate-dev

install:
	npm install

db:
	npm run prisma:validate
	npm run prisma:generate
	npm run prisma:migrate

seed:
	npm run seed:admin

seed-admin:
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

prisma-validate:
	npm run prisma:validate

migrate-status:
	npx prisma migrate status

migrate-dev:
	npm run prisma:migrate

run: install db dev
