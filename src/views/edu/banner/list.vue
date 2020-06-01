<template>
  <div class="app-container">
    <el-table :data="bannerList" element-loading-text="数据加载中" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="120"></el-table-column>
      <el-table-column prop="imageUrl" label="图片地址"></el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" width="240"></el-table-column>
      <el-table-column prop="sort" label="排序" width="100"></el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/banner/info/'+scope.row.id">
            <el-button type="primary" icon="el-icon-edit" size="mini">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" @click="removeBannerById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


        <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import banner from "@/api/edu/banner";
export default {
  data() {
    return {
      bannerList: null, //查询之后接口返回集合
      page: 1, //当前页
      limit: 10, //每页记录数
      total: 0, //总记录数
      BannerQuery: {} //条件封装对象
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取所有banner集合
    getList(page = 1) {
      this.page = page;
      banner.getList().then(response => {
        console.log(response);
        this.bannerList = response.data.list;
        this.total = response.data.total;
      });
    },
    removeBannerById(id) {
      this.$confirm("此操作将永久删除该图片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        banner.deleteBanner(id).then(response => {
          //提示信息
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          //回到列表页面
          this.getList();
        });
      });
    }
  }
};
</script>