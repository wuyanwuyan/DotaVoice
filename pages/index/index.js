//index.js
const app = getApp();

Page({
  data: {
    strengthHeros: [],
    agilityHeros: [],
    intelligenceHeros: [],
  },

  onLoad: function () {
    wx.showLoading({
      title: 'loading...',
    })
    wx.request({
      url: `https://coding.net/u/dovahkiin/p/tempData/git/raw/master/save/index.json`,
      success: (res) => {
        let strengthHeros = [], agilityHeros = [], intelligenceHeros = [];
        res.data.forEach(v => {
          if (v.primaryAttribute === 'Strength') {
            strengthHeros.push(v);
          } else if (v.primaryAttribute === 'Agility') {
            agilityHeros.push(v);
          } else if (v.primaryAttribute === 'Intelligence') {
            intelligenceHeros.push(v);
          }
        })
        this.setData({
          strengthHeros,
          agilityHeros,
          intelligenceHeros
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

  onTab: function (e) {
    let { hero } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/hero/hero?hero=${encodeURIComponent(hero)}`,
    })
  },
  onShareAppMessage: function () {
    return {
      title: `DotaVoice--Dota2全英雄配音`,
      url: `/pages/index/index`
    }
  },
})
