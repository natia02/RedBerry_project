const apiBaseUrl = 'https://api.blog.redberryinternship.ge/api';
const token = "65bd9757df5fb7619a26360dce871f5f007d9bb57722375284a8b098285269cc";


function createBlog(blogData) {
  return fetch(`${apiBaseUrl}/blogs`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(blogData)
  })
  .then(response => response.json());
}


function getAllBlogs() {
  return fetch(`${apiBaseUrl}/blogs`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.json());
}


function getAllCategories() {
    return fetch(`${apiBaseUrl}/categories`, {
        headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => response.json());
}


function validateEmail(email) {
  return fetch(`${apiBaseUrl}/login`, {  
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email })
  })
  .then(response => {
    if (response.status === 204) {
      // User logged in successfully (status 204)
      return { success: true, message: 'User logged in successfully' };
    } else if (response.status === 422) {
      // Invalid email (status 422)
      return { success: false, message: 'Invalid email' };
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .catch(error => {
    // Handle other errors
    return { success: false, message: 'Network error' };
  });
}





export { createBlog, validateEmail, getAllBlogs, getAllCategories, apiBaseUrl };