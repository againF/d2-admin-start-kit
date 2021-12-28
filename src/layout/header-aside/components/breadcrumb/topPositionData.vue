<template>
  <div class="top-position-data-box">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in positionData"
        :key="index"
        :to="{ path: item.path }"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    positionData() {
      return this.$store.state.positionData;
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.top-position-data-box {
  width: 100%;
  padding: 16px 24px 5px 24px;
  background: #ffffff;
  display: flex;
  align-items: center;
}
</style>
