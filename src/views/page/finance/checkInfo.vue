<template>
  <div class="full-height">
    <page-header head-text="收款信息" headBtnText="修改" @clickHeadBtn="edit" />
    <div class="padding-wrap">
      <div class="row">
        <div class="key">公司名称：</div>
        <div class="value">
          {{ name }}
        </div>
      </div>
      <div class="row">
        <div class="key">税号：</div>
        <div class="value">
          {{ nocode }}
        </div>
      </div>
      <div class="row">
        <div class="key">公司地址：</div>
        <div class="value">
          {{ address }}
        </div>
      </div>
      <div class="row">
        <div class="key">公司电话：</div>
        <div class="value">
          {{ phone }}
        </div>
      </div>
      <div class="row">
        <div class="key">银行卡号：</div>
        <div class="value">
          {{ cardcode }}
        </div>
      </div>
      <div class="row">
        <div class="key">开户行：</div>
        <div class="value">
          {{ bankname }}
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
import pageHeader from "../components/pageHeader";
export default {
  name: "checkInfo",
  components: { pageHeader },
  data() {
    return {
      id: "",
      name: "",
      nocode: "",
      address: "",
      phone: "",
      cardcode: "",
      bankname: "",
    };
  },
  mounted() {
    this.getInfo();
  },
  watch: {
    $route: "getInfo",
  },
  methods: {
    getInfo() {
      Ajax(
        {
          url: "/finance/show",
          method: "post",
        },
        (res) => {
          this.id = res.data.id;
          this.name = res.data.name;
          this.nocode = res.data.nocode;
          this.address = res.data.address;
          this.phone = res.data.phone;
          this.cardcode = res.data.cardcode;
          this.bankname = res.data.bankname;
        }
      );
    },
    edit() {
      this.$router.push({
        name: "editInfo",
        params: {
          id: this.id,
          name: this.name,
          nocode: this.nocode,
          address: this.address,
          phone: this.phone,
          cardcode: this.cardcode,
          bankname: this.bankname,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.padding-wrap {
  padding: 47px 70px;
  background-color: #fff;
  .row {
    display: flex;
    .key {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 22px;
      min-width: 70px;
      margin-right: 110px;
    }
    .value {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 22px;
    }
  }
}
</style>
