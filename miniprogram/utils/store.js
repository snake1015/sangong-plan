/* 本地存储封装：路线图勾选、错题本、成绩（按赛道分开） */
const KEYS = {
  todo: 'sg_todo_v1',
  wrongKid: 'sg_wrong_kid_v1',
  wrongJunior: 'sg_wrong_jr_v1',
  scoreKid: 'sg_scores_kid_v1',
  scoreJunior: 'sg_scores_jr_v1'
};

function get(key, def) {
  try {
    const v = wx.getStorageSync(key);
    return (v === '' || v === null || v === undefined) ? def : v;
  } catch (e) {
    return def;
  }
}

function set(key, val) {
  try { wx.setStorageSync(key, val); } catch (e) {}
}

/* ---------- 路线图勾选 ---------- */
function todos() { return get(KEYS.todo, {}); }

function toggleTodo(id) {
  const map = todos();
  map[id] = !map[id];
  set(KEYS.todo, map);
  return map;
}

/* ---------- 错题本（按赛道） ---------- */
function wrongKey(track) { return track === 'kid' ? KEYS.wrongKid : KEYS.wrongJunior; }
function wrongIds(track) { return get(wrongKey(track), []); }

function addWrong(track, id) {
  const list = wrongIds(track);
  if (list.indexOf(id) < 0) { list.push(id); set(wrongKey(track), list); }
  return list;
}

function removeWrong(track, id) {
  const list = wrongIds(track).filter(x => x !== id);
  set(wrongKey(track), list);
  return list;
}

/* ---------- 成绩历史（按赛道） ---------- */
function scoreKey(track) { return track === 'kid' ? KEYS.scoreKid : KEYS.scoreJunior; }
function scores(track) { return get(scoreKey(track), []); }

function addScore(track, rec) {
  const list = scores(track);
  list.unshift(rec);
  set(scoreKey(track), list.slice(0, 8));
  return list;
}

function clearTrack(track) {
  set(wrongKey(track), []);
  set(scoreKey(track), []);
}

module.exports = {
  KEYS, get, set,
  todos, toggleTodo,
  wrongIds, addWrong, removeWrong,
  scores, addScore, clearTrack
};
