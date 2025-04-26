import os
import json
from datetime import datetime

def generate_posts_list(posts_dir='posts', output_file='posts.json'):
    posts = []
    for filename in os.listdir(posts_dir):
        if filename.endswith('.html'):
            try:
                # filename mẫu: 2025-04-01-Bài Tập Week 1 - Module 1.html
                date_str, title_raw = filename.split('-', 3)[0:3], filename.split('-', 3)[3]
                date_str = '-'.join(date_str)
                title = title_raw.replace('.html', '').strip()
                date = datetime.strptime(date_str, "%Y-%m-%d")
                posts.append({
                    'filename': filename,
                    'title': title,
                    'date': date.strftime("%Y-%m-%d")
                })
            except Exception as e:
                print(f"Error processing file {filename}: {e}")

    # Sort bài viết theo ngày mới nhất
    posts.sort(key=lambda x: x['date'], reverse=True)

    # Ghi ra posts.json
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    generate_posts_list()
