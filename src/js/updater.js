// Links section
let linkTarget, linkWebAddressInput, linktext, newtab, linkCopy;
let linkState = {
  linkWebAddressInput: 'Link address',
  linkText: 'This is the displayed text of the link',
  newTab: false
};

//  Unordered List section
let unorderedList, unorderedListEditorField, unorderedListAddButton, unorderedListCopy;
let unorderedListArray = [];

document.addEventListener('DOMContentLoaded', () => {
  // Links section
  linkWebAddressInput = document.querySelector('#linkWebAddressInput');
  linktext = document.querySelector('#linkText');
  newtab = document.querySelector('#newTab');
  linkTarget = document.querySelector('#link');
  linkCopy = document.querySelector('#linkCopy');

  // Unordered List section
  unorderedList = document.querySelector('#unorderedList');
  unorderedListAddButton = document.querySelector('#unorderedListAddButton');
  unorderedListEditorField = document.querySelector(
      '#unorderedListEditorField'
  );
  unorderedListCopy = document.querySelector('#unorderedListCopy');

});

document.addEventListener('DOMContentLoaded', () => {
  // Links sections
  linkWebAddressInput.addEventListener('input', e => {
    linkState.linkWebAddressInput = e.target.value;
    updateLink();
  });

  linktext.addEventListener('input', e => {
    linkState.linkText = e.target.value;
    updateLink();
  });

  newtab.addEventListener('click', e => {
    linkState.newTab = e.target.checked;
    updateLink();
  });

  linkCopy.addEventListener('click', e => {
    copyCode(linkTarget);
    linkCopy.classList.add('active');
    window.setTimeout(() => {
      linkCopy.classList.remove('active');
    }, 1200);
  });

  // Unordered List section
  unorderedListAddButton.addEventListener('click', e => {
    e.preventDefault();
    addUnorderedListItem();
  });

  document.querySelector('.unorderedListElement').addEventListener('input', e => {
    updateUnorderedListArray();
  });
});

// Links section
function updateLink() {
  let newtabvalue = '';
  if (linkState.newTab) newtabvalue = 'target="_blank"';
  linkTarget.value = `<a href="${linkState.linkWebAddressInput}" ${newtabvalue}>${linkState.linkText}</a>`;
}

// Unordered List section
function updateUnorderedListCode() {
  let listCode = '<ul>';
  for (let i = 0; i < unorderedListArray.length; i++) {
    listCode = listCode + `<li>${unorderedListArray[i].value}</li>`;
  }
  listCode = listCode + '</ul>';
  unorderedList.innerHTML = listCode;
}

function updateUnorderedListArray() {
  unorderedListArray = document.querySelectorAll('.unorderedListElement');
  updateUnorderedListCode();
}

function addUnorderedListItem() {
  let inputElement = document.createElement('input');
  inputElement.className = 'uk-input';
  inputElement.classList.add('unorderedListElement');
  inputElement.addEventListener('input', e => {
    updateUnorderedListCode();
  });
  let marginElement = document.createElement('div');
  marginElement.className = 'uk-margin';
  marginElement.appendChild(inputElement);
  unorderedListEditorField.appendChild(marginElement);
  updateUnorderedListArray();
}

// Used for all.
function copyCode(target) {
  target.select();
  document.execCommand('copy');
}
