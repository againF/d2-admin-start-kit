<template>
    <el-form-item>
        <d2-button-add v-show='addButton==1' @add="add()"></d2-button-add>
        <el-button icon="el-icon-refresh" type="primary" plain @click="refreshPage()"></el-button>
    </el-form-item>
</template>

<script>
export default {
  data () {
    return {
      pageInfo: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      addButton: 1
    }
  },
  computed: {

  },
  props: {
    getPageInfo: {},
    isAdd: {}
  },
  watch: {
    // 初始化页码
    getPageInfo: {
      handler (val) {
        this.pageInfo = val
      },
      immediate: true
    },
    // 是否有新增按钮
    isAdd: {
      handler (val) {
        this.addButton = val
      },
      immediate: true
    }
  },
  methods: {
    // 刷新页面
    refreshPage () {
      this.pageInfo.currentPage = 1
      this.$emit('getData')
      this.$message({ message: '刷新成功！', type: 'success' })
    },
    // 增加弹出框
    add () {
      this.$emit('add')
    }
  }
}
</script>
