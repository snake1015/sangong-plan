# 沪上三公规划 · GitHub 推送 & Cloudflare Pages 部署手册
> 项目为纯静态站点（无构建步骤），非常适合 Cloudflare Pages 免费托管。
> 整理时间：2026-09。文中 `<占位符>` 请替换为你自己的值。

---

## 一、推送到 GitHub（二选一）

### 方式 A：命令行推送（推荐，最省事）
已在项目根目录（`sangong-plan/`）初始化好 git 仓库并完成首次提交。只需：

```bash
cd sangong-plan

# 1) 在 GitHub 网页新建一个空仓库（不要勾选 README/.gitignore），复制它的地址，例如：
#    https://github.com/<你的用户名>/sangong-plan.git

# 2) 绑定远程仓库并推送
git remote add origin https://github.com/<你的用户名>/sangong-plan.git
git branch -M main
git push -u origin main
```

> 若提示要登录：HTTPS 方式用 **Personal Access Token（PAT）** 当密码。
> 生成方法：GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
> → Generate new token → 勾选 `repo` 权限 → 复制粘贴到密码框。
> 之后若想免输密码：`git config --global credential.helper store`（只建议在自己电脑上）。

### 方式 B：用 gh CLI（若本机装有 gh）
```bash
gh auth login                     # 按提示登录
gh repo create sangong-plan --public --source . --push
```

---

## 二、部署到 Cloudflare Pages

### 前提
- 有一个 Cloudflare 账号：https://dash.cloudflare.com/sign-up
- 仓库已推送到 GitHub（见第一节）。

### 方式 1：从 GitHub 自动部署（推荐，改代码自动更新）
1. Cloudflare 控制台 → 左侧 **Workers & Pages** → **Create** → **Pages** → **Connect to Git**；
2. 授权 Cloudflare 访问 GitHub（首次需绑定），选择仓库 `sangong-plan`；
3. 构建设置（本目录是纯静态站点，无需任何命令）：
   - **Framework preset**：`None`（不选任何框架）
   - **Build command**：留空
   - **Build output directory**：填 `/`（根目录，即直接托管 index.html）
4. 点 **Save and Deploy**，等待约 30 秒；
5. 部署完成后获得默认域名：`https://<项目名>.pages.dev`（形如 `sangong-plan.pages.dev`）。

> 之后每次 `git push` 到 main，Cloudflare 会自动重新构建发布，无需手动操作。
> 若想改成“手动触发布”，可在项目 Settings → Builds & deployments 调整。

### 方式 2：用 Wrangler CLI 上传（不连 GitHub 也行）
```bash
# 安装 wrangler（若未装）
npm i -g wrangler

# 登录
wrangler login

# 在项目根目录（sangong-plan/）执行部署
cd sangong-plan
wrangler pages deploy . --project-name sangong-plan
```

### 方式 3：直接用 Cloudflare Dashboard 拖拽上传
Workers & Pages → Create → Pages → **Upload assets** → 把 `sangong-plan/` 里的
`index.html / roadmap.html / … / assets/ / printables.html` 全部拖入上传。
> 注意：这种方式**不会**在每次本地改动后自动更新，适合一次性发布。

---

## 三、常用设置（可选）

| 想做的事 | 操作 |
|---|---|
| 绑定自己的域名 | Pages 项目 → **Custom domains** → Add custom domain → 按提示添加 DNS CNAME 记录 |
| 强制 HTTPS | 默认自动开启；证书由 Cloudflare 免费管理 |
| 首页即 index.html | 无需设置，Cloudflare Pages 默认把根路径指向 index.html |
| 中文站点 | 无需额外配置，纯静态中文网页直接可用 |
| 后续改内容 | 修改 `_src/index-full.html` → `python3 _src/build.py` → `git add -A && git commit && git push` |

---

## 四、注意
- 本目录为**构建产物**：修改内容请改 `_src/index-full.html` 后用 `python3 _src/build.py` 重新生成；
- `_src/` 建议保留在仓库中（方便日后重建），它不会影响 Pages 的托管（输出目录是根目录，会一并上传，如需精简可在 Pages 构建后删除该目录或用 `.cfignore`）；
- 纯静态站没有后端，Cloudflare 免费额度足够个人/家庭站点使用。
