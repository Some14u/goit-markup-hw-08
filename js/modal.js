(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
    modals: document.querySelectorAll("[data-modal]"),
    body: document.querySelector("body"),
    openMobileMenuBtn:  document.querySelector("[data-mobile-menu-open]"),
    mobileMenu: document.querySelector("[data-mobile-menu]")
  }

  if (refs.openModalBtn) refs.openModalBtn.addEventListener("click", toggleModal);
  if (refs.closeModalBtn) refs.closeModalBtn.addEventListener("click", toggleModal);

  if (refs.openMobileMenuBtn) refs.openMobileMenuBtn.addEventListener("click", toggleMobileMenu);


  if (refs.modal) refs.modal.addEventListener("click", (event) => {
    if (event.target===refs.modal) toggleModal();
  })

  function toggleModal(event) {
    refs.body.classList.toggle("body--locked");
    refs.modals.forEach(element => {
      element.classList.toggle(element.classList[0] + "--hidden");
    });
  }

  function toggleMobileMenu(event) {
    window.scrollTo(0, 0);
    refs.body.classList.toggle("body--locked");
    refs.mobileMenu.classList.toggle(refs.mobileMenu.classList[0] + "--hidden");
    refs.openMobileMenuBtn.classList.toggle(refs.openMobileMenuBtn.classList[0] + "--opened");
  }

})();