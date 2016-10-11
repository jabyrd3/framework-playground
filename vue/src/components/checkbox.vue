<template>
  <div class="checkbox">
    <label>Show author?</label>
    <input type="checkbox"
      v-model="checked"
      v-on:change="checkUpdated" />
</template>

<script>
let data = {
  checked: true
}
export default {
  data: function () {
    return data
  },
  methods: {
    checkUpdated: function () {
      this.$emit('checkUpdated', data.checked)
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
