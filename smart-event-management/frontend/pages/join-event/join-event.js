/* =============================================
   JOIN EVENT — Planora
   join-event.js
   ============================================= */

'use strict';

/* ---- STATE ---- */
let selectedRole = 'participant';
let currentCode  = '';
let isVerifying  = false;
let verifyTimer  = null;

/* ---- MOCK EVENT DB ---- */
const MOCK_EVENTS = {
  'ABC123': {
    name: 'Tech Summit 2025',
    org: 'Organized by TechCorp India',
    date: 'Apr 20, 2025',
    location: 'Bangalore, India',
    spots: 42,
    totalCapacity: 130,
    desc: 'A premier gathering of tech leaders, developers, and innovators exploring the future of AI and software.',
    icon: '🚀',
  },
  'EVT001': {
    name: 'Design Unplugged',
    org: 'Organized by Creative Collective',
    date: 'May 5, 2025',
    location: 'Mumbai, India',
    spots: 18,
    totalCapacity: 60,
    desc: 'A hands-on design sprint for UI/UX professionals and product thinkers.',
    icon: '🎨',
  },
  'PLN404': {
    name: 'Planora Hackathon',
    org: 'Organized by Planora Team',
    date: 'Jun 1, 2025',
    location: 'Remote / Online',
    spots: 200,
    totalCapacity: 500,
    desc: 'Build the future of event management in 48 hours. Open to all developers worldwide.',
    icon: '💡',
  },
};

/* ============================================================
   STARFIELD
   ============================================================ */
(function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  const STAR_COUNT = 140;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStar() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.3 + 0.05,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    };
  }

  function init() {
    resize();
    stars = Array.from({ length: STAR_COUNT }, createStar);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      s.alpha += s.twinkleSpeed * s.twinkleDir;
      if (s.alpha >= 0.7 || s.alpha <= 0.05) s.twinkleDir *= -1;
      s.y -= s.speed;
      if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 190, 255, ${s.alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  init();
  draw();
  window.addEventListener('resize', resize);
})();

/* ============================================================
   ROLE SELECTION
   ============================================================ */
function selectRole(role, btn) {
  selectedRole = role;
  document.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  // Update confirm badge text
  const text = document.getElementById('roleConfirmText');
  if (text) text.textContent = capitalize(role);

  showToast(`Role set to ${capitalize(role)}`, 'info');
}

function scrollToRole() {
  document.getElementById('roleSelector')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ============================================================
   CODE BOXES — SPLIT INPUT
   ============================================================ */
function initCodeBoxes() {
  const boxes = document.querySelectorAll('.code-box');

  boxes.forEach((box, i) => {
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace') {
        if (!box.value && i > 0) {
          boxes[i - 1].focus();
          boxes[i - 1].value = '';
          boxes[i - 1].classList.remove('filled');
        }
        box.classList.remove('filled');
        onCodeChange();
        return;
      }
      if (e.key === 'ArrowLeft'  && i > 0)              { boxes[i - 1].focus(); return; }
      if (e.key === 'ArrowRight' && i < boxes.length-1) { boxes[i + 1].focus(); return; }
    });

    box.addEventListener('input', (e) => {
      const val = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      box.value = val.slice(-1);
      box.classList.toggle('filled', !!box.value);
      if (box.value && i < boxes.length - 1) boxes[i + 1].focus();
      onCodeChange();
    });

    box.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData)
        .getData('text')
        .replace(/[^a-zA-Z0-9]/g, '')
        .toUpperCase();
      boxes.forEach((b, idx) => {
        b.value = pasted[idx] || '';
        b.classList.toggle('filled', !!b.value);
      });
      boxes[Math.min(5, pasted.length - 1)].focus();
      onCodeChange();
    });

    box.addEventListener('focus', () => box.select());
  });
}

/* ============================================================
   PASTE INPUT (full code field)
   ============================================================ */
function initPasteInput() {
  const input = document.getElementById('pasteInput');
  if (!input) return;

  input.addEventListener('input', () => {
    const raw = input.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6);
    const boxes = document.querySelectorAll('.code-box');
    boxes.forEach((b, i) => {
      b.value = raw[i] || '';
      b.classList.toggle('filled', !!b.value);
    });
    onCodeChange();
  });
}

async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    const raw  = text.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6);
    const boxes = document.querySelectorAll('.code-box');
    boxes.forEach((b, i) => {
      b.value = raw[i] || '';
      b.classList.toggle('filled', !!b.value);
    });
    const pasteInput = document.getElementById('pasteInput');
    if (pasteInput) pasteInput.value = raw.slice(0,3) + (raw.length > 3 ? '-' + raw.slice(3) : '');
    onCodeChange();
    showToast('Code pasted from clipboard!', 'success');
  } catch {
    showToast('Could not read clipboard. Paste manually.', 'error');
  }
}

/* ============================================================
   CODE CHANGE HANDLER
   ============================================================ */
function onCodeChange() {
  const boxes = document.querySelectorAll('.code-box');
  const code  = Array.from(boxes).map(b => b.value).join('');
  currentCode = code;

  // Sync paste input display
  const pasteInput = document.getElementById('pasteInput');
  if (pasteInput) {
    pasteInput.value = code.length > 3
      ? code.slice(0,3) + '-' + code.slice(3)
      : code;
  }

  clearTimeout(verifyTimer);
  hideEventPreview();
  disableJoinBtn();

  if (code.length < 6) {
    setStatus('idle');
    return;
  }

  setStatus('checking');
  verifyTimer = setTimeout(() => verifyCode(code), 650);
}

/* ============================================================
   VERIFY CODE (simulated API)
   ============================================================ */
async function verifyCode(code) {
  isVerifying = true;
  setStatus('checking');

  await delay(700 + Math.random() * 400);

  const event = MOCK_EVENTS[code.toUpperCase()];

  if (event) {
    setStatus('valid');
    showEventPreview(event);
    enableJoinBtn();
    setBoxesState('success');
  } else {
    setStatus('error', 'Invalid or expired event code.');
    hideEventPreview();
    disableJoinBtn();
    setBoxesState('error');
    setTimeout(() => setBoxesState(''), 1200);
  }

  isVerifying = false;
}

/* ============================================================
   STATUS DISPLAY
   ============================================================ */
function setStatus(type, msg = '') {
  const container = document.getElementById('validationStatus');
  if (!container) return;
  container.querySelectorAll('div').forEach(d => d.classList.add('hidden'));
  const el = container.querySelector(`.status-${type}`);
  if (el) {
    el.classList.remove('hidden');
    if (type === 'error' && msg) {
      const errMsg = document.getElementById('errorMsg');
      if (errMsg) errMsg.textContent = msg;
    }
  }
}

function setBoxesState(state) {
  document.querySelectorAll('.code-box').forEach(b => {
    b.classList.remove('error', 'success');
    if (state) b.classList.add(state);
  });
}

/* ============================================================
   EVENT PREVIEW CARD
   ============================================================ */
function showEventPreview(event) {
  const preview = document.getElementById('eventPreview');
  if (!preview) return;

  document.getElementById('previewIcon').textContent     = event.icon;
  document.getElementById('previewName').textContent     = event.name;
  document.getElementById('previewOrg').textContent      = event.org;
  document.getElementById('previewDate').textContent     = event.date;
  document.getElementById('previewLocation').textContent = event.location;
  document.getElementById('previewSpots').textContent    = `${event.spots} spots left`;
  document.getElementById('previewDesc').textContent     = event.desc;

  // Capacity bar
  const pct  = Math.round(((event.totalCapacity - event.spots) / event.totalCapacity) * 100);
  const fill = document.getElementById('capacityFill');
  if (fill) setTimeout(() => { fill.style.width = pct + '%'; }, 100);

  // Role confirm text
  const roleText = document.getElementById('roleConfirmText');
  if (roleText) roleText.textContent = capitalize(selectedRole);

  preview.classList.remove('hidden');
}

function hideEventPreview() {
  document.getElementById('eventPreview')?.classList.add('hidden');
}

/* ============================================================
   JOIN BUTTON
   ============================================================ */
function enableJoinBtn()  {
  const btn = document.getElementById('joinBtn');
  if (btn) btn.disabled = false;
}

function disableJoinBtn() {
  const btn = document.getElementById('joinBtn');
  if (btn) btn.disabled = true;
}

async function handleJoin() {
  if (isVerifying || !currentCode) return;

  const btn      = document.getElementById('joinBtn');
  const spinner  = document.getElementById('btnSpinner');
  const btnText  = btn.querySelector('.btn-text');
  const btnArrow = btn.querySelector('.btn-arrow');

  btn.disabled = true;
  spinner.classList.remove('hidden');
  btnText.textContent = 'Joining...';
  btnArrow.classList.add('hidden');

  await delay(1200 + Math.random() * 500);

  // Save to history
  saveToHistory(currentCode, selectedRole);

  // Show success modal
  const event     = MOCK_EVENTS[currentCode.toUpperCase()];
  const eventName = event ? event.name : 'the event';
  document.getElementById('successMsg').innerHTML =
    `Successfully joined <strong>${eventName}</strong> as a ${capitalize(selectedRole)}.`;
  document.getElementById('successOverlay').classList.remove('hidden');

  // Reset button state
  btn.disabled = false;
  spinner.classList.add('hidden');
  btnText.textContent = 'Join Event';
  btnArrow.classList.remove('hidden');
}

function goToDashboard() {
  const route = selectedRole === 'volunteer'
    ? '../volunteer-dashboard/volunteer-dashboard.html'
    : '../participant-dashboard/participant-dashboard.html';
  window.location.href = route;
}

/* ============================================================
   CLEAR CODE
   ============================================================ */
function clearCode() {
  document.querySelectorAll('.code-box').forEach(b => {
    b.value = '';
    b.classList.remove('filled', 'error', 'success');
  });
  const pasteInput = document.getElementById('pasteInput');
  if (pasteInput) pasteInput.value = '';
  currentCode = '';
  setStatus('idle');
  hideEventPreview();
  disableJoinBtn();
  // Focus first box
  document.querySelector('.code-box')?.focus();
}

/* ============================================================
   RECENT CODES — localStorage
   ============================================================ */
const HISTORY_KEY = 'planora_join_history';
const MAX_HISTORY = 5;

function saveToHistory(code, role) {
  let history = getHistory();
  // Remove duplicate
  history = history.filter(h => h.code !== code.toUpperCase());
  // Prepend
  history.unshift({
    code: code.toUpperCase(),
    role,
    time: Date.now(),
  });
  // Trim
  if (history.length > MAX_HISTORY) history = history.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderHistory();
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
  showToast('History cleared', 'info');
}

function renderHistory() {
  const list    = document.getElementById('recentList');
  const section = document.getElementById('recentSection');
  if (!list || !section) return;

  const history = getHistory();
  if (!history.length) {
    section.style.display = 'none';
    return;
  }
  section.style.display = 'block';
  list.innerHTML = history.map(item => `
    <div class="recent-item" onclick="fillFromHistory('${item.code}', '${item.role}')">
      <span class="recent-code">${item.code.slice(0,3)}-${item.code.slice(3)}</span>
      <div class="recent-meta">
        <span class="recent-role">${capitalize(item.role)}</span>
        <span class="recent-time">${timeAgo(item.time)}</span>
      </div>
    </div>
  `).join('');
}

function fillFromHistory(code, role) {
  const boxes = document.querySelectorAll('.code-box');
  boxes.forEach((b, i) => {
    b.value = code[i] || '';
    b.classList.toggle('filled', !!b.value);
  });
  const pasteInput = document.getElementById('pasteInput');
  if (pasteInput) pasteInput.value = code.slice(0,3) + '-' + code.slice(3);

  // Set role
  const roleBtn = document.querySelector(`.role-tab[data-role="${role}"]`);
  if (roleBtn) selectRole(role, roleBtn);

  onCodeChange();
  showToast(`Code ${code.slice(0,3)}-${code.slice(3)} loaded`, 'info');
}

/* ============================================================
   TOAST NOTIFICATIONS
   ============================================================ */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<div class="toast-dot"></div><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, 3000);
}

/* ============================================================
   KEYBOARD SHORTCUTS
   ============================================================ */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Escape: clear code or close overlay
    if (e.key === 'Escape') {
      const overlay = document.getElementById('successOverlay');
      if (overlay && !overlay.classList.contains('hidden')) {
        overlay.classList.add('hidden');
        return;
      }
      if (currentCode) clearCode();
    }
    // Enter: trigger join if enabled
    if (e.key === 'Enter') {
      const btn = document.getElementById('joinBtn');
      if (btn && !btn.disabled) handleJoin();
    }
  });
}

/* ============================================================
   NAVBAR SCROLL EFFECT
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.style.background = window.scrollY > 20
      ? 'rgba(5,5,7,0.95)'
      : 'rgba(5,5,7,0.7)';
  });
}

/* ============================================================
   UTILS
   ============================================================ */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function timeAgo(timestamp) {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  const hrs  = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1)  return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24)  return `${hrs}h ago`;
  return `${days}d ago`;
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initCodeBoxes();
  initPasteInput();
  initKeyboardShortcuts();
  initNavbar();
  renderHistory();

  // Auto-focus first box
  setTimeout(() => {
    document.querySelector('.code-box')?.focus();
  }, 300);

  // Hide recent section if empty
  const section = document.getElementById('recentSection');
  if (section && !getHistory().length) section.style.display = 'none';
});