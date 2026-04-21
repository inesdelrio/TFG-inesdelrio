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
  testCreateEntitySubscriptionCreatesSubscriptionWithoutDuplicates,
  testCreateEntitySubscriptionRejectsDuplicateSubscription,
} = require("./services/entities/create-entity-subscription.service.test");
const {
  testGetEntitySubscriptionStatusReturnsTrueWhenSubscriptionExists,
} = require("./services/entities/get-entity-subscription-status.service.test");
const {
  testCreateEventCreatesEventForVerifiedEntity,
  testCreateEventRejectsUnverifiedEntity,
} = require("./services/events/create-event.service.test");
const {
  testCreateEventRegistrationCreatesRegistrationWhenSlotsAvailable,
  testCreateEventRegistrationRejectsDuplicateRegistration,
  testCreateEventRegistrationRejectsWhenEventIsFull,
} = require("./services/events/create-event-registration.service.test");
const {
  testDeleteEventRegistrationDeletesOwnedRegistration,
  testDeleteEventRegistrationRejectsWhenRegistrationDoesNotExist,
} = require("./services/events/delete-event-registration.service.test");
const {
  testDeleteOwnedEventDeletesEventForOwnerEntity,
  testDeleteOwnedEventRejectsEventFromAnotherEntity,
} = require("./services/events/delete-owned-event.service.test");
const {
  testGetEventRegistrationStatusReturnsTrueWhenRegistrationExists,
} = require("./services/events/get-event-registration-status.service.test");
const {
  testGetEventDetailReturnsEventWithOrganizerData,
} = require("./services/events/get-event-detail.service.test");
const {
  testListOwnedEventRegistrationsPropagatesOwnershipErrors,
  testListOwnedEventRegistrationsReturnsVolunteerDataForOwnedEvent,
} = require("./services/events/list-owned-event-registrations.service.test");
const {
  testListPublishedEventsAppliesCombinedFilters,
  testListPublishedEventsReturnsOrderedPaginatedActiveEvents,
} = require("./services/events/list-published-events.service.test");
const {
  testUpdateEntityProfileUpdatesAllowedFields,
} = require("./services/entities/update-entity-profile.service.test");
const {
  testUpdateOwnedEventUpdatesEventForOwnerEntity,
} = require("./services/events/update-owned-event.service.test");
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
  testValidateEntityProfileInputRejectsInvalidData,
} = require("./validators/entities/entity-profile.validator.test");
const {
  testValidateEventFiltersSanitizesInvalidDateAndText,
} = require("./validators/events/event-filters.validator.test");
const {
  testValidateEventInputRejectsInvalidData,
} = require("./validators/events/event.validator.test");
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
    "createEntitySubscription crea una suscripcion sin duplicados",
    testCreateEntitySubscriptionCreatesSubscriptionWithoutDuplicates,
  );
  await runTest(
    "createEntitySubscription bloquea una suscripcion duplicada",
    testCreateEntitySubscriptionRejectsDuplicateSubscription,
  );
  await runTest(
    "getEntitySubscriptionStatus detecta suscripcion existente",
    testGetEntitySubscriptionStatusReturnsTrueWhenSubscriptionExists,
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
    "createEvent crea un evento para una entidad verificada",
    testCreateEventCreatesEventForVerifiedEntity,
  );
  await runTest(
    "createEvent bloquea una entidad no verificada",
    testCreateEventRejectsUnverifiedEntity,
  );
  await runTest(
    "createEventRegistration crea una inscripcion con plazas disponibles",
    testCreateEventRegistrationCreatesRegistrationWhenSlotsAvailable,
  );
  await runTest(
    "createEventRegistration bloquea una inscripcion duplicada",
    testCreateEventRegistrationRejectsDuplicateRegistration,
  );
  await runTest(
    "createEventRegistration bloquea la inscripcion cuando no hay plazas",
    testCreateEventRegistrationRejectsWhenEventIsFull,
  );
  await runTest(
    "deleteEventRegistration elimina una inscripcion existente",
    testDeleteEventRegistrationDeletesOwnedRegistration,
  );
  await runTest(
    "deleteEventRegistration informa si no existia inscripcion",
    testDeleteEventRegistrationRejectsWhenRegistrationDoesNotExist,
  );
  await runTest(
    "updateOwnedEvent actualiza un evento propio",
    testUpdateOwnedEventUpdatesEventForOwnerEntity,
  );
  await runTest(
    "deleteOwnedEvent elimina un evento propio",
    testDeleteOwnedEventDeletesEventForOwnerEntity,
  );
  await runTest(
    "deleteOwnedEvent bloquea la eliminacion de un evento ajeno",
    testDeleteOwnedEventRejectsEventFromAnotherEntity,
  );
  await runTest(
    "listPublishedEvents devuelve eventos activos con orden y paginacion",
    testListPublishedEventsReturnsOrderedPaginatedActiveEvents,
  );
  await runTest(
    "listPublishedEvents aplica filtros combinados de fecha, entidad y ciudad",
    testListPublishedEventsAppliesCombinedFilters,
  );
  await runTest(
    "getEventDetail devuelve el evento con datos de la entidad organizadora",
    testGetEventDetailReturnsEventWithOrganizerData,
  );
  await runTest(
    "listOwnedEventRegistrations devuelve los inscritos con datos basicos del voluntario",
    testListOwnedEventRegistrationsReturnsVolunteerDataForOwnedEvent,
  );
  await runTest(
    "listOwnedEventRegistrations mantiene el control de propiedad del evento",
    testListOwnedEventRegistrationsPropagatesOwnershipErrors,
  );
  await runTest(
    "getEventRegistrationStatus detecta inscripcion existente",
    testGetEventRegistrationStatusReturnsTrueWhenRegistrationExists,
  );
  await runTest(
    "updateEntityProfile actualiza los datos institucionales permitidos",
    testUpdateEntityProfileUpdatesAllowedFields,
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
    "validateEntityProfileInput detecta datos invalidos en el perfil de entidad",
    testValidateEntityProfileInputRejectsInvalidData,
  );
  await runTest(
    "validateEventInput detecta datos invalidos en la publicacion de eventos",
    testValidateEventInputRejectsInvalidData,
  );
  await runTest(
    "validateEventFilters normaliza filtros de busqueda invalidos",
    testValidateEventFiltersSanitizesInvalidDateAndText,
  );
  await runTest(
    "validateVolunteerProfileInput detecta datos invalidos en el perfil",
    testValidateVolunteerProfileInputRejectsInvalidData,
  );
}

main();
