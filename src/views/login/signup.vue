<template>
  <div class="home">
    <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="username">
        <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="ruleForm.age" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="ruleForm.sex" placeholder="请选择性别">
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="ruleForm.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: 'signup',
    components: {},
    data() {
      return {
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
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'change'}
          ],
          age: [
            {type: 'number', required: true, message: '请输入年龄', trigger: 'change'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          address: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur'}
          ]
        }
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
