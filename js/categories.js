import { getAllCategories } from './api.js';

function displayCategories() {
    getAllCategories()
        .then(response => {
            const categories = response.data;

            const categoriesContainer = document.getElementById('categories');
            categoriesContainer.innerHTML = '';

            categories.forEach(category => {
                const categoryElement = document.createElement('button'); // Use button element
                categoryElement.textContent = category.title;
                categoryElement.className = 'category';

                categoryElement.style.color = category.text_color;
                categoryElement.style.backgroundColor = category.background_color;

                // Add a click event listener to filter products by category
                categoryElement.addEventListener('click', () => {
                    filterProductsByCategory(category.title);
                });

                categoriesContainer.appendChild(categoryElement);
            });
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
}

displayCategories();
