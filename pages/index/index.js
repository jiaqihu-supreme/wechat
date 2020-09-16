import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //发送异步请求获取轮播图数据
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'})
    .then(result=>{
      this.setData({
            swiperList:result.data.message
      })
    })  
    // success:(result) =>{
      //   console.log(result);
      //   this.setData({
      //     swiperList:result.data.message
      //   })
      // }
  },
})