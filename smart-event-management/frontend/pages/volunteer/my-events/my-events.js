/* Volunteer My Events — my-events.js */
'use strict';

const EVENTS = [
  { id: 1, name: 'Tech Summit 2026', date: 'Today · 10:00 AM', venue: 'Main Hall', status: 'upcoming', role: 'Check-in Desk', shift: '9:00 AM – 1:00 PM', color: '#7c3aed' },
  { id: 2, name: 'Dev Bootcamp', date: 'Jun 4 · 9:00 AM', venue: 'Lab 3', status: 'upcoming', role: 'Stage Crew', shift: '8:30 AM – 12:00 PM', color: '#10b981' },
  { id: 3, name: 'UX Research Panel', date: 'Mar 22 · 11:00 AM', venue: 'Room 12', status: 'past', role: 'Usher', shift: '10:30 AM – 12:30 PM', color: '#a855f7' },
];

let filter = 'all';

function badge(status) {
  if (status === 'upcoming') return '<span class="badge badge-upcoming">Upcoming</span>';
  return '<span class="badge badge-past">Past</span>';
}

function render(list) {
  const grid = document.getElementById('volEventsGrid');
  if (!grid) return;

  if (!list.length) {
    grid.className = 'section';
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛡️</div>
        <div class="empty-title">No volunteer events</div>
        <div class="empty-sub">Join an event as a volunteer to see it here.</div>
      </div>
    `;
    return;
  }

  grid.className = 'cards-grid';
  grid.innerHTML = list.map(ev => `
    <div class="card">
      <div class="card-color-bar" style="background:${ev.color}"></div>
      <div class="card-body">
        <span class="card-emoji">🧩</span>
        <div class="card-title">${ev.name}</div>
        <div class="card-desc">${ev.date} · ${ev.venue}</div>
        <div class="card-metas">
          <span class="card-meta">${badge(ev.status)}</span>
          <span class="card-meta"><span class="role-pill">${ev.role}</span></span>
          <span class="card-meta"><span class="shift-pill">${ev.shift}</span></span>
        </div>
      </div>
      <div class="card-footer" style="justify-content:flex-end">
        <div class="card-actions">
          <button class="btn-ghost" onclick="window.location.href='../my-tasks/my-tasks.html'">Tasks</button>
          <button class="btn-primary" onclick="window.location.href='../messages/messages.html'">Notices</button>
        </div>
      </div>
    </div>
  `).join('');
}

function applyFilter() {
  const list = filter === 'all' ? EVENTS : EVENTS.filter(e => e.status === filter);
  render(list);
}

function initTabs() {
  const tabs = document.getElementById('eventTabs');
  if (!tabs) return;
  tabs.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filter = btn.dataset.filter;
      applyFilter();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  applyFilter();
});

