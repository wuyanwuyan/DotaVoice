// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    enough: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let openCount = wx.getStorageSync('openCount');
    if (openCount >= 12) {
      this.setData({
        enough: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  }
})