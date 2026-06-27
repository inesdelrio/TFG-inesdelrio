const {
  testAuthenticateUserRejectsInvalidCredentials,
  testAuthenticateUserReturnsUserWithValidCredentials,
} = require("./services/auth/authenticate-user.service.test");
const {
  testGetAdminDashboardSummaryReturnsBasicCounters,
} = require("./services/admin/get-admin-dashboard-summary.service.test");
const {
  testListAdminEntitiesFiltersPendingEntities,
  testListAdminEntitiesFiltersRejectedEntities,
  testListAdminEntitiesFiltersSuspendedEntities,
  testListAdminEntitiesFiltersVerifiedEntities,
  testListAdminEntitiesReturnsAllEntitiesWithoutFilter,
  testListAdminEntitiesTreatsInvalidFilterAsAll,
} = require("./services/admin/list-admin-entities.service.test");
const {
  testUpdateEntityValidationStatusAllowsPendingStatus,
  testUpdateEntityValidationStatusChangesStatusAndCreatesAdminLog,
  testUpdateEntityValidationStatusRejectsMissingEntity,
  testUpdateEntityValidationStatusRejectsSameStatus,
} = require("./services/admin/update-entity-validation-status.service.test");
const {
  testWithdrawEventPublicationMarksEventAsWithdrawnAndCreatesAdminLog,
} = require("./services/admin/withdraw-event-publication.service.test");
const {
  testCreateEntityRequestCreatesPendingEntityAndPromotesUserRole,
} = require("./services/entities/create-entity-request.service.test");
const {
  testAssertEntityCanPublishEventsAllowsVerifiedEntity,
  testAssertEntityCanPublishEventsRejectsPendingEntity,
  testAssertEntityCanPublishEventsRejectsSuspendedEntity,
} = require("./services/entities/entity-publication-access.service.test");
const {
  testCreateEntitySubscriptionCreatesSubscriptionWithoutDuplicates,
  testCreateEntitySubscriptionRejectsDuplicateSubscription,
} = require("./services/entities/create-entity-subscription.service.test");
const {
  testDeleteEntitySubscriptionDeletesExistingSubscription,
  testDeleteEntitySubscriptionReturnsNullWhenSubscriptionDoesNotExist,
} = require("./services/entities/delete-entity-subscription.service.test");
const {
  testGetEntitySubscriptionStatusReturnsTrueWhenSubscriptionExists,
} = require("./services/entities/get-entity-subscription-status.service.test");
const {
  testCreateEventNotificationsCreatesOneNotificationPerSubscriber,
  testCreateEventNotificationsReturnsZeroWhenThereAreNoSubscribers,
} = require("./services/notifications/create-event-notifications.service.test");
const {
  testCreateEntityRegistrationNotificationTargetsEntityOwner,
} = require("./services/notifications/create-entity-registration-notification.service.test");
const {
  testCreateEntityFollowedNotificationTargetsEntityOwner,
} = require("./services/notifications/create-entity-followed-notification.service.test");
const {
  testCreateEventFullNotificationTargetsEntityOwner,
} = require("./services/notifications/create-event-full-notification.service.test");
const {
  testListUserNotificationsReturnsOwnNotificationsOrderedByDate,
} = require("./services/notifications/list-user-notifications.service.test");
const {
  testMarkNotificationAsReadRejectsForeignNotification,
  testMarkNotificationAsReadUpdatesUnreadOwnedNotification,
  testSetNotificationReadStatusMarksOwnedNotificationAsUnread,
} = require("./services/notifications/mark-notification-as-read.service.test");
const {
  testCreateEventCreatesEventForVerifiedEntity,
  testCreateEventRejectsUnverifiedEntity,
} = require("./services/events/create-event.service.test");
const {
  testCreateEventRegistrationCreatesRegistrationWhenSlotsAvailable,
  testCreateEventRegistrationNotifiesWhenLastSlotIsFilled,
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
  testListPublishedEventsExcludesWithdrawnEventsAndSuspendedEntities,
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
  testRenderLoginFormShowsRegisteredMessageAndPrefillsEmail,
} = require("./controllers/auth/auth-session.controller.test");
const {
  testSubscribeToEntityRedirectsToDetailWithBackToEventsFlagAfterSuccess,
  testUnsubscribeFromEntityRedirectsToDetailWithBackToEventsFlagAfterSuccess,
} = require("./controllers/entities/entity-subscription.controller.test");
const {
  testCancelEventRegistrationRedirectsToDetailWithBackToEventsFlagAfterSuccess,
  testRegisterForEventRedirectsToDetailWithBackToEventsFlagAfterSuccess,
} = require("./controllers/events/event-registration.controller.test");
const {
  testRenderEventDetailHidesRegistrationsFromUnauthorizedUsers,
  testRenderEventDetailIncludesRegistrationsForOwnerEntity,
} = require("./controllers/events/event-publication.controller.test");
const {
  testRenderEventAttendeesKeepsOwnershipControl,
  testRenderEventAttendeesRedirectsOwnedEventToDetail,
} = require("./controllers/events/event-attendance.controller.test");
const {
  testUpdateVolunteerProfileUpdatesAllowedFields,
} = require("./services/volunteers/update-volunteer-profile.service.test");
const {
  testBuildCalendarDaysPlacesEventsOnTheirDate,
  testGetMonthMetaNormalizesInvalidMonthInput,
  testGetVolunteerCalendarLoadsRegisteredEventsForSelectedMonth,
} = require("./services/volunteers/get-volunteer-calendar.service.test");
const {
  testBuildEntityCalendarDaysPlacesEventsOnTheirDate,
  testGetEntityCalendarLoadsOnlyOwnedEventsForSelectedMonth,
  testGetEntityCalendarReturnsEmptyMonthWithoutEvents,
} = require("./services/entities/get-entity-calendar.service.test");
const {
  testGetEntityHistoryRejectsMissingEntity,
  testGetEntityHistorySeparatesFutureAndPastEvents,
} = require("./services/entities/get-entity-history.service.test");
const {
  testGetVolunteerHistorySeparatesFutureAndPastRegistrations,
} = require("./services/volunteers/get-volunteer-history.service.test");
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
const {
  testGetRedirectPathForRoleSendsAdminToProfile,
} = require("./utils/auth-redirect.test");
const {
  testResolveAdminSeedConfigRequiresAdminEmailAndPassword,
  testResolveAdminSeedConfigReturnsEnvironmentValues,
} = require("./scripts/seed-admin-config.test");
const {
  testValidateAccountDeletionRequiresExactConfirmation,
} = require("./validators/accounts/account-deletion.validator.test");
const {
  testDeleteVolunteerAccountAnonymizesAndRemovesFutureRelations,
  testDeleteVolunteerAccountRejectsWrongRole,
} = require("./services/accounts/delete-volunteer-account.service.test");
const {
  testDeleteEntityAccountAnonymizesAndCleansFutureData,
  testDeleteEntityAccountRejectsMissingEntity,
} = require("./services/accounts/delete-entity-account.service.test");
const {
  testRenderAdminEntitiesListPassesStatusFilterToService,
  testRenderEntityReviewDetailRendersExistingEntity,
  testRenderEntityReviewDetailShows404ForMissingEntity,
  testUpdateEntityStatusRedirectsToDetailAfterChange,
} = require("./controllers/admin/entity-moderation.controller.test");
const {
  testRenderAdminProfileShowsCurrentAdminUser,
} = require("./controllers/admin/admin-profile.controller.test");
const {
  testRenderEntityHistoryLoadsHistoryForCurrentEntityUser,
} = require("./controllers/entities/entity-history.controller.test");
const {
  testDeleteVolunteerAccountActionDestroysSessionAndRedirects,
  testDeleteVolunteerAccountActionRequiresConfirmation,
  testRenderVolunteerAccountDeletionShowsConfirmation,
} = require("./controllers/accounts/account-deletion.controller.test");
const {
  testRequireAuthRefreshesActiveUserFromDatabase,
  testRequireAuthRejectsAnonymizedUserFromStaleSession,
  testRequireRoleRedirectsNonAdminUsers,
  testRequireRoleRedirectsUnauthenticatedUsers,
} = require("./middlewares/auth.middleware.test");
const {
  testDeleteNotificationActionRedirectsAfterDeletingOwnNotification,
  testOpenNotificationEventUsesStoredEventAndRedirects,
  testRenderNotificationDetailShowsStoredActorOnly,
} = require("./controllers/notifications/notification.controller.test");
const {
  testDeleteNotificationDeletesOwnedNotification,
  testDeleteNotificationRejectsForeignNotification,
  testDeleteNotificationRemovesItFromSubsequentListing,
} = require("./services/notifications/delete-notification.service.test");
const {
  testGetNotificationDetailRejectsForeignNotification,
  testGetNotificationDetailReturnsOnlyStoredActorAndEvent,
} = require("./services/notifications/get-notification-detail.service.test");

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
    "registerForEvent vuelve al detalle y prepara vuelta al listado",
    testRegisterForEventRedirectsToDetailWithBackToEventsFlagAfterSuccess,
  );
  await runTest(
    "cancelEventRegistration vuelve al detalle y prepara vuelta al listado",
    testCancelEventRegistrationRedirectsToDetailWithBackToEventsFlagAfterSuccess,
  );
  await runTest(
    "subscribeToEntity vuelve al detalle y prepara vuelta al listado",
    testSubscribeToEntityRedirectsToDetailWithBackToEventsFlagAfterSuccess,
  );
  await runTest(
    "unsubscribeFromEntity vuelve al detalle y prepara vuelta al listado",
    testUnsubscribeFromEntityRedirectsToDetailWithBackToEventsFlagAfterSuccess,
  );
  await runTest(
    "renderLoginForm muestra cuenta creada y prerrellena email tras registro",
    testRenderLoginFormShowsRegisteredMessageAndPrefillsEmail,
  );
  await runTest(
    "getRedirectPathForRole envia al admin a su perfil",
    testGetRedirectPathForRoleSendsAdminToProfile,
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
    "deleteEntitySubscription elimina una suscripcion existente",
    testDeleteEntitySubscriptionDeletesExistingSubscription,
  );
  await runTest(
    "deleteEntitySubscription no falla si no existe suscripcion",
    testDeleteEntitySubscriptionReturnsNullWhenSubscriptionDoesNotExist,
  );
  await runTest(
    "getEntitySubscriptionStatus detecta suscripcion existente",
    testGetEntitySubscriptionStatusReturnsTrueWhenSubscriptionExists,
  );
  await runTest(
    "createEventNotifications crea una notificacion por cada voluntario suscrito",
    testCreateEventNotificationsCreatesOneNotificationPerSubscriber,
  );
  await runTest(
    "createEventNotifications no crea registros si no hay suscriptores",
    testCreateEventNotificationsReturnsZeroWhenThereAreNoSubscribers,
  );
  await runTest(
    "createEntityRegistrationNotification notifica a la entidad propietaria",
    testCreateEntityRegistrationNotificationTargetsEntityOwner,
  );
  await runTest(
    "createEntityFollowedNotification notifica a la entidad seguida",
    testCreateEntityFollowedNotificationTargetsEntityOwner,
  );
  await runTest(
    "createEventFullNotification notifica al completar las plazas",
    testCreateEventFullNotificationTargetsEntityOwner,
  );
  await runTest(
    "listUserNotifications devuelve avisos propios ordenados por fecha",
    testListUserNotificationsReturnsOwnNotificationsOrderedByDate,
  );
  await runTest(
    "markNotificationAsRead marca como leida una notificacion propia",
    testMarkNotificationAsReadUpdatesUnreadOwnedNotification,
  );
  await runTest(
    "markNotificationAsRead bloquea notificaciones ajenas",
    testMarkNotificationAsReadRejectsForeignNotification,
  );
  await runTest(
    "setNotificationReadStatus marca una notificacion como no leida",
    testSetNotificationReadStatusMarksOwnedNotificationAsUnread,
  );
  await runTest(
    "getAdminDashboardSummary devuelve metricas basicas del panel admin",
    testGetAdminDashboardSummaryReturnsBasicCounters,
  );
  await runTest(
    "listAdminEntities devuelve todas las entidades sin filtro",
    testListAdminEntitiesReturnsAllEntitiesWithoutFilter,
  );
  await runTest(
    "listAdminEntities filtra entidades pendientes",
    testListAdminEntitiesFiltersPendingEntities,
  );
  await runTest(
    "listAdminEntities filtra entidades verificadas",
    testListAdminEntitiesFiltersVerifiedEntities,
  );
  await runTest(
    "listAdminEntities filtra entidades rechazadas",
    testListAdminEntitiesFiltersRejectedEntities,
  );
  await runTest(
    "listAdminEntities filtra entidades suspendidas",
    testListAdminEntitiesFiltersSuspendedEntities,
  );
  await runTest(
    "listAdminEntities trata filtros invalidos como todas",
    testListAdminEntitiesTreatsInvalidFilterAsAll,
  );
  await runTest(
    "renderAdminEntitiesList pasa el filtro de estado al servicio",
    testRenderAdminEntitiesListPassesStatusFilterToService,
  );
  await runTest(
    "renderAdminProfile muestra el perfil del administrador actual",
    testRenderAdminProfileShowsCurrentAdminUser,
  );
  await runTest(
    "renderEntityReviewDetail muestra el detalle de una entidad existente",
    testRenderEntityReviewDetailRendersExistingEntity,
  );
  await runTest(
    "renderEntityReviewDetail muestra 404 para una entidad inexistente",
    testRenderEntityReviewDetailShows404ForMissingEntity,
  );
  await runTest(
    "updateEntityStatus vuelve al detalle tras cambiar estado",
    testUpdateEntityStatusRedirectsToDetailAfterChange,
  );
  await runTest(
    "updateEntityValidationStatus cambia el estado y registra la accion administrativa",
    testUpdateEntityValidationStatusChangesStatusAndCreatesAdminLog,
  );
  await runTest(
    "updateEntityValidationStatus permite devolver una entidad a pendiente",
    testUpdateEntityValidationStatusAllowsPendingStatus,
  );
  await runTest(
    "updateEntityValidationStatus rechaza una entidad inexistente",
    testUpdateEntityValidationStatusRejectsMissingEntity,
  );
  await runTest(
    "updateEntityValidationStatus rechaza cambiar al mismo estado",
    testUpdateEntityValidationStatusRejectsSameStatus,
  );
  await runTest(
    "withdrawEventPublication retira un evento y registra la accion administrativa",
    testWithdrawEventPublicationMarksEventAsWithdrawnAndCreatesAdminLog,
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
    "assertEntityCanPublishEvents bloquea una entidad suspendida",
    testAssertEntityCanPublishEventsRejectsSuspendedEntity,
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
    "createEventRegistration avisa cuando se ocupa la ultima plaza",
    testCreateEventRegistrationNotifiesWhenLastSlotIsFilled,
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
    "listPublishedEvents excluye eventos retirados y entidades suspendidas",
    testListPublishedEventsExcludesWithdrawnEventsAndSuspendedEntities,
  );
  await runTest(
    "getEventDetail devuelve el evento con datos de la entidad organizadora",
    testGetEventDetailReturnsEventWithOrganizerData,
  );
  await runTest(
    "renderEventDetail incluye inscritos para la entidad propietaria",
    testRenderEventDetailIncludesRegistrationsForOwnerEntity,
  );
  await runTest(
    "renderEventDetail oculta inscritos a usuarios no autorizados",
    testRenderEventDetailHidesRegistrationsFromUnauthorizedUsers,
  );
  await runTest(
    "renderEventAttendees redirige el evento propio a su detalle",
    testRenderEventAttendeesRedirectsOwnedEventToDetail,
  );
  await runTest(
    "renderEventAttendees mantiene el control de propiedad",
    testRenderEventAttendeesKeepsOwnershipControl,
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
    "getVolunteerCalendar carga los eventos inscritos del mes seleccionado",
    testGetVolunteerCalendarLoadsRegisteredEventsForSelectedMonth,
  );
  await runTest(
    "getEntityCalendar carga solo eventos propios del mes seleccionado",
    testGetEntityCalendarLoadsOnlyOwnedEventsForSelectedMonth,
  );
  await runTest(
    "buildEntityCalendarDays coloca eventos propios en su fecha",
    testBuildEntityCalendarDaysPlacesEventsOnTheirDate,
  );
  await runTest(
    "getEntityCalendar devuelve un mes vacio sin eventos",
    testGetEntityCalendarReturnsEmptyMonthWithoutEvents,
  );
  await runTest(
    "getEntityHistory separa eventos propios futuros y pasados",
    testGetEntityHistorySeparatesFutureAndPastEvents,
  );
  await runTest(
    "getEntityHistory rechaza una entidad inexistente",
    testGetEntityHistoryRejectsMissingEntity,
  );
  await runTest(
    "renderEntityHistory carga el historial del usuario entidad actual",
    testRenderEntityHistoryLoadsHistoryForCurrentEntityUser,
  );
  await runTest(
    "getVolunteerHistory separa inscripciones futuras y pasadas",
    testGetVolunteerHistorySeparatesFutureAndPastRegistrations,
  );
  await runTest(
    "buildCalendarDays coloca los eventos en su fecha correspondiente",
    testBuildCalendarDaysPlacesEventsOnTheirDate,
  );
  await runTest(
    "getMonthMeta normaliza meses invalidos",
    testGetMonthMetaNormalizesInvalidMonthInput,
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
  await runTest(
    "resolveAdminSeedConfig exige ADMIN_EMAIL y ADMIN_PASSWORD",
    testResolveAdminSeedConfigRequiresAdminEmailAndPassword,
  );
  await runTest(
    "resolveAdminSeedConfig devuelve las credenciales desde variables de entorno",
    testResolveAdminSeedConfigReturnsEnvironmentValues,
  );
  await runTest(
    "validateAccountDeletion exige escribir ELIMINAR",
    testValidateAccountDeletionRequiresExactConfirmation,
  );
  await runTest(
    "deleteVolunteerAccount anonimiza y elimina relaciones futuras",
    testDeleteVolunteerAccountAnonymizesAndRemovesFutureRelations,
  );
  await runTest(
    "deleteVolunteerAccount rechaza cuentas que no son voluntarias",
    testDeleteVolunteerAccountRejectsWrongRole,
  );
  await runTest(
    "deleteEntityAccount anonimiza y limpia datos futuros",
    testDeleteEntityAccountAnonymizesAndCleansFutureData,
  );
  await runTest(
    "deleteEntityAccount rechaza una entidad inexistente",
    testDeleteEntityAccountRejectsMissingEntity,
  );
  await runTest(
    "renderVolunteerAccountDeletion muestra la confirmacion",
    testRenderVolunteerAccountDeletionShowsConfirmation,
  );
  await runTest(
    "deleteVolunteerAccountAction exige confirmacion",
    testDeleteVolunteerAccountActionRequiresConfirmation,
  );
  await runTest(
    "deleteVolunteerAccountAction destruye la sesion y redirige",
    testDeleteVolunteerAccountActionDestroysSessionAndRedirects,
  );
  await runTest(
    "requireAuth refresca el usuario activo desde base de datos",
    testRequireAuthRefreshesActiveUserFromDatabase,
  );
  await runTest(
    "requireAuth bloquea sesiones antiguas de usuarios anonimizados",
    testRequireAuthRejectsAnonymizedUserFromStaleSession,
  );
  await runTest(
    "requireRole redirige usuarios sin sesion",
    testRequireRoleRedirectsUnauthenticatedUsers,
  );
  await runTest(
    "requireRole redirige usuarios que no son admin",
    testRequireRoleRedirectsNonAdminUsers,
  );
  await runTest(
    "openNotificationEvent usa el evento guardado y abre la actividad",
    testOpenNotificationEventUsesStoredEventAndRedirects,
  );
  await runTest(
    "getNotificationDetail devuelve solo el actor y evento guardados",
    testGetNotificationDetailReturnsOnlyStoredActorAndEvent,
  );
  await runTest(
    "getNotificationDetail bloquea notificaciones ajenas",
    testGetNotificationDetailRejectsForeignNotification,
  );
  await runTest(
    "renderNotificationDetail muestra solo el actor almacenado",
    testRenderNotificationDetailShowsStoredActorOnly,
  );
  await runTest(
    "deleteNotification elimina una notificacion propia",
    testDeleteNotificationDeletesOwnedNotification,
  );
  await runTest(
    "deleteNotification bloquea una notificacion ajena",
    testDeleteNotificationRejectsForeignNotification,
  );
  await runTest(
    "deleteNotification elimina la notificacion del listado posterior",
    testDeleteNotificationRemovesItFromSubsequentListing,
  );
  await runTest(
    "deleteNotificationAction elimina y redirige al listado",
    testDeleteNotificationActionRedirectsAfterDeletingOwnNotification,
  );
}

main();
