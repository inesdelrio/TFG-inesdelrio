(() => {
  const blocks = document.querySelectorAll("[data-address-search]");

  if (blocks.length === 0) {
    return;
  }

  function setStatus(block, message) {
    const status = block.querySelector("[data-address-search-status]");
    if (status) {
      status.textContent = message;
    }
  }

  function clearResults(block) {
    const results = block.querySelector("[data-address-search-results]");
    if (results) {
      results.replaceChildren();
    }
  }

  function selectSuggestion(block, suggestion) {
    const targetSelector = block.dataset.addressTarget;
    const addressInput = targetSelector ? document.querySelector(targetSelector) : null;
    const latitudeInput = block.querySelector("[data-address-latitude]");
    const longitudeInput = block.querySelector("[data-address-longitude]");
    const normalizedInput = block.querySelector("[data-address-normalized]");
    const selectedLabel = block.querySelector("[data-address-selected]");

    if (addressInput) {
      addressInput.value = suggestion.normalizedAddress;
    }

    latitudeInput.value = suggestion.latitude;
    longitudeInput.value = suggestion.longitude;
    normalizedInput.value = suggestion.normalizedAddress;

    if (selectedLabel) {
      selectedLabel.textContent = `Direccion seleccionada: ${suggestion.normalizedAddress}`;
    }

    clearResults(block);
    setStatus(block, "Direccion seleccionada.");
  }

  function renderSuggestions(block, suggestions) {
    const results = block.querySelector("[data-address-search-results]");

    if (!results) {
      return;
    }

    results.replaceChildren();

    if (suggestions.length === 0) {
      setStatus(block, "No se han encontrado direcciones de Madrid.");
      return;
    }

    setStatus(block, "Selecciona una direccion.");

    suggestions.forEach((suggestion) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "address-suggestion";
      button.textContent = suggestion.label;
      button.addEventListener("click", () => selectSuggestion(block, suggestion));
      results.appendChild(button);
    });
  }

  async function searchAddress(block) {
    const input = block.querySelector("[data-address-search-input]");
    const query = input ? input.value.trim() : "";

    clearResults(block);

    if (query.length < 3) {
      setStatus(block, "Escribe al menos 3 caracteres.");
      return;
    }

    setStatus(block, "Buscando direccion...");

    try {
      const response = await fetch(`/api/geocoding/madrid?q=${encodeURIComponent(query)}`);
      const payload = await response.json();

      if (!response.ok) {
        setStatus(block, payload.error || "No se ha podido buscar la direccion.");
        return;
      }

      renderSuggestions(block, payload.suggestions || []);
    } catch (error) {
      setStatus(block, "No se ha podido buscar la direccion.");
    }
  }

  blocks.forEach((block) => {
    const button = block.querySelector("[data-address-search-button]");

    if (!button) {
      return;
    }

    button.addEventListener("click", () => searchAddress(block));
  });
})();
