const {
  testAuthenticateUserRejectsInvalidCredentials,
  testAuthenticateUserReturnsUserWithValidCredentials,
} = require("./services/auth/authenticate-user.service.test");
const {
  testUpdateEntityValidationStatusChangesStatusAndCreatesAdminLog,
} = require("./services/admin/update-entity-validation-status.service.test");
const {
  testCreateEntityRequestCreatesPendingEntityAndPromotesUserRole,
} = require("./services/entities/create-entity-request.service.test");
const {
  testAssertEntityCanPublishEventsAllowsVerifiedEntity,
  testAssertEntityCanPublishEventsRejectsPendingEntity,
} = require("./services/entities/entity-publication-access.service.test");
const {
  testRegisterVolunteerCreatesVolunteerUser,
} = require("./services/auth/register-volunteer.service.test");
const {
  testDestroyUserSessionDestroysSessionWithoutError,
} = require("./services/auth/session.service.test");
const {
  testUpdateVolunteerProfileUpdatesAllowedFields,
} = require("./services/volunteers/update-volunteer-profile.service.test");
const {
  testValidateLoginInputRejectsInvalidData,
} = require("./validators/auth/login.validator.test");
const {
  testValidateEntityRegistrationInputRejectsInvalidData,
} = require("./validators/entities/entity-registration.validator.test");
const {
  testValidateVolunteerProfileInputRejectsInvalidData,
} = require("./validators/volunteers/volunteer-profile.validator.test");
const {
  testValidateVolunteerRegistrationInputRejectsInvalidData,
} = require("./validators/auth/register-volunteer.validator.test");

async function runTest(name, fn) {
  try {
    await fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    console.error(error);
    process.exitCode = 1;
  }
}

async function main() {
  await runTest(
    "registerVolunteer crea un usuario voluntario con password hasheada",
    testRegisterVolunteerCreatesVolunteerUser,
  );
  await runTest(
    "authenticateUser devuelve el usuario con credenciales validas",
    testAuthenticateUserReturnsUserWithValidCredentials,
  );
  await runTest(
    "authenticateUser rechaza credenciales invalidas",
    testAuthenticateUserRejectsInvalidCredentials,
  );
  await runTest(
    "destroyUserSession destruye la sesion sin error",
    testDestroyUserSessionDestroysSessionWithoutError,
  );
  await runTest(
    "createEntityRequest crea una entidad pendiente y promociona el rol del usuario",
    testCreateEntityRequestCreatesPendingEntityAndPromotesUserRole,
  );
  await runTest(
    "updateEntityValidationStatus cambia el estado y registra la accion administrativa",
    testUpdateEntityValidationStatusChangesStatusAndCreatesAdminLog,
  );
  await runTest(
    "assertEntityCanPublishEvents permite una entidad verificada",
    testAssertEntityCanPublishEventsAllowsVerifiedEntity,
  );
  await runTest(
    "assertEntityCanPublishEvents bloquea una entidad pendiente",
    testAssertEntityCanPublishEventsRejectsPendingEntity,
  );
  await runTest(
    "updateVolunteerProfile actualiza los datos personales permitidos",
    testUpdateVolunteerProfileUpdatesAllowedFields,
  );
  await runTest(
    "validateVolunteerRegistrationInput detecta datos invalidos en el registro",
    testValidateVolunteerRegistrationInputRejectsInvalidData,
  );
  await runTest(
    "validateLoginInput detecta datos invalidos en el login",
    testValidateLoginInputRejectsInvalidData,
  );
  await runTest(
    "validateEntityRegistrationInput detecta datos invalidos en el alta de entidad",
    testValidateEntityRegistrationInputRejectsInvalidData,
  );
  await runTest(
    "validateVolunteerProfileInput detecta datos invalidos en el perfil",
    testValidateVolunteerProfileInputRejectsInvalidData,
  );
}

main();
