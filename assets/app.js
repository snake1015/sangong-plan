/* 沪上三公 · 十年上岸规划 — 交互脚本
   包含：导航、三校页签、出生日期推算，以及低龄/交互友好增强
   （表格横向滚动容器、浮动回顶按钮、轻量渐入动画） */
(function () {
  'use strict';

  /* ---------- 顶部导航（移动端汉堡，桌面为胶囊标签条） ---------- */
  var burger = document.getElementById('navBurger');
  var navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') navLinks.classList.remove('open');
    });
  }

  /* ---------- 三校页签 ---------- */
  var btns = document.querySelectorAll('.tab-btn');
  var panels = document.querySelectorAll('.tab-panel');
  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var school = btn.getAttribute('data-school');
      btns.forEach(function (b) { b.classList.toggle('active', b === btn); });
      panels.forEach(function (p) { p.classList.toggle('active', p.getAttribute('data-school') === school); });
    });
  });

  /* ---------- 出生日期 → 入学年份推算 ----------
     .dy 元素：data-o = 相对小学入学年份 E 的偏移（默认 E=2030，出生2024-03）
     上海规则：入学当年8月31日前满6周岁（按月份近似估算） */
  function entryYear(birthYear, birthMonth) {
    return birthYear + (birthMonth <= 8 ? 6 : 7); // 9-12月出生顺延一年（月粒度近似）
  }

  var yearSel = document.getElementById('birthYear');
  var monthSel = document.getElementById('birthMonth');
  var dyEls = Array.prototype.slice.call(document.querySelectorAll('.dy'));

  function refresh() {
    if (!yearSel || !monthSel) return;
    var by = parseInt(yearSel.value, 10);
    var bm = parseInt(monthSel.value, 10);
    var E = entryYear(by, bm);
    dyEls.forEach(function (el) {
      var off = parseInt(el.getAttribute('data-o') || '0', 10);
      el.textContent = String(E + off);
    });
  }

  if (yearSel && monthSel) {
    yearSel.addEventListener('change', refresh);
    monthSel.addEventListener('change', refresh);
    refresh(); // 与 HTML 默认值保持一致
  }

  /* ---------- 交互友好 ①：表格自动加横向滚动容器（手机上不挤压） ---------- */
  document.querySelectorAll('.section-inner table, .quiz table').forEach(function (t) {
    if (t.parentElement && t.parentElement.classList.contains('tbl-wrap')) return;
    var wrap = document.createElement('div');
    wrap.className = 'tbl-wrap';
    t.parentNode.insertBefore(wrap, t);
    wrap.appendChild(t);
  });

  /* ---------- 交互友好 ②：浮动“回到顶部”按钮 ---------- */
  var toTop = document.createElement('button');
  toTop.className = 'to-top';
  toTop.type = 'button';
  toTop.setAttribute('aria-label', '回到顶部');
  toTop.textContent = '↑';
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.body.appendChild(toTop);

  function syncTopBtn() {
    toTop.classList.toggle('show', window.scrollY > 420);
  }
  window.addEventListener('scroll', syncTopBtn, { passive: true });
  syncTopBtn();

  /* ---------- 交互友好 ③：轻量渐入动画（尊重“减少动效”） ---------- */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('.card, .tl-item, .notice, .path-card, .tool-card, .flow-step, .quickstart');
    targets.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    targets.forEach(function (el) { io.observe(el); });
    // 兜底：3 秒后仍未触发的元素直接显示，避免内容被隐藏
    setTimeout(function () {
      targets.forEach(function (el) { el.classList.add('in'); });
    }, 3000);
  }
})();
