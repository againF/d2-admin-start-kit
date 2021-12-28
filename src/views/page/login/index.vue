<template>
  <div id="loginApp">
    <div @click="goToRegister" class="down-load-btn">申请加入</div>
    <div class="hight-pl"></div>
    <div class="flex-vc">
      <div class="main-area">
        <div class="logo-row">
          <img src="../../../assets/img/logo.png" alt="logo" class="logo-img" />
        </div>
        <div class="login-area">
          <div v-show="isLogin" class="vc">
            <div class="l-title">Mysitefy伙伴平台登录</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
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
            <div
              @click="handleLogin('ruleForm')"
              class="login-btn"
              :class="disBtn"
            >
              登录
            </div>
          </div>
        </div>
      </div>
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
import util from "@/libs/util";
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
    return {
      downloadShow: false, // 是否显示下载二维码
      ruleForm: {
        phoneMsg: "", // 输入的手机号
        codeMsg: "", // 验证码
      },
      rules: {
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
      companyList: [], // 企业
    };
  },
  computed: {
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
    goToRegister() {
      this.$router.push({
        name: "register",
      });
    },
    handleLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Ajax(
            {
              url: "/admin/login",
              method: "post",
              params: {
                mobile: this.ruleForm.phoneMsg,
                code: this.ruleForm.codeMsg,
                type: "mobile_login_code",
              },
            },
            (res) => {
              if (res.status_code === 200) {
                util.cookies.set("token", res.data);
                this.getUserInfo();
                this.getCompanyList().then(() => {
                  /*
                  若该用户有多个企业，需要选择企业，之后进入对应企业的“网站”页面
                  若该用户只有一个企业直接进入“网站”页面
                  */
                  if (this.companyList.length > 1) {
                    this.$router.push({
                      name: "chooseTeam",
                      params: {
                        companyList: this.companyList,
                      },
                    });
                  } else {
                    this.$router.push({
                      name: "website",
                    });
                  }
                });
              }
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getUserInfo() {
      Ajax(
        {
          // 获取用户信息
          method: "get",
          url: "/user/info",
        },
        (res) => {
          // console.log('用户信息', res)
          util.cookies.set("uuid", res.data.uid);
          this.$store.dispatch(
            "d2admin/user/set",
            {
              name: res.data.username,
            },
            { root: true }
          );
        }
      );
    },
    // 获取企业列表
    getCompanyList() {
      return new Promise((resolve, reject) => {
        Ajax(
          {
            url: "/enterprise/list",
            method: "post",
            params: {},
          },
          (res) => {
            this.companyList = res.data;
            resolve();
          }
        );
      });
    },
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
            type: "mobile_login_code",
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
  .input-label {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 16px;
    margin-left: 15px;
  }
  .cus-input .el-input__inner {
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
      cursor: pointer;
    }
    .getCodeBtnActive {
      color: #4a82f4 !important;
      pointer-events: unset !important;
      cursor: pointer;
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
