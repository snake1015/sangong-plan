/* 沪上三公 · 十年上岸规划 — 交互脚本 */
(function () {
  'use strict';

  /* ---------- 移动端导航 ---------- */
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
    // 9-12月出生：当年不满6周岁 → 顺延一年（月粒度近似）
    return birthYear + (birthMonth <= 8 ? 6 : 7);
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
})();
