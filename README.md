# 沪上三公 · 十年上岸规划（2岁半起步版）

为 2 岁半孩子准备的上海“三公”（上海市实验学校 / 上外附中 / 上外浦外）小升初长线规划静态网站。
采用**多页“标签页”结构**：顶部导航每个菜单对应一个独立页面，另有可打印工具包页面。

## 目录结构

```
sangong-plan/
├── index.html            # 🏠 首页：Hero + 生日推算 + 三公是什么 + 两条通路
├── roadmap.html          # 十年路线（03）：8 阶段行动清单（含推算器）
├── action.html           # 落地实操（04）：周节奏模板 + 12个月行动历 + 档案法
├── schools.html          # 三校档案（05）：上实 / 上外附中 / 上外浦外
├── process.html          # 报名流程（06）：每年4月节奏 + 名额对照
├── profile.html          # 上岸配置（07）：官方明文 vs “隐形门槛”
├── resources.html        # 学习资源（08）：考试报名通道 / 免费平台 / GitHub·开源 / 更多渠道
├── tools.html            # 打印工具（09）：6 张模板入口（→ printables.html）
├── faq.html              # FAQ（10）
├── planb.html            # Plan A/B/C/D（11）
├── sources.html          # 来源与免责（12）
├── printables.html       # 可打印工具包（6 张自带分页模板）
├── assets/               # style.css / tools.css / app.js
├── _src/
│   ├── index-full.html   # ⚠️ 单一内容源（全章节合集，勿直接部署）
│   └── build.py          # 多页构建脚本：改内容源后运行即可重新生成所有页面
└── README.md
```

另见工作区同级目录 `research/`：调研抓取的三校官方简章与媒体报道原文。

## 日常维护（重要）

本目录是**构建产物**。想改任何内容，请修改 `_src/index-full.html` 后执行：

```bash
python3 _src/build.py     # 重新生成全部 11 个页面
```

构建脚本会：按章节 id 抽取内容 → 自动把站内锚点改写为跨页链接 → 生成带“当前页高亮”导航的独立页面。

## 本地预览

```bash
cd sangong-plan
python3 -m http.server 8765 --bind 127.0.0.1
# 打开 http://127.0.0.1:8765/ （或直接双击 index.html）
```

## 内容特点

- 出生日期推算器在 首页 / 十年路线 / 落地实操 / 报名流程 页顶部：改生日，时间线整体平移；
- 学习资源页含考试报名通道表（剑桥 / 小托福 / AMC8 / 袋鼠 / CSP / 蓝桥 / 古诗文大会）、免费官方平台、
  分龄分科“资源使用卡”、**GitHub/开源仓库清单**（HelloGitHub、chinese-poetry、hello-algo、Python-100-Days、
  free-programming-books、ECDICT、awesome-programming-for-kids、mini-classroom、easy-robot 等，均经 2026-09 核验）
  以及 Scratch / Code.org / 可汗学院 / Oxford Owl / 古诗文网等更多信息渠道；
- 可打印工具包在 tools.html 与 printables.html，浏览器打印自动分页。

## 信息口径与免责

- 整理时间：2026 年 9 月。招生数字与流程以 **2025/2026 年三校官方招生简章 + 上观新闻等主流转载** 为准；
- 三校每年 4 月上旬更新简章；考试报名渠道逐年变化，务必以官网当期公告为准；
- 海外站点（Scratch / Code.org / 可汗 / Oxford Owl）访问速度取决于网络环境；GitHub 内容请家长先审再用；
- 机构文章与社区帖仅供交叉参考；本站不推荐任何课程，内容不构成教育或法律建议。
