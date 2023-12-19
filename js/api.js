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

export { createBlog, getAllBlogs, getAllCategories };