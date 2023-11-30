<template>
  <div class="wrapper" v-if="isArticleReady">
    <div class="container-area ">
      <bannerTitle></bannerTitle>
      <img v-if="articles[articleId - 1].coverPicture" class="top-banner-picture"
        :src="require(`@/assets/${articles[articleId - 1].coverPicture}`)">
      <!-- <img v-else class="top-banner-picture" :src="require(`@/assets/BOT.jpg`)"> -->

      <div class="content-head">
        <h2 class="content-title">{{ articles[articleId - 1].title }}</h2><br>
        <h4 class="content-author">{{ articles[articleId - 1].author }}</h4><br>
        <div v-if="articles[articleId - 1].audio">
          <audio controls autoplay>
            <source :src="require(`@/assets/${articles[articleId - 1].audio}`)" type="audio/mp4">
            Your browser does not support the audio element.
          </audio>
        </div>
        <div v-if="articles[articleId - 1].audioAuthor">
          <a style="color:gray">發音人：{{ articles[articleId - 1].audioAuthor }}</a>
        </div>
      </div>
      <div v-for="(contentobj, index) in articles[articleId - 1].content" :key="index">
        <div class="content-text" v-if="contentobj.type === 'text'">
          <span v-for="(subContent, subIndex) in contentobj.content" :key="subIndex">
            <span class="preserve-whitespace" v-if="subContent.type == 'text'"> {{ subContent.content }}</span>
            <a v-if="subContent.type == 'link'" :href="subContent.content" target="_blank">{{ subContent.content }}</a>
            <a v-if="subContent.type == 'email'" :href="'mailto:'+subContent.content">{{ subContent.content }}</a>
          </span>
        </div>
        <div class="mb-3" v-else-if="contentobj.type === 'image'">
          <img class="content-img" :src="require(`@/assets/${contentobj.content}`)">
        </div>
        <div class="mb-3" v-else-if="contentobj.type === 'caption'">{{ contentobj.content }}</div>
        <div class="mb-3" v-else-if="contentobj.type === 'video'">
          <video width="640" height="480" controls>
            <source :src="require(`@/assets/${contentobj.content}`)" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <backToFP></backToFP>
      <bannerBottom></bannerBottom>
    </div>
  </div>
</template>

<script>
import { parsingFunctionMixin } from '@/components/parsingFunction.js'

import bannerTitle from '@/components/banner.vue'
import backToFP from '@/components/backBtn.vue'
import bannerBottom from '@/components/bannerBottom.vue'
export default {
  name: 'ContentPage',
  components: {
    bannerTitle,
    backToFP,
    bannerBottom
  },
  computed: {
    articleId() {
      return this.$route.params.subId;
    },
    isArticleReady() {
      return this.articles[this.articleId - 1]?.coverPicture != null;
    },
  },
  mixins: [parsingFunctionMixin],
  mounted() {
    if (this.articleId > this.articles.length) this.$router.push('/');
  }
}
</script>

<!-- Add "scoped" attribute to limit aCSS to this component only -->
<style scoped>
.content-text {
  text-align: left;
  text-indent: 2em;
  margin: 10px 24px;
  min-height: 20px;
}

.content-head {
  margin: 50px 0px;
}

.content-title {
  font-weight: bold;
  font-size: 24px;
  color: #be369b;
}

.content-author {
  font-weight: bold;
  font-size: 16px;
}

.content-img {
  height: auto;
  margin: 0 auto 0em;
  display: block;
  width: 65%;
}

.preserve-whitespace {
    white-space: pre-wrap;
}
</style>
