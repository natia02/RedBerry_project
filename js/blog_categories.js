import { getAllCategories } from './api.js';

let selectedCategories = [];

function displayCategoriesInSelect() {
    const categoryContainer = document.getElementById('categoryContainer');
    
    getAllCategories()
        .then(response => {
            const categories = response.data;

            categories.forEach(category => {
                const label = document.createElement('label');
                label.className = 'checkbox-label';
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = category.title;
                checkbox.dataset.backgroundColor = category.background_color; // Set the data attribute
                checkbox.dataset.textColor = category.text_color; // Set the data attribute
                checkbox.onchange = function () {
                    updateSelectedOptions(this);
                };
                const span = document.createElement('span');
                span.textContent = category.title;
                label.style.backgroundColor = category.background_color;
                label.style.color = category.text_color;
                label.style.padding = '5px 10px';
                label.style.margin = '5px 0';
                label.style.width = '90%';
                label.style.borderRadius = '12px';

                label.appendChild(checkbox);
                label.appendChild(span);
                categoryContainer.appendChild(label);
            }); 

            restoreSelectedCategories();

        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
}


function restoreSelectedCategories() {
    const savedCategories = JSON.parse(sessionStorage.getItem('selectedCategories')) || [];
    const checkboxes = document.querySelectorAll('.checkbox-container input');

    checkboxes.forEach(checkbox => {
        if (savedCategories.includes(checkbox.value)) {
            checkbox.checked = true;
            updateSelectedOptions(checkbox); // This will update the UI
        }
    });
}



displayCategoriesInSelect();

