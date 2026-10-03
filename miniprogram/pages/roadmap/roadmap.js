const content = require('../../data/content.js');
const store = require('../../utils/store.js');

Page({
  data: {
    stages: [],
    totalCount: 0,
    doneCount: 0
  },
  onShow() {
    this.build();
  },
  build() {
    const map = store.todos();
    let total = 0, done = 0;
    const stages = content.roadmap.map((s, i) => {
      const todos = s.todos.map((t, j) => {
        const key = s.id + '_' + j;
        const on = !!map[key];
        total++; if (on) done++;
        return { key, text: t, on, cls: i % 3 === 1 ? 'g1' : (i % 3 === 2 ? 'g2' : '') };
      });
      const stageDone = todos.filter(t => t.on).length;
      return {
        id: s.id, tag: s.tag, title: s.title, period: s.period, goal: s.goal, note: s.note,
        todos,
        cls: i % 3 === 1 ? 'g1' : (i % 3 === 2 ? 'g2' : ''),
        percent: Math.round(stageDone / todos.length * 100)
      };
    });
    this.setData({ stages, totalCount: total, doneCount: done });
  },
  toggle(e) {
    const key = e.currentTarget.dataset.key;
    store.toggleTodo(key);
    this.build();
  },
  reset() {
    wx.showModal({
      title: '清空勾选',
      content: '确定清空所有路线图勾选记录吗？',
      success: (res) => {
        if (!res.confirm) return;
        const map = store.todos();
        Object.keys(map).forEach(k => { map[k] = false; });
        store.set(store.KEYS.todo, map);
        this.build();
        wx.showToast({ title: '已清空', icon: 'none' });
      }
    });
  }
});
