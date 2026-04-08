/* Volunteer Messages — messages.js */
'use strict';

const MESSAGES = [
  { id: 1, title: 'Check-in starts at 9:30 AM', body: 'Please arrive 30 minutes early. Badges are at the main desk.', time: 'Today · 8:40 AM', event: 'Tech Summit 2026', tag: 'info', unread: true, color: '#06b6d4' },
  { id: 2, title: 'Parking update (urgent)', body: 'Parking Lot B is full. Use Lot C behind the cafeteria.', time: 'Today · 8:20 AM', event: 'Tech Summit 2026', tag: 'urgent', unread: true, color: '#ef4444' },
  { id: 3, title: 'Stage access', body: 'Stage crew: use Gate 2 for equipment loading.', time: 'Yesterday', event: 'Dev Bootcamp', tag: 'info', unread: false, color: '#10b981' },
  { id: 4, title: 'Reminder: Bring ID', body: 'Security may ask for a photo ID when entering the volunteer area.', time: '2 days ago', event: 'Design Conf', tag: 'info', unread: false, color: '#7c3aed' },
  { id: 5, title: 'Shift confirmation', body: 'Your shift has been confirmed. Thank you for volunteering!', time: 'Last week', event: 'UX Research Panel', tag: 'info', unread: false, color: '#a855f7' },
];

let filter = 'all';

function render() {
  const list = document.getElementById('msgList');
  if (!list) return;

  let data = MESSAGES;
  if (filter === 'unread') data = data.filter(m => m.unread);
  if (filter === 'urgent') data = data.filter(m => m.tag === 'urgent');

  if (!data.length) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <div class="empty-title">No messages</div>
        <div class="empty-sub">Try another filter.</div>
      </div>
    `;
    return;
  }

  list.innerHTML = data.map(m => `
    <div class="msg-item ${m.unread ? 'unread' : ''}" onclick="markRead(${m.id})">
      <div class="m-dot" style="background:${m.color}"></div>
      <div class="m-body">
        <div class="m-title">${m.title}</div>
        <div class="m-sub">${m.body}</div>
        <div class="m-meta">
          <span>${m.time}</span><span>·</span><span>${m.event}</span>
          <span class="m-chip ${m.tag}">${m.tag}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function markRead(id) {
  const m = MESSAGES.find(x => x.id === id);
  if (!m) return;
  m.unread = false;
  render();
}

function markAllRead() {
  MESSAGES.forEach(m => { m.unread = false; });
  render();
}

function initTabs() {
  const tabs = document.getElementById('msgTabs');
  if (!tabs) return;
  tabs.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filter = btn.dataset.filter;
      render();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  document.getElementById('markAllReadBtn')?.addEventListener('click', markAllRead);
  render();
});

window.markRead = markRead;

