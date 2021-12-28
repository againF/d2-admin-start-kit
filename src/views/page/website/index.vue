<template>
  <div class="full-height">
    <page-header
      :show-back-arrow="false"
      head-text="网站"
      head-btn-text="创建网站"
      @clickHeadBtn="handleClickHeadBtn"
    />
    <div class="page-content">
      <template v-if="noWebsite">
        <no-data des="还没有创建任何网站立刻开始吧"></no-data>
      </template>
      <template v-else>
        <div class="padding-wrap">
          <div class="bar-wrap">
            <div class="bar-item">
              <span class="key">创建网站数量</span>
              <span class="value">{{ totalNum }}</span>
            </div>
            <div class="bar-item">
              <span class="key">成功交付新站</span>
              <span class="value">{{ newNum }}</span>
            </div>
            <div class="bar-item">
              <span class="key">成功续费网站</span>
              <span class="value">{{ renewNum }}</span>
            </div>
          </div>
          <div class="table-wrap">
            <div class="search-wrap">
              <el-select
                class="mr76"
                v-model="webStatus"
                placeholder="请选择"
                @change="changeStatus"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="table-detail">
              <el-table
                ref="singleTable"
                :data="tableData"
                height="500"
                max-height="500"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 100%"
                v-loading="loading"
              >
                <el-table-column property="name" label="网站名称">
                  <template slot-scope="scope">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="scope.row.name"
                      placement="top"
                    >
                      <div class="one-line">{{ scope.row.name }}</div>
                    </el-tooltip>
                  </template>
                </el-table-column>

                <el-table-column property="status" label="状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status === 1" class="black-status"
                      >开发中</span
                    >
                    <span v-if="scope.row.status === 2" class="yellow-status"
                      >待接收</span
                    >
                    <span v-if="scope.row.status === 3" class="black-status"
                      >试用期</span
                    >
                    <span v-if="scope.row.status === 4" class="gray-status"
                      >已付款待定期</span
                    >
                    <span v-if="scope.row.status === 5" class="green-status"
                      >已成功</span
                    >
                    <span v-if="scope.row.status === 6" class="origin-status"
                      >即将到期</span
                    >
                    <span v-if="scope.row.status === 7" class="origin-status"
                      >已到期（保留期）</span
                    >
                    <span v-if="scope.row.status === 8" class="blue-status"
                      >已续约待定期</span
                    >
                    <span v-if="scope.row.status === 9" class="gray-status"
                      >已流失</span
                    >
                    <span v-if="scope.row.status === 10" class="gray-status"
                      >已退款</span
                    >
                  </template>
                </el-table-column>
                <el-table-column property="operate" label="操作">
                  <template slot-scope="scope">
                    <el-link
                      @click="showDeliver(scope.row)"
                      v-if="scope.row.status === 1"
                      type="primary"
                      >交付</el-link
                    >
                    <el-link
                      @click="showCancelDeliver(scope.row)"
                      v-if="scope.row.status === 2"
                      type="primary"
                      >取消交付</el-link
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-table
                :data="detailTableData"
                height="500"
                max-height="500"
                style="width: 100%"
                class="scorll"
                :cell-style="cellStyle"
                v-loading="loading"
              >
                <el-table-column label="详情">
                  <template slot-scope="scope">
                    <el-timeline>
                      <el-timeline-item
                        class="customer-timeline-item"
                        v-for="(activity, index) in activities"
                        :key="index"
                        :timestamp="activity.time_str"
                      >
                        {{ activity.msg }}
                      </el-timeline-item>
                    </el-timeline>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <pagination :getPageInfo="pageInfo" @getData="getData" ref="page" />
        </div>
      </template>
    </div>
    <el-dialog
      title="请输入交付人手机号"
      :close-on-click-modal="false"
      :visible.sync="isShowDeliver"
      width="30%"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="phone">
          <el-input v-model="ruleForm.phone" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDeliver = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="取消交付" :visible.sync="isShowCancelDeliver" width="30%">
      <span>取消交付后该用户无法接收网站</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowCancelDeliver = false">取 消</el-button>
        <el-button type="danger" @click="cancelDeliver">取消交付</el-button>
      </span>
    </el-dialog>
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
import noData from "../components/noData";
import pagination from "../../../components/page-list/pagination";
export default {
  name: "website",
  components: { pageHeader, noData, pagination },
  data() {
    var checkPhone = (rule, value, callback) => {
      const reg = /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;
      if (reg.test(value)) {
        // 正確
        callback();
      } else {
        // 錯誤
        return callback(new Error("请输入正确的手机号"));
      }
    };
    return {
      loading: false,
      pageInfo: {
        // 分页参数
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      noWebsite: true,
      webStatus: "",
      statusOptions: [
        {
          value: 1,
          label: "开发中",
        },
        {
          value: 2,
          label: "待接收",
        },
        {
          value: 3,
          label: "试用期",
        },
        {
          value: 4,
          label: "已付款待定期",
        },
        {
          value: 5,
          label: "已成功",
        },
        {
          value: 6,
          label: "即将到期",
        },
        {
          value: 7,
          label: "已到期(保留期)",
        },
        {
          value: 8,
          label: "已续约待定期",
        },
        {
          value: 9,
          label: "已流失",
        },
        {
          value: 10,
          label: "已退款",
        },
      ],
      detailTableData: [{}], // 这里定空数据用来消除“暂无数据提示”
      activities: [],
      cellStyle: {
        background: "#F4F7FC",
      },
      tableData: [],
      // tableData: [
      //   {
      //     name: "活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按",
      //     status: "开发中",
      //     operate: "operate",
      //     activities: [
      //       {
      //         content:
      //           "活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1活动按期开始1",
      //         timestamp: "xxx",
      //       },
      //       {
      //         content: "通过审核",
      //         timestamp: "2018-04-13",
      //       },
      //       {
      //         content: "创建成功",
      //         timestamp: "2018-04-11",
      //       },
      //       {
      //         content: "活动按期开始1",
      //         timestamp: "2018-04-15",
      //       },
      //       {
      //         content: "通过审核",
      //         timestamp: "2018-04-13",
      //       },
      //       {
      //         content: "创建成功",
      //         timestamp: "2018-04-11",
      //       },
      //       {
      //         content: "活动按期开始1",
      //         timestamp: "2018-04-15",
      //       },
      //       {
      //         content: "通过审核",
      //         timestamp: "2018-04-13",
      //       },
      //       {
      //         content: "创建成功",
      //         timestamp: "2018-04-11",
      //       },
      //       {
      //         content: "活动按期开始1",
      //         timestamp: "2018-04-15",
      //       },
      //       {
      //         content: "通过审核",
      //         timestamp: "2018-04-13",
      //       },
      //       {
      //         content: "创建成功",
      //         timestamp: "2018-04-11",
      //       },
      //       {
      //         content: "活动按期开始1",
      //         timestamp: "2018-04-15",
      //       },
      //       {
      //         content: "通过审核",
      //         timestamp: "2018-04-13",
      //       },
      //       {
      //         content: "创建成功",
      //         timestamp: "2018-04-11",
      //       },
      //     ],
      //   },
      //   {
      //     name: "name",
      //     status: "待接收",
      //     operate: "operate",
      //     activities: [
      //       {
      //         content: "活动按期开始2",
      //         timestamp: "2018-04-15",
      //       },
      //       {
      //         content: "通过审核",
      //         timestamp: "2018-04-13",
      //       },
      //       {
      //         content: "创建成功",
      //         timestamp: "2018-04-11",
      //       },
      //     ],
      //   },
      //   {
      //     name: "name",
      //     status: "status",
      //     operate: "operate",
      //     activities: [
      //       {
      //         content: "活动按期开始",
      //         timestamp: "2018-04-15",
      //       },
      //       {
      //         content: "通过审核",
      //         timestamp: "2018-04-13",
      //       },
      //       {
      //         content: "创建成功",
      //         timestamp: "2018-04-11",
      //       },
      //     ],
      //   },
      //   {
      //     name: "name",
      //     status: "status",
      //     operate: "operate",
      //     activities: [
      //       {
      //         content: "活动按期开始",
      //         timestamp: "2018-04-15",
      //       },
      //       {
      //         content: "通过审核",
      //         timestamp: "2018-04-13",
      //       },
      //       {
      //         content: "创建成功",
      //         timestamp: "2018-04-11",
      //       },
      //     ],
      //   },
      //   {
      //     name: "name",
      //     status: "status",
      //     operate: "operate",
      //     activities: [
      //       {
      //         content: "活动按期开始",
      //         timestamp: "2018-04-15",
      //       },
      //       {
      //         content: "通过审核",
      //         timestamp: "2018-04-13",
      //       },
      //       {
      //         content: "创建成功",
      //         timestamp: "2018-04-11",
      //       },
      //     ],
      //   },
      //   {
      //     name: "name",
      //     status: "status",
      //     operate: "operate",
      //     activities: [
      //       {
      //         content: "活动按期开始1",
      //         timestamp: "2018-04-15",
      //       },
      //       {
      //         content: "通过审核",
      //         timestamp: "2018-04-13",
      //       },
      //       {
      //         content: "创建成功",
      //         timestamp: "2018-04-11",
      //       },
      //       {
      //         content: "活动按期开始1",
      //         timestamp: "2018-04-15",
      //       },
      //       {
      //         content: "通过审核",
      //         timestamp: "2018-04-13",
      //       },
      //       {
      //         content: "创建成功",
      //         timestamp: "2018-04-11",
      //       },
      //       {
      //         content: "活动按期开始1",
      //         timestamp: "2018-04-15",
      //       },
      //       {
      //         content: "通过审核",
      //         timestamp: "2018-04-13",
      //       },
      //       {
      //         content: "创建成功",
      //         timestamp: "2018-04-11",
      //       },
      //       {
      //         content: "活动按期开始1",
      //         timestamp: "2018-04-15",
      //       },
      //       {
      //         content: "通过审核",
      //         timestamp: "2018-04-13",
      //       },
      //       {
      //         content: "创建成功",
      //         timestamp: "2018-04-11",
      //       },
      //       {
      //         content: "活动按期开始1",
      //         timestamp: "2018-04-15",
      //       },
      //       {
      //         content: "通过审核",
      //         timestamp: "2018-04-13",
      //       },
      //       {
      //         content: "创建成功",
      //         timestamp: "2018-04-11",
      //       },
      //     ],
      //   },
      //   {
      //     name: "name",
      //     status: "status",
      //     operate: "operate",
      //     activities: [
      //       {
      //         content: "活动按期开始2",
      //         timestamp: "2018-04-15",
      //       },
      //       {
      //         content: "通过审核",
      //         timestamp: "2018-04-13",
      //       },
      //       {
      //         content: "创建成功",
      //         timestamp: "2018-04-11",
      //       },
      //     ],
      //   },
      //   {
      //     name: "name",
      //     status: "status",
      //     operate: "operate",
      //     activities: [
      //       {
      //         content: "活动按期开始",
      //         timestamp: "2018-04-15",
      //       },
      //       {
      //         content: "通过审核",
      //         timestamp: "2018-04-13",
      //       },
      //       {
      //         content: "创建成功",
      //         timestamp: "2018-04-11",
      //       },
      //     ],
      //   },
      //   {
      //     name: "name",
      //     status: "status",
      //     operate: "operate",
      //     activities: [
      //       {
      //         content: "活动按期开始",
      //         timestamp: "2018-04-15",
      //       },
      //       {
      //         content: "通过审核",
      //         timestamp: "2018-04-13",
      //       },
      //       {
      //         content: "创建成功",
      //         timestamp: "2018-04-11",
      //       },
      //     ],
      //   },
      //   {
      //     name: "name",
      //     status: "status",
      //     operate: "operate",
      //     activities: [
      //       {
      //         content: "活动按期开始",
      //         timestamp: "2018-04-15",
      //       },
      //       {
      //         content: "通过审核",
      //         timestamp: "2018-04-13",
      //       },
      //       {
      //         content: "创建成功",
      //         timestamp: "2018-04-11",
      //       },
      //     ],
      //   },
      // ],
      isShowDeliver: false, // 交付弹框
      isShowCancelDeliver: false, // 取消交付弹框
      ruleForm: {
        phone: "",
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
      },
      totalNum: "", // 创建个数
      newNum: "", // 新站个数
      renewNum: "", // 续费个数
      currentOperateId: "", // 当前准备交付或取消交付的id
    };
  },
  created() {
    this.initPage();
  },
  mounted() {},
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "initPage",
  },
  methods: {
    initPage() {
      this.getSiteInfo()
        .then(() => {
          this.initTableData();
        })
        .catch((e) => {
          console.log("error", e);
        });
    },
    initTableData() {
      this.getData().then(() => {
        console.log("then");
        this.$refs.singleTable.setCurrentRow(this.tableData[0]);
      }); // 页面初始获取
    },
    getData() {
      return new Promise((resolve, reject) => {
        const conditionParam = {
          search: {
            status: this.webStatus,
          },
        };
        const params = formatResponse(
          this.pageInfo,
          "id", // sort排序字段
          "desc", // order desc,asc 默认desc
          conditionParam
        );
        Ajax(
          {
            url: "/site/list",
            method: "post",
            params,
          },
          (res) => {
            [this.loading, this.tableData, this.pageInfo] = formatResult(res);
            resolve();
          }
        );
      });
    },
    handleClickHeadBtn() {
      this.$router.push({
        name: "createWebsite",
      });
    },
    getSiteInfo() {
      return new Promise((resolve, reject) => {
        Ajax(
          {
            url: "/site/info",
            method: "post",
          },
          (res) => {
            this.totalNum = res.data.total_num;
            if (this.totalNum > 0) {
              this.noWebsite = false;
              resolve();
            } else {
              this.noWebsite = true;
              reject();
            }
            this.newNum = res.data.new_num;
            this.renewNum = res.data.renew_num;
          }
        );
      });
    },
    changeStatus(val) {
      console.log("val", val);
    },
    handleCurrentChange(val) {
      if (val && val.list) {
        this.activities = val.list;
      } else {
        this.activities = [];
      }
    },
    showDeliver(data) {
      this.currentOperateId = data.id;
      this.isShowDeliver = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Ajax(
            {
              url: "/site/edit",
              method: "post",
              params: {
                id: this.currentOperateId,
                mobile: this.ruleForm.phone,
              },
            },
            (res) => {
              this.$message.success("已向该用户发送信息，等待TA的接收");
              this.initPage();
              this.isShowDeliver = false;
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    showCancelDeliver(data) {
      this.currentOperateId = data.id;
      this.isShowCancelDeliver = true;
    },
    cancelDeliver() {
      Ajax(
        {
          url: "/site/edit",
          method: "post",
          params: {
            id: this.currentOperateId,
          },
        },
        (res) => {
          this.$message.success("操作成功");
          this.initPage();
          this.isShowCancelDeliver = false;
        }
      );
    },
  },
};
</script>
<style lang="scss">
.customer-timeline-item .el-timeline-item__node {
  border: 2px solid #4a82f4;
  background: #fff;
}
.scorll .el-table__body-wrapper {
  overflow: scroll;
}
</style>
<style lang="scss" scoped>
.one-line {
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.page-content {
  position: relative;
  height: 100%;
}
.padding-wrap {
  .bar-wrap {
    margin-bottom: 21px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .bar-item {
      flex-basis: 32%;
      background: #fff;
      text-align: center;
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 86px;
      .key {
        margin-right: 40px;
      }
      .value {
        font-size: 30px;
        color: #333333;
        line-height: 86px;
      }
    }
  }
  .table-wrap {
    background: #fff;

    .search-wrap {
      padding: 20px 20px 20px 10px;
      display: flex;
      align-items: center;
      .mr76 {
        margin-right: 76px;
      }
    }
    .table-detail {
      display: flex;
      .detail {
        width: 391px;
      }
    }
  }
}
.black-status {
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 22px;
}
.yellow-status {
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #fab94b;
  line-height: 22px;
}
.gray-status {
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 22px;
}
.green-status {
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #2eb867;
  line-height: 22px;
}
.origin-status {
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #fc6832;
  line-height: 22px;
}
.blue-status {
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #1890ff;
  line-height: 22px;
}
</style>
