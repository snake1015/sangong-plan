/* ============================================================
   沪上三公规划 · 真题模考页 — 双赛道原创题库与交互引擎
   🧸 幼升小（2.5–6 岁，低龄适配：读题语音/大按钮/星级/亲子口语卡）
   🎒 小升初（10–12 岁，三公机考风格：练习 + 模拟卷A/B）
   题库全部为本站原创编写（非官方真题）；错题与成绩按赛道分开保存在浏览器。
   无任何外部依赖。
   ============================================================ */
(function () {
  'use strict';

  var root = document.getElementById('quiz-root');
  if (!root) return; // 其它页面不加载引擎

  /* ================= 小升初题库（51 题，原创） ================= */
  var BANK_JR = [
    /* ===== 数学 19 题 ===== */
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

    /* ===== 英语 12 题 ===== */
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

    /* ===== 语文 10 题 ===== */
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

    /* ===== 综合/科学 10 题 ===== */
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
      exp:'铁在同时接触水和氧气时容易生锈，防锈常用涂油、镀层、干燥等方法。' },
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

  /* ================= 幼升小题库（30 题，原创，全部点选） ================= */
  var BANK_KID = [
    /* 数感 8 */
    { id:'k1', sub:'数感', school:'幼升小', lv:1, type:'choice',
      q:'数一数：🍎🍎🍎 一共有几个苹果？', opts:['2 个','3 个','4 个'], a:1,
      exp:'一个一个数：1、2、3，一共 3 个。' },
    { id:'k2', sub:'数感', school:'幼升小', lv:1, type:'choice',
      q:'哪个数字最大？', opts:['5','3','7'], a:2,
      exp:'7 比 5 和 3 都大。' },
    { id:'k3', sub:'数感', school:'幼升小', lv:1, type:'choice',
      q:'1、2、□、4，□ 里应该填几？', opts:['3','5','6'], a:0,
      exp:'按顺序数：1、2、3、4，所以填 3。' },
    { id:'k4', sub:'数感', school:'幼升小', lv:1, type:'choice',
      q:'🐟🐟 又游来 1 条小鱼，一共几条？', opts:['2 条','3 条','4 条'], a:1,
      exp:'2 条再加 1 条，就是 3 条。' },
    { id:'k5', sub:'数感', school:'幼升小', lv:2, type:'choice',
      q:'有 5 颗糖，吃掉 2 颗，还剩几颗？', opts:['2 颗','3 颗','4 颗'], a:1,
      exp:'5 − 2 = 3，还剩 3 颗。' },
    { id:'k6', sub:'数感', school:'幼升小', lv:2, type:'choice',
      q:'比一比，哪边多？　A：🍬🍬🍬🍬　B：🍪🍪🍪', opts:['A 多','B 多','一样多'], a:0,
      exp:'A 有 4 个，B 有 3 个，4 > 3，所以 A 多。' },
    { id:'k7', sub:'数感', school:'幼升小', lv:2, type:'choice',
      q:'3 + 4 = ？', opts:['6','7','8'], a:1,
      exp:'先数 3 个，再接着数 4 个：4、5、6、7，一共 7。' },
    { id:'k8', sub:'数感', school:'幼升小', lv:2, type:'choice',
      q:'10、9、8、□，下一个是几？', opts:['7','6','10'], a:0,
      exp:'数字一个一个变小：10、9、8、7。' },

    /* 观察 6 */
    { id:'k9', sub:'观察', school:'幼升小', lv:1, type:'choice',
      q:'下面哪一个是圆形？', opts:['🔺','⚪','⬛'], a:1,
      exp:'⚪ 是圆形；🔺 是三角形，⬛ 是正方形。' },
    { id:'k10', sub:'观察', school:'幼升小', lv:1, type:'choice',
      q:'找规律：🔴🔵🔴🔵🔴，下一个应该是什么？', opts:['🔴','🔵','🟢'], a:1,
      exp:'一红一蓝交替出现，红色的后面是蓝色。' },
    { id:'k11', sub:'观察', school:'幼升小', lv:1, type:'choice',
      q:'谁的身体最大？', opts:['🐘 大象','🐱 小猫','🐭 小鼠'], a:0,
      exp:'大象最大，小鼠最小。' },
    { id:'k12', sub:'观察', school:'幼升小', lv:2, type:'choice',
      q:'找出不同类的一个：🍎　🍌　🍇　🚗', opts:['🍎','🚗','🍇'], a:1,
      exp:'苹果、香蕉、葡萄都是水果，汽车不是。' },
    { id:'k13', sub:'观察', school:'幼升小', lv:2, type:'choice',
      q:'找规律：🔺🔺⚪🔺🔺⚪，下一个是？', opts:['🔺','⚪','⬛'], a:0,
      exp:'两个三角形、一个圆，重复出现，所以接下来是三角形。' },
    { id:'k14', sub:'观察', school:'幼升小', lv:2, type:'choice',
      q:'桌上从上到下放着：📕 书、🍎 苹果、⚽ 球。最上面的是？', opts:['📕 书','🍎 苹果','⚽ 球'], a:0,
      exp:'“从上到下”是书在最上面，球在最下面。' },

    /* 语言 6 */
    { id:'k15', sub:'语言', school:'幼升小', lv:1, type:'choice',
      q:'和“上”意思相反的字是？', opts:['下','大','左'], a:0,
      exp:'“上”的反义词是“下”。' },
    { id:'k16', sub:'语言', school:'幼升小', lv:1, type:'choice',
      q:'古诗《静夜思》的第一句是？', opts:['床前明月光','白日依山尽','春眠不觉晓'], a:0,
      exp:'《静夜思》：床前明月光，疑是地上霜。' },
    { id:'k17', sub:'语言', school:'幼升小', lv:2, type:'choice',
      q:'“春眠不觉晓”的下一句是？', opts:['处处闻啼鸟','夜来风雨声','花落知多少'], a:0,
      exp:'孟浩然《春晓》：春眠不觉晓，处处闻啼鸟。' },
    { id:'k18', sub:'语言', school:'幼升小', lv:2, type:'choice',
      q:'“一寸光阴一寸金”告诉我们什么？', opts:['要珍惜时间','要节约用钱','要早点睡觉'], a:0,
      exp:'这句话把时间比作金子，提醒我们珍惜时间。' },
    { id:'k19', sub:'语言', school:'幼升小', lv:2, type:'choice',
      q:'哪个字和水有关？', opts:['江','山','火'], a:0,
      exp:'“江”有三点水，表示和水有关。' },
    { id:'k20', sub:'语言', school:'幼升小', lv:1, type:'choice',
      q:'和“白天”意思相反的是？', opts:['晚上','早上','中午'], a:0,
      exp:'白天的反义词是晚上。' },

    /* 英语 6 */
    { id:'k21', sub:'英语', school:'幼升小', lv:1, type:'choice',
      q:'What color is the sun? 🌞', opts:['Red','Yellow','Blue'], a:1,
      exp:'太阳是黄色的：yellow。' },
    { id:'k22', sub:'英语', school:'幼升小', lv:1, type:'choice',
      q:'哪个单词是“猫”？', opts:['dog','cat','pig'], a:1,
      exp:'cat 是猫；dog 是狗，pig 是猪。' },
    { id:'k23', sub:'英语', school:'幼升小', lv:1, type:'choice',
      q:'数一数：🐤🐤🐤 → 用英语说是？', opts:['two','three','four'], a:1,
      exp:'3 的英语是 three。' },
    { id:'k24', sub:'英语', school:'幼升小', lv:2, type:'choice',
      q:'“Hello” 的意思是？', opts:['你好','再见','谢谢'], a:0,
      exp:'Hello = 你好。' },
    { id:'k25', sub:'英语', school:'幼升小', lv:2, type:'choice',
      q:'Which one is a fruit? 🍎', opts:['apple','book','car'], a:0,
      exp:'apple 是水果苹果；book 是书，car 是汽车。' },
    { id:'k26', sub:'英语', school:'幼升小', lv:2, type:'choice',
      q:'别人说 “Thank you”，我们可以回答？', opts:['You are welcome','Good night','Sorry'], a:0,
      exp:'“Thank you”的常用回答是 “You are welcome.”（不客气）。' },

    /* 常识 4 */
    { id:'k27', sub:'常识', school:'幼升小', lv:1, type:'choice',
      q:'过马路的时候，应该怎么做？', opts:['看红绿灯，走斑马线','跑着冲过去','边看手机边走'], a:0,
      exp:'红灯停、绿灯行，走斑马线，并牵着大人的手。' },
    { id:'k28', sub:'常识', school:'幼升小', lv:1, type:'choice',
      q:'吃饭之前应该先做什么？', opts:['洗手','看电视','睡觉'], a:0,
      exp:'饭前便后要洗手，保护好身体。' },
    { id:'k29', sub:'常识', school:'幼升小', lv:1, type:'choice',
      q:'下雨天出门要带什么？', opts:['雨伞','扇子','围巾'], a:0,
      exp:'下雨要带雨伞或雨衣。' },
    { id:'k30', sub:'常识', school:'幼升小', lv:2, type:'choice',
      q:'一年有哪四个季节？', opts:['春、夏、秋、冬','早、中、晚','上、下、左、右'], a:0,
      exp:'一年四季：春天、夏天、秋天、冬天。' }
  ];

  /* ================= 赛道配置 ================= */
  var TRACKS = {
    kid: {
      key:'kid', label:'🧸 幼升小（2.5–6 岁）', bank:BANK_KID,
      subjects:['数感','观察','语言','英语','常识'],
      levels:[['', '全部'], ['1', '启蒙 2.5–4 岁'], ['2', '幼小衔接 4–6 岁']],
      showSchool:false, young:true,
      modes:[['practice','练习模式 · 读题+鼓励'], ['mockKid','亲子小测 · 10题/8分钟'], ['wrong','错题重做']],
      mocks:{ mockKid:{ name:'幼升小亲子小测', minutes:8,
        ids:['k1','k2','k3','k4','k9','k10','k15','k16','k21','k27'] } },
      wrongKey:'sg_wrong_kid_v1', scoreKey:'sg_scores_kid_v1',
      oral:['说说你最喜欢的小动物，它长什么样？',
            '今天在幼儿园或公园里，你最喜欢的一件事是什么？',
            '介绍一下你的房间：里面有什么？',
            '数一数家里有几把椅子、几张桌子？',
            '用英语说出三种颜色、三种水果。',
            '背一首你最喜欢的古诗，再说说它讲了什么。',
            '如果下雨不能出去玩，你会做什么？',
            '给爸爸妈妈讲一个你自己编的小故事。']
    },
    junior: {
      key:'junior', label:'🎒 小升初（10–12 岁）', bank:BANK_JR,
      subjects:['数学','英语','语文','综合'],
      levels:[['', '全部'], ['1', '基础'], ['2', '进阶']],
      showSchool:true, young:false,
      modes:[['practice','练习模式 · 逐题解析'], ['mockA','模拟卷A · 20题/30分钟'],
             ['mockB','模拟卷B · 20题/25分钟'], ['wrong','错题重做']],
      mocks:{
        mockA:{ name:'模拟卷A（数学+英语+语文）', minutes:30,
          ids:['m1','m2','m3','m4','m5','m6','m7','m8','m9','m10','e1','e2','e4','e5','e6','e10','c1','c3','c4','c5'] },
        mockB:{ name:'模拟卷B（综合+数学+英语）', minutes:25,
          ids:['s1','s2','s3','s4','s5','s6','s7','s8','m11','m12','m13','m14','m15','m16','e8','e11','e12','c6','c8','m18'] }
      },
      wrongKey:'sg_wrong_jr_v1', scoreKey:'sg_scores_jr_v1',
      oral:null
    }
  };

  var byId = {};
  Object.keys(TRACKS).forEach(function (k) {
    TRACKS[k].bank.forEach(function (q) { byId[q.id] = q; });
  });

  /* ================= 工具 ================= */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function norm(s) {
    return String(s).toLowerCase().replace(/[\s。，、．,.!！?？:：;；'"“”‘’()（）·\-—_]/g, '');
  }
  function isCorrect(q, ans) {
    if (ans === undefined || ans === null || ans === '') return false;
    if (q.type === 'choice') return ans === q.a;
    var list = q.a || [];
    for (var i = 0; i < list.length; i++) { if (norm(list[i]) === norm(ans)) return true; }
    return false;
  }
  function ansText(q) { return q.type === 'choice' ? q.opts[q.a] : ((q.a && q.a[0]) || ''); }
  function load(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function fmt(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }
  function $(id) { return document.getElementById(id); }

  /* ================= 状态 ================= */
  var trackKey = 'kid';           // 默认先展示低龄赛道
  var autoSpeak = false;
  var state = null;

  function T() { return TRACKS[trackKey]; }

  /* ================= 框架渲染 ================= */
  root.innerHTML =
    '<div class="qz-tracks" id="qzTracks">' +
      Object.keys(TRACKS).map(function (k) {
        return '<button class="qz-track' + (k === trackKey ? ' active' : '') + '" data-track="' + k + '">' + TRACKS[k].label + '</button>';
      }).join('') +
    '</div>' +
    '<div class="qz-controls">' +
      '<label class="qz-field">模式<select id="qzMode"></select></label>' +
      '<label class="qz-field">科目<select id="qzSub"></select></label>' +
      '<label class="qz-field" id="qzSchoolWrap">学校风格<select id="qzSchool"></select></label>' +
      '<label class="qz-field">难度<select id="qzLv"></select></label>' +
      '<button class="qz-btn qz-primary" id="qzStart">开始练习</button>' +
      '<button class="qz-btn" id="qzWrongCount">错题本（0）</button>' +
      '<button class="qz-btn" id="qzSpeakBtn" title="用浏览器朗读题目，适合低龄孩子">🔊 自动读题：关</button>' +
    '</div>' +
    '<div id="qzOral" class="qz-oral"></div>' +
    '<div id="qzBody" class="qz-body"><p class="small muted">选择赛道与模式，点「开始练习」。🧸 幼升小建议家长陪读、孩子口头作答后由家长点选；🎒 小升初可独立完成。数据只保存在你自己的浏览器里。</p></div>' +
    '<div id="qzHistory" class="qz-history"></div>';

  function fillSelects() {
    var t = T();
    $('qzMode').innerHTML = t.modes.map(function (m) { return '<option value="' + m[0] + '">' + esc(m[1]) + '</option>'; }).join('');
    $('qzSub').innerHTML = '<option value="">全部</option>' + t.subjects.map(function (s) { return '<option value="' + esc(s) + '">' + esc(s) + '</option>'; }).join('');
    $('qzLv').innerHTML = t.levels.map(function (l) { return '<option value="' + l[0] + '">' + esc(l[1]) + '</option>'; }).join('');
    $('qzSchoolWrap').style.display = t.showSchool ? '' : 'none';
    $('qzSchool').innerHTML = '<option value="">全部</option>' + ['通用','上实','上外','浦外'].map(function (s) { return '<option value="' + s + '">' + s + '</option>'; }).join('');
    root.classList.toggle('qz-young', !!t.young);
    var oral = $('qzOral');
    if (t.oral) {
      oral.innerHTML = '<details class="qz-card"><summary>🗣️ 亲子口语卡（不评分，建议每天抽 1 张聊 2 分钟）</summary><ul>' +
        t.oral.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></details>';
    } else { oral.innerHTML = ''; }
    updateWrongBtn();
    renderHistory();
  }

  function switchTrack(k) {
    trackKey = k;
    state = null;
    root.querySelectorAll('.qz-track').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-track') === k); });
    fillSelects();
    $('qzBody').innerHTML = '<p class="small muted">已切换到 ' + esc(TRACKS[k].label) + '，选择模式后点「开始练习」。</p>';
  }

  /* ================= 错题本 / 成绩（按赛道分开） ================= */
  function wrongIds() { return load(T().wrongKey, []); }
  function updateWrongBtn() {
    var b = $('qzWrongCount'); if (b) b.textContent = '错题本（' + wrongIds().length + '）';
  }
  function addWrong(id) {
    var w = wrongIds(); if (w.indexOf(id) < 0) { w.push(id); save(T().wrongKey, w); } updateWrongBtn();
  }
  function removeWrong(id) {
    save(T().wrongKey, wrongIds().filter(function (x) { return x !== id; })); updateWrongBtn();
  }
  function history() { return load(T().scoreKey, []); }
  function addScore(rec) {
    var h = history(); h.unshift(rec); save(T().scoreKey, h.slice(0, 8)); renderHistory();
  }
  function renderHistory() {
    var box = $('qzHistory'); if (!box) return;
    var h = history();
    if (!h.length) { box.innerHTML = ''; return; }
    box.innerHTML = '<h4>📈 ' + esc(T().label) + ' 最近成绩</h4><table class="tbl-sm"><thead><tr><th>时间</th><th>模式</th><th>得分</th><th>正确率</th></tr></thead><tbody>' +
      h.map(function (r) { return '<tr><td>' + esc(r.date) + '</td><td>' + esc(r.mode) + '</td><td>' + r.score + '/' + r.total + '</td><td>' + r.acc + '%</td></tr>'; }).join('') +
      '</tbody></table>';
  }

  /* ================= 读题（低龄适配） ================= */
  function speak(text) {
    if (!autoSpeak || !('speechSynthesis' in window) || !text) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'zh-CN'; u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  /* ================= 组卷 ================= */
  function buildList(mode) {
    var t = T();
    if (t.mocks[mode]) return t.mocks[mode].ids.map(function (id) { return byId[id]; }).filter(Boolean);
    if (mode === 'wrong') return wrongIds().map(function (id) { return byId[id]; }).filter(Boolean);
    var sub = $('qzSub').value, school = t.showSchool ? $('qzSchool').value : '', lv = $('qzLv').value;
    return t.bank.filter(function (q) {
      if (sub && q.sub !== sub) return false;
      if (school && q.school !== school) return false;
      if (lv && String(q.lv) !== lv) return false;
      return true;
    });
  }

  function start() {
    var mode = $('qzMode').value;
    var list = buildList(mode);
    if (!list.length) { alert('没有符合条件的题目：请调整筛选，或先在练习模式里做几题积累错题本。'); return; }
    var mock = T().mocks[mode];
    state = {
      mode: mode, list: list, idx: 0,
      answers: new Array(list.length), checked: new Array(list.length),
      startTs: Date.now(), isMock: !!mock, remain: mock ? mock.minutes * 60 : 0, done: false
    };
    clearInterval(window.__qzTimer);
    window.__qzTimer = setInterval(tick, 1000);
    render(); tick();
  }

  function tick() {
    if (!state || state.done) return;
    var el = $('qzTimer'); if (!el) return;
    var used = (Date.now() - state.startTs) / 1000;
    if (state.isMock) {
      var left = state.remain - used;
      el.textContent = '⏳ 剩余 ' + fmt(left);
      el.className = left < 300 ? 'qz-timer danger' : 'qz-timer';
      if (left <= 0) submit();
    } else {
      el.textContent = T().young ? '⏱ 已玩 ' + fmt(used) : '⏱ 用时 ' + fmt(used);
      el.className = 'qz-timer';
    }
  }

  /* ================= 渲染 ================= */
  function render() {
    if (!state) return;
    if (state.done) return renderResult();
    var t = T(), q = state.list[state.idx], total = state.list.length;
    var ans = state.answers[state.idx], checked = state.checked[state.idx];
    var html = '';

    html += '<div class="qz-top"><div><b>' + (t.young ? '第 ' + (state.idx + 1) + ' 题（共 ' + total + ' 题）' : '第 ' + (state.idx + 1) + ' / ' + total + ' 题') + '</b>' +
      '<span class="qz-badge">' + esc(q.sub) + '</span>' +
      (t.showSchool ? '<span class="qz-badge">' + esc(q.school) + '风格</span>' : '') +
      '<span class="qz-badge">' + (q.lv === 2 ? (t.young ? '4–6 岁' : '进阶') : (t.young ? '2.5–4 岁' : '基础')) + '</span></div>' +
      '<div class="qz-timer-wrap"><button class="qz-btn qz-mini" id="qzSpeak" title="读给我听">🔊 读题</button></div>' +
      '<div id="qzTimer" class="qz-timer">--:--</div></div>' +
      '<div class="qz-progress"><i style="width:' + Math.round(state.idx / total * 100) + '%"></i></div>';
    html += '<div class="qz-q">' + esc(q.q) + '</div>';

    if (q.type === 'choice') {
      html += '<div class="qz-opts">';
      q.opts.forEach(function (o, i) {
        var cls = 'qz-opt';
        if (checked) { if (i === q.a) cls += ' ok'; else if (i === ans) cls += ' bad'; }
        else if (i === ans) cls += ' sel';
        html += '<button class="' + cls + '" data-i="' + i + '"><span class="qz-key">' + 'ABCD'[i] + '</span>' + esc(o) + '</button>';
      });
      html += '</div>';
    } else {
      html += '<div class="qz-fill"><input id="qzFill" type="text" placeholder="在此输入答案，注意不要多打标点" value="' + (ans ? esc(ans) : '') + '"' + (checked ? ' disabled' : '') + '></div>';
    }

    if (checked) {
      var ok = isCorrect(q, ans);
      html += '<div class="qz-feedback ' + (ok ? 'ok' : 'bad') + '"><b>' +
        (ok ? (t.young ? '🎉 太棒了，答对啦！' : '✅ 答对了') : (t.young ? '🌱 没关系，我们一起看看答案～' : '❌ 答错了')) +
        '</b>　正确答案：<b>' + esc(ansText(q)) + '</b><br>' + esc(t.young ? q.exp + '（家长可以带着孩子再读一遍题目）' : q.exp) + '</div>';
    }

    html += '<div class="qz-nav">';
    html += '<button class="qz-btn" id="qzPrev"' + (state.idx === 0 ? ' disabled' : '') + '>← 上一题</button>';
    html += '<button class="qz-btn ' + (checked ? '' : 'qz-primary') + '" id="qzCheck"' + (checked ? ' disabled' : '') + '>' + (state.isMock ? '确认本题' : (t.young ? '看看对不对' : '提交本题')) + '</button>';
    html += '<button class="qz-btn" id="qzNext"' + (state.idx >= total - 1 ? ' disabled' : '') + '>下一题 →</button>';
    html += '<button class="qz-btn qz-submit" id="qzSubmit">' + (t.young ? '🏁 结束，看星星' : '📮 交卷判分') + '</button>';
    html += '</div>';

    html += '<div class="qz-sheet">' + state.list.map(function (x, i) {
      var c = 'qz-sheet-btn';
      if (i === state.idx) c += ' cur';
      if (state.checked[i]) c += ' done';
      return '<button class="' + c + '" data-jump="' + i + '">' + (i + 1) + '</button>';
    }).join('') + '</div>';

    $('qzBody').innerHTML = html;
    bind();
    if (t.young && autoSpeak) speak(q.q + '。' + q.opts.map(function (o, i) { return '选项' + 'ABCD'[i] + '：' + o; }).join('。'));
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
      if (confirm(T().young ? '现在结束本次小测，看看得几颗星星吗？' : '确定交卷吗？交卷后将显示成绩与逐题解析。')) submit();
    });
    var sp = $('qzSpeak'); if (sp) sp.addEventListener('click', function () {
      var q = state.list[state.idx];
      if (!('speechSynthesis' in window)) { alert('当前浏览器不支持语音朗读，请家长读题。'); return; }
      autoSpeak = true; syncSpeakBtn();
      speak(q.q + '。' + q.opts.map(function (o, i) { return '选项' + 'ABCD'[i] + '：' + o; }).join('。'));
    });
    body.querySelectorAll('[data-jump]').forEach(function (b) {
      b.addEventListener('click', function () { state.idx = parseInt(b.getAttribute('data-jump'), 10); render(); tick(); });
    });
  }

  function check() {
    if (!state || state.done) return;
    var i = state.idx, q = state.list[i], ans = state.answers[i];
    if (ans === undefined || ans === null || ans === '') { alert(T().young ? '先选一个答案吧～' : '先作答再提交哦。'); return; }
    state.checked[i] = true;
    if (isCorrect(q, ans)) removeWrong(q.id); else addWrong(q.id);
    render();
  }

  function submit() {
    if (!state || state.done) return;
    state.done = true;
    state.used = (Date.now() - state.startTs) / 1000;
    clearInterval(window.__qzTimer);
    state.checked = state.list.map(function () { return true; });
    var score = 0;
    state.list.forEach(function (q, i) {
      if (isCorrect(q, state.answers[i])) { score++; removeWrong(q.id); } else { addWrong(q.id); }
    });
    var t = T(), modeName = t.mocks[state.mode] ? t.mocks[state.mode].name : (state.mode === 'wrong' ? '错题重做' : '练习模式');
    addScore({
      date: new Date().toLocaleString('zh-CN', { hour12: false }).slice(0, 16),
      mode: modeName, score: score, total: state.list.length,
      acc: Math.round(score / state.list.length * 100)
    });
    renderResult();
  }

  function renderResult() {
    var t = T(), total = state.list.length, score = 0;
    state.list.forEach(function (q, i) { if (isCorrect(q, state.answers[i])) score++; });
    var acc = Math.round(score / total * 100);
    var html = '<div class="qz-result">';
    if (t.young) {
      var stars = Math.max(1, Math.round(acc / 20));
      html += '<div class="qz-stars">' + '⭐️'.repeat(stars) + '<span class="qz-stars-off">' + '☆'.repeat(5 - stars) + '</span></div>' +
        '<p class="qz-score">' + score + ' <span>/ ' + total + '</span>　正确率 <b>' + acc + '%</b></p>' +
        '<p>' + (acc >= 80 ? '🎉 太厉害了！可以试试“幼小衔接 4–6 岁”的题目。' : acc >= 50 ? '👍 很不错，把答错的题再讲一遍就更棒了。' : '🌱 慢慢来，低龄阶段最重要的是愿意想、愿意说，不追求分数。') + '</p>';
    } else {
      html += '<div class="qz-score">' + score + ' <span>/ ' + total + '</span></div>' +
        '<p>正确率 <b>' + acc + '%</b>　用时 <b>' + fmt(state.used) + '</b>' +
        (acc >= 85 ? '　🎉 很棒，可以挑战进阶题或模拟卷B。' : acc >= 60 ? '　👍 基础不错，重点看错题解析。' : '　💪 别急，先按科目小批量练习，错题二刷。') + '</p>';
    }
    html += '<div class="qz-nav"><button class="qz-btn qz-primary" id="qzAgain">再做一次</button>' +
      '<button class="qz-btn" id="qzBack">返回设置</button>' +
      '<button class="qz-btn" id="qzKey">📄 答案与解析速查（可打印）</button></div>' +
      '<div id="qzKeyBox"></div><h4>逐题回顾</h4>';
    state.list.forEach(function (q, i) {
      var ok = isCorrect(q, state.answers[i]);
      var yours = q.type === 'choice' ? (state.answers[i] == null ? '未作答' : q.opts[state.answers[i]]) : (state.answers[i] || '未作答');
      html += '<div class="qz-review"><b>' + (i + 1) + '. ' + (ok ? '✅' : '❌') + '</b> ' + esc(q.q) +
        '<br><span class="small">你的答案：' + esc(yours) + '　｜　正确答案：<b>' + esc(ansText(q)) + '</b></span>' +
        '<br><span class="small muted">解析：' + esc(q.exp) + '</span></div>';
    });
    html += '</div>';
    $('qzBody').innerHTML = html;
    $('qzAgain').addEventListener('click', start);
    $('qzBack').addEventListener('click', function () {
      state = null;
      $('qzBody').innerHTML = '<p class="small muted">已返回设置，可重新选择模式开始。</p>';
    });
    $('qzKey').addEventListener('click', function () {
      var box = $('qzKeyBox');
      if (box.innerHTML) { box.innerHTML = ''; return; }
      box.innerHTML = '<details open><summary>本套题目答案与解析</summary><ol class="small">' + state.list.map(function (q) {
        return '<li><b>' + esc(ansText(q)) + '</b>　' + esc(q.exp) + '</li>';
      }).join('') + '</ol></details>';
    });
  }

  /* ================= 入口绑定 ================= */
  function syncSpeakBtn() {
    var b = $('qzSpeakBtn'); if (!b) return;
    b.textContent = '🔊 自动读题：' + (autoSpeak ? '开' : '关');
    b.classList.toggle('qz-primary', autoSpeak);
  }
  if (!('speechSynthesis' in window)) {
    var sb = $('qzSpeakBtn'); if (sb) sb.style.display = 'none';
  }
  root.querySelectorAll('.qz-track').forEach(function (b) {
    b.addEventListener('click', function () { switchTrack(b.getAttribute('data-track')); });
  });
  $('qzStart').addEventListener('click', start);
  $('qzWrongCount').addEventListener('click', function () {
    if (!wrongIds().length) { alert(T().young ? '错题本还是空的：先做几题，答错的会自动收进来。' : '错题本是空的：先做练习，答错的题目会自动收集到这里。'); return; }
    $('qzMode').value = 'wrong'; start();
  });
  $('qzSpeakBtn').addEventListener('click', function () { autoSpeak = !autoSpeak; syncSpeakBtn(); if (!autoSpeak && 'speechSynthesis' in window) window.speechSynthesis.cancel(); });
  fillSelects();
  syncSpeakBtn();
})();
