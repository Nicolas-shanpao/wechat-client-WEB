<template>
  <v-card
      max-width="400"
      class="mx-auto login"
      :loading="loading"
  >
    <v-list-item>
      <v-list-item-avatar color="#5aa6f8">
        <img src="@/assets/image/logo.png" alt="" class="logo-image"/>

      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{$t('login.title')}}</v-list-item-title>
        <v-list-item-subtitle>
          {{$t('login.subtitle')}}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <div class="login-box">
      <v-form
          ref="loginform"
          v-model="valid"
      >
        <v-text-field
            v-model="ruleForm.username"
            filled
            :label="$t('login.account')"
            outlined
            clearable
            :rules="rules.username"
            type="text"
        ></v-text-field>
        <v-text-field
            v-model="ruleForm.password"
            filled
            :label="$t('login.password')"
            outlined
            clearable
            :rules="rules.password"
            type="password"
        ></v-text-field>
      </v-form>
      <div class="btn-box">
        <v-btn
            text
            color="#5aa6f8"
        >
          {{$t('login.forgetPassword')}}
        </v-btn>
        <v-btn
            text
            color="#5aa6f8"
        >
          {{$t('login.loginByPhone')}}
        </v-btn>
      </div>
      <div class="huadong"></div>
      <div class="btn-box">
        <v-btn
            text
            color="#5aa6f8"
            @click="toSignup()"
        >
          {{$t('login.register')}}
        </v-btn>
        <v-btn
            width="100"
            color="#5aa6f8"
            @click="login()"
        >
          {{$t('login.login')}}
        </v-btn>
      </div>
    </div>
    <v-select
        v-model="select"
        :items="languageList"
        :label="$t('login.language')"
        item-text="language"
        item-value="key"
        return-object
        class="select-language"
        @change="changeLanguage"
    ></v-select>
  </v-card>
</template>

<script>
  import {getCookies, setCookies} from "@/utils/cookies"
  import {getLanguage} from "@/lang"

  export default {
    name: 'login',
    components: {},
    data() {
      return {
        valid: true,
        ruleForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            v => !!v || this.$t('errorMsg.account'),
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
          ],
          password: [
            v => !!v || this.$t('errorMsg.password'),
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
          ],
        },
        loading: false,
        languageList: [
          {key: 'zh-cn', language: '简体中文'},
          {key: 'en', language: 'English'},
        ],
        select: {key: getLanguage(), language: ''}
      }
    },
    computed: {},
    methods: {
      login() {
        let that = this;
        let valid = this.$refs.loginform.validate()
        if (valid) {
          that.loading = true
          let params = {
            username: that.ruleForm.username,
            password: that.ruleForm.password,
          };
          that.$store.dispatch("user/login", params).then(res => {
            console.log(res);
            if (res.code == 200) {
              console.log(that.otherQuery);
              that.$router.push({
                path: that.redirect || "/",
                query: that.otherQuery
              });
              that.$message({
                message: '登录成功',
                type: "success"
              });
              that.loading = false
            } else {
              that.$message({
                message: res.data,
                type: "error",
                duration: 5 * 1000
              });
              that.loading = false
            }
          });
        }
      },
      toSignup() {
        this.$router.push(
          {
            path: '/signup',
            name: 'signup',
          }
        )
      },
      changeLanguage(lang) {
        let that = this;
        console.log(lang);
        that.$i18n.locale = lang.key
        that.$vuetify.lang.current = lang.key
        setCookies('language', lang.key)
        that.$message({
          message: that.$i18n.t('login.changeLanguage'),
          type: 'success'
        })

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
  .login {
    padding: 0 0 10px 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .login-box {
    width: 375px;
    padding: 20px 40px 0;
  }

  .btn-box {
    display: flex;
    justify-content: space-between;
  }

  .huadong {
    width: 100%;
    height: 50px;
    margin: 10px 0;
    background: bisque;
  }

  .select-language {
    margin-left: 10px !important;
    width: 150px;
  }
</style>
