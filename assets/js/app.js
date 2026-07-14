/* ============================================================
   목차 데이터 — NH농협은행 AI Agent UX Guide System Index
   ============================================================ */
/* ============================================================
   문서 파일 매핑 — Agent UX Design(html/uxd-*.html) + Agent Profile /
   Agent Task Design / intro·method(html/*.html) 문서를 모두 fetch로
   불러와 #content(및 #toc)에 직접 주입 (iframe 없이, 같은 문서로 스크롤)
   ============================================================ */
const DOC_FILES = {
  "ux-overview": "html/uxd-overview.html",
  "ux-foundation-color": "html/uxd-foundation-color.html",
  "ux-foundation-type": "html/uxd-foundation-typography.html",
  "ux-foundation-icon": "html/uxd-foundation-iconography.html",
  "ux-foundation-spacing": "html/uxd-foundation-spacing.html",
  "ux-foundation-radius": "html/uxd-foundation-radius.html",
  "ux-foundation-elevation": "html/uxd-foundation-elevation.html",
  "ux-foundation-motion": "html/uxd-foundation-motion.html",
  "ux-layout-header": "html/uxd-layout-header.html",
  "ux-layout-content": "html/uxd-layout-content.html",
  "ux-layout-footer": "html/uxd-layout-footer.html",
  "ux-layout-floating": "html/uxd-layout-floating.html",
  "ux-interaction-conv": "html/uxd-interaction-conversation.html",
  "ux-interaction-input": "html/uxd-interaction-userinput.html",
  "ux-interaction-response": "html/uxd-interaction-response.html",
  "ux-interaction-feedback": "html/uxd-interaction-feedback.html",
  "ux-interaction-nav": "html/uxd-interaction-navigation.html",
  "ux-component-chat": "html/uxd-component-chat.html",
  "ux-component-inputc": "html/uxd-component-input.html",
  "ux-component-card": "html/uxd-component-card.html",
  "ux-component-viz": "html/uxd-component-viz.html",
  "ux-component-navc": "html/uxd-component-nav.html",
  "intro": "html/intro.html",
  "method": "html/method.html",
  "profile-finance-master": "html/profile-finance-master.html",
  "profile-finance-product": "html/profile-finance-product.html",
  "profile-finance-calc": "html/profile-finance-calc.html",
  "profile-jeonse-master": "html/profile-jeonse-master.html",
  "profile-jeonse-qa": "html/profile-jeonse-qa.html",
  "profile-jeonse-guarantee": "html/profile-jeonse-guarantee.html",
  "profile-jeonse-search": "html/profile-jeonse-search.html",
  "profile-jeonse-safety": "html/profile-jeonse-safety.html",
  "profile-jeonse-aftercare": "html/profile-jeonse-aftercare.html",
  "profile-consumer-master": "html/profile-consumer-master.html",
  "profile-consumer-prevention": "html/profile-consumer-prevention.html",
  "profile-consumer-phishing": "html/profile-consumer-phishing.html",
  "profile-wealth-master": "html/profile-wealth-master.html",
  "profile-wealth-briefing": "html/profile-wealth-briefing.html",
  "profile-wealth-diagnosis": "html/profile-wealth-diagnosis.html",
  "profile-wealth-design": "html/profile-wealth-design.html",
  "profile-wealth-tax": "html/profile-wealth-tax.html",
  "task-common-welcome__0": "html/task-common-welcome-0.html",
  "task-common-welcome__1": "html/task-common-welcome-1.html",
  "task-common-welcome__2": "html/task-common-welcome-2.html",
  "task-common-exit__0": "html/task-common-exit-0.html",
  "task-common-exit__1": "html/task-common-exit-1.html",
  "task-common-exit__2": "html/task-common-exit-2.html",
  "task-finance-master__0": "html/task-finance-master-0.html",
  "task-finance-master__1": "html/task-finance-master-1.html",
  "task-finance-master__2": "html/task-finance-master-2.html",
  "task-finance-product__0": "html/task-finance-product-0.html",
  "task-finance-product__1": "html/task-finance-product-1.html",
  "task-finance-product__2": "html/task-finance-product-2.html",
  "task-finance-calc__0": "html/task-finance-calc-0.html",
  "task-finance-calc__1": "html/task-finance-calc-1.html",
  "task-finance-calc__2": "html/task-finance-calc-2.html",
  "task-jeonse-master__0": "html/task-jeonse-master-0.html",
  "task-jeonse-master__1": "html/task-jeonse-master-1.html",
  "task-jeonse-master__2": "html/task-jeonse-master-2.html",
  "task-jeonse-qa__0": "html/task-jeonse-qa-0.html",
  "task-jeonse-qa__1": "html/task-jeonse-qa-1.html",
  "task-jeonse-qa__2": "html/task-jeonse-qa-2.html",
  "task-jeonse-guarantee__0": "html/task-jeonse-guarantee-0.html",
  "task-jeonse-guarantee__1": "html/task-jeonse-guarantee-1.html",
  "task-jeonse-guarantee__2": "html/task-jeonse-guarantee-2.html",
  "task-jeonse-search__0": "html/task-jeonse-search-0.html",
  "task-jeonse-search__1": "html/task-jeonse-search-1.html",
  "task-jeonse-search__2": "html/task-jeonse-search-2.html",
  "task-jeonse-safety__0": "html/task-jeonse-safety-0.html",
  "task-jeonse-safety__1": "html/task-jeonse-safety-1.html",
  "task-jeonse-safety__2": "html/task-jeonse-safety-2.html",
  "task-jeonse-aftercare__0": "html/task-jeonse-aftercare-0.html",
  "task-jeonse-aftercare__1": "html/task-jeonse-aftercare-1.html",
  "task-jeonse-aftercare__2": "html/task-jeonse-aftercare-2.html",
  "task-consumer-master__0": "html/task-consumer-master-0.html",
  "task-consumer-master__1": "html/task-consumer-master-1.html",
  "task-consumer-master__2": "html/task-consumer-master-2.html",
  "task-consumer-prevention__0": "html/task-consumer-prevention-0.html",
  "task-consumer-prevention__1": "html/task-consumer-prevention-1.html",
  "task-consumer-prevention__2": "html/task-consumer-prevention-2.html",
  "task-consumer-phishing__0": "html/task-consumer-phishing-0.html",
  "task-consumer-phishing__1": "html/task-consumer-phishing-1.html",
  "task-consumer-phishing__2": "html/task-consumer-phishing-2.html",
  "task-wealth-master__0": "html/task-wealth-master-0.html",
  "task-wealth-master__1": "html/task-wealth-master-1.html",
  "task-wealth-master__2": "html/task-wealth-master-2.html",
  "task-wealth-briefing__0": "html/task-wealth-briefing-0.html",
  "task-wealth-briefing__1": "html/task-wealth-briefing-1.html",
  "task-wealth-briefing__2": "html/task-wealth-briefing-2.html",
  "task-wealth-diagnosis__0": "html/task-wealth-diagnosis-0.html",
  "task-wealth-diagnosis__1": "html/task-wealth-diagnosis-1.html",
  "task-wealth-diagnosis__2": "html/task-wealth-diagnosis-2.html",
  "task-wealth-design__0": "html/task-wealth-design-0.html",
  "task-wealth-design__1": "html/task-wealth-design-1.html",
  "task-wealth-design__2": "html/task-wealth-design-2.html",
  "task-wealth-tax__0": "html/task-wealth-tax-0.html",
  "task-wealth-tax__1": "html/task-wealth-tax-1.html",
  "task-wealth-tax__2": "html/task-wealth-tax-2.html",
};

// fetch() 결과를 캐싱해서 loadDocFile()과 백그라운드 검색 인덱싱이
// 같은 문서를 중복으로 요청하지 않도록 함
const docCache = {};

async function fetchDocHtml(id) {
  if (docCache[id]) return docCache[id];
  const res = await fetch(DOC_FILES[id]);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const html = await res.text();
  docCache[id] = html;
  return html;
}

async function loadDocFile(id, crumbHtml, label) {
  const content = document.getElementById('content');
  const toc = document.getElementById('toc');
  content.innerHTML = crumbHtml + `<div class="page-title">${label}</div><div class="prose"><p class="lead">불러오는 중…</p></div>`;
  toc.innerHTML = '';

  try {
    const html = await fetchDocHtml(id);
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const docBody = doc.querySelector('.doc-body');
    const docToc = doc.querySelector('.toc');

    content.innerHTML = crumbHtml + (docBody ? docBody.innerHTML : html);

    // Rebuild the fetched page's own TOC links through the same renderTOC()
    // markup the rest of the site uses (div.toc-title + div.toc-list > a.toc-link)
    // instead of dumping its raw div/a mix straight into #toc.
    const tocItems = docToc
      ? Array.from(docToc.querySelectorAll('a')).map((a) => ({
          id: (a.getAttribute('href') || '').replace(/^#/, ''),
          label: a.textContent.trim(),
        }))
      : [];
    renderTOC(tocItems);

    // Cross-links between doc pages (e.g. the Overview cards) stay inside
    // this same shell instead of doing a full page navigation.
    content.querySelectorAll('a[href$=".html"]').forEach((a) => {
      const raw = a.getAttribute('href');
      if (/^https?:\/\//.test(raw)) return;
      const file = raw.replace(/^.*\//, '');
      const targetId = Object.keys(DOC_FILES).find((k) => DOC_FILES[k].endsWith('/' + file));
      a.setAttribute('href', 'html/' + file);
      if (targetId) {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          selectLeaf(targetId);
        });
      }
    });

    if (window.autoPlayMotion) window.autoPlayMotion(content);
  } catch (err) {
    content.innerHTML = crumbHtml + `<div class="page-title">${label}</div><div class="empty-state"><strong>이 페이지를 불러오지 못했어요</strong></div>`;
  }

  window.scrollTo(0, 0);
}

const NAV = [
  { id: "intro", label: "소개", type: "page", desc: "이 가이드 시스템의 목적과 사용법을 소개합니다." },
  { id: "method", label: "방법론", type: "page", desc: "NH AI Agent UX 가이드 시스템이 따르는 설계 방법론을 설명합니다." },
  {
    id: "profile", label: "Agent Profile", type: "group",
    desc: "각 Agent의 정의, 목적, 역할, 관계를 정리한 개요 문서입니다.",
    children: [
      { id: "profile-finance", label: "금융비서 Agent", type: "group", children: [
        { id: "profile-finance-master", label: "AI금융비서 Master", type: "leaf" },
        { id: "profile-finance-product", label: "맞춤상품안내", type: "leaf" },
        { id: "profile-finance-calc", label: "AI금융계산기", type: "leaf" },
      ]},
      { id: "profile-jeonse", label: "전세대출 Agent", type: "group", children: [
        { id: "profile-jeonse-master", label: "AI전세대출 Master", type: "leaf" },
        { id: "profile-jeonse-qa", label: "대화형 질의응답", type: "leaf" },
        { id: "profile-jeonse-guarantee", label: "보증추천", type: "leaf" },
        { id: "profile-jeonse-search", label: "매물탐색", type: "leaf" },
        { id: "profile-jeonse-safety", label: "깡통전세방지", type: "leaf" },
        { id: "profile-jeonse-aftercare", label: "사후관리", type: "leaf" },
      ]},
      { id: "profile-consumer", label: "소비자보호 Agent", type: "group", children: [
        { id: "profile-consumer-master", label: "AI소비자보호 Master", type: "leaf" },
        { id: "profile-consumer-prevention", label: "금융사기 예방", type: "leaf" },
        { id: "profile-consumer-phishing", label: "피싱 탐지", type: "leaf" },
      ]},
      { id: "profile-wealth", label: "종합자산관리 Agent", type: "group", children: [
        { id: "profile-wealth-master", label: "AI종합자산관리 Master", type: "leaf" },
        { id: "profile-wealth-briefing", label: "모닝브리핑", type: "leaf" },
        { id: "profile-wealth-diagnosis", label: "포트폴리오 진단", type: "leaf" },
        { id: "profile-wealth-design", label: "포트폴리오 설계", type: "leaf" },
        { id: "profile-wealth-tax", label: "절세", type: "leaf" },
      ]},
    ]
  },
  {
    id: "task", label: "Agent Task Design", type: "group",
    desc: "Agent별 사용자 케이스, 대화 흐름, 업무 설계를 정의한 문서입니다.",
    children: [
      { id: "task-common", label: "Common Conversation", type: "group", children: [
        { id: "task-common-welcome", label: "웰컴대화", type: "leaf3", children: ["사용자 케이스 정의","대화흐름정의","업무 설계서"] },
        { id: "task-common-exit", label: "종료/이탈/예외", type: "leaf3", children: ["사용자 케이스 정의","대화흐름정의","업무 설계서"] },
      ]},
      { id: "task-finance", label: "금융비서 Agent", type: "group", children: [
        { id: "task-finance-master", label: "금융비서 Master", type: "leaf3", children: ["사용자 케이스 정의","대화흐름정의","업무 설계서"] },
        { id: "task-finance-product", label: "맞춤상품안내", type: "leaf3", children: ["사용자 케이스 정의","대화흐름정의","업무 설계서"] },
        { id: "task-finance-calc", label: "AI금융계산기", type: "leaf3", children: ["사용자 케이스 정의","대화흐름정의","업무 설계서"] },
      ]},
      { id: "task-jeonse", label: "전세대출 Agent", type: "group", children: [
        { id: "task-jeonse-master", label: "AI전세대출 Master", type: "leaf3", children: ["사용자 케이스 정의","대화흐름정의","업무 설계서"] },
        { id: "task-jeonse-qa", label: "대화형 질의응답", type: "leaf3", children: ["사용자 케이스 정의","대화흐름정의","업무 설계서"] },
        { id: "task-jeonse-guarantee", label: "보증추천", type: "leaf3", children: ["사용자 케이스 정의","대화흐름정의","업무 설계서"] },
        { id: "task-jeonse-search", label: "매물탐색", type: "leaf3", children: ["사용자 케이스 정의","대화흐름정의","업무 설계서"] },
        { id: "task-jeonse-safety", label: "깡통전세방지", type: "leaf3", children: ["사용자 케이스 정의","대화흐름정의","업무 설계서"] },
        { id: "task-jeonse-aftercare", label: "사후관리", type: "leaf3", children: ["사용자 케이스 정의","대화흐름정의","업무 설계서"] },
      ]},
      { id: "task-consumer", label: "소비자보호 Agent", type: "group", children: [
        { id: "task-consumer-master", label: "AI소비자보호 Master", type: "leaf3", children: ["사용자 케이스 정의","대화흐름정의","업무 설계서"] },
        { id: "task-consumer-prevention", label: "금융사기 예방", type: "leaf3", children: ["사용자 케이스 정의","대화흐름정의","업무 설계서"] },
        { id: "task-consumer-phishing", label: "피싱 탐지", type: "leaf3", children: ["사용자 케이스 정의","대화흐름정의","업무 설계서"] },
      ]},
      { id: "task-wealth", label: "종합자산관리 Agent", type: "group", children: [
        { id: "task-wealth-master", label: "AI종합자산관리 Master", type: "leaf3", children: ["사용자 케이스 정의","대화흐름정의","업무 설계서"] },
        { id: "task-wealth-briefing", label: "모닝브리핑", type: "leaf3", children: ["사용자 케이스 정의","대화흐름정의","업무 설계서"] },
        { id: "task-wealth-diagnosis", label: "포트폴리오 진단", type: "leaf3", children: ["사용자 케이스 정의","대화흐름정의","업무 설계서"] },
        { id: "task-wealth-design", label: "포트폴리오 설계", type: "leaf3", children: ["사용자 케이스 정의","대화흐름정의","업무 설계서"] },
        { id: "task-wealth-tax", label: "절세", type: "leaf3", children: ["사용자 케이스 정의","대화흐름정의","업무 설계서"] },
      ]},
    ]
  },
  {
    id: "ux", label: "Agent UX Design", type: "group",
    desc: "Agent UX를 구성하는 파운데이션, 레이아웃, 인터랙션, 컴포넌트 가이드입니다.",
    children: [
      { id: "ux-overview", label: "Overview", type: "leaf" },
      { id: "ux-foundation", label: "Foundation", type: "group", children: [
        { id: "ux-foundation-color", label: "Color", type: "leaf" },
        { id: "ux-foundation-type", label: "Typography", type: "leaf" },
        { id: "ux-foundation-icon", label: "Iconography", type: "leaf" },
        { id: "ux-foundation-spacing", label: "Spacing", type: "leaf" },
        { id: "ux-foundation-radius", label: "Radius", type: "leaf" },
        { id: "ux-foundation-elevation", label: "Elevation", type: "leaf" },
        { id: "ux-foundation-motion", label: "Motion", type: "leaf" },
      ]},
      { id: "ux-layout", label: "Layout", type: "group", children: [
        { id: "ux-layout-header", label: "Header", type: "leaf" },
        { id: "ux-layout-content", label: "Content", type: "leaf" },
        { id: "ux-layout-footer", label: "Footer", type: "leaf" },
        { id: "ux-layout-floating", label: "Floating", type: "leaf" },
      ]},
      { id: "ux-interaction", label: "Interaction", type: "group", children: [
        { id: "ux-interaction-conv", label: "Conversation", type: "leaf" },
        { id: "ux-interaction-input", label: "User Input", type: "leaf" },
        { id: "ux-interaction-response", label: "Agent Response", type: "leaf" },
        { id: "ux-interaction-feedback", label: "Feedback", type: "leaf" },
        { id: "ux-interaction-nav", label: "Navigation", type: "leaf" },
      ]},
      { id: "ux-component", label: "Component", type: "group", children: [
        { id: "ux-component-chat", label: "Chat", type: "leaf" },
        { id: "ux-component-inputc", label: "Input", type: "leaf" },
        { id: "ux-component-card", label: "Card", type: "leaf" },
        { id: "ux-component-viz", label: "Visualization", type: "leaf" },
        { id: "ux-component-navc", label: "Navigation", type: "leaf" },
      ]},
    ]
  },
  {
    id: "prototype", label: "Prototype", type: "group",
    desc: "실제 동작하는 인터랙티브 프로토타입입니다.",
    children: [
      { id: "pt-common", label: "Common Conversation", type: "group", children: [
        { id: "pt-common-welcome", label: "웰컴대화", type: "leaf" },
        { id: "pt-common-exit", label: "종료/이탈/예외", type: "leaf" },
      ]},
      { id: "pt-finance", label: "금융비서 Agent", type: "group", children: [
        { id: "pt-finance-master", label: "금융비서 Master", type: "leaf" },
        { id: "pt-finance-product", label: "맞춤상품안내", type: "leaf" },
        { id: "pt-finance-calc", label: "AI금융계산기", type: "leaf" },
      ]},
      { id: "pt-jeonse", label: "전세대출 Agent", type: "group", children: [
        { id: "pt-jeonse-master", label: "AI전세대출 Master", type: "leaf" },
        { id: "pt-jeonse-qa", label: "대화형 질의응답", type: "leaf" },
        { id: "pt-jeonse-guarantee", label: "보증추천", type: "leaf" },
        { id: "pt-jeonse-search", label: "매물탐색", type: "leaf" },
        { id: "pt-jeonse-safety", label: "깡통전세방지", type: "leaf" },
        { id: "pt-jeonse-aftercare", label: "사후관리", type: "leaf" },
      ]},
      { id: "pt-consumer", label: "소비자보호 Agent", type: "group", children: [
        { id: "pt-consumer-master", label: "AI소비자보호 Master", type: "leaf" },
        { id: "pt-consumer-prevention", label: "금융사기 예방", type: "leaf" },
        { id: "pt-consumer-phishing", label: "피싱 탐지", type: "leaf" },
      ]},
      { id: "pt-wealth", label: "종합자산관리 Agent", type: "group", children: [
        { id: "pt-wealth-master", label: "AI종합자산관리 Master", type: "leaf" },
        { id: "pt-wealth-briefing", label: "모닝브리핑", type: "leaf" },
        { id: "pt-wealth-diagnosis", label: "포트폴리오 진단", type: "leaf" },
        { id: "pt-wealth-design", label: "포트폴리오 설계", type: "leaf" },
        { id: "pt-wealth-tax", label: "절세", type: "leaf" },
      ]},
    ]
  },
];

/* ============================================================
   유틸: id로 노드/경로 찾기
   ============================================================ */
function findNode(nodes, id, path = []) {
  for (const n of nodes) {
    const newPath = [...path, n];
    if (n.id === id) return newPath;
    if (n.children && Array.isArray(n.children) && n.children[0] && typeof n.children[0] === 'object') {
      const found = findNode(n.children, id, newPath);
      if (found) return found;
    }
  }
  return null;
}

function countLeaves(node) {
  if (!node.children) return 1;
  if (typeof node.children[0] === 'string') return 1;
  return node.children.reduce((sum, c) => sum + countLeaves(c), 0);
}

/* ============================================================
   LNB 렌더링
   ============================================================ */
const ICONS = {
  intro: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
  method: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
  profile: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  task: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
  ux: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>',
  wireframe: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 7h6M9 11h6M9 15h3"/></svg>',
  prototype: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
};

const CHEV = '<svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';
const CHEV_SM = '<svg class="chev-sm" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>';

let currentLeafId = null;

function renderLNB() {
  const lnb = document.getElementById('lnb');
  lnb.innerHTML = NAV.map(top => renderTop(top)).join('') + `
    <div class="nav-top">
      <a class="nav-top-btn" href="html/flow-sample.html" target="_blank" rel="noopener">
        flow-sample
      </a>
    </div>`;
}

function renderTop(top) {
  if (top.type === 'page') {
    return `
      <div class="nav-top">
        <button class="nav-top-btn" data-nav="${top.id}" onclick="selectPage('${top.id}')">
          ${top.label}
        </button>
      </div>`;
  }
  const childrenHtml = (top.children || []).map(g => renderGroup(g, top.id)).join('');
  return `
    <div class="nav-top">
      <button class="nav-top-btn" data-toggle="top-${top.id}" onclick="toggleTop('${top.id}')">
        ${top.label}${CHEV}
      </button>
      <div class="nav-group-container" id="top-${top.id}">${childrenHtml}</div>
    </div>`;
}

function renderGroup(g, topId) {
  // g.type === 'group' (depth1 그룹, 예: 금융비서 Agent / Foundation) — 폴더처럼 접고 펼 수 있게
  if (g.type === 'group') {
    const itemsHtml = (g.children || []).map(item => renderItem(item)).join('');
    const bodyId = 'grp-' + g.id;
    return `
      <div class="nav-group-wrap">
        <button class="nav-group-btn" data-toggle="${bodyId}" onclick="toggleGroupBody('${g.id}')">${g.label}${CHEV_SM}</button>
        <div class="nav-group-body" id="${bodyId}">${itemsHtml}</div>
      </div>`;
  }
  // 단일 leaf (드물게 top 바로 아래 leaf)
  return renderItem(g);
}

function renderItem(item) {
  // depth2: leaf (단순 페이지) / leaf3 (3depth: 사용자케이스/대화흐름/업무설계) 
  if (item.type === 'leaf') {
    return `
      <div class="nav-item-wrap">
        <button class="nav-item-btn" data-leaf="${item.id}" onclick="selectLeaf('${item.id}')">${item.label}</button>
      </div>`;
  }
  if (item.type === 'leaf3') {
    const subId = 'sub-' + item.id;
    const subsHtml = (item.children || []).map((label, i) => {
      const leafId = item.id + '__' + i;
      return `<button class="nav-leaf-btn" data-leaf="${leafId}" onclick="selectLeaf('${leafId}', '${item.label} · ${label}')">${label}</button>`;
    }).join('');
    return `
      <div class="nav-item-wrap">
        <button class="nav-item-btn" data-toggle="${subId}" onclick="toggleSub('${subId}')">${item.label}${CHEV_SM}</button>
        <div class="nav-leaf-group" id="${subId}">${subsHtml}</div>
      </div>`;
  }
  // 더 깊은 그룹 (예: ux-layout-header 하위 Height/Title 등 — 단순 string 배열)
  if (item.children && typeof item.children[0] === 'string') {
    const subId = 'sub-' + item.id;
    const subsHtml = item.children.map((label, i) => {
      const leafId = item.id + '__' + i;
      return `<button class="nav-leaf-btn" data-leaf="${leafId}" onclick="selectLeaf('${leafId}', '${item.label} · ${label}')">${label}</button>`;
    }).join('');
    return `
      <div class="nav-item-wrap">
        <button class="nav-item-btn" data-toggle="${subId}" onclick="toggleSub('${subId}')">${item.label}${CHEV_SM}</button>
        <div class="nav-leaf-group" id="${subId}">${subsHtml}</div>
      </div>`;
  }
  // group type item (예: ux-layout 하위 Header가 group인 경우는 위에서 처리되므로 거의 안 옴)
  return renderGroup(item);
}

function toggleTop(id) {
  const el = document.getElementById('top-' + id);
  const btn = document.querySelector(`[data-toggle="top-${id}"]`);
  const isOpen = el.classList.contains('open');
  // 같은 레벨의 다른 top은 닫지 않음 (아코디언 강제하지 않음 — 여러 개 펼쳐둘 수 있게)
  el.classList.toggle('open');
  btn.classList.toggle('open');
}

function toggleSub(id) {
  const el = document.getElementById(id);
  const btn = document.querySelector(`[data-toggle="${id}"]`);
  el.classList.toggle('open');
  btn.classList.toggle('open');
}

function toggleGroupBody(id) {
  const bodyId = 'grp-' + id;
  const el = document.getElementById(bodyId);
  const btn = document.querySelector(`[data-toggle="${bodyId}"]`);
  el.classList.toggle('open');
  btn.classList.toggle('open');
}

function setActiveTop(topId) {
  document.querySelectorAll('.nav-top-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-nav="${topId}"]`);
  if (btn) btn.classList.add('active');
}

function clearActiveLeaf() {
  document.querySelectorAll('.nav-item-btn, .nav-leaf-btn').forEach(b => b.classList.remove('active-leaf'));
}

/* ============================================================
   페이지 렌더링
   ============================================================ */
function goHome() {
  selectPage('intro');
}

function selectPage(id) {
  currentLeafId = null;
  setActiveTop(id);
  clearActiveLeaf();
  renderHome(id);
  window.scrollTo(0, 0);
}

// 검색 결과 클릭 등 LNB를 직접 펼치지 않고 이동한 경우에도, 활성 항목이
// 속한 top/leaf3 그룹을 자동으로 펼쳐서 사이드바에서도 바로 보이게 해줌
function revealInLNB(id) {
  const baseId = id.split('__')[0];
  const path = findNode(NAV, baseId);
  if (!path || !path.length) return;

  const top = path[0];
  if (top.type !== 'page') {
    const topEl = document.getElementById('top-' + top.id);
    const topBtn = document.querySelector(`[data-toggle="top-${top.id}"]`);
    if (topEl && !topEl.classList.contains('open')) {
      topEl.classList.add('open');
      if (topBtn) topBtn.classList.add('open');
    }
  }

  // depth1 그룹(금융비서 Agent 등)도 폴더처럼 접혀 있으므로 함께 펼쳐줌
  if (path.length > 2) {
    const midGroup = path[1];
    if (midGroup.type === 'group') {
      const grpId = 'grp-' + midGroup.id;
      const grpEl = document.getElementById(grpId);
      const grpBtn = document.querySelector(`[data-toggle="${grpId}"]`);
      if (grpEl && !grpEl.classList.contains('open')) {
        grpEl.classList.add('open');
        if (grpBtn) grpBtn.classList.add('open');
      }
    }
  }

  const target = path[path.length - 1];
  if (target.type === 'leaf3' || (target.children && typeof target.children[0] === 'string')) {
    const subId = 'sub-' + target.id;
    const subEl = document.getElementById(subId);
    const subBtn = document.querySelector(`[data-toggle="${subId}"]`);
    if (subEl && !subEl.classList.contains('open')) {
      subEl.classList.add('open');
      if (subBtn) subBtn.classList.add('open');
    }
  }
}

function selectLeaf(id, customLabel) {
  currentLeafId = id;
  document.querySelectorAll('.nav-top-btn').forEach(b => b.classList.remove('active'));
  clearActiveLeaf();
  revealInLNB(id);
  const btn = document.querySelector(`[data-leaf="${id}"]`);
  if (btn) {
    btn.classList.add('active-leaf');
    btn.scrollIntoView({ block: 'nearest' });
  }
  renderLeafPage(id, customLabel);
  window.scrollTo(0, 0);
}

const TOP_DESC = {
  intro: "이 가이드 시스템의 목적과 사용법을 소개합니다.",
  method: "NH AI Agent UX 가이드 시스템이 따르는 설계 방법론을 설명합니다.",
};

function renderHome(topId) {
  const top = NAV.find(n => n.id === topId);
  const content = document.getElementById('content');

  if (top.type === 'page') {
    const crumbHtml = `<div class="crumb"><span>${top.label}</span></div>`;

    if (DOC_FILES[top.id]) {
      loadDocFile(top.id, crumbHtml, top.label);
      return;
    }

    content.innerHTML = `
      ${crumbHtml}
      <div class="page-title">${top.label}</div>
      <div class="page-desc">${TOP_DESC[top.id] || ''}</div>
      <div class="empty-state">
        <strong>아직 작성 중인 문서예요</strong>
        콘텐츠가 준비되면 이 영역에 표시됩니다.
      </div>`;
    renderTOC([]);
    return;
  }

  // 그룹 top — 하위 그룹/아이템들을 카드로 보여주기
  const totalLeaves = top.children.reduce((sum, c) => sum + countLeaves(c), 0);

  let cardsHtml = '';
  const tocItems = [];
  top.children.forEach((group, idx) => {
    const secId = 'sec-' + idx;
    tocItems.push({ id: secId, label: group.label });
    cardsHtml += `<div class="section-block" id="${secId}">
      <div class="section-block-title">${group.label}</div>
      <div class="card-grid">`;
    (group.children || []).forEach(item => {
      const leafCount = item.children ? (typeof item.children[0] === 'string' ? item.children.length : countLeaves(item)) : 1;
      cardsHtml += `
        <div class="nav-card" onclick="${item.type === 'leaf' ? `selectLeaf('${item.id}')` : `expandAndScroll('${top.id}','${group.id}','${item.id}')`}">
          <div class="nav-card-icon">${ICONS[top.id] || ''}</div>
          <div class="nav-card-title">${item.label}</div>
          <div class="nav-card-desc">${item.type === 'leaf' ? '문서 1건' : leafCount + '개 하위 문서'}</div>
        </div>`;
    });
    cardsHtml += `</div></div>`;
  });

  content.innerHTML = `
    <div class="crumb"><span>${top.label}</span></div>
    <div class="page-title">${top.label}</div>
    <div class="page-desc">${top.desc || ''}</div>
    <div class="status-row">
      <div class="status-chip"><b>${top.children.length}</b>개 카테고리</div>
      <div class="status-chip"><b>${totalLeaves}</b>개 하위 문서</div>
    </div>
    ${cardsHtml}
  `;

  renderTOC(tocItems);
}

function renderTOC(items) {
  const toc = document.getElementById('toc');
  if (!items || !items.length) { toc.innerHTML = ''; return; }
  toc.innerHTML = `
    <div class="toc-title">ON THIS PAGE</div>
    <div class="toc-list">
      ${items.map((it, i) => `<a class="toc-link${i === 0 ? ' active' : ''}" data-target="${it.id}" onclick="scrollToSection('${it.id}')">${it.label}</a>`).join('')}
    </div>
  `;
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
  const link = document.querySelector(`.toc-link[data-target="${id}"]`);
  if (link) link.classList.add('active');
}

function expandAndScroll(topId, groupId, itemId) {
  // LNB에서 해당 top, group, item을 펼쳐주기
  const topEl = document.getElementById('top-' + topId);
  const topBtn = document.querySelector(`[data-toggle="top-${topId}"]`);
  if (topEl && !topEl.classList.contains('open')) {
    topEl.classList.add('open');
    topBtn.classList.add('open');
  }
  const grpId = 'grp-' + groupId;
  const grpEl = document.getElementById(grpId);
  const grpBtn = document.querySelector(`[data-toggle="${grpId}"]`);
  if (grpEl && !grpEl.classList.contains('open')) {
    grpEl.classList.add('open');
    if (grpBtn) grpBtn.classList.add('open');
  }
  const subId = 'sub-' + itemId;
  const subEl = document.getElementById(subId);
  const subBtn = document.querySelector(`[data-toggle="${subId}"]`);
  if (subEl) {
    subEl.classList.add('open');
    subBtn.classList.add('open');
    subEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function renderLeafPage(id, customLabel) {
  const content = document.getElementById('content');
  const path = findNode(NAV, id.split('__')[0]) || [];

  let label = customLabel;
  let crumbParts = [];

  if (path.length) {
    crumbParts = path.map(p => p.label);
    if (!label) label = path[path.length - 1].label;
  } else {
    label = customLabel || id;
  }

  const crumbHtml = `<div class="crumb">${crumbParts.map((c, i) => `<span>${c}</span>${i < crumbParts.length - 1 ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>' : ''}`).join('')}</div>`;

  // 실제 콘텐츠가 준비된 문서 — 별도 html 파일을 fetch로 불러와 같은 화면에 주입
  if (DOC_FILES[id]) {
    loadDocFile(id, crumbHtml, label);
    return;
  }

  content.innerHTML = `
    ${crumbHtml}
    <div class="page-title">${label}</div>
    <div class="empty-state">
      <strong>아직 작성 중인 문서예요</strong>
      콘텐츠가 준비되면 이 영역에 표시됩니다.
    </div>
  `;
  renderTOC([]);
}

/* ============================================================
   (구) 실제 문서 콘텐츠 — Agent Profile / Agent Task Design / intro·method
   문서는 이제 DOC_FILES 매핑을 통해 html/*.html 파일에서 fetch로 불러옵니다.
   (구 DOCS 객체는 완전히 제거되었고, 문서 텍스트는 buildSearchIndex()의
   백그라운드 색인 작업에서 각 html 파일을 fetch해 채웁니다.)
   ============================================================ */

/* ============================================================
   문서 내 검색
   ============================================================ */
function stripHtml(html) {
  return (html || '').replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
}

function buildSearchIndex() {
  const index = [];

  function addEntry(id, label, path, kind) {
    index.push({
      id,
      label,
      path: path.join(' > '),
      kind, // 'page' (top-level 클릭) or 'leaf' (selectLeaf 클릭)
      // 문서 본문 텍스트는 첫 페인트를 막지 않도록 initSearch() 이후
      // 백그라운드 작업(warmSearchIndexInBackground)에서 비동기로 채워요.
      text: '',
    });
  }

  NAV.forEach((top) => {
    if (top.type === 'page') {
      addEntry(top.id, top.label, [], 'page');
      return;
    }
    (top.children || []).forEach((group) => {
      if (group.type === 'group') {
        (group.children || []).forEach((item) => {
          if (item.type === 'leaf') {
            addEntry(item.id, item.label, [top.label, group.label], 'leaf');
          } else if (item.type === 'leaf3' || (item.children && typeof item.children[0] === 'string')) {
            (item.children || []).forEach((subLabel, i) => {
              addEntry(item.id + '__' + i, item.label + ' · ' + subLabel, [top.label, group.label], 'leaf');
            });
          }
        });
      } else if (group.type === 'leaf') {
        addEntry(group.id, group.label, [top.label], 'leaf');
      }
    });
  });

  return index;
}

const SEARCH_INDEX = buildSearchIndex();

function runSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return SEARCH_INDEX
    .map((entry) => {
      const label = entry.label.toLowerCase();
      const path = entry.path.toLowerCase();
      const text = entry.text.toLowerCase();
      let score = -1;
      let snippet = '';

      if (label === q) score = 100;
      else if (label.startsWith(q)) score = 80;
      else if (label.includes(q)) score = 60;
      else if (path.includes(q)) score = 40;
      else if (text.includes(q)) {
        score = 20;
        const idx = text.indexOf(q);
        const start = Math.max(0, idx - 30);
        snippet = (start > 0 ? '…' : '') + entry.text.slice(start, idx + q.length + 40).trim() + '…';
      }

      return score >= 0 ? { ...entry, score, snippet } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
}

function highlight(text, query) {
  if (!text) return '';
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return text.slice(0, idx) + '<mark>' + text.slice(idx, idx + query.length) + '</mark>' + text.slice(idx + query.length);
}

let searchActiveIndex = -1;

function renderSearchResults(results, query) {
  const box = document.getElementById('searchResults');
  searchActiveIndex = -1;

  if (!query.trim()) {
    box.classList.remove('open');
    box.innerHTML = '';
    return;
  }

  if (!results.length) {
    box.innerHTML = `<div class="search-empty">"${query}"에 대한 검색 결과가 없어요</div>`;
    box.classList.add('open');
    return;
  }

  box.innerHTML = results.map((r, i) => `
    <button type="button" class="search-result" data-index="${i}" data-id="${r.id}" data-kind="${r.kind}">
      <div class="search-result-label">${highlight(r.label, query)}</div>
      ${r.path ? `<div class="search-result-path">${r.path}</div>` : ''}
      ${r.snippet ? `<div class="search-result-snippet">${highlight(r.snippet, query)}</div>` : ''}
    </button>
  `).join('');
  box.classList.add('open');

  box.querySelectorAll('.search-result').forEach((btn) => {
    btn.addEventListener('click', () => selectSearchResult(btn.dataset.id, btn.dataset.kind));
  });
}

function selectSearchResult(id, kind) {
  if (kind === 'page') selectPage(id);
  else selectLeaf(id);
  closeSearch();
}

function closeSearch() {
  const input = document.getElementById('searchInput');
  const box = document.getElementById('searchResults');
  input.value = '';
  box.classList.remove('open');
  box.innerHTML = '';
  input.blur();
}

function initSearch() {
  const input = document.getElementById('searchInput');
  const box = document.getElementById('searchResults');

  input.addEventListener('input', () => {
    const results = runSearch(input.value);
    renderSearchResults(results, input.value);
  });

  input.addEventListener('keydown', (e) => {
    const items = Array.from(box.querySelectorAll('.search-result'));
    if (e.key === 'Escape') {
      closeSearch();
    } else if (e.key === 'ArrowDown' && items.length) {
      e.preventDefault();
      searchActiveIndex = Math.min(searchActiveIndex + 1, items.length - 1);
      items.forEach((el, i) => el.classList.toggle('active', i === searchActiveIndex));
      items[searchActiveIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp' && items.length) {
      e.preventDefault();
      searchActiveIndex = Math.max(searchActiveIndex - 1, 0);
      items.forEach((el, i) => el.classList.toggle('active', i === searchActiveIndex));
      items[searchActiveIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = items[searchActiveIndex] || items[0];
      if (target) selectSearchResult(target.dataset.id, target.dataset.kind);
    }
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      input.focus();
      input.select();
    }
  });

  document.addEventListener('click', (e) => {
    if (!document.getElementById('searchWrap').contains(e.target)) closeSearch();
  });
}

/* ============================================================
   초기화
   ============================================================ */
renderLNB();
selectPage('intro');
initSearch();

/* ============================================================
   검색 색인 백그라운드 워밍업 — 첫 페인트를 막지 않도록 initSearch() 이후
   fire-and-forget로 실행. DOC_FILES의 모든 문서를 조금씩(5개씩) 순차
   배치로 fetch해 SEARCH_INDEX의 해당 엔트리 text를 채웁니다. 이미
   loadDocFile()이 열어봐서 docCache에 있는 문서는 다시 fetch하지 않아요.
   ============================================================ */
async function warmSearchIndexInBackground() {
  const BATCH_SIZE = 5;
  const ids = Object.keys(DOC_FILES);

  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (id) => {
        try {
          const html = await fetchDocHtml(id);
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const docBody = doc.querySelector('.doc-body');
          const text = stripHtml(docBody ? docBody.innerHTML : html);

          // leaf3 계열은 SEARCH_INDEX에 'baseId__i' 형태로 등록돼 있어
          // id 값 그대로 찾으면 됨(예: task-common-welcome__0).
          const entry = SEARCH_INDEX.find((e) => e.id === id);
          if (entry) entry.text = text;
        } catch (err) {
          // 개별 문서 fetch 실패는 검색 인덱싱만 못 채우는 것이라 조용히 무시
        }
      })
    );
  }
}

warmSearchIndexInBackground();
