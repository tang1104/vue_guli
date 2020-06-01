<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>

   
    <el-form label-width="120px" ref="chapterVideoForm">

        <el-form-item label="课程标题">
            <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
        </el-form-item>

        <!-- 课程分类 TODO -->
        <el-form-item label="课程分类">
            <el-select
                v-model="courseInfo.subjectParentId"
                placeholder="一级分类" @change="subjectTwoChange">
                <el-option
                v-for="subject in subjectOneList"
                    :key="subject.id"
                    :label="subject.title"
                    :value="subject.id"/>
            </el-select>

             <!-- 二级分类 -->
             <el-select
                v-model="courseInfo.subjectId"
                placeholder="二级分类">
                <el-option
                v-for="subject in subjectTwoList"
                :key="subject.id"
                :label="subject.title"
                :value="subject.id"/>
            </el-select>
        </el-form-item>
        <!-- 课程讲师 TODO -->
        <el-form-item label="课程讲师">
            <el-select
                v-model="courseInfo.teacherId"
                placeholder="请选择">
                <el-option
                v-for="teacher in teacherList"
                :key="teacher.id"
                :label="teacher.name"
                :value="teacher.id"/>
            </el-select>
           
        </el-form-item>

        <el-form-item label="总课时">
            <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
        </el-form-item>
        <!-- 课程简介 TODO -->
        <el-form-item label="课程简介">
            <tinymce :height="300" v-model="courseInfo.description"/>
        </el-form-item>
        <!-- 课程封面 TODO -->
        
        <!-- 课程封面-->
        <el-form-item label="课程封面">
            <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :action="BASE_API+'/eduoss/fileoss/loadFile'"
                class="avatar-uploader">
                <img :src="courseInfo.cover">
            </el-upload>
        </el-form-item>

        <el-form-item label="课程价格">
            <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
        </el-form-item>
        <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
        </el-form-item>

    </el-form>

  </div>

</template>
<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce' //引入组件
export default {
 components: { Tinymce },//声明
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseInfo:{
        title: '',
        subjectId: '',
        teacherId: '',
        subjectParentId:'',
        lessonNum: 0,
        description: '',
        cover: '/static/02.jpg',
        price: 0,
        
      },
      courseId:'',//路由id
      teacherList:[],//存储所有老师
      subjectOneList:[],//存储课程一级分类
      subjectTwoList:[],//存储课程二级分类
      BASE_API: process.env.BASE_API, // 接口API地址
      OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
    }
  },
  created() {

        //数据回显
        //获取路由id值
        if(this.$route.params && this.$route.params.id) {
            this.courseId = this.$route.params.id
              //调用根据id查询的方法
                this.getInfo()
          }else{
             
               
                 //初始化所有讲师
                this.getListTeacher()
                //初始化一级分类
                this.getOneSubject()
          }

   
  },
  watch: {

    $route(to,from){
        //初始化表单
        this.courseInfo = {} 
    }
  },
  
  methods: {
     


      getInfo(){
          course.getCourseInfo(this.courseId)
            .then(response => {
                //在courseInfo课程基本信息，包含 一级分类id 和 二级分类id
                    this.courseInfo = response.data.courseInfoVo
                    //1 查询所有的分类，包含一级和二级
                    subject.getSubjectList()
                        .then(response => {
                            //2 获取所有一级分类
                            this.subjectOneList = response.data.list
                            //3 把所有的一级分类数组进行遍历，
                            for(var i=0;i<this.subjectOneList.length;i++) {
                                //获取每个一级分类
                                var oneSubject = this.subjectOneList[i]
                                //比较当前courseInfo里面一级分类id和所有的一级分类id
                                if(this.courseInfo.subjectParentId == oneSubject.id) {
                                    //获取一级分类所有的二级分类
                                    this.subjectTwoList = oneSubject.children
                                }
                            }
                        })
                         //初始化所有讲师
                        this.getListTeacher()
            })
      },

      //上传封面成功调用的方法
      handleAvatarSuccess(res,file){
          this.courseInfo.cover = res.data.url

      },
      //上传成功之前的方法
      beforeAvatarUpload(file){
          const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
      },
      //选择某个一级分类显示二级分类
      //value 就是一级分类的id
      subjectTwoChange(value){
          //遍历所有一级分类,包含一级,二级
          for (let i = 0; i < this.subjectOneList.length; i++) {
              //判断:所以一级分类id和value是否一样
                if (this.subjectOneList[i].id === value) {
                    //一样就把一级分类中的二级分类存储到 subjectTwoList
                    this.subjectTwoList = this.subjectOneList[i].children
                    //把二级分类的id值清空
                    this.courseInfo.subjectId=''
                }
            }

      },
      //查询所有一级分类
      getOneSubject(){
          subject.getSubjectList()
          .then(resopnse =>{
              this.subjectOneList = resopnse.data.list
          })
      },
      //查询所有讲师
      getListTeacher(){
          course.getListTeacher(this.courseInfo)
                .then(resopnse =>{
                    this.teacherList = resopnse.data.items
            })

      },
      //添加课程
      addCourse(){
           course.addCourseInfo(this.courseInfo)
                .then(resopnse =>{
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '添加课程信息成功!'
                    })
                    //跳转到第二步
                    console.log('next')
                    this.$router.push({ path: '/course/chapter/'+resopnse.data.courseId })
                })

      },
      //修改课程
      updateCourse(){
          course.updateCourseInfo(this.courseInfo)
                .then(resopnse =>{
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '修改课程信息成功!'
                    })
                    //跳转到第二步
                    console.log('next')
                    this.$router.push({ path: '/course/chapter/'+ this.courseId})
                })
          
      },
      saveOrUpdate() {
           //判断添加还是修改
           if(!this.courseInfo.id){
               //添加
               this.addCourse()
           }else{
               this.updateCourse()
           }
        },

  }

}
</script>

<style scoped>
.tinymce-container {
line-height: 29px;
}
</style>