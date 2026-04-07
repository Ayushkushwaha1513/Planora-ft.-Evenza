/* ============================================
   PLANORA — Volunteers Page JS
============================================ */
'use strict';

/* ---- Mock Data ---- */
const MOCK_VOLUNTEERS = [
    { id: 1, name: 'Rahul Verma',    email: 'rahul.v@email.com',    initials: 'RV', color: '#7c3aed', event: 'Tech Summit 2026',        role: 'Coordinator',  hours: 42, status: 'active'   },
    { id: 2, name: 'Sneha Patel',    email: 'sneha.p@email.com',    initials: 'SP', color: '#06b6d4', event: 'Tech Summit 2026',        role: 'Registration', hours: 28, status: 'active'   },
    { id: 3, name: 'Amit Sharma',    email: 'amit.s@email.com',     initials: 'AS', color: '#10b981', event: 'Design Workshop',         role: 'Setup',        hours: 15, status: 'active'   },
    { id: 4, name: 'Priya Nair',     email: 'priya.n@email.com',    initials: 'PN', color: '#f59e0b', event: 'Tech Summit 2026',        role: 'Coordinator',  hours: 36, status: 'active'   },
    { id: 5, name: 'Karan Mehta',    email: 'karan.m@email.com',    initials: 'KM', color: '#ec4899', event: 'Dev Bootcamp',            role: 'General',      hours: 20, status: 'active'   },
    { id: 6, name: 'Ananya Gupta',   email: 'ananya.g@email.com',   initials: 'AG', color: '#a855f7', event: 'Startup Pitch Night',     role: 'Setup',        hours: 18, status: 'active'   },
    { id: 7, name: 'Rohan Das',      email: 'rohan.d@email.com',    initials: 'RD', color: '#06b6d4', event: 'AI & Future of Work',     role: 'Registration', hours: 12, status: 'pending'  },
    { id: 8, name: 'Meera Iyer',     email: 'meera.i@email.com',    initials: 'MI', color: '#10b981', event: 'Design Workshop',         role: 'General',      hours: 8,  status: 'pending'  },
    { id: 9, name: 'Vikram Singh',   email: 'vikram.s@email.com',   initials: 'VS', color: '#7c3aed', event: 'Tech Summit 2026',        role: 'Coordinator',  hours: 32, status: 'active'   },
    { id: 10, name: 'Divya Reddy',   email: 'divya.r@email.com',    initials: 'DR', color: '#f59e0b', event: 'Dev Bootcamp',            role: 'Setup',        hours: 22, status: 'active'   },
    { id: 11, name: 'Arjun Kumar',   email: 'arjun.k@email.com',    initials: 'AK', color: '#ec4899', event: 'Startup Pitch Night',     role: 'General',      hours: 0,  status: 'pending'  },
    { id: 12, name: 'Neha Joshi',    email: 'neha.j@email.com',     initials: 'NJ', color: '#a855f7', event: 'AI & Future of Work',     role: 'Registration', hours: 0,  status: 'inactive' },
    { id: 13, name: 'Siddharth M.',  email: 'sid.m@email.com',      initials: 'SM', color: '#06b6d4', event: 'Tech Summit 2026',        role: 'Setup',        hours: 25, status: 'active'   },
    { id: 14, name: 'Tanya Kapoor',  email: 'tanya.k@email.com',    initials: 'TK', color: '#10b981', event: 'Design Workshop',         role: 'Coordinator',  hours: 19, status: 'active'   },
    { id: 15, name: 'Raj Malhotra',  email: 'raj.m@email.com',      initials: 'RM', color: '#7c3aed', event: 'Dev Bootcamp',            role: 'General',      hours: 0,  status: 'inactive' },
    { id: 16, name: 'Isha Banerjee', email: 'isha.b@email.com',     initials: 'IB', color: '#f59e0b', event: 'AI & Future of Work',     role: 'Setup',        hours: 14, status: 'active'   },
];

const ROLE_CLASSES = {
    'Coordinator':  'role-coordinator',
    'Setup':        'role-setup',
    'Registration': 'role-registration',
    'General':      'role-general',
};

const STATUS_CLASSES = {
    'active':   'status-active',
    'pending':  'status-pending',
    'inactive': 'status-inactive',
};

/* ---- State ---- */
let currentFilter = 'all';
let currentView = 'table';
let currentPage = 1;
const perPage = 12;

/* ---- Init Sidebar ---- */
function initSidebar() {
    if (typeof PlanoraSidebar !== 'undefined') {
        PlanoraSidebar.init({
            activePage: 'volunteers',
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
    let list = MOCK_VOLUNTEERS;

    if (currentFilter !== 'all') {
        list = list.filter(v => v.status === currentFilter);
    }
    if (searchVal) {
        list = list.filter(v =>
            v.name.toLowerCase().includes(searchVal) ||
            v.email.toLowerCase().includes(searchVal) ||
            v.event.toLowerCase().includes(searchVal)
        );
    }
    return list;
}

/* ---- Render Table View ---- */
function renderTable() {
    const tbody = document.getElementById('volTableBody');
    if (!tbody) return;

    const data = getFiltered();
    const start = (currentPage - 1) * perPage;
    const pageData = data.slice(start, start + perPage);

    if (!pageData.length) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-dim);">No volunteers found.</td></tr>`;
        return;
    }

    tbody.innerHTML = pageData.map(v => `
        <tr>
            <td class="th-check">
                <label class="custom-checkbox">
                    <input type="checkbox" data-id="${v.id}" />
                    <span class="checkmark"></span>
                </label>
            </td>
            <td>
                <div class="vol-user">
                    <div class="vol-avatar" style="background:${v.color}">${v.initials}</div>
                    <div>
                        <div class="vol-name">${v.name}</div>
                        <div class="vol-email">${v.email}</div>
                    </div>
                </div>
            </td>
            <td>${v.event}</td>
            <td><span class="vol-role-badge ${ROLE_CLASSES[v.role] || 'role-general'}">${v.role}</span></td>
            <td><span class="vol-hours">${v.hours}h</span></td>
            <td><span class="vol-status ${STATUS_CLASSES[v.status] || ''}">${v.status.charAt(0).toUpperCase() + v.status.slice(1)}</span></td>
            <td>
                <div class="vol-actions">
                    <button class="action-btn" title="View" onclick="showToast('Opening ${v.name}\\'s profile...')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                    <button class="action-btn" title="Edit" onclick="showToast('Editing ${v.name}...')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button class="action-btn danger" title="Remove" onclick="showToast('${v.name} removed')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    renderPagination(data.length);
}

/* ---- Render Grid View ---- */
function renderGrid() {
    const container = document.getElementById('gridView');
    if (!container) return;

    const data = getFiltered();
    const start = (currentPage - 1) * perPage;
    const pageData = data.slice(start, start + perPage);

    if (!pageData.length) {
        container.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-dim);grid-column:1/-1;">No volunteers found.</div>`;
        return;
    }

    container.innerHTML = pageData.map(v => `
        <div class="vol-grid-card">
            <div class="vol-grid-top">
                <div class="vol-grid-avatar" style="background:${v.color}">${v.initials}</div>
                <div class="vol-grid-info">
                    <div class="vol-grid-name">${v.name}</div>
                    <div class="vol-grid-email">${v.email}</div>
                </div>
                <span class="vol-status ${STATUS_CLASSES[v.status] || ''}">${v.status.charAt(0).toUpperCase() + v.status.slice(1)}</span>
            </div>
            <div class="vol-grid-meta">
                <div class="vol-grid-meta-item">
                    <span class="vol-grid-meta-label">Event</span>
                    <span class="vol-grid-meta-val">${v.event}</span>
                </div>
                <div class="vol-grid-meta-item">
                    <span class="vol-grid-meta-label">Role</span>
                    <span class="vol-grid-meta-val"><span class="vol-role-badge ${ROLE_CLASSES[v.role] || 'role-general'}">${v.role}</span></span>
                </div>
                <div class="vol-grid-meta-item">
                    <span class="vol-grid-meta-label">Hours</span>
                    <span class="vol-grid-meta-val">${v.hours}h</span>
                </div>
            </div>
        </div>
    `).join('');

    renderPagination(data.length);
}

/* ---- Pagination ---- */
function renderPagination(total) {
    const info = document.getElementById('paginationInfo');
    const pgNumbers = document.getElementById('pgNumbers');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const totalPages = Math.ceil(total / perPage);

    if (info) {
        const start = (currentPage - 1) * perPage + 1;
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
    render();
}

/* ---- Render ---- */
function render() {
    if (currentView === 'table') {
        renderTable();
    } else {
        renderGrid();
    }
}

/* ---- Toast ---- */
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

/* ---- Filter Tabs ---- */
function initFilters() {
    const tabs = document.getElementById('filterTabs');
    if (!tabs) return;
    tabs.querySelectorAll('.filter-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            tabs.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            currentPage = 1;
            render();
        });
    });
}

/* ---- View Toggle ---- */
function initViewToggle() {
    const tableBtn = document.getElementById('tableViewBtn');
    const gridBtn = document.getElementById('gridViewBtn');
    const tableView = document.getElementById('tableView');
    const gridView = document.getElementById('gridView');

    if (tableBtn) tableBtn.addEventListener('click', () => {
        currentView = 'table';
        tableBtn.classList.add('active');
        gridBtn?.classList.remove('active');
        tableView?.classList.remove('hidden');
        gridView?.classList.add('hidden');
        render();
    });

    if (gridBtn) gridBtn.addEventListener('click', () => {
        currentView = 'grid';
        gridBtn.classList.add('active');
        tableBtn?.classList.remove('active');
        gridView?.classList.remove('hidden');
        tableView?.classList.add('hidden');
        render();
    });
}

/* ---- Search ---- */
function initSearch() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    let timer;
    input.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            currentPage = 1;
            render();
        }, 250);
    });
}

/* ---- Pagination buttons ---- */
function initPagination() {
    const prev = document.getElementById('prevBtn');
    const next = document.getElementById('nextBtn');
    if (prev) prev.addEventListener('click', () => { if (currentPage > 1) goToPage(currentPage - 1); });
    if (next) next.addEventListener('click', () => {
        const total = getFiltered().length;
        const totalPages = Math.ceil(total / perPage);
        if (currentPage < totalPages) goToPage(currentPage + 1);
    });
}

/* ---- Select All ---- */
function initSelectAll() {
    const selectAll = document.getElementById('selectAll');
    if (!selectAll) return;
    selectAll.addEventListener('change', () => {
        document.querySelectorAll('#volTableBody input[type="checkbox"]').forEach(cb => {
            cb.checked = selectAll.checked;
        });
    });
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
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.2 + 0.3,
            a: Math.random(),
            da: (Math.random() - 0.5) * 0.005,
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.a += s.da;
            if (s.a > 1 || s.a < 0.2) s.da *= -1;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${s.a * 0.4})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw();
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initStarfield();
    animateCounters();
    initFilters();
    initViewToggle();
    initSearch();
    initPagination();
    initSelectAll();
    render();
});
