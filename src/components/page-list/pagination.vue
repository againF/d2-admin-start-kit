<template>
    <el-pagination
      background
      layout="prev,pager,sizes,next,total"
      @current-change="handleCurrentChange"
      @size-change="sizeChange"
      :page-size="pageInfo.pageSize"
      :current-page="pageInfo.currentPage"
      :total="pageInfo.total">
    </el-pagination>
</template>

<script>
export default {
  data () {
    return {
      pageInfo: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      }
    }
  },
  computed: {

  },
  props: {
    getSearchParams: {},
    getPageInfo: {}
  },
  watch: {
    // 初始化页码
    getPageInfo: {
      handler (val) {
        this.pageInfo = val
      },
      immediate: true
    }
  },
  methods: {
    // 改变页码
    handleCurrentChange (val) {
      this.pageInfo.currentPage = val
      this.$emit('getData')
    },
    // 改变分页显示条数
    sizeChange (val) {
      this.pageInfo.currentPage = 1
      this.pageInfo.pageSize = val
      this.$emit('getData')
    }
  }
}
</script>
