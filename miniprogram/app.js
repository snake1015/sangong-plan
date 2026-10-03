/* 沪上三公规划 · 微信小程序全局逻辑 */
const content = require('./data/content.js');

App({
  globalData: {
    content: content,
    siteUrl: content.site.url,
    theme: {
      primary: '#4C8DFF',
      primaryDeep: '#2F6FE4',
      bg: '#FBF8F3',
      ink: '#263243',
      ink2: '#4A5866',
      muted: '#7A8797'
    }
  },
  onLaunch() {
    // 首次启动时写入版本号，便于后续做数据迁移
    const v = wx.getStorageSync('sg_version');
    if (!v) wx.setStorageSync('sg_version', content.version);
  }
});
