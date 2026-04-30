/* ============================================================
   PLANORA PROFILE — COMPLETE WORKING JS
   Features: Live date/time, Particle canvas, Counter animations,
   Smooth tab indicator, Full theme/accent system, All modals,
   Add payment, Remove photo, Event delegation, localStorage
   ============================================================ */

// ==================== LIVE DATE & TIME ====================
function updateDateTime() {
  const now = new Date();

  // Date: "Mon, 09 Apr 2026"
  const dateEl = document.getElementById('liveDate');
  if (dateEl) {
    dateEl.textContent = now.toLocaleDateString('en-IN', {
      weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
    });
  }
//made by ayush kushwaha
  // Time: "10:32:47 AM"
  const timeEl = document.getElementById('liveTime');
  if (timeEl) {
    timeEl.textContent = now.toLocaleTimeString('en-IN', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });
  }
}
updateDateTime();
setInterval(updateDateTime, 1000); // Updates every second

// ==================== PARTICLE CANVAS ====================
(function() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '124,58,237' : '6,182,212'
    };
  }

  for (let i = 0; i < 80; i++) particles.push(createParticle());

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });
    // Draw lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124,58,237,${0.05 * (1 - dist/100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    animId = requestAnimationFrame(drawParticles);
  }
  drawParticles();
})();

// ==================== COUNTER ANIMATION ====================
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  if (!target || isNaN(target)) return;
  let current = 0;
  const duration = 1200;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    current = Math.round(eased * target);
    el.textContent = current.toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
// Observe stat numbers with data-target
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

// ==================== THEME SYSTEM ====================
const THEMES = {
  dark: {
    '--bg':'#080810','--bg2':'#0f0f1a','--bg3':'#161625','--bg4':'#1e1e30','--bg5':'#252538',
    '--border':'rgba(255,255,255,0.06)','--text':'#f0eeff','--text-muted':'#5a5a7a','--text-sub':'#8888aa'
  },
  light: {
    '--bg':'#f0f0f6','--bg2':'#ffffff','--bg3':'#f4f4f8','--bg4':'#eaeaf0','--bg5':'#e0e0ea',
    '--border':'rgba(0,0,0,0.08)','--text':'#0f0f1a','--text-muted':'#888899','--text-sub':'#444458'
  }
};

let currentTheme = localStorage.getItem('planora-theme') || 'dark';
let currentAccent = localStorage.getItem('planora-accent') || '#7c3aed';
let currentAccentName = localStorage.getItem('planora-accent-name') || 'Purple';

function hexToRgba(hex, a) {
  hex = hex.replace('#','');
  if (hex.length === 3) hex = hex.split('').map(c=>c+c).join('');
  const r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16);
  return `rgba(${r},${g},${b},${a})`;
}

function applyTheme(mode) {
  currentTheme = mode;
  localStorage.setItem('planora-theme', mode);
  const root = document.documentElement;
  const vars = THEMES[mode] || THEMES.dark;
  Object.entries(vars).forEach(([k,v]) => root.style.setProperty(k,v));
  // Toggle body class for comprehensive light mode overrides
  document.body.classList.toggle('light-mode', mode === 'light');
  // Update UI
  document.querySelectorAll('.theme-option').forEach(o => {
    const isActive = o.dataset.mode === mode || (o.dataset.mode === 'system' && mode !== 'dark' && mode !== 'light');
    o.classList.toggle('active', isActive);
    const chk = o.querySelector('.theme-check'); if(chk) chk.remove();
    if (isActive) { const ic = document.createElement('i'); ic.className='fa-solid fa-check theme-check'; o.appendChild(ic); }
  });
}

function applyAccent(color, name) {
  currentAccent = color;
  currentAccentName = name || color;
  localStorage.setItem('planora-accent', color);
  localStorage.setItem('planora-accent-name', currentAccentName);
  const root = document.documentElement;
  root.style.setProperty('--purple', color);
  root.style.setProperty('--purple-mid', color);
  // Generate lighter variant
  const lighter = color + 'cc';
  root.style.setProperty('--purple-light', color);
  root.style.setProperty('--purple-glow', hexToRgba(color, 0.18));
  root.style.setProperty('--purple-glow2', hexToRgba(color, 0.08));
  root.style.setProperty('--border-hover', hexToRgba(color, 0.5));
  root.style.setProperty('--shadow-purple', `0 0 40px ${hexToRgba(color, 0.2)}`);
  // Update badge
  const badge = document.getElementById('colorPreviewBadge');
  if (badge) { badge.textContent = currentAccentName; badge.style.background = hexToRgba(color, 0.15); badge.style.color = color; badge.style.borderColor = hexToRgba(color, 0.3); }
  // Update swatches
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.toggle('active', s.dataset.color === color));
}

// Apply saved settings on load
applyTheme(currentTheme);
applyAccent(currentAccent, currentAccentName);

// ==================== UTILITY ====================
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  const iconEl = toast.querySelector('.toast-icon');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.className = `toast show ${type}`;
  if (iconEl) iconEl.className = `toast-icon fa-solid ${type === 'error' ? 'fa-circle-xmark' : 'fa-circle-check'}`;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.className = 'toast'; }, 3200);
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
}
window.closeAllModals = closeAllModals;

function openModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
window.openModal = openModal;

// ==================== TAB SYSTEM WITH INDICATOR ====================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const tabIndicator = document.getElementById('tabIndicator');

function moveIndicator(btn) {
  if (!tabIndicator || !btn) return;
  const bar = btn.closest('.profile-tabs-bar');
  if (!bar) return;
  const barRect = bar.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();
  tabIndicator.style.left = (btnRect.left - barRect.left + bar.scrollLeft) + 'px';
  tabIndicator.style.width = btnRect.width + 'px';
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById('tab-' + btn.dataset.tab);
    if (panel) panel.classList.add('active');
    moveIndicator(btn);
  });
});
// Init indicator position
requestAnimationFrame(() => { moveIndicator(document.querySelector('.tab-btn.active')); });
window.addEventListener('resize', () => moveIndicator(document.querySelector('.tab-btn.active')));

// ==================== MODALS ====================
document.getElementById('editProfileBtn')?.addEventListener('click', () => openModal('editModal'));
document.getElementById('logoutBtn')?.addEventListener('click', () => openModal('logoutModal'));
document.getElementById('deleteAccountBtn')?.addEventListener('click', () => openModal('deleteModal'));
document.getElementById('sidebarLogout')?.addEventListener('click', () => openModal('logoutModal'));
document.querySelectorAll('.modal-overlay').forEach(m => m.addEventListener('click', e => { if (e.target === m) closeAllModals(); }));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAllModals();
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); document.querySelector('.search-bar input')?.focus(); }
});
// Close buttons with onclick="closeAllModals()" already wired in HTML

// Delete confirm
const deleteInput = document.getElementById('deleteConfirmInput');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
deleteInput?.addEventListener('input', () => {
  const valid = deleteInput.value.trim() === 'DELETE';
  confirmDeleteBtn.disabled = !valid;
  deleteInput.style.borderColor = deleteInput.value ? (valid ? 'var(--green)' : 'var(--red)') : '';
});
confirmDeleteBtn?.addEventListener('click', () => { showToast('Account deletion initiated. Check your email.', 'error'); closeAllModals(); });

// ==================== MOBILE SIDEBAR ====================
document.getElementById('menuToggle')?.addEventListener('click', () => {
  document.getElementById('sidebar')?.classList.toggle('open');
});

// ==================== COVER PHOTO ====================
document.getElementById('changeCoverBtn')?.addEventListener('click', () => document.getElementById('coverInput').click());
document.getElementById('removeCoverBtn')?.addEventListener('click', () => {
  const ca = document.getElementById('coverArt');
  ca.style.backgroundImage = '';
  ca.style.backgroundSize = '';
  document.querySelector('.cover-mesh').style.opacity = '1';
  document.getElementById('removeCoverBtn').style.display = 'none';
  showToast('Cover photo removed.');
});
document.getElementById('coverInput')?.addEventListener('change', function() {
  const file = this.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const ca = document.getElementById('coverArt');
    ca.style.backgroundImage = `url(${ev.target.result})`;
    ca.style.backgroundSize = 'cover';
    ca.style.backgroundPosition = 'center';
    document.querySelector('.cover-mesh').style.opacity = '0.4';
    document.getElementById('removeCoverBtn').style.display = 'flex';
    showToast('Cover photo updated! 🎨');
  };
  reader.readAsDataURL(file);
  this.value = '';
});

// ==================== AVATAR ====================
document.getElementById('avatarEditBtn')?.addEventListener('click', (e) => {
  e.stopPropagation();
  const menu = document.getElementById('avatarMenu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
document.getElementById('avatarChangeOpt')?.addEventListener('click', () => {
  document.getElementById('avatarInput').click();
  document.getElementById('avatarMenu').style.display = 'none';
});
document.getElementById('avatarRemoveOpt')?.addEventListener('click', () => {
  const av = document.getElementById('bigAvatar');
  av.style.backgroundImage = ''; av.style.backgroundSize = ''; av.textContent = 'RK';
  document.getElementById('avatarMenu').style.display = 'none';
  showToast('Profile photo removed.');
});
document.getElementById('avatarInput')?.addEventListener('change', function() {
  const file = this.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const av = document.getElementById('bigAvatar');
    av.style.backgroundImage = `url(${ev.target.result})`;
    av.style.backgroundSize = 'cover'; av.style.backgroundPosition = 'center';
    av.textContent = '';
    showToast('Profile photo updated! 📸');
  };
  reader.readAsDataURL(file);
  this.value = '';
});
document.addEventListener('click', e => {
  const menu = document.getElementById('avatarMenu');
  const btn = document.getElementById('avatarEditBtn');
  if (menu && !menu.contains(e.target) && e.target !== btn) menu.style.display = 'none';
});

// ==================== SHARE ====================
document.getElementById('shareBtn')?.addEventListener('click', () => {
  const url = window.location.href;
  if (navigator.share) { navigator.share({ title: 'Rishabh Kumar – Planora', url }); }
  else { navigator.clipboard?.writeText(url); showToast('Profile link copied to clipboard! 🔗'); }
});

// ==================== EVENTS FILTER ====================
(function() {
  const filterBtns = document.querySelectorAll('.events-filter-bar .filter-btn');
  const eventCards = document.querySelectorAll('#eventsGrid .event-card-full');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active')); btn.classList.add('active');
      const filter = btn.dataset.filter || 'all';
      eventCards.forEach(card => {
        const types = (card.dataset.type || '').split(' ');
        card.style.display = (filter === 'all' || types.includes(filter)) ? '' : 'none';
      });
    });
  });
})();

// ==================== SAVE BUTTONS ====================
document.querySelectorAll('.save-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Saved!';
    btn.style.background = 'var(--green)'; btn.style.boxShadow = '0 0 20px rgba(16,185,129,0.3)';
    showToast('Settings saved successfully! ✅');
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.style.boxShadow = ''; }, 2200);
  });
});

// ==================== PASSWORD ====================
document.querySelectorAll('.pw-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target); if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
    btn.innerHTML = input.type === 'password' ? '<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-eye-slash"></i>';
  });
});
document.getElementById('newPw')?.addEventListener('input', function() {
  const pw = this.value;
  const fill = document.getElementById('pwStrengthFill');
  const label = document.getElementById('pwStrengthLabel');
  if (!pw) { fill.style.width='0%'; fill.style.background=''; label.textContent='Enter a password'; label.style.color=''; return; }
  let s = 0;
  if (pw.length >= 8) s++; if (/[A-Z]/.test(pw)) s++; if (/[0-9]/.test(pw)) s++; if (/[^A-Za-z0-9]/.test(pw)) s++;
  const lvl = [{w:'20%',c:'#ef4444',t:'Weak'},{w:'45%',c:'#f59e0b',t:'Fair'},{w:'72%',c:'#06b6d4',t:'Good'},{w:'100%',c:'#10b981',t:'Strong'}][Math.max(0,s-1)];
  fill.style.width=lvl.w; fill.style.background=lvl.c; label.textContent=lvl.t; label.style.color=lvl.c;
});

// ==================== THEME OPTIONS ====================
document.querySelectorAll('.theme-option').forEach(opt => {
  opt.addEventListener('click', () => {
    const mode = opt.dataset.mode;
    if (mode === 'system') {
      applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    } else { applyTheme(mode); }
    showToast(`${mode.charAt(0).toUpperCase()+mode.slice(1)} theme applied! ${mode === 'dark' ? '🌙' : mode === 'light' ? '☀️' : '🖥️'}`);
  });
});

// ==================== ACCENT COLOR ====================
document.querySelectorAll('.color-swatch:not(.custom-swatch)').forEach(sw => {
  sw.addEventListener('click', () => {
    applyAccent(sw.dataset.color, sw.dataset.name || sw.title || sw.dataset.color);
    showToast(`Accent color changed to ${sw.title || sw.dataset.color}! 🎨`);
  });
});
const customColorInput = document.getElementById('customColor');
customColorInput?.addEventListener('input', function() {
  document.documentElement.style.setProperty('--purple', this.value);
  document.documentElement.style.setProperty('--purple-glow', hexToRgba(this.value, 0.18));
});
customColorInput?.addEventListener('change', function() {
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  this.closest('.color-swatch')?.classList.add('active');
  applyAccent(this.value, 'Custom');
  showToast('Custom accent applied! 🎨');
});

// ==================== FONT SIZE ====================
const fontSlider = document.getElementById('fontSizeSlider');
const fontValue = document.getElementById('fontSizeValue');
const previewText = document.getElementById('previewText');
fontSlider?.addEventListener('input', function() {
  const sz = this.value + 'px';
  if (fontValue) fontValue.textContent = sz;
  if (previewText) previewText.style.fontSize = sz;
});

// ==================== LAYOUT OPTIONS ====================
document.querySelectorAll('.layout-opt').forEach(opt => {
  opt.addEventListener('click', () => { document.querySelectorAll('.layout-opt').forEach(o => o.classList.remove('active')); opt.classList.add('active'); });
});

// ==================== VISIBILITY OPTIONS ====================
document.querySelectorAll('.vis-opt').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.vis-opt').forEach(o => { o.classList.remove('active'); o.querySelector('.vis-radio')?.classList.remove('active-radio'); });
    opt.classList.add('active'); opt.querySelector('.vis-radio')?.classList.add('active-radio');
  });
});

// ==================== DEFAULT PAGE ====================
document.querySelectorAll('.dp-opt').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.dp-opt').forEach(o => { o.classList.remove('active'); o.querySelector('.dp-radio')?.classList.remove('active-radio'); });
    opt.classList.add('active'); opt.querySelector('.dp-radio')?.classList.add('active-radio');
    showToast(`Default page: ${opt.querySelector('span').textContent} ✅`);
  });
});

// ==================== LOGIN REVOKE ====================
document.querySelectorAll('.login-revoke:not(.disabled)').forEach(btn => {
  btn.addEventListener('click', function() {
    this.textContent='Revoked'; this.style.opacity='.4'; this.style.cursor='not-allowed'; this.disabled=true;
    this.closest('.login-item').style.opacity='.5';
    showToast('Session revoked successfully.');
  });
});
document.getElementById('logoutAllBtn')?.addEventListener('click', () => {
  if (!confirm('Logout from all other devices?')) return;
  document.querySelectorAll('.login-revoke:not(.disabled)').forEach(b => b.click());
  showToast('All other sessions revoked. 🔒');
});

// ==================== CLEAR CACHE ====================
document.getElementById('clearCacheBtn')?.addEventListener('click', function() {
  this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Clearing...';
  setTimeout(() => {
    this.innerHTML = '<i class="fa-solid fa-check"></i> Cleared!'; this.style.color = 'var(--green)';
    const cs = document.querySelector('.cache-size'); if(cs) cs.textContent='0 MB';
    showToast('Cache cleared! 🧹');
    setTimeout(() => { this.innerHTML='<i class="fa-solid fa-trash-can"></i> Clear Cache'; this.style.color=''; }, 2000);
  }, 1200);
});

// ==================== CONNECTED ACCOUNTS (delegation) ====================
document.getElementById('tab-connected')?.addEventListener('click', e => {
  const con = e.target.closest('.connect-btn');
  const dis = e.target.closest('.disconnect-btn');
  if (con) {
    const item = con.closest('.connected-item');
    const name = item.querySelector('.conn-brand-name').textContent;
    con.textContent = 'Connecting...'; con.disabled = true;
    setTimeout(() => {
      item.classList.add('connected'); item.style.borderColor='rgba(16,185,129,0.2)';
      item.querySelector('.conn-brand-email').textContent = `connected@${name.toLowerCase().replace(/\s/g,'')}.com`;
      con.className = 'disconnect-btn'; con.textContent = 'Disconnect'; con.disabled = false;
      showToast(`${name} connected! 🔗`);
    }, 900);
  }
  if (dis) {
    const item = dis.closest('.connected-item');
    const name = item.querySelector('.conn-brand-name').textContent;
    if (!confirm(`Disconnect ${name}?`)) return;
    item.classList.remove('connected'); item.style.borderColor='';
    item.querySelector('.conn-brand-email').textContent = 'Not connected';
    dis.className = 'connect-btn'; dis.textContent = 'Connect';
    showToast(`${name} disconnected.`, 'error');
  }
});

// ==================== ADD PAYMENT MODAL ====================
document.getElementById('addPaymentBtn')?.addEventListener('click', () => openModal('addPaymentModal'));
document.getElementById('closeAddPayment')?.addEventListener('click', closeAllModals);
document.getElementById('cancelAddPayment')?.addEventListener('click', closeAllModals);
document.getElementById('addPaymentModal')?.addEventListener('click', e => { if(e.target.id==='addPaymentModal') closeAllModals(); });

document.querySelectorAll('.pay-type-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pay-type-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active');
    document.querySelectorAll('.pay-form-section').forEach(s => s.style.display='none');
    const t = document.getElementById('payForm-' + btn.dataset.type); if(t) t.style.display='flex';
  });
});

document.getElementById('confirmAddPayment')?.addEventListener('click', () => {
  const type = document.querySelector('.pay-type-btn.active')?.dataset.type || 'card';
  const list = document.querySelector('.payment-methods');
  if (!list) { closeAllModals(); return; }
  let newCard;
  if (type === 'card') {
    const num = document.getElementById('cardNumber')?.value.trim();
    const name = document.getElementById('cardName')?.value.trim();
    const exp = document.getElementById('cardExpiry')?.value.trim();
    if (!num || !name || !exp) { showToast('Please fill all card fields.', 'error'); return; }
    const last4 = num.replace(/\s/g,'').slice(-4);
    newCard = document.createElement('div'); newCard.className='payment-card';
    newCard.innerHTML=`<div class="card-brand"><i class="fa-regular fa-credit-card" style="font-size:1.7rem;color:var(--purple-light)"></i></div><div class="card-details"><div class="card-number">•••• •••• •••• ${last4}</div><div class="card-expiry">Expires ${exp} · ${name}</div></div><button class="set-default-btn">Set Default</button><button class="card-remove"><i class="fa-solid fa-trash"></i></button>`;
  } else if (type === 'upi') {
    const uid = document.getElementById('upiId')?.value.trim();
    if (!uid) { showToast('Please enter UPI ID.', 'error'); return; }
    newCard = document.createElement('div'); newCard.className='payment-card upi-card';
    newCard.innerHTML=`<div class="card-brand"><span class="upi-logo">UPI</span></div><div class="card-details"><div class="card-number">${uid}</div><div class="card-expiry">UPI linked</div></div><button class="card-remove"><i class="fa-solid fa-trash"></i></button>`;
  } else {
    const bank = document.getElementById('nbBank')?.value || 'Bank';
    newCard = document.createElement('div'); newCard.className='payment-card';
    newCard.innerHTML=`<div class="card-brand"><i class="fa-solid fa-building-columns" style="font-size:1.4rem;color:var(--cyan)"></i></div><div class="card-details"><div class="card-number">${bank}</div><div class="card-expiry">Net Banking linked</div></div><button class="set-default-btn">Set Default</button><button class="card-remove"><i class="fa-solid fa-trash"></i></button>`;
  }
  list.appendChild(newCard);
  closeAllModals();
  showToast('Payment method added! 💳');
  document.querySelectorAll('.pay-form-section input, .pay-form-section select').forEach(el => { if(el.tagName==='INPUT') el.value=''; });
});

// ==================== PAYMENT CARD DELEGATION ====================
document.querySelector('.payment-methods')?.addEventListener('click', e => {
  const rem = e.target.closest('.card-remove');
  const def = e.target.closest('.set-default-btn');
  if (rem) {
    if (!confirm('Remove this payment method?')) return;
    const card = rem.closest('.payment-card');
    card.style.transition='opacity .3s'; card.style.opacity='0';
    setTimeout(() => card.remove(), 300);
    showToast('Payment method removed.', 'error');
  }
  if (def) {
    document.querySelectorAll('.payment-card').forEach(c => {
      c.classList.remove('default-card'); c.style.borderColor=''; c.style.background='';
      const db=c.querySelector('.default-badge'); if(db) db.remove();
      const sb=c.querySelector('.set-default-btn'); if(sb) sb.style.display='';
    });
    const card = def.closest('.payment-card');
    card.classList.add('default-card');
    const badge=document.createElement('span'); badge.className='default-badge'; badge.textContent='Default';
    card.insertBefore(badge, def); def.style.display='none';
    showToast('Default payment updated! ✅');
  }
});

// ==================== FILES ====================
document.getElementById('fileUploadSlot')?.addEventListener('click', () => {
  const inp = document.createElement('input'); inp.type='file'; inp.multiple=true;
  inp.onchange = e => Array.from(e.target.files).forEach(f => showToast(`Uploaded: ${f.name} 📁`));
  inp.click();
});
document.querySelectorAll('.file-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    if (this.classList.contains('danger')) {
      if (!confirm('Delete this file?')) return;
      const card = this.closest('.file-card');
      card.style.opacity='0'; card.style.transition='opacity .3s';
      setTimeout(() => card.remove(), 300);
      showToast('File deleted.', 'error');
    } else if (this.querySelector('.fa-download')) { showToast('Download started... ⬇️'); }
    else if (this.querySelector('.fa-eye')) { showToast('Opening file preview...'); }
  });
});

// ==================== TOGGLE FEEDBACK ====================
document.querySelectorAll('.toggle input').forEach(chk => {
  chk.addEventListener('change', function() {
    const label = this.closest('.toggle-row')?.querySelector('b')?.textContent || 'Setting';
    showToast(`${label}: ${this.checked ? 'Enabled ✅' : 'Disabled'}`);
  });
});

// ==================== TFA ====================
document.querySelectorAll('.tfa-enable-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const name = this.closest('.tfa-option').querySelector('.tfa-name').textContent;
    this.textContent='Enabled ✓'; this.style.background='var(--green)'; this.disabled=true;
    const st=document.querySelector('.disabled-tag'); if(st){st.textContent='Enabled';st.className='status-tag enabled-tag';}
    showToast(`${name} enabled! 🔐`);
  });
});

// ==================== SIDEBAR NAV ====================
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    // Close sidebar on mobile
    if (window.innerWidth < 900) document.getElementById('sidebar')?.classList.remove('open');
  });
});

// ==================== CARD EDIT BUTTONS ====================
document.querySelectorAll('.card-edit-btn').forEach(btn => {
  if (!btn.getAttribute('onclick')) btn.addEventListener('click', () => openModal('editModal'));
});

// ==================== HELP SEARCH ====================
document.querySelector('.help-search input')?.addEventListener('keydown', e => { if(e.key==='Enter') showToast('Searching help articles... 🔍'); });

// ==================== STAGGERED CARD ENTRANCE ====================
const cards = document.querySelectorAll('.card, .stat-big-card, .event-card-full');
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = (i * 0.05) + 's';
      entry.target.classList.add('card-visible');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Add CSS for card entrance
const style = document.createElement('style');
style.textContent = `
  .card, .stat-big-card, .event-card-full { opacity: 0; transform: translateY(16px); }
  .card-visible { animation: cardEnter 0.5s cubic-bezier(0.4,0,0.2,1) forwards; }
  @keyframes cardEnter { to { opacity:1; transform:translateY(0); } }
`;
document.head.appendChild(style);
cards.forEach(card => cardObserver.observe(card));

console.log('✅ Planora Profile — Gorgeous & Fully Working!');
