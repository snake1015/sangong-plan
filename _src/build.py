#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
沪上三公规划 · 多页构建脚本
把 _src/index-full.html（单一内容源）按章节拆分成独立“标签页”，输出到站点根目录。

用法： python3 _src/build.py
"""
import re, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # sangong-plan/
SRC  = os.path.join(ROOT, '_src', 'index-full.html')

# ---------- 读取内容源 ----------
html = open(SRC, encoding='utf-8').read()

# ---------- 工具函数 ----------
def section(html, sid):
    m = re.search(r'<section\b[^>]*\bid="%s"[^>]*>.*?</section>' % sid, html, re.S)
    if not m:
        raise SystemExit('section not found: ' + sid)
    return m.group(0)

def between(html, start, end):
    i = html.find(start)
    j = html.find(end, i)
    if i < 0 or j < 0:
        raise SystemExit('marker not found: %r ... %r' % (start[:40], end[:40]))
    return html[i:j].rstrip()

hero = between(html, '<!-- ============ Hero ============ -->',
               '<!-- 出生日期推算工具 -->').rstrip() + '\n'
calc = section(html, '') if False else re.search(
    r'<section class="calc section".*?</section>', html, re.S).group(0)

# 站内锚点 → 标签页文件
ANCHOR_PAGE = {
    'jianjie': 'index.html', 'mubiao': 'index.html', 'timeline': 'roadmap.html',
    'plan': 'action.html', 'xiaoxiao': 'schools.html', 'liucheng': 'process.html',
    'peizhi': 'profile.html', 'ziyuan': 'resources.html', 'tools': 'tools.html',
    'faq': 'faq.html', 'bplan': 'planb.html', 'refs': 'sources.html',
}

def rewrite_links(text):
    """把单页内的 #章节 锚点改写为跨页链接。"""
    def rep(m):
        frag = m.group(1)
        target = ANCHOR_PAGE.get(frag)
        if target:
            return 'href="%s"' % target
        return m.group(0)
    return re.sub(r'href="#([a-z]+)"', rep, text)

def render_sections(sids):
    return '\n'.join(rewrite_links(section(html, sid)) for sid in sids)

# ---------- 页面配置 ----------
PAGES = [
    dict(file='index.html',    tab='首页',      band=None,         calc=True,
         hero=True, sids=['jianjie', 'mubiao']),
    dict(file='roadmap.html',  tab='十年路线',  band=('03 · 十年路线图（2026 → 2035）',
          '八个阶段逐项打勾：每个年龄段只做这个年龄段该做的事。'),
         calc=True, sids=['timeline']),
    dict(file='action.html',   tab='落地实操',  band=('04 · 落地实操',
          '周节奏模板、12个月家长行动历、成长档案整理法与时间红线。'),
         calc=True, sids=['plan']),
    dict(file='schools.html',  tab='三校档案',  band=('05 · 三所学校档案',
          '上实 / 上外附中 / 上外浦外：学制、出口、2025-2026官方招生意与报名条件。'),
         calc=False, sids=['xiaoxiao']),
    dict(file='process.html',  tab='报名流程',  band=('06 · 每年4月的“战斗节奏”',
          '简章发布 → 报名 → 初审 → 评估 → 放榜，附三校名额对照表。'),
         calc=True, sids=['liucheng']),
    dict(file='profile.html',  tab='上岸配置',  band=('07 · “上岸配置”辨析',
          '官方明文条件 vs 机构与家长圈口中的“隐形门槛”，附三盆冷水。'),
         calc=False, sids=['peizhi']),
    dict(file='resources.html', tab='学习资源', band=('08 · 学习资源中心',
          '考试报名通道、免费官方平台、分龄分科资源卡，以及 GitHub/开源与更多信息渠道。'),
         calc=False, sids=['ziyuan']),
    dict(file='tools.html',    tab='打印工具',  band=('09 · 可打印工具包',
          '6张自带分页的模板：自检表、周节奏表、学期规划、五年级冲刺月历、材料核对、三校对比。'),
         calc=False, sids=['tools']),
    dict(file='faq.html',      tab='FAQ',      band=('10 · 家长最常问的 10 个问题',
          '从“现在规划是否太早”到“没上岸怎么办”。'),
         calc=False, sids=['faq']),
    dict(file='planb.html',    tab='Plan B',   band=('11 · Plan A/B/C/D',
          '三公只是前置彩蛋：对口公办、民办摇号、国际路线都给你留了后路。'),
         calc=False, sids=['bplan']),
    dict(file='sources.html',  tab='来源',      band=('12 · 资料来源与免责声明',
          '官方简章、媒体报道与核验过的学习平台链接；政策以当年官方为准。'),
         calc=False, sids=['refs']),
]

# ---------- 页面骨架 ----------
NAV = '''<header class="nav" id="top">
  <div class="nav-inner">
    <a class="brand" href="index.html">🎯 沪上三公上岸规划</a>
    <nav class="nav-links" id="navLinks">
{navitems}
    </nav>
    <button class="nav-burger" id="navBurger" aria-label="菜单">☰</button>
  </div>
</header>
'''

FOOTER = '''<footer class="footer">
  <div class="footer-inner">
    <p><strong>沪上三公 · 十年上岸规划</strong>（2岁半起步版）｜整理于2026年9月，将随官方简章更新</p>
    <p class="small">快捷跳转：
      <a href="roadmap.html">十年路线</a> · <a href="action.html">落地实操</a> ·
      <a href="schools.html">三校档案</a> · <a href="process.html">报名流程</a> ·
      <a href="resources.html">学习资源</a> · <a href="tools.html">打印工具</a> ·
      <a href="faq.html">FAQ</a> · <a href="sources.html">来源</a>
    </p>
    <p class="small muted">给孩子最好的规划，是让他十年后依然爱学习、能专注、睡得香。💤</p>
    <p><a href="#top">↑ 回到顶部</a></p>
  </div>
</footer>
'''

def head(title):
    return '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} · 沪上三公上岸规划</title>
<link rel="stylesheet" href="assets/style.css">
<link rel="stylesheet" href="assets/tools.css">
</head>
<body>
'''.format(title=title)

def band_html(text):
    num_title, desc = text
    return '''<section class="band">
  <div class="section-inner">
    <p class="band-kicker"><a href="index.html">🏠 首页</a> ／ {title}</p>
    <h1>{title}</h1>
    <p class="band-desc">{desc}</p>
  </div>
</section>
'''.format(title=num_title, desc=desc)

def navitems_html(active_file):
    out = []
    for p in PAGES:
        cls = ' class="active"' if p['file'] == active_file else ''
        out.append('      <a href="%s"%s>%s</a>' % (p['file'], cls, p['tab']))
    return '\n'.join(out)

def build():
    for p in PAGES:
        parts = [head(p['tab'])]
        parts.append(NAV.format(navitems=navitems_html(p['file'])))
        if p.get('band'):
            parts.append(band_html(p['band']))
        if p.get('hero'):
            parts.append(rewrite_links(hero))
        if p.get('calc'):
            parts.append(rewrite_links(calc))
        parts.append(render_sections(p['sids']))
        parts.append(FOOTER)
        parts.append('<script src="assets/app.js"></script>\n</body>\n</html>\n')
        out = os.path.join(ROOT, p['file'])
        with open(out, 'w', encoding='utf-8') as f:
            f.write('\n'.join(parts))
        print('wrote', p['file'], len('\n'.join(parts)), 'bytes')

if __name__ == '__main__':
    build()
