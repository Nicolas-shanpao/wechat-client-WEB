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
          ref="signupform"
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
                v-model="ruleForm.nikename"
                filled
                :label="$t('signup.nikename')"
                outlined
                clearable
                :rules="rules.nikename"
                type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <!--email-->
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
            <!--phone-->
            <v-text-field
                dense
                v-model="ruleForm.phone"
                filled
                :label="$t('signup.phone')"
                outlined
                clearable
                :rules="rules.phone"
                type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <!--age-->
            <v-text-field
                dense
                v-model="ruleForm.age"
                filled
                :label="$t('signup.age')"
                outlined
                clearable
                :rules="rules.age"
                type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <!--sex-->
            <v-select
                dense
                v-model="ruleForm.sex"
                :items="sexList"
                :label="$t('signup.sex')"
                item-text="valve"
                item-value="key"
                return-object
                class="select-language"
                @change="changeSex"
            ></v-select>

          </v-col>
          <v-col cols="12">
            <!--address-->
            <v-text-field
                dense
                v-model="ruleForm.address"
                filled
                :label="$t('signup.address')"
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
            <!--repassword-->
            <v-text-field
                dense
                v-model="ruleForm.repassword"
                filled
                :label="$t('signup.password')"
                outlined
                clearable
                :validate-on-blur="true"
                :rules="rules.repassword"
                type="password"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <div class="btn-box">
        <v-btn
            text
            color="#5aa6f8"
            @click="toLogin()"
        >
          {{$t('signup.login')}}
        </v-btn>
        <v-btn
            width="100"
            color="#5aa6f8"
            @click="signup()"
        >
          {{$t('signup.register')}}
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
  import {getCookies, setCookies} from "@/utils/cookies"

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
        sexList: [
          {key: 'man', valve: this.$t('sex.man')},
          {key: 'woman', valve: this.$t('sex.woman')},
          {key: 'other', valve: this.$t('sex.other')},
        ],
        ruleForm: {
          username: '',
          nikename: '',
          email: '',
          phone: '',
          age: '',
          sex: {key: '', value: ''},
          address: '',
          password: '',
          repassword: '',
        },
        rules: {
          username: [
            v => !!v || this.$t('errorMsg.account'),
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
          ],
          nikename: [],
          email: [],
          phone: [],
          age: [],
          sex: [],
          address: [],
          password: [
            v => !!v || this.$t('errorMsg.password'),
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
          ],
          repassword: [
            v => !!v || this.$t('errorMsg.password'),
            v => {
              console.log(v);
              if (v == this.ruleForm.password) {
                return true
              } else {
                return '两次密码不同'
              }
            },
          ]
        },
        languageList: [
          {key: 'zh-cn', language: '简体中文'},
          {key: 'en', language: 'English'},
        ],
        select: {key: getLanguage(), language: ''}
      }
    },
    methods: {
      signup() {
        let that = this;
        let valid = this.$refs.signupform.validate()
        if (valid) {
          that.disabled = true;
          let params = {
            username: that.ruleForm.username,
            email: that.ruleForm.email,
            phone: that.ruleForm.phone,
            age: that.ruleForm.age,
            sex: that.ruleForm.sex.value,
            address: that.ruleForm.address,
            password: that.ruleForm.password,
          };
          that.$store.dispatch("user/signup", params).then(res => {
            if (res.code == 200) {
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
      },
      toLogin() {
        this.$router.push(
          {
            path: '/login',
            name: 'login',
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
      changeSex(value) {
        let that = this;
        console.log(value);
        console.log(that.ruleForm.sex);
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
