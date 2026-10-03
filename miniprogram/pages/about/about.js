const content = require('../../data/content.js');
const store = require('../../utils/store.js');

Page({
  data: {
    about: content.about,
    site: content.site
  },
  copySite() {
    wx.setClipboardData({
      data: content.site.url,
      success() { wx.showToast({ title: '仓库链接已复制', icon: 'none' }); }
    });
  },
  clearData() {
    wx.showModal({
      title: '清空本地数据',
      content: '将清空错题本、成绩与路线图勾选（只在本机）。',
      success: (res) => {
        if (!res.confirm) return;
        try {
          wx.removeStorageSync(store.KEYS.todo);
          store.clearTrack('kid');
          store.clearTrack('junior');
        } catch (e) {}
        wx.showToast({ title: '已清空', icon: 'none' });
      }
    });
  }
});
