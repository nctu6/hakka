<template>
  <div class="wrapper" v-if="isArticleReady">
    <div class="container-area ">
      <bannerTitle></bannerTitle>
      <img class="top-banner-picture" :src="require(`@/assets/${articles[articleId - 1].coverPicture}`)">
      <div v-for="(contentobj, index) in articles[articleId - 1].content" :key="index">
        <div class="content-text m-4" v-if="contentobj.type === 'text'"> {{ contentobj.content }} </div>
        <div v-else-if="contentobj.type === 'image'"><img class="img-block"
            :src="require(`@/assets/${contentobj.content}`)"><br><br></div>
        <div v-else-if="contentobj.type === 'caption'">{{ contentobj.content }}<br><br></div>
        <div v-else-if="contentobj.type = 'video'">
          <video width="640" height="480" controls>
            <source :src="require(`@/assets/${contentobj.content}`)" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parsingFunctionMixin } from '@/components/parsingFunction.js'

import bannerTitle from '@/components/banner.vue'
export default {
  name: 'ContentPage',
  components: {
    bannerTitle
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
}
</script>

<!-- Add "scoped" attribute to limit aCSS to this component only -->
<style scoped>
.content-text {
  text-align: left;
  text-indent: 2em;
}
</style>
