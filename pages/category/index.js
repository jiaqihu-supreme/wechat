import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
    rightContent:[],
    Cates:[],
    currentIndex:0,
    scrollTop:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    // web中的本地存储和小程序中的本地存储的区别
      // 1：写代码的方式不一样了
      // web:localStorage.setItem("key","value") localStorage.getItem("key")
      //小程序中：wx.setStorageSync('key',"value");wx.getStorageSync('key')
      // 2:存的时候 有没有做类型转换
        //  web:不管存入的是什么类型的数据，最终都会先调用一下toString(),把数据变成字符串再存进去
        // 小程序：不存在类型转换的操作 存什么类型的数据进去 获取的就是什么类型
    // 先判断本地存储肿有没有旧的数据
    // {time:Data.now(),data:[...]}
    // 没有旧的数据 直接发送请求
    // 有旧的数据 同时 旧的数据也没有过期，就使用本地存储中的旧数据即可
    // 获取本地存储中的数据（小程序中也是存在本地存储 技术）
    const Cates = wx.getStorageSync("cates");
    if(!Cates){
      this.getCategoryList()
    }else {
      //有旧的数据 定义过期时间 10s
      if(Date.now()-Cates.time>1000*10){
        //重新发送请求
        this.getCategoryList();
      }else {
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name)
        let rightContentList = this.Cates[0].children
        this.setData({
          leftMenuList:leftMenuList,
          rightContent:rightContentList
        })
      }
    }
  },
  async getCategoryList(){
    // request({url: '/categories'})
    // .then(result=>{
    //   console.log(result);
    //   this.Cates = result.data.message;
    //   //把接口数据存入本地存储中
    //   wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
    //   let leftMenuList = this.Cates.map(v=>v.cat_name)
    //   let rightContentList = this.Cates[0].children
    //   this.setData({
    //     leftMenuList:leftMenuList,
    //     rightContent:rightContentList
    //   })
    // }) 
    //使用es7的async await来发送请求
    const res = await request({url:'/categories'});
    this.Cates = res;
      //把接口数据存入本地存储中
      wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
      let leftMenuList = this.Cates.map(v=>v.cat_name)
      let rightContentList = this.Cates[0].children
      this.setData({
        leftMenuList:leftMenuList,
        rightContent:rightContentList
      })
  },
  handleItemTap(e){
    const { index } = e.target.dataset; 
    console.log(index);
    let rightContentList = this.Cates[index].children;
    console.log(rightContentList);
    //重新设置右侧内容的scroll-view的标签的距离顶部的距离
    this.setData({
      currentIndex:index,
      rightContent:rightContentList,
      scrollTop:0
    })
  }
})