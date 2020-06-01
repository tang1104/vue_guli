import request from '@/utils/request'
export default{
 
    // 添加小节
    addVideo(video){
        return request({
            url:`/eduservice/video/addVideo/`,
            method: 'post',
            data:video,
          })
    },
    
    //删除章节
    deleteVideo(id){
        return request({
            url:`/eduservice/video/`+id,
            method: 'delete',
          })
    },

    //数据回显
    getVideoInfo(id){
        return request({
            url:`/eduservice/video/getvideo/`+id,
            method: 'get',
          })
    }, 
    //修改小节
    updateVideo(video){
        return request({
            url:`/eduservice/video/updateVideo/`,
            method: 'post',
            data:video,
          })
    },
     //修改阿里云中的视频
     deleteAliyVideo(id){
        return request({
            url:`/eduvod/video/removeAliyVideo/`+id,
            method: 'delete',
          })
    },

  
}
