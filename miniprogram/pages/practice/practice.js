const bank = require('../../data/bank.js');
const store = require('../../utils/store.js');

const TRACKS = bank.tracks;           // { kid: {...}, junior: {...} }
const byId = {};
Object.keys(TRACKS).forEach(k => TRACKS[k].bank.forEach(q => { byId[q.id] = q; }));

/* ---------- 工具函数（与网站一致） ---------- */
function norm(s) {
  return String(s).toLowerCase().replace(/[\s。，、．,.!！?？:：;；'"“”‘’()（）·\-—_]/g, '');
}
function isCorrect(q, ans) {
  if (ans === undefined || ans === null || ans === '') return false;
  if (q.type === 'choice') return ans === q.a;
  return (q.a || []).some(x => norm(x) === norm(ans));
}
function ansText(q) {
  return q.type === 'choice' ? q.opts[q.a] : ((q.a && q.a[0]) || '');
}
function fmt(sec) {
  sec = Math.max(0, Math.round(sec));
  const m = Math.floor(sec / 60), s = sec % 60;
  return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}

Page({
  data: {
    trackKeys: Object.keys(TRACKS),
    trackLabels: Object.keys(TRACKS).map(k => TRACKS[k].label),
    trackKey: 'kid',
    trackLabel: '',
    phase: 'setup',
    modeOptions: [], modeIndex: 0,
    subOptions: [], subIndex: 0,
    lvOptions: [], lvIndex: 0,
    q: null, opts: [], fillValue: '',
    idx: 0, total: 0, progress: 0,
    checked: false, feedback: null,
    isMock: false, timerText: '',
    sheet: [],
    stars: '', score: 0, acc: 0, usedText: '',
    reviews: [],
    wrongCount: 0,
    history: [],
    young: true
  },

  onLoad() { this.refresh(); },
  onUnload() { this.stopTimer(); },
  onHide() { this.stopTimer(); },

  /* ---------- 设置区 ---------- */
  refresh() {
    const key = this.data.trackKey;
    const t = TRACKS[key];
    this.setData({
      trackLabel: t.label,
      modeOptions: t.modes.map(m => m[1]),
      modeIndex: 0,
      subOptions: ['全部'].concat(t.subjects),
      subIndex: 0,
      lvOptions: t.levels.map(l => l[1]),
      lvIndex: 0,
      wrongCount: store.wrongIds(key).length,
      history: store.scores(key),
      young: !!t.young,
      phase: 'setup'
    });
  },
  switchTrack(e) {
    this.stopTimer();
    this.setData({ trackKey: e.currentTarget.dataset.key });
    this.refresh();
  },
  onModeChange(e) { this.setData({ modeIndex: Number(e.detail.value) }); },
  onSubChange(e) { this.setData({ subIndex: Number(e.detail.value) }); },
  onLvChange(e) { this.setData({ lvIndex: Number(e.detail.value) }); },

  /* ---------- 组卷 ---------- */
  buildList(modeKey) {
    const t = TRACKS[this.data.trackKey];
    if (t.mocks[modeKey]) return t.mocks[modeKey].ids.map(id => byId[id]).filter(Boolean);
    if (modeKey === 'wrong') return store.wrongIds(this.data.trackKey).map(id => byId[id]).filter(Boolean);
    const sub = this.data.subIndex > 0 ? t.subjects[this.data.subIndex - 1] : '';
    const lv = this.data.lvIndex > 0 ? t.levels[this.data.lvIndex][0] : '';
    return t.bank.filter(q => (!sub || q.sub === sub) && (!lv || String(q.lv) === lv));
  },

  start() {
    const t = TRACKS[this.data.trackKey];
    const modeKey = t.modes[this.data.modeIndex][0];
    const list = this.buildList(modeKey);
    if (!list.length) {
      wx.showToast({ title: '没有符合条件的题目', icon: 'none' });
      return;
    }
    const mock = t.mocks[modeKey];
    this.list = list;
    this.modeKey = modeKey;
    this.answers = new Array(list.length);
    this.checked = new Array(list.length);
    this.startTs = Date.now();
    this.isMock = !!mock;
    this.remain = mock ? mock.minutes * 60 : 0;
    this.done = false;
    this.setData({
      phase: 'quiz', idx: 0, total: list.length, isMock: this.isMock, score: 0, reviews: []
    });
    this.startTimer();
    this.renderQuestion();
  },

  startTimer() {
    this.stopTimer();
    this.timer = setInterval(() => {
      if (this.done) return;
      const used = (Date.now() - this.startTs) / 1000;
      if (this.isMock) {
        const left = this.remain - used;
        this.setData({ timerText: '⏳ 剩余 ' + fmt(left) });
        if (left <= 0) this.submit();
      } else {
        this.setData({ timerText: (this.data.young ? '⏱ 已玩 ' : '⏱ 用时 ') + fmt(used) });
      }
    }, 1000);
  },
  stopTimer() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
  },

  /* ---------- 答题 ---------- */
  renderQuestion() {
    const q = this.list[this.data.idx];
    const ans = this.answers[this.data.idx];
    const checked = !!this.checked[this.data.idx];
    const opts = q.type === 'choice' ? q.opts.map((o, i) => {
      let cls = '';
      if (checked) cls = (i === q.a) ? 'ok' : (i === ans ? 'bad' : '');
      else if (i === ans) cls = 'sel';
      return { i, key: 'ABCD'[i], text: o, cls };
    }) : [];
    const feedback = checked ? {
      ok: isCorrect(q, ans),
      answer: ansText(q),
      exp: q.exp,
      title: isCorrect(q, ans)
        ? (this.data.young ? '🎉 太棒了，答对啦！' : '✅ 答对了')
        : (this.data.young ? '🌱 没关系，我们一起看看答案～' : '❌ 答错了')
    } : null;
    const sheet = this.list.map((x, i) => ({
      n: i + 1,
      cls: (i === this.data.idx ? 'cur ' : '') + (this.checked[i] ? 'done' : '')
    }));
    this.setData({
      q: { sub: q.sub, lv: q.lv, type: q.type, stem: q.q, school: q.school },
      opts, checked, feedback,
      fillValue: typeof ans === 'string' ? ans : '',
      progress: Math.round(this.data.idx / this.list.length * 100),
      sheet
    });
  },
  selectOption(e) {
    if (this.checked[this.data.idx]) return;
    this.answers[this.data.idx] = Number(e.currentTarget.dataset.i);
    this.renderQuestion();
  },
  onFill(e) {
    this.answers[this.data.idx] = e.detail.value;
  },
  prev() {
    if (this.data.idx === 0) return;
    this.setData({ idx: this.data.idx - 1 });
    this.renderQuestion();
  },
  next() {
    if (this.data.idx >= this.list.length - 1) return;
    this.setData({ idx: this.data.idx + 1 });
    this.renderQuestion();
  },
  jump(e) {
    this.setData({ idx: Number(e.currentTarget.dataset.i) });
    this.renderQuestion();
  },
  check() {
    const i = this.data.idx, q = this.list[i], ans = this.answers[i];
    if (ans === undefined || ans === null || ans === '') {
      wx.showToast({ title: this.data.young ? '先选一个答案吧～' : '先作答再提交哦', icon: 'none' });
      return;
    }
    this.checked[i] = true;
    if (isCorrect(q, ans)) store.removeWrong(this.data.trackKey, q.id);
    else store.addWrong(this.data.trackKey, q.id);
    this.setData({ wrongCount: store.wrongIds(this.data.trackKey).length });
    this.renderQuestion();
  },
  submit() {
    if (this.done) return;
    this.done = true;
    this.stopTimer();
    const total = this.list.length;
    let score = 0;
    this.list.forEach((q, i) => {
      if (isCorrect(q, this.answers[i])) { score++; store.removeWrong(this.data.trackKey, q.id); }
      else store.addWrong(this.data.trackKey, q.id);
    });
    this.checked = this.list.map(() => true);
    const acc = Math.round(score / total * 100);
    const t = TRACKS[this.data.trackKey];
    const modeName = t.mocks[this.modeKey] ? t.mocks[this.modeKey].name
      : (this.modeKey === 'wrong' ? '错题重做' : '练习模式');
    const used = (Date.now() - this.startTs) / 1000;
    store.addScore(this.data.trackKey, {
      date: new Date().toLocaleString('zh-CN', { hour12: false }).slice(0, 16),
      mode: modeName, score, total, acc
    });
    const stars = this.data.young ? Math.max(1, Math.round(acc / 20)) : 0;
    const reviews = this.list.map((q, i) => {
      const ok = isCorrect(q, this.answers[i]);
      const yours = q.type === 'choice'
        ? (this.answers[i] == null ? '未作答' : q.opts[this.answers[i]])
        : (this.answers[i] || '未作答');
      return { n: i + 1, ok, stem: q.q, yours, answer: ansText(q), exp: q.exp };
    });
    this.setData({
      phase: 'result', score, acc, stars,
      starsOn: '⭐️'.repeat(stars),
      starsOff: '☆'.repeat(5 - stars),
      usedText: fmt(used), reviews,
      wrongCount: store.wrongIds(this.data.trackKey).length,
      history: store.scores(this.data.trackKey)
    });
  },
  again() { this.start(); },
  backSetup() { this.stopTimer(); this.refresh(); },
  openWrong() {
    const n = store.wrongIds(this.data.trackKey).length;
    if (!n) { wx.showToast({ title: '错题本还是空的', icon: 'none' }); return; }
    const t = TRACKS[this.data.trackKey];
    const wi = t.modes.findIndex(m => m[0] === 'wrong');
    this.setData({ modeIndex: wi < 0 ? 0 : wi }, () => this.start());
  }
});
