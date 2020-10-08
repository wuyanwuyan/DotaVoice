// pages/hero/hero.js
let innerAudioContext = null;
let playCount = 0;
const LIMIT = 100;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    tabNum: 1,
    loadData: [],
    renderData: [],
    heroInfos: [],
    soundName: null,
    noVoices: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let hero = options.hero;
    this.loadHero(`https://dovahkiin.coding.net/p/tempData/d/tempData/git/raw/master/heros/${hero}.json`);
  },

  loadHero: function(url, index = 0) {
    wx.request({
      url,
      success: (res) => {
        let resData = res.data;
        let heroInfo = resData.shift();
        index === 0 && wx.setNavigationBarTitle({
          title: heroInfo.heroName
        });

        let nextLength = Math.min(LIMIT, resData.length);
        let {
          loadData,
          renderData,
          heroInfos
        } = this.data;

        loadData[index] = resData;
        renderData[index] = resData.slice(0, nextLength);
        heroInfos[index] = heroInfo;
        let tabNum = heroInfos[0] && heroInfos[0].arcana ? 2 : 1;

        let soundName = (heroInfos[0] && heroInfos[0].soundName) || heroInfos[0].arcana;

        this.setData({
          loadData,
          renderData,
          heroInfos,
          tabNum,
          soundName,
          noVoices: resData.length === 0
        });
      },
      fail: () => {
        wx.showToast({
          title: '加载失败！',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if (innerAudioContext) {
      innerAudioContext.destroy();
      innerAudioContext = null;
    }
  },

  swichTab: function(e) {
    let {
      current
    } = e.currentTarget.dataset;
    this.setData({
      current
    })
  },

  bindchange: function(e) {
    this.setData({
      current: e.detail.current
    })
  },

  bindanimationfinish: function(e) {
    if (this.data.loadData[1] && this.data.loadData[1].length > 0) {
      return;
    }

    let hero = encodeURIComponent(this.data.heroInfos[0].arcana);
    this.loadHero(`https://dovahkiin.coding.net/p/tempData/d/tempData/git/raw/master/heros/${hero}.json`, 1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  bindscrolltolower: function(e) {
    let {
      index
    } = e.currentTarget.dataset;
    console.log(index);
    let {
      loadData,
      renderData
    } = this.data;
    if (renderData[index].length >= loadData[index].length) {
      return;
    }

    let nextLength = Math.min(this.data.renderData[index].length + LIMIT, loadData[index].length);
    renderData[index] = loadData[index].slice(0, nextLength);
    this.setData({
      renderData,
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    let {
      heroInfos
    } = this.data;
    return {
      title: `${heroInfos[0].heroName}-${heroInfos[0].cnName} Dota2原声配音`,
      url: `/pages/hero/hero?hero=${encodeURIComponent(heroInfos[0].heroName)}`
    }
  },

  onTab: function(e) {
    let {
      item
    } = e.currentTarget.dataset;
    this.playSound(item.mp3Url[0]);

  },

  onTabArcana: function(e) {
    let {
      item
    } = e.currentTarget.dataset;
    this.playSound(item.mp3Url[1]);
  },

  playSound: function(url) {
    if (!innerAudioContext) {
      innerAudioContext = wx.createInnerAudioContext();
      // ios下无法播放？？？
      if (wx.setInnerAudioOption) {
        wx.setInnerAudioOption({
          obeyMuteSwitch: false
        })
      }else {
        innerAudioContext.obeyMuteSwitch = false;
      }
      
      // innerAudioContext.autoplay = true;

      // innerAudioContext.onPlay(wx.hideNavigationBarLoading);

      // innerAudioContext.onCanplay(wx.hideNavigationBarLoading);

      // innerAudioContext.onEnded(wx.hideNavigationBarLoading)

      // innerAudioContext.onError(wx.hideNavigationBarLoading);
    }

    wx.showNavigationBarLoading();
    
    playCount++;
    let curPlayCount = playCount;  // 连续点击，只允许播放最后一次声音

    wx.downloadFile({
      url,
      success: function (res) {
        if (res.statusCode !== 200 || curPlayCount !== playCount) 
          return;

          const sys = wx.getSystemInfoSync()
          // console.log(sys.platform.toLowerCase() ,  'sys.platform')
          if (sys.platform.toLowerCase() === 'ios') {
            const audio = wx.getBackgroundAudioManager()
            audio.title = '...'
            audio.src = res.tempFilePath;
            audio.play();
          } else {
            innerAudioContext.src = res.tempFilePath;
            innerAudioContext.seek(0);
            innerAudioContext.play();
          }
      },
      complete: function (res) {
        wx.hideNavigationBarLoading();
      }
    });
  },

  onLongPress: function(e) {
    let {
      item
    } = e.currentTarget.dataset;

    wx.setClipboardData({
      data: item.mp3Text,
      success: function(res) {
        wx.showToast({
          title: '已复制到剪切板',
          // icon: 'none'
        })
      }
    })
  }
})