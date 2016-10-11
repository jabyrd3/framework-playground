<template>
  <div>
    <slider v-on:update="updateCount" 
      :article-count="articleCount"></slider>
    <check-box :checked="checked" v-on:checkUpdated="updateChecked"></check-box>
    <render-articles :articles="articles" :checked="checked"></render-articles>
  </div>
</template>

<script>
import slider from './components/slider'
import checkBox from './components/checkbox'
import renderArticles from './components/renderArticles'
import {config, apiService} from './apiService'
import _ from 'lodash'
// default state creation
let state = {
  articleCount: 5,
  checked: true,
  articles: [],
  users: []
}

config({
  apiUrl: 'https://jsonplaceholder.typicode.com',
  endpoints: ['posts', 'users'],
  legacy: true})
apiService()
  .users()
  .get()
  .then(res => {
    state.users = res
    console.log(`stateuser`, state.users)
    refreshView()
  })
export default {
  components: {
    slider,
    checkBox,
    renderArticles
  },
  data: () => {
    return state
  },
  methods: {
    updateCount: (newValue) => {
      state.articleCount = newValue
      refreshView()
    },
    updateChecked: (newValue) => {
      console.log(`updatechecked`, newValue)
      state.checked = newValue
    }
  }
}
const refreshView = () => {
  apiService()
    .posts(``)
    .get({'_start': 0, '_limit': state.articleCount})
    .then(res => {
      state.articles = _.chain(res).map(article => {
        // return _.extend(article, {author: _.find(state.user, {id: article.id})})
        console.log(_.chain(state.users).find({id: article.userId}).pick(['name']).merge(article).value())
        return _.chain(state.users)
          .find({id: article.userId})
          .pick(['name'])
          .merge(article)
          .value()
      }).value()
      console.log(`state`, state.articles)
    })
    .catch(err => { console.warn('apiErr', err) })
}
</script>

<style></style>
