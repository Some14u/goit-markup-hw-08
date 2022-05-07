(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
    modals: document.querySelectorAll("[data-modal]")
  }
  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  refs.modal.addEventListener("click", (event) => {
    if (event.target===refs.modal) toggleModal();
  })

  function toggleModal(event) {
    refs.modals.forEach(element => {
      element.classList.toggle(element.classList[0] + "--hidden");
    });
  }
})();