/* Participant Overview — overview.js */
'use strict';

const UPCOMING = [
  { name: 'Design Workshop', when: 'May 12 · 2:00 PM', where: 'Auditorium B', color: '#06b6d4' },
  { name: 'Dev Bootcamp', when: 'Jun 4 · 9:00 AM', where: 'Lab 3', color: '#10b981' },
];

const CERTS = [
  { name: 'UX Research Panel', date: 'Mar 22', status: 'available', color: '#a855f7' },
  { name: 'AI & ML Workshop', date: 'Mar 10', status: 'available', color: '#ec4899' },
  { name: 'Community Meetup', date: 'Feb 18', status: 'processing', color: '#f59e0b' },
];

const PENDING_FB = [
  { name: 'Design Conf', date: 'Apr 2', color: '#7c3aed' },
  { name: 'Startup Pitch Night', date: 'Mar 28', color: '#06b6d4' },
];

function renderUpcoming() {
  const el = document.getElementById('upcomingList');
  if (!el) return;
  el.innerHTML = UPCOMING.map(ev => `
    <div class="p-row">
      <div class="p-left">
        <div class="p-dot" style="background:${ev.color}"></div>
        <div style="min-width:0">
          <div class="p-title">${ev.name}</div>
          <div class="p-sub">${ev.when} · ${ev.where}</div>
        </div>
      </div>
      <div class="mini-chip pending">Upcoming</div>
    </div>
  `).join('');
}

function renderCerts() {
  const el = document.getElementById('certList');
  if (!el) return;
  el.innerHTML = CERTS.slice(0, 3).map(c => `
    <div class="p-row" style="padding:10px 10px">
      <div class="p-left">
        <div class="p-dot" style="background:${c.color}"></div>
        <div style="min-width:0">
          <div class="p-title">${c.name}</div>
          <div class="p-sub">Issued · ${c.date}</div>
        </div>
      </div>
      <div class="mini-chip ${c.status === 'available' ? 'done' : 'pending'}">${c.status === 'available' ? 'Ready' : 'Processing'}</div>
    </div>
  `).join('');
}

function renderPendingFeedback() {
  const el = document.getElementById('pendingFbList');
  if (!el) return;
  el.innerHTML = PENDING_FB.slice(0, 3).map(f => `
    <div class="p-row" style="padding:10px 10px">
      <div class="p-left">
        <div class="p-dot" style="background:${f.color}"></div>
        <div style="min-width:0">
          <div class="p-title">${f.name}</div>
          <div class="p-sub">Attended · ${f.date}</div>
        </div>
      </div>
      <div class="mini-chip pending">Pending</div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderUpcoming();
  renderCerts();
  renderPendingFeedback();
});

