<template>
  <el-form-item>
    <el-button type="primary" @click="search()">搜索</el-button>
    <el-button type="info" @click="clearSearch()">清空</el-button>

    <el-button icon="el-icon-refresh" type="primary" plain @click="refreshPage()"></el-button>
    <d2-button-add v-show="addButton==1" @add="add()"></d2-button-add>
    <el-button type="primary" v-show="exportButton==1" @click="onExportExcel()">导出</el-button>
  </el-form-item>
</template>

<script>
export default {
  data() {
    return {
      pageInfo: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      searchParams: {},
      addButton: 1,
      exportButton:0,
    };
  },
  computed: {},
  props: {
    getSearchParams: {},
    getPageInfo: {},
    isAdd: {},
    isExport:{}
  },
  watch: {
    // 初始化页码
    getPageInfo: {
      handler(val) {
        this.pageInfo = val;
      },
      immediate: true
    },
    // 初始化搜索参数
    getSearchParams: {
      handler(val) {
        this.searchParams = val;
      },
      immediate: true
    },
    // 是否有新增按钮
    isAdd: {
      handler(val) {
        this.addButton = val;
      },
      immediate: true
    },
    isExport:{
      handler(val){
        this.exportButton = val;
      },
       immediate: true
    }
  },
  methods: {
    // 模糊搜索
    search() {
      this.pageInfo.currentPage = 1;
      this.$emit("getData");
    },
    // 清空搜索条件
    clearSearch() {
      for (let key in this.searchParams) {
        this.searchParams[key] = "";
      }
    },
    // 刷新页面
    refreshPage() {
      this.pageInfo.currentPage = 1;
      this.$emit("getData");
      this.$message({ message: "刷新成功！", type: "success" });
    },
    // 增加弹出框
    add() {
      this.$emit("add");
    },
    onExportExcel(){
      this.$emit("onExportExcel");
    }
  }
};
</script>
