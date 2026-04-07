const fs = require('fs');
const path = require('path');

const newTreeStr = `
smart-event-management-system/
│
├── frontend/
│   ├── pages/
│   │   ├── landing/
│   │   │   ├── index.html
│   │   │   ├── landing.css
│   │   │   └── landing.js
│   │   │
│   │   ├── auth/
│   │   │   ├── signin.html
│   │   │   ├── signup.html
│   │   │   ├── auth.css
│   │   │   └── auth.js
│   │   │
│   │   ├── home/
│   │   │   ├── home.html
│   │   │   ├── home.css
│   │   │   └── home.js
│   │   │
│   │   ├── add-event/
│   │   │   ├── add-event.html
│   │   │   ├── add-event.css
│   │   │   └── add-event.js
│   │   │
│   │   ├── join-event/
│   │   │   ├── join-event.html
│   │   │   ├── join-event.css
│   │   │   └── join-event.js
│   │   │
│   │   ├── profile/
│   │   │   ├── profile.html
│   │   │   ├── profile.css
│   │   │   └── profile.js
│   │   │
│   │   ├── settings/
│   │   │   ├── settings.html
│   │   │   ├── settings.css
│   │   │   └── settings.js
│   │   │
│   │   ├── organizer/
│   │   │   ├── overview/
│   │   │   │   ├── organizer-overview.html
│   │   │   │   ├── organizer-overview.css
│   │   │   │   └── organizer-overview.js
│   │   │   ├── my-events/
│   │   │   │   ├── my-events.html
│   │   │   │   ├── my-events.css
│   │   │   │   └── my-events.js
│   │   │   ├── registrations/
│   │   │   │   ├── registrations.html
│   │   │   │   ├── registrations.css
│   │   │   │   └── registrations.js
│   │   │   ├── volunteers/
│   │   │   │   ├── volunteers.html
│   │   │   │   ├── volunteers.css
│   │   │   │   └── volunteers.js
│   │   │   ├── attendance/
│   │   │   │   ├── attendance.html
│   │   │   │   ├── attendance.css
│   │   │   │   └── attendance.js
│   │   │   ├── feedback/
│   │   │   │   ├── organizer-feedback.html
│   │   │   │   ├── organizer-feedback.css
│   │   │   │   └── organizer-feedback.js
│   │   │   └── messages/
│   │   │       ├── organizer-messages.html
│   │   │       ├── organizer-messages.css
│   │   │       └── organizer-messages.js
│   │   │
│   │   ├── participant/
│   │   │   ├── overview/
│   │   │   │   ├── participant-overview.html
│   │   │   │   ├── participant-overview.css
│   │   │   │   └── participant-overview.js
│   │   │   ├── my-events/
│   │   │   │   ├── participant-my-events.html
│   │   │   │   ├── participant-my-events.css
│   │   │   │   └── participant-my-events.js
│   │   │   ├── certificates/
│   │   │   │   ├── certificates.html
│   │   │   │   ├── certificates.css
│   │   │   │   └── certificates.js
│   │   │   └── feedback/
│   │   │       ├── participant-feedback.html
│   │   │       ├── participant-feedback.css
│   │   │       └── participant-feedback.js
│   │   │
│   │   └── volunteer/
│   │       ├── overview/
│   │       │   ├── volunteer-overview.html
│   │       │   ├── volunteer-overview.css
│   │       │   └── volunteer-overview.js
│   │       ├── my-tasks/
│   │       │   ├── my-tasks.html
│   │       │   ├── my-tasks.css
│   │       │   └── my-tasks.js
│   │       ├── my-events/
│   │       │   ├── volunteer-my-events.html
│   │       │   ├── volunteer-my-events.css
│   │       │   └── volunteer-my-events.js
│   │       └── messages/
│   │           ├── volunteer-messages.html
│   │           ├── volunteer-messages.css
│   │           └── volunteer-messages.js
│   │
│   ├── components/
│   │   ├── navbar/
│   │   │   ├── navbar.html
│   │   │   ├── navbar.css
│   │   │   └── navbar.js
│   │   │
│   │   ├── sidebar/
│   │   │   ├── sidebar.html
│   │   │   ├── sidebar.css
│   │   │   └── sidebar.js
│   │   │
│   │   ├── plus-menu/
│   │   │   ├── plus-menu.html
│   │   │   ├── plus-menu.css
│   │   │   └── plus-menu.js
│   │   │
│   │   ├── modal/
│   │   │   ├── modal.html
│   │   │   ├── modal.css
│   │   │   └── modal.js
│   │   │
│   │   ├── cards/
│   │   │   ├── event-card.html
│   │   │   ├── event-card.css
│   │   │   └── event-card.js
│   │   │
│   │   └── dashboard-widgets/
│   │       ├── stat-card.html
│   │       ├── stat-card.css
│   │       ├── activity-list.html
│   │       └── quick-actions.html
│   │
│   ├── shared/
│   │   ├── css/
│   │   │   ├── reset.css
│   │   │   ├── variables.css
│   │   │   ├── global.css
│   │   │   ├── utilities.css
│   │   │   └── forms.css
│   │   │
│   │   └── js/
│   │       ├── api.js
│   │       ├── config.js
│   │       ├── helpers.js
│   │       ├── auth-guard.js
│   │       ├── access-guard.js
│   │       ├── socket.js
│   │       └── ui.js
│   │
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo.png
│   │   │   ├── hero-banner.png
│   │   │   ├── empty-state.png
│   │   │   └── icons/
│   │   ├── fonts/
│   │   └── favicon/
│   │
│   │
│   └── README.md
│
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   ├── .gitignore
│   ├── server.js
│   │
│   └── src/
│       ├── app.js
│       │
│       ├── config/
│       │   ├── db.js
│       │   ├── firebaseAdmin.js
│       │   ├── constants.js
│       │   └── socket.js
│       │
│       ├── models/
│       │   ├── User.js
│       │   ├── Event.js
│       │   ├── Registration.js
│       │   ├── Volunteer.js
│       │   ├── Attendance.js
│       │   ├── Feedback.js
│       │   ├── Message.js
│       │   ├── Certificate.js
│       │   └── Notification.js
│       │
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── userController.js
│       │   ├── eventController.js
│       │   ├── registrationController.js
│       │   ├── volunteerController.js
│       │   ├── attendanceController.js
│       │   ├── feedbackController.js
│       │   ├── messageController.js
│       │   ├── certificateController.js
│       │   ├── dashboardController.js
│       │   └── codeController.js
│       │
│       ├── routes/
│       │   ├── index.js
│       │   ├── authRoutes.js
│       │   ├── userRoutes.js
│       │   ├── eventRoutes.js
│       │   ├── registrationRoutes.js
│       │   ├── volunteerRoutes.js
│       │   ├── attendanceRoutes.js
│       │   ├── feedbackRoutes.js
│       │   ├── messageRoutes.js
│       │   ├── certificateRoutes.js
│       │   ├── dashboardRoutes.js
│       │   └── codeRoutes.js
│       │
│       ├── middleware/
│       │   ├── authMiddleware.js
│       │   ├── accessMiddleware.js
│       │   ├── validateMiddleware.js
│       │   ├── errorMiddleware.js
│       │   └── notFoundMiddleware.js
│       │
│       ├── validators/
│       │   ├── authValidator.js
│       │   ├── eventValidator.js
│       │   ├── registrationValidator.js
│       │   ├── volunteerValidator.js
│       │   ├── attendanceValidator.js
│       │   ├── feedbackValidator.js
│       │   ├── messageValidator.js
│       │   └── userValidator.js
│       │
│       ├── services/
│       │   ├── authService.js
│       │   ├── eventService.js
│       │   ├── registrationService.js
│       │   ├── volunteerService.js
│       │   ├── attendanceService.js
│       │   ├── feedbackService.js
│       │   ├── messageService.js
│       │   ├── certificateService.js
│       │   ├── dashboardService.js
│       │   └── codeService.js
│       │
│       ├── utils/
│       │   ├── generateCode.js
│       │   ├── response.js
│       │   ├── asyncHandler.js
│       │   ├── logger.js
│       │   └── dateHelpers.js
│       │
│       └── sockets/
│           ├── dashboardSocket.js
│           └── messageSocket.js
│
├── docs/
│   ├── project-report.md
│   ├── api-documentation.md
│   ├── database-schema.md
│   └── frontend-flow.md
│
├── README.md
└── .gitignore
`;

const lines = newTreeStr.split('\n');
let currentPath = [];
const structure = [];

// Parse tree
const indentRegex = /^[│\s]*[├└]──\s(.*)/;
const folderRegex = /^[│\s]*([a-zA-Z0-9_.-]+)\/$/;

let rootDir = 'smart-event-management-system';
let parsingFiles = [];

// I will just use a simpler regex parser
let indents = [-1];
let pathStack = ['.'];

for (let line of lines) {
    if (!line.trim()) continue;
    if (line.includes('smart-event-management-system/')) {
        continue;
    }
    
    // Calculate indentation by counting the visual prefix
    const rawPrefix = line.split(/[├└]──|/)[0] || '';
    let indentLevel = line.indexOf('──');
    if (indentLevel !== -1) {
        let name = line.substring(indentLevel + 2).trim();
        let depth = indentLevel / 4; 
        
        while (pathStack.length > depth + 1) {
            pathStack.pop();
        }
        
        const fullPath = path.join(...pathStack, name.endsWith('/') ? name.slice(0, -1) : name);
        parsingFiles.push({ path: fullPath, isDir: name.endsWith('/') });
        
        if (name.endsWith('/')) {
            pathStack.push(name.slice(0, -1));
        }
    } else if (line.trim() && !line.includes('│   │')) {
        // Simple case for top level like ├── backend/
    }
}

// Ensure unique paths
const uniquePaths = [];
const seen = new Set();
for (const item of parsingFiles) {
    if (!seen.has(item.path)) {
        seen.add(item.path);
        uniquePaths.push(item);
    }
}

// Create files and dirs
for (const item of uniquePaths) {
    if (item.isDir) {
        if (!fs.existsSync(item.path)) {
            fs.mkdirSync(item.path, { recursive: true });
        }
    } else {
        const dir = path.dirname(item.path);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        if (!fs.existsSync(item.path)) {
            fs.writeFileSync(item.path, '');
        }
    }
}

// Move mapping
const mapping = {
    'frontend/component/navbar/navbar.css': 'frontend/components/navbar/navbar.css',
    'frontend/component/navbar/navbar.js': 'frontend/components/navbar/navbar.js',
    'frontend/component/sidebar/sidebar.css': 'frontend/components/sidebar/sidebar.css',
    'frontend/component/sidebar/sidebar.js': 'frontend/components/sidebar/sidebar.js',
    'frontend/pages/add-event/add-event.css': 'frontend/pages/add-event/add-event.css',
    'frontend/pages/add-event/add-event.html': 'frontend/pages/add-event/add-event.html',
    'frontend/pages/add-event/add-event.js': 'frontend/pages/add-event/add-event.js',
    'frontend/pages/attendance/attendance.css': 'frontend/pages/organizer/attendance/attendance.css',
    'frontend/pages/attendance/attendance.html': 'frontend/pages/organizer/attendance/attendance.html',
    'frontend/pages/attendance/attendance.js': 'frontend/pages/organizer/attendance/attendance.js',
    'frontend/pages/auth/auth.css': 'frontend/pages/auth/auth.css',
    'frontend/pages/auth/auth.js': 'frontend/pages/auth/auth.js',
    'frontend/pages/auth/signin.html': 'frontend/pages/auth/signin.html',
    'frontend/pages/auth/signup.html': 'frontend/pages/auth/signup.html',
    'frontend/pages/feedback/feedback.css': 'frontend/pages/organizer/feedback/organizer-feedback.css',
    'frontend/pages/feedback/feedback.html': 'frontend/pages/organizer/feedback/organizer-feedback.html',
    'frontend/pages/feedback/feedback.js': 'frontend/pages/organizer/feedback/organizer-feedback.js',
    'frontend/pages/home/home.css': 'frontend/pages/home/home.css',
    'frontend/pages/home/home.html': 'frontend/pages/home/home.html',
    'frontend/pages/home/home.js': 'frontend/pages/home/home.js',
    'frontend/pages/join-event/join-event.css': 'frontend/pages/join-event/join-event.css',
    'frontend/pages/join-event/join-event.html': 'frontend/pages/join-event/join-event.html',
    'frontend/pages/join-event/join-event.js': 'frontend/pages/join-event/join-event.js',
    'frontend/pages/join-participant/join-participant.css': 'frontend/pages/participant/my-events/participant-my-events.css',
    'frontend/pages/join-participant/join-participant.html': 'frontend/pages/participant/my-events/participant-my-events.html',
    'frontend/pages/join-participant/join-participant.js': 'frontend/pages/participant/my-events/participant-my-events.js',
    'frontend/pages/landing/index.html': 'frontend/pages/landing/index.html',
    'frontend/pages/landing/landing.css': 'frontend/pages/landing/landing.css',
    'frontend/pages/landing/landing.js': 'frontend/pages/landing/landing.js',
    'frontend/pages/organizer-dashboard/organizer-dashboard.css': 'frontend/pages/organizer/overview/organizer-overview.css',
    'frontend/pages/organizer-dashboard/organizer-dashboard.html': 'frontend/pages/organizer/overview/organizer-overview.html',
    'frontend/pages/organizer-dashboard/organizer-dashboard.js': 'frontend/pages/organizer/overview/organizer-overview.js',
    'frontend/pages/participant-dashboard/participant-dashboard.css': 'frontend/pages/participant/overview/participant-overview.css',
    'frontend/pages/participant-dashboard/participant-dashboard.html': 'frontend/pages/participant/overview/participant-overview.html',
    'frontend/pages/participant-dashboard/participant-dashboard.js': 'frontend/pages/participant/overview/participant-overview.js',
    'frontend/pages/registration/registration.css': 'frontend/pages/organizer/registrations/registrations.css',
    'frontend/pages/registration/registration.html': 'frontend/pages/organizer/registrations/registrations.html',
    'frontend/pages/registration/registration.js': 'frontend/pages/organizer/registrations/registrations.js',
    'frontend/pages/volunteer-dashboard/volunteer-dashboard.css': 'frontend/pages/volunteer/overview/volunteer-overview.css',
    'frontend/pages/volunteer-dashboard/volunteer-dashboard.html': 'frontend/pages/volunteer/overview/volunteer-overview.html',
    'frontend/pages/volunteer-dashboard/volunteer-dashboard.js': 'frontend/pages/volunteer/overview/volunteer-overview.js',
    'frontend/pages/volunteers/volunteers.css': 'frontend/pages/organizer/volunteers/volunteers.css',
    'frontend/pages/volunteers/volunteers.html': 'frontend/pages/organizer/volunteers/volunteers.html',
    'frontend/pages/volunteers/volunteers.js': 'frontend/pages/organizer/volunteers/volunteers.js'
};

for (const [oldPath, newPath] of Object.entries(mapping)) {
    const fullOldPath = path.join(__dirname, oldPath);
    const fullNewPath = path.join(__dirname, newPath);
    if (fullOldPath !== fullNewPath && fs.existsSync(fullOldPath)) {
        if (!fs.existsSync(path.dirname(fullNewPath))) {
            fs.mkdirSync(path.dirname(fullNewPath), { recursive: true });
        }
        if (fs.existsSync(fullNewPath)) {
            // Overwrite empty files created above
            fs.copyFileSync(fullOldPath, fullNewPath);
            fs.unlinkSync(fullOldPath);
        } else {
            console.log("Renaming", fullOldPath, "to", fullNewPath);
            fs.renameSync(fullOldPath, fullNewPath);
        }
    }
}

// Clean up empty directories from the old structure
const dirsToClean = [
    'frontend/component/navbar',
    'frontend/component/sidebar',
    'frontend/component',
    'frontend/pages/attendance',
    'frontend/pages/feedback',
    'frontend/pages/join-participant',
    'frontend/pages/organizer-dashboard',
    'frontend/pages/participant-dashboard',
    'frontend/pages/registration',
    'frontend/pages/volunteer-dashboard',
    'frontend/pages/volunteers'
];

for (const dir of dirsToClean) {
    const fullDir = path.join(__dirname, dir);
    if (fs.existsSync(fullDir)) {
        try {
            fs.rmdirSync(fullDir, { recursive: true });
            console.log("Removed old dir:", dir);
        } catch(e) {}
    }
}
console.log('Migration completed successfully.');
