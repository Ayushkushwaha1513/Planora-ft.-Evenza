/* Organizer Messages — messages.js */
'use strict';

let audience = 'all';
let priority = 'normal';

const PRIORITY_COLOR = {
  normal: '#7c3aed',
  important: '#f59e0b',
  urgent: '#ef4444',
};

const SENT = [
  {
    title: 'Welcome & check-in instructions',
    body: 'Hi team — please arrive 30 minutes early for check-in. Badges will be at the main desk.',
    audience: 'volunteers',
    event: 'Tech Summit 2026',
    priority: 'important',
    time: 'Today · 9:10 AM',
  },
  {
    title: 'Parking update',
    body: 'Parking Lot B is full. Please use Lot C (behind the cafeteria).',
    audience: 'all',
    event: 'Tech Summit 2026',
    priority: 'urgent',
    time: 'Today · 8:45 AM',
  },
];

function setChipGroupActive(containerId, btnClass, value) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  wrap.querySelectorAll(`.${btnClass}`).forEach(b => b.classList.toggle('active', b.dataset.val === value));
}

function renderSent() {
  const list = document.getElementById('sentList');
  const count = document.getElementById('sentCount');
  if (!list) return;

  if (count) count.textContent = `${SENT.length} sent`;

  if (!SENT.length) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📣</div>
        <div class="empty-title">No broadcasts yet</div>
        <div class="empty-sub">Send a message and it’ll appear here.</div>
      </div>
    `;
    return;
  }

  list.innerHTML = SENT.map(m => `
    <div class="sent-item">
      <div class="sent-dot" style="background:${PRIORITY_COLOR[m.priority] || '#7c3aed'}"></div>
      <div class="sent-body">
        <div class="sent-title">${m.title}</div>
        <div class="sent-meta">
          <span>${m.time}</span><span>·</span>
          <span>${m.event}</span><span>·</span>
          <span style="text-transform:capitalize">${m.audience}</span><span>·</span>
          <span style="text-transform:capitalize">${m.priority}</span>
        </div>
        <div class="sent-text">${m.body}</div>
      </div>
    </div>
  `).join('');
}

function initChips() {
  const audienceWrap = document.getElementById('audienceChips');
  const priorityWrap = document.getElementById('priorityOpts');

  audienceWrap?.querySelectorAll('.audience-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      audience = btn.dataset.val;
      setChipGroupActive('audienceChips', 'audience-chip', audience);
    });
  });

  priorityWrap?.querySelectorAll('.priority-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      priority = btn.dataset.val;
      setChipGroupActive('priorityOpts', 'priority-opt', priority);
    });
  });
}

function initActions() {
  const clearBtn = document.getElementById('clearBtn');
  const sendBtn = document.getElementById('sendBtn');

  const titleEl = document.getElementById('msgTitle');
  const bodyEl = document.getElementById('msgBody');
  const eventEl = document.getElementById('broadcastEvent');

  clearBtn?.addEventListener('click', () => {
    if (titleEl) titleEl.value = '';
    if (bodyEl) bodyEl.value = '';
    if (eventEl) eventEl.value = 'all';
    audience = 'all';
    priority = 'normal';
    setChipGroupActive('audienceChips', 'audience-chip', audience);
    setChipGroupActive('priorityOpts', 'priority-opt', priority);
  });

  sendBtn?.addEventListener('click', () => {
    const title = titleEl?.value?.trim() || '';
    const body = bodyEl?.value?.trim() || '';
    const eventName = eventEl?.selectedOptions?.[0]?.textContent || 'All my events';

    if (!title || !body) {
      alert('Please enter both a message title and body.');
      return;
    }

    SENT.unshift({
      title,
      body,
      audience,
      event: eventName,
      priority,
      time: 'Just now',
    });

    if (titleEl) titleEl.value = '';
    if (bodyEl) bodyEl.value = '';

    renderSent();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initChips();
  initActions();
  renderSent();
});

