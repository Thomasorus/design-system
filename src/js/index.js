// Check for input required and adds text in the label
const allRequired = document.querySelectorAll("input[required]")
allRequired.forEach(el => {
    const id = el.getAttribute('id');
    const label = document.querySelector(`label[for="${id}"`)
    const text = `<span class="required">&nbsp;(Required)</span>`
    label.insertAdjacentHTML("beforeend", text)
});

// Check for aria invalid and add error message
const allAriaInvalid = document.querySelectorAll(`input[aria-invalid="true"]`)
allAriaInvalid.forEach(el => {
    const id = el.getAttribute('id')
    const errorId = id + "-error"
    const infoID = id + "-info"
    const errorMessage = document.querySelector(`div[id="${errorId}"]`)
    errorMessage.removeAttribute("hidden")
    const existingIds = el.getAttribute('aria-describedby')
    el.setAttribute("aria-describedby", existingIds + " " + errorId)

});

// Checks for collapse component
const triggers = document.querySelectorAll('.collapse [data-trigger="true"]');
triggers.forEach(el => {
    const tagName = el.tagName
    const dataAttributes = el.dataset
    let attrString = ""
    Object.keys(dataAttributes).map(key => {
        if (key !== "trigger") {
            attrString += ` data-${key} `
        }
    });
    el.innerHTML = `
    <button aria-expanded="false" ${attrString}>${el.textContent}</button>`;
    const getContent = (elem) => {
        let elems = [];
        //Put siblings inside an array if they don't are a data trigger
        while (elem.nextElementSibling && elem.nextElementSibling.tagName !== tagName) {
            elems.push(elem.nextElementSibling);
            elem = elem.nextElementSibling;
        }
        // Delete the old versions of the content nodes
        elems.forEach((node) => {
            node.parentNode.removeChild(node);
        })
        return elems;
    }
    let contents = getContent(el);

    let wrapper = document.createElement('div');
    wrapper.hidden = true;
    wrapper.setAttribute("class", "flow accessibility-menu")

    // Add each element of `contents` to `wrapper`
    contents.forEach(node => {
        wrapper.appendChild(node);
    })

    // Add the wrapped content back into the DOM after the trigger
    el.parentNode.insertBefore(wrapper, el.nextElementSibling);

    // Assign the button
    let btn = el.querySelector('button');

    btn.onclick = () => {
        // Cast the state as a boolean
        let expanded = btn.getAttribute('aria-expanded') === 'true';
        // Switch the state
        btn.setAttribute('aria-expanded', !expanded);
        // Switch the content's visibility
        wrapper.hidden = expanded;
    }
})


function changeFont(el) {
    const font = el.dataset.font;
    let html = document.querySelector("html")
    if (font === "inter") {
        html.setAttribute('font-style', "")
    } else {
        html.setAttribute('font-style', font)
    }
}

function changeFontSize(el) {
    const action = el.dataset.resize;
    console.log(action)
    let root = document.querySelector("html"),
        style = window.getComputedStyle(root, null).getPropertyValue('font-size'),
        fontSize = parseFloat(style);
    if (action === "+") {
        root.style.fontSize = (fontSize * 1.25) + "px";
    } else {
        root.style.fontSize = (fontSize / 1.25) + "px";
    }
}

function setThemeFromLocalStorage() {
    const value = localStorage.getItem("theme");
    if (value == "light") {
        document.documentElement.setAttribute('theme', 'light');
        localStorage.setItem("theme", "light");
    }
    if (value == "dark") {
        document.documentElement.setAttribute('theme', 'dark');
        localStorage.setItem("theme", "dark");
    }

    const size = localStorage.getItem("fontsize");
    let root = document.querySelector("html"),
        style = window.getComputedStyle(root, null).getPropertyValue('font-size'),
        fontSize = parseFloat(style);
    root.style.fontSize = size;

    const font = localStorage.getItem("fontstyle");
    const html = document.querySelector('html');
    html.setAttribute('font-style', font);
}

function changeColors(el) {
    const html = document.querySelector("html")
    const currentTheme = html.getAttribute('theme')
    const newTheme = el.getAttribute("id")
    html.setAttribute("theme", newTheme)
    localStorage.setItem("theme", newTheme);
}

(function () {
    setThemeFromLocalStorage()
})();