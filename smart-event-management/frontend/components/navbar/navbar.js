/* ============================================
   PLANORA — Shared Navbar/Topbar Component
   Usage: Include navbar.css + navbar.js on any page
   Then call: PlanoraNavbar.init({ onSearch: fn })
============================================ */

'use strict';

const PlanoraNavbar = (() => {

    function buildTopbarHTML(options = {}) {
        const { searchPlaceholder = 'Search events, people…', notifCount = 3, userInitials = 'AK' } = options;

        return `
        <header class="topbar" id="topbar">
            <div class="topbar-left">
                <button class="menu-toggle" id="menuToggle" aria-label="Open sidebar">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </button>
                <div class="topbar-search">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" stroke-width="1.3"/><path d="M10 10l3 3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                    <input type="text" id="topbarSearchInput" placeholder="${searchPlaceholder}" autocomplete="off" />
                </div>
            </div>
            <div class="topbar-right">
                <button class="topbar-btn" id="notifBtn" aria-label="Notifications">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2a6 6 0 016 6v3l1.5 2.5H1.5L3 11V8a6 6 0 016-6z" stroke="currentColor" stroke-width="1.3"/><path d="M7 14.5a2 2 0 004 0" stroke="currentColor" stroke-width="1.3"/></svg>
                    ${notifCount > 0 ? `<span class="topbar-badge">${notifCount}</span>` : ''}
                </button>
                <div class="topbar-avatar" id="topbarAvatar">${userInitials}</div>
            </div>
        </header>

        <!-- Notification Panel -->
        <div class="notif-panel" id="notifPanel">
            <div class="notif-header">
                <h3>Notifications</h3>
                <button class="notif-clear" id="notifClear">Mark all read</button>
            </div>
            <div class="notif-list" id="notifList"></div>
        </div>
        <div class="notif-overlay" id="notifOverlay"></div>`;
    }

    function init(options = {}) {
        const {
            container = null,
            searchPlaceholder = 'Search events, people…',
            notifCount = 3,
            userInitials = 'AK',
            notifications = [],
            onSearch = null,
        } = options;

        // If container specified, inject HTML
        if (container) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = buildTopbarHTML({ searchPlaceholder, notifCount, userInitials });
            while (wrapper.firstChild) {
                container.insertBefore(wrapper.firstChild, container.firstChild);
            }
        }

        // Wire up notifications
        const notifBtn = document.getElementById('notifBtn');
        const notifPanel = document.getElementById('notifPanel');
        const notifOverlay = document.getElementById('notifOverlay');
        const notifClear = document.getElementById('notifClear');
        const notifList = document.getElementById('notifList');

        if (notifList && notifications.length) {
            notifList.innerHTML = notifications.map(n => `
                <div class="notif-item${n.unread ? ' unread' : ''}">
                    <div class="notif-dot" style="background:${n.color || '#7c3aed'}"></div>
                    <div class="notif-body">
                        <div class="notif-text">${n.text}</div>
                        <div class="notif-time">${n.time}</div>
                    </div>
                </div>
            `).join('');
        }

        function openNotif() {
            if (notifPanel) notifPanel.classList.add('open');
            if (notifOverlay) notifOverlay.classList.add('visible');
        }
        function closeNotif() {
            if (notifPanel) notifPanel.classList.remove('open');
            if (notifOverlay) notifOverlay.classList.remove('visible');
        }

        if (notifBtn) {
            notifBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notifPanel && notifPanel.classList.contains('open') ? closeNotif() : openNotif();
            });
        }
        if (notifOverlay) notifOverlay.addEventListener('click', closeNotif);
        if (notifClear) {
            notifClear.addEventListener('click', () => {
                document.querySelectorAll('.notif-item.unread').forEach(el => el.classList.remove('unread'));
                const badge = document.querySelector('.topbar-badge');
                if (badge) badge.style.display = 'none';
            });
        }

        // Wire up search
        const searchInput = document.getElementById('topbarSearchInput');
        if (searchInput && onSearch) {
            let debounceTimer;
            searchInput.addEventListener('input', () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    onSearch(searchInput.value.trim());
                }, 250);
            });
        }
    }

    return { init };
})();
