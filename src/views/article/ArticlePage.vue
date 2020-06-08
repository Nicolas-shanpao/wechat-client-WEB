<template>
  <div>
    <h1>{{articleDetial.articleTitle}}</h1>
    <div v-html="articleDetial.articleContent"></div>
    相关评论(0)
    <div class="commentList"></div>
  </div>
</template>

<script>
  import {getArticleDetial} from '@/api/article'

  export default {
    name: "ArticlePage",
    props: {
      id: String
    },
    data: () => ({
      articleDetial: {
        articleContent: '',
        articleLevel: '',
        articleTitle: '',
        articleType: '',
        author_id: '',
        updateDate: '',
        uploadDate: ''
      },
      commentList: {}
    }),
    watch: {
      id() {
        this.getArticleDetial()
      }
    },
    methods: {
      async getArticleDetial() {
        let res = await getArticleDetial({id: this.id})
        this.articleDetial = res.data
      }
    }
  }
</script>

<style scoped>

</style>
