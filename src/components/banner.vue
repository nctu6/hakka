<template>
    <h1 class="title" v-on:click="this.$router.push('/')">
        國立中央大學 客家學院 電子報
    </h1>
</template>
  
<script>
export default {
    name: 'BannerTitle',
    data() {
        return {

        }
    }
}
</script>
<style scoped>
.title {
    color: #1e1e1f;
    font-size: 28px;
    font-weight: bold;
    text-align: left;
    padding: 0.5em 1em;
    margin: 0px;
}

@media screen and (max-width:736px) {
    .title {
        text-align: center;
        font-size: 20px;
    }
}
</style>
  