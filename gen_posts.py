import os
import json

# Thư mục chứa các bài viết
POSTS_DIR = 'posts'

# File output
OUTPUT_FILE = 'posts.json'

def parse_filename(filename):
    # Xóa đuôi .html
    name_without_ext = filename[:-5] if filename.endswith('.html') else filename

    # Cắt ra ngày tháng và tiêu đề
    parts = name_without_ext.split('-', 3)
    if len(parts) >= 4:
        date = '-'.join(parts[:3])
        title = parts[3].replace('-', ' ')
    else:
        date = "1970-01-01"
        title = name_without_ext

    return {
        "filename": filename,
        "title": title,
        "date": date
    }

def generate_posts():
    posts = []
    
    # Lấy tất cả file trong thư mục post
    for filename in os.listdir(POSTS_DIR):
        if filename.endswith('.html'):
            post_info = parse_filename(filename)
            posts.append(post_info)

    # Sắp xếp bài mới nhất lên trước
    posts.sort(key=lambda x: x['date'], reverse=True)

    # Ghi ra file JSON
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    print(f'Đã tạo file {OUTPUT_FILE} thành công với {len(posts)} bài viết.')

if __name__ == "__main__":
    generate_posts()
