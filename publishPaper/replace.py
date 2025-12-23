import re
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import os

load_dotenv("../.env")

paperId = int(os.getenv("VUE_APP_PAPER_ID", 0))

with open("D:\\HakkaNCU\\papers\\468_NCU\\中央大學電子報.html", "r", encoding="utf-8") as file:
    html_content = file.read()

# 定義要查找並取代的文字對
replacements = {
    r"http://localhost:8080/": "http://hakka.ncu.edu.tw/",
    r"./中央大學電子報_files/saved_resource": "https://www.f-counter.net/j/66/1758160903/", # 免費計數器
    r"./中央大學電子報_files/image": f"http://hakka.ncu.edu.tw/Hakka_ePaper/paper/paper{paperId}/img/image", # 圖片
    r"./中央大學電子報_files/TOP": f"http://hakka.ncu.edu.tw/Hakka_ePaper/paper/paper{paperId}/img/TOP",
    r"./中央大學電子報_files/facebook512.png": "http://hakka.ncu.edu.tw/Hakka_ePaper/paper/social/facebook512.png",
    r"./中央大學電子報_files/twitter512.png": "http://hakka.ncu.edu.tw/Hakka_ePaper/paper/social/twitter512.png",
    r"./中央大學電子報_files/line512.png": "http://hakka.ncu.edu.tw/Hakka_ePaper/paper/social/line512.png",
    r"./中央大學電子報_files": f"http://hakka.ncu.edu.tw/Hakka_ePaper/paper/paper{paperId}",
    r'<div class="col-sm-11 col-md-6 tl-left">': '<div class="col-sm-11 col-md-6 tl-left media-pic">',
    r"col-sm-11 col-md-6 tl-left align-items-center d-flex": "col-sm-11 col-md-6 tl-left align-items-center d-flex media-test"
    # 可以根據需要添加更多的替換對
}
for old_text, new_text in replacements.items():
    html_content = html_content.replace(old_text,new_text)

css_pattern = re.compile(r'\.cover-content \{[^}]+\}')
css_replacement = """.cover-content {
    margin: 17px 28px !important;
    display: block !important;
    content: "";
    clear: both;
    overflow: auto;
}
.media-pic {
    min-width: 280px;
    float: left;
}

.media-test {
    width: auto;
    min-width: 50%;
}
"""
html_content = css_pattern.sub(css_replacement, html_content)


# 將修改後的 HTML 寫回檔案
with open("D:\\HakkaNCU\\papers\\468_NCU\\中央大學電子報_modified.html", "w", encoding="utf-8") as file:
    file.write(html_content)

print("多對文字取代完成")