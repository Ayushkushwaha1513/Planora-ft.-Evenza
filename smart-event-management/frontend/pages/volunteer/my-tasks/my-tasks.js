/* Volunteer My Tasks — my-tasks.js */
'use strict';

const TASKS = [
  { id: 1, title: 'Confirm arrival time', meta: 'Tech Summit 2026 · Due today', status: 'pending' },
  { id: 2, title: 'Review venue map', meta: 'Tech Summit 2026 · Due today', status: 'pending' },
  { id: 3, title: 'Collect badge kit', meta: 'On-site · Due 9:30 AM', status: 'in-progress' },
  { id: 4, title: 'Setup check-in table', meta: 'Tech Summit 2026 · On-site', status: 'in-progress' },
  { id: 5, title: 'Submit end-of-day summary', meta: 'After event · Due tonight', status: 'done' },
];

let filter = 'all';

function pill(status) {
  if (status === 'pending') return '<span class="status-pill pending">Pending</span>';
  if (status === 'in-progress') return '<span class="status-pill progress">In progress</span>';
  return '<span class="status-pill done">Done</span>';
}

function toggleDone(id) {
  const t = TASKS.find(x => x.id === id);
  if (!t) return;
  t.status = t.status === 'done' ? 'pending' : 'done';
  render();
}

function render() {
  const list = document.getElementById('taskList');
  if (!list) return;

  const data = filter === 'all' ? TASKS : TASKS.filter(t => t.status === filter);

  if (!data.length) {
    list.innerHTML = `
      <div class="empty-state" style="padding:40px 10px">
        <div class="empty-icon">🧾</div>
        <div class="empty-title">No tasks here</div>
        <div class="empty-sub">Try another tab or add tasks from your coordinator.</div>
      </div>
    `;
    return;
  }

  list.innerHTML = data.map(t => `
    <div class="task ${t.status === 'done' ? 'done' : ''}">
      <div class="task-left">
        <button class="task-check" aria-label="Toggle done" onclick="toggleDone(${t.id})">
          ${t.status === 'done' ? '✓' : ''}
        </button>
        <div style="min-width:0">
          <div class="task-title">${t.title}</div>
          <div class="task-meta">${t.meta}</div>
        </div>
      </div>
      <div class="task-right">
        ${pill(t.status)}
        <button class="btn-icon" title="Details" onclick="alert('Task details (frontend stub)')">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" stroke-width="1.2"/><path d="M7.5 6.5v4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M7.5 4.5v.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

function initTabs() {
  const tabs = document.getElementById('taskTabs');
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
  render();
});

// Expose for inline click handler
window.toggleDone = toggleDone;

