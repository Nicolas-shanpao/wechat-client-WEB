<template>
  <v-card
      max-width="600"
      class="mx-auto signup"
      :loading="loading"
  >
    <v-list-item>
      <v-list-item-avatar color="#5aa6f8">
        <img src="@/assets/image/logo.png" alt="" class="logo-image"/>

      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{$t('signup.title')}}</v-list-item-title>
        <v-list-item-subtitle>
          {{$t('signup.subtitle')}}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <div class="signup-box">
      <v-form
          ref="loginform"
          v-model="valid"
      >
        <v-row>
          <v-col cols="6">
            <v-text-field
                dense
                v-model="ruleForm.username"
                filled
                :label="$t('signup.account')"
                outlined
                clearable
                :rules="rules.username"
                type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
                dense
                v-model="ruleForm.email"
                filled
                :label="$t('signup.email')"
                outlined
                clearable
                :rules="rules.email"
                type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <!--email-->
            <v-text-field
                dense
                v-model="ruleForm.email"
                filled
                :label="$t('signup.account')"
                outlined
                clearable
                :rules="rules.email"
                type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <!--phone-->
            <v-text-field
                dense
                v-model="ruleForm.phone"
                filled
                :label="$t('signup.account')"
                outlined
                clearable
                :rules="rules.phone"
                type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <!--age-->
            <v-text-field
                dense
                v-model="ruleForm.age"
                filled
                :label="$t('signup.account')"
                outlined
                clearable
                :rules="rules.age"
                type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <!--sex-->
            <v-text-field
                dense
                v-model="ruleForm.sex"
                filled
                :label="$t('signup.account')"
                outlined
                clearable
                :rules="rules.sex"
                type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <!--address-->
            <v-text-field
                dense
                v-model="ruleForm.address"
                filled
                :label="$t('signup.account')"
                outlined
                clearable
                :rules="rules.address"
                type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <!--password-->
            <v-text-field
                dense
                v-model="ruleForm.password"
                filled
                :label="$t('signup.password')"
                outlined
                clearable
                :rules="rules.password"
                type="password"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <!--password-->
            <v-text-field
                dense
                v-model="ruleForm.password"
                filled
                :label="$t('signup.password')"
                outlined
                clearable
                :rules="rules.password"
                type="password"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
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
  import {getLanguage} from "@/lang"

  export default {
    name: 'signup',
    components: {},
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        console.log(typeof value);
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      return {
        valid: true,
        loading: false,
        ruleForm: {
          username: '',
          email: '',
          phone: '',
          age: '',
          sex: '',
          address: '',
          password: '',
        },

        rules: {
          username: [
            v => !!v || this.$t('errorMsg.account'),
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
          ],
          email: [
            v => !!v || this.$t('errorMsg.account'),
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
          ],
          phone: [
            v => !!v || this.$t('errorMsg.account'),
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
          ],
          age: [
            v => !!v || this.$t('errorMsg.account'),
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
          ],
          sex: [
            v => !!v || this.$t('errorMsg.account'),
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
          ],
          address: [
            v => !!v || this.$t('errorMsg.account'),
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
          ],
          password: [
            v => !!v || this.$t('errorMsg.password'),
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
          ]
        },
        picker: new Date().toISOString().substr(0, 10),
        languageList: [
          {key: 'zh-cn', language: '简体中文'},
          {key: 'en', language: 'English'},
        ],
        select: {key: getLanguage(), language: ''}
      }
    },
    methods: {
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.disabled = true;
            let params = {
              username: that.ruleForm.username,
              email: that.ruleForm.email,
              phone: that.ruleForm.phone,
              age: that.ruleForm.age,
              sex: that.ruleForm.sex,
              address: that.ruleForm.address,
              password: that.ruleForm.password,
            };
            that.$store.dispatch("user/signup", params).then(res => {
              console.log(res);
              if (res.code == 1) {
                console.log(that.otherQuery);
                that.$router.push({
                  path: that.redirect || "/",
                  query: that.otherQuery
                });
                that.$message({
                  message: res.msg,
                  type: "success"
                });
              } else {
                that.$message({
                  message: res.msg,
                  type: "error",
                  duration: 5 * 1000
                });
                that.disabled = false;
                that.checkImgIndex++
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
<style scoped>
  .signup {
    padding: 0 0 10px 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .signup-box {
    width: 500px;
    padding: 20px 40px 0;
  }

  .btn-box {
    display: flex;
    justify-content: space-between;
  }

  .col {
    padding: 0 12px;
  }

  .select-language {
    margin-left: 10px !important;
    width: 150px;
  }
</style>
