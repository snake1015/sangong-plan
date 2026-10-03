#!/usr/bin/env node
/**
 * 题库同步脚本：从网站的 assets/quiz.js 抽取双赛道题库，
 * 生成小程序数据文件 miniprogram/data/bank.js（保持与网站一致）。
 *
 * 用法： node _src/gen_wechat_bank.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'assets', 'quiz.js');
const OUT = path.join(ROOT, 'miniprogram', 'data', 'bank.js');

const code = fs.readFileSync(SRC, 'utf8');

function grab(re, name) {
  const m = code.match(re);
  if (!m) throw new Error('未找到 ' + name + '，quiz.js 结构可能已变化');
  return m[1];
}

const kid = new Function('return ' + grab(/var BANK_KID = (\[[\s\S]*?\n  \]);/, 'BANK_KID'))();
const jr = new Function('return ' + grab(/var BANK_JR = (\[[\s\S]*?\n  \]);/, 'BANK_JR'))();
const tracks = new Function('BANK_KID', 'BANK_JR',
  'return ' + grab(/var TRACKS = (\{[\s\S]*?\n  \});/, 'TRACKS'))(kid, jr);

const out = {
  generatedAt: new Date().toISOString().slice(0, 10),
  source: 'assets/quiz.js（网站题库，原创模拟题，非官方真题）',
  kidCount: kid.length,
  juniorCount: jr.length,
  tracks: tracks
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT,
  '/* 由 _src/gen_wechat_bank.js 自动生成，请勿手改；改题库请改 assets/quiz.js 后重新运行脚本 */\n' +
  'module.exports = ' + JSON.stringify(out, null, 2) + ';\n', 'utf8');
console.log('[gen-bank] 已生成', path.relative(ROOT, OUT),
  '| 幼升小', kid.length, '题 | 小升初', jr.length, '题');
