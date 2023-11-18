<template>
    <div class="wrapper ">
        <div class="container-area ">
            <bannerTitle></bannerTitle>
            <img class="top-banner-picture" :src="require(`@/assets/TOP.jpg`)">
            <div class="row banner-date">
                <div class="col-sm-12 col-md-6">
                    <span style="font-size:9pt">NCU HAKKA COLLEGE E-PAPER 第{{ paperId }}期{{ publishedDate }} 出刊／ 半月刊</span>
                </div>
                <div class="col-sm-12 col-md-6">
                    <span>瀏覽人次：</span>
                    <a href="https://www.cutercounter.com/traditional-chinese-nn/" target="_blank"><img
                            src="https://www.cutercounter.com/hits.php?id=hvxonank&nd=6&style=4" border="0" alt="免費計數器"></a>
                </div>
            </div>
            <div class="row m-3" v-for="(article, index) in articles" :key="index">
                <div class="col-sm-11 col-md-6 tl-left">
                    <img :src="require(`@/assets/${article.coverPicture}`)" class="img-block" alt="...">
                </div>

                <div class="col-sm-11 col-md-6 tl-left">
                    <h6 class="cover-author">{{ article.coverAuthor }}</h6>
                    <h4 class="cover-title">{{ article.title }}</h4>
                    <div v-for="(content, index) in article.coverContent" :key="index">
                        <p class="cover-content">{{ content }}</p>
                    </div>
                    <router-link :to="`${paperId}-${index + 1}`" class="continue-reading">繼續閱讀</router-link>
                </div>

            </div>
        </div>
    </div>
</template>
<style>
.top-banner-picture {
    width: 100%;
    height: auto;
    display: block;
}

.banner-date {
    font-size: 9pt;
    background-color: black;
    color: white;
    padding: 20px;
}

.container-area {
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    text-align: center;
}

.img-block {
    width: 325px;
    height: 230px;
    overflow: hidden;
    border-radius: 2%;
}

.continue-reading {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 26px;
    background: #be369b;
    border: 2px solid#be369b;
    text-transform: capitalize;
}

.tl-left {
    text-align: left;
}

.cover-author {
    color: #be369b;
    font-size: 13px;
    letter-spacing: 1px;
    margin-bottom: 6px;
}

.cover-title {
    color: #1c1918;
    font-size: 18px;
    font-weight: bold;
    line-height: 28px;
    text-transform: capitalize;
}

.cover-content {
    margin: 10px 0 20px 0;
    font-size: 15px;
    color: #777;
    line-height: 26px;
}
</style>
<script>
import bannerTitle from '@/components/banner.vue'
import {parsingFunctionMixin} from '@/components/parsingFunction.js'
export default {
    name: 'App',
    components: {
        bannerTitle
    },
    mixins: [parsingFunctionMixin],
    data() {
        return {
            paperId: process.env.VUE_APP_PAPER_ID,
            publishedDate: process.env.VUE_APP_PUBLISHED_DATE,
        }
    },


}
</script>
  

