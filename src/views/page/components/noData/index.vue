<template>
  <div class="no-data-wrap">
    <img
      src="../../../../assets/img/noData.png"
      alt="noData"
      class="no-data-img"
    />
    <div class="h1-text">{{ title }}</div>
    <div class="h2-text">{{ des }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "暂无内容",
    },
    des: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.no-data-wrap {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.no-data-img {
  width: 400px;
  margin-bottom: 24px;
}
.h1-text {
  font-size: 24px;
  font-family: PingFang SC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8500000238418579);
  line-height: 32px;
  margin-bottom: 8px;
}
.h2-text {
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.44999998807907104);
  line-height: 22px;
}
</style>
