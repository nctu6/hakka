<template>
    <div bordercolor="#FFFFFF" class="tl-left cover-content" style="color:#be369b;">
        <p><span class="bottom-text " >其他：藝文活動、客家新聞彙編等精彩內容，</span>
            <a style="color:#be369b" :href="`http://hakka.ncu.edu.tw/Hakka_ePaper/paper/paper${paperId}/${paperId}.pdf`">[請點此處]</a></p>
        <p>
            <span class="bottom-text">閱讀客語文章，建議先安裝<a style="color:#be369b" href="http://language.moe.gov.tw/result.aspx?classify_sn=42&amp;subclassify_sn=447&amp;thirdclassify_sn=479">教育部最新客家語拼音輸入法(1.2.90版)</a>，或直接</span>
            <a style="color:#be369b" :href="`http://hakka.ncu.edu.tw/Hakka_ePaper/paper/paper${paperId}/${paperId}.pdf`">[請點此處]</a><span class="bottom-text">閱讀PDF檔。</span></p>
    </div>
    <br>
    <br>
    <br>
    <div class="bg_light mid-content">
        <h3 class="banner-title-email">
            歡迎投稿中央大學 <br> 客家學院電子報
        </h3>
        <div class="" style="display:inline-block; margin: 0px 5px;">
            <a href="mailto:ncu33480@ncu.edu.tw" class="bottom-btn btn">
                投稿信箱
            </a>
        </div>
        <div class="" style="display:inline-block">
            <a href="http://hakka.ncu.edu.tw/Hakka_ePaper/paper/call-for-articles.html" target="_blank" class="bottom-btn btn">
                徵稿辦法
            </a>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'HomeBottom',
    data() {
        return {
            paperId: process.env.VUE_APP_PAPER_ID
        }
    },
}
</script>
<style scoped>
.bottom-text {
    color: gray;
    font: 15px;
    font-weight: bold;
}

.bg_light {
    background: #fdf8fa;
}

.mid-content {
    padding: 4em 2em;
    text-align: left;
    width: 50%;
    margin: 0px auto;
}

h3.banner-title-email {
    font-size: 22px;
    line-height: 30px;
    font-weight: bold;
    margin: 0px 0px 20px 0px;
}

.bottom-btn {
    color:#fff;
    text-decoration:none;
    font-weight:600;
    display:inline-block;
    padding:10px 20px;
    font-size: 16px;
    border-radius:26px;
    background:#be369b;
    border:2px solid#be369b;
    text-transform:capitalize;
}

@media screen and (max-width:736px) {
    .mid-content {
        padding: 3em 1.5em;
        width: 70%;
    }
}
</style>
  