/* Organizer Overview — overview.js */
'use strict';

const UPCOMING = [
  { name: 'Design Workshop', date: 'May 12 · 2:00 PM', venue: 'Auditorium B', status: 'upcoming', color: '#06b6d4' },
  { name: 'Dev Bootcamp', date: 'Jun 4 · 9:00 AM', venue: 'Lab 3', status: 'upcoming', color: '#10b981' },
  { name: 'Product Launch Meetup', date: 'Jun 18 · 6:00 PM', venue: 'Hall 1', status: 'upcoming', color: '#f59e0b' },
];

const ATTENDANCE = [
  { name: 'Tech Summit 2026', attended: 143, registered: 312, color: '#7c3aed' },
  { name: 'UX Research Panel', attended: 78, registered: 90, color: '#a855f7' },
  { name: 'AI & ML Workshop', attended: 166, registered: 175, color: '#ec4899' },
];

const ACTIVITY = [
  { text: '<strong>2 volunteer requests</strong> waiting for approval (Dev Bootcamp).', time: '10 min ago', color: '#f59e0b' },
  { text: '<strong>12 new registrations</strong> for Tech Summit 2026 today.', time: '1h ago', color: '#06b6d4' },
  { text: 'Feedback received for <strong>UX Research Panel</strong> — average 4.8★.', time: '3h ago', color: '#10b981' },
  { text: '<strong>Evenza AI</strong> suggests sending a reminder to reduce no-shows.', time: 'Yesterday', color: '#7c3aed' },
];

function badgeForStatus(status) {
  if (status === 'live') return '<span class="badge badge-live">● Live</span>';
  if (status === 'upcoming') return '<span class="badge badge-upcoming">Upcoming</span>';
  return '<span class="badge badge-past">Past</span>';
}

function renderUpcoming() {
  const el = document.getElementById('upcomingEvents');
  if (!el) return;

  el.innerHTML = UPCOMING.map(ev => `
    <div class="ov-row">
      <div class="ov-left">
        <div class="ov-dot" style="background:${ev.color}"></div>
        <div style="min-width:0">
          <div class="ov-title">${ev.name}</div>
          <div class="ov-sub">${ev.date} · ${ev.venue}</div>
        </div>
      </div>
      <div class="ov-right">
        ${badgeForStatus(ev.status)}
      </div>
    </div>
  `).join('');
}

function renderAttendance() {
  const el = document.getElementById('attendanceProgress');
  if (!el) return;

  el.innerHTML = ATTENDANCE.map(item => {
    const pct = Math.max(0, Math.min(100, Math.round((item.attended / item.registered) * 100)));
    return `
      <div class="ov-row">
        <div class="ov-left">
          <div class="ov-dot" style="background:${item.color}"></div>
          <div style="min-width:0;flex:1">
            <div class="ov-title">${item.name}</div>
            <div class="progress-wrap" style="margin-top:8px">
              <div class="progress-info"><span>Attendance</span><strong>${item.attended} / ${item.registered}</strong></div>
              <div class="progress-bar"><div class="progress-fill" style="width:${pct}%; background: linear-gradient(90deg, ${item.color}, var(--purple-light));"></div></div>
            </div>
          </div>
        </div>
        <div class="ov-right">
          <div class="ov-meta">${pct}%</div>
        </div>
      </div>
    `;
  }).join('');
}

function renderActivity() {
  const el = document.getElementById('activityList');
  if (!el) return;

  el.innerHTML = ACTIVITY.map(a => `
    <div class="activity-item">
      <div class="ai-dot" style="background:${a.color}"></div>
      <div class="ai-body">
        <div class="ai-text">${a.text}</div>
        <div class="ai-time">${a.time}</div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderUpcoming();
  renderAttendance();
  renderActivity();
});

