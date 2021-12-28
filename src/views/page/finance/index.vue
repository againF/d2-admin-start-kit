<template>
  <div class="full-height">
    <page-header
      :show-back-arrow="false"
      head-text="财务"
      :head-btn-text="headBtnText"
      @clickHeadBtn="handleClickHeadBtn"
    />
    <div class="padding-wrap">
      <div v-show="!hasInfo" class="tip-bar">
        尚未添加付款信息，我们无法向您支付款项
      </div>
      <el-table :data="tableData" class="mb63" v-loading="loading">
        <el-table-column prop="month" label="时间">
          <template slot-scope="scope">
            <div>
              <router-link
                :to="{ name: 'monthDetail', params: { time: scope.row.month } }"
                >{{ scope.row.month }}</router-link
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="new_num" label="成功交付新站"> </el-table-column>
        <el-table-column prop="renew_num" label="成功续费新站">
        </el-table-column>
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
import pageHeader from "../components/pageHeader";
import pagination from "../../../components/page-list/pagination";
export default {
  name: "finance",
  components: { pageHeader, pagination },
  data() {
    return {
      tableData: [
        {
          time: "2021年12月14日13:31:08",
          sent: 432,
          again: 43223,
        },
        {
          time: "2022年12月14日13:31:08",
          sent: 432,
          again: 43223,
        },
        {
          time: "2023年12月14日13:31:08",
          sent: 432,
          again: 43223,
        },
        {
          time: "2021年12月14日13:31:08",
          sent: 432,
          again: 43223,
        },
        {
          time: "2021年12月14日13:31:08",
          sent: 432,
          again: 43223,
        },
        {
          time: "2021年12月14日13:31:08",
          sent: 432,
          again: 43223,
        },
        {
          time: "2021年12月14日13:31:08",
          sent: 432,
          again: 43223,
        },
        {
          time: "2021年12月14日13:31:08",
          sent: 432,
          again: 43223,
        },
        {
          time: "2021年12月14日13:31:08",
          sent: 432,
          again: 43223,
        },
        {
          time: "2021年12月14日13:31:08",
          sent: 432,
          again: 43223,
        },
        {
          time: "2021年12月14日13:31:08",
          sent: 432,
          again: 43223,
        },
        {
          time: "2021年12月14日13:31:08",
          sent: 432,
          again: 43223,
        },
      ],
      pageInfo: {
        // 分页参数
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      hasInfo: false, // 是否有收款信息
      loading: false,
    };
  },
  computed: {
    headBtnText() {
      if (this.hasInfo) {
        return "查看收款信息";
      } else {
        return "添加收款信息";
      }
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getFinanceInfo();
      this.getData();
    },
    getFinanceInfo() {
      Ajax(
        {
          url: "/finance/show",
          method: "post",
        },
        (res) => {
          console.log("res--", res);
          console.log(res.data instanceof Array);

          if (res.data instanceof Array && res.data.length === 0) {
            this.hasInfo = false;
          } else {
            this.hasInfo = true;
          }
        }
      );
    },
    handleClickHeadBtn() {
      if (this.hasInfo) {
        this.$router.push({
          name: "checkInfo",
        });
      } else {
        this.$router.push({
          name: "addInfo",
        });
      }
    },
    getData() {
      Ajax(
        {
          url: "/finance/list",
          method: "post",
          params: {
            page_no: this.pageInfo.currentPage,
            page_size: this.pageInfo.pageSize,
          },
        },
        (res) => {
          [this.loading, this.tableData, this.pageInfo] = formatResult(res);
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.tip-bar {
  padding: 9px 16px;
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  line-height: 22px;
  background: #fffbe6;
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
  border: 1px solid #ffe58f;
  margin-bottom: 24px;
}
.mb63 {
  margin-bottom: 63px;
}
</style>
