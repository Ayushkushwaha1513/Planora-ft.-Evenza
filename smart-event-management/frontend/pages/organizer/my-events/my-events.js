/* Organizer My Events — my-events.js */
'use strict';

const EVENTS = [
  { id: 1, title: 'Tech Summit 2026', date: 'Today · 10:00 AM', venue: 'Main Hall', status: 'live', code: 'TS26-A9K2', color: '#7c3aed', registrations: 312, cap: 400 },
  { id: 2, title: 'Design Workshop', date: 'May 12 · 2:00 PM', venue: 'Auditorium B', status: 'upcoming', code: 'DW-41Q7', color: '#06b6d4', registrations: 48, cap: 60 },
  { id: 3, title: 'Dev Bootcamp', date: 'Jun 4 · 9:00 AM', venue: 'Lab 3', status: 'upcoming', code: 'DB-8P2C', color: '#10b981', registrations: 201, cap: 250 },
  { id: 4, title: 'UX Research Panel', date: 'Mar 22 · 11:00 AM', venue: 'Room 12', status: 'past', code: 'UXP-2M1D', color: '#a855f7', registrations: 90, cap: 100 },
];

let filter = 'all';
let view = 'grid'; // 'grid' | 'list'

function badge(status) {
  if (status === 'live') return '<span class="badge badge-live">● Live</span>';
  if (status === 'upcoming') return '<span class="badge badge-upcoming">Upcoming</span>';
  return '<span class="badge badge-past">Past</span>';
}

function renderGrid(list) {
  const container = document.getElementById('eventsContainer');
  if (!container) return;

  container.className = 'cards-grid';
  container.innerHTML = list.map(ev => `
    <div class="card" onclick="window.location.href='../../event-details/event-details.html'">
      <div class="card-color-bar" style="background:${ev.color}"></div>
      <div class="card-body">
        <span class="card-emoji">📅</span>
        <div class="card-title">${ev.title}</div>
        <div class="card-desc">${ev.date} · ${ev.venue}</div>
        <div class="card-metas">
          <span class="card-meta">${badge(ev.status)}</span>
          <span class="card-meta">${ev.registrations}/${ev.cap} reg.</span>
        </div>
      </div>
      <div class="card-footer">
        <div class="card-code">${ev.code}</div>
        <div class="card-actions">
          <button class="btn-icon" title="Edit" onclick="event.stopPropagation(); alert('Edit flow (frontend stub)');">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 11.5l.5-3.5L10.8 0.7a1.2 1.2 0 011.7 0l1.8 1.8a1.2 1.2 0 010 1.7L6 11.9 2 11.5z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/><path d="M9.5 2l3.5 3.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>
          </button>
          <button class="btn-icon" title="Manage" onclick="event.stopPropagation(); window.location.href='../registrations/registrations.html';">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3 4h9M3 7.5h6M3 11h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderList(list) {
  const container = document.getElementById('eventsContainer');
  if (!container) return;

  container.className = 'events-list';
  container.innerHTML = list.map(ev => `
    <div class="event-row" onclick="window.location.href='../../event-details/event-details.html'">
      <div class="er-dot" style="background:${ev.color}"></div>
      <div class="er-body">
        <div class="er-title">${ev.title}</div>
        <div class="er-meta">
          <span>${ev.date}</span>
          <span>·</span>
          <span>${ev.venue}</span>
          <span>·</span>
          <span>${ev.registrations}/${ev.cap} registered</span>
        </div>
      </div>
      <div class="er-right">
        ${badge(ev.status)}
        <div class="er-code" title="Event code">${ev.code}</div>
        <button class="btn-icon" title="Registrations" onclick="event.stopPropagation(); window.location.href='../registrations/registrations.html';">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3 4h9M3 7.5h6M3 11h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

function applyFilter() {
  const list = filter === 'all' ? EVENTS : EVENTS.filter(e => e.status === filter);
  if (!list.length) {
    const container = document.getElementById('eventsContainer');
    if (container) {
      container.className = 'section';
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🗓️</div>
          <div class="empty-title">No events found</div>
          <div class="empty-sub">Try a different filter.</div>
        </div>
      `;
    }
    return;
  }
  view === 'grid' ? renderGrid(list) : renderList(list);
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

function initViewToggle() {
  const gridBtn = document.getElementById('gridView');
  const listBtn = document.getElementById('listView');
  if (!gridBtn || !listBtn) return;

  const set = (v) => {
    view = v;
    gridBtn.classList.toggle('active', v === 'grid');
    listBtn.classList.toggle('active', v === 'list');
    applyFilter();
  };

  gridBtn.addEventListener('click', () => set('grid'));
  listBtn.addEventListener('click', () => set('list'));
}

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initViewToggle();
  applyFilter();
});

