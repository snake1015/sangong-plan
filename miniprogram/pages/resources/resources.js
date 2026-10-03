const content = require('../../data/content.js');

Page({
  data: {
    groups: content.resources
  },
  copy(e) {
    const url = e.currentTarget.dataset.url;
    wx.setClipboardData({
      data: url,
      success() {
        wx.showToast({ title: '链接已复制，可在浏览器打开', icon: 'none', duration: 2200 });
      }
    });
  }
});
