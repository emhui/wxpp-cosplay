//index.js
//获取应用实例
const app = getApp()
const api = 'https://api.isoyu.com/api/picture/index'
Page({
  data: {
    loaded: false
  },
  onLoad: function () {
    this.loadData()
  },
  detail: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../detail/detail?id=${id}`,
    })
  },
  getRandomUrl: function(minNum, maxNum) {
    let page = parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
    let randomUrl = `https://api.isoyu.com/api/picture/index?page=${page}`
    return randomUrl
  },
  loadData: function() {
    wx.showLoading({
      title: '加载中',
      icon: 'loading'
    })
    wx.request({
      url: this.getRandomUrl(0,50),
      complete: (res) => {
      },
      fail: (res) => {},
      success: (result) => {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        this.setData({
          items: result.data.data
        })
        // 存储json数据到本地
        wx.setStorageSync('items', result.data.data)
      },
    })
  },
  onPullDownRefresh: function() {
    this.loadData()
  }
})
