/* ============================================
   PLANORA — Shared Sidebar Component
   Usage: Include sidebar.css + sidebar.js on any page
   Then call: PlanoraSidebar.init({ activePage: 'home' })
============================================ */

'use strict';

const PlanoraSidebar = (() => {

    // ---- Configuration ----
    const NAV_ITEMS = [
        { section: 'Main', items: [
            { id: 'home',       label: 'Home',          href: '../home/home.html',
              icon: '<svg class="nav-icon" viewBox="0 0 20 20" fill="none"><path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M7 18V12h6v6" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>' },
            { id: 'add-event',  label: 'Add Event',     href: '../add-event/add-event.html',
              icon: '<svg class="nav-icon" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M3 8h14M7 2v4M13 2v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M10 11v4M8 13h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>' },
            { id: 'join-event', label: 'Join Event',    href: '../join-event/join-event.html',
              icon: '<svg class="nav-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.4"/><path d="M10 7v6M7 10h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>' },
        ]},
        { section: 'Manage', items: [
            { id: 'registration', label: 'Registrations', href: '../registration/registration.html',
              icon: '<svg class="nav-icon" viewBox="0 0 20 20" fill="none"><path d="M4 6h12M4 10h8M4 14h10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>' },
            { id: 'volunteers',   label: 'Volunteers',    href: '../volunteers/volunteers.html',
              icon: '<svg class="nav-icon" viewBox="0 0 20 20" fill="none"><circle cx="8" cy="6" r="3" stroke="currentColor" stroke-width="1.4"/><path d="M2 17c0-3.314 2.686-6 6-6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M13 12l2 2 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
            { id: 'attendance',   label: 'Attendance',    href: '../attendance/attendance.html',
              icon: '<svg class="nav-icon" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M7 10l2 2 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
            { id: 'feedback',     label: 'Feedback',      href: '../feedback/feedback.html',
              icon: '<svg class="nav-icon" viewBox="0 0 20 20" fill="none"><path d="M4 4h12a1 1 0 011 1v8a1 1 0 01-1 1H6l-3 3V5a1 1 0 011-1z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>' },
        ]},
        { section: 'Dashboards', items: [
            { id: 'organizer-dashboard',   label: 'Organizer',   href: '../organizer-dashboard/organizer-dashboard.html',
              icon: '<svg class="nav-icon" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" stroke-width="1.4"/></svg>' },
            { id: 'participant-dashboard', label: 'Participant', href: '../participant-dashboard/participant-dashboard.html',
              icon: '<svg class="nav-icon" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="4" stroke="currentColor" stroke-width="1.4"/><path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>' },
            { id: 'volunteer-dashboard',   label: 'Volunteer',   href: '../volunteer-dashboard/volunteer-dashboard.html',
              icon: '<svg class="nav-icon" viewBox="0 0 20 20" fill="none"><path d="M10 3c0 0-6 3.5-6 8a6 6 0 0012 0c0-4.5-6-8-6-8z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>' },
        ]},
    ];

    // ---- Build HTML ----
    function buildSidebarHTML(activePage) {
        let navHTML = '';
        NAV_ITEMS.forEach(section => {
            navHTML += `<div class="nav-section-label">${section.section}</div>`;
            section.items.forEach(item => {
                const isActive = item.id === activePage ? ' active' : '';
                navHTML += `
                    <a href="${item.href}" class="nav-item${isActive}" data-page="${item.id}">
                        ${item.icon}
                        <span>${item.label}</span>
                    </a>`;
            });
        });

        return `
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-top">
                <a href="../home/home.html" class="sidebar-logo">
                    <span class="logo-hex">⬡</span>
                    <span class="logo-name">Planora</span>
                </a>
                <button class="sidebar-close" id="sidebarClose" aria-label="Close sidebar">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4l10 10M14 4L4 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </button>
            </div>

            <nav class="sidebar-nav">
                ${navHTML}
            </nav>

            <div class="sidebar-footer">
                <div class="sidebar-evenza">
                    <div class="sidebar-evenza-icon">✦</div>
                    <div>
                        <span class="sidebar-evenza-name">Evenza AI</span>
                        <span class="sidebar-evenza-status">Active · Ready</span>
                    </div>
                    <div class="sidebar-evenza-ping"></div>
                </div>
                <div class="sidebar-user" id="sidebarUser">
                    <div class="user-avatar" id="sidebarUserAvatar">AK</div>
                    <div class="user-info">
                        <span class="user-name" id="sidebarUserName">User</span>
                        <span class="user-role" id="sidebarUserRole">Organizer</span>
                    </div>
                    <button class="user-logout" id="sidebarLogoutBtn" title="Sign out">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                </div>
            </div>
        </aside>
        <div class="sidebar-overlay" id="sidebarOverlay"></div>`;
    }

    // ---- Inject & Init ----
    function init(options = {}) {
        const { activePage = '', container = document.body, user = null } = options;

        // Inject at start of container
        const wrapper = document.createElement('div');
        wrapper.innerHTML = buildSidebarHTML(activePage);

        // Insert sidebar and overlay before the first child
        while (wrapper.firstChild) {
            container.insertBefore(wrapper.firstChild, container.firstChild);
        }

        // Set user info if provided
        if (user) {
            const setEl = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
            setEl('sidebarUserAvatar', user.initials || 'U');
            setEl('sidebarUserName', user.name || 'User');
            setEl('sidebarUserRole', user.role || 'Member');
        }

        // Wire up mobile toggle
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        const closeBtn = document.getElementById('sidebarClose');
        const menuToggle = document.getElementById('menuToggle');

        function openSidebar() {
            if (sidebar) sidebar.classList.add('open');
            if (overlay) overlay.classList.add('visible');
            document.body.style.overflow = 'hidden';
        }
        function closeSidebar() {
            if (sidebar) sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('visible');
            document.body.style.overflow = '';
        }

        if (menuToggle) menuToggle.addEventListener('click', openSidebar);
        if (overlay) overlay.addEventListener('click', closeSidebar);
        if (closeBtn) closeBtn.addEventListener('click', closeSidebar);

        // Logout
        const logoutBtn = document.getElementById('sidebarLogoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                window.location.href = '../auth/signin.html';
            });
        }
    }

    return { init };
})();
