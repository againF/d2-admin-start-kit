  <template>
  <el-button
    type="text"
    style="margin-left: 10px"
    id="closeSearchBtn"
    @click="closeSearch"
  >
    {{ word }}
    <i :class="showAll ? 'el-icon-arrow-up ' : 'el-icon-arrow-down'"></i>
  </el-button>
</template>
<script>
export default {
  // 接受父组件的值
  props: {
    showAll: Boolean,
    required: true,
  },
  computed: {
    word: function () {
      if (this.showAll == false) {
        //对文字进行处理
        return "展开搜索";
      } else {
        return "收起搜索";
      }
    },
  },

  watch: {},
  methods: {
    // 改变页码
    closeSearch() {
      this.$emit("closeSearch");
    },
  },
};
</script>
