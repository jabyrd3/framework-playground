<template>
  <div class="slider">
    <span>Query for {{ count }} articles</span>
    <br />
    <input 
      min="1"
      max="5"
      v-model.number="count"
      v-on:change="update"
      type="range" />
    <input type="number" v-model.number="count"
      v-on:change="update" 
      min="1"
      max="5"/>
  </div>
</template>

<script>
let data = {
  count: 5
}
export default {
  data () {
    return data
  },
  methods: {
    update: function () {
      // this is hack but i am getting tired.
      if (this.count > 5) {
        this.count = 5
      } else if (this.count < 1) {
        this.count = 1
      }

      this.$emit('update', this.count)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
