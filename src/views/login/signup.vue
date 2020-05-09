<template>
  <div class="home">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年纪" prop="age">
        <el-input v-model="ruleForm.age" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input v-model="ruleForm.sex" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="ruleForm.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
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
    name: 'Home',
    components: {},
    data() {
      return {
        ruleForm: {
          username: '',
          age: '',
          sex: '',
          address: '',
          password: '',
        }
      };
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
