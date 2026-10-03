const content = require('../../data/content.js');

Page({
  data: {
    schools: content.schools,
    current: 0,
    school: content.schools[0]
  },
  switchTab(e) {
    const i = Number(e.currentTarget.dataset.index);
    this.setData({ current: i, school: content.schools[i] });
  },
  copyUrl() {
    wx.setClipboardData({
      data: this.data.school.url,
      success() { wx.showToast({ title: '官网链接已复制', icon: 'none' }); }
    });
  }
});
