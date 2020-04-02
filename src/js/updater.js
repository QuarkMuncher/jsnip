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

//  Unordered List section
let unorderedListElements = {
    unorderedListEditorField: '',
    unorderedListAddElementButton: '',
    unorderedListStringForCopy: '',
};
let unorderedListArray = [];

document.addEventListener('DOMContentLoaded', () => {
    findDocumentElements(linkElements);
    findDocumentElements(unorderedListElements);

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

    unorderedListElements.unorderedListAddElementButton.addEventListener('click', e => {
        e.preventDefault();
        addUnorderedListItem();
    });

    document.querySelector('.unorderedListElement').addEventListener('input', () => {
        updateUnorderedListArray();
    });
});

function updateLink() {
    let linkTargetBlankValue = '';
    if (linkState.linkTargetBlank) linkTargetBlankValue = 'target="_blank"';
    linkElements.linkStringForCopy.value = `<a href="${linkState.linkWebAddressInput}" ${linkTargetBlankValue}>${linkState.linkContentString}</a>`;
}

function updateUnorderedListCode() {
    let listCode = '<ul>';
    for (let i = 0; i < unorderedListArray.length; i++) {
        listCode = listCode + `<li>${unorderedListArray[i].value}</li>`;
    }
    listCode = listCode + '</ul>';
    unorderedListElements.unorderedListStringForCopy.innerHTML = listCode;
}

function updateUnorderedListArray() {
    unorderedListArray = document.querySelectorAll('.unorderedListElement');
    updateUnorderedListCode();
}

function addUnorderedListItem() {
    let inputElement = document.createElement('input');
    inputElement.className = 'uk-input';
    inputElement.classList.add('unorderedListElement');
    inputElement.addEventListener('input', () => {
        updateUnorderedListCode();
    });
    let marginElement = document.createElement('div');
    marginElement.className = 'uk-margin';
    marginElement.appendChild(inputElement);
    unorderedListElements.unorderedListEditorField.appendChild(marginElement);
    updateUnorderedListArray();
}

function copyCode(target) {
    target.select();
    document.execCommand('copy');
}

function findDocumentElements(object) {
    for (let prop in object) {
        if (object.hasOwnProperty(prop)) {
            object[prop] = document.querySelector(`#${prop}`);

        }
    }
}