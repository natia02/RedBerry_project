function triggerFileInput() {
    document.getElementById('image').click();
}

function handleFileSelection(input) {
    displayFileName(input);
}

function displayFileName(input) {
    const fileName = input.files[0].name;
    document.getElementById('img-name').innerHTML = fileName;
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
        displayFileName(files[0]);
    }

    // Remove styles added for visual feedback when dropping if needed
    // For example: document.getElementById('img-container').classList.remove('drag-over');
}
