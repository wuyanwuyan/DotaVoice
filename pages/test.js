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

  onend: function(){
    console.log('onend');
// let nextIndex = 0;


//     let delta = this.scrollLeft - this.data.winWidth * this.data.curIndex;


//     console.log(this.scrollLeft , delta);

//     if (Math.abs(delta) < this.data.winWidth *0.1){
//       this.setData({
//         // scrollLeft: this.data.winWidth * this.data.curIndex
//           intoView: 'id' + this.data.curIndex
//       })
//       return ;
//     }

//     nextIndex = delta > 0 ? this.data.curIndex + 1 : this.data.curIndex -1;

//     this.setData({
//       // scrollLeft: this.data.winWidth * nextIndex,
//       intoView: 'id' + nextIndex,
//       curIndex: nextIndex
//     })
  },

  onScroll: function (event){
    this.scrollLeft = event.detail.scrollLeft;
    console.log('this.scrollLeft  ', this.scrollLeft, "   ", event.detail.deltaX);
    // event.detail = { scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY }
  }
})