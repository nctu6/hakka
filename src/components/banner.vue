<template>
    <div class="hello">
        {{articleId}}
    </div>
  </template>
  
  <script>
  export default {
    name: 'ContentPage',
    computed: {
      articleId() {
        return this.$route.params.subId;
      }
    },
    data () {
      return {
          
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit aCSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>
  