<template>
  <div id="loginApp">
    <div class="hight-pl"></div>
    <div class="flex-vc">
      <div class="main-area">
        <div class="logo-row">
          <img src="../../../assets/img/logo.png" alt="logo" class="logo-img" />
        </div>
        <div class="login-area">
          <div class="vc">
            <div class="l-title">选择团队</div>
            <div class="team-list">
              <div
                class="team-item"
                v-for="(item, index) in teamList"
                :key="index"
                @click="selectTeam(item)"
              >
                <div class="key-text">
                  {{ item.name }}
                </div>
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
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
// import ajax from "../src/js/ajax.js";
// import global from "../global.js";
export default {
  name: "login",
  components: {},
  data() {
    return {
      teamList: [],
    };
  },
  computed: {},
  created() {
    this.teamList = this.$route.params.companyList;
  },
  mounted() {},
  methods: {
    selectTeam(item) {
      Ajax(
        {
          method: "post",
          url: "/enterprise/edit",
          params: {
            peid: item.peid,
          },
        },
        (res) => {
          if (res.data === true) {
            this.$router.push({
              name: "website",
            });
          }
        }
      );
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
        .team-list {
          overflow-y: scroll;
          max-height: 256px; // 64*4 最多4个触发滚动
          .team-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 14px;
            height: 40px;
            background: #f5f5f9;
            border-radius: 4px 4px 4px 4px;
            border: 1px solid #e8e8e8;
            margin-bottom: 24px;
            font-size: 16px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 24px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.hight-pl {
  height: 90px;
}
</style>
