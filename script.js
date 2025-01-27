// Sample blog posts data (can be replaced with AI-generated content)
const blogPosts = [
  async function generateBlogPost(prompt) {
  const response = await fetch('https://api.deepseek.com/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer sk-4c024ef4c78744b5b3e1909e643a0794'
    },
    body: JSON.stringify({ prompt: prompt })
  });
  const data = await response.json();
  return data.content;
}

async function updateBlog() {
  const prompt = "Write a blog post about the benefits of minimalism";
  const newPost = await generateBlogPost(prompt);
  blogPosts.push({ title: "New Post", content: newPost });
  displayPosts();
}

// Call updateBlog() to generate and display new content
updateBlog();

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
