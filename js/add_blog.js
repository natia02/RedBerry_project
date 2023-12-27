document.addEventListener('DOMContentLoaded', function () {
    const savedData = sessionStorage.getItem('blogFormData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);

        // Populate form fields with saved data
        document.getElementById('author').value = parsedData.author || '';
        document.getElementById('email').value = parsedData.email || '';
        document.getElementById('title').value = parsedData.title || '';
        document.getElementById('description').value = parsedData.description || '';

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
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const authorInput = document.getElementById('author');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const emailInput = document.getElementById('email');

    // Attach input event listeners to the fields
    authorInput.addEventListener('input', validateAuthor);
    titleInput.addEventListener('input', validateTitle);
    descriptionInput.addEventListener('input', validateDescription);
    emailInput.addEventListener('input', validateEmail);
});

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

    // Save data to sessionStorage
    saveFormDataToSessionStorage();
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

    // Save data to sessionStorage
    saveFormDataToSessionStorage();
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailMessage6 = document.getElementById('message6');
    const validationDiv = document.getElementById('validation-message-email');
    

    const emailValue = emailInput.value.trim();

    const isValidEmail = emailValue.endsWith('@redberry.ge');

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

function validateDescription() {
    const descriptionInput = document.getElementById('description');
    const descriptionMessage5 = document.getElementById('message5');

    const descriptionValue = descriptionInput.value.trim();

    // Validation rule for description
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

    // Save data to sessionStorage
    saveFormDataToSessionStorage();
}

function saveFormDataToSessionStorage() {
    const authorInput = document.getElementById('author');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const emailInput = document.getElementById('email');
    const existingData = JSON.parse(sessionStorage.getItem('blogFormData')) || {};

    // Merge new data with existing data
    const dataToSave = {
        ...existingData,
        author: authorInput.value,
        email: emailInput.value,
        title: titleInput.value,
        description: descriptionInput.value,
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