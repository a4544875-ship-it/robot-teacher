/* Star Island Guardians 7.0 — two learning campaigns for Miracle Island. */
(function (global) {
  "use strict";
  var CHAPTERS = [
    {
      name: "風鈴森林",
      en: "WHISPERING WOODS",
      sky: 0xa9d9df,
      fog: 0xb1d8d9,
      grass: 0x71a486,
      rock: 0x66888a,
      leaf: 0x5d9f82,
      accent: 0xffd989,
      story: "風鈴森林的三座燈塔沉睡了。和狐狸米露一起找回星光，喚醒守護龍。",
    },
    {
      name: "雲端鐘城",
      en: "CLOCKWORK CLOUDS",
      sky: 0x9db4ef,
      fog: 0xb3c2ee,
      grass: 0x7f93cf,
      rock: 0x5f6aa3,
      leaf: 0x9a88dd,
      accent: 0xb7f1ff,
      story: "雲端鐘城的時間停住了。修好三座星核裝置，讓城市再次轉動。",
    },
    {
      name: "日曜古境",
      en: "SUNLIT SANCTUARY",
      sky: 0xf5b48a,
      fog: 0xf1c39f,
      grass: 0xd69a52,
      rock: 0xa96a4c,
      leaf: 0xb7a63c,
      accent: 0xffe3a2,
      story: "最後一束星光藏在日曜古境。完成守護者試煉，點亮整片星島！",
    },
  ];
  var NODES = [
    { x: -14, z: -5, name: "風語燈塔", mname: "水晶充能塔" },
    { x: 14, z: -6, name: "回音工坊", mname: "星核密碼鎖" },
    { x: -10, z: -22, name: "星紋神殿", mname: "數字橋神殿" },
    { x: 12, z: -22, name: "守護者之門", mname: "守護者之門" },
  ];
  function nodeName(n, g) {
    return g && g.id === "v5math" ? n.mname : n.name;
  }
  var STARS = [
      [-23, 0],
      [23, 2],
      [0, -13],
      [-23, -17],
      [23, -20],
    ],
    PONDS = [
      [-19, 13],
      [19, 13],
    ],
    SKINS = [
      { name: "蒼翼旅人", color: 0x57bcb0 },
      { name: "日光騎士", color: 0xe7b767 },
      { name: "紫晶行者", color: 0xa494d7 },
    ];
  /* v7 戰功星商店 */
  var CAPES = [
      { id: "gold", name: "星光金披風", color: 0xf2c14e, cost: 60 },
      { id: "sakura", name: "櫻花粉披風", color: 0xf08bb8, cost: 60 },
      { id: "night", name: "午夜藍披風", color: 0x3c5bb0, cost: 80 },
    ],
    TOWER_STYLES = [
      { id: "fire", name: "火焰塔", color: 0xff7a45, cost: 80 },
      { id: "rainbow", name: "彩虹塔", color: -1, cost: 100 },
    ],
    GARDEN_ITEMS = [
      { id: "sifox", name: "狐狸米露", img: "assets/fox.webp", cost: 80 },
      { id: "sidragon", name: "水晶守護龍", img: "assets/v4/boss-dragon.webp", cost: 120 },
    ],
    MONSTERS = [
      { name: "迷霧怪", merit: 1, note: "最常見，慢慢走向燈塔" },
      { name: "飛翼怪", merit: 3, note: "速度很快，要先打牠" },
      { name: "護甲怪", merit: 3, note: "很耐打，用冰霜塔讓牠變慢" },
      { name: "迷霧巨像", merit: 10, note: "最終波的大魔王" },
    ],
    WATER_RATE = 20,
    WATER_DAY_MAX = 3;
  function today() {
    var d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }
  function normSI(raw) {
    var si = raw && typeof raw === "object" ? JSON.parse(JSON.stringify(raw)) : {};
    si.m = Math.max(0, Math.floor(Number(si.m) || 0));
    si.tot = Math.max(si.m, Math.floor(Number(si.tot) || 0));
    if (!si.own || typeof si.own !== "object") si.own = {};
    if (!si.eq || typeof si.eq !== "object") si.eq = {};
    if (!si.wd || typeof si.wd !== "object") si.wd = { d: "", n: 0 };
    if (!Array.isArray(si.bk)) si.bk = [0, 0, 0, 0];
    while (si.bk.length < 4) si.bk.push(0);
    return si;
  }
  function validProfile(raw) {
    var p = { version: 1, unlocked: 1, stars: [0, 0, 0], collect: [0, 0, 0], skin: 0, run: null };
    if (!raw || typeof raw !== "object") return p;
    p.stars = p.stars.map(function (_, i) {
      return Math.max(0, Math.min(3, Number(raw.stars && raw.stars[i]) || 0));
    });
    p.collect = p.collect.map(function (_, i) {
      return Math.max(0, Math.min(31, Number(raw.collect && raw.collect[i]) | 0));
    });
    p.unlocked = 1 + (p.stars[0] > 0 ? 1 : 0) + (p.stars[0] > 0 && p.stars[1] > 0 ? 1 : 0);
    p.skin = Math.max(0, Math.min(p.unlocked - 1, Number(raw.skin) | 0));
    var r = raw.run;
    if (
      r &&
      Number.isInteger(r.chapter) &&
      r.chapter >= 0 &&
      r.chapter < p.unlocked &&
      Number.isFinite(r.seed) &&
      Number.isInteger(r.station) &&
      r.station >= 0 &&
      r.station <= 3 &&
      Number.isInteger(r.step) &&
      r.step >= 0 &&
      r.step < 2 &&
      Number.isFinite(r.bossHP) &&
      r.bossHP >= 0 &&
      r.bossHP <= 8 &&
      Number.isInteger(r.qNumber) &&
      r.qNumber >= 0 &&
      r.qNumber <= 10
    ) {
      p.run = r;
      r.correct = Math.max(0, Number(r.correct) || 0);
      r.wrong = Math.max(0, Number(r.wrong) || 0);
      r.first = Math.max(0, Number(r.first) || 0);
      r.energy = Math.max(0, Math.min(3, Number(r.energy) || 0));
      r.starMask = Math.max(0, Math.min(31, r.starMask | 0));
      r.x = Number.isFinite(r.x) ? r.x : 0;
      r.z = Number.isFinite(r.z) ? r.z : 18;
    }
    return p;
  }
  function makeRun(chapter, seed, grade, mask) {
    return {
      chapter: chapter,
      seed: seed,
      grade: grade,
      station: 0,
      step: 0,
      bossHP: 8,
      qNumber: 0,
      correct: 0,
      first: 0,
      wrong: 0,
      energy: 0,
      empowered: false,
      starMask: mask || 0,
      x: 0,
      z: 18,
      pending: null,
      seconds: 0,
    };
  }
  function starsFor(r) {
    var accuracy = r.first / Math.max(1, r.correct);
    return accuracy >= 0.9 ? 3 : accuracy >= 0.65 ? 2 : 1;
  }
  function clearLine(ax, az, bx, bz) {
    var n = Math.max(2, Math.ceil(Math.hypot(bx - ax, bz - az) / 0.5));
    for (var i = 1; i <= n; i++) {
      var t = i / n,
        x = ax + (bx - ax) * t,
        z = az + (bz - az) * t;
      if (
        !canWalk(x, z) ||
        PONDS.some(function (p) {
          return Math.hypot(x - p[0], z - p[1]) < 5.4;
        })
      )
        return false;
    }
    return true;
  }
  /* grid search around ponds; returns intermediate points (final target excluded) */
  function planRoute(sx, sz, tx, tz) {
    if (clearLine(sx, sz, tx, tz)) return [];
    var S = 1.5,
      N = Math.ceil(31 / S),
      idx = function (i, j) {
        return (i + N) * (2 * N + 1) + (j + N);
      },
      ok = function (i, j) {
        var x = i * S,
          z = j * S;
        return (
          canWalk(x, z) &&
          !PONDS.some(function (p) {
            return Math.hypot(x - p[0], z - p[1]) < 5.6;
          })
        );
      },
      si = Math.round(sx / S),
      sj = Math.round(sz / S),
      ti = Math.round(tx / S),
      tj = Math.round(tz / S),
      prev = {},
      q = [[si, sj]],
      seen = {};
    seen[idx(si, sj)] = 1;
    var found = false;
    for (var k = 0; k < q.length && !found; k++) {
      var c = q[k];
      for (var di = -1; di <= 1; di++)
        for (var dj = -1; dj <= 1; dj++) {
          if (!di && !dj) continue;
          var ni = c[0] + di,
            nj = c[1] + dj,
            id = idx(ni, nj);
          if (Math.abs(ni) > N || Math.abs(nj) > N || seen[id]) continue;
          if (!(ni === ti && nj === tj) && !ok(ni, nj)) continue;
          seen[id] = 1;
          prev[id] = c;
          q.push([ni, nj]);
          if (ni === ti && nj === tj) {
            found = true;
            break;
          }
        }
    }
    if (!found) return [];
    var path = [],
      cur = [ti, tj];
    while (cur && !(cur[0] === si && cur[1] === sj)) {
      path.unshift({ x: cur[0] * S, z: cur[1] * S });
      cur = prev[idx(cur[0], cur[1])];
    }
    var out = [],
      ax = sx,
      az = sz,
      i = 0;
    path.push({ x: tx, z: tz });
    var L = path.length;
    while (i < L) {
      if (clearLine(ax, az, tx, tz)) break;
      var j = L - 2;
      while (j > i && !clearLine(ax, az, path[j].x, path[j].z)) j--;
      out.push({ x: path[j].x, y: path[j].z });
      ax = path[j].x;
      az = path[j].z;
      i = j + 1;
    }
    return out;
  }
  function canWalk(x, z) {
    return (
      x * x + z * z < 30.5 * 30.5 &&
      !PONDS.some(function (p) {
        return Math.hypot(x - p[0], z - p[1]) < 4.8;
      })
    );
  }
  function mathExplanation(q) {
    var m = q.expression.match(/^(\d+)\s*([+−×÷])\s*(\d+)$/);
    if (m) {
      var a = +m[1],
        b = +m[3];
      if (m[2] === "+") return "把 " + a + " 和 " + b + " 合起來，就是 " + q.answer + "。";
      if (m[2] === "−") return "從 " + a + " 拿走 " + b + "，剩下 " + q.answer + "。";
      if (m[2] === "×") return b + " 組 " + a + "，合起來是 " + q.answer + "。";
      if (m[2] === "÷") return "把 " + a + " 平均分成 " + b + " 組，每組有 " + q.answer + "。";
    }
    return "先算括號，再算乘除，最後加減：" + q.expression + " = " + q.answer + "。";
  }
  global.StarIslandModels = { validProfile: validProfile, makeRun: makeRun, starsFor: starsFor, canWalk: canWalk, chapters: CHAPTERS, nodes: NODES };
  global.StarIslandFactory = function (C) {
    var T,
      chosen = { v5word: 0, v5math: 0 },
      resume = { v5word: true, v5math: true },
      BASE = "assets/v5/";
    function profileKey(g) {
      return "rt-star-island-5-" + C.who() + "-" + g.id + "-" + C.grade();
    }
    function profile(g) {
      return validProfile(C.ls.get(profileKey(g), null));
    }
    function put(g, p) {
      C.ls.set(profileKey(g), p);
    }
    function E(s) {
      return C.esc(s);
    }
    function siData() {
      var k = C.kidData ? C.kidData() : null;
      return normSI(k && k.si);
    }
    function siMut(fn) {
      if (!C.mutKid) return;
      C.mutKid(function (k) {
        var si = normSI(k.si);
        fn(si, k);
        k.si = si;
      });
    }
    function capeOf(si) {
      var c = CAPES.filter(function (x) {
        return x.id === si.eq.cape && si.own["cape_" + x.id];
      })[0];
      return c ? { color: c.color } : null;
    }
    function towerStyleOf(si) {
      return TOWER_STYLES.filter(function (x) {
        return x.id === si.eq.tower && si.own["tower_" + x.id];
      })[0] || null;
    }
    var games = [
      {
        id: "v5word",
        zh: "星島守護者：風語遠征",
        en: "STAR ISLAND · WORD ODYSSEY",
        cls: "feat",
        ico: "🪽",
        tag: "大型冒險",
        d: "探索三座立體星島，答對單字就發射星光砲！打倒迷霧怪賺戰功星，換披風、塔外觀和花園裝飾。",
        how: "走到燈塔連續答題充能 → 守護戰時答對下方題目發射星光砲（也可以按射擊自己打怪）→ 打倒怪物得戰功星。搖桿或點地面移動；電腦可用 WASD、E 互動、J 射擊、K 星環、1～4 答題。",
      },
      {
        id: "v5math",
        sub: "math",
        zh: "星島守護者：水晶謎城",
        en: "STAR ISLAND · CRYSTAL QUEST",
        cls: "feat",
        ico: "🔮",
        tag: "大型冒險",
        d: "解開水晶算式，答對就發射星光砲！守住燈塔賺戰功星，換披風、塔外觀和花園裝飾。",
        how: "依目前年級與課本設定出題。探索、解謎、修復三座裝置，再挑戰守護龍；不倒數，答錯可看提示再試。",
      },
    ];
    games.forEach(function (g) {
      C.games.push(g);
    });
    C.mathIds.v5math = 1;
    function material(color, metal) {
      return new T.MeshStandardMaterial({ color: color, roughness: metal ? 0.4 : 0.82, metalness: metal ? 0.35 : 0 });
    }
    function mesh(parent, geo, mat, x, y, z) {
      var m = new T.Mesh(geo, mat);
      m.position.set(x || 0, y || 0, z || 0);
      parent.add(m);
      return m;
    }
    function box(parent, x, y, z, w, h, d, col) {
      return mesh(parent, new T.BoxGeometry(w, h, d), material(col), x, y, z);
    }
    function ball(parent, x, y, z, r, col) {
      return mesh(parent, new T.SphereGeometry(r, 16, 12), material(col), x, y, z);
    }
    function cyl(parent, x, y, z, r, h, col, r2, n) {
      return mesh(parent, new T.CylinderGeometry(r, r2 === undefined ? r : r2, h, n || 12), material(col), x, y, z);
    }
    function linePath(parent, ax, az, bx, bz, w, col) {
      var len = Math.hypot(bx - ax, bz - az),
        m = box(parent, (ax + bx) / 2, 0.015, (az + bz) / 2, w, 0.045, len, col);
      m.rotation.y = Math.atan2(bx - ax, bz - az);
      return m;
    }
    function hero(parent, skin) {
      var cape = typeof skin === "object" && skin ? skin.color : null;
      var g = new T.Group(),
        color = cape !== null ? cape : SKINS[skin | 0].color,
        legs = [],
        arms = [];
      parent.add(g);
      cyl(g, 0, 1.05, 0, 0.46, 0.85, color, 0.52, 12);
      var head = ball(g, 0, 1.85, 0, 0.6, 0xf1e8c9);
      head.scale.set(1, 0.93, 0.87);
      var visor = ball(g, 0, 1.88, -0.43, 0.45, 0x244756);
      visor.scale.set(1, 0.55, 0.4);
      [-1, 1].forEach(function (s) {
        var eye = ball(g, s * 0.17, 1.9, -0.61, 0.085, 0xa8f6de);
        eye.material.emissive.setHex(0x3ba58e);
        var arm = new T.Group();
        arm.position.set(s * 0.57, 1.3, 0);
        cyl(arm, 0, -0.28, 0, 0.12, 0.55, color, 0.15);
        ball(arm, 0, -0.56, 0, 0.15, 0xe6d7ad);
        g.add(arm);
        arms.push(arm);
        var leg = new T.Group();
        leg.position.set(s * 0.23, 0.64, 0);
        cyl(leg, 0, -0.23, 0, 0.15, 0.46, 0x4d6771);
        box(leg, 0, -0.47, -0.1, 0.35, 0.23, 0.53, 0xddd5bb);
        g.add(leg);
        legs.push(leg);
      });
      var hood = ball(g, 0, 2.08, 0.12, 0.57, color);
      hood.scale.set(1, 0.62, 0.9);
      box(g, 0, 1.2, 0.53, 0.65, 0.7, 0.3, 0x967955);
      box(g, 0, 1.32, 0.71, 0.5, 0.12, 0.05, 0xd7bf88);
      var cape = mesh(g, new T.ConeGeometry(0.52, 1.02, 7, 1, true), material(color), 0, 1, 0.28);
      cape.rotation.x = 0.17;
      var badge = ball(g, 0, 1.3, -0.49, 0.12, 0xffdb8a);
      badge.scale.z = 0.3;
      return { g: g, legs: legs, arms: arms, cape: cape };
    }
    function fox(parent) {
      var g = new T.Group();
      parent.add(g);
      var body = ball(g, 0, 0.5, 0, 0.42, 0xd9a36d);
      body.scale.set(0.75, 0.9, 1.2);
      ball(g, 0, 0.85, -0.34, 0.35, 0xe6b176);
      var muzzle = ball(g, 0, 0.76, -0.62, 0.2, 0xffedc9);
      muzzle.scale.set(0.8, 0.7, 1.2);
      ball(g, 0, 0.79, -0.8, 0.075, 0x314b54);
      [-1, 1].forEach(function (s) {
        var ear = mesh(g, new T.ConeGeometry(0.15, 0.46, 4), material(0xcc9265), s * 0.24, 1.18, -0.3);
        ear.rotation.z = -s * 0.2;
        ball(g, s * 0.17, 0.92, -0.62, 0.045, 0x344650);
        [-0.25, 0.25].forEach(function (z) {
          cyl(g, s * 0.22, 0.18, z, 0.085, 0.28, 0x79614f);
        });
      });
      var tail = ball(g, 0, 0.7, 0.57, 0.28, 0xd39a69);
      tail.scale.set(0.8, 0.8, 1.9);
      tail.rotation.x = -0.5;
      ball(g, 0, 0.95, 1.02, 0.21, 0xffedcc);
      return g;
    }
    function world(a, chapter, R, skin) {
      T = C.three();
      var theme = CHAPTERS[chapter],
        scene = a.sc;
      scene.background = new T.Color(theme.sky);
      scene.fog = new T.Fog(theme.fog, 70, 170);
      a.cam.far = 180;
      a.rd.setPixelRatio(Math.min(global.devicePixelRatio || 1, 1.5));
      scene.add(new T.HemisphereLight(0xeaf6ff, 0x4f6b58, 0.6));
      var sun = new T.DirectionalLight(0xffefd0, 0.95);
      sun.position.set(-15, 34, 20);
      scene.add(sun);
      var ground = cyl(scene, 0, -1.2, 0, 31, 2.4, theme.grass, 29, 64);
      cyl(scene, 0, -5, 0, 28.8, 7, theme.rock, 16, 16);
      cyl(scene, 0, -10, 0, 16, 4, theme.rock, 3, 12);
      PONDS.forEach(function (p) {
        var water = cyl(scene, p[0], 0.04, p[1], 4.5, 0.09, 0x77bac3, 4.5, 40);
        water.material.roughness = 0.24;
        water.material.metalness = 0.25;
        for (var i = 0; i < 8; i++) {
          var an = (i * Math.PI) / 4;
          var rock = ball(scene, p[0] + Math.cos(an) * 4.8, 0.25, p[1] + Math.sin(an) * 4.8, 0.65, theme.rock);
          rock.scale.set(1, 0.6, 0.7);
        }
      });
      linePath(scene, 0, 20, 0, 3, 3, 0xdcd3b0);
      NODES.forEach(function (n) {
        linePath(scene, 0, 3, n.x, n.z, 2.4, chapter === 1 ? 0xc9cfdd : 0xd5c29c);
      });
      var trunkGeo = new T.CylinderGeometry(0.18, 0.36, 2.7, 6),
        canopyGeo = chapter === 1 ? new T.OctahedronGeometry(1.6, 0) : new T.IcosahedronGeometry(1.55, 1),
        trunks = new T.InstancedMesh(trunkGeo, material(chapter === 2 ? 0xa47c57 : 0x8a7860), 62),
        leaves = new T.InstancedMesh(canopyGeo, material(theme.leaf), 62),
        dummy = new T.Object3D();
      for (var i = 0; i < 62; i++) {
        var ang = R() * Math.PI * 2,
          r = 24 + R() * 5,
          x = Math.cos(ang) * r,
          z = Math.sin(ang) * r;
        if (
          NODES.some(function (n) {
            return Math.hypot(x - n.x, z - n.z) < 4;
          }) ||
          PONDS.some(function (p) {
            return Math.hypot(x - p[0], z - p[1]) < 6;
          })
        ) {
          x *= 0.76;
          z *= 0.76;
        }
        dummy.position.set(x, 1.25, z);
        dummy.scale.set(1, 1, 1);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        trunks.setMatrixAt(i, dummy.matrix);
        dummy.position.y = 3.2;
        dummy.scale.set(1 + R() * 0.3, 1.1 + R() * 0.7, 1 + R() * 0.3);
        dummy.rotation.y = R() * 6;
        dummy.updateMatrix();
        leaves.setMatrixAt(i, dummy.matrix);
      }
      scene.add(trunks);
      scene.add(leaves);
      var grass = new T.InstancedMesh(new T.ConeGeometry(0.16, 0.7, 3), material(chapter === 2 ? 0xeee0a2 : 0xb2cf9d), 130);
      for (i = 0; i < 130; i++) {
        ang = R() * Math.PI * 2;
        r = 5 + R() * 24;
        x = Math.cos(ang) * r;
        z = Math.sin(ang) * r;
        dummy.position.set(x, 0.25, z);
        dummy.scale.set(1, 1, 1);
        dummy.rotation.set(0, R() * 6, 0.15);
        dummy.updateMatrix();
        grass.setMatrixAt(i, dummy.matrix);
      }
      scene.add(grass);
      var clouds = new T.InstancedMesh(
        new T.SphereGeometry(1, 10, 8),
        new T.MeshStandardMaterial({ color: 0xf2f7ed, roughness: 1, transparent: true, opacity: 0.68, depthWrite: false }),
        36,
      );
      for (i = 0; i < 36; i++) {
        ang = (i * Math.PI * 2) / 36;
        r = 39 + R() * 15;
        dummy.position.set(Math.cos(ang) * r, -5 - R() * 6, Math.sin(ang) * r);
        dummy.scale.set(5 + R() * 7, 1.2 + R() * 2, 4 + R() * 5);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        clouds.setMatrixAt(i, dummy.matrix);
      }
      scene.add(clouds);
      var mechanism = new T.Group();
      mechanism.position.set(0, 0, -5);
      scene.add(mechanism);
      if (chapter === 1) {
        cyl(mechanism, 0, 1.4, 0, 2.2, 2.8, 0xe2e3e1, 2.6, 12);
        var clock = mesh(mechanism, new T.TorusGeometry(2.1, 0.18, 8, 40), material(0xc6b281), 0, 4.4, 0);
        for (var tick = 0; tick < 12; tick++) {
          var an = (tick * Math.PI) / 6;
          var tooth = box(mechanism, Math.sin(an) * 2.1, 4.4 + Math.cos(an) * 2.1, 0, 0.25, 0.4, 0.3, 0xc6b281);
          tooth.rotation.z = -an;
        }
        box(mechanism, 0, 5.05, 0.2, 0.12, 1.4, 0.12, 0x648b99);
        box(mechanism, 0.5, 4.4, 0.2, 1, 0.12, 0.12, 0x648b99);
      } else if (chapter === 2) {
        cyl(mechanism, 0, 3, 0, 0.7, 6, 0xdacbb4, 1.4, 10);
        var wind = mesh(mechanism, new T.TorusGeometry(2.2, 0.07, 6, 32), material(0xf3d5a1), 0, 5.4, 0.7);
        for (var blade = 0; blade < 4; blade++) {
          var vane = box(mechanism, 0, 5.4, 0.7, 0.28, 4.6, 0.14, 0xf0d8aa);
          vane.rotation.z = (blade * Math.PI) / 4;
        }
      } else {
        cyl(mechanism, 0, 3, 0, 0.8, 6, 0x8f8160, 1.4, 10);
        for (var branch = 0; branch < 5; branch++) {
          var an = branch * 1.25;
          var crown = ball(mechanism, Math.sin(an) * 2.4, 5.5 + (branch % 2), Math.cos(an) * 2.4, 2.4, 0x81b392);
          crown.scale.y = 0.65;
        }
      }
      var towers = [];
      for (i = 0; i < 6; i++) {
        ang = (i * Math.PI) / 3;
        r = 61 + R() * 10;
        x = Math.cos(ang) * r;
        z = Math.sin(ang) * r;
        cyl(scene, x, -4, z, 7, 6, theme.rock, 3, 8);
        cyl(scene, x, 0.3, z, 7, 2, theme.grass, 6, 8);
        cyl(scene, x, 4, z, 2.1, 6, 0xe8dfc6, 2.4, 8);
        var roof = mesh(scene, new T.ConeGeometry(3, 3.8, 8), material(theme.leaf), x, 8.7, z);
        towers.push(roof);
      }
      var waterfalls = [];
      [-1, 1].forEach(function (s) {
        var fall = box(scene, s * 27, -5, 8, 2.4, 11, 0.3, 0x9fdbdf);
        fall.material.transparent = true;
        fall.material.opacity = 0.57;
        waterfalls.push(fall);
      });
      var shrines = NODES.map(function (n, j) {
        var g = new T.Group();
        g.position.set(n.x, 0, n.z);
        scene.add(g);
        cyl(g, 0, 0.15, 0, 3, 0.3, 0xe4d9bd, 3.2, 24);
        cyl(g, 0, 0.45, 0, 2.4, 0.3, 0xc3bca8, 2.7, 24);
        cyl(g, 0, 0.8, 0, 1.3, 0.45, 0xe9dfc8, 1.6, 12);
        [-1, 1].forEach(function (s) {
          cyl(g, s * 2, 2.1, 0.5, 0.35, 3.6, 0xe7ddc8, 0.5, 8);
          ball(g, s * 2, 4, 0.5, 0.46, theme.accent);
        });
        var arch = mesh(g, new T.TorusGeometry(2, 0.15, 6, 28, Math.PI), material(0xefd9aa), 0, 3.8, 0.5);
        var crystal = mesh(g, new T.OctahedronGeometry(0.7, 0), material(0x8aa7b5, true), 0, 2.1, 0);
        var halo = mesh(g, new T.TorusGeometry(1.1, 0.045, 6, 36), new T.MeshBasicMaterial({ color: theme.accent }), 0, 1.7, 0);
        halo.rotation.x = Math.PI / 2;
        var beam = cyl(g, 0, 6, 0, 0.3, 10, theme.accent, 0.8, 12);
        beam.material.transparent = true;
        beam.material.opacity = 0.09;
        beam.material.depthWrite = false;
        return { g: g, crystal: crystal, halo: halo, beam: beam };
      });
      // Resting guardian is a transparent high-resolution sprite in the 3D scene.
      var loader = new T.TextureLoader(),
        texture = loader.load("assets/v4/boss-dragon.webp", function (t) {
          if (!C.active(a)) t.dispose();
        });
      var guardian = new T.Sprite(new T.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
      guardian.scale.set(9, 9, 1);
      guardian.position.set(12, 6.8, -24);
      scene.add(guardian);
      var heroModel = hero(scene, skin),
        companion = fox(scene);
      var shadow = mesh(
        scene,
        new T.CircleGeometry(0.85, 24),
        new T.MeshBasicMaterial({ color: 0x1f494a, transparent: true, opacity: 0.22, depthWrite: false }),
        0,
        0.08,
        0,
      );
      shadow.rotation.x = -Math.PI / 2;
      var jewels = STARS.map(function (p) {
        var gem = mesh(
          scene,
          new T.OctahedronGeometry(0.5, 0),
          new T.MeshStandardMaterial({ color: 0xffdb8a, emissive: 0x694314, roughness: 0.35, metalness: 0.35 }),
          p[0],
          1.1,
          p[1],
        );
        var ring = mesh(scene, new T.TorusGeometry(0.8, 0.025, 4, 24), new T.MeshBasicMaterial({ color: 0xffe7a8 }), p[0], 0.25, p[1]);
        ring.rotation.x = -Math.PI / 2;
        return { gem: gem, ring: ring };
      });
      var dustGeo = new T.BufferGeometry(),
        dust = [];
      for (i = 0; i < 100; i++) dust.push((R() - 0.5) * 60, 0.7 + R() * 5, (R() - 0.5) * 60);
      dustGeo.setAttribute("position", new T.Float32BufferAttribute(dust, 3));
      var fireflies = new T.Points(dustGeo, new T.PointsMaterial({ color: theme.accent, size: 0.1, transparent: true, opacity: 0.7 }));
      scene.add(fireflies);
      var beacon = mesh(scene, new T.TorusGeometry(2.9, 0.08, 6, 48), new T.MeshBasicMaterial({ color: 0xffe2a0 }), 0, 0.12, 0);
      beacon.rotation.x = -Math.PI / 2;
      return {
        hero: heroModel,
        fox: companion,
        shadow: shadow,
        shrines: shrines,
        jewels: jewels,
        guardian: guardian,
        clouds: clouds,
        falls: waterfalls,
        fireflies: fireflies,
        beacon: beacon,
        theme: theme,
        ground: ground,
      };
    }
    function enrichWorld(a, W, R) {
      var scene = a.sc,
        hero = W.hero.g,
        gold = 0xe4c791,
        dark = 0x314c60,
        cream = 0xf1e6cf;
      // Articulated armour, luminous chest core and a staff attached to the animated hand.
      cyl(hero, 0, 1.02, 0, 0.54, 0.16, dark, 0.54, 20);
      [-1, 1].forEach(function (s) {
        var pauldron = ball(hero, s * 0.57, 1.43, 0, 0.25, gold);
        pauldron.scale.set(1.15, 0.6, 1);
        box(hero, s * 0.36, 1.22, -0.42, 0.16, 0.42, 0.1, gold);
        var ear = cyl(hero, s * 0.57, 1.88, 0, 0.18, 0.17, dark, 0.18, 16);
        ear.rotation.z = Math.PI / 2;
        var rivet = ball(hero, s * 0.58, 1.88, -0.1, 0.08, 0xa9efee);
        rivet.material.emissive.setHex(0x3f9aab);
        box(hero, s * 0.23, 0.27, -0.25, 0.23, 0.08, 0.18, gold);
      });
      var core = mesh(
        hero,
        new T.OctahedronGeometry(0.16),
        new T.MeshStandardMaterial({ color: 0xaff7ee, emissive: 0x499eaa, metalness: 0.6, roughness: 0.2 }),
        0,
        1.3,
        -0.55,
      );
      var staff = new T.Group();
      W.hero.arms[1].add(staff);
      staff.position.set(0, -0.5, -0.24);
      cyl(staff, 0, 0.2, 0, 0.055, 1.8, dark, 0.07, 12);
      [-0.5, 0.75].forEach(function (y) {
        cyl(staff, 0, y, 0, 0.09, 0.12, gold, 0.09, 12);
      });
      mesh(staff, new T.TorusGeometry(0.25, 0.055, 8, 24), material(gold), 0, 1.1, 0);
      mesh(staff, new T.OctahedronGeometry(0.18), new T.MeshStandardMaterial({ color: 0xb5ffff, emissive: 0x4195a5, roughness: 0.2 }), 0, 1.1, 0);
      hero.scale.setScalar(1.18);
      // Cut stone roads, inlaid tiles and flowering meadow patches use instancing.
      var tiles = new T.InstancedMesh(new T.BoxGeometry(0.78, 0.12, 0.9), material(0xe6dac2), 160),
        d = new T.Object3D();
      for (var i = 0; i < 160; i++) {
        var node = NODES[Math.floor(i / 40)],
          t = (i % 40) / 40;
        d.position.set(node.x * t + (i % 2 ? -0.5 : 0.5), 0.08, 3 + (node.z - 3) * t);
        d.rotation.y = Math.atan2(node.x, node.z - 3);
        d.scale.set(1, 1, 1);
        d.updateMatrix();
        tiles.setMatrixAt(i, d.matrix);
      }
      scene.add(tiles);
      var petals = new T.InstancedMesh(new T.IcosahedronGeometry(0.13, 1), material(0xf3d6cf), 200);
      for (i = 0; i < 200; i++) {
        var angle = R() * Math.PI * 2,
          rad = 18 + R() * 11;
        d.position.set(Math.cos(angle) * rad, 0.4 + R() * 0.2, Math.sin(angle) * rad);
        d.scale.set(1, 0.6, 1);
        d.updateMatrix();
        petals.setMatrixAt(i, d.matrix);
      }
      scene.add(petals);
      // Towers, battlements, banners and lanterns give every objective a recognisable silhouette.
      W.shrines.forEach(function (s, index) {
        [-1, 1].forEach(function (sign) {
          var x = sign * 3.2;
          cyl(s.g, x, 1.6, 1.4, 0.7, 3.2, cream, 0.9, 12);
          cyl(s.g, x, 3.3, 1.4, 0.85, 0.28, gold, 0.85, 12);
          for (var j = 0; j < 6; j++) {
            var angle = (j * Math.PI) / 3;
            box(s.g, x + Math.sin(angle) * 0.62, 3.58, 1.4 + Math.cos(angle) * 0.62, 0.32, 0.4, 0.32, cream);
          }
          var flag = box(s.g, x, 2.4, 0.65, 0.65, 0.95, 0.08, index === 1 ? 0x879ac2 : 0x4c8d91);
          box(s.g, x, 2.4, 0.59, 0.08, 0.8, 0.03, gold);
          cyl(s.g, sign * 2.5, 0.7, -1.8, 0.22, 1.4, dark, 0.3, 8);
          var lamp = ball(s.g, sign * 2.5, 1.5, -1.8, 0.23, 0xffe3a5);
          lamp.material.emissive.setHex(0xc99541);
        });
        for (var k = 0; k < 8; k++) {
          var ang = (k * Math.PI) / 4;
          var rune = box(s.g, Math.sin(ang) * 1.8, 0.62, Math.cos(ang) * 1.8, 0.13, 0.03, 0.4, gold);
          rune.rotation.y = ang;
        }
      });
      for (i = 0; i < 10; i++) {
        var an = i * 0.2 + 2.2,
          x = Math.sin(an) * 29,
          z = Math.cos(an) * 29;
        var wall = box(scene, x, 1.2, z, 4.5, 2.4, 0.65, 0xc0c6bc);
        wall.rotation.y = an;
        for (var j = -1; j <= 1; j++) {
          var top = box(scene, x + Math.cos(an) * j * 1.4, 2.65, z - Math.sin(an) * j * 1.4, 0.7, 0.5, 0.8, cream);
          top.rotation.y = an;
        }
      }
      // Ground shadows remain inexpensive on tablets; real shadow maps are deliberately optional.
      var shadows = new T.InstancedMesh(
        new T.CircleGeometry(0.9, 20),
        new T.MeshBasicMaterial({ color: 0x264750, transparent: true, opacity: 0.13, depthWrite: false }),
        12,
      );
      for (i = 0; i < 12; i++) {
        var n = NODES[i % 4];
        d.position.set(n.x + (i < 4 ? 0 : i < 8 ? -3.2 : 3.2), 0.1, n.z + 1);
        d.rotation.set(-Math.PI / 2, 0, 0);
        d.scale.set(i < 4 ? 3 : 1, 1.5, 1);
        d.updateMatrix();
        shadows.setMatrixAt(i, d.matrix);
      }
      scene.add(shadows);
    }

    /* Combat is deterministic in progression; no points are awarded for repeated waves. */
    function defenseSystem(a, W, h, r, ch, ui, notice, save, won, burst, hooks) {
      hooks = hooks || {};
      var enemies = [],
        towers = [],
        shots = [],
        rings = [],
        cool = 0,
        novaCD = 0,
        spawnCD = 1,
        paint = 0,
        dead = false,
        initialized = false;
      var n = NODES[r.station],
        pads = [
          { x: n.x - 4, z: n.z + 3 },
          { x: n.x + 4, z: n.z + 3 },
        ],
        total = 6 + r.station + ch;
      var panel = document.createElement("section");
      panel.className = "si-defense";
      panel.hidden = true;
      panel.innerHTML =
        '<div class="si-defense-heading"><small>守護戰 · DEFEND THE LIGHT</small><b id="sdTitle"></b></div><div class="si-core-track"><i id="sdHP"></i></div><p id="sdStatus" role="status"></p><p id="sdMerit" class="si-merit-line"></p><div class="si-build"><button id="sdBolt">① 星弩塔 <small>建造 2 星晶</small></button><button id="sdFrost">② 冰霜塔 <small>建造 3 星晶</small></button><button id="sdRepair">修復 <small>2 星晶 · +35 護盾</small></button></div><button id="sdRetry" hidden>重新守護本波</button>';
      a.el.appendChild(panel);
      var actions = document.createElement("div");
      actions.className = "si-combat-actions";
      actions.hidden = true;
      actions.innerHTML = '<button id="sdFire">✧<small>星光射擊 J</small></button><button id="sdNova">✺<small>星環衝擊 K</small></button>';
      a.el.appendChild(actions);
      var $ = function (s) {
        return a.el.querySelector(s);
      };
      function glow(col) {
        return new T.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.45, metalness: 0.5, roughness: 0.25 });
      }
      function ring(pos, col, size) {
        var m = mesh(
          a.sc,
          new T.TorusGeometry(size || 0.5, 0.07, 6, 40),
          new T.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.8, depthWrite: false }),
          pos.x,
          0.2,
          pos.z,
        );
        m.rotation.x = Math.PI / 2;
        rings.push({ m: m, t: 0.7 });
      }
      function remove(obj) {
        a.sc.remove(obj);
        C.disposeObject(obj);
      }
      function clear() {
        enemies.forEach(function (e) {
          remove(e.g);
        });
        towers.forEach(function (t) {
          remove(t.g);
        });
        shots.forEach(function (s) {
          remove(s.m);
        });
        rings.forEach(function (s) {
          remove(s.m);
        });
        enemies = [];
        towers = [];
        shots = [];
        rings = [];
      }
      function enemyModel(type) {
        var g = new T.Group(),
          col = [0x7c90cc, 0x67b9a5, 0x87799f, 0x9879ba][type],
          body = ball(g, 0, 0.85, 0, type === 3 ? 1.1 : 0.65, col);
        body.scale.set(1, 0.9, 1.1);
        var face = ball(g, 0, 0.95, 0.52, type === 3 ? 0.65 : 0.43, 0x263950);
        face.scale.z = 0.3;
        [-1, 1].forEach(function (s) {
          ball(g, s * 0.2, 1, 0.65, 0.09, 0xffdca0);
          var ear = mesh(g, new T.ConeGeometry(0.2, 0.65, 5), glow(0xb4e9ee), s * 0.4, 1.55, 0);
          ear.rotation.z = -s * 0.35;
          var foot = ball(g, s * 0.45, 0.2, 0.2, 0.25, 0x41496c);
          foot.scale.z = 1.4;
        });
        if (type >= 2) {
          for (var i = 0; i < 5; i++) {
            var b = box(g, Math.sin(i * 1.25) * 0.64, 1.2, Math.cos(i * 1.25) * 0.64, 0.38, 0.36, 0.4, 0xc5c0d6);
            b.rotation.y = i * 1.25;
          }
          cyl(g, 0, 1.48, 0, 0.4, 0.14, 0xe5c991, 0.4, 8);
        }
        if (type === 1) {
          [-1, 1].forEach(function (s) {
            var wing = mesh(g, new T.ConeGeometry(0.5, 1, 3), material(0xb4ddce), s * 0.85, 1, 0);
            wing.rotation.z = s * 1.1;
            wing.scale.z = 0.15;
          });
        }
        if (type === 3) {
          g.scale.setScalar(1.65);
          var crystal = mesh(g, new T.OctahedronGeometry(0.42), glow(0xffb4b9), 0, 1.9, 0);
        }
        var back = box(g, 0, 2.1, 0, 1.35, 0.12, 0.08, 0x273c50),
          bar = box(g, 0, 2.11, -0.05, 1.3, 0.08, 0.09, 0xffbb8a);
        g.userData.bar = bar;
        a.sc.add(g);
        return g;
      }
      function makeEnemy(index, saved) {
        var type = index === total - 1 && r.station === 3 ? 3 : index % 3,
          max = [3, 2, 6, 25][type] + ch,
          g = enemyModel(type),
          ang = ((index % 3) - 1) * 0.7 + Math.PI,
          rad = 12 + (index % 2) * 2;
        var x = n.x + Math.sin(ang) * rad,
          z = n.z + Math.cos(ang) * rad;
        /* spawn inside the island, facing the shrine */ if (!canWalk(x, z)) {
          x = n.x + (index % 2 ? 10 : -10);
          z = n.z + 10;
        }
        var state = saved || { index: index, x: x, z: z, hp: max };
        g.position.set(state.x, 0, state.z);
        g.scale.multiplyScalar(type === 3 ? 1.25 : 1.4);
        var e = { g: g, type: type, max: max, state: state, slow: 0, attack: 1.8, flash: 0 };
        enemies.push(e);
        ring(g.position, 0xceafff, 0.6);
        return e;
      }
      function towerModel(slot, kind) {
        var p = pads[slot],
          g = new T.Group();
        g.position.set(p.x, 0, p.z);
        a.sc.add(g);
        cyl(g, 0, 0.2, 0, 1.1, 0.4, 0xe6d8b5, 1.25, 10);
        cyl(g, 0, 1.1, 0, 0.55, 1.5, 0x556f83, 0.75, 8);
        [-1, 1].forEach(function (s) {
          box(g, s * 0.6, 1.3, 0, 0.2, 1.2, 0.5, 0xdac99f);
        });
        var top = new T.Group();
        g.add(top);
        top.position.y = 2;
        var style = hooks.towerStyle ? hooks.towerStyle() : null,
          gem = mesh(top, new T.OctahedronGeometry(0.52), glow(style && style.color > 0 ? style.color : kind === 1 ? 0x9ceafa : 0xffdb89), 0, 0.35, 0);
        var orbit = mesh(top, new T.TorusGeometry(0.8, 0.07, 6, 24), material(0xe5ce95), 0, 0.35, 0);
        orbit.rotation.x = Math.PI / 2;
        if (kind === 0) {
          box(top, 0, 0.3, -0.5, 1.6, 0.16, 0.22, 0xd2bd87);
          cyl(top, 0, 0.2, 0, 0.23, 0.6, 0x405a70);
        }
        return { g: g, top: top, kind: kind, cd: 0.3, gem: gem, rainbow: !!(style && style.color < 0) };
      }
      function initialize() {
        clear();
        n = NODES[r.station];
        pads = [
          { x: n.x - 4, z: n.z + 3 },
          { x: n.x + 4, z: n.z + 3 },
        ];
        total = 6 + r.station + ch;
        var d = r.defense;
        if (!d || typeof d !== "object") return;
        d.hp = Number.isFinite(d.hp) ? Math.max(0, Math.min(100, d.hp)) : 100;
        d.money = Number.isFinite(d.money) ? Math.max(0, Math.min(100, d.money)) : 4;
        d.spawned = Math.max(0, Math.min(total, d.spawned | 0));
        d.killed = Math.max(0, Math.min(total, d.killed | 0));
        d.towers = Array.isArray(d.towers) ? d.towers.slice(0, 2) : [-1, -1];
        while (d.towers.length < 2) d.towers.push(-1);
        d.towers.forEach(function (k, i) {
          if (k === 0 || k === 1) towers[i] = towerModel(i, k);
          else d.towers[i] = -1;
        });
        var saved = Array.isArray(d.enemies) ? d.enemies : [];
        saved.forEach(function (e) {
          if (
            e &&
            Number.isInteger(e.index) &&
            e.index >= 0 &&
            e.index < d.spawned &&
            Number.isFinite(e.x) &&
            Number.isFinite(e.z) &&
            Number.isFinite(e.hp) &&
            e.hp > 0
          )
            makeEnemy(e.index, e);
        });
        d.enemies = enemies.map(function (e) {
          return e.state;
        });
        /* repair older/incomplete checkpoints */ d.spawned = d.killed + enemies.length;
        dead = d.hp <= 0;
        initialized = true;
        spawnCD = 1.8;
        panel.hidden = actions.hidden = false;
        paintUI();
      }
      function start() {
        r.defense = { hp: 100, money: 4 + r.energy, spawned: 0, killed: 0, towers: [-1, -1], enemies: [], merit: 0 };
        initialize();
        notice("迷霧怪來了！答對下方題目就會發射星光砲，也可以按射擊自己打怪！");
        save();
      }
      function paintUI() {
        var d = r.defense;
        if (!d) return;
        $("#siObjective").textContent = dead ? "重新集結，守住星光" : "守護戰：" + n.name;
        $("#siMissionSub").textContent = "建塔、射擊、修復 · 擊退 " + d.killed + "/" + total;
        $("#sdTitle").textContent = dead ? "燈塔需要你的幫忙" : r.station === 3 ? "最終戰：擊退迷霧巨像" : "守住 " + n.name;
        $("#sdHP").style.width = d.hp + "%";
        $("#sdStatus").textContent = "護盾 " + Math.ceil(d.hp) + " / 100　✦ " + d.money + " 星晶　擊退 " + d.killed + " / " + total;
        $("#sdMerit").textContent = "★ 本波戰功 +" + (d.merit | 0);
        $("#sdRetry").hidden = !dead;
        $("#sdRepair").disabled = dead || d.money < 2 || d.hp >= 100;
        $("#sdBolt").disabled = dead || d.money < 2 || d.towers[0] !== -1;
        $("#sdFrost").disabled = dead || d.money < 3 || d.towers[1] !== -1;
        $("#sdBolt small").textContent = d.towers[0] !== -1 ? "已建造 · 自動射擊" : "建造 2 星晶";
        $("#sdFrost small").textContent = d.towers[1] !== -1 ? "已建造 · 緩速敵人" : "建造 3 星晶";
        $("#sdFire").disabled = dead;
        $("#sdNova").disabled = dead || novaCD > 0;
        $("#sdNova small").textContent = novaCD > 0 ? "冷卻 " + Math.ceil(novaCD) + "s" : "星環衝擊 K";
      }
      function build(slot, kind, cost) {
        var d = r.defense;
        if (!d || dead || !ui() || d.money < cost || d.towers[slot] !== -1) return;
        d.money -= cost;
        d.towers[slot] = kind;
        towers[slot] = towerModel(slot, kind);
        ring(towers[slot].g.position, 0xb9f4ea, 1);
        C.sfx("ok");
        save();
        paintUI();
      }
      $("#sdBolt").onclick = function () {
        build(0, 0, 2);
      };
      $("#sdFrost").onclick = function () {
        build(1, 1, 3);
      };
      $("#sdRepair").onclick = function () {
        var d = r.defense;
        if (!d || dead || !ui() || d.money < 2 || d.hp >= 100) return;
        d.money -= 2;
        d.hp = Math.min(100, d.hp + 35);
        ring(W.shrines[r.station].g.position, 0x9bf4da, 2);
        save();
        paintUI();
      };
      $("#sdRetry").onclick = function () {
        if (!ui()) return;
        start();
      };
      function nearest(pos, range) {
        var result = null,
          best = range;
        enemies.forEach(function (e) {
          if (e.state.hp <= 0) return;
          var distance = Math.hypot(pos.x - e.g.position.x, pos.z - e.g.position.z);
          if (distance < best) {
            result = e;
            best = distance;
          }
        });
        return result;
      }
      function fire(pos, enemy, kind) {
        var big = kind === 3,
          m = ball(a.sc, pos.x, pos.y + (big ? 3 : 1.3), pos.z, big ? 0.45 : kind === 1 ? 0.2 : 0.16, big ? 0xfff1b8 : kind === 1 ? 0xaff2ff : kind === 2 ? 0xbff7ff : 0xffe4ac);
        m.material.emissive.setHex(big ? 0xffc04d : kind === 1 ? 0x65a9cc : kind === 2 ? 0x46c6d8 : 0xe1a758);
        shots.push({ m: m, e: enemy, kind: kind, life: big ? 3 : 2 });
      }
      function front() {
        var best = null,
          dist = 1e9;
        enemies.forEach(function (e) {
          if (e.state.hp <= 0) return;
          var dd = Math.hypot(n.x - e.g.position.x, n.z - e.g.position.z);
          if (dd < dist) {
            dist = dd;
            best = e;
          }
        });
        return best;
      }
      function cannon() {
        if (!r.defense || dead) return false;
        var e = front();
        if (!e) return false;
        var sp = W.shrines[r.station].g.position;
        fire({ x: sp.x, y: sp.y, z: sp.z }, e, 3);
        ring(sp, 0xffe39a, 1.6);
        C.tone(880, 0, 0.12, "triangle", 0.05);
        return true;
      }
      function push() {
        if (!r.defense || dead) return;
        var e = front();
        if (!e) return;
        var dx = n.x - e.g.position.x,
          dz = n.z - e.g.position.z,
          len = Math.hypot(dx, dz);
        if (len > 3) {
          e.g.position.x += (dx / len) * 1.8;
          e.g.position.z += (dz / len) * 1.8;
        }
        e.flash = 0.25;
        ring(e.g.position, 0xff9f8f, 0.9);
      }
      function attack() {
        if (!r.defense || dead || !ui() || cool > 0) return;
        var e = nearest(h.position, 18);
        if (!e) {
          notice("靠近迷霧怪，星光射程是 18 公尺。");
          return;
        }
        cool = 0.22;
        fire(h.position, e, 2);
        W.hero.arms[1].rotation.x = -1.3;
        h.rotation.y = Math.atan2(h.position.x - e.g.position.x, h.position.z - e.g.position.z);
        C.tone(600, 0, 0.05, "sine", 0.025);
      }
      function nova() {
        if (!r.defense || dead || !ui() || novaCD > 0) return;
        novaCD = 10;
        ring(h.position, 0x9bf7ec, 1.5);
        enemies.forEach(function (e) {
          if (e.g.position.distanceTo(h.position) < 9) {
            e.state.hp -= 5;
            e.slow = 3;
            e.flash = 0.15;
            burst(e.g.position, 0xa6f3ea, 8);
          }
        });
        notice("星環衝擊！周圍怪物受到傷害並緩速。");
        paintUI();
      }
      $("#sdFire").onclick = attack;
      $("#sdNova").onclick = nova;
      function tick(dt) {
        if (!r.defense) return;
        if (!initialized) initialize();
        if (!ui() || dead) return;
        var d = r.defense;
        cool = Math.max(0, cool - dt);
        novaCD = Math.max(0, novaCD - dt);
        spawnCD -= dt;
        if (d.spawned < total && spawnCD <= 0 && enemies.length < 6) {
          var e = makeEnemy(d.spawned++);
          d.enemies.push(e.state);
          spawnCD = r.station === 3 ? 2.8 : 3.4;
        }
        towers.forEach(function (t) {
          if (t.rainbow && t.gem) t.gem.material.color.setHSL((a.t * 0.25 + t.kind * 0.3) % 1, 0.8, 0.62), t.gem.material.emissive.setHSL((a.t * 0.25 + t.kind * 0.3) % 1, 0.8, 0.35);
          t.cd -= dt;
          var e = nearest(t.g.position, 16);
          if (e) {
            t.top.rotation.y = Math.atan2(t.g.position.x - e.g.position.x, t.g.position.z - e.g.position.z);
            if (t.cd <= 0) {
              fire(t.g.position, e, t.kind);
              t.cd = t.kind === 1 ? 1.2 : 0.8;
            }
          }
        });
        /* v7：不再自動射擊，按「射擊」才會發射；答對題目由燈塔發射星光砲。 */
        for (var i = shots.length - 1; i >= 0; i--) {
          var s = shots[i];
          s.life -= dt;
          var dest = s.e.g.position.clone();
          dest.y = 1.1;
          var delta = dest.sub(s.m.position),
            len = delta.length();
          if (len < dt * 22 || s.life <= 0 || s.e.state.hp <= 0) {
            if (s.life > 0 && s.e.state.hp > 0) {
              var dmg = s.kind === 3 ? 6 : s.kind === 0 ? 2 : 1;
              s.e.state.hp -= dmg;
              s.e.lastHit = s.kind === 3 ? "cannon" : s.kind === 2 ? "hero" : "tower";
              if (s.kind === 1) s.e.slow = 2.5;
              s.e.flash = 0.14;
              burst(s.e.g.position, s.kind === 3 ? 0xffe08a : s.kind === 1 ? 0xa4edff : 0xffdf9a, s.kind === 3 ? 18 : 3);
              if (s.kind === 3) {
                ring(s.e.g.position, 0xffe08a, 1.2);
                enemies.forEach(function (o) {
                  if (o !== s.e && o.state.hp > 0 && o.g.position.distanceTo(s.e.g.position) < 3.2) {
                    o.state.hp -= 2;
                    o.lastHit = "cannon";
                    o.flash = 0.14;
                  }
                });
              }
            }
            remove(s.m);
            shots.splice(i, 1);
          } else s.m.position.addScaledVector(delta, (dt * (s.kind === 3 ? 26 : 22)) / len);
        }
        for (i = enemies.length - 1; i >= 0; i--) {
          var e = enemies[i];
          if (e.state.hp <= 0) {
            burst(e.g.position, 0xc5bafa, e.type === 3 ? 35 : 12);
            ring(e.g.position, 0xffdfa6, 0.4);
            remove(e.g);
            enemies.splice(i, 1);
            d.killed++;
            d.money++;
            var gain = MONSTERS[e.type].merit + (e.type === 0 && e.lastHit === "cannon" ? 1 : 0) - (e.type === 0 && e.lastHit === "tower" ? 0 : 0);
            d.merit = (d.merit | 0) + gain;
            if (hooks.merit) hooks.merit(gain, e.type);
            continue;
          }
          e.slow = Math.max(0, e.slow - dt);
          e.flash = Math.max(0, e.flash - dt);
          var dx = n.x - e.g.position.x,
            dz = n.z - e.g.position.z,
            len = Math.hypot(dx, dz),
            speed = [1.1, 1.7, 0.75, 0.55][e.type] * (e.slow > 0 ? 0.42 : 1);
          if (len > 2.3) {
            e.g.position.x += (dx / len) * speed * dt;
            e.g.position.z += (dz / len) * speed * dt;
          } else {
            e.attack -= dt;
            if (e.attack <= 0) {
              d.hp = Math.max(0, d.hp - (e.type === 3 ? 15 : 7));
              e.attack = 2;
              ring(W.shrines[r.station].g.position, 0xffb2a2, 2);
              if (d.hp <= 0) {
                dead = true;
                notice("先喘口氣！按「重新守護本波」，學習分數會保留。");
                save();
                paintUI();
                break;
              }
            }
          }
          e.g.rotation.y = Math.atan2(dx, dz);
          e.g.position.y = C.reduced ? 0 : Math.abs(Math.sin(a.t * (e.type === 1 ? 8 : 5) + e.state.index)) * 0.15;
          e.g.userData.bar.scale.x = Math.max(0.01, e.state.hp / e.max);
          e.g.userData.bar.material.color.setHex(e.flash > 0 ? 0xffffff : e.slow > 0 ? 0x9defff : 0xffbb8a);
          e.state.x = e.g.position.x;
          e.state.z = e.g.position.z;
        }
        d.enemies = enemies.map(function (e) {
          return e.state;
        });
        for (i = rings.length - 1; i >= 0; i--) {
          var rr = rings[i];
          rr.t -= dt;
          rr.m.scale.addScalar(dt * 6);
          rr.m.material.opacity = Math.max(0, rr.t);
          if (rr.t <= 0) {
            remove(rr.m);
            rings.splice(i, 1);
          }
        }
        paint += dt;
        if (paint > 0.15) {
          paintUI();
          paint = 0;
        }
        if (d.killed >= total) {
          if (d.hp >= 100 && hooks.merit) {
            hooks.merit(5, -1);
            d.merit = (d.merit | 0) + 5;
            notice("完美守護！燈塔毫髮無傷，戰功 +5！");
          }
          if (hooks.waveEnd) hooks.waveEnd(d.merit | 0);
          clear();
          panel.hidden = actions.hidden = true;
          r.defense = null;
          initialized = false;
          won();
        }
      }
      return {
        start: start,
        tick: tick,
        cannon: cannon,
        push: push,
        attack: attack,
        nova: nova,
        active: function () {
          return !!r.defense;
        },
        state: function () {
          return r.defense
            ? {
                hp: r.defense.hp,
                killed: r.defense.killed,
                total: total,
                money: r.defense.money,
                enemies: enemies.length,
                towers: r.defense.towers.slice(),
                dead: dead,
              }
            : null;
        },
        init: function () {
          if (r.defense) initialize();
        },
      };
    }

    function picture(w) {
      var src = C.picture(w);
      return src ? '<img src="' + src + '" alt="' + E(w[2]) + '">' : '<span class="si-emoji">' + w[1] + "</span>";
    }
    function question(g, o, r) {
      var Q = C.seeded({ seed: r.seed + 101003 * (r.qNumber + 1), eg: o.eg, tb: o.tb }),
        type = r.station < 3 ? r.station : r.qNumber % 3,
        q = { type: type, tries: 0, hint: false };
      if (g.id === "v5math") {
        var w = C.mq(Q.R, "mix", Q.b, o.tb, 4);
        q.expression = w[2];
        q.answer = w[0];
        q.choices = Q.sh(
          w.os.map(function (v) {
            return v[0];
          }),
        );
        q.kind = type === 0 ? "choice" : type === 1 ? "number" : "sort";
        if (q.kind === "sort") {
          q.sequence = q.choices.slice().sort(function (a, b) {
            return +a - +b;
          });
          q.answer = q.sequence.join("|");
        }
        return q;
      }
      var bank = C.seeded({ seed: r.seed, eg: o.eg }),
        pool = bank.sh(
          bank.pool.filter(function (w) {
            return /^[a-z]{3,10}$/.test(w[0]);
          }),
        );
      if (pool.length < 4)
        pool = bank.sh(
          C.words.filter(function (w) {
            return w[3] <= Q.b && /^[a-z]{3,10}$/.test(w[0]);
          }),
        );
      var word = pool[r.qNumber % pool.length];
      q.word = word.slice();
      q.answer = word[0];
      q.kind = type === 2 ? "spell" : type === 1 ? "listen" : "picture";
      q.choices = Q.sh([word].concat(Q.oth(word, 3))).map(function (w) {
        return w.slice();
      });
      if (q.kind === "spell") q.letters = Q.sh(word[0].split(""));
      return q;
    }
    function launch(g, o) {
      if (o.tok) {
        C.toast("星島冒險目前為單人故事模式。", "ok");
        return C.menu(g);
      }
      var p = profile(g),
        key = profileKey(g),
        ch = Math.min(chosen[g.id] || 0, p.unlocked - 1),
        r = resume[g.id] && p.run ? p.run : makeRun(ch, o.seed, o.eg, p.collect[ch]);
      o.seed = r.seed;
      o.eg = r.grade;
      ch = r.chapter;
      p.run = r;
      chosen[g.id] = ch;
      resume[g.id] = true;
      C.ls.set(key, p);
      C.arc(g, o, function (a) {
        var siCache = siData(),
          X = C.seeded(o),
          W = world(a, ch, X.R, capeOf(siCache) || p.skin),
          h = W.hero.g,
          keys = {},
          target = null,
          waypoint = null,
          route = [],
          axis = { x: 0, y: 0 },
          dash = 0,
          dashCD = 0,
          saveT = 0,
          modal = false,
          paused = false,
          lock = false,
          selected = [],
          typed = "",
          current = null,
          returnFocus = null,
          disposed = false,
          finishPending = false,
          particles = [],
          puzzleStart = 0;
        enrichWorld(a, W, X.R);
        a.el.classList.add("si-game");
        h.position.set(r.x, 0, r.z);
        if (!canWalk(h.position.x, h.position.z)) h.position.set(0, 0, 18);
        W.fox.position.set(h.position.x + 1.8, 0, h.position.z + 1.8);
        a.el.querySelector(".obhud").hidden = true;
        C.$("#obPrompt").hidden = true;
        a.el.insertAdjacentHTML(
          "beforeend",
          '<header class="si-hud"><button id="siExit" aria-label="存檔並離開">‹</button><div><small>STAR ISLAND · ' +
            (g.id === "v5math" ? "CRYSTAL QUEST" : "WORD ODYSSEY") +
            "</small><b>" +
            E(CHAPTERS[ch].name) +
            '</b></div><button id="siPause" aria-label="暫停遊戲">Ⅱ</button></header><aside class="si-mission"><small id="siChapterLine"></small><b id="siObjective"></b><span id="siMissionSub"></span><div class="si-seals" id="siSeals"></div><button id="siGuide">✧ 跟隨星光</button></aside><div class="si-minimap"><canvas id="siMap" width="160" height="160" aria-label="島嶼小地圖"></canvas><span id="siCollection"></span></div><div class="si-toast" id="siToast" role="status" aria-live="polite"></div><div class="si-companion"><img src="assets/fox.webp" alt="狐狸米露"><span id="siCompanionText">' +
            E(CHAPTERS[ch].story) +
            '</span></div><div class="si-joystick" id="siStick" aria-label="觸控移動搖桿"><i></i><span>移動</span></div><div class="si-actions"><button id="siDash">↝<small>衝刺</small></button><button id="siInteract" disabled>✦<small>靠近燈塔</small></button></div><div class="si-help">WASD 移動 · E 解謎 · J 射擊 · K 衝擊 · 空白鍵衝刺</div><div class="si-sheet" id="siSheet" hidden role="dialog" aria-modal="true" aria-labelledby="siTaskTitle"></div><div class="si-pause" id="siPausePanel" hidden role="dialog" aria-modal="true" aria-label="冒險暫停"><div><img src="assets/robot.webp" alt=""><small>TAKE YOUR TIME</small><h2>休息一下，星島等你</h2><p>目前進度已保存。這裡沒有倒數，慢慢想也沒關係。</p><button id="siResume">繼續冒險</button><button id="siSaveExit">存檔並回冒險地圖</button></div></div>',
        );
        var $ = function (s) {
            return a.el.querySelector(s);
          },
          mapCtx = $("#siMap").getContext("2d");
        a.el.insertAdjacentHTML(
          "beforeend",
          '<section class="si-qbar" id="sqBar" hidden aria-label="戰鬥題目"><div class="sq-top"><span class="sq-tag">答對 → 星光砲</span><b id="sqText"></b><button id="sqSpeak" aria-label="再聽一次" hidden>🔊</button></div><div class="sq-opts" id="sqOpts"></div><p id="sqFb" role="status" aria-live="polite"></p><span class="sq-wait">迷霧怪快來了，準備好就答題！</span></section>',
        );
        var siPend = { m: 0, bk: [0, 0, 0, 0] },
          bq = null,
          bLock = false;
        if (typeof r.meritRun !== "number") r.meritRun = 0;
        function flushMerit() {
          if (!siPend.m && !siPend.bk.some(Boolean)) return;
          var add = siPend.m,
            bk = siPend.bk.slice();
          siPend = { m: 0, bk: [0, 0, 0, 0] };
          var bonus = false;
          siMut(function (si) {
            si.m += add;
            si.tot += add;
            bk.forEach(function (v, i) {
              si.bk[i] = (si.bk[i] | 0) + v;
            });
            if (!si.own.hunter && si.bk.every(function (v) {
              return v > 0;
            })) {
              si.own.hunter = 1;
              si.m += 10;
              si.tot += 10;
              bonus = true;
            }
          });
          siCache = siData();
          if (bonus) notice("圖鑑集滿！獲得「迷霧獵人」徽章，戰功 +10！");
        }
        function battleQuestion() {
          var n0 = r.bq | 0;
          return question(g, o, { seed: r.seed + 50021, qNumber: n0 + 20, station: g.id === "v5math" ? 0 : n0 % 2 });
        }
        function bqRender() {
          var q = bq,
            isMath = g.id === "v5math";
          if (!q) return;
          $("#sqText").textContent = isMath ? q.expression + " = ?" : q.kind === "listen" ? "聽一聽，是哪一個？" : q.word[0];
          $("#sqSpeak").hidden = isMath;
          $("#sqOpts").className = "sq-opts" + (isMath ? " nums" : "");
          $("#sqOpts").innerHTML = q.choices
            .map(function (v, i) {
              return '<button data-bq="' + i + '">' + (isMath ? "<b>" + E(v) + "</b>" : picture(v) + "<small>" + E(v[2]) + "</small>") + "</button>";
            })
            .join("");
          $("#sqOpts")
            .querySelectorAll("[data-bq]")
            .forEach(function (b) {
              b.onclick = function () {
                bqAnswer(+b.dataset.bq);
              };
            });
          $("#sqFb").textContent = "";
        }
        function bqNext() {
          bq = battleQuestion();
          bLock = false;
          bqRender();
          if (bq.word) C.speak(bq.word[0]);
        }
        function bqAnswer(i) {
          if (!bq || bLock || paused || modal || a.over || !combat.active()) return;
          var st = combat.state();
          if (st && (st.dead || !st.enemies)) return;
          var q = bq,
            isMath = g.id === "v5math",
            v = q.choices[i],
            ok = isMath ? String(v) === String(q.answer) : v && v[0] === q.answer,
            btns = $("#sqOpts").querySelectorAll("button");
          if (ok) {
            bLock = true;
            r.correct++;
            if (q.tries === 0) r.first++;
            C.award(1);
            if (q.word) C.Learn.ok(q.word);
            r.bq = (r.bq | 0) + 1;
            btns[i].classList.add("right");
            var shot = combat.cannon();
            $("#sqFb").textContent = shot ? "答對了！星光砲發射！" : "答對了！星光能量 +1";
            $("#sqFb").className = "good";
            if (!shot) {
              var d0 = r.defense;
              if (d0) d0.money = Math.min(100, (d0.money | 0) + 1);
            }
            C.sfx("ok");
            save();
            setTimeout(function () {
              if (!C.active(a) || a.over || disposed) return;
              if (combat.active()) bqNext();
            }, 550);
          } else {
            q.tries++;
            r.wrong++;
            if (q.word) C.Learn.bad(q.word);
            btns[i].classList.add("wrong");
            btns[i].disabled = true;
            combat.push();
            C.sfx("no");
            if (q.tries >= 2) {
              bLock = true;
              q.choices.forEach(function (c, j) {
                if (isMath ? String(c) === String(q.answer) : c[0] === q.answer) btns[j].classList.add("right");
              });
              $("#sqFb").textContent = isMath ? "答案是 " + q.answer + "，下一題加油！" : q.word[0] + " = " + q.word[2] + "，下一題加油！";
              $("#sqFb").className = "bad";
              r.bq = (r.bq | 0) + 1;
              setTimeout(function () {
                if (!C.active(a) || a.over || disposed) return;
                if (combat.active()) bqNext();
              }, 1500);
            } else {
              $("#sqFb").textContent = "怪物往前衝了！再想一想～";
              $("#sqFb").className = "bad";
            }
            save();
          }
        }
        $("#sqSpeak").onclick = function () {
          if (bq && bq.word) C.speak(bq.word[0]);
        };
        var combat = defenseSystem(
          a,
          W,
          h,
          r,
          ch,
          function () {
            return !paused && !modal && !a.over;
          },
          notice,
          save,
          function () {
            if (r.station === 3) {
              save();
              finish();
              return;
            }
            r.station++;
            r.step = 0;
            save();
            refresh();
            notice("守護成功！下一座燈塔已開啟。");
            $("#siCompanionText").textContent = "你守住了星光！跟著指引，前往下一座燈塔。";
          },
          burst,
          {
            merit: function (n, type) {
              siPend.m += n;
              r.meritRun = (r.meritRun | 0) + n;
              if (type >= 0) siPend.bk[type]++;
            },
            towerStyle: function () {
              return towerStyleOf(siCache);
            },
            waveEnd: function () {
              bq = null;
              flushMerit();
            },
          },
        );
        combat.init();
        function save() {
          if (finishPending || disposed) return;
          r.x = +h.position.x.toFixed(2);
          r.z = +h.position.z.toFixed(2);
          p.run = r;
          p.collect[ch] = r.starMask;
          C.ls.set(key, p);
        }
        function notice(s) {
          $("#siToast").textContent = s;
          $("#siToast").classList.add("show");
          a.siToastT = 3;
        }
        function burst(pos, color, n) {
          if (C.reduced) return;
          for (var i = 0; i < (n || 18) && particles.length < 90; i++) {
            var m = mesh(a.sc, new T.SphereGeometry(0.08, 5, 4), new T.MeshBasicMaterial({ color: color || 0xffdf94 }), pos.x, pos.y + 1, pos.z);
            particles.push({ m: m, v: new T.Vector3((Math.random() - 0.5) * 4, Math.random() * 4 + 1, (Math.random() - 0.5) * 4), life: 1 });
          }
        }
        function refresh() {
          var boss = r.station === 3,
            at = NODES[Math.min(3, r.station)];
          $("#siChapterLine").textContent = "第 " + (ch + 1) + " / 3 章 · " + (g.id === "v5math" ? "數學遠征" : "英文遠征");
          $("#siObjective").textContent = boss ? "喚醒水晶守護龍" : "修復 " + nodeName(at, g);
          $("#siMissionSub").textContent = boss ? "星核能量 " + r.energy + "/3 · 守護龍 " + r.bossHP + "/8" : "解謎充能 → 建塔守護 · " + r.step + "/2 題";
          $("#siSeals").innerHTML = [0, 1, 2]
            .map(function (i) {
              return '<i class="' + (r.station > i ? "done" : r.station === i ? "current" : "") + '">' + (r.station > i ? "✓" : i + 1) + "</i>";
            })
            .join("");
          $("#siCollection").textContent = "星砂 " + r.starMask.toString(2).replace(/0/g, "").length + "/5";
          W.beacon.position.set(at.x, 0.15, at.z);
          W.shrines.forEach(function (s, i) {
            var solved = i < r.station;
            s.crystal.material.color.setHex(solved ? W.theme.accent : i === r.station ? 0x9be7dc : 0x8a9faa);
            s.crystal.material.emissive.setHex(solved ? 0x6c5425 : i === r.station ? 0x2c6663 : 0);
            s.beam.visible = i === r.station;
            s.halo.material.color.setHex(solved ? 0xffdf8b : 0xb1e8df);
          });
          W.jewels.forEach(function (j, i) {
            j.gem.visible = j.ring.visible = !(r.starMask & (1 << i));
          });
        }
        function closeSheet() {
          modal = false;
          lock = false;
          $("#siSheet").hidden = true;
          keys = {};
          axis.x = axis.y = 0;
          target = null;
          current = null;
          if (returnFocus && returnFocus.isConnected) returnFocus.focus();
        }
        function empower() {
          if (r.station !== 3 || r.energy < 3 || r.empowered || lock) return;
          r.energy -= 3;
          r.empowered = true;
          save();
          notice("星光爆發已準備！下一次答對造成雙倍星光。");
          C.sfx("win");
          renderQuestion();
          refresh();
        }
        function setFeedback(s, good) {
          var e = $("#siFeedback");
          if (e) {
            e.textContent = s;
            e.className = good ? "good" : "bad";
          }
        }
        function hint() {
          if (lock || !current) return;
          current.hint = true;
          save();
          var s =
            g.id === "v5math"
              ? current.kind === "sort"
                ? "先找最小的數，再依序找比較大的數。正確順序：" + current.sequence.join(" → ")
                : mathExplanation(current)
              : "米露提示：" + current.word[0] + " = " + current.word[2];
          setFeedback(s, true);
          if (current.word) C.speak(current.word[0]);
        }
        function renderQuestion() {
          var q = current;
          if (!q) return;
          var isMath = g.id === "v5math",
            boss = r.station === 3,
            title = boss ? "守護者試煉" : nodeName(NODES[r.station], g),
            content = "",
            intro = "",
            qtext = "";
          if (q.kind === "choice") {
            intro = "選出正確答案，為水晶充能";
            qtext = q.expression + " = ?";
            content =
              '<div class="si-options numbers">' +
              q.choices
                .map(function (v, i) {
                  return '<button data-choice="' + i + '"><small>' + (i + 1) + "</small><b>" + E(v) + "</b></button>";
                })
                .join("") +
              "</div>";
          } else if (q.kind === "number") {
            intro = "修復星核密碼，輸入答案";
            qtext = q.expression + " = ?";
            content =
              '<output id="siNumber" class="si-number">' +
              E(typed || "?") +
              '</output><div class="si-keypad">' +
              ["1", "2", "3", "4", "5", "6", "7", "8", "9", "−", "0", "."]
                .map(function (k) {
                  return '<button data-key="' + k + '">' + k + "</button>";
                })
                .join("") +
              '</div><div class="si-submit"><button id="siBackspace">⌫ 刪一格</button><button id="siSubmit">啟動星核 ✦</button></div>';
          } else if (q.kind === "sort") {
            intro = "從小到大踏上數字橋";
            qtext = "依序選出最小的數";
            content =
              '<div class="si-slots">' +
              q.sequence
                .map(function (_, i) {
                  return "<span>" + E(selected[i] === undefined ? "·" : q.choices[selected[i]]) + "</span>";
                })
                .join("") +
              '</div><div class="si-options numbers">' +
              q.choices
                .map(function (v, i) {
                  return '<button data-sort="' + i + '" ' + (selected.indexOf(i) >= 0 ? "disabled" : "") + ">" + E(v) + "</button>";
                })
                .join("") +
              '</div><div class="si-submit"><button id="siUndo">↶ 重排</button><button id="siSubmit" ' +
              (selected.length === q.sequence.length ? "" : "disabled") +
              ">架起數字橋 ✦</button></div>";
          } else if (q.kind === "spell") {
            intro = "拼出魔法單字，修復星紋";
            qtext = q.word[2];
            content =
              '<div class="si-word-picture">' +
              picture(q.word) +
              '</div><div class="si-slots letters">' +
              q.answer
                .split("")
                .map(function (_, i) {
                  return "<span>" + E(selected[i] === undefined ? "·" : q.letters[selected[i]]) + "</span>";
                })
                .join("") +
              '</div><div class="si-letter-bank">' +
              q.letters
                .map(function (k, i) {
                  return '<button data-letter="' + i + '" ' + (selected.indexOf(i) >= 0 ? "disabled" : "") + ">" + k + "</button>";
                })
                .join("") +
              '</div><div class="si-submit"><button id="siUndo">↶ 重拼</button><button id="siSubmit" ' +
              (selected.length === q.answer.length ? "" : "disabled") +
              ">施放魔法 ✦</button></div>";
          } else {
            intro = q.kind === "listen" ? "聽懂回音，找到對應的圖片" : "找到這個單字對應的事物";
            qtext = q.kind === "listen" ? "聽聽風在說什麼" : q.word[0];
            content =
              '<div class="si-options pictures">' +
              q.choices
                .map(function (w, i) {
                  return '<button data-choice="' + i + '">' + picture(w) + "<small>" + E(w[2]) + "</small></button>";
                })
                .join("") +
              "</div>";
          }
          $("#siSheet").innerHTML =
            '<section class="si-task"><header><div><small>' +
            E(title) +
            " · " +
            (boss ? "星核 " + r.bossHP + "/8" : "任務 " + (r.step + 1) + "/2") +
            '</small><h2 id="siTaskTitle">' +
            intro +
            '</h2></div><button id="siClose" aria-label="先回島上">×</button></header>' +
            (boss
              ? '<div class="si-boss-meter"><img src="assets/v4/boss-dragon.webp" alt="水晶守護龍"><div><b>以知識喚醒守護者</b><i><em style="width:' +
                (r.bossHP / 8) * 100 +
                '%"></em></i><button id="siNova" ' +
                (r.energy < 3 || r.empowered ? "disabled" : "") +
                ">" +
                (r.empowered ? "✦ 已蓄力，下次答對雙倍星光" : "✦ 星光爆發 " + r.energy + "/3") +
                "</button></div></div>"
              : "") +
            '<p class="si-question">' +
            E(qtext) +
            "</p>" +
            (!isMath ? '<button id="siListen" class="si-listen">♫ 再聽一次</button>' : "") +
            content +
            '<p id="siFeedback" role="status" aria-live="polite"></p><footer><button id="siHint">✧ 米露提示</button><span>答錯也沒關係，想一想再試一次</span></footer></section>';
          $("#siClose").onclick = function () {
            if (!lock) closeSheet();
          };
          $("#siHint").onclick = hint;
          if ($("#siListen"))
            $("#siListen").onclick = function () {
              C.speak(q.word[0]);
            };
          if ($("#siNova")) $("#siNova").onclick = empower;
          $("#siSheet")
            .querySelectorAll("[data-choice]")
            .forEach(function (b) {
              b.onclick = function () {
                var v = q.choices[+b.dataset.choice];
                answer(isMath ? v : v[0]);
              };
            });
          $("#siSheet")
            .querySelectorAll("[data-letter]")
            .forEach(function (b) {
              b.onclick = function () {
                if (lock) return;
                selected.push(+b.dataset.letter);
                C.tone(500 + selected.length * 40, 0, 0.07, "sine", 0.04);
                renderQuestion();
              };
            });
          $("#siSheet")
            .querySelectorAll("[data-sort]")
            .forEach(function (b) {
              b.onclick = function () {
                if (lock) return;
                selected.push(+b.dataset.sort);
                C.sfx("tap");
                renderQuestion();
              };
            });
          $("#siSheet")
            .querySelectorAll("[data-key]")
            .forEach(function (b) {
              b.onclick = function () {
                numberKey(b.dataset.key);
              };
            });
          if ($("#siBackspace"))
            $("#siBackspace").onclick = function () {
              typed = typed.slice(0, -1);
              renderQuestion();
            };
          if ($("#siUndo"))
            $("#siUndo").onclick = function () {
              if (lock) return;
              selected = [];
              renderQuestion();
            };
          if ($("#siSubmit")) $("#siSubmit").onclick = submit;
        }
        function numberKey(k) {
          if (lock || !current || current.kind !== "number") return;
          if (k === "−" || k === "-") {
            typed = typed.charAt(0) === "-" ? typed.slice(1) : "-" + typed;
          } else if (k === "." && typed.indexOf(".") < 0) {
            typed = (typed || "0") + ".";
          } else if (/^\d$/.test(k) && typed.length < 13) typed += k;
          renderQuestion();
        }
        function submit() {
          if (!current) return;
          if (current.kind === "number") {
            if (!typed || !Number.isFinite(Number(typed))) return;
            answer(typed);
          } else if (current.kind === "spell") {
            if (selected.length !== current.answer.length) return;
            answer(
              selected
                .map(function (i) {
                  return current.letters[i];
                })
                .join(""),
            );
          } else if (current.kind === "sort") {
            if (selected.length !== current.sequence.length) return;
            answer(
              selected
                .map(function (i) {
                  return current.choices[i];
                })
                .join("|"),
            );
          }
        }
        function finish() {
          if (finishPending) return;
          flushMerit();
          finishPending = true;
          modal = false;
          $("#siSheet").hidden = true;
          var rating = starsFor(r),
            found = r.starMask.toString(2).replace(/0/g, "").length;
          p.stars[ch] = Math.max(p.stars[ch], rating);
          p.collect[ch] = r.starMask;
          p.unlocked = Math.max(p.unlocked, Math.min(3, ch + 2));
          p.run = null;
          C.ls.set(key, p);
          C.award(3);
          C.arcEnd(a, {
            score: r.first,
            total: r.correct,
            icon: "🏆",
            title: ch === 2 ? "星島守護者，傳說完成！" : CHAPTERS[ch].name + " 恢復光芒！",
            text:
              "首次答對 " +
              r.first +
              "/" +
              r.correct +
              " 項 · " +
              rating +
              " 星評價 · 收集 " +
              found +
              "/5 星砂。" +
              (ch < 2 ? "已開啟下一章與新的旅人外觀！" : "三章冒險完成，可以回到各島收集星砂與挑戰三星。") +
              " 本章戰功星 +" +
              (r.meritRun | 0) +
              "（目前共 " +
              siData().m +
              "，可到冒險地圖的商店兌換）",
            say: "你用知識修復了星島！",
          });
          var again = $("#obA"),
            back = $("#obM");
          if (again) {
            var n = again.cloneNode(true);
            again.replaceWith(n);
            n.textContent = ch < 2 ? "前往下一章 →" : "再次探索";
            n.onclick = function () {
              chosen[g.id] = Math.min(2, ch + 1);
              resume[g.id] = false;
              C.launch(g, {});
            };
          }
          if (back) {
            var m = back.cloneNode(true);
            back.replaceWith(m);
            m.textContent = "回冒險地圖";
            m.onclick = function () {
              C.menu(g);
            };
          }
        }
        function answer(value) {
          if (!current) {
            return;
          }
          if (lock || !C.active(a) || a.over) {
            try {
              setFeedback(lock ? "處理中，請稍等一下…" : "冒險暫停中，請關閉後再開一次任務。", false);
            } catch (_) {}
            return;
          }
          try {
            answerCore(value);
          } catch (err) {
            lock = false;
            try {
              console.error(err);
              setFeedback("發生錯誤：" + ((err && err.message) || err) + "（請截圖給爸爸）", false);
            } catch (_) {}
          }
        }
        function answerCore(value) {
          var q = current,
            isMath = g.id === "v5math",
            ok = q.kind === "number" ? Math.abs(Number(value) - Number(q.answer)) < 1e-8 : String(value) === String(q.answer);
          if (!ok) {
            q.tries++;
            r.wrong++;
            C.sfx("no");
            if (q.word) C.Learn.bad(q.word);
            setFeedback(
              q.tries >= 2
                ? isMath
                  ? q.kind === "sort"
                    ? "比較每個數的大小：" + q.sequence.join(" → ")
                    : mathExplanation(q)
                  : "提示：" + q.word[0] + " = " + q.word[2]
                : "星光還沒對上。再觀察一次，米露陪你一起想！",
              false,
            );
            selected = [];
            typed = "";
            if (q.kind === "spell" || q.kind === "sort" || q.kind === "number") {
              var feedback = $("#siFeedback").textContent;
              renderQuestion();
              setFeedback(feedback, false);
            }
            save();
            return;
          }
          lock = true;
          r.correct++;
          if (q.tries === 0 && !q.hint) r.first++;
          C.award(1);
          if (q.word) C.Learn.ok(q.word);
          r.energy = Math.min(3, r.energy + 1);
          r.qNumber++;
          if (r.station === 3) {
            var damage = r.empowered ? 4 : 2;
            r.bossHP = Math.max(0, r.bossHP - damage);
            r.empowered = false;
            a.siBlast = 1.5;
            burst(W.guardian.position, 0xffe5af, 38);
          } else {
            r.step++;
            burst(W.shrines[r.station].g.position, 0xaff2d9, 24);
            if (r.step >= 2) {
              r.step = 0;
              combat.start();
              $("#siCompanionText").textContent = "知識化成星晶了！建造防禦塔，守住這座燈塔。";
            }
          }
          r.pending = null;
          save();
          C.sfx("ok");
          setFeedback(
            isMath ? (q.kind === "sort" ? "數字橋修好了！" : q.expression + " = " + q.answer + "，修復成功！") : q.word[0] + " = " + q.word[2] + "，魔法成功！",
            true,
          );
          $("#siSheet")
            .querySelectorAll("button")
            .forEach(function (b) {
              b.disabled = true;
            });
          refresh();
          setTimeout(function () {
            if (!C.active(a) || a.over || disposed) return;
            if (r.station === 3 && r.bossHP <= 0) {
              closeSheet();
              combat.start();
              return;
            }
            if (combat.active()) {
              closeSheet();
              notice("守護戰開始！答對下方題目發射星光砲，也可以自己射擊！");
              return;
            }
            /* v7：同一座燈塔的題目連續作答，不用關掉再開 */
            current = question(g, o, r);
            r.pending = current;
            selected = [];
            typed = "";
            lock = false;
            save();
            renderQuestion();
            setFeedback("答對了！繼續下一題 →", true);
            if (current.word) C.speak(current.word[0]);
          }, 800);
        }
        function interact() {
          if (modal || paused || a.over || lock) return;
          if (combat.active()) {
            notice("守護戰進行中！答對下方題目發射星光砲，或按射擊自己打怪。");
            return;
          }
          var n = NODES[r.station];
          if (Math.hypot(h.position.x - n.x, h.position.z - n.z) > 4) {
            notice("先靠近發光燈塔，或按「跟隨星光」。");
            return;
          }
          keys = {};
          axis.x = axis.y = 0;
          target = null;
          waypoint = null;
          selected = [];
          typed = "";
          modal = true;
          returnFocus = $("#siInteract");
          current = r.pending || question(g, o, r);
          r.pending = current;
          save();
          renderQuestion();
          $("#siSheet").hidden = false;
          $("#siClose").focus();
          if (current.word) C.speak(current.word[0]);
        }
        function setPause(value) {
          if (a.over) return;
          paused = value;
          keys = {};
          axis.x = axis.y = 0;
          target = null;
          waypoint = null;
          $("#siPausePanel").hidden = !value;
          if (value) {
            save();
            $("#siResume").focus();
          } else $("#siPause").focus();
        }
        function dashStart() {
          if (paused || modal || dashCD > 0 || a.over) return;
          dash = 0.28;
          dashCD = 2.6;
          C.tone(450, 0, 0.12, "triangle", 0.04);
        }
        function goTo(x, z) {
          if (!canWalk(x, z)) {
            notice("水池和島嶼邊緣不能通行，換一個落腳點吧。");
            return;
          }
          target = new T.Vector2(x, z);
          route = planRoute(h.position.x, h.position.z, x, z);
          waypoint = route.shift() || null;
        }
        $("#siGuide").onclick = function () {
          if (modal || paused) return;
          var n = NODES[r.station];
          goTo(n.x, n.z);
          notice("米露帶路！抵達光柱後按互動。");
        };
        $("#siInteract").onclick = interact;
        $("#siDash").onclick = dashStart;
        $("#siPause").onclick = function () {
          setPause(true);
        };
        $("#siResume").onclick = function () {
          setPause(false);
        };
        $("#siSaveExit").onclick = function () {
          save();
          C.menu(g);
        };
        $("#siExit").onclick = function () {
          save();
          C.menu(g);
        };
        a.kd = function (e) {
          if (a.over || e.ctrlKey || e.metaKey || e.altKey) return;
          if (e.key === "Tab" && (modal || paused)) {
            var region = paused ? $("#siPausePanel") : $("#siSheet"),
              items = Array.prototype.slice.call(region.querySelectorAll("button:not([disabled])"));
            if (items.length) {
              var idx = items.indexOf(document.activeElement);
              e.preventDefault();
              items[(idx + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
            }
            return;
          }
          var k = e.key.toLowerCase();
          if (k === "escape") {
            e.preventDefault();
            if (modal && !lock) closeSheet();
            else setPause(!paused);
            return;
          }
          if (paused) return;
          if (modal) {
            if (lock) return;
            if (k === "enter") {
              e.preventDefault();
              submit();
            } else if (current.kind === "number" && (/^[0-9.-]$/.test(k) || k === "backspace")) {
              e.preventDefault();
              if (k === "backspace") {
                typed = typed.slice(0, -1);
                renderQuestion();
              } else numberKey(k);
            } else if (current.kind === "spell" && /^[a-z]$/.test(k)) {
              e.preventDefault();
              var ix = current.letters.findIndex(function (c, i) {
                return c === k && selected.indexOf(i) < 0;
              });
              if (ix >= 0) {
                selected.push(ix);
                renderQuestion();
              }
            } else if ((current.kind === "choice" || current.kind === "picture" || current.kind === "listen") && /^[1-4]$/.test(k)) {
              var btn = $('[data-choice="' + (+k - 1) + '"]');
              if (btn) btn.click();
            }
            return;
          }
          if (["w", "a", "s", "d", "arrowup", "arrowleft", "arrowdown", "arrowright", " ", "e"].indexOf(k) >= 0) e.preventDefault();
          if (combat.active() && /^[1-4]$/.test(k)) {
            bqAnswer(+k - 1);
            return;
          }
          if (k === "j") combat.attack();
          else if (k === "k") combat.nova();
          else if (k === "e") interact();
          else if (k === " ") dashStart();
          else keys[k] = true;
        };
        var keyup = function (e) {
            delete keys[e.key.toLowerCase()];
          },
          blur = function () {
            keys = {};
            axis.x = axis.y = 0;
            if (!a.over) setPause(true);
          },
          visibility = function () {
            if (document.hidden) blur();
          };
        global.addEventListener("keydown", a.kd);
        global.addEventListener("keyup", keyup);
        /* 不再因 window blur 自動暫停：在 App 內嵌畫面（iframe）裡 blur 會亂發，造成看不見的暫停層擋住點擊；只在切到背景時暫停 */ document.addEventListener(
          "visibilitychange",
          visibility,
        );
        var stick = $("#siStick"),
          knob = stick.querySelector("i"),
          pointerId = null;
        function stickMove(e) {
          if (e.pointerId !== pointerId) return;
          var b = stick.getBoundingClientRect(),
            dx = e.clientX - b.left - b.width / 2,
            dy = e.clientY - b.top - b.height / 2,
            len = Math.hypot(dx, dy),
            f = len > 34 ? 34 / len : 1;
          axis.x = (dx * f) / 34;
          axis.y = (dy * f) / 34;
          knob.style.transform = "translate(" + dx * f + "px," + dy * f + "px)";
          target = waypoint = null;
        }
        function stickEnd() {
          pointerId = null;
          axis.x = axis.y = 0;
          knob.style.transform = "translate(0,0)";
        }
        stick.onpointerdown = function (e) {
          if (modal || paused) return;
          e.preventDefault();
          pointerId = e.pointerId;
          stick.setPointerCapture(e.pointerId);
          stickMove(e);
        };
        stick.onpointermove = stickMove;
        stick.onpointerup = stick.onpointercancel = stickEnd;
        var ray = new T.Raycaster(),
          groundPlane = new T.Plane(new T.Vector3(0, 1, 0), 0),
          hit = new T.Vector3(),
          pointer = new T.Vector2();
        a.el.querySelector("canvas").addEventListener("pointerdown", function (e) {
          if (modal || paused) return;
          var b = e.currentTarget.getBoundingClientRect();
          pointer.set(((e.clientX - b.left) / b.width) * 2 - 1, (-(e.clientY - b.top) / b.height) * 2 + 1);
          ray.setFromCamera(pointer, a.cam);
          if (ray.ray.intersectPlane(groundPlane, hit)) goTo(hit.x, hit.z);
        });
        a.cleanup = function () {
          flushMerit();
          save();
          disposed = true;
          global.removeEventListener("keyup", keyup);
          global.removeEventListener("blur", blur);
          document.removeEventListener("visibilitychange", visibility);
        };
        a.onRs = function (aspect) {
          a.cam.fov = aspect < 0.8 ? 66 : 53;
        };
        a.cam.position.set(h.position.x, 27, h.position.z + 25);
        a.cam.lookAt(h.position.x, 0, h.position.z - 3);
        refresh();
        notice(p.run && r.correct ? "冒險繼續！已恢復最近的進度。" : "歡迎來到星島！按「跟隨星光」開始第一項任務。");
        function drawMap() {
          var c = mapCtx;
          c.clearRect(0, 0, 160, 160);
          c.fillStyle = "#163f4dbd";
          c.beginPath();
          c.arc(80, 80, 74, 0, 7);
          c.fill();
          c.strokeStyle = "#e7e1b36b";
          c.lineWidth = 1;
          c.stroke();
          PONDS.forEach(function (p) {
            c.fillStyle = "#6db5c1";
            c.beginPath();
            c.arc(80 + p[0] * 2, 80 + p[1] * 2, 9, 0, 7);
            c.fill();
          });
          NODES.forEach(function (n, i) {
            c.fillStyle = i < r.station ? "#a2e9cb" : i === r.station ? "#ffdf93" : "#829fa8";
            c.beginPath();
            c.arc(80 + n.x * 2, 80 + n.z * 2, 4, 0, 7);
            c.fill();
          });
          STARS.forEach(function (p, i) {
            if (!(r.starMask & (1 << i))) {
              c.fillStyle = "#ffe3ab";
              c.fillRect(78 + p[0] * 2, 78 + p[1] * 2, 3, 3);
            }
          });
          c.fillStyle = "#ffffff";
          c.beginPath();
          c.arc(80 + h.position.x * 2, 80 + h.position.z * 2, 3.5, 0, 7);
          c.fill();
        }
        a.step = function (dt) {
          if (a.over) return;
          var still = C.reduced;
          if (a.siToastT > 0) {
            a.siToastT -= dt;
            if (a.siToastT <= 0) $("#siToast").classList.remove("show");
          }
          if (paused) {
            drawMap();
            return;
          }
          r.seconds += dt;
          saveT += dt;
          if (saveT >= 5) {
            save();
            saveT = 0;
          }
          dashCD = Math.max(0, dashCD - dt);
          dash = Math.max(0, dash - dt);
          var dx = 0,
            dz = 0;
          if (!modal) {
            dx = axis.x + (keys.d || keys.arrowright ? 1 : 0) - (keys.a || keys.arrowleft ? 1 : 0);
            dz = axis.y + (keys.s || keys.arrowdown ? 1 : 0) - (keys.w || keys.arrowup ? 1 : 0);
            if (Math.hypot(dx, dz) > 0.1) {
              target = waypoint = null;
            } else if (target) {
              var dest = waypoint || target,
                vx = dest.x - h.position.x,
                vz = dest.y - h.position.z,
                len = Math.hypot(vx, vz);
              if (len < 0.5) {
                if (waypoint) waypoint = route.shift() || null;
                else {
                  target = null;
                  notice("抵達任務地點，按右下角 ✦ 互動。");
                }
              } else {
                dx = vx / len;
                dz = vz / len;
              }
            }
          }
          var mag = Math.hypot(dx, dz),
            moving = mag > 0.08;
          if (moving) {
            dx /= Math.max(1, mag);
            dz /= Math.max(1, mag);
            var speed = dash > 0 ? 15 : 6.2,
              nx = h.position.x + dx * speed * dt,
              nz = h.position.z + dz * speed * dt;
            if (canWalk(nx, nz)) {
              h.position.x = nx;
              h.position.z = nz;
            } else {
              if (canWalk(nx, h.position.z)) h.position.x = nx;
              if (canWalk(h.position.x, nz)) h.position.z = nz;
              target = waypoint = null;
            }
            var angle = Math.atan2(-dx, -dz);
            h.rotation.y = Math.atan2(Math.sin(angle - h.rotation.y), Math.cos(angle - h.rotation.y)) * Math.min(1, dt * 12) + h.rotation.y;
            if (!still && dash > 0 && Math.random() < 0.3) burst(h.position, 0xbef1dc, 1);
          }
          var walk = moving && !still ? Math.sin(a.t * 12) * 0.5 : 0;
          W.hero.legs.forEach(function (v, i) {
            v.rotation.x = walk * (i ? -1 : 1);
          });
          W.hero.arms.forEach(function (v, i) {
            v.rotation.x = walk * (i ? 1 : -1) * 0.8;
          });
          h.position.y = moving && !still ? Math.abs(Math.sin(a.t * 12)) * 0.07 : 0;
          W.hero.cape.rotation.x = 0.17 + (moving && !still ? 0.15 : 0);
          W.shadow.position.set(h.position.x, 0.08, h.position.z);
          var fx = h.position.x + 1.7,
            fz = h.position.z + 1.9;
          W.fox.position.x += (fx - W.fox.position.x) * Math.min(1, dt * 2.5);
          W.fox.position.z += (fz - W.fox.position.z) * Math.min(1, dt * 2.5);
          W.fox.position.y = moving && !still ? Math.abs(Math.sin(a.t * 15)) * 0.15 : 0;
          W.fox.rotation.y = h.rotation.y;
          combat.tick(dt);
          var inBattle = combat.active(),
            cst = inBattle ? combat.state() : null,
            showQ = inBattle && !(cst && cst.dead);
          a.el.classList.toggle("si-battle", inBattle);
          $("#sqBar").hidden = !showQ;
          $("#sqBar").classList.toggle("wait", !!(showQ && cst && !cst.enemies));
          if (showQ && !bq) bqNext();
          if (!inBattle) bq = null;
          if (keys.j) combat.attack();
          if (a.over) return;
          var dist = Math.hypot(h.position.x - NODES[r.station].x, h.position.z - NODES[r.station].z);
          $("#siInteract").disabled = dist > 4 || modal || combat.active();
          $("#siInteract small").textContent = dist <= 4 ? "開始互動" : Math.ceil(dist) + "m";
          $("#siDash").disabled = dashCD > 0 || modal;
          $("#siDash small").textContent = dashCD > 0 ? Math.ceil(dashCD) + "s" : "衝刺";
          W.jewels.forEach(function (j, i) {
            if (r.starMask & (1 << i)) return;
            if (!still) {
              j.gem.rotation.y += dt;
              j.gem.position.y = 1.1 + Math.sin(a.t * 2 + i) * 0.17;
            }
            if (!modal && Math.hypot(h.position.x - STARS[i][0], h.position.z - STARS[i][1]) < 1.6) {
              r.starMask |= 1 << i;
              C.award(0.5);
              burst(j.gem.position, 0xffdf91);
              C.sfx("ok");
              notice("發現星砂！收藏 +1，獲得 5 分。");
              save();
              refresh();
            }
          });
          if (!still) {
            W.shrines.forEach(function (s, i) {
              s.crystal.rotation.y += dt * 0.5;
              s.crystal.position.y = 2.1 + Math.sin(a.t * 1.5 + i) * 0.12;
              s.halo.rotation.z += dt * 0.3;
            });
            W.guardian.position.y = 6.8 + Math.sin(a.t * 0.8) * 0.3;
            W.clouds.rotation.y += dt * 0.002;
            W.fireflies.rotation.y += dt * 0.009;
            W.beacon.scale.setScalar(1 + Math.sin(a.t * 2) * 0.035);
          }
          if (a.siBlast > 0) {
            a.siBlast -= dt;
            W.guardian.material.color.setHex(Math.sin(a.t * 20) > 0 ? 0xffe1bd : 0xffffff);
          } else W.guardian.material.color.setHex(0xffffff);
          for (var i = particles.length - 1; i >= 0; i--) {
            var pa = particles[i];
            pa.life -= dt * 1.5;
            pa.m.position.addScaledVector(pa.v, dt);
            pa.v.y -= dt * 5;
            pa.m.scale.setScalar(Math.max(0.01, pa.life));
            if (pa.life <= 0) {
              a.sc.remove(pa.m);
              C.disposeObject(pa.m);
              particles.splice(i, 1);
            }
          }
          var aspect = a.cam.aspect,
            cy = aspect < 0.8 ? 25 : 19,
            cz = aspect < 0.8 ? 23 : 18;
          a.cam.position.x += (h.position.x - a.cam.position.x) * Math.min(1, dt * 3);
          a.cam.position.y += (cy - a.cam.position.y) * Math.min(1, dt * 3);
          a.cam.position.z += (h.position.z + cz - a.cam.position.z) * Math.min(1, dt * 3);
          a.cam.lookAt(h.position.x, 0, h.position.z - 4);
          drawMap();
        };
        a.siState = function () {
          return {
            chapter: ch,
            station: r.station,
            step: r.step,
            bossHP: r.bossHP,
            qNumber: r.qNumber,
            defense: combat.state(),
            modal: modal,
            paused: paused,
            correct: r.correct,
            first: r.first,
            position: { x: h.position.x, z: h.position.z },
          };
        };
        if (r.bossHP <= 0 && !r.defense) combat.start();
      });
    }
    games.forEach(function (g) {
      C.impl[g.id] = function (game, o) {
        launch(game, o);
      };
    });
    var oldMenu = C.menu;
    C.setMenu(function (g) {
      oldMenu(g);
      if (g.id !== "v5word" && g.id !== "v5math") return;
      var p = profile(g),
        map = C.body().querySelector(".obmap");
      if (!map) return;
      var vs = map.querySelector("#mVs");
      if (vs) vs.remove();
      var solo = map.querySelector("#mSolo");
      chosen[g.id] = Math.min(chosen[g.id] || 0, p.unlocked - 1);
      resume[g.id] = !!p.run;
      if (solo) {
        solo.querySelector("b").textContent = p.run ? "繼續第 " + (p.run.chapter + 1) + " 章冒險" : "開始冒險";
        solo.querySelector("small").textContent = "答題就是攻擊 · 自動存檔 · 英文與數學進度分開";
      }
      map.insertAdjacentHTML(
        "afterbegin",
        '<section class="si-menu-hero"><img src="' +
          BASE +
          'star-island-keyart.webp" alt="森林、雲端鐘城與日曜古境組成的星島世界"><div><small>STAR ISLAND GUARDIANS</small><h2>' +
          E(g.zh.split("：")[1]) +
          "</h2><p>踏上星島，讓每一次學會，都成為改變世界的魔法。</p><span>3 章故事 · 答題星光砲 · 雙塔防禦 · 戰功星商店</span></div></section>",
      );
      map.insertAdjacentHTML(
        "beforeend",
        '<section class="si-chapter-select"><div class="si-section-title"><h3>你的遠征地圖</h3><span>' +
          C.grade() +
          ' 年級 · 此裝置自動存檔</span></div><div class="si-chapter-grid">' +
          CHAPTERS.map(function (ch, i) {
            var unlocked = i < p.unlocked;
            return (
              '<button data-chapter="' +
              i +
              '" aria-pressed="' +
              (i === chosen[g.id]) +
              '" ' +
              (unlocked ? "" : "disabled") +
              "><small>CHAPTER 0" +
              (i + 1) +
              "</small><b>" +
              ch.name +
              "</b><span>" +
              ("★".repeat(p.stars[i]) + "☆".repeat(3 - p.stars[i])) +
              "</span><em>" +
              (unlocked ? ["點亮森林燈塔", "重啟雲端星核", "完成守護者試煉"][i] : "完成前一章解鎖") +
              "</em></button>"
            );
          }).join("") +
          "</div>" +
          (p.run
            ? '<p class="si-resume-note">已保存：' +
              CHAPTERS[p.run.chapter].name +
              "，完成 " +
              p.run.correct +
              " 項任務。按上方「繼續」接著玩；選擇章節可重新探索。</p>"
            : "") +
          '<h3>旅人外觀</h3><div class="si-skins">' +
          SKINS.map(function (s, i) {
            return (
              '<button data-skin="' +
              i +
              '" aria-pressed="' +
              (p.skin === i) +
              '" ' +
              (i < p.unlocked ? "" : "disabled") +
              '><i style="background:#' +
              s.color.toString(16) +
              '"></i>' +
              s.name +
              (i < p.unlocked ? "" : " 🔒") +
              "</button>"
            );
          }).join("") +
          '</div><p class="si-learning-note">' +
          (g.id === "v5math"
            ? "水晶運算 → 星核密碼 → 數字橋 → 守護者試煉。沿用目前課本單元出題。"
            : "單字尋寶 → 聽力回音 → 魔法拼字 → 守護者試煉。依冒險年級調整單字。") +
          "<br>探索收藏與章節保存在本機；答題積分沿用原本的學習系統。</p></section>",
      );
      map.querySelectorAll("[data-chapter]").forEach(function (btn) {
        btn.onclick = function () {
          chosen[g.id] = +btn.dataset.chapter;
          resume[g.id] = false;
          map.querySelectorAll("[data-chapter]").forEach(function (b) {
            b.setAttribute("aria-pressed", String(b === btn));
          });
          solo.querySelector("b").textContent = "開始 " + CHAPTERS[chosen[g.id]].name;
          solo.querySelector("small").textContent = p.run ? "開始後會以新冒險取代此模式的未完成進度" : "準備好就出發！";
        };
      });
      renderShop(map, g, p);
      map.querySelectorAll("[data-skin]").forEach(function (btn) {
        btn.onclick = function () {
          p.skin = +btn.dataset.skin;
          put(g, p);
          siMut(function (si) {
            si.eq.cape = "";
          });
          renderShop(map, g, p);
          map.querySelectorAll("[data-skin]").forEach(function (b) {
            b.setAttribute("aria-pressed", String(b === btn));
          });
          C.sfx("tap");
        };
      });
    });
    function renderShop(map, g, p) {
      var old = map.querySelector(".si-shop");
      if (old) old.remove();
      if (!C.kidData || !C.kidData()) return;
      var si = siData(),
        wdN = si.wd.d === today() ? si.wd.n | 0 : 0;
      function item(key, name, cost, owned, equipped, extra) {
        var btn = owned
          ? equipped
            ? '<button class="on" disabled>裝備中</button>'
            : extra === "garden"
              ? '<button disabled>已兌換</button>'
              : '<button data-eq="' + key + '">裝備</button>'
          : '<button data-buy="' + key + '" data-cost="' + cost + '"' + (si.m < cost ? " disabled" : "") + ">★ " + cost + " 兌換</button>";
        return '<div class="si-shop-item">' + extra2(key) + "<b>" + E(name) + "</b>" + btn + "</div>";
      }
      function extra2(key) {
        var c = CAPES.filter(function (x) {
            return "cape_" + x.id === key;
          })[0],
          t = TOWER_STYLES.filter(function (x) {
            return "tower_" + x.id === key;
          })[0],
          gi = GARDEN_ITEMS.filter(function (x) {
            return x.id === key;
          })[0];
        if (c) return '<i class="sw" style="background:#' + ("00000" + c.color.toString(16)).slice(-6) + '"></i>';
        if (t) return '<i class="sw' + (t.color < 0 ? " rb" : "") + '"' + (t.color > 0 ? ' style="background:#' + t.color.toString(16) + '"' : "") + "></i>";
        if (gi) return '<img src="' + gi.img + '" alt="">';
        return "";
      }
      var html =
        '<section class="si-shop"><div class="si-section-title"><h3>★ 戰功星商店</h3><span class="si-merit">★ ' +
        si.m +
        "<small>累積 " +
        si.tot +
        "</small></span></div>" +
        '<p class="si-shop-tip">守護戰打倒怪物得到戰功星：迷霧怪 +1（星光砲打倒 +2）、飛翼怪／護甲怪 +3、迷霧巨像 +10、燈塔完美守護 +5。</p>' +
        '<div class="si-water"><span>💧 兌換：每 ' +
        WATER_RATE +
        " ★ 換 1 滴水（今天 " +
        wdN +
        "/" +
        WATER_DAY_MAX +
        '）</span><button id="siWater"' +
        (si.m < WATER_RATE || wdN >= WATER_DAY_MAX ? " disabled" : "") +
        ">換 1 💧</button></div>" +
        "<h4>旅人披風</h4><div class=\"si-shop-grid\">" +
        CAPES.map(function (c) {
          return item("cape_" + c.id, c.name, c.cost, !!si.own["cape_" + c.id], si.eq.cape === c.id);
        }).join("") +
        "</div><h4>防禦塔外觀</h4><div class=\"si-shop-grid\">" +
        '<div class="si-shop-item"><i class="sw" style="background:#ffdb89"></i><b>原本的星晶塔</b>' +
        (si.eq.tower ? '<button data-eq="tower_">裝備</button>' : '<button class="on" disabled>裝備中</button>') +
        "</div>" +
        TOWER_STYLES.map(function (t) {
          return item("tower_" + t.id, t.name, t.cost, !!si.own["tower_" + t.id], si.eq.tower === t.id);
        }).join("") +
        "</div><h4>花園魔法裝飾</h4><div class=\"si-shop-grid\">" +
        GARDEN_ITEMS.map(function (x) {
          return item(x.id, x.name, x.cost, !!si.own[x.id], false, "garden");
        }).join("") +
        '</div><p class="si-shop-tip">花園裝飾兌換後，到「我的花園」→「✨ 魔法」就能免費擺放。</p>' +
        "<h4>怪物圖鑑" +
        (si.own.hunter ? ' <em class="si-badge">🏅 迷霧獵人</em>' : "") +
        '</h4><div class="si-bestiary">' +
        MONSTERS.map(function (m, i) {
          var nn = si.bk[i] | 0;
          return '<div class="' + (nn ? "seen" : "") + '"><b>' + (nn ? m.name : "？？？") + "</b><small>" + (nn ? m.note + " · 打倒 " + nn + " 隻" : "還沒遇過") + "</small></div>";
        }).join("") +
        '</div><p class="si-shop-tip">四種怪物都打倒過，就能得到「迷霧獵人」徽章和 10 ★。</p></section>';
      var anchor = map.querySelector(".si-chapter-select");
      if (anchor) anchor.insertAdjacentHTML("afterend", html);
      else map.insertAdjacentHTML("beforeend", html);
      var box = map.querySelector(".si-shop");
      box.querySelectorAll("[data-buy]").forEach(function (b) {
        b.onclick = function () {
          var key = b.dataset.buy,
            cost = +b.dataset.cost,
            ok = false;
          siMut(function (x) {
            if (x.m >= cost && !x.own[key]) {
              x.m -= cost;
              x.own[key] = 1;
              if (key.indexOf("cape_") === 0) x.eq.cape = key.slice(5);
              if (key.indexOf("tower_") === 0) x.eq.tower = key.slice(6);
              ok = true;
            }
          });
          if (ok) {
            C.sfx("win");
            C.toast(key.indexOf("si") === 0 ? "兌換成功！到花園的「✨ 魔法」放上去吧！" : "兌換成功，已經幫你裝備！", "ok");
          }
          renderShop(map, g, p);
        };
      });
      box.querySelectorAll("[data-eq]").forEach(function (b) {
        b.onclick = function () {
          var key = b.dataset.eq;
          siMut(function (x) {
            if (key.indexOf("cape_") === 0) x.eq.cape = key.slice(5);
            if (key.indexOf("tower_") === 0) x.eq.tower = key.slice(6);
          });
          C.sfx("tap");
          renderShop(map, g, p);
        };
      });
      var w = box.querySelector("#siWater");
      if (w)
        w.onclick = function () {
          var ok = false;
          siMut(function (x, k) {
            if (x.wd.d !== today()) x.wd = { d: today(), n: 0 };
            if (x.m >= WATER_RATE && x.wd.n < WATER_DAY_MAX) {
              x.m -= WATER_RATE;
              x.wd.n++;
              k.water = (k.water || 0) + 1;
              ok = true;
            }
          });
          if (ok) {
            C.sfx("win");
            C.toast("換到 1 💧！可以去花園澆水。", "ok");
          }
          renderShop(map, g, p);
        };
    }
    var home = C.getHome();
    C.setHome(function () {
      home();
      document.querySelectorAll('.gcard[data-game-id="v5word"],.gcard[data-game-id="v5math"]').forEach(function (card) {
        card.classList.add("si-game-card");
        card.parentNode.prepend(card);
        var icon = card.querySelector(".ico");
        if (icon) icon.innerHTML = '<img src="' + BASE + 'star-island-keyart.webp" alt="" loading="lazy">';
        var p = profile({ id: card.dataset.gameId });
        var ft = card.querySelector(".ft");
        if (ft && !ft.querySelector(".si-card-progress"))
          ft.insertAdjacentHTML(
            "beforeend",
            '<span class="si-card-progress">遠征 ' +
              p.unlocked +
              "/3 章 · " +
              p.stars.reduce(function (a, b) {
                return a + b;
              }, 0) +
              "/9 星</span>",
          );
      });
    });
    global.StarIslandGuardians = {
      version: "7.0.0",
      games: games.map(function (g) {
        return g.id;
      }),
      chapters: CHAPTERS.map(function (c) {
        return c.name;
      }),
    };
  };
})(window);
