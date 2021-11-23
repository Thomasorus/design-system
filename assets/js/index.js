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
    <button aria-expanded="false" ${attrString}>${el.textContent}</button>`;
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
    wrapper.setAttribute("class", "flow accessibility-menu");
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
  function setThemeFromLocalStorage() {
    const value = localStorage.getItem("theme");
    if (value == "light") {
      document.documentElement.setAttribute("theme", "light");
      localStorage.setItem("theme", "light");
    }
    if (value == "dark") {
      document.documentElement.setAttribute("theme", "dark");
      localStorage.setItem("theme", "dark");
    }
    const size = localStorage.getItem("fontsize");
    let root = document.querySelector("html"), style = window.getComputedStyle(root, null).getPropertyValue("font-size"), fontSize = parseFloat(style);
    root.style.fontSize = size;
    const font = localStorage.getItem("fontstyle");
    const html = document.querySelector("html");
    html.setAttribute("font-style", font);
  }
  (function() {
    setThemeFromLocalStorage();
  })();
})();
//# sourceMappingURL=index.js.map
