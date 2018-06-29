//index.js
const app = getApp();
const heros = require('../../heros/index.js');

Page({
  data: {
    heros
  },

  onLoad: function () {
  },

  onTab: function (e) {
    let {hero} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/hero/hero?hero=${hero}`,
    })
  }
})
