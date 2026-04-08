/* Settings — settings.js */
'use strict';

function toggleSwitch(el) {
  if (!el) return;
  const current = el.getAttribute('aria-checked') === 'true';
  el.setAttribute('aria-checked', String(!current));
}

function wireToggle(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('click', () => toggleSwitch(el));
}

function changePassword() {
  const cur = document.getElementById('curPw')?.value || '';
  const pw1 = document.getElementById('newPw')?.value || '';
  const pw2 = document.getElementById('newPw2')?.value || '';

  if (!cur || cur.length < 6) {
    alert('Please enter your current password.');
    return;
  }
  if (pw1.length < 8) {
    alert('New password must be at least 8 characters.');
    return;
  }
  if (pw1 !== pw2) {
    alert('New passwords do not match.');
    return;
  }

  alert('Password updated (frontend stub).');
  document.getElementById('curPw').value = '';
  document.getElementById('newPw').value = '';
  document.getElementById('newPw2').value = '';
}

function saveSettings() {
  const get = (id) => document.getElementById(id)?.getAttribute('aria-checked') === 'true';
  const payload = {
    emailReminders: get('tEmail'),
    announcements: get('tAnn'),
    productUpdates: get('tProd'),
    showProfile: get('tProfile'),
    shareAnalytics: get('tAnalytics'),
  };
  console.log('[Planora] settings saved', payload);
  alert('Settings saved (frontend stub).');
}

document.addEventListener('DOMContentLoaded', () => {
  ['tEmail', 'tAnn', 'tProd', 'tProfile', 'tAnalytics'].forEach(wireToggle);
  document.getElementById('changePwBtn')?.addEventListener('click', changePassword);
  document.getElementById('saveSettingsBtn')?.addEventListener('click', saveSettings);
  document.getElementById('signOutAllBtn')?.addEventListener('click', () => {
    alert('Signed out of all devices (frontend stub).');
  });
});
