/* Inside OB's closure. This layer never changes persistence or network contracts. */
function english25Context(){return {T:T,speak:speak,art:function(w){var src=V3_WORDS[w[0]]||SIMG[w[0]];if(!src){var key=DN_IDS.filter(function(k){return DN_F[k][0]===w[0]})[0];if(key)src=DNP[key]}return src||''}}}
if(window.English25){
 var e25SceneBefore=v3ArcScene;v3ArcScene=function(a,id){e25SceneBefore(a,id);if(a.v25)English25.decorate(a)};
 var e25EndBefore=arcEnd;arcEnd=function(a,o){e25EndBefore(a,o);if(a.v25)English25.result(a)};
 var e25MenuBefore=menu;menu=function(g){e25MenuBefore(g);if(g.id!=='tower'&&g.id!=='shoot')return;var cover=gBody.querySelector('.v3-cover');if(g.id==='shoot'&&cover)cover.style.backgroundImage='linear-gradient(transparent,#102e55bd),url(assets/v25/carnival-wide.webp)';var solo=$('#mSolo .nm b'),detail=$('#mSolo .nm small'),tip=gBody.querySelector('.obtip');if(solo)solo.textContent=g.id==='tower'?'雲端登塔 · 小機陪練':'魔法嘉年華 · 三段挑戰';if(detail)detail.textContent=g.id==='tower'?'每四層一個檢查點，逐步挑戰完整拼字':'看字找圖、聽音辨識、看圖選英文';if(tip)tip.textContent=g.id==='tower'?'自己玩：補一個字母、補兩個字母，再挑戰完整拼字；第 4、8 層有檢查點，小機陪練不倒數。連對三題取得護盾。雙人連線保留先到 12 層的競速玩法。':'點氣球發射魔法泡泡，也能用鍵盤 Tab 選擇目標、Enter 發射。先看字找圖，再聽音選圖，最後看圖辨認英文；需要時可以重聽或查看提示。';};
 GAMES.forEach(function(g){if(g.id==='tower'){g.d='雲端魔法塔、三段拼字挑戰、每四層一個檢查點。';g.how='單人小機陪練，逐步從缺字母挑戰完整拼字；雙人連線競速登頂。';}if(g.id==='shoot'){g.d='進入魔法嘉年華，挑戰看字、聽音與看圖辨字。';g.how='點氣球發射泡泡；需要時可重聽英文、看提示，三段挑戰逐步進階。';}});
}
