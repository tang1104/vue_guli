import request from '@/utils/request'
export default{
    //1 讲师列表（条件查询分页）
    //current当前页 limit每页记录数  teacherQuery条件对象
    addCourseInfo(courseInfoVo){
        return request({
            //url: '/table/list'+current+"/"+limit,
            url:`/eduservice/course/addCourseInfo/`,
            method: 'post',
            data:courseInfoVo

          })
    },
    //2 查询所有讲师
    getListTeacher(){
        return request({
            url:`/eduservice/teacher/findAll/`,
            method: 'get',
          })
    },
    //根据课程id查询课程
    getCourseInfo(id){
        return request({
            url:`/eduservice/course/getCourseInfo/${id}`,
            method: 'get',
          })

    },
     //修改课程信息
     updateCourseInfo(courseInfo){
        return request({
            url:`/eduservice/course/updateCourseInfo`,
            method: 'post',
            data:courseInfo
          })

    },
    //课程确认信息的显示
    getPublishCourseInfo(id){
        return request({
            url:`/eduservice/course/getPublishCourseInfo/`+id,
            method: 'get',
        })
    },
    //课程最终发布
    publishCourse(id){
        return request({
            url:`/eduservice/course/publishCourse/`+id,
            method: 'post',
        })
    },
    //查询所有课程
    getListCourse(){
        return request({
            url:`/eduservice/course/`,
            method: 'get',
        })
    },
   //current当前页 limit每页记录数  courseQueryy条件对象
    getCourseListPage(current,limit,courseQuery){
        return request({
            //url: '/table/list'+current+"/"+limit,
            url:`/eduservice/course/pageCourseCodeList/${current}/${limit}`,
            method: 'post',
            //params
            //courseQuery条件对象,后端使用RequestBody获取数据
            //data表示把对象转换成json进行传递到后端接口里面
            data:courseQuery
        })  
    },
    //根据课程id删除课程
    deleteCourse(courseId){
        return request({
            url:`/eduservice/course/${courseId}`,
            method: 'delete',
        })  
    },


    
}
