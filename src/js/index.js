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
    el.innerHTML = `
    <button data-naked="true" aria-expanded="false">${el.textContent} &#43; </button>`;
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
    wrapper.setAttribute("class", "flow")

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