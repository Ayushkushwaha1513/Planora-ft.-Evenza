/* Volunteer Overview — overview.js */
'use strict';

const SHIFTS = [
  { event: 'Tech Summit 2026', when: 'Today · 9:00 AM', role: 'Check-in Desk', color: '#7c3aed' },
  { event: 'Dev Bootcamp', when: 'Jun 4 · 8:30 AM', role: 'Stage Crew', color: '#10b981' },
];

const TASKS = [
  { title: 'Confirm arrival time', meta: 'Tech Summit 2026 · Due today', status: 'pending', color: '#f59e0b' },
  { title: 'Review venue map', meta: 'Tech Summit 2026 · Due today', status: 'pending', color: '#06b6d4' },
  { title: 'Collect badge kit', meta: 'On-site · Due 9:30 AM', status: 'pending', color: '#7c3aed' },
];

const NOTICES = [
  { text: '<strong>Organizer:</strong> Check-in starts at 9:30 AM. Please arrive 30 minutes early.', time: '30 min ago', color: '#06b6d4' },
  { text: '<strong>Update:</strong> Parking Lot B is full — use Lot C behind the cafeteria.', time: '1h ago', color: '#f59e0b' },
];

function renderRows(targetId, rows, chipBuilder) {
  const el = document.getElementById(targetId);
  if (!el) return;

  el.innerHTML = rows.map(r => `
    <div class="v-row">
      <div class="v-left">
        <div class="v-dot" style="background:${r.color}"></div>
        <div style="min-width:0">
          <div class="v-title">${r.event || r.title}</div>
          <div class="v-sub">${r.when ? `${r.when} · ${r.role}` : r.meta}</div>
        </div>
      </div>
      ${chipBuilder ? `<div style="flex-shrink:0">${chipBuilder(r)}</div>` : ''}
    </div>
  `).join('');
}

function renderNotices() {
  const el = document.getElementById('noticeList');
  if (!el) return;
  el.innerHTML = NOTICES.map(n => `
    <div class="notice">
      <div class="n-dot" style="background:${n.color}"></div>
      <div>
        <div class="n-text">${n.text}</div>
        <div class="n-time">${n.time}</div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderRows('shiftList', SHIFTS, () => '<span class="badge badge-upcoming">Upcoming</span>');
  renderRows('taskPreview', TASKS, () => '<span class="badge badge-pending">Pending</span>');
  renderNotices();
});

