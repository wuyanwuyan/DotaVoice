// pages/hero/hero.js
let innerAudioContext = null;

const LIMIT = 30;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadData: [],
    renderData: [],
    heroInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({ hero }) {
    wx.showLoading({
      title: 'loading...',
    });
    wx.request({
      url: `https://coding.net/u/dovahkiin/p/tempData/git/raw/master/heros/${hero}.json`,
      success: (res) => {
        let loadData = res.data;
        let heroInfo = loadData.shift();
        wx.setNavigationBarTitle({
          title: heroInfo.heroName
        });
        let nextLength = Math.min(LIMIT, loadData.length);
        this.setData({
          loadData,
          renderData: res.data.slice(0, nextLength),
          heroInfo
        });
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
    clearInterval(this.timeKey);
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
    let { loadData, renderData } = this.data;
    if (renderData.length >= loadData.length) {
      return;
    }

    let nextLength = Math.min(this.data.renderData.length + LIMIT, loadData.length);
    this.setData({
      renderData: loadData.slice(0, nextLength),
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let { heroInfo} = this.data;
    return {
      title: `${heroInfo.heroName}-${heroInfo.cnName} Dota2原声配音`,
      url: `/pages/hero/hero?hero=${encodeURIComponent(heroInfo.heroName)}`
    }
  },

  onTab: function (e) {
    let { item } = e.currentTarget.dataset;
    this.playSound(item.mp3Url[0]);

  },

  onTabArcana : function (e) {
    let { item } = e.currentTarget.dataset;
    this.playSound(item.mp3Url[1]);
  },

  playSound: function (url) {
    innerAudioContext = innerAudioContext || wx.createInnerAudioContext();
    innerAudioContext.autoplay = true;

    innerAudioContext.src = url;

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