<template>
  <div class="full-height">
    <page-header head-text="创建网站" :show-right-btn="false" />
    <div class="main-wrap">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="网站名称" prop="name">
          <el-input v-model="ruleForm.name" clearable></el-input>
        </el-form-item>
        <div class="btn-wrap">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >创建</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  Ajax,
  formatResponse,
  formatResult,
  formatGetParam,
} from "@api/getApi.js";
import pageHeader from "../components/pageHeader";
export default {
  name: "createWebsite",
  components: { pageHeader },
  data() {
    var validateHaveSame = (rule, value, callback) => {
      setTimeout(() => {
        let name = "123";
        if (value === name) {
          callback(new Error("该名称已经被使用"));
        } else {
          callback();
        }
      }, 3000);
    };
    return {
      ruleForm: {
        name: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入网站名称", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "名称不得超过30个字符",
            trigger: "blur",
          },
          { validator: validateHaveSame, trigger: "blur" },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    cancel() {
      this.$router.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Ajax(
            {
              url: "/site/siteAdd",
              method: "post",
              params: {
                name: this.ruleForm.name,
              },
            },
            (res) => {
              if (res.status_code === 200) {
                this.$message.success("创建成功");
                setTimeout(() => {
                  this.$router.go(-1);
                }, 500);
              }
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.full-height {
  height: 100%;
}
.main-wrap {
  margin: 20px 24px;
  background: #fff;
  padding: 92px 323px;
}
.btn-wrap {
  text-align: right;
}
</style>
