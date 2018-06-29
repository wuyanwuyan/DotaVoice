// pages/hero/hero.js
let innerAudioContext = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.hero,
    });
    wx.request({
      url: `https://coding.net/u/dovahkiin/p/tempData/git/raw/master/heros/${encodeURIComponent(options.hero)}.json`,
      success: (res) => {
        this.setData({
          loadData: res.data
        })
        fail: () => {
          wx.showToast({
            title: '加载失败！',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (innerAudioContext){
      innerAudioContext.destroy();
      innerAudioContext = null;
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onTab: function (e) {
    let { item } = e.currentTarget.dataset;

    innerAudioContext = innerAudioContext || wx.createInnerAudioContext();
    innerAudioContext.autoplay = true;

    innerAudioContext.src = item.mp3Url[0];

    innerAudioContext.onEnded(() => {
      
    })

    innerAudioContext.onError((res) => {

    })

  }
})