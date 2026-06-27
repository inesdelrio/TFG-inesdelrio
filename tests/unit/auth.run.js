const {
  testAuthenticateUserRejectsInvalidCredentials,
  testAuthenticateUserReturnsUserWithValidCredentials,
} = require("./services/auth/authenticate-user.service.test");
const {
  testGetAdminDashboardSummaryReturnsBasicCounters,
} = require("./services/admin/get-admin-dashboard-summary.service.test");
const {
  testSearchMadridAddressesActionReturnsEmptyForMissingQuery,
  testSearchMadridAddressesActionReturnsMockedSuggestions,
} = require("./controllers/maps/geocoding.controller.test");
const {
  testResolveSessionSecretRequiresSecretInProduction,
  testResolveSessionSecretReturnsConfiguredSecret,
  testResolveSessionSecretUsesDevelopmentFallback,
} = require("./config/session-config.test");
const {
  testRenderAdminMapRendersMapView,
  testRenderEntityMapRendersMapView,
  testRenderVolunteerEventMapRendersMapView,
} = require("./controllers/maps/map.controller.test");
const {
  testAdminMapRouteIsProtected,
  testEntityMapRouteIsProtected,
  testVolunteerMapRouteIsProtected,
} = require("./routes/map-routes.test");
const {
  testValidateMadridLocationAcceptsCoordinatesInsideMadrid,
  testValidateMadridLocationAcceptsRequiredAddressWhenCoordinatesAreValid,
  testValidateMadridLocationRejectsCoordinatesOutsideMadrid,
  testValidateMadridLocationRejectsMissingAddressWhenRequired,
  testValidateMadridLocationRejectsMissingLatitude,
  testValidateMadridLocationRejectsMissingLongitude,
  testValidateMadridLocationRejectsNonNumericValues,
} = require("./services/maps/validate-madrid-location.service.test");
const {
  testSearchMadridAddressesFiltersResultsOutsideMadrid,
  testSearchMadridAddressesMapsValidMadridResults,
  testSearchMadridAddressesReturnsEmptyForShortQuery,
} = require("./services/maps/search-madrid-addresses.service.test");
const {
  testListAdminMapMarkersIncludesEventsAndEntitiesWithCoordinates,
} = require("./services/maps/list-admin-map-markers.service.test");
const {
  testListEntityMapMarkersIncludesOwnOrganizationAndEvents,
  testListEntityMapMarkersRejectsMissingEntity,
} = require("./services/maps/list-entity-map-markers.service.test");
const {
  testListVolunteerEventMapMarkersExcludesEventsWithoutCoordinates,
  testListVolunteerEventMapMarkersReturnsVisibleFutureEventsWithCoordinates,
} = require("./services/maps/list-volunteer-event-map-markers.service.test");
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
  testCreateEntityRegistrationCreatesEntityUserAndPendingEntity,
  testCreateEntityRegistrationRejectsDuplicateEmail,
  testCreateEntityRegistrationRejectsDuplicateTaxId,
} = require("./services/entities/create-entity-registration.service.test");
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
  testRenderLoginFormShowsEntityRegistrationMessage,
  testRenderLoginFormShowsRegisteredMessageAndPrefillsEmail,
} = require("./controllers/auth/auth-session.controller.test");
const {
  testRenderEntityPublicRegistrationFormRendersPublicEntityForm,
} = require("./controllers/entities/entity-public-registration.controller.test");
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
  testValidateEntityPublicRegistrationAcceptsValidMadridLocation,
  testValidateEntityPublicRegistrationRejectsInvalidMadridLocation,
  testValidateEntityPublicRegistrationRejectsInvalidPassword,
} = require("./validators/entities/entity-public-registration.validator.test");
const {
  testValidateEntityProfileInputAcceptsValidMadridLocation,
  testValidateEntityProfileInputRejectsInvalidData,
  testValidateEntityProfileInputRejectsInvalidMadridLocationWhenAddressChanges,
} = require("./validators/entities/entity-profile.validator.test");
const {
  testValidateEventFiltersSanitizesInvalidDateAndText,
} = require("./validators/events/event-filters.validator.test");
const {
  testValidateEventInputAcceptsValidMadridLocation,
  testValidateEventInputRejectsInvalidData,
  testValidateEventInputRejectsMissingMadridLocation,
} = require("./validators/events/event.validator.test");
const {
  testValidateVolunteerProfileInputRejectsInvalidData,
} = require("./validators/volunteers/volunteer-profile.validator.test");
const {
  testValidateVolunteerRegistrationInputRejectsInvalidData,
} = require("./validators/auth/register-volunteer.validator.test");
const {
  testVolunteerRegisterViewLinksToEntityRegistration,
} = require("./views/auth-register.view.test");
const {
  testEntityPublicRegisterViewUsesSimplifiedFields,
} = require("./views/entity-public-register.view.test");
const {
  testGetEntityLoginRedirectPathSendsPendingEntityToStatus,
  testGetEntityLoginRedirectPathSendsRejectedEntityToStatus,
  testGetEntityLoginRedirectPathSendsSuspendedEntityToStatus,
  testGetEntityLoginRedirectPathSendsVerifiedEntityToProfile,
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
  testRequireVerifiedEntityAllowsVerifiedEntity,
  testRequireVerifiedEntityRedirectsPendingEntityToStatus,
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
    "resolveSessionSecret exige SESSION_SECRET en produccion",
    testResolveSessionSecretRequiresSecretInProduction,
  );
  await runTest(
    "resolveSessionSecret permite fallback en desarrollo",
    testResolveSessionSecretUsesDevelopmentFallback,
  );
  await runTest(
    "resolveSessionSecret devuelve el secreto configurado",
    testResolveSessionSecretReturnsConfiguredSecret,
  );
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
    "renderLoginForm muestra mensaje de solicitud de entidad",
    testRenderLoginFormShowsEntityRegistrationMessage,
  );
  await runTest(
    "getRedirectPathForRole envia al admin a su perfil",
    testGetRedirectPathForRoleSendsAdminToProfile,
  );
  await runTest(
    "getEntityLoginRedirectPath envia entidad pendiente a estado",
    testGetEntityLoginRedirectPathSendsPendingEntityToStatus,
  );
  await runTest(
    "getEntityLoginRedirectPath envia entidad rechazada a estado",
    testGetEntityLoginRedirectPathSendsRejectedEntityToStatus,
  );
  await runTest(
    "getEntityLoginRedirectPath envia entidad suspendida a estado",
    testGetEntityLoginRedirectPathSendsSuspendedEntityToStatus,
  );
  await runTest(
    "getEntityLoginRedirectPath envia entidad verificada a perfil",
    testGetEntityLoginRedirectPathSendsVerifiedEntityToProfile,
  );
  await runTest(
    "createEntityRequest crea una entidad pendiente y promociona el rol del usuario",
    testCreateEntityRequestCreatesPendingEntityAndPromotesUserRole,
  );
  await runTest(
    "createEntityRegistration crea usuario entidad y entidad pendiente",
    testCreateEntityRegistrationCreatesEntityUserAndPendingEntity,
  );
  await runTest(
    "createEntityRegistration rechaza email duplicado",
    testCreateEntityRegistrationRejectsDuplicateEmail,
  );
  await runTest(
    "createEntityRegistration rechaza CIF/NIF duplicado",
    testCreateEntityRegistrationRejectsDuplicateTaxId,
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
    "validateMadridLocation acepta coordenadas dentro de Madrid",
    testValidateMadridLocationAcceptsCoordinatesInsideMadrid,
  );
  await runTest(
    "validateMadridLocation rechaza latitud vacia",
    testValidateMadridLocationRejectsMissingLatitude,
  );
  await runTest(
    "validateMadridLocation rechaza longitud vacia",
    testValidateMadridLocationRejectsMissingLongitude,
  );
  await runTest(
    "validateMadridLocation rechaza valores no numericos",
    testValidateMadridLocationRejectsNonNumericValues,
  );
  await runTest(
    "validateMadridLocation rechaza coordenadas fuera de Madrid",
    testValidateMadridLocationRejectsCoordinatesOutsideMadrid,
  );
  await runTest(
    "validateMadridLocation rechaza direccion vacia cuando se exige",
    testValidateMadridLocationRejectsMissingAddressWhenRequired,
  );
  await runTest(
    "validateMadridLocation acepta direccion exigida con coordenadas validas",
    testValidateMadridLocationAcceptsRequiredAddressWhenCoordinatesAreValid,
  );
  await runTest(
    "searchMadridAddresses devuelve vacio para query corta",
    testSearchMadridAddressesReturnsEmptyForShortQuery,
  );
  await runTest(
    "searchMadridAddresses mapea resultados validos de Madrid",
    testSearchMadridAddressesMapsValidMadridResults,
  );
  await runTest(
    "searchMadridAddresses filtra resultados fuera de Madrid",
    testSearchMadridAddressesFiltersResultsOutsideMadrid,
  );
  await runTest(
    "searchMadridAddressesAction devuelve vacio sin query",
    testSearchMadridAddressesActionReturnsEmptyForMissingQuery,
  );
  await runTest(
    "searchMadridAddressesAction devuelve sugerencias mockeadas",
    testSearchMadridAddressesActionReturnsMockedSuggestions,
  );
  await runTest(
    "listVolunteerEventMapMarkers devuelve eventos visibles con coordenadas",
    testListVolunteerEventMapMarkersReturnsVisibleFutureEventsWithCoordinates,
  );
  await runTest(
    "listVolunteerEventMapMarkers excluye eventos sin coordenadas",
    testListVolunteerEventMapMarkersExcludesEventsWithoutCoordinates,
  );
  await runTest(
    "listEntityMapMarkers incluye organizacion propia y eventos propios",
    testListEntityMapMarkersIncludesOwnOrganizationAndEvents,
  );
  await runTest(
    "listEntityMapMarkers rechaza entidad inexistente",
    testListEntityMapMarkersRejectsMissingEntity,
  );
  await runTest(
    "listAdminMapMarkers incluye eventos y entidades con coordenadas",
    testListAdminMapMarkersIncludesEventsAndEntitiesWithCoordinates,
  );
  await runTest(
    "renderVolunteerEventMap renderiza la vista de mapa de eventos",
    testRenderVolunteerEventMapRendersMapView,
  );
  await runTest(
    "renderEntityMap renderiza la vista de mapa de entidad",
    testRenderEntityMapRendersMapView,
  );
  await runTest(
    "renderEntityPublicRegistrationForm renderiza registro publico de entidad",
    testRenderEntityPublicRegistrationFormRendersPublicEntityForm,
  );
  await runTest(
    "renderAdminMap renderiza la vista de mapa admin",
    testRenderAdminMapRendersMapView,
  );
  await runTest(
    "ruta de mapa de voluntario queda protegida",
    testVolunteerMapRouteIsProtected,
  );
  await runTest(
    "ruta de mapa de entidad queda protegida",
    testEntityMapRouteIsProtected,
  );
  await runTest(
    "ruta de mapa admin queda protegida",
    testAdminMapRouteIsProtected,
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
    "vista de registro voluntario enlaza al registro de entidad",
    testVolunteerRegisterViewLinksToEntityRegistration,
  );
  await runTest(
    "vista de registro entidad usa campos simplificados",
    testEntityPublicRegisterViewUsesSimplifiedFields,
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
    "validateEntityPublicRegistration rechaza contrasena invalida",
    testValidateEntityPublicRegistrationRejectsInvalidPassword,
  );
  await runTest(
    "validateEntityPublicRegistration rechaza direccion fuera de Madrid",
    testValidateEntityPublicRegistrationRejectsInvalidMadridLocation,
  );
  await runTest(
    "validateEntityPublicRegistration acepta direccion valida de Madrid",
    testValidateEntityPublicRegistrationAcceptsValidMadridLocation,
  );
  await runTest(
    "validateEntityProfileInput detecta datos invalidos en el perfil de entidad",
    testValidateEntityProfileInputRejectsInvalidData,
  );
  await runTest(
    "validateEntityProfileInput exige ubicacion valida al guardar entidad",
    testValidateEntityProfileInputRejectsInvalidMadridLocationWhenAddressChanges,
  );
  await runTest(
    "validateEntityProfileInput acepta ubicacion valida de Madrid",
    testValidateEntityProfileInputAcceptsValidMadridLocation,
  );
  await runTest(
    "validateEventInput detecta datos invalidos en la publicacion de eventos",
    testValidateEventInputRejectsInvalidData,
  );
  await runTest(
    "validateEventInput exige ubicacion valida de Madrid",
    testValidateEventInputRejectsMissingMadridLocation,
  );
  await runTest(
    "validateEventInput acepta ubicacion valida de Madrid",
    testValidateEventInputAcceptsValidMadridLocation,
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
    "requireVerifiedEntity bloquea entidades no verificadas",
    testRequireVerifiedEntityRedirectsPendingEntityToStatus,
  );
  await runTest(
    "requireVerifiedEntity permite entidades verificadas",
    testRequireVerifiedEntityAllowsVerifiedEntity,
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
