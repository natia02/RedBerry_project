document.addEventListener('DOMContentLoaded', function () {
    var today = new Date().toISOString().split('T')[0];
    document.getElementById('post-date').setAttribute('min', today);
    const savedData = sessionStorage.getItem('blogFormData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);

        document.getElementById('author').value = parsedData.author || '';
        document.getElementById('email').value = parsedData.email || '';
        document.getElementById('title').value = parsedData.title || '';
        document.getElementById('description').value = parsedData.description || '';
        document.getElementById('post-date').value = parsedData.postDate || '';

        if (parsedData.imgDataUrl && parsedData.fileName) {
            updateImageUI(parsedData.fileName, parsedData.imgDataUrl);
        }

        if(parsedData.author !== ''){
            validateAuthor();
        }
        if(parsedData.title !== ''){
            validateTitle();
        }
        if(parsedData.description !== ''){
            validateDescription();
        }
        if(parsedData.email !== ''){
            validateEmail();
        }
        if(parsedData.postDate !== ''){
            validatePostDate();
        }

        validateAll();
    }
});



document.addEventListener('DOMContentLoaded', function () {
    // ... (existing code)

    const authorInput = document.getElementById('author');
    const titleInput = document.getElementById('title');
    const emailInput = document.getElementById('email');
    const descriptionInput = document.getElementById('description');
    const postDateInput = document.getElementById('post-date');

    authorInput.addEventListener('input', function () {
        validateAuthor();
        validateAll();
    });

    titleInput.addEventListener('input', function () {
        validateTitle();
        validateAll();
    });

    emailInput.addEventListener('input', function () {
        validateEmail();
        validateAll();
    });

    descriptionInput.addEventListener('input', function () {
        validateDescription();
        validateAll();
    });

    postDateInput.addEventListener('input', function () {
        validatePostDate();
        validateAll();
    });

});

function validateImageUpload() {
    const savedData = JSON.parse(sessionStorage.getItem('blogFormData')) || {};
    const imgDataUrl = savedData.imgDataUrl;
    
    return !!imgDataUrl; // Returns true if imgDataUrl is truthy (image uploaded), false otherwise
}

function boolValidateAuthor() {
    const authorInput = document.getElementById('author');
    
    const authorValue = authorInput.value.trim();

    const isLengthValid = authorValue.length >= 4;
    const isWordCountValid = authorValue.split(' ').filter(Boolean).length >= 2;
    const containsOnlyGeorgian = /^[ა-ჰ\s]+$/.test(authorValue);


    if(isLengthValid && isWordCountValid && containsOnlyGeorgian) {
        return true;
    }else{
        return false;
    }
}



function validateAuthor() {
    const authorInput = document.getElementById('author');
    const authorMessage1 = document.getElementById('message1');
    const authorMessage2 = document.getElementById('message2');
    const authorMessage3 = document.getElementById('message3');

    const authorValue = authorInput.value.trim();

    // Validation rules for author
    const isLengthValid = authorValue.length >= 4;
    const isWordCountValid = authorValue.split(' ').filter(Boolean).length >= 2;
    const containsOnlyGeorgian = /^[ა-ჰ\s]+$/.test(authorValue);

    if(isLengthValid) {
        authorMessage1.style.color = '#14D81C';
    }else if(!isLengthValid) {
        authorMessage1.style.color = '#EA1919';
        authorInput.style.border = '1px solid #EA1919';
        authorInput.style.backgroundColor = '#Faf2f3';
    }

    if(isWordCountValid) {
        authorMessage2.style.color = '#14D81C';
    }else if(!isWordCountValid) {
        authorMessage2.style.color = '#EA1919';
        authorInput.style.border = '1px solid #EA1919';
        authorInput.style.backgroundColor = '#Faf2f3';
    }

    if(containsOnlyGeorgian) {
        authorMessage3.style.color = '#14D81C';
    }else if(!containsOnlyGeorgian) {
        authorMessage3.style.color = '#EA1919';
        authorInput.style.border = '1px solid #EA1919';
        authorInput.style.backgroundColor = '#Faf2f3';
    }

    if(isLengthValid && isWordCountValid && containsOnlyGeorgian) {
        authorInput.style.border = '1px solid #14D81C';
        authorInput.style.backgroundColor = '#F8FFF8';
    }
    saveFormDataToSessionStorage();

    
}

function boolValidateTitle() {
    const titleInput = document.getElementById('title');

    const titleValue = titleInput.value.trim();

    const isLengthValid = titleValue.length >= 2;
    return isLengthValid;
}

function validateTitle() {
    const titleInput = document.getElementById('title');
    const titleMessage4 = document.getElementById('message4');

    const titleValue = titleInput.value.trim();

    // Validation rule for title
    const isLengthValid = titleValue.length >= 2;

    if(isLengthValid) {
        titleMessage4.style.color = '#14D81C';
        titleInput.style.border = '1px solid #14D81C';
        titleInput.style.backgroundColor = '#F8FFF8';
    }else if(!isLengthValid) {
        titleMessage4.style.color = '#EA1919';
        titleInput.style.border = '1px solid #EA1919';
        titleInput.style.backgroundColor = '#Faf2f3';
    }

    saveFormDataToSessionStorage();
}

function boolValidateEmail() {
    const emailInput = document.getElementById('email');    

    const emailValue = emailInput.value.trim();

    const isValidEmail = /^[^@]+@redberry\.ge$/.test(emailValue);

    if(emailValue === '') {
        return true;
    }

    if(isValidEmail) {
        return true;
    }else if(!isValidEmail) {
        return false;
    
    }

}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailMessage6 = document.getElementById('message6');
    const validationDiv = document.getElementById('validation-message-email');
    

    const emailValue = emailInput.value.trim();

    const isValidEmail = /^[^@]+@redberry\.ge$/.test(emailValue);

    if(emailValue === '') {
        validationDiv.style.display = 'none';
        emailMessage6.style.color = '#14D81C';
        emailInput.style.border = '1px solid #14D81C';
        emailInput.style.backgroundColor = '#F8FFF8';
    }

    if(isValidEmail) {
        validationDiv.style.display = 'none';
        emailMessage6.style.color = '#14D81C';
        emailInput.style.border = '1px solid #14D81C';
        emailInput.style.backgroundColor = '#F8FFF8'; 
    }else if(!isValidEmail) {
        validationDiv.style.display = 'block';
        emailMessage6.style.color = '#EA1919';
        emailInput.style.border = '1px solid #EA1919';
        emailInput.style.backgroundColor = '#Faf2f3';
    
    }

    saveFormDataToSessionStorage();

}

function boolValidateDescription() {
    const descriptionInput = document.getElementById('description');

    const descriptionValue = descriptionInput.value.trim();

    const isLengthValid = descriptionValue.length >= 4;

    return isLengthValid;
    
}

function validateDescription() {
    const descriptionInput = document.getElementById('description');
    const descriptionMessage5 = document.getElementById('message5');

    const descriptionValue = descriptionInput.value.trim();

    const isLengthValid = descriptionValue.length >= 4;

    if(isLengthValid) {
        descriptionMessage5.style.color = '#14D81C';
        descriptionInput.style.border = '1px solid #14D81C';
        descriptionInput.style.backgroundColor = '#F8FFF8';
        
    }else if(!isLengthValid) {
        descriptionMessage5.style.color = '#EA1919';
        descriptionInput.style.border = '1px solid #EA1919';
        descriptionInput.style.backgroundColor = '#Faf2f3';
    }
    
    saveFormDataToSessionStorage();
}

function boolValidatePostDate() {
    const postDateInput = document.getElementById('post-date');

    const postDateValue = postDateInput.value.trim();


    const isValidDate = Date.parse(postDateValue);

    return isValidDate;
    
}


function validatePostDate() {
    const postDateInput = document.getElementById('post-date');

    const postDateValue = postDateInput.value.trim();


    const isValidDate = Date.parse(postDateValue);

    if(isValidDate) {
        postDateInput.style.border = '1px solid #14D81C';
        postDateInput.style.backgroundColor = '#F8FFF8';
    }else if(!isValidDate) {
        postDateInput.style.border = '1px solid #EA1919';
        postDateInput.style.backgroundColor = '#Faf2f3';
    }

    saveFormDataToSessionStorage();
    
}

function boolValidateCategories() {
    const selectedCategories = document.querySelectorAll('.selected-item');

    return !(selectedCategories.length === 0);
}



function validateCategories() {
    const selectedCategories = document.querySelectorAll('.selected-item');
    const categoryContainer = document.getElementById('dropdown-container');

    if (selectedCategories.length === 0) {
        categoryContainer.style.border = '1px solid #EA1919';
        categoryContainer.style.backgroundColor = '#Faf2f3';
    } else {
        categoryContainer.style.border = '1px solid #14D81C';
        categoryContainer.style.backgroundColor = '#F8FFF8';
    }

    saveFormDataToSessionStorage();
}


function validateAll() {
    const isAuthorValid = boolValidateAuthor();
    const isTitleValid = boolValidateTitle();
    const isEmailValid = boolValidateEmail();
    const isDescriptionValid = boolValidateDescription();
    const isPostDateValid = boolValidatePostDate();
    const areCategoriesValid = boolValidateCategories();
    const isImageUploaded = validateImageUpload();
    
    const publishButton = document.getElementById('publish');
    publishButton.disabled = !(isImageUploaded && isAuthorValid && isTitleValid && isEmailValid && isDescriptionValid && isPostDateValid && areCategoriesValid);
}


function saveFormDataToSessionStorage() {
    const authorInput = document.getElementById('author');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const emailInput = document.getElementById('email');
    const existingData = JSON.parse(sessionStorage.getItem('blogFormData')) || {};
    const postDateInput = document.getElementById('post-date');


    // Merge new data with existing data
    const dataToSave = {
        ...existingData,
        author: authorInput.value,
        email: emailInput.value,
        title: titleInput.value,
        description: descriptionInput.value,
        postDate: postDateInput.value,
    };

    sessionStorage.setItem('blogFormData', JSON.stringify(dataToSave));
}

function triggerFileInput() {
    document.getElementById('image').click();
}

function handleFileSelection(input) {
    const files = input.files;
    if (files.length > 0) {
        displayUploadedFile(files[0]);
    }
}

function displayUploadedFile(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const imgDataUrl = e.target.result;
        const fileName = file.name;
        const existingData = JSON.parse(sessionStorage.getItem('blogFormData')) || {};

        // Save the Data URL and other data to sessionStorage
        const dataToSave = {
            ...existingData,
            fileName: fileName,
            uploadedDivDisplay: 'flex',
            imgContainerDisplay: 'none',
            imgDataUrl: imgDataUrl, // Save the Data URL
        };

        sessionStorage.setItem('blogFormData', JSON.stringify(dataToSave));

        // Update UI with new image and attach event listeners
        updateImageUI(fileName, imgDataUrl);
    };
    reader.readAsDataURL(file);
}

function updateImageUI(fileName, imgDataUrl) {
    document.getElementById('img-name').innerHTML = fileName;
    const uploadedDiv = document.getElementById('uploaded');
    uploadedDiv.style.display = 'flex';
    const imgContainer = document.getElementById('img-container');
    imgContainer.style.display = 'none';

    // Attach event listeners to the new elements
    const galleryIcon = document.getElementById('gallery');
    galleryIcon.addEventListener('click', function () {
        openImageInNewTab(imgDataUrl);
    });
    validateAll();

    const imgName = document.getElementById('img-name');
    imgName.addEventListener('click', function () {
        openImageInNewTab(imgDataUrl);
    });
}

function openImageInNewTab(imgDataUrl) {
    const newTab = window.open();
    newTab.document.write('<img src="' + imgDataUrl + '" alt="Uploaded Image">');
}

function removeImage() {
    const imgContainer = document.getElementById('img-container');
    const uploadedDiv = document.getElementById('uploaded');
    const fileInput = document.getElementById('image');

    document.getElementById('img-name').innerHTML = '';
    uploadedDiv.style.display = 'none';
    imgContainer.style.display = 'flex';

    // Update sessionStorage with the removed image
    const existingData = JSON.parse(sessionStorage.getItem('blogFormData')) || {};
    const dataToSave = {
        ...existingData,
        fileName: '',
        uploadedDivDisplay: 'none',
        imgContainerDisplay: 'flex',
        imgDataUrl: '', // Remove the Data URL
    };
    sessionStorage.setItem('blogFormData', JSON.stringify(dataToSave));
    validateAll();
    fileInput.value = '';
}

function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
}

function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        displayUploadedFile(files[0]);
    }
}




function toggleDropdown() {
    const checkboxContainer = document.querySelector('.checkbox-container');
    checkboxContainer.style.display = (checkboxContainer.style.display === 'none' || checkboxContainer.style.display === '') ? 'block' : 'none';
}

function updateSelectedOptions(checkbox) {
    const selectedOptions = document.querySelector('.selected-options');
    const placeholder = selectedOptions.querySelector('.placeholder');
    if (checkbox.checked) {
        const selectedValue = checkbox.value;
        const backgroundColor = checkbox.getAttribute('data-background-color');
        const textColor = checkbox.getAttribute('data-text-color');
        const selectedItem = document.createElement('div');
        selectedItem.className = 'selected-item';
        selectedItem.style.backgroundColor = backgroundColor;
        selectedItem.style.color = textColor;
        selectedItem.style.fontSize = '16px';
        selectedItem.style.fontWeight = '500';      
        selectedItem.innerHTML = `
            <span >${selectedValue}</span>
            <span class="close-button" onclick="unselectItem(this)">&times;</span>
        `;
        selectedOptions.insertBefore(selectedItem, placeholder);
        placeholder.style.display = 'none';
    } else {
        const selectedItems = document.querySelectorAll('.selected-item');
        selectedItems.forEach(item => {
            if (item.firstChild.textContent === checkbox.value) {
                item.remove();
            }
        });
        const remainingItems = document.querySelectorAll('.selected-item');
        if (remainingItems.length === 0) {
            placeholder.style.display = 'inline-block';
        }
    }
    saveSelectedCategoriesToSessionStorage();
    validateAll();
}

function unselectItem(closeButton) {
    const selectedOptions = document.querySelector('.selected-options');
    const itemToRemove = closeButton.parentNode;
    const selectedValueElement = itemToRemove.querySelector('span'); // Adjust this based on your HTML structure

    if (selectedValueElement) {
        const valueToRemove = selectedValueElement.textContent.trim();

        const checkboxes = document.querySelectorAll('.checkbox-container input');
        checkboxes.forEach(checkbox => {
            if (checkbox.value.trim().toLowerCase() === valueToRemove.toLowerCase()) {
                checkbox.checked = false;
            }
        });

        itemToRemove.remove();

        const remainingItems = document.querySelectorAll('.selected-item');
        if (remainingItems.length === 0) {
            selectedOptions.querySelector('.placeholder').style.display = 'inline-block';
        }

        saveSelectedCategoriesToSessionStorage();
    } else {
        console.error('Selected value element not found.');
    }
}



function saveSelectedCategoriesToSessionStorage() {
    const selectedCategories = [];
    const checkboxes = document.querySelectorAll('.checkbox-container input:checked');
    checkboxes.forEach(checkbox => {
        selectedCategories.push({
            id: checkbox.id,
            value: checkbox.value,
            backgroundColor: checkbox.getAttribute('data-background-color'),
            textColor: checkbox.getAttribute('data-text-color'),
        });
    });

    validateCategories();
    validateAll();
    sessionStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
}
