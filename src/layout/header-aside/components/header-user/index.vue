<template>
  <el-dropdown size="small" class="d2-mr">
    <div class="f-wrap">
      <el-avatar> {{ info.name ? `${info.name}`[0] : "" }} </el-avatar
      ><span class="btn-text">{{ info.name ? `${info.name}` : "未登录" }}</span>
    </div>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5" />
        注销
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("d2admin/user", ["info"]),
  },
  methods: {
    ...mapActions("d2admin/account", ["logout"]),
    /**
     * @description 登出
     */
    logOff() {
      this.logout({
        confirm: true,
      });
    },
  },
};
</script>
<style lang="scss">
.f-wrap {
  display: flex;
}
</style>
