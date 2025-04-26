import os
import json
from datetime import datetime

# Đường dẫn đến thư mục chứa bài viết
posts_dir = 'post'

# List để lưu thông tin bài viết
posts = []

# Lấy danh sách các file trong thư mục /post/
for filename in os.listdir(posts_dir):
    # Kiểm tra chỉ lấy các file .html (hoặc .md nếu bạn dùng markdown)
    if filename.endswith('.html'):
        # Lấy thông tin ngày tháng từ tên file theo cú pháp: yyyy-mm-dd-title.html
        try:
            # Tách ngày tháng ở đầu tên file
            parts = filename.split('-', 3)
            
            # Nếu phần tách được đúng (3 phần còn lại sau yyyy-mm-dd)
            if len(parts) >= 3:
                date_str = '-'.join(parts[:3])  # Chỉ lấy yyyy-mm-dd
                title = filename[10:].replace('.html', '')  # Phần còn lại sau yyyy-mm-dd
                
                # Đảm bảo rằng ngày tháng đúng định dạng
                date_obj = datetime.strptime(date_str, '%Y-%m-%d')

                # Thêm thông tin bài viết vào list
                posts.append({
                    'filename': filename,
                    'title': title,
                    'date': date_obj.strftime('%Y-%m-%d')
                })
        except ValueError:
            print(f"Lỗi phân tích tên file {filename}, bỏ qua.")

# Sắp xếp bài viết theo ngày (mới nhất lên đầu)
posts.sort(key=lambda x: datetime.strptime(x['date'], '%Y-%m-%d'), reverse=True)

# Lưu vào file posts.json
with open('posts.json', 'w') as f:
    json.dump(posts, f, indent=2)

print("Đã tạo file posts.json thành công.")
