let linkElements = {
    linkStringForCopy: '',
    linkWebAddressInput: '',
    linkContentString: '',
    linkTargetBlank: '',
    linkCopy: '',
};

let linkState = {
    linkWebAddressInput: 'Link address',
    linkContentString: 'This is the displayed text of the link',
    linkTargetBlank: false
};

let unorderedList = {
    elements: {
        unorderedListEditorField: '',
        unorderedListAddElementButton: '',
        unorderedListExample: '',
        unorderedListCopyButton: '',
        unorderedListStringForCopy: '',
    },
    listArray: [],
    /**
     * Updates the code string for unorderedList.unorderedListStringForCopy
     * @return {void} - Returns Nothing
     */
    updateMethod: function() {
        this.elements.unorderedListExample.innerHTML = '';
        let listCode = '<ul>';
        for (let i = 0; i < this.listArray.length; i++) {
            listCode = listCode + `<li>${this.listArray[i].value}</li>`;
            let liElement = document.createElement('li');
            liElement.innerHTML = this.listArray[i].value;
            this.elements.unorderedListExample.appendChild(liElement);
        }
        listCode = listCode + '</ul>';
        this.elements.unorderedListStringForCopy.innerHTML = listCode;
    },
};

let orderedList = {
    elements: {
        orderedListEditorField: '',
        orderedListAddElementButton: '',
        orderedListExample: '',
        orderedListCopyButton: '',
        orderedListStringForCopy: '',
    },
    listArray: [],
    updateMethod: function() {
        this.elements.orderedListExample.innerHTML = '';
        let listCode = '<ol>';
        for (let i = 0; i < this.listArray.length; i++) {
            listCode = listCode + `<li>${this.listArray[i].value}</li>`;
            let liElement = document.createElement('li');
            liElement.innerHTML = this.listArray[i].value;
            this.elements.orderedListExample.appendChild(liElement);
        }
        listCode = listCode + '</ol>';
        this.elements.orderedListStringForCopy.innerHTML = listCode;
    },
};

document.addEventListener('DOMContentLoaded', () => {
    findDocumentElements(linkElements);
    findDocumentElements(unorderedList.elements);
    findDocumentElements(orderedList.elements);

    linkElements.linkWebAddressInput.addEventListener('input', e => {
        linkState.linkWebAddressInput = e.target.value;
        updateLink();
    });

    linkElements.linkContentString.addEventListener('input', e => {
        linkState.linkContentString = e.target.value;
        updateLink();
    });

    linkElements.linkTargetBlank.addEventListener('click', e => {
        linkState.linkTargetBlank = e.target.checked;
        updateLink();
    });

    linkElements.linkCopy.addEventListener('click', () => {
        copyCode(linkElements.linkStringForCopy);
    });

    unorderedList.elements.unorderedListAddElementButton.addEventListener('click', e => {
        e.preventDefault();
        addListItem(unorderedList, unorderedList.elements.unorderedListEditorField, 'unorderedListElement');
    });

    unorderedList.elements.unorderedListCopyButton.addEventListener('click', () => {
        copyCode(unorderedList.elements.unorderedListStringForCopy);
    });

    document.querySelector('.unorderedListElement').addEventListener('input', () => {
        updateElementArray(unorderedList, '.unorderedListElement');
    });

    orderedList.elements.orderedListAddElementButton.addEventListener('click', e=> {
        e.preventDefault();
        addListItem(orderedList, orderedList.elements.orderedListEditorField, 'orderedListElement');
    });

    orderedList.elements.orderedListCopyButton.addEventListener('click', () => {
       copyCode(orderedList.elements.orderedListStringForCopy);
    });

    document.querySelector('.orderedListElement').addEventListener('input', () => {
        updateElementArray(orderedList, '.orderedListElement');
    });
});

/**
 * Updates the code string for linkElements.linkStringForCopy
 * @return {void} - Returns Nothing
 */
function updateLink() {
    let linkTargetBlankValue = '';
    if (linkState.linkTargetBlank) linkTargetBlankValue = 'target="_blank"';
    linkElements.linkStringForCopy.value = `<a href="${linkState.linkWebAddressInput}" ${linkTargetBlankValue}>${linkState.linkContentString}</a>`;
}

/**
 * A function that updates an array of elements
 * @param {object} object - name of the array
 * @param {string} cl - classname to query the tree for
 */
function updateElementArray(object, cl) {
    object.listArray = document.querySelectorAll(cl);
    object.updateMethod();
}

/**
 * Creates a new list item to Editor, and calls updateElementArray
 * @param {object} parentObject - The parent object, needed in updateElementArray call
 * @param {object} object - The editorField Object
 * @param {string} cl - String containing the desired classname
 * @return {void} - Returns Nothing
 */
function addListItem(parentObject, object, cl) {
    let inputElement = document.createElement('input');
    inputElement.className = 'uk-input';
    inputElement.classList.add(cl);
    let marginElement = document.createElement('div');
    marginElement.className = 'uk-margin';
    marginElement.appendChild(inputElement);
    object.appendChild(marginElement);
    inputElement.addEventListener('input', () => {
        updateElementArray(parentObject, `.${cl}`);
    });
}

/**
 * Copies the content of an element
 * @param {object} target - The element to be selected.
 * @return {void} - Returns Nothing
 */
function copyCode(target) {
    target.select();
    document.execCommand('copy');
}

/**
 * Finds the identified HTML Elements.
 * @param {object} object - Object containing all the html elements.
 */
function findDocumentElements(object) {
    for (let prop in object) {
        if (object.hasOwnProperty(prop)) {
            object[prop] = document.querySelector(`#${prop}`);
        }
    }
}
