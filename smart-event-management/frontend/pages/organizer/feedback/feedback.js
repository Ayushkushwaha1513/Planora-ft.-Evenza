/* Organizer Feedback — feedback.js */
'use strict';

const REVIEWS = [
  { id: 1, person: 'Priya Ramesh', event: 'Tech Summit 2026', eventKey: 'tech-summit', rating: 5, time: '2h ago', comment: 'Super smooth check-in, great sessions, and amazing speakers.', color: '#7c3aed' },
  { id: 2, person: 'Sameer Khan', event: 'Tech Summit 2026', eventKey: 'tech-summit', rating: 4, time: 'Yesterday', comment: 'Loved the content. Food queues were a bit long during lunch.', color: '#06b6d4' },
  { id: 3, person: 'Leena Thomas', event: 'Dev Bootcamp', eventKey: 'dev-bootcamp', rating: 3, time: '3 days ago', comment: 'Good pace but would appreciate more hands-on examples.', color: '#10b981' },
  { id: 4, person: 'Aarav Singh', event: 'Dev Bootcamp', eventKey: 'dev-bootcamp', rating: 5, time: 'Last week', comment: 'Best bootcamp I attended — instructors were excellent.', color: '#a855f7' },
];

let ratingFilter = 'all'; // all | 5 | 4 | low
let eventFilter = '';

function stars(r) {
  return `<div class="fb-stars">${[1,2,3,4,5].map(i => `<span class="${i<=r?'filled':''}">★</span>`).join('')}</div>`;
}

function applyFilters() {
  let list = REVIEWS.slice();
  if (eventFilter) list = list.filter(r => r.eventKey === eventFilter);
  if (ratingFilter === '5') list = list.filter(r => r.rating === 5);
  if (ratingFilter === '4') list = list.filter(r => r.rating === 4);
  if (ratingFilter === 'low') list = list.filter(r => r.rating <= 3);
  return list;
}

function render() {
  const el = document.getElementById('feedbackList');
  if (!el) return;
  const list = applyFilters();

  if (!list.length) {
    el.innerHTML = `
      <div class="empty-state" style="padding:42px 12px">
        <div class="empty-icon">💬</div>
        <div class="empty-title">No feedback found</div>
        <div class="empty-sub">Try changing filters.</div>
      </div>
    `;
    return;
  }

  el.innerHTML = list.map(r => `
    <div class="feedback-item">
      <div class="fb-dot" style="background:${r.color}"></div>
      <div class="fb-body">
        <div class="fb-head">
          <div>
            <div class="fb-name">${r.person}</div>
            <div class="fb-meta">${r.event} · ${r.time}</div>
          </div>
          ${stars(r.rating)}
        </div>
        <div class="fb-comment">${r.comment}</div>
      </div>
    </div>
  `).join('');
}

function initTabs() {
  const tabs = document.getElementById('feedbackTabs');
  if (!tabs) return;
  tabs.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      ratingFilter = btn.dataset.filter;
      render();
    });
  });
}

function initEventFilter() {
  const sel = document.getElementById('eventFilter');
  if (!sel) return;
  sel.addEventListener('change', () => {
    eventFilter = sel.value;
    render();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initEventFilter();
  render();
});

