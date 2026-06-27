function initializeVolunRedMap() {
  const mapElement = document.getElementById("volunred-map");
  const markerDataElement = document.getElementById("map-markers-json");

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

  function createIcon(type) {
    const color = type === "ENTITY" ? "#2f6f8f" : "#bd3e3d";

    return L.divIcon({
      className: "map-marker-icon",
      html: `<span style="background:${color}"></span>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
      popupAnchor: [0, -10],
    });
  }

  function appendText(parent, label, value) {
    if (!value) {
      return;
    }

    const paragraph = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = `${label}: `;
    paragraph.appendChild(strong);
    paragraph.appendChild(document.createTextNode(String(value)));
    parent.appendChild(paragraph);
  }

  function buildPopup(marker) {
    const container = document.createElement("div");
    container.className = "map-popup";

    const title = document.createElement("h3");
    title.textContent = marker.type === "ENTITY" ? marker.name : marker.title;
    container.appendChild(title);

    if (marker.type === "EVENT") {
      appendText(container, "Entidad", marker.entityName);
      appendText(container, "Fecha", marker.startsAtLabel);
      appendText(container, "Estado", marker.publicationStatus);
    } else {
      appendText(container, "Estado", marker.validationStatus);
      appendText(container, "Email", marker.contactEmail || marker.requesterEmail);
      appendText(container, "Solicitante", marker.requesterName);
    }

    appendText(container, "Direccion", marker.normalizedAddress || marker.address);

    if (marker.url) {
      const link = document.createElement("a");
      link.href = marker.url;
      link.textContent = "Ver detalle";
      container.appendChild(link);
    }

    return container;
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

    L.marker([marker.latitude, marker.longitude], {
      icon: createIcon(marker.type),
    })
      .bindPopup(buildPopup(marker))
      .addTo(markerGroup);
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
