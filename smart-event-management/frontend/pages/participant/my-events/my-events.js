/* Participant My Events — my-events.js */
'use strict';

const EVENTS = [
  { id: 1, name: 'Design Workshop', date: 'May 12 · 2:00 PM', venue: 'Auditorium B', status: 'upcoming', color: '#06b6d4' },
  { id: 2, name: 'Dev Bootcamp', date: 'Jun 4 · 9:00 AM', venue: 'Lab 3', status: 'upcoming', color: '#10b981' },
  { id: 3, name: 'UX Research Panel', date: 'Mar 22 · 11:00 AM', venue: 'Room 12', status: 'past', attended: true, feedbackDone: true, certReady: true, color: '#a855f7' },
  { id: 4, name: 'AI & ML Workshop', date: 'Mar 10 · 3:00 PM', venue: 'Hall 2', status: 'past', attended: true, feedbackDone: false, certReady: true, color: '#ec4899' },
  { id: 5, name: 'Community Meetup', date: 'Feb 18 · 6:30 PM', venue: 'Cafeteria', status: 'past', attended: false, feedbackDone: false, certReady: false, color: '#7c3aed' },
];

let filter = 'all';

function statusBadge(ev) {
  if (ev.status === 'upcoming') return '<span class="badge badge-upcoming">Upcoming</span>';
  if (ev.status === 'past') return '<span class="badge badge-past">Past</span>';
  return '<span class="badge badge-pending">Pending</span>';
}

function outcomeText(ev) {
  if (ev.status !== 'past') return 'Not yet attended';
  if (ev.attended) return 'Attendance: Marked present';
  return 'Attendance: Not marked';
}

function render(list) {
  const grid = document.getElementById('eventsGrid');
  if (!grid) return;

  if (!list.length) {
    grid.className = 'section';
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🎟️</div>
        <div class="empty-title">No events in this view</div>
        <div class="empty-sub">Try switching the filter above.</div>
      </div>
    `;
    return;
  }

  grid.className = 'cards-grid';
  grid.innerHTML = list.map(ev => `
    <div class="card">
      <div class="card-color-bar" style="background:${ev.color}"></div>
      <div class="card-body">
        <span class="card-emoji">🎫</span>
        <div class="card-title">${ev.name}</div>
        <div class="card-desc">${ev.date} · ${ev.venue}</div>
        <div class="card-metas">
          <span class="card-meta">${statusBadge(ev)}</span>
          <span class="card-meta">${outcomeText(ev)}</span>
        </div>
      </div>
      <div class="card-footer" style="justify-content:flex-end">
        <div class="card-actions-row">
          ${ev.status === 'upcoming' ? `
            <button class="action-pill primary" onclick="window.location.href='../../join-event/join-event.html'">View details</button>
          ` : `
            <button class="action-pill ${ev.feedbackDone ? '' : 'primary'}" onclick="window.location.href='../feedback/feedback.html'">${ev.feedbackDone ? 'Feedback submitted' : 'Submit feedback'}</button>
            <button class="action-pill ${ev.certReady ? 'primary' : ''}" onclick="window.location.href='../certificates/certificates.html'">${ev.certReady ? 'View certificate' : 'Certificate pending'}</button>
          `}
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

