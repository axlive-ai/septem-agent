function motionEnter(btn){var box=btn.parentNode;var items=box.querySelectorAll(".mo-eitem");var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches;[].forEach.call(items,function(it){it.style.transition="none";it.classList.remove("in");});void box.offsetWidth;[].forEach.call(items,function(it,idx){it.style.transition="";var d=it.getAttribute("data-delay");var ms=d!==null?parseInt(d,10):idx*120;it.style.transitionDelay=reduce?"0ms":ms+"ms";it.classList.add("in");});}
function motionSteps(btn){var box=btn.parentNode;var steps=box.querySelectorAll(".mo-step");var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches;if(box._sq){box._sq.forEach(clearTimeout);}box._sq=[];[].forEach.call(steps,function(s){s.className="mo-step";});if(reduce){[].forEach.call(steps,function(s){s.classList.add("done");});return;}var i=0;function run(){if(i>0){steps[i-1].classList.remove("active");steps[i-1].classList.add("done");}if(i>=steps.length)return;steps[i].classList.add("active");i++;box._sq.push(setTimeout(run,850));}run();}
function motionStream(btn){var box=btn.parentNode;var el=box.querySelector(".mo-txt");var full=el.getAttribute("data-full");if(box._t)clearInterval(box._t);var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches;if(reduce){el.textContent=full;return;}el.textContent="";var i=0;box._t=setInterval(function(){el.textContent=full.slice(0,++i);if(i>=full.length)clearInterval(box._t);},32);}
function motionCount(btn){var box=btn.parentNode;var el=box.querySelector(".mo-num");var to=+el.getAttribute("data-to");function fmt(n){return Math.round(n).toLocaleString("ko-KR");}var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches;if(reduce){el.textContent=fmt(to);return;}var dur=1100,st=null;function step(ts){if(!st)st=ts;var p=Math.min((ts-st)/dur,1);var e=1-Math.pow(1-p,3);el.textContent=fmt(to*e);if(p<1)requestAnimationFrame(step);}requestAnimationFrame(step);}
function motionSuccess(btn){var box=btn.parentNode;var w=box.querySelector(".mo-succ");w.classList.remove("go");void w.offsetWidth;w.classList.add("go");}
function motionError(btn){var box=btn.parentNode;var w=box.querySelector(".mo-err");w.classList.remove("go");void w.offsetWidth;w.classList.add("go");}
function autoPlayMotion(scope){var boxes=(scope||document).querySelectorAll(".mo-demo2");[].forEach.call(boxes,function(box){var btn=box.querySelector(".mo-play");if(btn)motionEnter(btn);});}
document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){autoPlayMotion(document);},30);});

/* 업무 카드 정상 Case / 예외 Case 탭 전환 — .task-head-bar 바로 뒤에
   .task-case-panel(정상) + .task-case-panel(예외)이 순서대로 옴 */
function toggleTaskCase(btn, which){
  var bar = btn.closest(".task-head-bar");
  var tabs = bar.querySelectorAll(".task-tab");
  [].forEach.call(tabs, function(t){ t.classList.remove("active"); });
  btn.classList.add("active");
  var normalPanel = bar.nextElementSibling;
  var excPanel = normalPanel ? normalPanel.nextElementSibling : null;
  if (!normalPanel || !excPanel) return;
  if (which === "normal") {
    normalPanel.classList.add("active");
    excPanel.classList.remove("active");
  } else {
    normalPanel.classList.remove("active");
    excPanel.classList.add("active");
  }
}

/* Agent 업무 플로우(Full Package) — 클릭 가능한 도형 노드를 누르면
   같은 .flow-wrap 안의 .flow-panel 중 data-step이 일치하는 것만 표시 */
function selectFlowStep(btn){
  var wrap = btn.closest(".flow-wrap");
  if (!wrap) return;
  var nodes = wrap.querySelectorAll(".flow-node.clickable");
  [].forEach.call(nodes, function(n){ n.classList.remove("active"); });
  btn.classList.add("active");
  var step = btn.getAttribute("data-step");
  var panels = wrap.querySelectorAll(".flow-panel");
  [].forEach.call(panels, function(p){
    p.classList.toggle("active", p.getAttribute("data-step") === step);
  });
}

/* 플로우 노드에 패널 내용을 직접 적어두면(data-title/data-desc, 또는 풍부한 내용이
   필요하면 <template class="flow-panel-content">) 그 노드를 클릭했을 때 보여줄
   .flow-panel을 자동으로 만들어줘요. data-step 번호 매기기, onclick 연결, 그리고
   .flow-panel을 손으로 따로 써서 순서를 맞추는 작업이 전부 필요 없어져요.

   사용법:
   <div class="flow-node" data-title="온보딩 처리" data-desc="설명 텍스트">
     <div class="flow-shape process">온보딩 처리</div>
   </div>
   화면 mockup처럼 더 복잡한 내용이 필요하면:
   <div class="flow-node" data-title="화면 이름">
     <div class="flow-shape screen">...</div>
     <template class="flow-panel-content"><div class="task-screen-box">...</div></template>
   </div>
   data-title/data-desc/template이 전혀 없는 .flow-node(시작·종료·조건 분기 등
   순수 구조용 도형)는 자동 처리 대상에서 빠지고 클릭도 안 돼요. */
function initFlowPanels(scope){
  var wraps = (scope || document).querySelectorAll(".flow-wrap");
  [].forEach.call(wraps, function(wrap){
    if (wrap.dataset.flowPanelsInit) return; // 같은 wrap 중복 초기화 방지
    wrap.dataset.flowPanelsInit = "1";

    var candidates = [].filter.call(wrap.querySelectorAll(".flow-node"), function(n){
      return n.hasAttribute("data-title") || n.hasAttribute("data-desc") || n.querySelector(":scope > template.flow-panel-content");
    });
    if (!candidates.length) return;

    var panelHost = wrap.querySelector(".flow-panels");
    if (!panelHost) {
      panelHost = document.createElement("div");
      panelHost.className = "flow-panels";
      wrap.appendChild(panelHost);
    }

    candidates.forEach(function(node, i){
      var step = String(i + 1);
      node.classList.add("clickable");
      node.setAttribute("data-step", step);
      if (i === 0) node.classList.add("active");
      node.addEventListener("click", function(){ selectFlowStep(node); });

      var panel = document.createElement("div");
      panel.className = "flow-panel" + (i === 0 ? " active" : "");
      panel.setAttribute("data-step", step);

      var tpl = node.querySelector(":scope > template.flow-panel-content");
      if (tpl) {
        panel.appendChild(tpl.content.cloneNode(true));
        tpl.remove();
      } else {
        var title = node.getAttribute("data-title") || "";
        var desc = node.getAttribute("data-desc") || "";
        panel.innerHTML =
          '<div class="flow-detail"><div class="flow-detail-title"></div><div class="flow-detail-desc"></div></div>';
        panel.querySelector(".flow-detail-title").textContent = title;
        panel.querySelector(".flow-detail-desc").textContent = desc;
      }
      panelHost.appendChild(panel);
    });
  });
}
document.addEventListener("DOMContentLoaded", function(){ initFlowPanels(document); });

/* ============================================================
   텍스트 -> 플로우차트 라이브 렌더러
   한 줄에 노드 하나씩 적으면 그 순서대로 가로 플로우를 그려줘요.
   자세한 문법은 flow-sample.html의 "텍스트로 바로 그리기" 섹션 참고.

   기본 문법
     type: 라벨                    (클릭 안 되는 구조용 노드)
     type: 라벨 | 제목 | 설명       (클릭하면 하단에 패널이 뜨는 노드)
     (라벨 안에서 \n 은 줄바꿈)

   지원 type: start end process system decision input subprocess
              screen external exception wait connector complete

   분기 + 병합
     branch:
     - Yes: process: 온보딩 처리 | 제목 | 설명
     - No: system: 이력 조회 | 제목 | 설명
     merge
     (각 갈래는 '>'로 여러 단계를 이어붙일 수 있음: step > step > ...)

   반복/재시도 루프 - 바로 앞의 연속된 N개 노드를 되돌아가는 루프로 감쌈
     loop(2): 아니요 -> 발화 생성 단계로 재시도
   ============================================================ */
var FLOW_ICONS = {
  screen: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  external: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h.79a4.5 4.5 0 1 1 0 9Z"/></svg>',
  exception: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
  wait: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  complete: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>'
};
var FLOW_ARROW_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';
var FLOW_SIMPLE_TYPES = ['process','system','screen','external','exception','wait','connector','complete'];

function flowMakeArrow(){
  var a = document.createElement('div');
  a.className = 'flow-arrow-ico';
  a.innerHTML = FLOW_ARROW_SVG;
  return a;
}

function flowLabelHtml(label){
  return label.replace(/\\n/g, '\n').split('\n').map(function(s){
    var span = document.createElement('span');
    span.textContent = s;
    return span.outerHTML;
  }).join('<br>');
}

/* "type: 라벨 | 제목 | 설명" 한 줄을 .flow-node 엘리먼트로 변환 */
function flowParseStep(str){
  str = str.trim();
  var colon = str.indexOf(':');
  if (colon < 0) throw new Error('형식 오류(콜론이 없어요): "' + str + '"');
  var type = str.slice(0, colon).trim().toLowerCase();
  var rest = str.slice(colon + 1).split('|');
  var label = flowLabelHtml((rest[0] || '').trim());
  var title = rest[1] ? rest[1].trim() : '';
  var desc = rest[2] ? rest[2].trim() : '';

  var node = document.createElement('div');
  node.className = 'flow-node';
  if (title) node.setAttribute('data-title', title);
  if (desc) node.setAttribute('data-desc', desc);

  if (type === 'start' || type === 'end') {
    node.innerHTML = '<div class="flow-shape terminator' + (type === 'end' ? ' muted' : '') + '">' + label + '</div>';
  } else if (type === 'decision') {
    node.innerHTML = '<div class="flow-decision-wrap"><div class="flow-decision-mark"></div><div class="flow-decision-text">' + label + '</div></div>';
  } else if (type === 'input') {
    node.innerHTML = '<div class="flow-shape-input-wrap"><div class="flow-shape input"><span>' + label + '</span></div></div>';
  } else if (type === 'subprocess') {
    node.innerHTML = '<div class="flow-subprocess-wrap"><div class="flow-shape subprocess">' + label + '</div></div>';
  } else if (FLOW_SIMPLE_TYPES.indexOf(type) !== -1) {
    node.innerHTML = '<div class="flow-shape ' + type + '">' + (FLOW_ICONS[type] || '') + label + '</div>';
  } else {
    throw new Error('알 수 없는 도형 타입이에요: "' + type + '" (가능: start end process system decision input subprocess screen external exception wait connector complete)');
  }
  return node;
}

/* screen: ... endscreen 블록을 실제 화면 mockup(snapshot-row) HTML로 변환.
   지원 명령어:
     label: 화면 라벨               (생략하면 노드의 data-title을 재사용)
     bubble: 텍스트                 (배지 없는 Agent 말풍선)
     msg: 텍스트                   (배지 있는 Agent 말풍선, 순서대로 1,2,3...)
     chips: 칩1 | 칩2(on) | 칩3      (선택 버튼 묶음, "(on)"을 붙이면 강조 표시)
     desc: 제목 | 설명               (오른쪽 설명 리스트, 순서대로 번호 매김) */
function flowEsc(s){
  var span = document.createElement('span');
  span.textContent = s;
  return span.innerHTML;
}

function flowParseScreenBlock(lines, fallbackLabel){
  var label = fallbackLabel || '화면';
  var bodyHtml = '';
  var descHtml = '';
  var badgeN = 0;
  var descN = 0;

  lines.forEach(function(raw){
    var line = raw.trim();
    if (!line || line.charAt(0) === '#') return;
    var c = line.indexOf(':');
    if (c < 0) throw new Error('screen 블록 형식 오류(콜론 없음): "' + line + '"');
    var cmd = line.slice(0, c).trim().toLowerCase();
    var rest = line.slice(c + 1).trim();

    if (cmd === 'label') {
      label = rest;
    } else if (cmd === 'bubble') {
      bodyHtml += '<div class="snap-bubble-agent">' + flowEsc(rest) + '</div>';
    } else if (cmd === 'msg') {
      badgeN++;
      bodyHtml += '<div class="snap-msg"><div class="snap-badge">' + badgeN + '</div><div class="snap-bubble-agent">' + flowEsc(rest) + '</div></div>';
    } else if (cmd === 'chips') {
      badgeN++;
      var chipsHtml = rest.split('|').map(function(chip){
        chip = chip.trim();
        var on = /\(on\)\s*$/i.test(chip);
        if (on) chip = chip.replace(/\(on\)\s*$/i, '').trim();
        return '<span class="snap-chip' + (on ? ' on' : '') + '">' + flowEsc(chip) + '</span>';
      }).join('');
      bodyHtml += '<div class="snap-msg"><div class="snap-badge">' + badgeN + '</div><div class="snap-chips">' + chipsHtml + '</div></div>';
    } else if (cmd === 'desc') {
      descN++;
      var parts = rest.split('|');
      var dTitle = (parts[0] || '').trim();
      var dText = parts[1] ? parts[1].trim() : '';
      descHtml += '<div class="snap-desc-item"><div class="snap-desc-num">' + descN + '</div><div class="snap-desc-text"><strong>' + flowEsc(dTitle) + '</strong>' + flowEsc(dText) + '</div></div>';
    } else {
      throw new Error('알 수 없는 screen 명령어: "' + cmd + '" (가능: label bubble msg chips desc)');
    }
  });

  return (
    '<div class="task-screen-box">' +
      '<div class="task-screen-box-label">' + flowEsc(label) + '</div>' +
      '<div class="task-snapshot"><div class="snapshot-row">' +
        '<div class="snap-phone-wrap"><div class="snap-phone">' +
          '<div class="snap-gnb"><span class="snap-gnb-back">\u2039</span><span class="snap-gnb-title">화면</span></div>' +
          '<div class="snap-body">' + bodyHtml + '<div class="snap-input-bar"><div class="snap-input-field">메시지 입력</div></div></div>' +
        '</div></div>' +
        '<div class="snap-desc-col">' + descHtml + '</div>' +
      '</div></div>' +
    '</div>'
  );
}

/* 여러 줄 텍스트를 파싱해서 .flow-row 엘리먼트로 변환.
   branch: / - 태그: ... / merge 블록과 loop(N): 라벨 줄을 지원.

   branch 블록은 들여쓰기를 기준으로 재귀적으로 파싱해서:
   - 갈래(-태그:) 안에 또 branch:/merge를 중첩할 수 있고 (하위 줄을 "-" 줄보다
     더 들여쓰면 그 갈래의 본문으로 인식돼요),
   - merge는 생략할 수 있어요. 생략하면 그 branch는 다시 하나로 합쳐지지 않고
     각 갈래가 독립적으로 끝나요(그 경우 branch 블록이 그 흐름의 마지막이어야 해요). */
function flowParseText(text){
  var lines = text.split('\n');
  var i = 0;

  function leadingSpaces(s){
    var m = s.match(/^[ \t]*/);
    return m ? m[0].length : 0;
  }

  function pushStep(arr, node){
    if (arr.length) arr.push(flowMakeArrow());
    arr.push(node);
  }

  function concatParts(a, b){
    if (a.length && b.length) a.push(flowMakeArrow());
    a.push.apply(a, b);
    return a;
  }

  function attachScreenBlock(stepNode){
    // 이 노드 바로 뒤에 screen: ... endscreen 블록이 있으면
    // 화면 mockup(snapshot-row)을 만들어 이 노드의 패널로 붙여요.
    if (i < lines.length && /^screen\s*:?$/i.test(lines[i].trim())) {
      i++;
      var screenLines = [];
      while (i < lines.length && !/^endscreen$/i.test(lines[i].trim())) {
        screenLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // endscreen 줄 건너뜀
      var screenTpl = document.createElement('template');
      screenTpl.className = 'flow-panel-content';
      screenTpl.innerHTML = flowParseScreenBlock(screenLines, stepNode.getAttribute('data-title') || '');
      stepNode.appendChild(screenTpl);
    }
  }

  // minIndent보다 얕게 들여쓴 줄을 만나면(=상위 스코프의 형제 갈래/merge/블록 끝)
  // 소비하지 않고 그대로 반환. .flow-node/.flow-arrow-ico/분기그룹 엘리먼트를
  // 순서대로 담은 배열을 리턴해요. depth는 branch 중첩 깊이(0부터) — 중첩된
  // 분기 그룹을 구분하는 배경색을 고르는 데만 쓰여요.
  function parseSequence(minIndent, depth){
    depth = depth || 0;
    var parts = [];
    while (i < lines.length) {
      var raw = lines[i];
      var trimmed = raw.trim();
      if (!trimmed || trimmed.charAt(0) === '#') { i++; continue; }
      if (leadingSpaces(raw) < minIndent) break;

      if (/^branch\s*:?$/i.test(trimmed)) {
        var branchIndent = leadingSpaces(raw);
        i++;
        var arms = [];
        while (i < lines.length) {
          var armRaw = lines[i];
          var armTrimmed = armRaw.trim();
          if (!armTrimmed || armTrimmed.charAt(0) === '#') { i++; continue; }
          if (leadingSpaces(armRaw) < branchIndent || armTrimmed.charAt(0) !== '-') break;
          var armIndent = leadingSpaces(armRaw);
          i++;

          var body = armTrimmed.slice(1).trim();
          var c = body.indexOf(':');
          if (c < 0) throw new Error('분기 줄 형식 오류(콜론 없음): "' + armTrimmed + '"');
          var tag = body.slice(0, c).trim();
          var inlineRest = body.slice(c + 1).trim();

          var armParts = [];
          if (inlineRest) {
            inlineRest.split('>').forEach(function(stepStr){
              pushStep(armParts, flowParseStep(stepStr));
            });
          }
          // "-" 줄보다 더 들여쓴 다음 줄들은 이 갈래의 본문(중첩 branch/loop/screen 포함).
          // 본문 없이 태그만 있는 갈래도 허용해요 — 원본 설계서에서 중간에 별도
          // 도형 없이 바로 다음 지점으로 합류하는 화살표를 그대로 표현할 때 씀.
          var subParts = parseSequence(armIndent + 1, depth + 1);
          armParts = concatParts(armParts, subParts);

          var tagEl = document.createElement('span');
          tagEl.className = 'flow-branch-tag';
          tagEl.textContent = tag;
          var rowEl = document.createElement('div');
          rowEl.className = 'flow-hsplit-row';
          rowEl.appendChild(tagEl);
          armParts.forEach(function(p){ rowEl.appendChild(p); });
          arms.push(rowEl);
        }
        if (!arms.length) throw new Error('branch: 다음에 "- 태그: ..." 줄이 하나도 없어요.');

        // merge는 선택 사항: 있으면 갈래들이 다시 하나로 합쳐지고, 없으면
        // 각 갈래가 독립적으로 끝나요(이 branch가 그 시퀀스의 마지막이어야 함).
        var merged = false;
        var lookahead = i;
        while (lookahead < lines.length) {
          var lt = lines[lookahead].trim();
          if (!lt || lt.charAt(0) === '#') { lookahead++; continue; }
          break;
        }
        if (lookahead < lines.length && leadingSpaces(lines[lookahead]) <= branchIndent && /^merge$/i.test(lines[lookahead].trim())) {
          merged = true;
          i = lookahead + 1;
        }

        var rowsWrap = document.createElement('div');
        rowsWrap.className = 'flow-hsplit-rows';
        arms.forEach(function(r){ rowsWrap.appendChild(r); });

        var forkStart = document.createElement('div');
        forkStart.className = 'flow-hfork';
        forkStart.innerHTML = '<div class="flow-hfork-t"></div><div class="flow-hfork-b"></div>';

        // 분기 전체(포크+갈래+병합)를 하나의 테두리 박스로 감싸서, 어디서부터
        // 어디까지가 이 분기인지 한눈에 보이게 해요. 중첩 깊이에 따라 배경색이
        // 달라지고, merge가 없는(독립 종료) 분기는 점선 테두리로 구분돼요.
        var groupEl = document.createElement('div');
        groupEl.className = 'flow-branch-group' + (merged ? '' : ' no-merge');
        groupEl.setAttribute('data-depth', String(depth % 5));
        groupEl.appendChild(forkStart);
        groupEl.appendChild(rowsWrap);
        if (merged) {
          var forkEnd = document.createElement('div');
          forkEnd.className = 'flow-hfork join';
          forkEnd.innerHTML = '<div class="flow-hfork-t"></div><div class="flow-hfork-b"></div>';
          groupEl.appendChild(forkEnd);
        }
        pushStep(parts, groupEl);
        continue;
      }

      var loopMatch = trimmed.match(/^loop\((\d+)\)\s*:\s*(.+)$/i);
      if (loopMatch) {
        i++;
        var n = parseInt(loopMatch[1], 10);
        var span = 2 * n - 1;
        if (n < 1 || span > parts.length) throw new Error('loop(' + n + ')가 감쌀 이전 노드가 부족해요.');
        var taken = parts.splice(parts.length - span, span);
        var loopWrap = document.createElement('div');
        loopWrap.className = 'flow-hloop-wrap';
        taken.forEach(function(el){ loopWrap.appendChild(el); });
        loopWrap.insertAdjacentHTML('beforeend', '<div class="flow-hloop-bracket"></div>');
        var labelEl = document.createElement('div');
        labelEl.className = 'flow-hloop-label';
        labelEl.textContent = loopMatch[2].trim();
        loopWrap.appendChild(labelEl);
        parts.push(loopWrap);
        continue;
      }

      // 일반 노드 줄
      i++;
      var stepNode = flowParseStep(trimmed);
      pushStep(parts, stepNode);
      attachScreenBlock(stepNode);
    }
    return parts;
  }

  var parts = parseSequence(0, 0);
  if (!parts.length) throw new Error('그릴 내용이 없어요.');

  var row = document.createElement('div');
  row.className = 'flow-row';
  row.style.overflowX = 'visible';
  parts.forEach(function(p){ row.appendChild(p); });
  return row;
}

/* text를 파싱해서 hostEl 안에 .flow-wrap을 새로 그리고, 자동 패널 생성까지 실행.
   실패하면 에러 메시지를 리턴(성공이면 null) */
function renderFlowText(text, hostEl){
  hostEl.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.className = 'flow-wrap';
  try {
    var canvas = document.createElement('div');
    canvas.className = 'flow-canvas';
    canvas.appendChild(flowParseText(text));
    wrap.appendChild(canvas);
    hostEl.appendChild(wrap);
    initFlowPanels(hostEl);
    return null;
  } catch (e) {
    hostEl.appendChild(wrap);
    return e.message;
  }
}

/* 우측 "ON THIS PAGE" TOC — 클릭한 항목만 .toc-link.active로 표시
   (index.html SPA의 renderTOC()/scrollToSection()과 동일한 스타일 규칙을
   standalone으로 열어보는 개별 문서 파일에서도 그대로 재사용) */
function setActiveToc(link){
  var toc = link.closest(".toc") || document;
  toc.querySelectorAll(".toc-link").forEach(function(l){ l.classList.remove("active"); });
  link.classList.add("active");
}
