/*
 1：发送请求获取数据
 2：点击轮播图 预览大图
    1：给轮播图绑定点击事件
    2：调用小程序的api previewImage
*/ 
import { request } from '../../request/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  QueryParams:{
    goods_id:0,
  },
  GoodsInfo:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.goods_id = options.gid;
    console.log(options);
    
    console.log(this.QueryParams.goods_id);
    
    this.getGoodDetail();
  },
  handlePreviewImage(e){
    //先构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
    console.log(e);
    
    const current = e.currentTarget.dataset.url;
    //接受传递过来的图片地址
    wx.previewImage({
      current:current,
      urls: urls,
    })
  },
  async getGoodDetail(){
    let res = await request({url:'/goods/detail',data:this.QueryParams});
    this.GoodsInfo = res;
    this.setData({
      goodsObj:{
        goods_name:res.goods_name,
        goods_price:res.goods_price,
        //iphone部分手机不识别webp图片格式
        //最好找到后台 让他进行修改(正常方式)
        // 临时自己改 确保后台存在 1.webp => 1.jpg
        goods_introduce:res.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:res.pics,
      }
    })
  }
})