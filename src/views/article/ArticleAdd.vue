<template>
  <div>


    <!--标题 类型 作者 上传时间 最后一次修改时间 难度 内容 评论 -->
    <el-form :model="articleForm" :rules="articleRules" ref="articleForm" label-width="100px" class="articleForm">
      <el-form-item label="标题" prop="articleTitle">
        <el-input v-model="articleForm.articleTitle" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="articleType">
        <el-select v-model="articleForm.articleType" placeholder="请选择文章类型" popper-class="articleType-popper">
          <el-option label="Html" value="Html"></el-option>
          <el-option label="CSS3" value="CSS3"></el-option>
          <el-option label="JavaScript" value="JavaScript"></el-option>
          <el-option label="Vue" value="Vue"></el-option>
          <el-option label="React" value="React"></el-option>
          <el-option label="Node.js" value="Node.js"></el-option>
          <el-option label="Linux" value="Linux"></el-option>
          <el-option label="Nginx" value="Nginx"></el-option>
          <el-option label="Webpack" value="Webpack"></el-option>
          <el-option label="SQL" value="SQL"></el-option>
          <el-option label="git" value="git"></el-option>
          <el-option label="TypeScript" value="TypeScript"></el-option>
          <el-option label="Python" value="Python"></el-option>
          <el-option label="UNI-App" value="UNI-App"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="等级" prop="articleLevel">
        <div class="articleForm-level">
          <el-rate
              v-model="articleForm.articleLevel"
              :colors="colors">
          </el-rate>
        </div>
      </el-form-item>
      <div ref="editor" style="text-align:left"></div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('articleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import E from 'wangeditor'
  import {mapState} from 'vuex'
  import {parseTime} from '@/utils/index'
  import {addArticle} from '@/api/article'

  export default {
    name: "ArticleAdd",
    data() {
      return {
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
        articleForm: {
          articleTitle: '',
          articleType: '',
          articleLevel: null,
          articleContent: '',
        },
        articleRules: {
          articleTitle: [],
          articleType: [],
          articleLevel: [],
          articleContent: []
        },
      }
    },
    computed: {
      ...mapState({
        userinfo: state => state.user.userinfo,
      }),
    },
    mounted() {
      var editor = new E(this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.articleForm.articleContent = html
      }
      editor.create()
    },
    methods: {
      submitForm(formName) {
        let that = this
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let data = {
              author_id: that.userinfo._id,
              articleTitle: that.articleForm.articleTitle,
              articleType: that.articleForm.articleType,
              articleLevel: that.articleForm.articleLevel,
              articleContent: that.articleForm.articleContent,
              uploadDate: parseTime(new Date(), '{y}-{m}-{d} {h}:{i}'),
              updateDate: parseTime(new Date(), '{y}-{m}-{d} {h}:{i}'),
            }
            console.log(data);
            let res = await addArticle(data)
            console.log(res);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
  }
</script>

<style scoped>

  .articleForm-level {
    padding: 10px 0;
  }
</style>
