/* ============================================================
   沪上三公规划 · 真题模考页 — 原创题库与交互引擎
   题库全部为本站原创编写（非官方真题），用于题感与限时训练。
   无任何外部依赖；错题与成绩保存在浏览器 localStorage。
   ============================================================ */
(function () {
  'use strict';

  var root = document.getElementById('quiz-root');
  if (!root) return; // 其它页面不加载引擎

  /* ---------------- 题库（51 题，原创） ---------------- */
  var BANK = [
    /* ===== 数学 19 题（机考风格：数字谜/行程/计数/逻辑） ===== */
    { id:'m1', sub:'数学', school:'通用', lv:1, type:'choice',
      q:'一个两位数，十位数字是个位数字的 2 倍，两个数字之和是 9。这个两位数是？',
      opts:['36','63','84','42'], a:1,
      exp:'设个位为 x，则十位为 2x，x+2x=9，x=3，十位是 6，所以是 63。' },
    { id:'m2', sub:'数学', school:'上实', lv:2, type:'fill',
      q:'用 0、1、2、3 组成没有重复数字的四位数，能被 4 整除的共有 ____ 个。',
      a:['4'],
      exp:'能被 4 整除看末两位：12→3012（1个）；20→1320、3120（2个）；32→1032（1个）。共 4 个。' },
    { id:'m3', sub:'数学', school:'通用', lv:1, type:'fill',
      q:'二进制数 10110 写成十进制是 ____。',
      a:['22'],
      exp:'16+0+4+2+0 = 22。' },
    { id:'m4', sub:'数学', school:'通用', lv:1, type:'fill',
      q:'小明家到学校 1200 米。他步行速度 60 米/分，先走 5 分钟，再骑车（150 米/分）到学校，共需 ____ 分钟。',
      a:['11'],
      exp:'先走 5 分钟走 300 米，剩 900 米；900÷150=6 分钟；共 11 分钟。' },
    { id:'m5', sub:'数学', school:'通用', lv:1, type:'fill',
      q:'4 次测验的平均分是 88 分，若 5 次平均分要达到 90 分，第 5 次要考 ____ 分。',
      a:['98'],
      exp:'5×90 − 4×88 = 450 − 352 = 98。' },
    { id:'m6', sub:'数学', school:'通用', lv:1, type:'fill',
      q:'一件商品标价 100 元，先涨价 10%，再打九折，现价是 ____ 元。',
      a:['99'],
      exp:'100×1.1×0.9 = 99。先涨后折，不是回到原价。' },
    { id:'m7', sub:'数学', school:'上实', lv:2, type:'fill',
      q:'一个 3×4 的方格网（4 条横线、5 条竖线），一共可以数出 ____ 个长方形（含正方形）。',
      a:['60'],
      exp:'横线中选 2 条、竖线中选 2 条即可确定一个长方形：C(4,2)×C(5,2)=6×10=60。' },
    { id:'m8', sub:'数学', school:'上实', lv:2, type:'choice',
      q:'甲说：“乙在说谎。”乙说：“丙在说谎。”丙说：“甲和乙都在说谎。”谁一定说真话？',
      opts:['甲','乙','丙','没有人'], a:1,
      exp:'假设甲真→乙假→丙真；但丙说“甲、乙都说谎”，与甲真矛盾。假设甲假→乙真→丙假；丙假意味着“不是甲乙都说谎”，成立。所以乙一定说真话。' },
    { id:'m9', sub:'数学', school:'通用', lv:1, type:'fill',
      q:'1 到 100 中，同时是 3 的倍数和 5 的倍数的数共有 ____ 个。',
      a:['6'],
      exp:'即 15 的倍数：15、30、45、60、75、90，共 6 个。' },
    { id:'m10', sub:'数学', school:'通用', lv:1, type:'fill',
      q:'鸡兔同笼，共 10 个头、28 只脚，兔有 ____ 只。',
      a:['4'],
      exp:'假设全是鸡则 20 只脚，多出 8 只脚，每只兔多 2 只 → 兔 4 只、鸡 6 只。' },
    { id:'m11', sub:'数学', school:'通用', lv:1, type:'fill',
      q:'钟面上 3 点整时，时针与分针的夹角是 ____ 度。',
      a:['90'],
      exp:'3 点整，分针指 12，时针指 3，相隔 3 大格，每格 30°，共 90°。' },
    { id:'m12', sub:'数学', school:'通用', lv:1, type:'choice',
      q:'正方形边长 6 厘米，在里面画一个最大的圆，圆的面积约是（π 取 3.14）',
      opts:['18.84 平方厘米','28.26 平方厘米','113.04 平方厘米','36 平方厘米'], a:1,
      exp:'最大圆直径 = 边长 6，半径 3；面积 = 3.14×3² = 28.26。' },
    { id:'m13', sub:'数学', school:'上实', lv:2, type:'fill',
      q:'5 个人排成一排，甲必须站在正中间，共有 ____ 种排法。',
      a:['24'],
      exp:'甲固定中间，其余 4 人全排列：4×3×2×1 = 24。' },
    { id:'m14', sub:'数学', school:'通用', lv:1, type:'fill',
      q:'找规律填数：2，3，5，8，12，17，____。',
      a:['23'],
      exp:'相邻差依次是 1、2、3、4、5，所以 17+6 = 23。' },
    { id:'m15', sub:'数学', school:'通用', lv:1, type:'fill',
      q:'规定 a△b = 2a + 3b，那么 4△5 = ____。',
      a:['23'],
      exp:'2×4 + 3×5 = 8 + 15 = 23。' },
    { id:'m16', sub:'数学', school:'通用', lv:1, type:'fill',
      q:'200 克水中加入 50 克盐，盐水的浓度是 ____%。',
      a:['20'],
      exp:'浓度 = 盐 ÷ 盐水 = 50 ÷ 250 = 20%。注意分母是盐水不是水。' },
    { id:'m17', sub:'数学', school:'上实', lv:2, type:'choice',
      q:'有一个钟每小时慢 3 分钟。早上 7 点对准，当它显示 12 点时，实际时间最接近？',
      opts:['12:00','12:16','12:04','11:44'], a:1,
      exp:'钟面走 300 分钟，实际过了 300÷57×60 ≈ 315.8 分钟 ≈ 5 小时 16 分，所以约 12:16。' },
    { id:'m18', sub:'数学', school:'上实', lv:2, type:'fill',
      q:'1 到 20 中，既不是 2 的倍数也不是 3 的倍数的数有 ____ 个。',
      a:['7'],
      exp:'2 的倍数 10 个，3 的倍数 6 个，重合 3 个 → 20−(10+6−3)=7。' },
    { id:'m19', sub:'数学', school:'通用', lv:2, type:'fill',
      q:'同时掷两个骰子，点数之和为 7 的概率是 ____（写成分数，如 1/6）。',
      a:['1/6','六分之一'],
      exp:'和为 7 的情况有 6 种，总情况 36 种，概率 6/36 = 1/6。' },

    /* ===== 英语 12 题（快问快答/语法/中译英/阅读） ===== */
    { id:'e1', sub:'英语', school:'上外', lv:1, type:'choice',
      q:'Which animal can live both in water and on land?',
      opts:['A frog','A fish','An eagle','A tiger'], a:0,
      exp:'frog（青蛙）水陆两栖。fish 只能在水里，eagle、tiger 在陆地。' },
    { id:'e2', sub:'英语', school:'上外', lv:1, type:'choice',
      q:'She ____ to the library yesterday.',
      opts:['go','went','goes','going'], a:1,
      exp:'yesterday 是过去时间，用一般过去式 went。' },
    { id:'e3', sub:'英语', school:'浦外', lv:2, type:'fill',
      q:'中译英：我每天骑自行车上学。（用英语填写整句）',
      a:['i go to school by bike every day','i ride a bike to school every day','i go to school by bicycle every day'],
      exp:'参考答案：I go to school by bike every day. / I ride a bike to school every day.' },
    { id:'e4', sub:'英语', school:'上外', lv:1, type:'choice',
      q:'The opposite of “ancient” is ____.',
      opts:['modern','old','far','famous'], a:0,
      exp:'ancient（古代的）↔ modern（现代的）。' },
    { id:'e5', sub:'英语', school:'浦外', lv:1, type:'choice',
      q:'W: It’s raining outside.  M: Take my umbrella.  What does the man suggest?',
      opts:['Staying at home','Taking an umbrella','Buying a raincoat','Calling a taxi'], a:1,
      exp:'男士说“带上我的伞”，即建议 take an umbrella。' },
    { id:'e6', sub:'英语', school:'上外', lv:1, type:'fill',
      q:'用所给词的适当形式填空：Two ____ (child) are playing in the garden.',
      a:['children'],
      exp:'two 后接复数，child 的复数是 children（不规则变化）。' },
    { id:'e7', sub:'英语', school:'浦外', lv:1, type:'choice',
      q:'Which festival comes in December?',
      opts:['Spring Festival','Christmas','Halloween','Mid-Autumn Festival'], a:1,
      exp:'Christmas 在 12 月 25 日；春节在 1-2 月，万圣节在 10 月，中秋在 9-10 月。' },
    { id:'e8', sub:'英语', school:'上外', lv:1, type:'choice',
      q:'Tom gets up at 6:30, runs for 20 minutes, and then has breakfast at 7:00. What does Tom do first after getting up?',
      opts:['He has breakfast.','He runs.','He goes to school.','He reads a book.'], a:1,
      exp:'起床后先跑步，再吃早饭。' },
    { id:'e9', sub:'英语', school:'浦外', lv:2, type:'fill',
      q:'写出数字 12 的序数词（第 12）：____',
      a:['twelfth'],
      exp:'twelve → twelfth（去 ve 加 fth）。' },
    { id:'e10', sub:'英语', school:'上外', lv:1, type:'choice',
      q:'Choose the correct sentence.',
      opts:['He don’t like apples.','He doesn’t likes apples.','He doesn’t like apples.','He not like apples.'], a:2,
      exp:'第三人称单数否定：doesn’t + 动词原形，所以是 He doesn’t like apples.' },
    { id:'e11', sub:'英语', school:'浦外', lv:2, type:'fill',
      q:'中译英：上海是中国最大的城市之一。',
      a:['shanghai is one of the biggest cities in china','shanghai is one of the largest cities in china'],
      exp:'参考答案：Shanghai is one of the biggest / largest cities in China.' },
    { id:'e12', sub:'英语', school:'上外', lv:1, type:'choice',
      q:'My father is a doctor. He ____ in a big hospital.',
      opts:['work','works','working','worked'], a:1,
      exp:'主语 He 是第三人称单数，一般现在时用 works。' },

    /* ===== 语文 10 题（古诗默写/文言/文学常识） ===== */
    { id:'c1', sub:'语文', school:'通用', lv:1, type:'fill',
      q:'古诗默写：不识庐山真面目，________。',
      a:['只缘身在此山中'],
      exp:'苏轼《题西林壁》：不识庐山真面目，只缘身在此山中。' },
    { id:'c2', sub:'语文', school:'通用', lv:1, type:'fill',
      q:'古诗默写：孤帆远影碧空尽，________。',
      a:['唯见长江天际流','惟见长江天际流'],
      exp:'李白《黄鹤楼送孟浩然之广陵》：孤帆远影碧空尽，唯见长江天际流。' },
    { id:'c3', sub:'语文', school:'通用', lv:1, type:'choice',
      q:'“老翁逾墙走”中“走”的意思是？',
      opts:['走路','跑','离开','爬'], a:1,
      exp:'文言中“走”多指“跑”，如“走马观花”。' },
    { id:'c4', sub:'语文', school:'通用', lv:1, type:'choice',
      q:'《西游记》的作者是？',
      opts:['罗贯中','施耐庵','吴承恩','曹雪芹'], a:2,
      exp:'吴承恩；罗贯中《三国演义》、施耐庵《水浒传》、曹雪芹《红楼梦》。' },
    { id:'c5', sub:'语文', school:'通用', lv:1, type:'choice',
      q:'成语“望梅止渴”与谁有关？',
      opts:['刘备','曹操','孙权','诸葛亮'], a:1,
      exp:'典出曹操行军途中以“前有梅林”激励士兵的故事。' },
    { id:'c6', sub:'语文', school:'通用', lv:1, type:'choice',
      q:'“桃花潭水深千尺”主要用了什么修辞手法？',
      opts:['比喻','夸张','拟人','排比'], a:1,
      exp:'“深千尺”明显是夸张，用来衬托友情之深。' },
    { id:'c7', sub:'语文', school:'通用', lv:1, type:'fill',
      q:'名言填空：千里之行，________。',
      a:['始于足下'],
      exp:'《老子》：千里之行，始于足下。' },
    { id:'c8', sub:'语文', school:'通用', lv:1, type:'choice',
      q:'被称为“唐宋八大家”之首的是？',
      opts:['柳宗元','韩愈','苏轼','欧阳修'], a:1,
      exp:'韩愈被列为唐宋八大家之首，倡导古文运动。' },
    { id:'c9', sub:'语文', school:'通用', lv:2, type:'fill',
      q:'“惩前毖后”中“惩”的读音是 ____。',
      a:['chéng','cheng'],
      exp:'惩读 chéng（第二声）。' },
    { id:'c10', sub:'语文', school:'通用', lv:2, type:'choice',
      q:'下列句子没有语病的是？',
      opts:['通过这次活动，使我明白了团结的重要。','我们要养成认真读书。','他不但学习好，而且乐于助人。','教室里传来了同学们快乐的歌声和笑脸。'], a:2,
      exp:'A 缺主语；B 缺宾语（应为“养成……的习惯”）；D“歌声和笑脸”不能都被“传来”搭配；C 正确。' },

    /* ===== 综合/科学 10 题（面谈与文综风格） ===== */
    { id:'s1', sub:'综合', school:'上实', lv:1, type:'choice',
      q:'人在死海里很容易浮起来，主要原因是？',
      opts:['海水温度高','海水密度大','人体变轻了','海面没有风'], a:1,
      exp:'死海含盐量极高，密度大于人体密度，浮力大，所以容易浮起来。' },
    { id:'s2', sub:'综合', school:'上实', lv:1, type:'choice',
      q:'保温杯能保温，关键结构是？',
      opts:['双层玻璃','真空隔热层','厚塑料外壳','金属内胆'], a:1,
      exp:'真空层阻断热的传导与对流，是保温的关键。' },
    { id:'s3', sub:'综合', school:'浦外', lv:1, type:'choice',
      q:'鞋底做成花纹，主要是为了？',
      opts:['好看','增大摩擦','减轻重量','防水'], a:1,
      exp:'花纹使接触面粗糙，增大摩擦力，防滑。' },
    { id:'s4', sub:'综合', school:'上实', lv:1, type:'choice',
      q:'植物进行光合作用，不需要下列哪一项？',
      opts:['阳光','水','二氧化碳','土壤'], a:3,
      exp:'光合作用需要光、水和二氧化碳，土壤提供水分与矿质元素但不是直接原料。' },
    { id:'s5', sub:'综合', school:'浦外', lv:1, type:'choice',
      q:'上海的气候类型属于？',
      opts:['热带季风气候','亚热带季风气候','温带大陆性气候','地中海气候'], a:1,
      exp:'上海位于长江入海口，属亚热带季风气候，四季分明。' },
    { id:'s6', sub:'综合', school:'上实', lv:1, type:'choice',
      q:'铁生锈主要需要同时具备的条件是？',
      opts:['水和氧气','阳光和空气','高温和水','二氧化碳和水'], a:0,
      exp:'铁在同时接触水和氧气时容易生锈，所以防锈常采用涂油、镀层、干燥等方法。' },
    { id:'s7', sub:'综合', school:'通用', lv:1, type:'choice',
      q:'晴天里，一天中物体的影子最短大约是在？',
      opts:['早晨','正午','傍晚','午夜'], a:1,
      exp:'正午太阳高度角最大，影子最短。' },
    { id:'s8', sub:'综合', school:'浦外', lv:1, type:'choice',
      q:'食物放进冰箱冷藏不容易变质，主要原因是？',
      opts:['低温抑制微生物繁殖','冰箱能杀死所有细菌','隔绝了空气','食物被冻住了'], a:0,
      exp:'低温减缓微生物繁殖速度，但不能杀死全部细菌，所以仍要尽快食用。' },
    { id:'s9', sub:'综合', school:'通用', lv:1, type:'choice',
      q:'家用电器着火时，首先应该做什么？',
      opts:['立刻泼水','先切断电源再灭火','打开窗户通风','用湿布直接擦拭'], a:1,
      exp:'带电灭火有触电危险，应先断电，再用干粉/二氧化碳灭火器，切忌泼水。' },
    { id:'s10', sub:'综合', school:'浦外', lv:1, type:'choice',
      q:'按上海垃圾分类，废电池属于？',
      opts:['可回收物','有害垃圾','湿垃圾','干垃圾'], a:1,
      exp:'废电池含重金属，属有害垃圾，需单独投放。' }
  ];

  /* ---------------- 模拟卷 ---------------- */
  var MOCKS = {
    mockA: { name:'模拟卷A（数学+英语+语文）', minutes:30,
      ids:['m1','m2','m3','m4','m5','m6','m7','m8','m9','m10','e1','e2','e4','e5','e6','e10','c1','c3','c4','c5'] },
    mockB: { name:'模拟卷B（综合+数学+英语）', minutes:25,
      ids:['s1','s2','s3','s4','s5','s6','s7','s8','m11','m12','m13','m14','m15','m16','e8','e11','e12','c6','c8','m18'] }
  };

  var LS_WRONG = 'sg_wrong_v1', LS_SCORE = 'sg_scores_v1';
  var byId = {};
  BANK.forEach(function (x) { byId[x.id] = x; });

  /* ---------------- 工具 ---------------- */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function norm(s) {
    return String(s).toLowerCase()
      .replace(/[\s。，、．,.!！?？:：;；'"“”‘’()（）·\-—_]/g, '');
  }
  function isCorrect(q, ans) {
    if (ans === undefined || ans === null || ans === '') return false;
    if (q.type === 'choice') return ans === q.a;
    var list = q.a || [];
    for (var i = 0; i < list.length; i++) { if (norm(list[i]) === norm(ans)) return true; }
    return false;
  }
  function ansText(q) {
    if (q.type === 'choice') return q.opts[q.a];
    return (q.a && q.a[0]) || '';
  }
  function load(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function fmt(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  /* ---------------- 状态 ---------------- */
  var state = null; // {mode, list, idx, answers[], checked[], startTs, timer, remain, done}

  function optionsHtml(sel) {
    var out = '<option value="">全部</option>';
    sel.forEach(function (v) { out += '<option value="' + esc(v) + '">' + esc(v) + '</option>'; });
    return out;
  }

  root.innerHTML =
    '<div class="qz-controls">' +
      '<label class="qz-field">模式<select id="qzMode">' +
        '<option value="practice">练习模式 · 逐题解析</option>' +
        '<option value="mockA">模拟卷A · 20题 / 30分钟</option>' +
        '<option value="mockB">模拟卷B · 20题 / 25分钟</option>' +
        '<option value="wrong">错题重做</option>' +
      '</select></label>' +
      '<label class="qz-field">科目<select id="qzSub">' + optionsHtml(['数学','英语','语文','综合']) + '</select></label>' +
      '<label class="qz-field">学校风格<select id="qzSchool">' + optionsHtml(['通用','上实','上外','浦外']) + '</select></label>' +
      '<label class="qz-field">难度<select id="qzLv"><option value="">全部</option><option value="1">基础</option><option value="2">进阶</option></select></label>' +
      '<button class="qz-btn qz-primary" id="qzStart">开始练习</button>' +
      '<button class="qz-btn" id="qzWrongCount">错题本（0）</button>' +
    '</div>' +
    '<div id="qzBody" class="qz-body"><p class="small muted">选择模式后点「开始练习」。练习模式逐题判分并给解析；模拟卷严格计时，交卷后统一解析。数据只保存在你自己的浏览器里。</p></div>' +
    '<div id="qzHistory" class="qz-history"></div>';

  var $ = function (id) { return document.getElementById(id); };

  function wrongIds() { return load(LS_WRONG, []); }
  function updateWrongBtn() {
    var n = wrongIds().length;
    var b = $('qzWrongCount');
    if (b) b.textContent = '错题本（' + n + '）';
  }
  function addWrong(id) {
    var w = wrongIds(); if (w.indexOf(id) < 0) { w.push(id); save(LS_WRONG, w); }
    updateWrongBtn();
  }
  function removeWrong(id) {
    var w = wrongIds().filter(function (x) { return x !== id; }); save(LS_WRONG, w); updateWrongBtn();
  }
  function history() { return load(LS_SCORE, []); }
  function addScore(rec) {
    var h = history(); h.unshift(rec); h = h.slice(0, 8); save(LS_SCORE, h); renderHistory();
  }
  function renderHistory() {
    var h = history(); var box = $('qzHistory');
    if (!box) return;
    if (!h.length) { box.innerHTML = ''; return; }
    var rows = h.map(function (r) {
      return '<tr><td>' + esc(r.date) + '</td><td>' + esc(r.mode) + '</td><td>' + r.score + '/' + r.total + '</td><td>' + r.acc + '%</td></tr>';
    }).join('');
    box.innerHTML = '<h4>📈 最近成绩</h4><table class="tbl-sm"><thead><tr><th>时间</th><th>模式</th><th>得分</th><th>正确率</th></tr></thead><tbody>' + rows + '</tbody></table>';
  }

  function buildList(mode) {
    if (mode === 'mockA' || mode === 'mockB') {
      return MOCKS[mode].ids.map(function (id) { return byId[id]; }).filter(Boolean);
    }
    if (mode === 'wrong') {
      return wrongIds().map(function (id) { return byId[id]; }).filter(Boolean);
    }
    var sub = $('qzSub').value, school = $('qzSchool').value, lv = $('qzLv').value;
    return BANK.filter(function (q) {
      if (sub && q.sub !== sub) return false;
      if (school && q.school !== school) return false;
      if (lv && String(q.lv) !== lv) return false;
      return true;
    });
  }

  function start() {
    var mode = $('qzMode').value;
    var list = buildList(mode);
    if (!list.length) { alert('没有符合条件的题目：请调整筛选条件，或先在练习模式里做几题积累错题本。'); return; }
    var isMock = (mode === 'mockA' || mode === 'mockB');
    state = {
      mode: mode, list: list, idx: 0,
      answers: new Array(list.length), checked: new Array(list.length),
      startTs: Date.now(), remain: isMock ? MOCKS[mode].minutes * 60 : 0,
      isMock: isMock, done: false, timer: null
    };
    clearInterval(window.__qzTimer);
    window.__qzTimer = setInterval(tick, 1000);
    render();
    tick();
  }

  function tick() {
    if (!state || state.done) return;
    var used = (Date.now() - state.startTs) / 1000;
    var t = $('qzTimer');
    if (!t) return;
    if (state.isMock) {
      var left = state.remain - used;
      t.textContent = '⏳ 剩余 ' + fmt(left);
      t.className = left < 300 ? 'qz-timer danger' : 'qz-timer';
      if (left <= 0) submit(); // 自动交卷
    } else {
      t.textContent = '⏱ 用时 ' + fmt(used);
      t.className = 'qz-timer';
    }
  }

  function render() {
    if (!state) return;
    var body = $('qzBody');
    if (state.done) return renderResult();
    var q = state.list[state.idx];
    var total = state.list.length;
    var ans = state.answers[state.idx];
    var checked = state.checked[state.idx];

    var html = '';
    html += '<div class="qz-top"><div><b>第 ' + (state.idx + 1) + ' / ' + total + ' 题</b>' +
            '<span class="qz-badge">' + esc(q.sub) + '</span><span class="qz-badge">' + esc(q.school) + '风格</span>' +
            '<span class="qz-badge">' + (q.lv === 2 ? '进阶' : '基础') + '</span></div>' +
            '<div id="qzTimer" class="qz-timer">--:--</div></div>' +
            '<div class="qz-progress"><i style="width:' + Math.round((state.idx) / total * 100) + '%"></i></div>';
    html += '<div class="qz-q">' + esc(q.q) + '</div>';

    if (q.type === 'choice') {
      html += '<div class="qz-opts">';
      q.opts.forEach(function (o, i) {
        var cls = 'qz-opt';
        if (checked) {
          if (i === q.a) cls += ' ok';
          else if (i === ans) cls += ' bad';
        } else if (i === ans) cls += ' sel';
        html += '<button class="' + cls + '" data-i="' + i + '">' + 'ABCD'[i] + '. ' + esc(o) + '</button>';
      });
      html += '</div>';
    } else {
      html += '<div class="qz-fill"><input id="qzFill" type="text" placeholder="在此输入答案，注意不要多打标点" value="' + (ans ? esc(ans) : '') + '"' + (checked ? ' disabled' : '') + '></div>';
    }

    if (checked) {
      var ok = isCorrect(q, ans);
      html += '<div class="qz-feedback ' + (ok ? 'ok' : 'bad') + '"><b>' + (ok ? '✅ 答对了' : '❌ 答错了') + '</b>　正确答案：<b>' + esc(ansText(q)) + '</b><br>' + esc(q.exp) + '</div>';
    }

    html += '<div class="qz-nav">';
    html += '<button class="qz-btn" id="qzPrev"' + (state.idx === 0 ? ' disabled' : '') + '>← 上一题</button>';
    if (state.isMock) {
      html += '<button class="qz-btn ' + (checked ? '' : 'qz-primary') + '" id="qzCheck"' + (checked ? ' disabled' : '') + '>确认本题</button>';
      html += '<button class="qz-btn" id="qzNext"' + (state.idx >= total - 1 ? ' disabled' : '') + '>下一题 →</button>';
      html += '<button class="qz-btn qz-submit" id="qzSubmit">📮 交卷判分</button>';
    } else {
      html += '<button class="qz-btn ' + (checked ? '' : 'qz-primary') + '" id="qzCheck"' + (checked ? ' disabled' : '') + '>提交本题</button>';
      html += '<button class="qz-btn" id="qzNext"' + (state.idx >= total - 1 ? ' disabled' : '') + '>下一题 →</button>';
      html += '<button class="qz-btn qz-submit" id="qzSubmit">📮 提前结束并看成绩</button>';
    }
    html += '</div>';
    html += '<div class="qz-sheet" id="qzSheet">' + state.list.map(function (x, i) {
      var c = 'qz-sheet-btn';
      if (i === state.idx) c += ' cur';
      if (state.checked[i] !== undefined && state.checked[i] !== null) c += ' done';
      return '<button class="' + c + '" data-jump="' + i + '">' + (i + 1) + '</button>';
    }).join('') + '</div>';

    body.innerHTML = html;
    bind();
  }

  function bind() {
    var body = $('qzBody');
    body.querySelectorAll('.qz-opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (state.checked[state.idx]) return;
        state.answers[state.idx] = parseInt(btn.getAttribute('data-i'), 10);
        render();
      });
    });
    var fi = $('qzFill');
    if (fi) {
      fi.addEventListener('input', function () { state.answers[state.idx] = fi.value; });
      fi.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
    }
    var prev = $('qzPrev'); if (prev) prev.addEventListener('click', function () { if (state.idx > 0) { state.idx--; render(); tick(); } });
    var next = $('qzNext'); if (next) next.addEventListener('click', function () { if (state.idx < state.list.length - 1) { state.idx++; render(); tick(); } });
    var chk = $('qzCheck'); if (chk) chk.addEventListener('click', check);
    var sub = $('qzSubmit'); if (sub) sub.addEventListener('click', function () {
      if (confirm('确定交卷吗？交卷后将显示成绩与逐题解析。')) submit();
    });
    body.querySelectorAll('[data-jump]').forEach(function (b) {
      b.addEventListener('click', function () { state.idx = parseInt(b.getAttribute('data-jump'), 10); render(); tick(); });
    });
  }

  function check() {
    if (!state || state.done) return;
    var i = state.idx, q = state.list[i], ans = state.answers[i];
    if (ans === undefined || ans === null || ans === '') { alert('先作答再提交哦。'); return; }
    state.checked[i] = true;
    if (!isCorrect(q, ans)) addWrong(q.id); else removeWrong(q.id);
    render();
  }

  function submit() {
    if (!state || state.done) return;
    state.done = true;
    state.used = (Date.now() - state.startTs) / 1000;
    clearInterval(window.__qzTimer);
    // 模考模式下把所有未确认题视为已交卷
    state.checked = state.list.map(function (_, i) { return true; });
    var score = 0;
    state.list.forEach(function (q, i) {
      if (isCorrect(q, state.answers[i])) { score++; removeWrong(q.id); } else { addWrong(q.id); }
    });
    var modeName = state.isMock ? MOCKS[state.mode].name : (state.mode === 'wrong' ? '错题重做' : '练习模式');
    addScore({
      date: new Date().toLocaleString('zh-CN', { hour12: false }).slice(0, 16),
      mode: modeName,
      score: score, total: state.list.length,
      acc: Math.round(score / state.list.length * 100)
    });
    renderResult();
  }

  function renderResult() {
    var body = $('qzBody');
    var total = state.list.length, score = 0;
    state.list.forEach(function (q, i) { if (isCorrect(q, state.answers[i])) score++; });
    var acc = Math.round(score / total * 100);
    var html = '<div class="qz-result">' +
      '<div class="qz-score">' + score + ' <span>/ ' + total + '</span></div>' +
      '<p>正确率 <b>' + acc + '%</b>　用时 <b>' + fmt(state.used) + '</b>' +
      (acc >= 85 ? '　🎉 很棒，可以挑战进阶题或模拟卷B。' : acc >= 60 ? '　👍 基础不错，重点看错题解析。' : '　💪 别急，先按科目小批量练习，错题二刷。') + '</p>' +
      '<div class="qz-nav"><button class="qz-btn qz-primary" id="qzAgain">重做本套</button>' +
      '<button class="qz-btn" id="qzBack">返回设置</button>' +
      '<button class="qz-btn" id="qzKey">📄 答案与解析速查（可打印）</button></div>' +
      '<div id="qzKeyBox"></div>' +
      '<h4>逐题回顾</h4>';
    state.list.forEach(function (q, i) {
      var ok = isCorrect(q, state.answers[i]);
      var yours = q.type === 'choice' ? (state.answers[i] == null ? '未作答' : q.opts[state.answers[i]]) : (state.answers[i] || '未作答');
      html += '<div class="qz-review"><b>' + (i + 1) + '. ' + (ok ? '✅' : '❌') + '</b> ' + esc(q.q) +
        '<br><span class="small">你的答案：' + esc(yours) + '　｜　正确答案：<b>' + esc(ansText(q)) + '</b></span>' +
        '<br><span class="small muted">解析：' + esc(q.exp) + '</span></div>';
    });
    html += '</div>';
    body.innerHTML = html;
    $('qzAgain').addEventListener('click', function () { start(); });
    $('qzBack').addEventListener('click', function () {
      state = null;
      body.innerHTML = '<p class="small muted">已返回设置，可重新选择模式开始。</p>';
    });
    $('qzKey').addEventListener('click', function () {
      var box = $('qzKeyBox');
      if (box.innerHTML) { box.innerHTML = ''; return; }
      box.innerHTML = '<details open><summary>本套题目答案与解析</summary><ol class="small">' + state.list.map(function (q) {
        return '<li><b>' + esc(ansText(q)) + '</b>　' + esc(q.exp) + '</li>';
      }).join('') + '</ol></details>';
    });
  }

  /* ---------------- 绑定入口 ---------------- */
  $('qzStart').addEventListener('click', start);
  $('qzWrongCount').addEventListener('click', function () {
    var n = wrongIds().length;
    if (!n) { alert('错题本是空的：先做练习，答错的题目会自动收集到这里。'); return; }
    $('qzMode').value = 'wrong';
    start();
  });
  ['qzMode','qzSub','qzSchool','qzLv'].forEach(function (id) {
    var el = $(id); if (el) el.addEventListener('change', function () {});
  });
  updateWrongBtn();
  renderHistory();
})();
