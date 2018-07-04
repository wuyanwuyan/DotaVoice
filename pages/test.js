var app = getApp()
Page({
  data: {
    current: 0,
    scrollLeft: 0,
    curIndex : 0,
    intoView: 'id0',
    /**
        * 页面配置
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
  },
  onLoad: function () {
    var that = this;

    /**
     * 获取系统信息
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /**
     * 滑动切换tab
     */
  bindchange: function (e) {

    this.setData({ current: e.detail.current });

  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {

    this.setData({ current: e.currentTarget.dataset.current });
  },


  oncancel: function () {
    console.log('oncancel');
  },

  
  bindscrolltolower	: function (e) {
    console.log('end444 ' , e);
  }
 
})