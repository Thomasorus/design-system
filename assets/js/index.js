(() => {
  // src/js/index.js
  var allRequired = document.querySelectorAll("input[required]");
  allRequired.forEach((el) => {
    const id = el.getAttribute("id");
    const label = document.querySelector(`label[for="${id}"`);
    const text = `<span class="required">&nbsp;(Required)</span>`;
    label.insertAdjacentHTML("beforeend", text);
  });
  var allAriaInvalid = document.querySelectorAll(`input[aria-invalid="true"]`);
  allAriaInvalid.forEach((el) => {
    const id = el.getAttribute("id");
    const errorId = id + "-error";
    const infoID = id + "-info";
    const errorMessage = document.querySelector(`div[id="${errorId}"]`);
    errorMessage.removeAttribute("hidden");
    const existingIds = el.getAttribute("aria-describedby");
    el.setAttribute("aria-describedby", existingIds + " " + errorId);
  });
})();
//# sourceMappingURL=index.js.map
