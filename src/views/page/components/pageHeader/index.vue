<template>
  <div class="page-header">
    <div class="left">
      <i v-if="showBackArrow" class="el-icon-back" @click="goBack"></i>
      <div class="text">{{ headText }}</div>
    </div>
    <div v-if="showRightBtn" @click="clickBtn" class="right">
      {{ headBtnText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headText: {
      type: String,
      default: "xxx",
    },
    headBtnText: {
      type: String,
      default: "xxx",
    },
    showBackArrow: {
      type: Boolean,
      default: true,
    },
    showRightBtn: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    positionData() {
      return this.$store.state.positionData;
    },
  },
  mounted() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    clickBtn() {
      this.$emit("clickHeadBtn");
    },
  },
};
</script>

<style lang="scss" scoped>
.page-header {
  padding: 15px 24px;
  display: flex;
  align-content: center;
  justify-content: space-between;
  background-color: #fff;
  .left {
    display: flex;
    align-content: center;
    .el-icon-back {
      line-height: 28px;
      margin-right: 16px;
      cursor: pointer;
    }
    .text {
      font-size: 20px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.8500000238418579);
      line-height: 28px;
    }
  }
  .right {
    background: #4a82f4;
    box-shadow: 0px 2px 0px 1px rgba(0, 0, 0, 0.0430000014603138);
    border-radius: 2px 2px 2px 2px;
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 32px;
    text-align: center;
    padding: 0 16px;
    cursor: pointer;
  }
}
</style>
