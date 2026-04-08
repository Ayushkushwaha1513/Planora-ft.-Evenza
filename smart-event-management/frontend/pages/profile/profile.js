/* Profile — profile.js */
'use strict';

const ACTIVITY = [
  { text: 'Created <strong>Tech Summit 2026</strong> event.', time: 'Yesterday', color: '#7c3aed' },
  { text: 'Approved <strong>2 volunteer registrations</strong>.', time: '2 days ago', color: '#10b981' },
  { text: 'Received feedback for <strong>UX Research Panel</strong> (avg 4.8★).', time: 'Last week', color: '#06b6d4' },
];

function renderActivity() {
  const el = document.getElementById('activity');
  if (!el) return;
  el.innerHTML = ACTIVITY.map(a => `
    <div class="act-item">
      <div class="act-dot" style="background:${a.color}"></div>
      <div style="flex:1">
        <div class="act-text">${a.text}</div>
        <div class="act-time">${a.time}</div>
      </div>
    </div>
  `).join('');
}

function setEditing(isEditing) {
  document.getElementById('nameInput')?.toggleAttribute('disabled', !isEditing);
  document.getElementById('emailInput')?.toggleAttribute('disabled', !isEditing);
  document.getElementById('roleInput')?.toggleAttribute('disabled', !isEditing);

  const editBtn = document.getElementById('editBtn');
  const saveBtn = document.getElementById('saveBtn');
  if (editBtn) editBtn.style.display = isEditing ? 'none' : 'inline-flex';
  if (saveBtn) saveBtn.style.display = isEditing ? 'inline-flex' : 'none';
}

function save() {
  const name = document.getElementById('nameInput')?.value?.trim() || '';
  const email = document.getElementById('emailInput')?.value?.trim() || '';
  const role = document.getElementById('roleInput')?.value || 'Organizer';

  if (!name || !email) {
    alert('Name and email are required.');
    return;
  }

  const nameDisplay = document.getElementById('pNameDisplay');
  const emailDisplay = document.getElementById('pEmailDisplay');
  const roleDisplay = document.getElementById('pRoleDisplay');

  if (nameDisplay) nameDisplay.textContent = name;
  if (emailDisplay) emailDisplay.textContent = email;
  if (roleDisplay) roleDisplay.textContent = role;

  setEditing(false);
  alert('Profile saved (frontend stub).');
}

document.addEventListener('DOMContentLoaded', () => {
  renderActivity();

  document.getElementById('editBtn')?.addEventListener('click', () => setEditing(true));
  document.getElementById('saveBtn')?.addEventListener('click', save);
});
