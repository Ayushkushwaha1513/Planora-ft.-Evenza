/* Participant Certificates — certificates.js */
'use strict';

const CERTS = [
  { id: 1, event: 'UX Research Panel', issued: 'Mar 22, 2026', status: 'ready' },
  { id: 2, event: 'AI & ML Workshop', issued: 'Mar 10, 2026', status: 'ready' },
  { id: 3, event: 'Community Meetup', issued: 'Processing', status: 'pending' },
];

function render() {
  const grid = document.getElementById('certGrid');
  if (!grid) return;

  if (!CERTS.length) {
    grid.className = 'section';
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🏅</div>
        <div class="empty-title">No certificates yet</div>
        <div class="empty-sub">Certificates appear after successful participation and approval.</div>
      </div>
    `;
    return;
  }

  grid.className = 'cert-grid';
  grid.innerHTML = CERTS.map(c => `
    <div class="cert-card">
      <div class="cert-preview">
        <div class="cert-seal">✓</div>
      </div>
      <div class="cert-body">
        <div>
          <div class="cert-title">${c.event}</div>
          <div class="cert-meta">Issued: ${c.issued}</div>
        </div>
        <div class="cert-actions">
          ${c.status === 'ready' ? `
            <button class="btn-chip primary" onclick="downloadCert(${c.id})">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M11 8v2.5a1 1 0 01-1 1H3a1 1 0 01-1-1V8M6.5 1v7M4 5.5l2.5 2.5 2.5-2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Download
            </button>
            <button class="btn-chip" onclick="shareCert(${c.id})">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M9 4.5l-5 4M9 8.5l-5-4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="10.5" cy="3.5" r="1.5" stroke="currentColor" stroke-width="1.3"/><circle cx="2.5" cy="6.5" r="1.5" stroke="currentColor" stroke-width="1.3"/><circle cx="10.5" cy="9.5" r="1.5" stroke="currentColor" stroke-width="1.3"/></svg>
              Share
            </button>
          ` : `
            <span class="badge badge-pending">Pending</span>
            <button class="btn-chip" onclick="alert('Certificate will be available once issued.')">Details</button>
          `}
        </div>
      </div>
    </div>
  `).join('');
}

function downloadCert(id) {
  alert(`Downloading certificate #${id} (frontend stub).`);
}
function shareCert(id) {
  alert(`Sharing certificate #${id} (frontend stub).`);
}

document.addEventListener('DOMContentLoaded', render);

