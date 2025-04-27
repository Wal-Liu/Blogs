const postsPerPage = 10;
let currentPage = 1;
let posts = [];

function renderPosts() {
  const postsList = document.getElementById('posts-list');
  postsList.innerHTML = ''; // Clear cũ

  // Tính index
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const paginatedPosts = posts.slice(start, end);

  paginatedPosts.forEach(post => {
    const item = document.createElement('div');
    item.className = 'post-item';
    
    item.innerHTML = `
      <a href="post/${post.filename}" target="_blank">${post.title}</a>
      <span class="date">${post.date}</span>
    `;
    
    postsList.appendChild(item);
  });

  renderPagination();
}

function renderPagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const prevButton = document.createElement('button');
  prevButton.textContent = 'Previous';
  prevButton.disabled = currentPage === 1;
  prevButton.onclick = () => {
    currentPage--;
    renderPosts();
  };
  pagination.appendChild(prevButton);

  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.disabled = currentPage === totalPages;
  nextButton.onclick = () => {
    currentPage++;
    renderPosts();
  };
  pagination.appendChild(nextButton);
}

fetch("https://blogs.tuongluu.id.vn/Blogs/posts.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Không thể tải danh sách bài viết.");
    }
    return response.json();
  })
  .then(data => {
    posts = data;
    // Sắp xếp mới nhất trước
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    renderPosts();
  })
  .catch(error => {
    console.error(error);
  });
