require('dotenv').config();
const fs = require('fs');
const path = require('path');

const createRedirectPage = () => {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Redirecting...</title>
    <script type="text/javascript">
    window.onload = function() {
      // 獲取當前URL
      var currentUrl = window.location.href;
  
      // 移除URL末尾的斜杠（如果存在）
      currentUrl = currentUrl.endsWith('/') ? currentUrl.slice(0, -1) : currentUrl;
  
      // 通過分割URL並移除最後一部分來找到父目錄
      var parentUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
  
      // 重定向到父目錄
      window.location.href = parentUrl;
  }
  
    </script>
</head>
<body>
    <p>Redirecting... <a href="/">Click here if you are not redirected.</a></p>
</body>
</html>`;
};

const mainDirectory = 'public/'; // 將路徑設置為public資料夾下的paper4000
const subPageCount = process.env.VUE_APP_PAPER_COUNT; // 根據需要生成的子頁面數量進行調整
console.log(subPageCount)
for (let i = 1; i <= subPageCount; i++) {
  const subPageName = `public/${process.env.VUE_APP_PAPER_ID}-${i}.html`;
  fs.writeFileSync(subPageName, createRedirectPage());
  console.log(`Redirect page created for /${mainDirectory}/${subPageName}`);
}