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
  var triggers = document.querySelectorAll('.collapse [data-trigger="true"]');
  triggers.forEach((el) => {
    const tagName = el.tagName;
    const dataAttributes = el.dataset;
    let attrString = "";
    Object.keys(dataAttributes).map((key) => {
      if (key !== "trigger") {
        attrString += ` data-${key} `;
      }
    });
    el.innerHTML = `
    <button aria-expanded="false" ${attrString}>${el.textContent} &#43; </button>`;
    const getContent = (elem) => {
      let elems = [];
      while (elem.nextElementSibling && elem.nextElementSibling.tagName !== tagName) {
        elems.push(elem.nextElementSibling);
        elem = elem.nextElementSibling;
      }
      elems.forEach((node) => {
        node.parentNode.removeChild(node);
      });
      return elems;
    };
    let contents = getContent(el);
    let wrapper = document.createElement("div");
    wrapper.hidden = true;
    wrapper.setAttribute("class", "flow");
    contents.forEach((node) => {
      wrapper.appendChild(node);
    });
    el.parentNode.insertBefore(wrapper, el.nextElementSibling);
    let btn = el.querySelector("button");
    btn.onclick = () => {
      let expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", !expanded);
      wrapper.hidden = expanded;
    };
  });
})();
//# sourceMappingURL=index.js.map
