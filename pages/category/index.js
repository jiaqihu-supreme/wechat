import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
    rightContent:[],
    Cates:[]
  },

 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    this.getCategoryList()
  },
  getCategoryList(){
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'})
    .then(result=>{
      console.log(result);
      this.Cates = result.data.message;
      let leftMenuList = this.Cates.map(v=>v.cat_name)
      let rightContentList = this.Cates[0].children
      this.setData({
        leftMenuList:leftMenuList,
        rightContent:rightContentList
      })
    }) 
  }
})