<template>
  <div class="ArticleList">
    <el-tree :data="articleList"
             :props="defaultProps"
             @node-click="articlePage"
             class="tree-class"
    ></el-tree>
    <router-view :id="id"></router-view>
  </div>
</template>

<script>
  import {getArticleList} from '@/api/article'

  export default {
    name: "ArticleList",
    data: () => ({
      articleList: [],
      defaultProps: {
        children: 'children',
        label: 'articleTitle'
      },
      id: ''
    }),
    async mounted() {
      let res = await getArticleList()
      console.log(res.data);
      this.articleList = res.data
      this.id = this.articleList[0]._id
    },
    methods: {
      articlePage(data) {
        this.id = data._id
      }
    }
  }
</script>

<style scoped>
  .ArticleList {
    display: flex;
    height: 100%;
  }

  .tree-class {
    width: 280px;
    min-width: 280px;
  }
</style>
