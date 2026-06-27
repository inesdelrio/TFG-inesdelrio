function initializeVolunRedMap() {
  const mapElement = document.getElementById("volunred-map");
  const markerDataElement = document.getElementById("map-markers-json");
  const selectedCard = document.querySelector("[data-selected-map-item]");

  if (!mapElement || !markerDataElement || typeof L === "undefined") {
    return;
  }

  const MADRID_CENTER = [40.4168, -3.7038];
  const MADRID_BOUNDS = [
    [40.31, -3.83],
    [40.55, -3.52],
  ];

  function parseMarkers() {
    try {
      const markers = JSON.parse(markerDataElement.textContent || "[]");
      return Array.isArray(markers) ? markers : [];
    } catch (error) {
      return [];
    }
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

  function appendDetailLink(parent, marker) {
    const href = marker.type === "EVENT" ? marker.detailUrl || marker.url : marker.url;

    if (!href) {
      return;
    }

    const link = document.createElement("a");
    link.className = "primary-button map-selected-link";
    link.href = href;
    link.textContent = marker.type === "EVENT" ? "Ver detalles e inscribirme" : "Ver detalle";
    parent.appendChild(link);
  }

  function showSelectedMapItem(marker) {
    if (!selectedCard) {
      return;
    }

    selectedCard.hidden = false;
    selectedCard.replaceChildren();

    const container = document.createElement("div");
    container.className = "map-selected-content";

    const eyebrow = document.createElement("span");
    eyebrow.className = "map-selected-eyebrow";
    eyebrow.textContent = marker.type === "EVENT" ? "Evento seleccionado" : "Ubicacion seleccionada";
    container.appendChild(eyebrow);

    const title = document.createElement("h2");
    title.textContent = marker.type === "ENTITY" ? marker.name : marker.title;
    container.appendChild(title);

    if (marker.type === "EVENT") {
      appendText(container, "Entidad", marker.entityName);
      appendText(container, "Fecha", marker.startsAtLabel);
      appendText(container, "Hora", marker.timeLabel);
      appendText(container, "Plazas disponibles", marker.availableSlots);

      if (marker.registrationState === "FULL") {
        appendText(container, "Estado", "Evento completo");
      } else if (marker.registrationState === "REGISTERED") {
        appendText(container, "Estado", "Ya estas inscrito");
      }
    } else {
      appendText(container, "Estado", marker.validationStatus);
      appendText(container, "Email", marker.contactEmail || marker.requesterEmail);
      appendText(container, "Solicitante", marker.requesterName);
    }

    appendText(container, "Direccion", marker.normalizedAddress || marker.address);
    appendDetailLink(container, marker);
    selectedCard.appendChild(container);
  }

  function refreshMapSize() {
    map.invalidateSize();
  }

  const markers = parseMarkers();
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

  if (markers.length === 0) {
    map.setView(MADRID_CENTER, 12);
    setTimeout(refreshMapSize, 150);
    return;
  }

  const markerGroup = L.featureGroup();

  markers.forEach((marker) => {
    if (typeof marker.latitude !== "number" || typeof marker.longitude !== "number") {
      return;
    }

    const coordinates = [marker.latitude, marker.longitude];
    const fillColor = marker.type === "ENTITY" ? "#2f6f8f" : marker.markerColor || "#bd3e3d";
    const strokeColor = marker.type === "ENTITY" ? "#24556f" : marker.markerTextColor || fillColor;

    L.circleMarker(coordinates, {
      radius: 8,
      color: strokeColor,
      fillColor,
      fillOpacity: 0.88,
      weight: 2,
      interactive: false,
    }).addTo(markerGroup);

    const clickArea = L.circleMarker(coordinates, {
      radius: 18,
      color: fillColor,
      fillColor,
      fillOpacity: 0,
      opacity: 0,
      weight: 0,
      interactive: true,
      bubblingMouseEvents: false,
    }).addTo(markerGroup);

    clickArea.on("click", () => {
      showSelectedMapItem(marker);
    });
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
