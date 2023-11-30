<template>
    <div class="back-div">
        <button @click="goBack" class="back-btn">
            返回上頁
        </button>
        <!-- <router-link :to="'/'" class="back-btn">
            返回上頁
        </router-link> -->
    </div>
</template>
  
<script>
export default {
    name: 'BackBtn',
    data() {
        return {
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1); // 返回上一个页面
        }
    }
}
</script>
<style scoped>
.back-div {
    margin: 50px;
    text-align: left;
}
.back-btn {
    color:#fff;
    text-decoration: none;
    font-weight: 600;
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 6px;
    background:#be369b;
    border: 2px solid#be369b;
    text-transform: capitalize;
}

@media screen and (max-width:736px) {
    .mid-content {
        padding: 3em 1.5em;
        width: 70%;
    }
}
</style>
  