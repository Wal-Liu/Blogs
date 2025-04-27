fetch("https://wal-liu.github.io/Blogs/posts.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Không thể tải danh sách bài viết.");
    }
    return response.json();
  })
  .then(posts => {
    const postsList = document.getElementById('posts-list');
    const searchInput = document.getElementById('search-input');

    // Sắp xếp bài mới nhất lên đầu
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Render bài viết
    function renderPosts(filteredPosts) {
      postsList.innerHTML = '';
      filteredPosts.forEach(post => {
        const item = document.createElement('div');
        item.className = 'post-item';
        
        item.innerHTML = `
          <a href="post/${post.filename}" target="_blank">${post.title}</a>
          <span class="date">${post.date}</span>
        `;
        
        postsList.appendChild(item);
      });
    }

    renderPosts(posts);

    // Thêm tìm kiếm
    searchInput.addEventListener('input', () => {
      const keyword = searchInput.value.toLowerCase();
      const filtered = posts.filter(post => post.title.toLowerCase().includes(keyword));
      renderPosts(filtered);
    });

  })
  .catch(error => {
    console.error(error);
  });
