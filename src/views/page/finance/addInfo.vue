<template>
  <div class="full-height">
    <page-header head-text="添加收款信息" :show-right-btn="false" />
    <div class="padding-wrap">
      <div class="width-limit">
        <div class="tip">为了确保我们能顺利向您汇款，请输入正确完整的信息</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item prop="companyName" label="公司名称：">
            <el-input
              v-model="ruleForm.companyName"
              placeholder="请输入企业名称（全称）"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="tax" label="税号：">
            <el-input
              v-model="ruleForm.tax"
              placeholder="请输入公司税号"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="local" label="公司地址：">
            <el-input
              v-model="ruleForm.local"
              placeholder="请输入公司地址（完整的注册地）"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="phone" label="公司电话：">
            <el-input
              v-model="ruleForm.phone"
              placeholder="请输入企业电话"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="bankAccount" label="银行卡号：">
            <el-input
              v-model="ruleForm.bankAccount"
              placeholder="请输入对公银行卡账号"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="bankName" label="开户行：">
            <el-input
              v-model="ruleForm.bankName"
              placeholder="请输入完整的开户行"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <div @click="submitForm('ruleForm')" class="add-btn">添加</div>
      </div>
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
  name: "addInfo",
  components: { pageHeader },
  data() {
    let checkTax = (rule, value, callback) => {
      let reg = /^[A-Za-z0-9]+$/;
      if (!reg.test(value)) {
        return callback(new Error("只允许输入数字和英文"));
      } else {
        callback();
      }
    };
    let checkPhone = (rule, value, callback) => {
      let reg = /^[0-9-]+$/;
      if (!reg.test(value)) {
        return callback(new Error("只允许输入数字和-"));
      } else {
        callback();
      }
    };
    let checkBankAccount = (rule, value, callback) => {
      let reg = /^[0-9]+$/;
      if (!reg.test(value)) {
        callback(new Error("只允许输入数字"));
      } else {
        if (value.length > 24) {
          callback(new Error("不允许超过24位"));
        } else {
          callback();
        }
      }
    };
    return {
      ruleForm: {
        companyName: "",
        tax: "",
        local: "",
        phone: "",
        bankAccount: "",
        bankName: "",
      },
      rules: {
        companyName: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        tax: [
          { required: true, message: "请输入正确的税号", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
          { validator: checkTax, trigger: "blur" },
        ],
        local: [{ required: true, message: "请输入公司地址", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入企业电话", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
        bankAccount: [
          { required: true, message: "请输入对公银行卡账号", trigger: "blur" },
          { validator: checkBankAccount, trigger: "blur" },
        ],
        bankName: [
          { required: true, message: "请输入完整的开户行", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Ajax(
            {
              url: "/finance/add",
              method: "post",
              params: {
                name: this.ruleForm.companyName,
                nocode: this.ruleForm.tax,
                address: this.ruleForm.local,
                phone: this.ruleForm.phone,
                cardcode: this.ruleForm.bankAccount,
                bankname: this.ruleForm.bankName,
              },
            },
            (res) => {
              this.$router.push({
                name: "checkInfo",
              });
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
.padding-wrap {
  background-color: #fff;
  padding-top: 76px;
  padding-bottom: 76px;
  .width-limit {
    max-width: 395px;
    margin: 0 auto;
    text-align: center;
    .tip {
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 22px;
    }
    .add-btn {
      cursor: pointer;
      width: 335px;
      display: inline-block;
      background: #4a82f4;
      border-radius: 4px 4px 4px 4px;
      font-size: 18px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 48px;
      text-align: center;
    }
  }
}
</style>
