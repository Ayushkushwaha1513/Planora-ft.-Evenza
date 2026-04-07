/* ============================================
   PLANORA — Registration Page JS
============================================ */
'use strict';

/* ---- Mock Data ---- */
const MOCK_REGISTRATIONS = [
    { id: 1,  name: 'Priya Reddy',      email: 'priya.r@email.com',    initials: 'PR', color: '#7c3aed', event: 'Tech Summit 2026',    date: 'Apr 2, 2026',  type: 'Participant', status: 'confirmed' },
    { id: 2,  name: 'Siddharth M.',      email: 'sid.m@email.com',      initials: 'SM', color: '#0ea5e9', event: 'AI & Future of Work', date: 'Apr 1, 2026',  type: 'Participant', status: 'confirmed' },
    { id: 3,  name: 'Anika Nair',        email: 'anika.n@email.com',    initials: 'AN', color: '#10b981', event: 'Startup Pitch Night', date: 'Apr 1, 2026',  type: 'Participant', status: 'pending'   },
    { id: 4,  name: 'Rohit Kapoor',      email: 'rohit.k@email.com',    initials: 'RK', color: '#f59e0b', event: 'Tech Summit 2026',    date: 'Mar 31, 2026', type: 'Volunteer',   status: 'confirmed' },
    { id: 5,  name: 'Divya Sharma',      email: 'divya.s@email.com',    initials: 'DS', color: '#ec4899', event: 'Design Workshop',     date: 'Mar 30, 2026', type: 'Participant', status: 'confirmed' },
    { id: 6,  name: 'Arjun Kumar',       email: 'arjun.k@email.com',    initials: 'AK', color: '#a855f7', event: 'Tech Summit 2026',    date: 'Mar 30, 2026', type: 'Speaker',     status: 'confirmed' },
    { id: 7,  name: 'Neha Joshi',        email: 'neha.j@email.com',     initials: 'NJ', color: '#06b6d4', event: 'Dev Bootcamp',        date: 'Mar 29, 2026', type: 'Participant', status: 'pending'   },
    { id: 8,  name: 'Karan Mehta',       email: 'karan.m@email.com',    initials: 'KM', color: '#7c3aed', event: 'Tech Summit 2026',    date: 'Mar 29, 2026', type: 'Volunteer',   status: 'confirmed' },
    { id: 9,  name: 'Tanya Kapoor',      email: 'tanya.k@email.com',    initials: 'TK', color: '#10b981', event: 'Design Workshop',     date: 'Mar 28, 2026', type: 'Participant', status: 'cancelled' },
    { id: 10, name: 'Raj Malhotra',      email: 'raj.m@email.com',      initials: 'RM', color: '#f59e0b', event: 'AI & Future of Work', date: 'Mar 28, 2026', type: 'Participant', status: 'pending'   },
    { id: 11, name: 'Meera Iyer',        email: 'meera.i@email.com',    initials: 'MI', color: '#ec4899', event: 'Startup Pitch Night', date: 'Mar 27, 2026', type: 'Volunteer',   status: 'confirmed' },
    { id: 12, name: 'Vikram Singh',      email: 'vikram.s@email.com',   initials: 'VS', color: '#a855f7', event: 'Tech Summit 2026',    date: 'Mar 27, 2026', type: 'Participant', status: 'confirmed' },
    { id: 13, name: 'Sneha Patel',       email: 'sneha.p@email.com',    initials: 'SP', color: '#06b6d4', event: 'Dev Bootcamp',        date: 'Mar 26, 2026', type: 'Participant', status: 'confirmed' },
    { id: 14, name: 'Amit Sharma',       email: 'amit.s@email.com',     initials: 'AS', color: '#7c3aed', event: 'Design Workshop',     date: 'Mar 26, 2026', type: 'Participant', status: 'cancelled' },
    { id: 15, name: 'Ananya Gupta',      email: 'ananya.g@email.com',   initials: 'AG', color: '#10b981', event: 'Tech Summit 2026',    date: 'Mar 25, 2026', type: 'Participant', status: 'confirmed' },
];

const TYPE_CLASSES = { 'Participant': 'type-participant', 'Volunteer': 'type-volunteer', 'Speaker': 'type-speaker' };
const STATUS_CLASSES = { 'confirmed': 'status-confirmed', 'pending': 'status-pending', 'cancelled': 'status-cancelled' };

/* ---- State ---- */
let currentFilter = 'all';
let currentPage = 1;
const perPage = 15;

/* ---- Init ---- */
function initSidebar() {
    if (typeof PlanoraSidebar !== 'undefined') {
        PlanoraSidebar.init({
            activePage: 'registration',
            user: { name: 'Aryan Kapoor', initials: 'AK', role: 'Organizer' }
        });
    }
}

/* ---- Counter Animation ---- */
function animateCounters() {
    document.querySelectorAll('[data-target]').forEach(el => {
        const target = parseFloat(el.dataset.target);
        const isFloat = target % 1 !== 0;
        const duration = 1200;
        const startTime = performance.now();
        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = target * ease;
            el.textContent = isFloat ? current.toFixed(1) : Math.round(current);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

/* ---- Filtered Data ---- */
function getFiltered() {
    const searchVal = (document.getElementById('searchInput')?.value || '').toLowerCase();
    let list = MOCK_REGISTRATIONS;
    if (currentFilter !== 'all') {
        list = list.filter(r => r.status === currentFilter);
    }
    if (searchVal) {
        list = list.filter(r => r.name.toLowerCase().includes(searchVal) || r.email.toLowerCase().includes(searchVal) || r.event.toLowerCase().includes(searchVal));
    }
    return list;
}

/* ---- Render Table ---- */
function renderTable() {
    const tbody = document.getElementById('regTableBody');
    if (!tbody) return;
    const data = getFiltered();
    const start = (currentPage - 1) * perPage;
    const pageData = data.slice(start, start + perPage);

    if (!pageData.length) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-dim);">No registrations found.</td></tr>`;
        renderPagination(0);
        return;
    }

    tbody.innerHTML = pageData.map(r => `
        <tr>
            <td class="th-check">
                <label class="custom-checkbox"><input type="checkbox" data-id="${r.id}"/><span class="checkmark"></span></label>
            </td>
            <td>
                <div class="reg-user">
                    <div class="reg-avatar" style="background:${r.color}">${r.initials}</div>
                    <div><div class="reg-name">${r.name}</div><div class="reg-email">${r.email}</div></div>
                </div>
            </td>
            <td><span class="reg-event-name">${r.event}</span></td>
            <td><span class="reg-date">${r.date}</span></td>
            <td><span class="reg-type-badge ${TYPE_CLASSES[r.type] || ''}">${r.type}</span></td>
            <td><span class="reg-status ${STATUS_CLASSES[r.status] || ''}">${r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span></td>
            <td>
                <div class="reg-actions">
                    <button class="action-btn" title="View" onclick="showToast('Opening ${r.name}\\'s details...')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                    <button class="action-btn" title="Send Reminder" onclick="showToast('Reminder sent to ${r.name}')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    renderPagination(data.length);
}

/* ---- Pagination ---- */
function renderPagination(total) {
    const info = document.getElementById('paginationInfo');
    const pgNumbers = document.getElementById('pgNumbers');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const totalPages = Math.ceil(total / perPage) || 1;
    if (info) {
        const start = total > 0 ? (currentPage - 1) * perPage + 1 : 0;
        const end = Math.min(currentPage * perPage, total);
        info.textContent = `Showing ${start}–${end} of ${total}`;
    }
    if (pgNumbers) {
        let html = '';
        for (let i = 1; i <= totalPages; i++) {
            html += `<button class="pg-num${i === currentPage ? ' active' : ''}" onclick="goToPage(${i})">${i}</button>`;
        }
        pgNumbers.innerHTML = html;
    }
    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
}

function goToPage(page) {
    currentPage = page;
    renderTable();
}

/* ---- Toast ---- */
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

/* ---- Chart ---- */
function initChart() {
    const canvas = document.getElementById('regChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(124,58,237,0.25)');
    gradient.addColorStop(1, 'rgba(124,58,237,0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Registrations',
                data: [12, 28, 18, 42, 35, 52, 38],
                borderColor: '#7c3aed',
                backgroundColor: gradient,
                borderWidth: 2.5,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#7c3aed',
                pointBorderColor: '#0f0f18',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#13131f',
                    titleColor: '#f1f0f7',
                    bodyColor: '#7b7a8f',
                    borderColor: 'rgba(255,255,255,0.07)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 10,
                    displayColors: false,
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
                    ticks: { color: '#3d3c52', font: { family: 'Outfit', size: 11, weight: 600 } },
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
                    ticks: { color: '#3d3c52', font: { family: 'Outfit', size: 11, weight: 600 }, stepSize: 10 },
                    beginAtZero: true,
                }
            }
        }
    });
}

/* ---- Filters ---- */
function initFilters() {
    const tabs = document.getElementById('filterTabs');
    if (!tabs) return;
    tabs.querySelectorAll('.filter-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            tabs.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            currentPage = 1;
            renderTable();
        });
    });
}

/* ---- Search ---- */
function initSearch() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    let timer;
    input.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(() => { currentPage = 1; renderTable(); }, 250);
    });
}

/* ---- Pagination Buttons ---- */
function initPagination() {
    const prev = document.getElementById('prevBtn');
    const next = document.getElementById('nextBtn');
    if (prev) prev.addEventListener('click', () => { if (currentPage > 1) goToPage(currentPage - 1); });
    if (next) next.addEventListener('click', () => {
        const tp = Math.ceil(getFiltered().length / perPage);
        if (currentPage < tp) goToPage(currentPage + 1);
    });
}

/* ---- Select All ---- */
function initSelectAll() {
    const sa = document.getElementById('selectAll');
    if (!sa) return;
    sa.addEventListener('change', () => {
        document.querySelectorAll('#regTableBody input[type="checkbox"]').forEach(cb => { cb.checked = sa.checked; });
    });
}

/* ---- Export ---- */
function initExport() {
    const btn = document.getElementById('exportBtn');
    if (!btn) return;
    btn.addEventListener('click', () => showToast('Exporting registrations as CSV...'));
}

/* ---- Starfield ---- */
function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stars = Array.from({ length: 80 }, () => ({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height,
            r: Math.random() * 1.2 + 0.3, a: Math.random(), da: (Math.random() - 0.5) * 0.005,
        }));
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.a += s.da; if (s.a > 1 || s.a < 0.2) s.da *= -1;
            ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${s.a * 0.4})`; ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    resize(); window.addEventListener('resize', resize); draw();
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initStarfield();
    animateCounters();
    initChart();
    initFilters();
    initSearch();
    initPagination();
    initSelectAll();
    initExport();
    renderTable();
});
