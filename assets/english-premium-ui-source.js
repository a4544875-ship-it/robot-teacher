/* Outer application integration for English Premium v3.0. */
(function(){
  var descriptions={obby:'四個立體世界、漂浮島、柔光角色與魔法傳送門，穿越單字冒險。',diner:'多桌點餐、數量與顏色、熱食製作、內用／外帶／外送，經營自己的餐廳。',tower:'登上雲端魔法城堡！連對三題獲得護盾，補上字母搭電梯。',shoot:'嘉年華氣球靶場，精緻單字圖、泡泡發射與連擊小費挑戰。'};
  Object.keys(descriptions).forEach(function(id){var g=GAMES.filter(function(x){return x.id===id})[0];if(g){g.d=descriptions[id];g.tag='精緻版'}});
  var art={obby:'island',diner:'diner',tower:'tower',shoot:'shoot'},previous=renderGameHome;
  renderGameHome=function(){previous();var banner=document.querySelector('.v2welcome');if(banner){var small=banner.querySelector('small');if(small)small.textContent='ENGLISH PREMIUM · 3.0'}var upd=document.querySelector('.gupd');if(upd)upd.textContent='新版 3.0 · 英文四款精緻改版 + v2 八款新冒險';
    document.querySelectorAll('.gcard[data-game-id]').forEach(function(card){var id=card.dataset.gameId;if(!art[id])return;card.classList.add('v3-card');var icon=card.querySelector('.ico');if(icon)icon.innerHTML='<img src="assets/adventure-'+art[id]+'.webp" alt="" loading="lazy">'});
  };
  window.MiracleEnglishPremium={version:'3.0.0',games:Object.keys(descriptions)};
})();
