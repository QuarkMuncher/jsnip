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
    unorderedListElements: {
        unorderedListEditorField: '',
        unorderedListAddElementButton: '',
        unorderedListCopyButton: '',
        unorderedListStringForCopy: '',
    },
    unorderedListArray: [],
    /**
     * Updates the code string for unorderedList.unorderedListStringForCopy
     * @return {void} - Returns Nothing
     */
    updateMethod: function() {
        let listCode = '<ul>';
        for (let i = 0; i < unorderedList.unorderedListArray.length; i++) {
            listCode = listCode + `<li>${unorderedList.unorderedListArray[i].value}</li>`;
        }
        listCode = listCode + '</ul>';
        unorderedList.unorderedListElements.unorderedListStringForCopy.innerHTML = listCode;
    },
};

let orderedListElements = {
    orderedListEditorField: '',
    orderedListAddElementButton: '',
    orderedListStringForCopy: '',
    orderedListArray: [],
};

document.addEventListener('DOMContentLoaded', () => {
    findDocumentElements(linkElements);
    findDocumentElements(unorderedList.unorderedListElements);
    findDocumentElements(orderedListElements);

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
        linkElements.linkCopy.classList.add('active');
        window.setTimeout(() => {
            linkElements.linkCopy.classList.remove('active');
        }, 1200);
    });
method
    unorderedList.unorderedListElements.unorderedListAddElementButton.addEventListener('click', e => {
        e.preventDefault();
        addUnorderedListItem();
    });

    unorderedList.unorderedListElements.unorderedListCopyButton.addEventListener('click', () => {
        copyCode(unorderedList.unorderedListElements.unorderedListStringForCopy);
        unorderedList.unorderedListElements.unorderedListCopyButton.classList.add('active');
        window.setTimeout(() => {
            unorderedList.unorderedListElements.unorderedListCopyButton.classList.remove('active');
        }, 1200);
    });

    document.querySelector('.unorderedListElement').addEventListener('input', () => {
        updateElementArray(unorderedList, '.unorderedListElement');
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
    object.unorderedListArray = document.querySelectorAll(cl);
    object.updateMethod();
}

/**
 * Creates a new unordered list item to Editor, and calls updateUnorderedListArray
 * @return {void} - Returns Nothing
 */
function addUnorderedListItem() {
    let inputElement = document.createElement('input');
    inputElement.className = 'uk-input';
    inputElement.classList.add('unorderedListElement');
    let marginElement = document.createElement('div');
    marginElement.className = 'uk-margin';
    marginElement.appendChild(inputElement);
    unorderedList.unorderedListElements.unorderedListEditorField.appendChild(marginElement);
    inputElement.addEventListener('input', () => {
        updateElementArray(unorderedList, '.unorderedListElement');
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
