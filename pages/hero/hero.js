// pages/hero/hero.js
let innerAudioContext = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hero: null,
    loadData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({ hero }) {
    wx.setNavigationBarTitle({
      title: hero,
    });
    this.setData({
      hero
    });
    wx.showLoading({
      title: 'loading...',
    });
    wx.request({
      url: `https://coding.net/u/dovahkiin/p/tempData/git/raw/master/heros/${encodeURIComponent(hero)}.json`,
      success: (res) => {
        this.setData({
          loadData: res.data
        }) 
      },
      fail: () => {
        wx.showToast({
          title: '加载失败！',
        })
      },
      complete: () => {
        wx.hideLoading();
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
    if (innerAudioContext) {
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
    return {
      title: this.data.hero,
      url: `/pages/hero/hero?${this.data.hero}`
    }
  },

  onTab: function (e) {
    let { item } = e.currentTarget.dataset;

    innerAudioContext = innerAudioContext || wx.createInnerAudioContext();
    innerAudioContext.autoplay = true;

    innerAudioContext.src = item.mp3Url[0];

    wx.showNavigationBarLoading();

    innerAudioContext.onEnded(() => {
      wx.hideNavigationBarLoading();
    });

    innerAudioContext.onPlay(() => {
      wx.hideNavigationBarLoading();
    });

    innerAudioContext.onError((res) => {
      wx.hideNavigationBarLoading();
    });

  },

  onLongPress: function (e) {
    let { item } = e.currentTarget.dataset;

    wx.setClipboardData({
      data: item.mp3Text,
      success: function (res) {
        wx.showToast({
          title: '已复制到剪切板！',
          // icon: 'none'
        })
      }
    })
  }
})