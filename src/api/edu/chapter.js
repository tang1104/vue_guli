import request from '@/utils/request'
export default{
    //根据课程id查询课程章节和小节数据
    getChapterVideo(courseId){
        return request({
            url:`/eduservice/chapter/getChapterVideo/`+courseId,
            method: 'get',
          })
    }, 
    // 添加章节
    addChapter(chapter){
        return request({
            url:`/eduservice/chapter/addchapter/`,
            method: 'post',
            data:chapter,
          })
    },
    //数据回显
    getChapterInfo(chapterId){
        return request({
            url:`/eduservice/chapter/getChapterInfo/`+chapterId,
            method: 'get',
          })
    }, 
    //修改章节
    updateChapter(chapter){
        return request({
            url:`/eduservice/chapter/updateChapter/`,
            method: 'post',
            data:chapter,
          })
    },
    //删除章节
    deleteChapter(chapterId){
        return request({
            url:`/eduservice/chapter/`+chapterId,
            method: 'delete',
          })
    },
  
}
