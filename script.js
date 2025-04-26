  fetch("https://wal-liu.github.io/Blogs/posts.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Không thể tải danh sách bài viết.");
    }
    return response.json();
  })
  .then(posts => {
    const postsList = document.getElementById('posts-list');

    // Sắp xếp bài mới nhất lên đầu
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    posts.forEach(post => {
      const item = document.createElement('div');
      item.className = 'post-item';
      
      item.innerHTML = `
        <a href="post/${post.filename}" target="_blank">${post.title}</a>
        <span class="date">${post.date}</span>
      `;
      
      postsList.appendChild(item);
    });
  })
  .catch(error => {
    console.error(error);
  });
