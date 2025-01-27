// Sample blog posts data (can be replaced with AI-generated content)
const blogPosts = [
  {
    title: "The Art of Minimalism",
    content: "Minimalism is about focusing on what truly matters and removing the unnecessary. It's a lifestyle that promotes clarity and purpose."
  },
  {
    title: "Why Simplicity is Key",
    content: "Simplicity allows us to reduce stress, increase productivity, and find joy in the little things. It's a powerful tool for modern living."
  }
];

// Function to display blog posts
function displayPosts() {
  const postsContainer = document.getElementById('posts-container');
  postsContainer.innerHTML = ''; // Clear existing content

  blogPosts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const postTitle = document.createElement('h3');
    postTitle.textContent = post.title;

    const postContent = document.createElement('p');
    postContent.textContent = post.content;

    postElement.appendChild(postTitle);
    postElement.appendChild(postContent);
    postsContainer.appendChild(postElement);
  });
}

// Display posts when the page loads
window.onload = displayPosts;
