import request from '@/utils/request'
export default {
    getList(page,limit) {
    return request({
      url: `/cmsservice/banneradmin/pageBanner/${page}/${limit}`,
      method: 'get'
    })
  },
  addBanner(crmBanner){
    return request({
      url: `/cmsservice/banneradmin/addBanenr`,
      method: 'post',
      data:crmBanner
    })
  },
  deleteBanner(id){
    return request({
      url: `/cmsservice/banneradmin/remove/${id}`,
      method: 'delete',
    })
  }
}