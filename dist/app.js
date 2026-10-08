const app = document.querySelector('#app');

const scenarios = [
  {
    id: 'refund',
    category: 'Billing & refunds',
    icon: '↗',
    title: 'The refund that missed a deadline',
    description: 'Customer was promised a refund, but the money has not arrived after 7 business days.',
    context: 'A returning customer is frustrated because a promised refund is late. Your job is to rebuild trust without promising an outcome you cannot control.',
    goal: 'De-escalate, verify the case, and set a policy-safe next step.',
    language: 'ID + EN',
    difficulty: 'Standard',
    duration: '6 min',
    status: 'In progress',
    completion: 72,
    risk: 'Policy risk',
    turns: [
      {
        customer: 'Sudah tujuh hari kerja dan refund saya belum masuk. Ini bukan pertama kalinya saya harus menghubungi support. Bisa tolong jelaskan apa yang terjadi?',
        customerEn: 'It has been seven business days and my refund still hasn’t arrived. This is not the first time I have had to contact support. Can you explain what happened?',
        options: [
          { label: 'Saya mengerti ini sangat membuat frustrasi. Saya akan cek status refund dan jelaskan langkah berikutnya dengan jelas.', quality: 'strong', tag: 'Empathy + ownership' },
          { label: 'Refund biasanya memang membutuhkan waktu. Silakan tunggu beberapa hari lagi.', quality: 'weak', tag: 'Dismissive' },
          { label: 'Tenang, saya pastikan uangnya masuk hari ini.', quality: 'risky', tag: 'Unsupported promise' },
        ],
        reply: {
          strong: 'Terima kasih sudah mau mengeceknya. Saya tidak ingin mengulang semua cerita dari awal—saya punya nomor pesanan dan email konfirmasi di sini.',
          weak: 'Saya sudah menunggu sesuai estimasi yang diberikan. Jawaban itu tidak membantu saya memahami posisi refund saya sekarang.',
          risky: 'Kalau memang bisa dipastikan hari ini, saya akan menunggu. Tapi saya sudah beberapa kali mendapat janji yang sama.',
        },
      },
      {
        customer: 'Order saya #RF-4821. Tim sebelumnya bilang refund sudah diproses hari Senin, tetapi saya belum menerima referensi transaksi apa pun.',
        customerEn: 'My order is #RF-4821. The previous team said the refund was processed on Monday, but I never received a transaction reference.',
        options: [
          { label: 'Saya akan verifikasi status pemrosesan dan mengirimkan referensi yang tersedia. Jika sudah melewati SLA, saya akan eskalasi ke billing.', quality: 'strong', tag: 'Policy-safe next step' },
          { label: 'Saya tidak bisa melihat sistem billing. Anda harus menunggu sampai tim billing merespons.', quality: 'weak', tag: 'No ownership' },
          { label: 'Saya akan langsung memproses ulang refund Anda sekarang.', quality: 'risky', tag: 'Out of scope' },
        ],
        reply: {
          strong: 'Baik, terima kasih. Saya lebih tenang kalau ada referensi yang bisa saya gunakan saat mengecek ke bank.',
          weak: 'Jadi saya harus mengulang lagi ke tim lain? Saya butuh seseorang yang bisa memiliki kasus ini sampai selesai.',
          risky: 'Apakah refund pertama dibatalkan? Saya tidak ingin ada dua transaksi atau masalah baru.',
        },
      },
      {
        customer: 'Saya bersedia menunggu satu hari lagi, tapi saya perlu tahu kapan saya akan mendapat update yang pasti.',
        customerEn: 'I can wait one more day, but I need to know exactly when I will receive a concrete update.',
        options: [
          { label: 'Saya akan kirim update paling lambat besok pukul 15.00. Jika belum ada status, kasus ini tetap saya eskalasi dan saya kabari hasilnya.', quality: 'strong', tag: 'Clear expectation' },
          { label: 'Kami akan menghubungi Anda jika ada kabar.', quality: 'weak', tag: 'Vague close' },
          { label: 'Saya janji refund selesai sebelum besok sore.', quality: 'risky', tag: 'Overpromise' },
        ],
        reply: {
          strong: 'Baik, itu jelas. Saya akan menunggu update besok pukul 15.00 dan tidak perlu menjelaskan kasus ini dari awal lagi.',
          weak: 'Saya tidak tahu kapan “jika ada kabar” itu. Saya butuh waktu yang lebih spesifik.',
          risky: 'Saya pegang janji itu. Kalau belum masuk besok sore, saya akan mengajukan komplain resmi.',
        },
      },
    ],
  },
  {
    id: 'delivery',
    category: 'Delivery support',
    icon: '⌁',
    title: 'The delivery that stopped moving',
    description: 'A high-value package has shown no tracking update for 48 hours.',
    context: 'The customer is worried about a time-sensitive delivery. Show calm ownership, explain what you can verify, and protect the escalation path.',
    goal: 'Clarify the delivery status and create a confidence-building recovery plan.',
    language: 'English',
    difficulty: 'Easy',
    duration: '4 min',
    status: 'Ready',
    completion: 0,
    risk: 'Trust risk',
    turns: [
      {
        customer: 'My package has not moved for two days and it contains a gift I need this weekend. Can you tell me if it is lost?',
        options: [
          { label: 'I can see why you are worried. I’ll check the latest scan and walk you through what we can do next.', quality: 'strong', tag: 'Empathy + ownership' },
          { label: 'Tracking can be delayed. Please wait another few days.', quality: 'weak', tag: 'Dismissive' },
          { label: 'It is definitely not lost. I guarantee it will arrive tomorrow.', quality: 'risky', tag: 'Unsupported promise' },
        ],
        reply: {
          strong: 'Thank you. The tracking page only shows “in transit,” so I was getting nervous.',
          weak: 'That does not help much. I need to know whether someone is actually checking it.',
          risky: 'Okay, I am trusting that guarantee because I need it this weekend.',
        },
      },
      {
        customer: 'The last scan says it arrived at the regional hub. What happens if there is no update by tomorrow?',
        options: [
          { label: 'If there is no scan by tomorrow, I will open a carrier trace and share the case reference with you.', quality: 'strong', tag: 'Clear escalation' },
          { label: 'We cannot do anything until the carrier updates the page.', quality: 'weak', tag: 'No ownership' },
          { label: 'I will send a replacement right away even before checking the carrier.', quality: 'risky', tag: 'Out of scope' },
        ],
        reply: {
          strong: 'That gives me a clear next step. Please make sure I do not have to start over with another agent.',
          weak: 'So there is no plan if the carrier does not update it?',
          risky: 'I appreciate the offer, but I do not want a second package if the first one is still moving.',
        },
      },
      {
        customer: 'Please send me the case reference and the exact time I should expect an update.',
        options: [
          { label: 'I’ll send the reference now and update you by 10:00 tomorrow, even if the carrier has not replied yet.', quality: 'strong', tag: 'Specific commitment' },
          { label: 'You can check the tracking page for any updates.', quality: 'weak', tag: 'Vague close' },
          { label: 'I promise the package will arrive before the weekend.', quality: 'risky', tag: 'Overpromise' },
        ],
        reply: {
          strong: 'Perfect, I know what to expect now. Thank you for owning this.',
          weak: 'I already know how to check the tracking page. I asked what you would do.',
          risky: 'I will hold you to that promise.',
        },
      },
    ],
  },
  {
    id: 'cancel',
    category: 'Retention',
    icon: '◌',
    title: 'The customer ready to cancel',
    description: 'A long-term customer wants to cancel after a pricing change.',
    context: 'A loyal customer feels surprised by a price increase. Your role is to listen, explain options accurately, and avoid pressuring them.',
    goal: 'Preserve trust while finding a policy-approved option.',
    language: 'Bahasa Indonesia',
    difficulty: 'Hard',
    duration: '8 min',
    status: 'Ready',
    completion: 0,
    risk: 'Churn risk',
    turns: [
      {
        customer: 'Saya sudah berlangganan hampir tiga tahun, tapi kenaikan harga ini membuat saya merasa tidak dihargai. Saya ingin membatalkan.',
        options: [
          { label: 'Saya paham kenapa perubahan ini terasa mengecewakan setelah tiga tahun bersama kami. Boleh saya pahami apa yang paling berat dari kenaikannya?', quality: 'strong', tag: 'Listen first' },
          { label: 'Harga baru berlaku untuk semua pelanggan, jadi tidak ada yang bisa saya lakukan.', quality: 'weak', tag: 'Premature close' },
          { label: 'Saya bisa berikan diskon khusus tanpa perlu cek akun Anda.', quality: 'risky', tag: 'Unapproved offer' },
        ],
        reply: {
          strong: 'Yang paling berat adalah saya tidak diberi pilihan. Saya merasa loyalitas saya tidak dihitung.',
          weak: 'Kalau begitu memang tidak ada alasan untuk tetap berlangganan.',
          risky: 'Kalau diskonnya benar-benar ada, saya mungkin berubah pikiran.',
        },
      },
      {
        customer: 'Saya masih membutuhkan produknya, tapi harga baru terlalu tinggi untuk penggunaan saya sekarang.',
        options: [
          { label: 'Mari saya cek opsi plan dan benefit yang tersedia di akun Anda. Saya akan jelaskan perbedaannya tanpa memaksa Anda memilih.', quality: 'strong', tag: 'Explore options' },
          { label: 'Kalau masih butuh produk, berarti sebaiknya tetap pakai plan sekarang.', quality: 'weak', tag: 'Pushy' },
          { label: 'Saya bisa mengembalikan harga lama untuk selamanya.', quality: 'risky', tag: 'Unsupported promise' },
        ],
        reply: {
          strong: 'Baik, saya ingin melihat opsi yang memang resmi dan sesuai kebutuhan saya.',
          weak: 'Saya tidak ingin dipaksa mempertahankan plan yang sudah tidak cocok.',
          risky: 'Saya butuh konfirmasi tertulis soal harga lama itu.',
        },
      },
      {
        customer: 'Tolong jelaskan pilihan saya dan apa yang terjadi pada data saya kalau saya turun plan atau membatalkan.',
        options: [
          { label: 'Saya akan jelaskan dampak tiap pilihan, termasuk data dan tanggal efektifnya. Anda tetap yang memutuskan.', quality: 'strong', tag: 'Transparent guidance' },
          { label: 'Data Anda aman, jadi tidak perlu khawatir.', quality: 'weak', tag: 'Too broad' },
          { label: 'Saya sarankan jangan cancel karena Anda akan kehilangan semua data.', quality: 'risky', tag: 'Fear-based' },
        ],
        reply: {
          strong: 'Terima kasih. Dengan informasi itu, saya bisa mengambil keputusan tanpa merasa ditekan.',
          weak: 'Saya justru ingin tahu detailnya, bukan hanya diyakinkan.',
          risky: 'Saya tidak nyaman kalau keputusan saya dibuat berdasarkan rasa takut kehilangan data.',
        },
      },
    ],
  },
];

function getInitialView() {
  const path = window.location.pathname.replace(/^\//, '') || 'dashboard';
  return ['scenarios', 'setup', 'roleplay', 'feedback', 'insights', 'dashboard'].includes(path) ? path : 'dashboard';
}

const state = {
  view: getInitialView(),
  query: '',
  filter: 'All',
  setupLanguage: 'Bahasa Indonesia',
  setupDifficulty: 'Standard',
  selectedScenario: scenarios[0],
  session: null,
  completed: 3,
  totalMinutes: 42,
  streak: 4,
  toast: '',
};

const icons = {
  grid: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>',
  scenario: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v14H7.5A2.5 2.5 0 0 0 5 19.5v-14Z"/><path d="M5 19.5A2.5 2.5 0 0 0 7.5 22H20"/><path d="M9 7h7M9 10h5"/></svg>',
  insight: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5M4 19h17"/><path d="m7 15 4-4 3 2 5-7"/><path d="M17 6h2v2"/></svg>',
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>',
  back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/></svg>',
  users: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3.5 19c.6-3 2.4-4.5 5.5-4.5s4.9 1.5 5.5 4.5M16 5.5a3 3 0 0 1 0 5.8M16 14.8c2.7.3 4.1 1.7 4.5 4.2"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13 2-8 12h6l-1 8 8-12h-6l1-8Z"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
};

function esc(value = '') {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char]));
}

function pathFor(view) {
  return view === 'dashboard' ? '/' : `/${view}`;
}

function navigate(view, replace = false) {
  state.view = view;
  if (view !== 'roleplay') state.session = null;
  history[replace ? 'replaceState' : 'pushState']({}, '', pathFor(view));
  render();
}

function logo() {
  return `<div class="brand-lockup"><div class="brand-mark"><span></span><i></i></div><div><div class="brand-name">RoleForge</div><div class="brand-sub">readiness lab</div></div></div>`;
}

function navItem(view, label, icon) {
  return `<button class="nav-item ${state.view === view ? 'active' : ''}" data-view="${view}"><span class="nav-icon">${icons[icon]}</span><span>${label}</span>${view === 'insights' ? '<span class="nav-badge">3</span>' : ''}</button>`;
}

function topbar(title, eyebrow) {
  return `<header class="topbar"><div class="topbar-title"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1></div><div class="topbar-actions"><div class="status-pill"><span class="status-dot"></span> Demo workspace</div><div class="avatar">AF</div></div></header>`;
}

function shell(content) {
  return `<div class="app-shell"><aside class="sidebar">${logo()}<div class="workspace-switcher"><span class="workspace-dot">A</span><div><strong>Atlas Support</strong><small>Training workspace</small></div><span class="chevron">⌄</span></div><nav class="primary-nav"><div class="nav-label">Workspace</div>${navItem('dashboard', 'Dashboard', 'grid')}${navItem('scenarios', 'Scenarios', 'scenario')}${navItem('insights', 'Insights', 'insight')}</nav><div class="sidebar-bottom"><div class="claude-note"><div class="note-icon">${icons.sparkle}</div><div><strong>Built for better practice.</strong><span>Claude-powered dynamic roleplay is next.</span></div></div><div class="user-row"><div class="avatar avatar-small">AF</div><div><strong>Arif F.</strong><small>Founder workspace</small></div><button class="more-button">•••</button></div></div></aside><main class="main-content">${content}</main><div class="mobile-nav">${navItem('dashboard', 'Home', 'grid')}${navItem('scenarios', 'Practice', 'scenario')}${navItem('insights', 'Insights', 'insight')}</div></div>`;
}

function meter(label, value, tone = 'lime', note = '') {
  return `<div class="meter-row"><div class="meter-head"><span>${label}</span><strong>${value}%</strong></div><div class="meter-track"><span class="meter-fill ${tone}" style="width:${value}%"></span></div>${note ? `<small>${note}</small>` : ''}</div>`;
}

function scenarioCard(scenario, featured = false) {
  return `<article class="scenario-card ${featured ? 'featured' : ''}" data-scenario="${scenario.id}"><div class="scenario-card-top"><span class="scenario-icon">${scenario.icon}</span><span class="difficulty difficulty-${scenario.difficulty.toLowerCase()}">${scenario.difficulty}</span></div><div class="scenario-copy"><span class="category">${esc(scenario.category)}</span><h3>${esc(scenario.title)}</h3><p>${esc(scenario.description)}</p></div><div class="scenario-meta"><span>${icons.clock} ${scenario.duration}</span><span>${icons.sparkle} ${scenario.language}</span></div><div class="scenario-footer"><span class="risk-tag">${scenario.risk}</span>${scenario.completion ? `<span class="mini-progress"><i style="width:${scenario.completion}%"></i>${scenario.completion}%</span>` : '<span class="start-label">Start practice ' + icons.arrow + '</span>'}</div></article>`;
}

function dashboardView() {
  return shell(`${topbar('Good morning, Arif.', 'Thursday · 08 October 2026')}<div class="content-scroll"><section class="hero-grid"><div class="hero-copy"><div class="signal-label"><span class="signal-pulse"></span> Your practice signal is strong</div><h2>Make the difficult<br /><em>conversation</em> easier.</h2><p>Practice the moments that usually break the script—then turn every attempt into a clearer next step.</p><button class="button button-dark" data-action="start-featured">Start a practice session ${icons.arrow}</button></div><div class="readiness-card"><div class="card-kicker"><span>Team readiness</span><span class="trend-up">↑ 8.4%</span></div><div class="readiness-number">78<span>/100</span></div><div class="readiness-caption">Above your workspace average <strong>+12</strong></div><div class="readiness-ring"><div class="ring-center"><strong>78%</strong><span>ready</span></div></div><div class="readiness-foot"><span><i class="legend-dot lime"></i>Current score</span><span><i class="legend-dot slate"></i>Target 85</span></div></div></section><section class="stat-grid"><div class="stat-card"><div class="stat-icon lime-bg">${icons.bolt}</div><div><span class="stat-label">Sessions completed</span><strong>03</strong><small><b>+2</b> this week</small></div></div><div class="stat-card"><div class="stat-icon lavender-bg">${icons.clock}</div><div><span class="stat-label">Practice minutes</span><strong>${state.totalMinutes}</strong><small><b>+18%</b> vs last week</small></div></div><div class="stat-card"><div class="stat-icon coral-bg">${icons.users}</div><div><span class="stat-label">Team average</span><strong>66<span>/100</span></strong><small><b>+5.1%</b> this month</small></div></div><div class="stat-card stat-streak"><div><span class="stat-label">Practice streak</span><strong>${state.streak} days</strong><div class="streak-dots"><i></i><i></i><i></i><i></i><i class="muted"></i><i class="muted"></i><i class="muted"></i></div></div><span class="streak-mark">✦</span></div></section><section class="dashboard-lower"><div class="panel focus-panel"><div class="panel-heading"><div><span class="eyebrow">Recommended next</span><h3>Focus on policy-safe empathy</h3></div><span class="panel-count">01</span></div><p class="panel-intro">Your last three attempts scored high on warmth but dipped when the customer asked for a concrete timeline.</p><div class="focus-quote"><span class="quote-mark">“</span><p>Give the customer a specific next update time—without promising the final outcome.</p></div><div class="focus-footer"><div class="coach-avatar">✦</div><span>Based on your latest session <strong>Refund that missed a deadline</strong></span><button class="icon-button" data-action="start-featured">${icons.arrow}</button></div></div><div class="panel progress-panel"><div class="panel-heading"><div><span class="eyebrow">Your development</span><h3>Competency progress</h3></div><button class="text-button" data-view="insights">View insights ${icons.arrow}</button></div><div class="meter-list">${meter('Empathy', 86, 'lime', 'Your strongest signal')}${meter('Accuracy', 74, 'lavender', 'Keep answers grounded')}${meter('Policy compliance', 68, 'coral', 'One priority area')}${meter('Escalation judgment', 71, 'blue', 'Improving steadily')}</div></div></section><section class="section-heading"><div><span class="eyebrow">Practice library</span><h3>Pick up where you left off</h3></div><button class="text-button" data-view="scenarios">See all scenarios ${icons.arrow}</button></section><div class="scenario-grid dashboard-scenarios">${scenarioCard(scenarios[0], true)}${scenarioCard(scenarios[1])}</div></div>`);
}

function scenariosView() {
  const categories = ['All', ...new Set(scenarios.map((s) => s.category))];
  const filtered = scenarios.filter((s) => (state.filter === 'All' || s.category === state.filter) && `${s.title} ${s.description}`.toLowerCase().includes(state.query.toLowerCase()));
  return shell(`${topbar('Practice library', 'Workspace · Scenarios')}<div class="content-scroll"><section class="page-intro-row"><div><h2>Practice the moment<br /><em>that matters.</em></h2><p>Choose a scenario, set the room, and find your next best move.</p></div><div class="scenario-total"><strong>${String(scenarios.length).padStart(2, '0')}</strong><span>scenarios<br />available</span></div></section><div class="toolbar"><div class="search-field">${icons.search}<input id="scenario-search" value="${esc(state.query)}" placeholder="Search scenarios..." /></div><div class="filter-row">${categories.map((cat) => `<button class="filter-chip ${state.filter === cat ? 'active' : ''}" data-filter="${esc(cat)}">${esc(cat)}</button>`).join('')}</div></div><div class="scenario-grid scenario-library">${filtered.length ? filtered.map((s) => scenarioCard(s)).join('') : '<div class="empty-state"><span>⌕</span><h3>No scenario found</h3><p>Try a different search or filter.</p></div>'}</div><section class="roadmap-banner"><div class="roadmap-mark">${icons.sparkle}</div><div><span class="eyebrow">What comes next</span><h3>More realistic practice, grounded in your SOPs.</h3><p>This demo uses reliable mock customer responses. In the next build, Claude will power dynamic roleplay, SOP grounding, and coaching reports—without changing the practice flow your team already knows.</p></div><span class="roadmap-tag">Roadmap · v0.2</span></section></div>`);
}

function setupView() {
  const s = state.selectedScenario;
  return shell(`${topbar('Set up your practice', 'Practice · Session setup')}<div class="content-scroll"><button class="back-link" data-view="scenarios">${icons.back} Back to scenarios</button><section class="setup-layout"><div class="setup-summary"><div class="scenario-icon large">${s.icon}</div><span class="category">${esc(s.category)}</span><h2>${esc(s.title)}</h2><p>${esc(s.context)}</p><div class="goal-box"><span class="eyebrow">Your goal</span><strong>${esc(s.goal)}</strong></div><div class="setup-meta"><span>${icons.clock} ${s.duration}</span><span>${icons.sparkle} ${s.language}</span><span class="risk-tag">${s.risk}</span></div></div><div class="setup-panel panel"><div class="panel-heading"><div><span class="eyebrow">Configure the room</span><h3>How do you want to practice?</h3></div><span class="step-count">01 / 01</span></div><div class="setup-group"><label>Conversation language</label><div class="option-grid two">${['Bahasa Indonesia', 'English'].map((x) => `<button class="option-button ${state.setupLanguage === x ? 'selected' : ''}" data-language="${x}"><span class="option-check">${state.setupLanguage === x ? icons.check : ''}</span>${x}<small>${x === 'Bahasa Indonesia' ? 'Natural local phrasing' : 'Global support tone'}</small></button>`).join('')}</div></div><div class="setup-group"><label>Difficulty</label><div class="option-grid three">${['Easy', 'Standard', 'Hard'].map((x) => `<button class="option-button compact ${state.setupDifficulty === x ? 'selected' : ''}" data-difficulty="${x}"><span class="difficulty-dot ${x.toLowerCase()}"></span>${x}<small>${x === 'Easy' ? 'Clear intent' : x === 'Standard' ? 'Some friction' : 'High ambiguity'}</small></button>`).join('')}</div></div><div class="setup-note"><span class="note-icon">${icons.sparkle}</span><p><strong>AI customer behavior</strong> will adapt to your response. Stay curious, own the next step, and avoid promising what you cannot verify.</p></div><button class="button button-dark full" data-action="begin-session">Enter the practice room ${icons.arrow}</button></div></section></div>`);
}

function transcriptMessage(message) {
  return `<div class="transcript-message ${message.role}"><div class="message-meta"><span class="message-avatar">${message.role === 'customer' ? 'C' : 'AF'}</span><strong>${message.role === 'customer' ? 'AI customer' : 'You · agent'}</strong><span>${message.time || 'now'}</span></div><div class="message-bubble">${esc(message.text)}</div></div>`;
}

function roleplayView() {
  const s = state.selectedScenario;
  const session = state.session || { transcript: [], turn: 0, done: false, selected: null };
  const turn = s.turns[Math.min(session.turn, s.turns.length - 1)];
  const progress = Math.min(100, Math.round((session.turn / s.turns.length) * 100));
  const isFinished = session.done;
  return shell(`${topbar(isFinished ? 'Session complete' : 'Practice room', `${s.category} · ${state.setupLanguage}`)}<div class="content-scroll roleplay-scroll"><div class="roleplay-topline"><button class="back-link" data-view="scenarios">${icons.back} Exit session</button><div class="live-session"><span class="live-dot"></span>${isFinished ? 'Session saved' : 'Live role-play'}<span class="divider-dot">·</span><strong>${s.title}</strong></div><span class="turn-count">${String(Math.min(session.turn + 1, s.turns.length)).padStart(2, '0')} / ${String(s.turns.length).padStart(2, '0')}</span></div><section class="roleplay-layout"><div class="conversation-stage"><div class="stage-header"><div><span class="eyebrow">Customer conversation</span><h2>${isFinished ? 'You made the hard part clearer.' : 'Listen for the real need.'}</h2></div><div class="stage-signal ${isFinished ? 'done' : ''}"><span></span><span></span><span></span></div></div><div class="progress-line"><span style="width:${progress}%"></span></div><div class="transcript">${session.transcript.length ? session.transcript.map(transcriptMessage).join('') : '<div class="empty-transcript"><div class="thinking-orb">✦</div><p>The customer is entering the room...</p></div>'}</div>${!isFinished ? `<div class="response-area"><div class="typing-line"><span class="typing-dots"><i></i><i></i><i></i></span> Customer is ready for your next move</div><div class="response-options">${turn.options.map((option, index) => `<button class="response-option" data-response="${index}"><span class="option-index">${String.fromCharCode(65 + index)}</span><span><strong>${esc(option.label)}</strong><small>${esc(option.tag)}</small></span><span class="option-arrow">${icons.arrow}</span></button>`).join('')}</div></div>` : `<div class="completion-panel"><div class="completion-check">${icons.check}</div><div><strong>Nice work. The conversation has a clear next step.</strong><span>Your transcript is ready for feedback.</span></div><button class="button button-dark" data-action="view-feedback">View my feedback ${icons.arrow}</button></div>`}</div><aside class="session-rail"><div class="rail-card session-card"><div class="rail-card-head"><span class="eyebrow">Session brief</span><span class="session-live">LIVE</span></div><h3>${esc(s.title)}</h3><p>${esc(s.goal)}</p><div class="rail-detail"><span>Language</span><strong>${esc(state.setupLanguage)}</strong></div><div class="rail-detail"><span>Difficulty</span><strong>${esc(state.setupDifficulty)}</strong></div><div class="rail-detail"><span>Timebox</span><strong>${s.duration}</strong></div></div><div class="rail-card coach-card"><div class="coach-card-top"><div class="coach-avatar large">✦</div><span class="eyebrow">Coach signal</span></div><h3>Keep the next step concrete.</h3><p>Warmth earns trust. Specificity makes it actionable.</p><div class="mini-coach-meter"><span style="width:74%"></span></div><small>Focus cue · 01</small></div><button class="session-exit" data-view="dashboard">Save & exit ${icons.arrow}</button></aside></section></div>`);
}

function feedbackView() {
  const s = state.selectedScenario;
  const session = state.session || { qualities: [] };
  const strong = session.qualities.filter((q) => q === 'strong').length;
  const risky = session.qualities.filter((q) => q === 'risky').length;
  const weak = session.qualities.filter((q) => q === 'weak').length;
  const base = Math.round(64 + strong * 9 - risky * 6 - weak * 3);
  const scores = {
    empathy: Math.min(98, base + 8),
    accuracy: Math.min(96, base + (risky ? -4 : 4)),
    policy: Math.min(95, base + (risky ? -9 : 1)),
    escalation: Math.min(94, base + (strong === 3 ? 8 : 1)),
  };
  const overall = Math.round((scores.empathy + scores.accuracy + scores.policy + scores.escalation) / 4);
  const note = risky ? 'You built warmth, but one or more promises went beyond what the agent could verify.' : weak ? 'You kept the interaction moving. Try adding more ownership and a precise next update.' : 'You balanced warmth, ownership, and a safe next step under pressure.';
  return shell(`${topbar('Session feedback', 'Practice · Debrief')}<div class="content-scroll"><div class="feedback-topline"><button class="back-link" data-view="scenarios">${icons.back} Back to library</button><span class="saved-label">${icons.check} Session saved to your practice log</span></div><section class="feedback-hero"><div><span class="eyebrow">${esc(s.category)} · ${esc(s.title)}</span><h2>Good practice.<br /><em>Clearer next move.</em></h2><p>${note}</p></div><div class="overall-score"><div class="score-ring"><div><strong>${overall}</strong><span>/100</span></div></div><span>overall readiness</span><b>↑ ${overall - 72} pts from baseline</b></div></section><section class="feedback-grid"><div class="panel score-panel"><div class="panel-heading"><div><span class="eyebrow">Competency readout</span><h3>What the conversation signals</h3></div><span class="panel-count">05</span></div><div class="score-list">${feedbackScore('Empathy', scores.empathy, 'You acknowledged the emotion before moving to resolution.', 'lime')}${feedbackScore('Accuracy', scores.accuracy, risky ? 'Avoid certainty when the system status is not verified.' : 'You stayed within the known facts and asked for the right detail.', 'lavender')}${feedbackScore('Policy compliance', scores.policy, risky ? 'Do not guarantee a refund, delivery, or discount without confirmation.' : 'Your next step respected the support boundary.', 'coral')}${feedbackScore('Escalation judgment', scores.escalation, strong === 3 ? 'You named a trigger and a concrete handoff path.' : 'Name the trigger that should move this case to the next team.', 'blue')}</div></div><div class="panel debrief-panel"><div class="panel-heading"><div><span class="eyebrow">Coach notes</span><h3>Keep / Try next</h3></div></div><div class="debrief-block keep"><span class="debrief-icon">${icons.check}</span><div><strong>Keep this</strong><p>${strong ? 'You used language that gave the customer ownership and emotional safety.' : 'You kept the conversation concise and moved toward a next step.'}</p></div></div><div class="debrief-block try"><span class="debrief-icon">${icons.sparkle}</span><div><strong>Try this next</strong><p>State an exact update time, then explain what will happen if the expected signal does not appear.</p></div></div><button class="button button-outline full" data-action="repeat-session">Practice again ${icons.arrow}</button></div></section><section class="transcript-review panel"><div class="panel-heading"><div><span class="eyebrow">Transcript review</span><h3>See the moments behind the score</h3></div><button class="text-button" data-action="toggle-transcript">${icons.arrow} Expand transcript</button></div><div class="review-transcript ${state.showTranscript ? 'expanded' : ''}">${session.transcript.map(transcriptMessage).join('')}</div></section><section class="roadmap-banner compact"><div class="roadmap-mark">${icons.sparkle}</div><div><span class="eyebrow">Claude roadmap</span><h3>Next: dynamic customer behavior and SOP-grounded coaching.</h3><p>This prototype keeps the workflow honest and deterministic. Claude integration will add adaptive scenarios and grounded evaluation after the pilot.</p></div><span class="roadmap-tag">Planned</span></section></div>`);
}

function feedbackScore(label, score, note, tone) {
  return `<div class="score-row"><div class="score-label"><span class="score-tone ${tone}"></span><strong>${label}</strong><span>${score}/100</span></div><div class="score-bar"><i class="${tone}" style="width:${score}%"></i></div><p>${note}</p></div>`;
}

function insightsView() {
  return shell(`${topbar('Team insights', 'Manager view · Insights')}<div class="content-scroll"><section class="page-intro-row insights-intro"><div><span class="eyebrow">A clearer view of readiness</span><h2>Coach the pattern,<br /><em>not just the call.</em></h2><p>Use practice signals to focus your next 1:1 and make coaching more specific.</p></div><div class="date-select">Last 30 days <span>⌄</span></div></section><section class="insights-grid"><div class="panel trend-panel"><div class="panel-heading"><div><span class="eyebrow">Readiness trend</span><h3>Team score is moving up</h3></div><span class="trend-up">↑ 12.8%</span></div><div class="chart-wrap"><div class="chart-y"><span>80</span><span>60</span><span>40</span><span>20</span><span>0</span></div><div class="chart"><div class="chart-grid-lines"><i></i><i></i><i></i><i></i><i></i></div><svg viewBox="0 0 500 180" preserveAspectRatio="none" aria-label="Readiness trend chart"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#c5f36a" stop-opacity=".35"/><stop offset="1" stop-color="#c5f36a" stop-opacity="0"/></linearGradient></defs><path d="M0 145 C48 140, 58 125, 94 132 S144 110, 174 118 S218 102, 252 108 S300 84, 329 90 S368 66, 399 74 S446 44, 500 48 L500 180 L0 180Z" fill="url(#fill)"/><path d="M0 145 C48 140, 58 125, 94 132 S144 110, 174 118 S218 102, 252 108 S300 84, 329 90 S368 66, 399 74 S446 44, 500 48" fill="none" stroke="#c5f36a" stroke-width="3" stroke-linecap="round"/></svg><div class="chart-x"><span>Sep 10</span><span>Sep 17</span><span>Sep 24</span><span>Oct 01</span><span>Oct 08</span></div></div></div></div><div class="panel team-score-panel"><div class="panel-heading"><div><span class="eyebrow">Current snapshot</span><h3>Readiness score</h3></div></div><div class="team-score-number">66<span>/100</span></div><div class="team-score-meta"><span class="trend-up">↑ 5.1%</span> vs previous period</div><div class="team-score-line"><span style="width:66%"></span></div><div class="target-row"><span>Target: 75</span><strong>9 pts to go</strong></div></div></section><section class="insights-bottom"><div class="panel competency-panel"><div class="panel-heading"><div><span class="eyebrow">Team competency</span><h3>Where to coach next</h3></div><span class="panel-count">04</span></div><div class="team-meters">${teamMeter('Empathy', 82, 'lime')}${teamMeter('Accuracy', 68, 'lavender')}${teamMeter('Escalation judgment', 61, 'coral')}${teamMeter('Policy compliance', 57, 'blue')}</div></div><div class="panel priority-panel"><div class="panel-heading"><div><span class="eyebrow">Priority queue</span><h3>Coaching opportunities</h3></div><span class="priority-count">3 open</span></div><div class="priority-list"><div class="priority-item"><span class="priority-number">01</span><div><strong>Specific next steps</strong><p>7 agents used vague update language.</p></div><span class="priority-arrow">${icons.arrow}</span></div><div class="priority-item"><span class="priority-number">02</span><div><strong>Policy boundaries</strong><p>4 agents overpromised resolution timing.</p></div><span class="priority-arrow">${icons.arrow}</span></div><div class="priority-item"><span class="priority-number">03</span><div><strong>Escalation triggers</strong><p>3 agents missed a billing handoff.</p></div><span class="priority-arrow">${icons.arrow}</span></div></div></div></section><section class="insights-footnote"><span class="note-icon">${icons.sparkle}</span><p><strong>Built for a better coaching loop.</strong> These insights are based on mock sessions for the demo. Claude-powered grounded evaluation is planned for the next pilot.</p></section></div>`);
}

function teamMeter(label, value, tone) {
  return `<div class="team-meter"><div><strong>${label}</strong><span>${value}/100</span></div><div class="meter-track"><i class="meter-fill ${tone}" style="width:${value}%"></i></div></div>`;
}

function showToast(message) {
  state.toast = message;
  render();
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => { state.toast = ''; render(); }, 2800);
}

function beginSession() {
  const s = state.selectedScenario;
  state.session = {
    turn: 0,
    done: false,
    qualities: [],
    transcript: [{ role: 'customer', text: state.setupLanguage === 'English' && s.turns[0].customerEn ? s.turns[0].customerEn : s.turns[0].customer, time: 'now' }],
    selected: null,
  };
  navigate('roleplay');
}

function chooseResponse(index) {
  const session = state.session;
  const s = state.selectedScenario;
  if (!session || session.done) return;
  const turn = s.turns[session.turn];
  const option = turn.options[index];
  const customerReply = turn.reply[option.quality];
  session.qualities.push(option.quality);
  session.transcript.push({ role: 'agent', text: option.label, time: 'now' });
  session.transcript.push({ role: 'customer', text: state.setupLanguage === 'English' && s.id === 'refund' ? translateRefundReply(customerReply, option.quality, session.turn) : customerReply, time: 'now' });
  session.turn += 1;
  if (session.turn >= s.turns.length) session.done = true;
  state.totalMinutes += 2;
  render();
}

function translateRefundReply(reply, quality, turn) {
  if (state.setupLanguage !== 'English') return reply;
  const english = [
    { strong: 'Thank you for checking. I have the order number and confirmation email here, so I hope I will not need to repeat the whole story.', weak: 'I have already waited through the estimate. That does not help me understand where my refund is now.', risky: 'If you can guarantee that, I will wait. But I have received the same promise several times.' },
    { strong: 'That helps. I will feel better having a reference I can use with my bank.', weak: 'So I have to start over with another team? I need someone to own this case.', risky: 'Was the first refund cancelled? I do not want two transactions or a new problem.' },
    { strong: 'That is clear. I will wait for the update tomorrow at 3 PM and will not need to repeat the case.', weak: 'I do not know when “if there is news” means. I need something more specific.', risky: 'I will hold you to that promise. If it is not in by tomorrow afternoon, I will file a formal complaint.' },
  ];
  return english[turn]?.[quality] || reply;
}

function viewFeedback() {
  state.view = 'feedback';
  history.pushState({}, '', '/feedback');
  render();
}

function render() {
  let view = state.view;
  if (view === 'dashboard') app.innerHTML = dashboardView();
  else if (view === 'scenarios') app.innerHTML = scenariosView();
  else if (view === 'setup') app.innerHTML = setupView();
  else if (view === 'roleplay') app.innerHTML = roleplayView();
  else if (view === 'feedback') app.innerHTML = feedbackView();
  else if (view === 'insights') app.innerHTML = insightsView();
  else app.innerHTML = dashboardView();
  if (state.toast) app.insertAdjacentHTML('beforeend', `<div class="toast">${icons.check}<span>${esc(state.toast)}</span></div>`);
  bindEvents();
}

function bindEvents() {
  document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => navigate(button.dataset.view)));
  document.querySelectorAll('[data-scenario]').forEach((card) => card.addEventListener('click', () => { state.selectedScenario = scenarios.find((s) => s.id === card.dataset.scenario) || scenarios[0]; state.view = 'setup'; history.pushState({}, '', '/setup'); render(); }));
  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => { state.filter = button.dataset.filter; render(); }));
  const search = document.querySelector('#scenario-search');
  if (search) search.addEventListener('input', (event) => { state.query = event.target.value; render(); const next = document.querySelector('#scenario-search'); next?.focus(); next?.setSelectionRange(state.query.length, state.query.length); });
  document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => { state.setupLanguage = button.dataset.language; render(); }));
  document.querySelectorAll('[data-difficulty]').forEach((button) => button.addEventListener('click', () => { state.setupDifficulty = button.dataset.difficulty; render(); }));
  document.querySelectorAll('[data-response]').forEach((button) => button.addEventListener('click', () => chooseResponse(Number(button.dataset.response))));
  document.querySelectorAll('[data-action="begin-session"]').forEach((button) => button.addEventListener('click', beginSession));
  document.querySelectorAll('[data-action="start-featured"]').forEach((button) => button.addEventListener('click', () => { state.selectedScenario = scenarios[0]; state.view = 'setup'; history.pushState({}, '', '/setup'); render(); }));
  document.querySelectorAll('[data-action="view-feedback"]').forEach((button) => button.addEventListener('click', viewFeedback));
  document.querySelectorAll('[data-action="repeat-session"]').forEach((button) => button.addEventListener('click', () => { state.view = 'setup'; history.pushState({}, '', '/setup'); render(); }));
  document.querySelectorAll('[data-action="toggle-transcript"]').forEach((button) => button.addEventListener('click', () => { state.showTranscript = !state.showTranscript; render(); }));
}

window.addEventListener('popstate', () => {
  state.view = getInitialView();
  render();
});

render();
