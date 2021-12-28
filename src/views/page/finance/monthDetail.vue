<template>
  <div class="full-height">
    <page-header
      :head-text="time"
      head-btn-text="导出"
      @clickHeadBtn="handleClickHeadBtn"
    />
    <div class="padding-wrap">
      <el-table :data="tableData" class="mb63" v-loading="loading">
        <el-table-column prop="pay_time" label="成功时间"> </el-table-column>
        <el-table-column prop="name" label="网站名称"> </el-table-column>
        <el-table-column prop="status" label="网站性质"> </el-table-column>
        <el-table-column prop="mobile" label="接收者手机"> </el-table-column>
      </el-table>
      <pagination :getPageInfo="pageInfo" @getData="getData" ref="page" />
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
import axios from "@/plugin/axios";
import util from "@/libs/util";
import pageHeader from "../components/pageHeader";
import pagination from "../../../components/page-list/pagination";
export default {
  name: "monthDetail",
  components: { pageHeader, pagination },
  data() {
    return {
      time: "",
      loading: false,
      tableData: [],
      pageInfo: {
        // 分页参数
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
    };
  },

  watch: {
    $route: "getData",
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      if (this.$route.params.time) {
        this.time = this.$route.params.time;
        Ajax(
          {
            url: "/finance/listSite",
            method: "post",
            params: {
              month: this.time,
              page_no: this.pageInfo.currentPage,
              page_size: this.pageInfo.pageSize,
            },
          },
          (res) => {
            [this.loading, this.tableData, this.pageInfo] = formatResult(res);
          }
        );
      }
    },
    // 导出
    handleClickHeadBtn() {
      axios({
        method: "get",
        url: "/finance/export",
        headers: {
          Authorization: "bearer" + util.cookies.get("token"),
        },
        responseType: "blob",
        params: {
          is_export: 1,
          month: this.time,
        },
      })
        .then((res) => {
          const link = document.createElement("a");
          const blob = new Blob([res], {
            type: "application/vnd.ms-excel",
          });
          link.style.display = "none";
          link.href = URL.createObjectURL(blob);
          link.setAttribute("download", `月份详情.xlsx`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss" scoped></style>
