const postsPerPage = 10;
let currentPage = 1;
let allPosts = [];      // Toàn bộ posts
let filteredPosts = []; // Posts sau khi filter

// Hàm render bài viết dựa trên filteredPosts và currentPage
function renderPosts() {
  const postsList = document.getElementById('posts-list');
  postsList.innerHTML = ''; // Xoá cũ

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pagePosts = filteredPosts.slice(start, end);

  pagePosts.forEach(post => {
    const item = document.createElement('div');
    item.className = 'post-item';
    item.innerHTML = `
      <a href="post/${encodeURIComponent(post.filename)}" target="_blank">${post.title}</a>
      <span class="date">${post.date}</span>
    `;
    postsList.appendChild(item);
  });

  renderPagination();
}

// Hàm render controls pagination
function renderPagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  if (totalPages <= 1) return; // Nếu chỉ 1 trang thì không hiện controls

  const prev = document.createElement('button');
  prev.textContent = 'Previous';
  prev.disabled = currentPage === 1;
  prev.onclick = () => {
    currentPage--;
    renderPosts();
  };

  const next = document.createElement('button');
  next.textContent = 'Next';
  next.disabled = currentPage === totalPages;
  next.onclick = () => {
    currentPage++;
    renderPosts();
  };

  // Hiển thị số trang
  const info = document.createElement('span');
  info.textContent = ` Page ${currentPage} of ${totalPages} `;

  pagination.append(prev, info, next);
}

// Hàm áp filter dựa trên ô tìm kiếm và reset trang
function applySearchFilter() {
  const keyword = document.getElementById('search-input').value.trim().toLowerCase();
  if (keyword === '') {
    filteredPosts = allPosts;
  } else {
    filteredPosts = allPosts.filter(p =>
      p.title.toLowerCase().includes(keyword)
    );
  }
  currentPage = 1;
  renderPosts();
}

// Load posts.json, thiết lập allPosts và filteredPosts ban đầu
fetch('/posts.json')
  .then(res => {
    if (!res.ok) throw new Error('Không thể tải danh sách bài viết.');
    return res.json();
  })
  .then(data => {
    allPosts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    filteredPosts = allPosts;

    // Thiết lập listener cho ô tìm kiếm
    document.getElementById('search-input')
      .addEventListener('input', applySearchFilter);

    // Render lần đầu
    renderPosts();
  })
  .catch(err => {
    console.error(err);
  });
