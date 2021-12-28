<template>
  <div id="loginApp">
    <div @click="goToLogin" class="down-load-btn">登录</div>
    <div class="hight-pl"></div>
    <div v-if="!callback" class="flex-vc">
      <div class="main-area">
        <div class="logo-row">
          <img src="../../../assets/img/logo.png" alt="logo" class="logo-img" />
        </div>
        <div class="login-area">
          <div v-show="isLogin" class="vc">
            <div class="l-title">加入Mysitefy伙伴计划</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <div class="input-wrap">
                <div class="input-label">姓名</div>
                <el-form-item prop="name">
                  <el-input
                    class="cus-input"
                    v-model="ruleForm.name"
                    placeholder="请输入姓名"
                    clearable
                  ></el-input>
                </el-form-item>
              </div>
              <div class="input-wrap">
                <div class="input-label">企业名称</div>
                <el-form-item prop="companyName">
                  <el-input
                    class="cus-input"
                    v-model="ruleForm.companyName"
                    placeholder="请输入企业名称"
                    clearable
                  ></el-input>
                </el-form-item>
              </div>
              <div class="input-wrap">
                <div class="input-label">企业简介</div>
                <el-form-item prop="companyDes">
                  <el-input
                    class="cus-input"
                    v-model="ruleForm.companyDes"
                    placeholder="请输入企业简介"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 4 }"
                    clearable
                    resize="none"
                  ></el-input>
                  <i
                    v-show="ruleForm.companyDes"
                    @click="ruleForm.companyDes = ''"
                    class="el-icon-circle-close cus-close"
                  ></i>
                </el-form-item>
              </div>
              <div class="input-wrap">
                <div class="input-label">企业网址（非必填）</div>
                <el-form-item prop="website">
                  <el-input
                    class="cus-input"
                    v-model="ruleForm.website"
                    placeholder="请输入企业网址（非必填）"
                    clearable
                  ></el-input>
                </el-form-item>
              </div>
              <div class="input-wrap">
                <div class="input-label">手机号</div>
                <el-form-item prop="phoneMsg">
                  <el-input
                    class="cus-input"
                    v-model="ruleForm.phoneMsg"
                    placeholder="请输入手机号"
                    clearable
                  ></el-input>
                </el-form-item>
              </div>

              <div class="input-wrap">
                <div class="input-label">验证码</div>
                <el-form-item prop="codeMsg">
                  <div class="flex-x">
                    <el-input
                      class="cus-input flex-basis50"
                      v-model="ruleForm.codeMsg"
                      placeholder="请输入验证码"
                      clearable
                    ></el-input>
                    <div
                      @click="handleGetCode"
                      class="get-code"
                      :class="
                        isPhone && isGetCodeState ? 'getCodeBtnActive' : ''
                      "
                    >
                      {{ codeText }}
                    </div>
                  </div>
                </el-form-item>
              </div>
            </el-form>

            <!-- <div class="phone-wrap">
              <div class="area-code">+86</div>
              <input
                type="text"
                class="phone-input"
                placeholder="请输入手机号"
                v-model="phoneMsg"
                pattern="[0-9]*"
                maxlength="11"
              />
            </div>
            <div class="code-wrap">
              <input
                type="text"
                class="code-input"
                v-model="codeMsg"
                placeholder="请输入短信验证码"
              />
              <div
                @click="handleGetCode"
                class="get-code"
                :class="isPhone && isGetCodeState ? 'getCodeBtnActive' : ''"
              >
                {{ codeText }}
              </div>
            </div> -->
            <div
              @click="handleLogin('ruleForm')"
              class="login-btn"
              :class="disBtn"
            >
              申请成为伙伴
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="callback" class="success-callback">
      <img class="callback-img" src="../../../assets/img/logo.png" alt="logo" />
      <div class="thank-text">感谢您加入Mysitefy伙伴</div>
      <div class="time-text">我们将会在5个工作日内告诉您结果</div>
    </div>
    <div style="height: 110px"></div>
  </div>
</template>

<script>
import {
  Ajax,
  formatResponse,
  formatResult,
  formatGetParam,
} from "@api/getApi.js";
export default {
  name: "login",
  components: {},
  data() {
    let checkPhone = (rule, value, callback) => {
      let reg = /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;
      if (!reg.test(value)) {
        this.isPhone = false;
        callback(new Error("请输入正确的手机号"));
      } else {
        this.isPhone = true;
        callback();
      }
    };
    let checkCompanyName = (rule, value, callback) => {
      Ajax(
        {
          url: "/admin/checkName",
          method: "post",
          params: {
            name: this.ruleForm.companyName,
          },
        },
        (res) => {
          if (res.data === true) {
            callback(new Error("企业名称已存在"));
          } else {
            callback();
          }
        }
      );
    };
    return {
      downloadShow: false, // 是否显示下载二维码
      ruleForm: {
        name: "", // 姓名
        companyName: "", // 企业名称
        companyDes: "", // 企业简介
        website: "", // 企业网址（非必填）
        phoneMsg: "", // 输入的手机号
        codeMsg: "", // 验证码
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 20, message: "不超过20个字符", trigger: "blur" },
        ],
        companyName: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
          { min: 1, max: 40, message: "不超过40个字符", trigger: "blur" },
          { validator: checkCompanyName, trigger: "blur" },
        ],
        companyDes: [
          { required: true, message: "请输入企业简介", trigger: "blur" },
          { min: 1, max: 300, message: "不超过300个字符", trigger: "blur" },
        ],
        phoneMsg: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
        codeMsg: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      isPhone: false, // 手机号是否输入正确？
      Countdown: 60, // 默认倒计时60s
      isGetCodeState: true, // 获取验证码按钮是否可点击 默认可点击
      codeText: "获取验证码", // 验证码的文本
      timer: null, // 全局定时器
      showCanLogin: false,
      showLoginSuccess: false,
      isLogin: true, // true:登录界面，false:微信绑定界面
      callback: false,
    };
  },
  //   watch: {
  //     /** *
  //      * 监听手机号输入
  //      * * */
  //     phoneMsg(value) {
  //       const reg = /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;
  //       if (reg.test(value)) {
  //         // 正確
  //         this.isPhone = true;
  //       } else {
  //         // 錯誤
  //         this.isPhone = false;
  //       }
  //     },
  //   },
  computed: {
    // loginUrl() {
    //   console.log("env:", global.env);
    //   switch (global.env) {
    //     case "dev": // dev
    //       return "http://192.168.1.196:6060/login/"; // 测试环境2端口6363
    //     case "test": // test
    //       // return "http://02testnodeclient.linkjoint.cn/"; // 测试环境2
    //       return "http://testnodeclient.linkjoint.cn/"; // 测试环境
    //     case "pro": // pro
    //       return "https://platform.mysitefy.com/";
    //     default:
    //       return "http://192.168.1.196:6060/login/"; // 本机环境默认开发
    //   }
    // },
    disBtn() {
      if (this.ruleForm.phoneMsg && this.ruleForm.codeMsg) {
        return "";
      } else {
        return {
          "disable-btn": true,
        };
      }
    },
  },
  mounted() {},
  methods: {
    goToLogin() {
      this.$router.push({
        name: "login",
      });
    },
    handleLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Ajax(
            {
              url: "/admin/add",
              method: "post",
              params: {
                username: this.ruleForm.name,
                name: this.ruleForm.companyName,
                desc: this.ruleForm.companyDes,
                url: this.ruleForm.website,
                mobile: this.ruleForm.phoneMsg,
                code: this.ruleForm.codeMsg,
                type: "register_code",
              },
            },
            (res) => {
              this.callback = true;
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // getAlias(siteId) {
    //   Ajax({
    //     method: "post",
    //     url: "/site/seoAlias",
    //     params: {
    //       site_id: siteId,
    //     },
    //   })
    //     .then(() => {})
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
    toggleDownload() {
      this.downloadShow = !this.downloadShow;
    },
    /** *
     * 获取验证码
     * * */
    async handleGetCode() {
      if (!this.isGetCodeState) {
        return;
      }
      if (!this.isPhone) {
        alert("请确定手机号码是否正确!");
        return;
      }
      Ajax(
        {
          url: "/admin/captcha",
          method: "post",
          params: {
            mobile: this.ruleForm.phoneMsg,
            type: "register_code",
          },
        },
        (res) => {
          if (res.data === true) {
            this.$message.success("验证码发送成功");
            this.handelCountdown();
          }
        }
      );
    },
    handelCountdown() {
      /** *
       * 倒计时
       * */
      this.codeText = `${this.Countdown}s后重新获取`;
      this.isGetCodeState = false;
      this.timer = setInterval(() => {
        this.Countdown -= 1;
        this.codeText = `${this.Countdown}s后重新获取`;
        if (this.Countdown === 0) {
          this.codeText = "获取验证码";
          this.isGetCodeState = true;
          this.Countdown = 60;
          clearInterval(this.timer);
        }
      }, 1000);
    },
    // async handleLogin() {
    //   const { data } = await ajax.post("/api/user/register", {
    //     mobile: this.phoneMsg,
    //     code: this.codeMsg,
    //   });

    //   if (data.code === 10007) {
    //     // 账号已经存在
    //     this.showCanLogin = true;
    //   }
    //   if (data.code === 30003) {
    //     this.$message.error("验证码错误，请重新输入");
    //   }
    //   if (data.code === 200) {
    //     this.skipWechat();
    //   }
    // },
    skipWechat() {
      this.isLogin = true;
      this.showLoginSuccess = true;
      setTimeout(() => {
        this.goToSignUp();
      }, 500);
    },
    goToSignUp() {
      window.location = this.loginUrl;
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#loginApp {
  position: relative;

  min-height: 100vh;
  background-image: url("../../../assets/img/bg.png");
  background-repeat: repeat;
  background-size: contain;
  padding: 0 15px;
  .flex-vc {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .success-callback {
    position: absolute;
    top: 25%;
    left: 10%;
    .callback-img {
      width: 182px;
      margin-bottom: 14px;
    }
    .thank-text {
      font-size: 46px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 54px;
      margin-bottom: 23px;
    }
    .time-text {
      display: inline-block;
      font-size: 20px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 23px;
      padding: 6px 20px;
      border: 1px solid #fff;
      border-radius: 100px;
    }
  }
  .down-load-btn {
    position: absolute;
    cursor: pointer;
    top: 4%;
    right: 4%;
    width: 125px;
    height: 40px;
    border-radius: 2px;
    border: 1px solid #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 21px;
  }

  .main-area {
    flex: 1;
    .logo-row {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 29px;
      .logo-img {
        width: 209px;
      }
    }
    .login-area {
      margin-left: auto;
      margin-right: auto;
      background-color: #fff;
      border-radius: 20px;
      max-width: 430px;
      width: 100%;

      .vc {
        padding: 34px 35px;
        .l-title {
          font-size: 18px;
          font-family: PingFang SC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 21px;
          text-align: center;
          margin-bottom: 24px;
        }
        .login-btn {
          background: #4a82f4;
          border-radius: 4px;
          font-size: 18px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 48px;
          text-align: center;
          cursor: pointer;
        }
        .disable-btn {
          background: #ccc;
          pointer-events: none;
        }
        .sign-up {
          text-align: center;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 20px;
          .link-text {
            text-decoration: none;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #4a82f4;
            line-height: 20px;
          }
        }
      }
      .bind-vc {
        padding: 200px 0 240px 0;
        text-align: center;
        .bind-wechat {
          font-size: 20px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 28px;
          margin-bottom: 28px;
        }
        .skip-btn {
          display: inline-block;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 42px;
          text-align: center;
          border-radius: 2px;
          border: 1px solid #cccccc;
          padding: 0 30px;
          margin-right: 30px;
        }
        .bind-btn {
          display: inline-block;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 42px;
          padding: 0 15px;
          background: #4a82f4;
          border-radius: 2px;
          border: 1px solid #4a82f4;
        }
      }
    }
  }
}
.input-wrap {
  background: #f5f5f9;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  padding-top: 8px;
  margin-bottom: 24px;
  .el-form-item {
    margin-bottom: 0px;
  }
  .cus-close {
    position: absolute;
    bottom: 0;
    right: -7px;
    border: 10px solid transparent;
    color: #ccc;
  }
  .input-label {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 16px;
    margin-left: 15px;
  }
  .cus-input .el-input__inner,
  .cus-input .el-textarea__inner {
    background-color: #f5f5f9;
    border: 1px solid transparent;
    font-size: 16px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #333;
    line-height: 24px;
  }
  .flex-x {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .flex-basis50 {
      flex-basis: 50%;
    }
    .get-code {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999;
      line-height: 19px;
      margin-right: 15px;
      word-break: keep-all;
      pointer-events: none;
    }
    .getCodeBtnActive {
      color: #4a82f4 !important;
      pointer-events: unset !important;
    }
  }
}
.center {
  text-align: center;
}
.tip-text {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 25px;
}
.go-btn {
  display: inline-block;
  background: #4a82f4;
  text-decoration: none;
  padding: 0 15px;
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 34px;
  text-align: center;
  margin-top: 25px;
}
.blue-text {
  margin-top: 25px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #4a82f4;
  line-height: 22px;
}
.hight-pl {
  height: 90px;
}
</style>
