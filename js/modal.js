(() => {
  /* Обслуживает модальные окна, обрабатывая атрибуты ноды
     Нода-родитель для модального окна должна содержать атрибут modalWindow.
     Тогда считается, что это модальное окно, и анализируются другие атрибуты этой ноды.
     Видимость окна управляется добавлением/скрытием класса-модификатора *--hidden. Этот класс
     может добавляться на само модальное окно и при необходимости на родительский бэкдроп (см. ниже).
     Управляющие атрибуты представляют собой:
     classToToggle = "имя класса" — явно указывает класс, к которому будет приписываться --hidden
       на ноде модального окна (и/или бэкдропа, см. ниже).
     toggleBtn = "имя атрибута" — задаёт ноду для кнопки-переключателя видимости модального окна
       Скрипт ищет ноду с атрибутом "имя атрибута" и вешает на него обработчик-переключатель видимости по клику
       Нода может менять свой внешний вид в зависимости от состояния, для чего ей при включении добавляется
       класс *--opened, где * это значение атрибута classToToggle кнопки, или первый класс в списке классов.
     openBtn/closeBtn = "имя атрибута" — то же самое, но без переключения внешнего вида самой кнопки.
       Это нужно для двух разных кнопок, открывающих и закрывающих модальное окно.
     hasBackdrop — если есть этот атрибут, нода-родитель считается бэкдропом, и её видимость
       переключается вместе с модальным окном. Бэкдропу в скрытом состоянии добавляется
       класс *--hidden, подставляя вместо звёздочки содержимое classToToggle бэкдропа
       или базовый класс (первый указанный), если этого атрибута не найдено.
     backdropCloses — если есть бэкдроп, наличие этого атрибута позволяет закрывать
       модальное окно по клику вне его границ
     lockBodyScroll — наличие этого атрибута позволяет управлять прокруткой фона за модальным окном
       добавляет на body класс "scroll-disabled", в который можно вписать блокировку прокрутки
     scrollTo="y-value" — при открытии модального окна можно принудительно прокрутить документ
       в нужную координату.
    Пример использования:
    <button class="btn trigger-this" onOffModalBtn classToToggle="trigger-this">Показать/скрыть</button>
    <button class="btn" showModalBtn>Показать</button>
    ...
    <div class="backdrop section__backdrop" classToToggle="section__backdrop">
      <div
        class="modal-window something section__modal-window"
        modalWindow
        toggleBtn="onOffModalBtn"
        openBtn="showModalBtn"
        closeBtn="closeWindowBtn"
        classToToggle="something"
        lockBodyScroll
        scrollTo="0"
        >
        ...
          <button class="btn" closeWindowBtn>Скрыть</button>
        ...
      </div>
    </div>

    У первой кнопки можно определить два разных стиля: trigger-this и trigger-this--opened
    Вторая кнопка будет открывать, а третья закрывать окно.
    У бэкдропа будет два состояния: есть или нет section__backdrop--hidden
    То же самое касается и модального окна. Будет добавляться стиль something--hidden
  */
  const modals = document.querySelectorAll("[modalWindow]");

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
        toggleBtn.classList.toggle(toggleBtn.getAttribute("classToToggle") || toggleBtn.classList[0] + "--opened");
      }
    }
    function locateElement(name) {
      return name && document.querySelector(`[${name}]`);
    }
    const toggleBtn = locateElement(element.getAttribute("toggleBtn"));
    const openBtn = locateElement(element.getAttribute("openBtn"));
    const closeBtn = locateElement(element.getAttribute("closeBtn"));
    const classToToggle = element.getAttribute("classToToggle") || element.classList[0];
    const lockBodyScroll = element.getAttribute("lockBodyScroll");
    const scrollTo = element.getAttribute("scrollTo");
    const backdropClassToToggle = element.getAttribute("hasBackdrop") &&
      element.parentNode.getAttribute("classToToggle") || element.parentNode.classList[0];
    const backdropCloses = element.getAttribute("backdropCloses");

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