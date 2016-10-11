<template>
  <div class="articles">
    <h2>Articles</h2>
    <div class="article" v-for="article in articles">
      <h3>{{ article.title }}</h3>
      <h6 v-if="checked"> {{article.name}} </h6>
      <p>{{ article.body }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['articles', 'checked', 'users']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
.article{
  margin-bottom: 20px;
}
.articles{
  margin: 20px 0;
}
</style>
