<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="图片标题">
        <el-input v-model="bannerList.title"></el-input>
      </el-form-item>
     
      <el-form-item label="图片排序">
        <el-input-number v-model="bannerList.sort" controls-position="right" min="0" />
     
      </el-form-item>

      <el-form-item label="轮播图片">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/eduoss/fileoss/loadFile'"
          class="avatar-uploader"
        >
          <img :src="bannerList.imageUrl" />
        </el-upload>
            <el-switch
        style="display: block"
        v-model="value2"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="显示"
        inactive-text="隐藏"
        
      ></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :disabled="saveBtnDisabled" @click="onSubmit">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import crmBanner from "@/api/edu/banner";
export default {
  data() {
    return {
      bannerList: {
        title: "",
        sort: 0,
        linkUrl: "",
        imageUrl:
          "https://edu-2000.oss-cn-shenzhen.aliyuncs.com/2020/04/28/36a32a553d8348d28d4073d5f40e63b3file.png"
      },
      imagecropperShow: false, //上传弹窗组件是否显示
      imagecropperKey: 0, //上传组件的key值
      BASE_API: process.env.BASE_API, //获取dev.env.js里面的端口号
      saveBtnDisabled: false, // 保存按钮是否禁用,
      value2: 1
    };
  },
  methods: {
    onSubmit() {
      crmBanner.addBanner(this.bannerList).then(response => {
        //提示信息
        this.$message({
          type: "success",
          message: "新增轮播图成功!"
        });
        this.$router.push({ path: "/banner/list" });
      });
    },
    //上传封面成功调用的方法
    handleAvatarSuccess(res, file) {
      this.bannerList.imageUrl = res.data.url;
    },
    //上传成功之前的方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>