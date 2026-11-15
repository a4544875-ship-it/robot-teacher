/* Presentation helpers only: retain the original buttons, handlers and data. */
(function () {
  'use strict';
  var media = window.matchMedia('(max-width: 1100px)');
  var subjects = {
    en: ['英文', '單字與拼字', '魔法書島'],
    math: ['數學', '數字與解謎', '水晶數字島'],
    sci: ['自然', '觀察與實驗', '自然探險島'],
    soc: ['社會', '生活與家鄉', '家鄉故事島']
  };
  var dayExpanded = false;
  var currentChild = '';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  function subjectButtons(gates) {
    gates.querySelectorAll('button[data-go]').forEach(function (button) {
      var id = button.dataset.go, subject = subjects[id];
      if (!subject || button.dataset.magicReady) return;
      button.dataset.magicReady = 'true';
      button.dataset.magicSubject = id;
      var image = button.querySelector('img');
      if (image) {
        var picture = document.createElement('picture');
        picture.className = 'magic-subject-art';
        var source = document.createElement('source');
        source.media = '(max-width: 1100px)';
        source.srcset = 'assets/mobile-magic/island-' + id + '.webp';
        image.parentNode.insertBefore(picture, image);
        picture.appendChild(source);
        picture.appendChild(image);
        image.decoding = 'async';
      }
      var title = document.createElement('span');
      title.className = 'magic-subject-title';
      title.setAttribute('aria-hidden', 'true');
      title.innerHTML = '<strong>' + subject[0] + '</strong><small>' + subject[1] + '</small><i>探索 <span>›</span></i>';
      button.appendChild(title);
    });
  }

  function home(state) {
    if (currentChild !== state.name) {
      currentChild = state.name;
      dayExpanded = false;
      var previousDay = document.querySelector('#dayBox .magic-day');
      if (previousDay && media.matches) previousDay.open = false;
    }
    var gates = document.getElementById('gatesBox');
    if (!gates) return;
    subjectButtons(gates);
    if (!gates.querySelector('.magic-welcome')) {
      var welcome = document.createElement('div');
      welcome.className = 'magic-welcome';
      welcome.innerHTML = '<span class="magic-brand">MAGICAL LEARNING ADVENTURE</span><h2>奇蹟知識島</h2><p>今天，一起發現新的小奇蹟。</p>';
      gates.prepend(welcome);
    }
    var hero = document.getElementById('heroBox');
    if (hero && subjects[state.subject]) {
      hero.dataset.magicSubject = state.subject;
      var heroIcon = document.getElementById('heroIco');
      if (heroIcon && !heroIcon.querySelector('.magic-hero-image')) {
        var art = document.createElement('img');
        art.className = 'magic-hero-image';
        art.src = 'assets/mobile-magic/island-' + state.subject + '.webp';
        art.alt = '';
        heroIcon.appendChild(art);
      }
    }
    var cards = document.querySelectorAll('#games .gcard');
    cards.forEach(function (card) {
      if (card.dataset.gameId === 'mboss') {
        var dragonImage = card.querySelector('.ico img');
        if (dragonImage && dragonImage.parentNode.tagName !== 'PICTURE') {
          var dragonPicture = document.createElement('picture');
          dragonPicture.className = 'magic-subject-art';
          var dragonSource = document.createElement('source');
          dragonSource.media = '(max-width: 1100px)';
          dragonSource.srcset = 'assets/mobile-magic/scene-dragon.webp';
          dragonImage.parentNode.insertBefore(dragonPicture, dragonImage);
          dragonPicture.appendChild(dragonSource);
          dragonPicture.appendChild(dragonImage);
        }
      }
      if (card.querySelector('.magic-play')) return;
      var affordance = document.createElement('span');
      affordance.className = 'magic-play';
      affordance.setAttribute('aria-hidden', 'true');
      affordance.innerHTML = '開始冒險 <b>›</b>';
      var text = card.querySelector('.ft');
      if (text) text.appendChild(affordance);
    });
    day();
  }

  function supportArt(box) {
    [['dyGdn','garden-entry'],['dyTown','town-entry']].forEach(function (entry) {
      var button = box.querySelector('#' + entry[0]);
      if (!button || button.querySelector('picture')) return;
      var image = button.querySelector('img');
      if (!image) return;
      var picture = document.createElement('picture');
      picture.className = 'magic-support-art';
      var source = document.createElement('source');
      source.media = '(max-width: 1100px)';
      source.srcset = 'assets/mobile-magic/' + entry[1] + '.webp';
      image.parentNode.insertBefore(picture, image);
      picture.appendChild(source);picture.appendChild(image);
      var arrow = document.createElement('span');
      arrow.className = 'magic-support-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent = '›';
      button.appendChild(arrow);
    });
  }
  function day() {
    var box = document.getElementById('dayBox');
    if (!box || box.hidden) return;
    supportArt(box);
    if (box.querySelector('.magic-day')) return;
    var heading = box.querySelector('.dyh');
    if (!heading) return;
    var details = document.createElement('details');
    details.className = 'magic-day';
    var summary = document.createElement('summary');
    var quest = document.createElement('img');
    quest.className = 'magic-quest-art';quest.src = 'assets/mobile-magic/quest-scroll.webp';quest.alt = '';
    heading.querySelector('b').prepend(quest);
    var progress = document.createElement('span');
    progress.className = 'magic-mission-progress';
    var complete = box.querySelectorAll('.dyq.ok').length;
    var total = box.querySelectorAll('.dyq').length;
    progress.textContent = complete === total && total ? '今日全部完成！' : '已完成 ' + complete + ' / ' + total + ' 項';
    heading.appendChild(progress);
    summary.appendChild(heading);
    var nextQuest = box.querySelector('.dyq:not(.ok) .tx');
    if (nextQuest) {
      var next = document.createElement('span');
      next.className = 'magic-next';
      next.innerHTML = '<b>下一個</b>';
      next.appendChild(document.createTextNode(nextQuest.textContent));
      summary.appendChild(next);
    }
    details.appendChild(summary);
    var content = document.createElement('div');
    content.className = 'magic-day-content';
    box.querySelectorAll('.dyq, .dyt').forEach(function (item) { content.appendChild(item); });
    details.appendChild(content);
    details.open = !media.matches || dayExpanded;
    details.addEventListener('toggle', function () {
      if (media.matches) dayExpanded = details.open;
    });
    box.prepend(details);
  }

  function responsiveDay() {
    var details = document.querySelector('#dayBox .magic-day');
    if (details) details.open = !media.matches || dayExpanded;
  }
  if (media.addEventListener) media.addEventListener('change', responsiveDay);
  window.MobileMagicUI = {home: home, day: day};
  // Cosmetic effects never write to account, curriculum or score storage.
  function decorate() {
    var preview = document.querySelector('#gate .g18prev');
    var selectedWizard = document.querySelector('#g18grid button.sel[data-av="wizard"]');
    if (preview) {
      var figure = preview.querySelector('.magic-wizard-figure');
      if (!figure) {
        figure = document.createElement('img');
        figure.className = 'magic-wizard-figure';
        figure.src = 'assets/mobile-magic/wizard-preview.webp';
        figure.alt = '魔法師全身預覽';
        preview.prepend(figure);
      }
      preview.classList.toggle('magic-fullbody', !!selectedWizard);
    }
    document.querySelectorAll('#gBody>.obmap,#gBody>.soc,#gBody>.v2station,#heroBox').forEach(function (node) {
      node.classList.add('magic-scene');
    });
    document.querySelectorAll('.stl,.obn,.soc-les').forEach(function (node) {
      node.classList.toggle('magic-locked', !!node.disabled);
      var stars = node.querySelectorAll('.s3 i.on').length;
      node.classList.toggle('magic-complete', !node.disabled && (stars >= 3 || node.classList.contains('done')));
    });
  }
  function motionSetup() {
    var sky = document.createElement('div');
    sky.className = 'magic-atmosphere';
    sky.setAttribute('aria-hidden', 'true');
    sky.innerHTML = '<div class="magic-clouds"></div>' + Array.from({length:10}, function (_, i) {
      return '<i style="--x:' + ((i * 31 + 7) % 98) + '%;--y:' + ((i * 23 + 9) % 96) + '%;--delay:' + (i * -.67) + 's">✦</i>';
    }).join('');
    document.body.appendChild(sky);
    var queued = false;
    var observer = new MutationObserver(function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () {queued = false; decorate();});
    });
    ['gamePanel','gate'].forEach(function (id) {
      var root = document.getElementById(id);
      if (root) observer.observe(root, {childList:true,subtree:true});
    });
    document.addEventListener('visibilitychange', function () {
      document.documentElement.classList.toggle('magic-paused', document.hidden);
    });
    document.addEventListener('click', function (event) {
      var button = event.target.closest('button');
      if (!media.matches || reduced.matches || !button || button.disabled || button.closest('.obplay,.v2world')) return;
      var rect = button.getBoundingClientRect();
      for (var i = 0; i < 5; i++) {
        var star = document.createElement('i');
        star.className = 'magic-click-star';
        star.setAttribute('aria-hidden','true');
        star.textContent = '✦';
        star.style.left = (rect.left + rect.width / 2) + 'px';
        star.style.top = (rect.top + rect.height / 2) + 'px';
        document.body.appendChild(star);
        var angle = i * Math.PI * 2 / 5;
        if (!star.animate) {star.remove();continue;}
        var animation = star.animate([{transform:'translate(-50%,-50%) scale(.4)',opacity:1},
          {transform:'translate(calc(-50% + ' + Math.cos(angle)*45 + 'px),calc(-50% + ' + Math.sin(angle)*38 + 'px)) scale(.85)',opacity:0}],
          {duration:480,easing:'cubic-bezier(.2,.7,.3,1)'});
        animation.onfinish = (function (element) {return function () {element.remove();};})(star);
      }
    }, {passive:true});
    decorate();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', motionSetup, {once:true});
  else motionSetup();

})();
