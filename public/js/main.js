(() => {
  const modal = document.querySelector("[data-notification-delete-modal]");

  if (!modal) {
    return;
  }

  const deleteForms = document.querySelectorAll(".notification-delete-form");
  const cancelButton = modal.querySelector("[data-notification-delete-cancel]");
  const confirmButton = modal.querySelector("[data-notification-delete-confirm]");
  let pendingForm = null;

  deleteForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      pendingForm = form;
      modal.showModal();
    });
  });

  cancelButton.addEventListener("click", () => {
    pendingForm = null;
    modal.close();
  });

  confirmButton.addEventListener("click", () => {
    if (!pendingForm) {
      modal.close();
      return;
    }

    const form = pendingForm;
    pendingForm = null;
    modal.close();
    form.submit();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      pendingForm = null;
      modal.close();
    }
  });

  modal.addEventListener("close", () => {
    pendingForm = null;
  });
})();
