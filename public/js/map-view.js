function initializeVolunRedMap() {
  const mapElement = document.getElementById("volunred-map");
  const markerDataElement = document.getElementById("map-markers-json");
  const eventListElement = document.querySelector("[data-map-event-list]");
  const selectedDetailElement = document.querySelector("[data-map-selected-detail]");

  if (!mapElement || !markerDataElement || typeof L === "undefined") {
    return;
  }

  const MADRID_CENTER = [40.4168, -3.7038];
  const MADRID_BOUNDS = [
    [40.31, -3.83],
    [40.55, -3.52],
  ];
  const eventMarkersById = {};
  const eventsById = {};
  const eventButtonsById = {};
  let selectedMarker = null;
  let selectedItem = null;

  function parseMarkers() {
    try {
      const markers = JSON.parse(markerDataElement.textContent || "[]");
      return Array.isArray(markers) ? markers : [];
    } catch (error) {
      return [];
    }
  }

  function hasCoordinates(item) {
    return typeof item.latitude === "number" && typeof item.longitude === "number";
  }

  function getMarkerColors(item) {
    if (item.type === "ENTITY") {
      return {
        fillColor: "#2f6f8f",
        strokeColor: "#24556f",
      };
    }

    return {
      fillColor: item.markerColor || "#bd3e3d",
      strokeColor: item.markerTextColor || item.markerColor || "#8a3636",
    };
  }

  function getDefaultMarkerStyle(item) {
    const colors = getMarkerColors(item);

    return {
      radius: 9,
      color: colors.strokeColor,
      fillColor: colors.fillColor,
      fillOpacity: 0.85,
      opacity: 1,
      weight: 2,
    };
  }

  function getSelectedMarkerStyle(item) {
    const colors = getMarkerColors(item);

    return {
      radius: 13,
      color: "#2f2f2f",
      fillColor: colors.fillColor,
      fillOpacity: 0.95,
      opacity: 1,
      weight: 3,
    };
  }

  function createHtmlMarkerIcon(item, selected = false) {
    const colors = getMarkerColors(item);
    const size = selected ? 30 : 24;
    const anchor = size / 2;

    return L.divIcon({
      className: `map-event-marker-icon${selected ? " is-selected" : ""}`,
      html: `<span style="--marker-color:${colors.fillColor};--marker-stroke:${colors.strokeColor}"></span>`,
      iconSize: [size, size],
      iconAnchor: [anchor, anchor],
    });
  }

  function appendText(parent, label, value) {
    if (value === null || value === undefined || value === "") {
      return;
    }

    const paragraph = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = `${label}: `;
    paragraph.appendChild(strong);
    paragraph.appendChild(document.createTextNode(String(value)));
    parent.appendChild(paragraph);
  }

  function getBriefAddress(item) {
    const address = item.normalizedAddress || item.address;

    if (!address) {
      return "";
    }

    const briefAddress = String(address).replace(/,\s*Madrid\b.*$/i, "").trim();
    return briefAddress || address;
  }

  function getDetailLabel(item) {
    return item.type === "EVENT" && window.location.pathname === "/eventos/mapa"
      ? "Ver detalles e inscribirme"
      : "Ver detalles";
  }

  function renderSelectedEvent(item) {
    if (!selectedDetailElement) {
      return;
    }

    selectedDetailElement.replaceChildren();

    const container = document.createElement("div");
    container.className = "map-selected-content";

    const eyebrow = document.createElement("span");
    eyebrow.className = "map-selected-eyebrow";
    eyebrow.textContent = "Evento seleccionado";
    container.appendChild(eyebrow);

    const title = document.createElement("h3");
    title.textContent = item.title;
    container.appendChild(title);

    appendText(container, "Entidad", item.entityName);
    appendText(container, "Fecha", item.startsAtLabel);
    appendText(container, "Hora", item.timeLabel);
    appendText(container, "Direccion", getBriefAddress(item));
    appendText(container, "Plazas disponibles", item.availableSlots);

    if (item.registrationState === "FULL") {
      appendText(container, "Estado", "Evento completo");
    } else if (item.registrationState === "REGISTERED") {
      appendText(container, "Estado", "Ya estas inscrito");
    }

    const link = document.createElement("a");
    link.className = "primary-button map-selected-link";
    link.href = item.detailUrl || item.url;
    link.textContent = getDetailLabel(item);
    container.appendChild(link);

    selectedDetailElement.appendChild(container);
  }

  function updateSelectedButton(item) {
    Object.values(eventButtonsById).forEach((button) => {
      button.classList.remove("is-selected");
      button.setAttribute("aria-pressed", "false");
    });

    const selectedButton = eventButtonsById[item.id];
    if (selectedButton) {
      selectedButton.classList.add("is-selected");
      selectedButton.setAttribute("aria-pressed", "true");
    }
  }

  function selectMapEvent(eventId) {
    const item = eventsById[eventId];
    const marker = eventMarkersById[eventId];

    if (!item || !marker) {
      return;
    }

    if (selectedMarker && selectedItem) {
      selectedMarker.circleMarker.setStyle(getDefaultMarkerStyle(selectedItem));
      selectedMarker.circleMarker.setRadius(9);
      selectedMarker.htmlMarker.setIcon(createHtmlMarkerIcon(selectedItem, false));
    }

    marker.circleMarker.setStyle(getSelectedMarkerStyle(item));
    marker.circleMarker.setRadius(13);
    marker.htmlMarker.setIcon(createHtmlMarkerIcon(item, true));
    selectedMarker = marker;
    selectedItem = item;

    map.setView([item.latitude, item.longitude], 16);
    updateSelectedButton(item);
    renderSelectedEvent(item);
  }

  function renderEmptyEventList() {
    if (!eventListElement) {
      return;
    }

    eventListElement.replaceChildren();
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "map-panel-empty";
    emptyMessage.textContent = "No hay eventos con ubicacion para mostrar.";
    eventListElement.appendChild(emptyMessage);
  }

  function createEventListButton(item) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "map-event-list-item";
    button.setAttribute("aria-pressed", "false");

    const colorSwatch = document.createElement("span");
    colorSwatch.className = "map-event-list-color";
    colorSwatch.style.backgroundColor = item.markerColor || "#bd3e3d";
    colorSwatch.setAttribute("aria-hidden", "true");
    button.appendChild(colorSwatch);

    const content = document.createElement("div");
    content.className = "map-event-list-content";

    const title = document.createElement("strong");
    title.textContent = item.title;
    content.appendChild(title);

    appendText(content, "Fecha", item.startsAtLabel);
    appendText(content, "Hora", item.timeLabel);
    appendText(content, "Direccion", getBriefAddress(item));
    appendText(content, "Entidad", item.entityName);
    appendText(content, "Plazas disponibles", item.availableSlots);

    button.appendChild(content);
    button.addEventListener("click", () => selectMapEvent(item.id));

    return button;
  }

  function renderMapEventList(events) {
    if (!eventListElement) {
      return;
    }

    eventListElement.replaceChildren();

    if (events.length === 0) {
      renderEmptyEventList();
      return;
    }

    events.forEach((item) => {
      const button = createEventListButton(item);
      eventButtonsById[item.id] = button;
      eventListElement.appendChild(button);
    });
  }

  function refreshMapSize() {
    map.invalidateSize();
  }

  const markers = parseMarkers();
  const events = markers.filter((marker) => marker.type === "EVENT" && hasCoordinates(marker));
  const map = L.map(mapElement, {
    maxBounds: MADRID_BOUNDS,
    maxBoundsViscosity: 0.9,
    minZoom: 11,
  }).setView(MADRID_CENTER, 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  refreshMapSize();
  setTimeout(refreshMapSize, 150);
  renderMapEventList(events);

  if (markers.length === 0) {
    map.setView(MADRID_CENTER, 12);
    setTimeout(refreshMapSize, 150);
    return;
  }

  const markerGroup = L.featureGroup();

  markers.forEach((marker) => {
    if (!hasCoordinates(marker)) {
      return;
    }

    const coordinates = [marker.latitude, marker.longitude];
    const circleMarker = L.circleMarker(coordinates, {
      ...getDefaultMarkerStyle(marker),
      interactive: marker.type === "EVENT",
      bubblingMouseEvents: false,
    }).addTo(map);

    markerGroup.addLayer(circleMarker);

    if (marker.type === "EVENT") {
      const htmlMarker = L.marker(coordinates, {
        icon: createHtmlMarkerIcon(marker, false),
        interactive: true,
        keyboard: false,
        zIndexOffset: 500,
      }).addTo(map);

      eventsById[marker.id] = marker;
      eventMarkersById[marker.id] = {
        circleMarker,
        htmlMarker,
      };
      circleMarker.on("click", () => {
        selectMapEvent(marker.id);
      });
      htmlMarker.on("click", () => {
        selectMapEvent(marker.id);
      });
    }
  });

  markerGroup.addTo(map);

  if (markerGroup.getLayers().length > 0) {
    refreshMapSize();
    map.fitBounds(markerGroup.getBounds().pad(0.2), {
      padding: [24, 24],
      maxZoom: 14,
    });
    setTimeout(() => {
      refreshMapSize();
      map.fitBounds(markerGroup.getBounds().pad(0.2), {
        padding: [24, 24],
        maxZoom: 14,
      });
    }, 150);
  } else {
    map.setView(MADRID_CENTER, 12);
    setTimeout(refreshMapSize, 150);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeVolunRedMap);
} else {
  initializeVolunRedMap();
}
