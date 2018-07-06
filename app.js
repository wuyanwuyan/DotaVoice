//app.js
App({
  onLaunch: function() {
    let openCount = wx.getStorageSync('openCount');
    openCount = openCount || 0;
    openCount = openCount + 1;
    wx.setStorageSync('openCount', openCount);
  },
  globalData: {}
})