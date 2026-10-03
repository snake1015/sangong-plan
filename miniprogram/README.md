# 沪上三公规划 · 微信小程序版

与网站同源的微信小程序（原生框架，无第三方依赖）。包含：首页、十年路线图（可勾选存档）、三校档案、
真题模考（🧸 幼升小 30 题 / 🎒 小升初 51 题，双赛道）、学习资源、更多与免责。

## 一、导入运行（3 分钟）

1. 下载安装 **微信开发者工具**：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
2. 打开工具 → 「导入项目」→ 目录选择本文件夹 **`miniprogram/`**；
3. AppID 选择：
   - 只是本地预览：点「**测试号**」或使用默认的 `touristappid`（无需注册）；
   - 要真机预览 / 发布：填你自己的小程序 AppID（需在 https://mp.weixin.qq.com 注册，个人主体即可）；
4. 点「编译」即可看到首页。底部 tabBar 有 5 个入口：首页 / 路线 / 练习 / 资源 / 更多。

> 说明：tabBar 使用**纯文字**（未放图标文件），这是微信允许的配置；如想加图标，
> 把 81×81 px 的 png 放到 `images/` 并在 `app.json` 的 tabBar 里补 `iconPath` / `selectedIconPath`。

## 二、目录结构

```
miniprogram/
├── app.js / app.json / app.wxss     # 全局逻辑、页面与 tabBar 配置、全局样式
├── project.config.json              # 开发者工具项目配置（appid 默认 touristappid）
├── sitemap.json
├── data/
│   ├── content.js                   # 文字内容：路线图 / 三校 / 资源 / 免责
│   └── bank.js                      # ⚠️ 自动生成的双赛道题库（勿手改）
├── utils/
│   └── store.js                     # 本地存储：勾选、错题本、成绩（按赛道分开）
└── pages/
    ├── index/      首页（三步走 + 关键数字）
    ├── roadmap/    十年路线图（8 阶段，勾选自动保存）
    ├── schools/    三校档案（tab 切换 + 复制官网链接）
    ├── practice/   真题模考（双赛道答题、星级、错题本、成绩历史）
    ├── resources/  学习资源（点按复制链接）
    └── about/      更多与免责（清空本地数据等）
```

## 三、与网站的同步方式

| 要改的内容 | 改哪里 | 之后做什么 |
|---|---|---|
| 题库（题目/答案/解析/模拟卷） | 网站仓库的 `assets/quiz.js` | 运行 `node _src/gen_wechat_bank.js` 重新生成 `miniprogram/data/bank.js` |
| 路线图 / 三校 / 资源 / 免责文字 | `miniprogram/data/content.js` | 直接保存即可（网站同章节可按需同步） |
| 样式（配色 / 圆角 / 字号） | `miniprogram/app.wxss` | 建议与网站 `assets/style.css` 的 `:root` 配色保持一致 |

```bash
# 在仓库根目录执行（需要 Node.js）
node _src/gen_wechat_bank.js
# 输出： miniprogram/data/bank.js  | 幼升小 30 题 | 小升初 51 题
```

## 四、数据与隐私

- 小程序 <b>不发起任何网络请求</b>，不收集个人信息；
- 勾选记录、错题本、成绩历史都保存在**手机本地**（`wx.setStorageSync`），卸载即清除；
- 「更多」页提供一键清空本地数据。

## 五、发布上线流程（可选）

1. 在 https://mp.weixin.qq.com 注册小程序（个人主体即可），拿到 **AppID**；
2. 开发者工具中把 AppID 换成自己的，点「上传」，填写版本号与备注；
3. 登录 mp 后台 → 「版本管理」→ 提交审核（填写功能页面、类目建议「教育-教育信息服务」）；
4. 审核通过后点「发布」，即可在微信内搜索到你的小程序。

> 注意：小程序内**不能直接打开外部网页**（web-view 组件需企业主体且配置业务域名）。
> 因此「资源」页采用“点按复制链接”的方式，家长可粘贴到浏览器打开——这是个人主体最稳妥的做法。

## 六、免责

内容为公开资料整理 + 原创模拟题（非官方真题），仅供家长自学参考；
招生名额与流程以三校当年官方简章及上海市教委规定为准。
