// Replace with your DeepSeek API key
const DEEPSEEK_API_KEY = 'sk-4c024ef4c78744b5b3e1909e643a0794';

// DeepSeek API endpoint
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// Sample blog posts data (can be replaced with AI-generated content)
let blogPosts = [
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

// Function to generate blog content using DeepSeek API
async function generateBlogContent(prompt) {
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat', // Specify the model
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500, // Adjust as needed
        temperature: 0.7 // Adjust creativity level
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content; // Extract generated content
  } catch (error) {
    console.error('Error generating blog content:', error);
    return null;
  }
}

// Function to update the blog with new AI-generated content
async function updateBlog() {
  const prompt = "Write a blog post about the benefits of video games.";
  const newContent = await generateBlogContent(prompt);

  if (newContent) {
    // Add the new post to the blogPosts array
    blogPosts.unshift({
      title: "New Post: The Benefits of Video Games",
      content: newContent
    });

    // Display the updated posts
    displayPosts();
  }
}

// Add event listener to the "Generate Blog" button
document.getElementById('generate-blog-button').addEventListener('click', updateBlog);

// Display initial posts when the page loads
window.onload = displayPosts;
