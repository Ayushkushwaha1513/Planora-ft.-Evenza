/* Participant Feedback — feedback.js */
'use strict';

let currentEventId = null;
let currentRating = 0;

const PENDING = [
  { id: 1, event: 'Design Conf', date: 'Apr 2, 2026', note: 'Session: Future of Product Design' },
  { id: 2, event: 'Startup Pitch Night', date: 'Mar 28, 2026', note: 'Venue: Hall 4' },
];

const DONE = [
  { id: 3, event: 'UX Research Panel', date: 'Mar 22, 2026', rating: 5, comment: 'Very insightful panel, great moderation and Q&A.' },
  { id: 4, event: 'AI & ML Workshop', date: 'Mar 10, 2026', rating: 4, comment: 'Loved the hands-on labs. Would like more time for practice.' },
];

function stars(rating) {
  return `<div class="fb-stars">${[1,2,3,4,5].map(i => `<span class="s ${i<=rating?'filled':''}">★</span>`).join('')}</div>`;
}

function renderLists() {
  const pendingList = document.getElementById('pendingList');
  const doneList = document.getElementById('doneList');
  const pendingCount = document.getElementById('pendingCount');

  if (pendingCount) pendingCount.textContent = `${PENDING.length} pending`;

  if (pendingList) {
    if (!PENDING.length) {
      pendingList.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">✅</div>
          <div class="empty-title">No pending reviews</div>
          <div class="empty-sub">You’re all caught up.</div>
        </div>
      `;
    } else {
      pendingList.innerHTML = PENDING.map(p => `
        <div class="fb-card">
          <div class="fb-left">
            <div class="fb-title">${p.event}</div>
            <div class="fb-sub">Attended · ${p.date} · ${p.note}</div>
          </div>
          <div class="fb-actions">
            <button class="btn-ghost" onclick="openModal(${p.id})">Review</button>
          </div>
        </div>
      `).join('');
    }
  }

  if (doneList) {
    if (!DONE.length) {
      doneList.innerHTML = `<div style="padding:10px;color:var(--text-dim);font-size:13px">No reviews yet.</div>`;
    } else {
      doneList.innerHTML = DONE.map(d => `
        <div class="fb-card" style="align-items:flex-start">
          <div class="fb-left">
            <div class="fb-title">${d.event}</div>
            <div class="fb-sub">Submitted · ${d.date}</div>
            ${stars(d.rating)}
            <div class="fb-sub" style="margin-top:8px;color:var(--text-muted);line-height:1.55">${d.comment}</div>
          </div>
          <div class="fb-actions">
            <span class="badge badge-approved">Submitted</span>
          </div>
        </div>
      `).join('');
    }
  }
}

function setRating(r) {
  currentRating = r;
  document.querySelectorAll('.star-btn').forEach(btn => {
    const val = Number(btn.dataset.val);
    btn.classList.toggle('filled', val <= r);
  });
}

function openModal(eventId) {
  currentEventId = eventId;
  const modal = document.getElementById('fbModal');
  const title = document.getElementById('fbModalTitle');
  const comment = document.getElementById('fbComment');

  const ev = PENDING.find(p => p.id === eventId);
  if (title) title.textContent = ev ? `Review: ${ev.event}` : 'Submit Review';
  if (comment) comment.value = '';
  setRating(0);

  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeModal() {
  const modal = document.getElementById('fbModal');
  if (modal) modal.style.display = 'none';
  currentEventId = null;
}

function submitReview() {
  if (!currentEventId) return;
  if (!currentRating) {
    alert('Please select a rating.');
    return;
  }

  const comment = document.getElementById('fbComment')?.value?.trim() || '';
  const idx = PENDING.findIndex(p => p.id === currentEventId);
  if (idx >= 0) {
    const ev = PENDING.splice(idx, 1)[0];
    DONE.unshift({
      id: ev.id,
      event: ev.event,
      date: 'Just now',
      rating: currentRating,
      comment: comment || 'No comment provided.',
    });
  }

  closeModal();
  renderLists();
}

document.addEventListener('DOMContentLoaded', () => {
  renderLists();

  document.getElementById('fbModalClose')?.addEventListener('click', closeModal);
  document.getElementById('fbCancelBtn')?.addEventListener('click', closeModal);
  document.getElementById('fbSubmitBtn')?.addEventListener('click', submitReview);

  document.getElementById('fbModal')?.addEventListener('click', (e) => {
    if (e.target?.id === 'fbModal') closeModal();
  });

  document.querySelectorAll('.star-btn').forEach(btn => {
    btn.addEventListener('click', () => setRating(Number(btn.dataset.val)));
  });
});

// Expose for inline handler used in HTML rendering
window.openModal = openModal;

