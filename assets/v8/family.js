/* 奇蹟知識島 v8 — 真實獎勵兌換＋萬聖節活動。
   由主程式呼叫 window.FamilyFactory(F) 接上 Store／帳號／畫面。資料存在角色資料 k.rd（兌換）與 k.hw（萬聖節糖果），會跟著雲端同步。 */
(function (global) {
  "use strict";
  var V8 = "assets/v8/";
  var REWARDS = [
    { id: "game", zh: "30 分鐘手機遊戲", cost: 2000, daily: 3, img: V8 + "rw-game.svg", rule: "自己兌換 · 每天最多 3 次" },
    { id: "mcd", zh: "麥當勞", cost: 50000, approve: true, img: V8 + "rw-burger.svg", rule: "申請後要爸爸媽媽同意" },
    { id: "hotpot", zh: "小火鍋", cost: 80000, approve: true, img: V8 + "rw-hotpot.svg", rule: "申請後要爸爸媽媽同意" },
  ];
  /* 萬聖節：每年 10/16～10/31 */
  var HW = { m: 10, from: 16, to: 31, need: 7 };

  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }
  function today() {
    var d = new Date();
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }
  function hhmm(t) {
    var d = new Date(t);
    return pad(d.getHours()) + ":" + pad(d.getMinutes());
  }
  function mmdd(t) {
    var d = new Date(t);
    return d.getMonth() + 1 + "/" + d.getDate();
  }
  function fmt(n) {
    return String(Math.floor(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function hwActive(d) {
    d = d || new Date();
    return d.getMonth() + 1 === HW.m && d.getDate() >= HW.from && d.getDate() <= HW.to;
  }
  function normRD(raw) {
    var r = raw && typeof raw === "object" ? JSON.parse(JSON.stringify(raw)) : {};
    r.sp = Math.max(0, Math.floor(Number(r.sp) || 0));
    /* e：新版上線後才開始累積的「兌換點數」，跟總分分開 */
    r.e = Math.max(0, Math.floor(Number(r.e) || 0));
    if (!r.gd || typeof r.gd !== "object") r.gd = { d: "", n: 0 };
    if (!Array.isArray(r.log)) r.log = [];
    return r;
  }
  function normHW(raw) {
    var h = raw && typeof raw === "object" ? JSON.parse(JSON.stringify(raw)) : {};
    h.c = Math.max(0, Number(h.c) | 0);
    if (!h.days || typeof h.days !== "object") h.days = {};
    return h;
  }

  global.FamilyFactory = function (F) {
    var E = F.esc,
      confirmKey = "";
    function kid(id) {
      return F.Store.kid(id) || {};
    }
    function pending(r) {
      return r.log.filter(function (x) {
        return x.st === "wait";
      });
    }
    function balance(id) {
      var k = kid(id),
        r = normRD(k.rd),
        hold = pending(r).reduce(function (a, x) {
          return a + x.c;
        }, 0);
      return Math.max(0, r.e - r.sp - hold);
    }
    var DEF = { game: 2000, daily: 3, mcd: 50000, hotpot: 80000 };
    function cfg() {
      var c = null;
      F.KIDS().some(function (K) {
        var r = kid(K.id).rd;
        if (r && r.cfg && typeof r.cfg === "object") {
          c = r.cfg;
          return true;
        }
      });
      var o = {};
      Object.keys(DEF).forEach(function (k) {
        var v = c ? Math.floor(Number(c[k])) : NaN;
        o[k] = v > 0 ? v : DEF[k];
      });
      o.daily = Math.min(10, o.daily);
      return o;
    }
    function applyCfg() {
      var c = cfg();
      REWARDS[0].cost = c.game;
      REWARDS[0].daily = c.daily;
      REWARDS[0].rule = "自己兌換 · 每天最多 " + c.daily + " 次";
      REWARDS[1].cost = c.mcd;
      REWARDS[2].cost = c.hotpot;
      return c;
    }
    /* 每次加分時，同時累積兌換點數（只算新版上線之後賺到的分數） */
    function earnHook(name) {
      var orig = F.Store[name];
      if (typeof orig !== "function") return;
      F.Store[name] = function (id) {
        var k0 = F.Store.kid(id),
          before = k0 ? Number(k0.pts) || 0 : 0;
        var out = orig.apply(this, arguments);
        var k1 = F.Store.kid(id),
          diff = k1 ? (Number(k1.pts) || 0) - before : 0;
        if (diff > 0)
          F.Store.mut(id, function (k) {
            var r = normRD(k.rd);
            r.e += Math.round(diff);
            if (!r.since) r.since = today();
            k.rd = r;
          });
        return out;
      };
    }
    earnHook("award");
    earnHook("finishGame");
    function gameToday(r) {
      return r.gd.d === today() ? r.gd.n | 0 : 0;
    }
    function mutRD(id, fn) {
      var out;
      F.Store.mut(id, function (k) {
        var r = normRD(k.rd);
        out = fn(r, k);
        if (r.log.length > 40) r.log = r.log.slice(-40);
        k.rd = r;
      });
      return out;
    }
    function redeem(id, it) {
      applyCfg();
      var R = REWARDS.filter(function (x) {
        return x.id === it;
      })[0];
      if (!R) return "";
      if (balance(id) < R.cost) return "點數還不夠喔！再玩幾局就有了！";
      return (
        mutRD(id, function (r) {
          if (R.daily) {
            if (r.gd.d !== today()) r.gd = { d: today(), n: 0 };
            if (r.gd.n >= R.daily) return "今天已經換了 " + R.daily + " 次，明天再來！";
            r.gd.n++;
            r.sp += R.cost;
            r.log.push({ id: Date.now().toString(36), t: Date.now(), it: it, c: R.cost, st: "ok", sn: 1 });
            return "ok";
          }
          if (pending(r).some(function (x) {
            return x.it === it;
          }))
            return "已經申請過了，等爸爸媽媽同意喔！";
          r.log.push({ id: Date.now().toString(36), t: Date.now(), it: it, c: R.cost, st: "wait" });
          return "wait";
        }) || ""
      );
    }
    function decide(id, lid, ok) {
      mutRD(id, function (r) {
        r.log.forEach(function (x) {
          if (x.id === lid && x.st === "wait") {
            x.st = ok ? "ok" : "no";
            x.dt = Date.now();
            if (ok) r.sp += x.c;
          }
        });
      });
    }
    function cancel(id, lid) {
      mutRD(id, function (r) {
        r.log = r.log.filter(function (x) {
          return !(x.id === lid && x.st === "wait");
        });
      });
    }
    function rname(it) {
      var R = REWARDS.filter(function (x) {
        return x.id === it;
      })[0];
      return R ? R.zh : it;
    }

    /* ---------- 小朋友：兌換面板 ---------- */
    function kidPanel(id) {
      applyCfg();
      var k = kid(id),
        r = normRD(k.rd),
        bal = balance(id),
        g = gameToday(r),
        h = '<section class="fm-rw" id="fmRw"><button class="fm-back" id="fmBack">← 上一頁</button><div class="fm-head"><h2>🎁 獎勵兌換</h2><div class="fm-bal"><small>可用點數</small><b>' + fmt(bal) + "</b></div></div>";
      h +=
        '<p class="fm-note">兌換點數從 ' +
        (r.since ? r.since.slice(5).replace("-", "/") : "今天") +
        " 開始累積：累積 " +
        fmt(r.e) +
        " · 已兌換 " +
        fmt(r.sp) +
        "。總分 " +
        fmt(k.pts || 0) +
        " 不會因為兌換而變少，排行榜照舊。</p>";
      h += '<div class="fm-cards">';
      REWARDS.forEach(function (R) {
        var wait = pending(r).filter(function (x) {
            return x.it === R.id;
          })[0],
          lack = bal < R.cost,
          capped = R.daily && g >= R.daily,
          pct = Math.min(100, Math.round((bal / R.cost) * 100)),
          btn;
        if (wait) btn = '<span class="fm-wait">⏳ 等爸爸媽媽同意中</span><button class="fm-sub" data-cancel="' + wait.id + '">取消申請</button>';
        else if (confirmKey === R.id)
          btn = '<div class="fm-confirm"><span>確定用 ' + fmt(R.cost) + " 點換嗎？</span><button class=\"fm-yes\" data-yes=\"" + R.id + '">確定</button><button class="fm-sub" data-no="1">取消</button></div>';
        else
          btn =
            '<button class="fm-go" data-rw="' +
            R.id +
            '"' +
            (lack || capped ? " disabled" : "") +
            ">" +
            (capped ? "今天換完了" : lack ? "還差 " + fmt(R.cost - bal) + " 點" : R.approve ? "申請兌換" : "兌換") +
            "</button>";
        h +=
          '<div class="fm-card' +
          (lack ? "" : " ready") +
          '"><img src="' +
          R.img +
          '" alt=""><div class="fm-info"><b>' +
          E(R.zh) +
          "</b><span>" +
          fmt(R.cost) +
          " 點 · " +
          E(R.rule) +
          (R.daily ? "（今天 " + g + "/" + R.daily + "）" : "") +
          '</span><i class="fm-bar"><em style="width:' +
          pct +
          '%"></em></i>' +
          btn +
          "</div></div>";
      });
      h += "</div>";
      var tickets = r.log.filter(function (x) {
        return x.it === "game" && x.st === "ok" && new Date(x.t).toDateString() === new Date().toDateString();
      });
      if (tickets.length)
        h +=
          '<div class="fm-tickets"><b>今天的手機時間券</b>' +
          tickets
            .map(function (x, i) {
              return '<span class="fm-ticket">🎟️ 第 ' + (i + 1) + " 張 · " + hhmm(x.t) + " 兌換 · 30 分鐘</span>";
            })
            .join("") +
          "</div>";
      var hist = r.log
        .filter(function (x) {
          return x.it !== "game";
        })
        .slice(-5)
        .reverse();
      if (hist.length)
        h +=
          '<div class="fm-hist"><b>大獎紀錄</b>' +
          hist
            .map(function (x) {
              return "<span>" + mmdd(x.t) + " " + E(rname(x.it)) + " · " + (x.st === "ok" ? "✅ 爸爸媽媽同意了" : x.st === "no" ? "這次先不行" : "⏳ 等待同意") + "</span>";
            })
            .join("") +
          "</div>";
      return h + "</section>";
    }
    function wireKid(el, id) {
      var back = el.querySelector("#fmBack");
      if (back)
        back.onclick = function () {
          F.sfx("tap");
          F.showTab("game");
        };
      el.querySelectorAll("[data-rw]").forEach(function (b) {
        b.onclick = function () {
          F.sfx("tap");
          confirmKey = b.dataset.rw;
          F.getRec()();
        };
      });
      el.querySelectorAll("[data-no]").forEach(function (b) {
        b.onclick = function () {
          confirmKey = "";
          F.getRec()();
        };
      });
      el.querySelectorAll("[data-yes]").forEach(function (b) {
        b.onclick = function () {
          var it = b.dataset.yes,
            res = redeem(id, it);
          confirmKey = "";
          if (res === "ok") {
            F.sfx("win");
            F.confetti(null, 40);
            F.say("兌換成功！可以玩 30 分鐘手機遊戲，記得時間到要休息眼睛喔！", "happy");
          } else if (res === "wait") {
            F.sfx("ok");
            F.say("已經送出申請！等爸爸媽媽在家長區同意就可以了！", "happy");
          } else if (res) F.say(res, "oops");
          F.getRec()();
        };
      });
      el.querySelectorAll("[data-cancel]").forEach(function (b) {
        b.onclick = function () {
          cancel(id, b.dataset.cancel);
          F.getRec()();
        };
      });
    }

    /* ---------- 家長：審核面板 ---------- */
    function parentPanel() {
      var rows = [],
        todayRows = [];
      F.KIDS().forEach(function (K) {
        var r = normRD(kid(K.id).rd);
        pending(r).forEach(function (x) {
          rows.push({ K: K, x: x });
        });
        var gs = r.log.filter(function (x) {
          return x.it === "game" && x.st === "ok" && new Date(x.t).toDateString() === new Date().toDateString();
        });
        todayRows.push(
          "<span>" +
            E(K.short) +
            "：今天換了 " +
            gs.length +
            " 次手機時間" +
            (gs.length
              ? "（" +
                gs
                  .map(function (x) {
                    return hhmm(x.t);
                  })
                  .join("、") +
                "）"
              : "") +
            " · 可用 " +
            fmt(balance(K.id)) +
            " 點</span>",
        );
      });
      var h = '<section class="fm-rw fm-parent"><div class="fm-head"><h2>🎁 獎勵兌換審核</h2>' + (rows.length ? '<span class="fm-dot">' + rows.length + " 件待同意</span>" : "") + "</div>";
      if (!rows.length) h += '<p class="fm-note">目前沒有等待同意的申請。</p>';
      rows.forEach(function (o) {
        h +=
          '<div class="fm-req"><b>' +
          E(o.K.short) +
          "</b> 想兌換 <b>" +
          E(rname(o.x.it)) +
          "</b>（" +
          fmt(o.x.c) +
          " 點 · " +
          mmdd(o.x.t) +
          " " +
          hhmm(o.x.t) +
          '）<div><button class="fm-yes" data-ok="' +
          o.K.id +
          "|" +
          o.x.id +
          '">同意</button><button class="fm-sub" data-deny="' +
          o.K.id +
          "|" +
          o.x.id +
          '">這次先不行</button></div></div>';
      });
      h += '<div class="fm-today">' + todayRows.join("") + "</div>";
      var c = applyCfg();
      h +=
        '<p class="fm-note">規則：' +
        fmt(c.game) +
        " 點換 30 分鐘手機遊戲（孩子自己兌換，每天最多 " +
        c.daily +
        " 次）；麥當勞 " +
        fmt(c.mcd) +
        " 點、小火鍋 " +
        fmt(c.hotpot) +
        " 點需要家長同意。同意後才扣點數，不同意不扣。兌換點數只算新版上線後賺到的分數，跟總分分開。</p>";
      h +=
        '<details class="fm-cfg"><summary>⚙️ 修改兌換門檻</summary><div class="fm-cfg-grid">' +
        [
          ["game", "手機遊戲 30 分鐘（點）"],
          ["daily", "手機遊戲每天最多（次）"],
          ["mcd", "麥當勞（點）"],
          ["hotpot", "小火鍋（點）"],
        ]
          .map(function (x) {
            return '<label><span>' + x[1] + '</span><input type="number" inputmode="numeric" min="1" data-cfg="' + x[0] + '" value="' + c[x[0]] + '"></label>';
          })
          .join("") +
        '</div><button class="fm-yes" id="fmCfgSave">儲存門檻</button><span class="fm-cfg-msg" id="fmCfgMsg"></span></details>';
      return h;
    }
    function wireParent(el) {
      var save = el.querySelector("#fmCfgSave");
      if (save)
        save.onclick = function () {
          var c = {},
            root = save.closest(".fm-rw") || document;
          root.querySelectorAll("[data-cfg]").forEach(function (inp) {
            var v = Math.floor(Number(inp.value));
            c[inp.dataset.cfg] = v > 0 ? v : DEF[inp.dataset.cfg];
          });
          c.daily = Math.min(10, c.daily);
          F.KIDS().forEach(function (K) {
            F.Store.mut(K.id, function (k) {
              var r = normRD(k.rd);
              r.cfg = c;
              k.rd = r;
            });
          });
          F.sfx("ok");
          var m = root.querySelector("#fmCfgMsg");
          if (m) m.textContent = "已儲存！";
        };
      el.querySelectorAll("[data-ok],[data-deny]").forEach(function (b) {
        b.onclick = function () {
          var v = (b.dataset.ok || b.dataset.deny).split("|");
          decide(v[0], v[1], !!b.dataset.ok);
          F.sfx(b.dataset.ok ? "win" : "tap");
          var inRank = F.PANELS.rank && !F.PANELS.rank.hidden;
          if (inRank && F.getRank) F.getRank()();
          else F.getRec()();
          badge();
        };
      });
    }

    var oldRec = F.getRec();
    F.setRec(function () {
      oldRec.apply(this, arguments);
      var el = F.PANELS.rec,
        who = F.who();
      if (!el) return;
      var box = document.createElement("div");
      if (who === "parent") {
        box.innerHTML = parentPanel();
        wireParent(box);
      } else if (F.isKid()) {
        box.innerHTML = kidPanel(who);
        wireKid(box, who);
        candyCheck();
      } else return;
      var h2 = el.querySelector("h2.h");
      if (h2 && h2.nextSibling) el.insertBefore(box.firstChild, h2.nextSibling);
      else el.prepend(box.firstChild);
    });

    function pendingCount() {
      return F.KIDS().reduce(function (a, K) {
        return a + pending(normRD(kid(K.id).rd)).length;
      }, 0);
    }
    function badge() {
      var t = document.getElementById("tab_rec");
      if (t) t.classList.toggle("fm-badge", F.who() === "parent" && pendingCount() > 0);
    }
    if (F.getRank) {
      var oldRank = F.getRank();
      F.setRank(function () {
        oldRank.apply(this, arguments);
        badge();
        var el = F.PANELS.rank;
        if (!el || F.who() !== "parent" || !pendingCount()) return;
        var box = document.createElement("div");
        box.innerHTML = parentPanel();
        wireParent(box);
        el.prepend(box.firstChild);
      });
    }
    F.Store.sub &&
      F.Store.sub(function () {
        badge();
      });

    /* ---------- 萬聖節 ---------- */
    function candyCheck() {
      if (!F.isKid() || !hwActive()) return;
      var who = F.who(),
        k = kid(who),
        d = k.day,
        t = today(),
        hw = normHW(k.hw);
      if (!d || !d.done || hw.days[t]) return;
      /* 今天的每日任務全部完成 → 1 顆糖果 */
      if (d.d && d.d !== t) return;
      var got = 0;
      F.Store.mut(who, function (kk) {
        var h = normHW(kk.hw);
        if (h.days[t]) return;
        h.days[t] = 1;
        h.c++;
        got = h.c;
        kk.hw = h;
      });
      if (got) {
        setTimeout(function () {
          F.sfx("win");
          F.confetti(null, 30);
          F.say(got >= HW.need ? "萬聖節糖果集滿 " + HW.need + " 顆！南瓜燈和小幽靈已經送到花園的「✨ 魔法」了！" : "完成今天的任務，得到 1 顆萬聖節糖果！（" + got + "/" + HW.need + "）", "happy");
        }, 1200);
      }
    }
    function candyRow(n) {
      var s = "";
      for (var i = 0; i < HW.need; i++) s += '<img class="' + (i < n ? "on" : "") + '" src="' + V8 + 'hw-candy.svg" alt="">';
      return s;
    }
    function hwBanner() {
      if (!hwActive() || !F.isKid()) return "";
      var hw = normHW(kid(F.who()).hw),
        left = HW.to - new Date().getDate();
      return (
        '<button class="hw-pill" id="hwPill" title="每天完成任務拿 1 顆糖果，集滿 ' +
        HW.need +
        ' 顆換花園限定的南瓜燈＋小幽靈"><img src="' +
        V8 +
        'hw-pumpkin.svg" alt=""><span>萬聖節糖果 <b>' +
        Math.min(hw.c, HW.need) +
        "/" +
        HW.need +
        "</b><small>" +
        (left > 0 ? "還有 " + left + " 天" : "最後一天") +
        "</small></span></button>"
      );
    }
    function rewardChip() {
      if (!F.isKid()) return "";
      var b = balance(F.who()),
        r = normRD(kid(F.who()).rd),
        wait = pending(r).length;
      return '<button class="fm-chip" id="fmChip"><img src="' + V8 + 'rw-game.svg" alt=""><span>獎勵兌換 <b>' + fmt(b) + "</b> 點" + (wait ? " · ⏳" + wait : "") + "</span></button>";
    }
    var oldHome = F.getHome();
    F.setHome(function () {
      oldHome.apply(this, arguments);
      document.body.classList.toggle("ev-hw", hwActive());
      var day = document.getElementById("dayBox");
      document.querySelectorAll(".fm-row").forEach(function (x) {
        x.remove();
      });
      if (!day || day.hidden) return;
      day.insertAdjacentHTML("afterend", '<div class="fm-row">' + rewardChip() + hwBanner() + "</div>");
      var pill = document.getElementById("hwPill");
      if (pill)
        pill.onclick = function () {
          F.sfx("tap");
          F.say("萬聖節週：每天把今日任務全部完成，就得到 1 顆糖果！集滿 " + HW.need + " 顆，花園「✨ 魔法」會出現南瓜燈和小幽靈。英文遊戲也會出現 pumpkin、bat、witch 等萬聖節單字喔！", "happy");
        };
      var chip = document.getElementById("fmChip");
      if (chip)
        chip.onclick = function () {
          F.sfx("tap");
          F.showTab("rec");
        };
      candyCheck();
      /* 家長同意後，小朋友下次打開會收到通知 */
      if (F.isKid()) {
        var who = F.who(),
          r = normRD(kid(who).rd),
          fresh = r.log.filter(function (x) {
            return x.it !== "game" && x.st !== "wait" && !x.sn;
          });
        if (fresh.length) {
          var x = fresh[fresh.length - 1];
          mutRD(who, function (rr) {
            rr.log.forEach(function (y) {
              if (y.st !== "wait") y.sn = 1;
            });
          });
          setTimeout(function () {
            if (x.st === "ok") {
              F.sfx("win");
              F.confetti(null, 50);
              F.say("爸爸媽媽同意了！可以去吃「" + rname(x.it) + "」囉！🎉", "happy");
            } else F.say("「" + rname(x.it) + "」這次爸爸媽媽說先不行，點數有退回，下次再試試！", "oops");
          }, 900);
        }
      }
    });
    if (hwActive()) document.body.classList.add("ev-hw");
    global.MiracleFamily = { balance: balance, hwActive: hwActive, REWARDS: REWARDS };
  };
  /* 萬聖節單字（主程式在活動期間加入題庫） */
  global.MiracleHalloweenWords = [
    ["pumpkin", "🎃", "南瓜", 1],
    ["bat", "🦇", "蝙蝠", 1],
    ["witch", "🧙", "女巫", 1],
    ["spider", "🕷️", "蜘蛛", 1],
    ["mask", "🎭", "面具", 1],
    ["broom", "🧹", "掃把", 1],
  ];
  global.MiracleHalloweenPool = ["pumpkin", "bat", "witch", "spider", "mask", "broom", "ghost", "candy", "moon"];
  global.MiracleHalloweenActive = function () {
    var d = new Date();
    return d.getMonth() + 1 === 10 && d.getDate() >= 16 && d.getDate() <= 31;
  };
})(window);
