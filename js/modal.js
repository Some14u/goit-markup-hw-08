(() => {
  /* Обслуживает модальные окна, обрабатывая атрибуты ноды
     Нода-родитель для модального окна должна содержать атрибут data-modal-window.
     Тогда считается, что это модальное окно, и анализируются другие атрибуты этой ноды.
     Видимость окна управляется добавлением/скрытием класса-модификатора *--hidden. Этот класс
     может добавляться на само модальное окно и при необходимости на родительский бэкдроп (см. ниже).
     Управляющие атрибуты представляют собой:
     data-class-to-toggle = "имя класса" — явно указывает класс, к которому будет приписываться --hidden
       на ноде модального окна (и/или бэкдропа, см. ниже).
       Скрипт ищет ноду с атрибутом "имя атрибута" и вешает на него обработчик-переключатель видимости по клику
     data-toggle-btn = "имя атрибута" — задаёт ноду для кнопки-переключателя видимости модального окна
       Нода может менять свой внешний вид в зависимости от состояния, для чего ей при включении добавляется
       класс *--opened, где * это значение атрибута data-class-to-toggle кнопки, или первый класс в списке классов.
     data-open-btn/data-close-btn = "имя атрибута" — то же самое, но без переключения внешнего вида самой кнопки.
       Это нужно для двух разных кнопок, открывающих и закрывающих модальное окно.
     data-has-backdrop — если есть этот атрибут, нода-родитель считается бэкдропом, и её видимость
       переключается вместе с модальным окном. Бэкдропу в скрытом состоянии добавляется
       класс *--hidden, подставляя вместо звёздочки содержимое data-class-to-toggle бэкдропа
       или базовый класс (первый указанный), если этого атрибута не найдено.
     data-backdrop-closes — если есть бэкдроп, наличие этого атрибута позволяет закрывать
       модальное окно по клику вне его границ
     data-lock-body-scroll — наличие этого атрибута позволяет управлять прокруткой фона за модальным окном
       добавляет на body класс "scroll-disabled", в который можно вписать блокировку прокрутки
     data-scroll-to="y-value" — при открытии модального окна можно принудительно прокрутить документ
       в нужную координату.
    Пример использования:
    <button class="btn trigger-this" data-on-off-modal-btn data-class-to-toggle="trigger-this">Показать/скрыть</button>
    <button class="btn" data-show-modal-btn>Показать</button>
    ...
    <div class="backdrop section__backdrop" data-class-to-toggle="section__backdrop">
      <div
        class="modal-window something section__modal-window"
        data-modal-window
        data-toggle-btn="data-on-off-modal-btn"
        data-open-btn="data-show-modal-btn"
        data-close-btn="data-close-modal-btn"
        data-class-to-toggle="something"
        data-has-backdrop
        data-lock-body-scroll
        data-scroll-to="0"
        >
        ...
          <button class="btn" data-close-modal-btn>Скрыть</button>
        ...
      </div>
    </div>
    У первой кнопки можно определить два разных стиля: trigger-this и trigger-this--opened
    Вторая кнопка будет открывать, а третья закрывать окно.
    У бэкдропа будет два состояния: есть или нет section__backdrop--hidden
    То же самое касается и модального окна. Будет добавляться стиль something--hidden
  */
  const modals = document.querySelectorAll("[data-modal-window]");

  const { body, documentElement } = document;
  let { scrollTop } = document.documentElement;
  
  function disableScroll() {
    scrollTop = documentElement.scrollTop;
    body.style.top = `-${scrollTop}px`;
    body.classList.add("scroll-disabled");
  }
  
  function enableScroll() {
    body.classList.remove("scroll-disabled");
    documentElement.style.scrollBehavior = "auto";
    documentElement.scrollTop = scrollTop;
    documentElement.style.removeProperty("scroll-behavior");
    body.style.removeProperty("top");
  }

  modals.forEach(element => {
    function toggleModal(event) {
      element.classList.toggle(classToToggle + "--hidden");
      if (backdropClassToToggle) {
        element.parentNode.classList.toggle(backdropClassToToggle + "--hidden");
      }
      if (lockBodyScroll == "") {
        if (body.classList.contains("scroll-disabled")) {
          enableScroll();
        } else {
          disableScroll();
        }
      }
      if (scrollTo) {
        window.scrollTo(0, scrollTo);
      }
      if (toggleBtn) {
        toggleBtn.classList.toggle(toggleBtn.getAttribute("data-class-to-toggle") || toggleBtn.classList[0] + "--opened");
      }
    }
    function locateElement(name) {
      return name && document.querySelector(`[${name}]`);
    }
    const toggleBtn = locateElement(element.getAttribute("data-toggle-btn"));
    const openBtn = locateElement(element.getAttribute("data-open-btn"));
    const closeBtn = locateElement(element.getAttribute("data-close-btn"));
    const classToToggle = element.getAttribute("data-class-to-toggle") || element.classList[0];
    const lockBodyScroll = element.getAttribute("data-lock-body-scroll");
    const scrollTo = element.getAttribute("data-scroll-to");
    const backdropClassToToggle = element.getAttribute("data-has-backdrop") &&
      element.parentNode.getAttribute("data-class-to-toggle") || element.parentNode.classList[0];
    const backdropCloses = element.getAttribute("data-backdrop-closes");

    if (backdropClassToToggle && backdropCloses == "") {
      element.parentNode.addEventListener("click", (event) => {
        if (event.target===element.parentNode) toggleModal();
      });
    }
    if (toggleBtn) toggleBtn.addEventListener("click", toggleModal);
    if (openBtn) openBtn.addEventListener("click", toggleModal);
    if (closeBtn) closeBtn.addEventListener("click", toggleModal);
  });
})();