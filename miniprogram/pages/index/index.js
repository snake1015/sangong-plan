const content = require('../../data/content.js');

Page({
  data: {
    home: content.home,
    site: content.site
  },
  goStep(e) {
    const path = e.currentTarget.dataset.path;
    if (path.indexOf('/pages/schools/') === 0) {
      wx.navigateTo({ url: path });
    } else {
      wx.switchTab({ url: path });
    }
  },
  goSchools() {
    wx.navigateTo({ url: '/pages/schools/schools' });
  },
  copySite() {
    wx.setClipboardData({
      data: content.site.url,
      success() { wx.showToast({ title: '链接已复制', icon: 'none' }); }
    });
  }
});
