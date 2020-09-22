/*
 用户上滑页面 滚动条触底 开始加载下一页数据
   1：找到滚动条触底事件 微信小程序官方开发文档
   2：判断还有没有下一页数据
   3：假如没有下一页数据 弹出一个提示
   4：假如还有下一页数据 来加载下一页数据

下拉刷新页面
   1：触发下拉刷新事件
     需要在页面的json文件中开启一个配置项
     找到触发下拉刷新的事件   
   2：重置 数据 数组
   3：重置页码 设置为1
   4:重新发送请求
   5：手动关闭
*/  
import { request } from '../../request/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"详情",
        isActive:false
      }
    ],
    goodsList:[],
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalPage:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.QueryParams.cid = options.cid;
    this.getGoodsList()
  },

  async getGoodsList(){
    let res = await request({url:'/goods/search',data:this.QueryParams});
    const total = res.total;
    this.totalPage = Math.ceil(total/this.QueryParams.pagesize);
    this.setData({
      // 拼接了数组
      goodsList:[...this.data.goodsList,...res.goods]
    })
    //关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错
    wx.stopPullDownRefresh()
  },
  handleTabsItemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive = true:v.isActive = false);
    this.setData({
      tabs:tabs
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   //判断有没有下一页数据
   if(this.QueryParams.pagenum>=this.totalPage){
     console.log('没有下一页数据');
     wx-wx.showToast({
       title: '您已经翻到底了哦~',
     })
   }else{
     this.QueryParams.pagenum++;
     this.getGoodsList();
   }
  },
  //监听用户的下拉刷新事件
  onPullDownRefresh(){
   console.log('刷新');
  //  重置数组
   this.setData({
     goodsList:[]
   })
  //  重置页码
  this.QueryParams.pagenum = 1;
  //重新发送请求
  this.getGoodsList();
  }
})