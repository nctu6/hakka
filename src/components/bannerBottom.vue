<template>
    <div class="w3l bottom-picture">
        <div class="overlay-w3l mid-content">
            <p class="bottom-para">
                <a> ◆ 發行單位&emsp;／ 國立中央大學客家學院</a> <br>
                <a> ◆ 榮譽發行人／ 周景揚校長</a> <br>
                <a> ◆ 發&emsp;行&emsp;人／ 鍾國允院長</a> <br>
                <a> ◆ 編輯顧問&emsp;／
                    王保鍵老師、周錦宏老師、<br>
                    &emsp;姜貞吟老師、張翰璧老師、陳秀琪老師、<br>
                    &emsp;湯晏甄老師、黃菊芳老師、黃雯君老師、<br>
                    &emsp;廖長彥老師、劉小蘭老師、蔡芬芳老師、<br>
                    &emsp;鄭曉峯老師、賴守誠老師、賴維凱老師、<br>
                    &emsp;鍾國允老師、羅肇錦老師。<br>
                    &emsp;（依姓氏筆畫排序）</a> <br>
                <a> ◆ 主&emsp;&emsp;&emsp;編／ 鍾國允院長</a> <br>
                <a> ◆ 執行編輯&emsp;／ 黃菊芳系主任、邱一帆老師</a> <br>
                <a> ◆ 編&emsp;輯&emsp;群／ 彭淑姿、彭賢明、劉虹均、<br>
                    &emsp;蔡嫈婷、賴亞華、羅玉芝。<br>
                    &emsp;（依姓氏筆畫排序）</a> <br>
                <a> ◆ 刊頭攝影&emsp;／ 廖千慧</a> <br>
                <a> ◆ 網頁製作&emsp;／ 呂學昊</a> <br>
                <a> ◆ 連絡電話&emsp;／ 03-4257151#33480</a> <br>
            </p>
        </div>
    </div>
    <div class="bottom-subscribe">
        <a href="https://epaper.ncu.edu.tw/subscribe?pid=46" target="_blank"><b>訂閱本報</b></a>
        <div class="sub-gd">
            <a v-if="pathId == '/'" :href="`http://www.facebook.com/sharer.php?u=http://hakka.ncu.edu.tw/Hakka_ePaper/paper/paper${paperId}`"
                class="icon-social"><img src="http://hakka.ncu.edu.tw/Hakka_ePaper/paper/social/facebook512.png" alt="Facebook" width="30" height="30"></a>
            <a v-else :href="`http://www.facebook.com/sharer.php?u=http://hakka.ncu.edu.tw/Hakka_ePaper/paper/paper${paperId}${pathId}`"
                class="icon-social"><img src="http://hakka.ncu.edu.tw/Hakka_ePaper/paper/social/facebook512.png" alt="Facebook" width="30" height="30"></a>
            <a v-if="pathId == '/'" :href="`http://twitter.com/share?url=http://hakka.ncu.edu.tw/Hakka_ePaper/paper/paper${paperId}`"
                class="icon-social"><img src="http://hakka.ncu.edu.tw/Hakka_ePaper/paper/social/twitter512.png" alt="twitter" width="30" height="30"></a>
            <a v-else :href="`http://twitter.com/share?url=http://hakka.ncu.edu.tw/Hakka_ePaper/paper/paper${paperId}${pathId}`"
                class="icon-social"><img src="http://hakka.ncu.edu.tw/Hakka_ePaper/paper/social/twitter512.png" alt="twitter" width="30" height="30"></a>
            <a v-if="pathId == '/'" :href="`http://line.naver.jp/R/msg/text/?http://hakka.ncu.edu.tw/Hakka_ePaper/paper/paper${paperId}`"
                class="icon-social"><img src="http://hakka.ncu.edu.tw/Hakka_ePaper/paper/social/line512.png" alt="line" width="30" height="30"></a>
            <a v-else :href="`http://line.naver.jp/R/msg/text/?http://hakka.ncu.edu.tw/Hakka_ePaper/paper/paper${paperId}${pathId}`"
                class="icon-social"><img src="http://hakka.ncu.edu.tw/Hakka_ePaper/paper/social/line512.png" alt="line" width="30" height="30"></a>
        </div>
        <hr>
        <div>
            <p class="bottom-edit">&copy; 2023 New Edition Design by 呂學昊</p>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'BannerBottom',
    computed: {
        pathId() {
            return this.$route.path;
        },
    },
    data() {
        return {
            paperId: process.env.VUE_APP_PAPER_ID
        }
    },
}
</script>
<style scoped>
.w3l {
    position: relative;
    z-index: 0;
}

.bottom-picture {
    background-image: url('@/assets/BOT.jpg');
    background-size: cover;
    position: relative;
    background-position: center;
}

@media screen and (min-width: 737px) {
    .overlay-w3l {
        background: rgba(10, 9, 9, 0.6396156862745098);
        z-index: 9;
        padding: 4em 2em;
        text-align: left;
        width: 46%;
        margin-right: auto;
        margin-left: 35px;
    }
}

@media screen and (max-width:736px) {
    .overlay-w3l {
        background: rgba(10, 9, 9, 0.6396156862745098);
        z-index: 9;
        padding: 3em 1.5em;
    }
}

.bottom-para {
    padding: 0px !important;
    font-size: 14px;
    margin: 20px 0;
    text-align: left;
    color: #ffffff;
    line-height: 26px;
}

.bottom-subscribe {
    font-size: 20px;
    color: #777;
    margin: 0 auto;
    padding: 30px;
}

.icon-social {
    display: inline-block;
    margin: 10px;
}

.bottom-edit {
    color: #777;
    font-size: 14px;
    text-align: left;
}

@media screen and (max-width:736px) {}</style>
  