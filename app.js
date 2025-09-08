// Global State Management
let currentUser = null;
let currentPage = 'landing';
let alumniData = [];
let recruitersData = [];
let shortlistedCandidates = new Set();
let filteredAlumni = [];

// Demo data initialization with IIM Ahmedabad alumni data
const initializeData = () => {
    // Initialize alumni data from provided JSON , read the JSON file and assign it to alumniData it is in the same folder as this file. modify the code below to read the file
    fetch('AGMP_BL15_structured.json') 
        .then(response => response.json())
        .then(data => {
            alumniData = data;
            console.log('Alumni data initialized:', alumniData);
        })
        .catch(error => {
            console.error('Error loading alumni data:', error);
        });

    // Initialize demo recruiters with professional organizations
    recruitersData = [
        {
            id: 1,
            name: "Rajesh Kumar",
            email: "recruiter@company.com",
            password: "recruiter123",
            company: "McKinsey & Company",
            designation: "Talent Acquisition Specialist",
            status: "active"
        },
        {
            id: 2,
            name: "Priya Mehta",
            email: "p.mehta@bcg.com",
            password: "priya123",
            company: "Boston Consulting Group",
            designation: "HR Manager",
            status: "active"
        },
        {
            id: 3,
            name: "Amit Sharma",
            email: "a.sharma@deloitte.com",
            password: "amit123",
            company: "Deloitte Consulting",
            designation: "Recruitment Coordinator",
            status: "pending"
        },
        {
            id: 4,
            name: "Neha Gupta",
            email: "neha@tcs.com",
            password: "neha123",
            company: "Tata Consultancy Services",
            designation: "HR Manager",
            status: "active"
        },
        {
            id: 5,
            name: "Rohit Agarwal",
            email: "r.agarwal@infosys.com",
            password: "rohit123",
            company: "Infosys Limited",
            designation: "Recruitment Lead",
            status: "inactive"
        }
    ];

    // Initialize filtered alumni
    filteredAlumni = [...alumniData];
};

// Authentication Functions - Make them globally available
function showLogin(type) {
    console.log('showLogin called with type:', type); // Debug log
    const modal = document.getElementById('loginModal');
    const title = document.getElementById('loginTitle');
    const demoCredentials = document.getElementById('demoCredentials');
    
    if (!modal || !title || !demoCredentials) {
        console.error('Modal elements not found');
        return;
    }
    
    if (type === 'admin') {
        title.textContent = 'Admin Login - IIM Ahmedabad';
        demoCredentials.innerHTML = '<strong>Admin Credentials:</strong> admin@iima.ac.in / admin123';
    } else {
        title.textContent = 'Recruiter Login - IIM Ahmedabad';
        demoCredentials.innerHTML = '<strong>Demo Credentials:</strong> recruiter@company.com / recruiter123';
    }
    
    modal.classList.remove('hidden');
    const emailInput = document.getElementById('loginEmail');
    if (emailInput) {
        setTimeout(() => emailInput.focus(), 100);
    }
}

// Make showLogin globally available
window.showLogin = showLogin;

function handleLogin(e) {
    e.preventDefault();
    console.log('handleLogin called'); // Debug log
    
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    
    if (!emailInput || !passwordInput) {
        console.error('Login form elements not found');
        return;
    }
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    console.log('Login attempt:', email); // Debug log
    
    // Admin login
    if (email === 'admin@iima.ac.in' && password === 'admin123') {
        currentUser = { type: 'admin', email: email };
        showPage('adminDashboard');
        initializeAdminDashboard();
    } 
    // Recruiter login
    else {
        const recruiter = recruitersData.find(r => r.email === email && r.password === password);
        if (recruiter && recruiter.status === 'active') {
            currentUser = { type: 'recruiter', email: email, data: recruiter };
            showPage('recruiterDashboard');
            initializeRecruiterDashboard();
        } else if (recruiter && recruiter.status !== 'active') {
            alert('Your account is pending approval or has been deactivated. Please contact the administrator.');
            return;
        } else {
            alert('Invalid credentials. Please check your email and password.');
            return;
        }
    }
    
    closeModal();
    document.getElementById('loginForm').reset();
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        shortlistedCandidates.clear();
        showPage('landingPage');
        // Reset any active states
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.admin-section').forEach(section => section.classList.remove('active'));
        document.querySelectorAll('.recruiter-section').forEach(section => section.classList.remove('active'));
    }
}

// Make logout globally available
window.logout = logout;

// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
    }
}

// Modal Management
function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => modal.classList.add('hidden'));
}

// Make closeModal globally available
window.closeModal = closeModal;

// Admin Dashboard Functions
function showAdminSection(sectionId) {
    // Update navigation
    document.querySelectorAll('.admin-nav .nav-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show section
    document.querySelectorAll('.admin-section').forEach(section => section.classList.remove('active'));
    document.getElementById(`admin${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}Section`).classList.add('active');
    
    // Load section data
    switch(sectionId) {
        case 'dashboard':
            loadDashboardStats();
            setTimeout(loadCharts, 100);
            break;
        case 'profiles':
            loadProfilesTable();
            break;
        case 'recruiters':
            loadRecruitersTable();
            break;
    }
}

// Make showAdminSection globally available
window.showAdminSection = showAdminSection;

function initializeAdminDashboard() {
    // Set first nav button as active
    const firstNavBtn = document.querySelector('.admin-nav .nav-btn');
    if (firstNavBtn) {
        firstNavBtn.classList.add('active');
    }
    
    // Show dashboard section
    document.querySelectorAll('.admin-section').forEach(section => section.classList.remove('active'));
    document.getElementById('adminDashboardSection').classList.add('active');
    
    loadDashboardStats();
    setTimeout(loadCharts, 200); // Delay to ensure DOM is ready
}

function loadDashboardStats() {
    const totalAlumniEl = document.getElementById('totalAlumni');
    const totalRecruitersEl = document.getElementById('totalRecruiters');
    const totalFunctionsEl = document.getElementById('totalFunctions');
    const totalIndustriesEl = document.getElementById('totalIndustries');
    
    if (totalAlumniEl) totalAlumniEl.textContent = alumniData.length;
    if (totalRecruitersEl) totalRecruitersEl.textContent = recruitersData.filter(r => r.status === 'active').length;
    
    const functionalAreas = [...new Set(alumniData.map(a => a.functional_area))];
    const industries = [...new Set(alumniData.map(a => a.industry))];
    
    if (totalFunctionsEl) totalFunctionsEl.textContent = functionalAreas.length;
    if (totalIndustriesEl) totalIndustriesEl.textContent = industries.length;
}

function loadCharts() {
    loadFunctionalChart();
    loadExperienceChart();
}

function loadFunctionalChart() {
    const ctx = document.getElementById('functionalChart');
    if (!ctx) return;
    
    // Clear any existing chart
    if (Chart.getChart(ctx)) {
        Chart.getChart(ctx).destroy();
    }
    
    // Calculate functional area distribution
    const functionalCounts = {};
    alumniData.forEach(alumni => {
        functionalCounts[alumni.functional_area] = (functionalCounts[alumni.functional_area] || 0) + 1;
    });
    
    // IIM Ahmedabad color scheme
    const colors = ['#1a365d', '#2c5282', '#3182ce', '#4299e1', '#63b3ed', '#90cdf4', '#bee3f8', '#e6fffa', '#f0fff4'];
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(functionalCounts),
            datasets: [{
                data: Object.values(functionalCounts),
                backgroundColor: colors.slice(0, Object.keys(functionalCounts).length),
                borderWidth: 2,
                borderColor: '#ffffff',
                hoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 11,
                            family: 'FKGroteskNeue, Inter, sans-serif'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#1a365d',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    cornerRadius: 8
                }
            }
        }
    });
}

function loadExperienceChart() {
    const ctx = document.getElementById('experienceChart');
    if (!ctx) return;
    
    // Clear any existing chart
    if (Chart.getChart(ctx)) {
        Chart.getChart(ctx).destroy();
    }
    
    // Calculate experience distribution
    const expCounts = {
        'Junior (0-5 years)': 0,
        'Mid-level (5-10 years)': 0,
        'Senior (10+ years)': 0
    };
    
    alumniData.forEach(alumni => {
        if (alumni.experience_years <= 5) {
            expCounts['Junior (0-5 years)']++;
        } else if (alumni.experience_years <= 10) {
            expCounts['Mid-level (5-10 years)']++;
        } else {
            expCounts['Senior (10+ years)']++;
        }
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(expCounts),
            datasets: [{
                label: 'Number of Alumni',
                data: Object.values(expCounts),
                backgroundColor: ['#1a365d', '#2c5282', '#3182ce'],
                borderWidth: 0,
                borderRadius: 6,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        color: '#4a5568',
                        font: {
                            family: 'FKGroteskNeue, Inter, sans-serif'
                        }
                    },
                    grid: {
                        color: '#e2e8f0'
                    }
                },
                x: {
                    ticks: {
                        color: '#4a5568',
                        font: {
                            family: 'FKGroteskNeue, Inter, sans-serif'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1a365d',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    cornerRadius: 8
                }
            }
        }
    });
}

function loadProfilesTable() {
    const tbody = document.getElementById('profilesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (alumniData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 32px; color: #4a5568;">No alumni profiles found</td></tr>';
        return;
    }
    
    alumniData.forEach(alumni => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${alumni.name}</strong></td>
            <td>${alumni.current_role}</td>
            <td>${alumni.current_company}</td>
            <td><span class="tag">${alumni.functional_area}</span></td>
            <td>${alumni.experience_years} years</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn action-btn--edit" onclick="editProfile(${alumni.id})" title="Edit Profile">Edit</button>
                    <button class="action-btn action-btn--delete" onclick="deleteProfile(${alumni.id})" title="Delete Profile">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadRecruitersTable() {
    const tbody = document.getElementById('recruitersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (recruitersData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 32px; color: #4a5568;">No recruiters found</td></tr>';
        return;
    }
    
    recruitersData.forEach(recruiter => {
        const row = document.createElement('tr');
        const statusClass = recruiter.status === 'active' ? 'status-badge--active' : 
                           recruiter.status === 'pending' ? 'status-badge--pending' : 'status-badge--inactive';
        
        row.innerHTML = `
            <td><strong>${recruiter.name}</strong></td>
            <td>${recruiter.email}</td>
            <td>${recruiter.company}</td>
            <td>${recruiter.designation}</td>
            <td><span class="status-badge ${statusClass}">${recruiter.status.charAt(0).toUpperCase() + recruiter.status.slice(1)}</span></td>
            <td>
                <div class="action-buttons">
                    ${recruiter.status === 'pending' ? `<button class="action-btn action-btn--approve" onclick="approveRecruiter(${recruiter.id})" title="Approve Recruiter">Approve</button>` : ''}
                    <button class="action-btn action-btn--delete" onclick="deleteRecruiter(${recruiter.id})" title="Delete Recruiter">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Recruiter Dashboard Functions
function showRecruiterSection(sectionId) {
    // Update navigation
    document.querySelectorAll('.recruiter-nav .nav-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show section
    document.querySelectorAll('.recruiter-section').forEach(section => section.classList.remove('active'));
    document.getElementById(`recruiter${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}Section`).classList.add('active');
    
    // Load section data
    switch(sectionId) {
        case 'browse':
            loadAlumniGrid();
            break;
        case 'shortlisted':
            loadShortlistedGrid();
            break;
    }
}

// Make showRecruiterSection globally available
window.showRecruiterSection = showRecruiterSection;

function initializeRecruiterDashboard() {
    populateFilters();
    
    // Set first nav button as active
    const firstNavBtn = document.querySelector('.recruiter-nav .nav-btn');
    if (firstNavBtn) {
        firstNavBtn.classList.add('active');
    }
    
    // Show browse section
    document.querySelectorAll('.recruiter-section').forEach(section => section.classList.remove('active'));
    document.getElementById('recruiterBrowseSection').classList.add('active');
    
    loadAlumniGrid();
    updateShortlistCount();
    attachFilterListeners();
}

function populateFilters() {
    const functionalFilter = document.getElementById('functionalFilter');
    const industryFilter = document.getElementById('industryFilter');
    
    if (!functionalFilter || !industryFilter) return;
    
    // Populate functional areas
    const functionalAreas = [...new Set(alumniData.map(a => a.functional_area))].sort();
    functionalFilter.innerHTML = '<option value="">All Functional Areas</option>';
    functionalAreas.forEach(area => {
        const option = document.createElement('option');
        option.value = area;
        option.textContent = area;
        functionalFilter.appendChild(option);
    });
    
    // Populate industries
    const industries = [...new Set(alumniData.map(a => a.industry))].sort();
    industryFilter.innerHTML = '<option value="">All Industries</option>';
    industries.forEach(industry => {
        const option = document.createElement('option');
        option.value = industry;
        option.textContent = industry;
        industryFilter.appendChild(option);
    });
}

function attachFilterListeners() {
    const searchInput = document.getElementById('searchInput');
    const functionalFilter = document.getElementById('functionalFilter');
    const industryFilter = document.getElementById('industryFilter');
    const experienceFilter = document.getElementById('experienceFilter');
    
    const applyFilters = () => {
        filterAlumni();
        loadAlumniGrid();
    };
    
    // Debounce search input
    let searchTimeout;
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(applyFilters, 300);
        });
    }
    
    if (functionalFilter) functionalFilter.addEventListener('change', applyFilters);
    if (industryFilter) industryFilter.addEventListener('change', applyFilters);
    if (experienceFilter) experienceFilter.addEventListener('change', applyFilters);
}

function filterAlumni() {
    const searchInput = document.getElementById('searchInput');
    const functionalFilter = document.getElementById('functionalFilter');
    const industryFilter = document.getElementById('industryFilter');
    const experienceFilter = document.getElementById('experienceFilter');
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const functionalArea = functionalFilter ? functionalFilter.value : '';
    const industry = industryFilter ? industryFilter.value : '';
    const experienceLevel = experienceFilter ? experienceFilter.value : '';
    
    filteredAlumni = alumniData.filter(alumni => {
        // Search filter
        const matchesSearch = !searchTerm || 
            alumni.name.toLowerCase().includes(searchTerm) ||
            alumni.current_company.toLowerCase().includes(searchTerm) ||
            alumni.current_role.toLowerCase().includes(searchTerm) ||
            alumni.key_skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
            alumni.industry.toLowerCase().includes(searchTerm) ||
            alumni.summary.toLowerCase().includes(searchTerm);
        
        // Functional area filter
        const matchesFunctional = !functionalArea || alumni.functional_area === functionalArea;
        
        // Industry filter
        const matchesIndustry = !industry || alumni.industry === industry;
        
        // Experience filter
        let matchesExperience = true;
        if (experienceLevel) {
            if (experienceLevel === '0-5') {
                matchesExperience = alumni.experience_years <= 5;
            } else if (experienceLevel === '5-10') {
                matchesExperience = alumni.experience_years > 5 && alumni.experience_years <= 10;
            } else if (experienceLevel === '10+') {
                matchesExperience = alumni.experience_years > 10;
            }
        }
        
        return matchesSearch && matchesFunctional && matchesIndustry && matchesExperience;
    });
    
    // Update results count
    const resultsCountEl = document.getElementById('resultsCount');
    if (resultsCountEl) {
        resultsCountEl.textContent = filteredAlumni.length;
    }
}

function clearFilters() {
    const searchInput = document.getElementById('searchInput');
    const functionalFilter = document.getElementById('functionalFilter');
    const industryFilter = document.getElementById('industryFilter');
    const experienceFilter = document.getElementById('experienceFilter');
    
    if (searchInput) searchInput.value = '';
    if (functionalFilter) functionalFilter.value = '';
    if (industryFilter) industryFilter.value = '';
    if (experienceFilter) experienceFilter.value = '';
    
    filteredAlumni = [...alumniData];
    loadAlumniGrid();
    
    const resultsCountEl = document.getElementById('resultsCount');
    if (resultsCountEl) {
        resultsCountEl.textContent = filteredAlumni.length;
    }
}

// Make clearFilters globally available
window.clearFilters = clearFilters;

initializeData();
setTimeout(() => {
    clearFilters();
}, 500);
function loadAlumniGrid() {
    const grid = document.getElementById('alumniGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (filteredAlumni.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <h3>No alumni profiles found</h3>
                <p>Try adjusting your search filters or search terms to find more candidates.</p>
                <p>Click on clear filters to load all the profiles.</p>
            </div>
        `;
        return;
    }
    
    filteredAlumni.forEach(alumni => {
        const card = createAlumniCard(alumni);
        grid.appendChild(card);
    });
}

function loadShortlistedGrid() {
    const grid = document.getElementById('shortlistGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const shortlisted = alumniData.filter(alumni => shortlistedCandidates.has(alumni.id));
    
    if (shortlisted.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <h3>No shortlisted candidates</h3>
                <p>Start browsing alumni profiles and shortlist candidates you're interested in recruiting.</p>
            </div>
        `;
        return;
    }
    
    shortlisted.forEach(alumni => {
        const card = createAlumniCard(alumni, true);
        grid.appendChild(card);
    });
}

function createAlumniCard(alumni, isShortlisted = false) {
    const card = document.createElement('div');
    card.className = 'alumni-card';
    
    const isInShortlist = shortlistedCandidates.has(alumni.id);
    const maxSkillsToShow = 3;
    const displaySkills = alumni.key_skills.slice(0, maxSkillsToShow);
    const remainingSkills = alumni.key_skills.length - maxSkillsToShow;
    
    card.innerHTML = `
        <div class="alumni-card-header">
            <div class="alumni-info">
                <h3>${alumni.name}</h3>
                <p class="alumni-role">${alumni.current_role}</p>
                <p class="alumni-company">${alumni.current_company}</p>
            </div>
            <button class="shortlist-btn ${isInShortlist ? 'active' : ''}" onclick="toggleShortlist(${alumni.id})" title="${isInShortlist ? 'Remove from shortlist' : 'Add to shortlist'}">
                ${isInShortlist ? '★ Shortlisted' : '☆ Shortlist'}
            </button>
        </div>
        
        <div class="alumni-meta">
            <span>${alumni.functional_area}</span>
            <span>•</span>
            <span>${alumni.experience_years} years</span>
            <span>•</span>
            <span>${alumni.location}</span>
        </div>
        
        <div class="alumni-summary">
            ${alumni.summary}
        </div>
        
        <div class="alumni-tags">
            ${displaySkills.map(skill => `<span class="tag">${skill}</span>`).join('')}
            ${remainingSkills > 0 ? `<span class="tag">+${remainingSkills} more</span>` : ''}
        </div>
    `;
    
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('shortlist-btn') && !e.target.closest('.shortlist-btn')) {
            showProfileDetail(alumni);
        }
    });
    
    return card;
}

function toggleShortlist(alumniId) {
    if (shortlistedCandidates.has(alumniId)) {
        shortlistedCandidates.delete(alumniId);
    } else {
        shortlistedCandidates.add(alumniId);
    }
    
    updateShortlistCount();
    
    // Update button states
    document.querySelectorAll('.shortlist-btn').forEach(btn => {
        const card = btn.closest('.alumni-card');
        const alumni = alumniData.find(a => a.name === card.querySelector('h3').textContent);
        
        if (alumni && shortlistedCandidates.has(alumni.id)) {
            btn.classList.add('active');
            btn.textContent = '★ Shortlisted';
            btn.title = 'Remove from shortlist';
        } else if (alumni) {
            btn.classList.remove('active');
            btn.textContent = '☆ Shortlist';
            btn.title = 'Add to shortlist';
        }
    });
    
    // If we're in the shortlisted section, reload the grid
    if (document.getElementById('recruiterShortlistSection') && document.getElementById('recruiterShortlistSection').classList.contains('active')) {
        loadShortlistedGrid();
    }
}

// Make toggleShortlist globally available
window.toggleShortlist = toggleShortlist;

function updateShortlistCount() {
    const shortlistCountEl = document.getElementById('shortlistCount');
    if (shortlistCountEl) {
        shortlistCountEl.textContent = shortlistedCandidates.size;
    }
}

function showProfileDetail(alumni) {
    const modal = document.getElementById('profileModal');
    const title = document.getElementById('profileModalTitle');
    const details = document.getElementById('profileDetails');
    
    if (!modal || !title || !details) return;
    
    title.textContent = `${alumni.name} - IIM Ahmedabad AGMP Alumni`;
    
    const isRecruiter = currentUser && currentUser.type === 'recruiter';
    
    details.innerHTML = `
        <div class="profile-detail">
            <div class="profile-header">
                <h2>${alumni.name}</h2>
                <p class="role">${alumni.current_role}</p>
                <p class="company">${alumni.current_company}</p>
            </div>
            
            ${isRecruiter ? `
            <div class="profile-section">
                <h4>Contact Information</h4>
                <div class="contact-info">
                    <p><strong>Email:</strong> <a href="mailto:${alumni.email}">${alumni.email}</a></p>
                    <p><strong>Phone:</strong> ${alumni.phone}</p>
                    <p><strong>Location:</strong> ${alumni.location}</p>
                </div>
            </div>
            ` : ''}
            
            <div class="profile-section">
                <h4>Professional Summary</h4>
                <p>${alumni.summary}</p>
            </div>
            
            <div class="profile-section">
                <h4>Experience & Education</h4>
                <p><strong>Total Experience:</strong> ${alumni.experience_years} years</p>
                <p><strong>Functional Area:</strong> ${alumni.functional_area}</p>
                <p><strong>Industry Sector:</strong> ${alumni.industry}</p>
                <p><strong>Educational Background:</strong> ${alumni.education}</p>
            </div>
            
            <div class="profile-section">
                <h4>Core Competencies</h4>
                <ul class="skills-list">
                    ${alumni.key_skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </div>
            
            <div class="profile-section">
                <h4>Key Achievements</h4>
                <ul class="achievements-list">
                    ${alumni.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
            
            <div class="profile-section">
                <h4>Seeking Opportunities</h4>
                <ul class="skills-list">
                    ${alumni.seeking_roles.map(role => `<li>${role}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

// CRUD Operations for Admin
function showAddProfileModal() {
    const titleEl = document.getElementById('profileFormTitle');
    const formEl = document.getElementById('profileForm');
    const modalEl = document.getElementById('profileFormModal');
    
    if (titleEl) titleEl.textContent = 'Add AGMP Alumni Profile';
    if (formEl) {
        formEl.reset();
        delete formEl.dataset.editId;
    }
    if (modalEl) modalEl.classList.remove('hidden');
}

// Make showAddProfileModal globally available
window.showAddProfileModal = showAddProfileModal;

function editProfile(id) {
    const alumni = alumniData.find(a => a.id === id);
    if (!alumni) {
        alert('Alumni profile not found.');
        return;
    }
    
    const titleEl = document.getElementById('profileFormTitle');
    if (titleEl) titleEl.textContent = 'Edit AGMP Alumni Profile';
    
    // Populate form fields
    const fields = {
        'profileName': alumni.name,
        'profileEmail': alumni.email,
        'profilePhone': alumni.phone,
        'profileEducation': alumni.education,
        'profileRole': alumni.current_role,
        'profileCompany': alumni.current_company,
        'profileExperience': alumni.experience_years,
        'profileFunctional': alumni.functional_area,
        'profileIndustry': alumni.industry,
        'profileLocation': alumni.location,
        'profileSummary': alumni.summary,
        'profileSkills': alumni.key_skills ? alumni.key_skills.join(', ') : '',
        'profileAchievements': alumni.achievements ? alumni.achievements.join(', ') : ''
    };
    
    Object.keys(fields).forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            element.value = fields[fieldId] || '';
        }
    });
    
    // Store the ID for updating
    const formEl = document.getElementById('profileForm');
    if (formEl) formEl.dataset.editId = id;
    
    const modalEl = document.getElementById('profileFormModal');
    if (modalEl) modalEl.classList.remove('hidden');
}

// Make editProfile globally available
window.editProfile = editProfile;

function deleteProfile(id) {
    const alumni = alumniData.find(a => a.id === id);
    if (!alumni) {
        alert('Alumni profile not found.');
        return;
    }
    
    if (confirm(`Are you sure you want to delete ${alumni.name}'s profile? This action cannot be undone.`)) {
        alumniData = alumniData.filter(a => a.id !== id);
        filteredAlumni = filteredAlumni.filter(a => a.id !== id);
        
        loadProfilesTable();
        loadDashboardStats();
        setTimeout(loadCharts, 100);
        
        // Update recruiter dashboard if needed
        if (currentUser && currentUser.type === 'recruiter') {
            loadAlumniGrid();
            updateShortlistCount();
        }
    }
}

// Make deleteProfile globally available
window.deleteProfile = deleteProfile;

function handleProfileForm(e) {
    e.preventDefault();
    
    // Validate required fields
    const nameEl = document.getElementById('profileName');
    const emailEl = document.getElementById('profileEmail');
    const roleEl = document.getElementById('profileRole');
    const companyEl = document.getElementById('profileCompany');
    
    const name = nameEl ? nameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const role = roleEl ? roleEl.value.trim() : '';
    const company = companyEl ? companyEl.value.trim() : '';
    
    if (!name || !email || !role || !company) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const getFieldValue = (id, defaultValue = '') => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : defaultValue;
    };
    
    const formData = {
        name: name,
        email: email,
        phone: getFieldValue('profilePhone') || '+91 XXXX XXXX XX',
        education: getFieldValue('profileEducation'),
        current_role: role,
        current_company: company,
        experience_years: parseInt(getFieldValue('profileExperience')) || 0,
        functional_area: getFieldValue('profileFunctional'),
        industry: getFieldValue('profileIndustry'),
        location: getFieldValue('profileLocation') || 'India',
        summary: getFieldValue('profileSummary'),
        key_skills: getFieldValue('profileSkills').split(',').map(s => s.trim()).filter(s => s),
        achievements: getFieldValue('profileAchievements').split(',').map(s => s.trim()).filter(s => s),
        seeking_roles: []
    };
    
    const formEl = document.getElementById('profileForm');
    const editId = formEl ? formEl.dataset.editId : null;
    
    if (editId) {
        // Update existing profile
        const index = alumniData.findIndex(a => a.id === parseInt(editId));
        if (index !== -1) {
            alumniData[index] = { ...alumniData[index], ...formData };
        }
        if (formEl) delete formEl.dataset.editId;
    } else {
        // Add new profile
        const newId = alumniData.length > 0 ? Math.max(...alumniData.map(a => a.id)) + 1 : 1;
        alumniData.push({ id: newId, ...formData });
    }
    
    // Update filtered alumni
    filteredAlumni = [...alumniData];
    
    closeModal();
    loadProfilesTable();
    loadDashboardStats();
    setTimeout(loadCharts, 100);
}

function showAddRecruiterModal() {
    const formEl = document.getElementById('recruiterForm');
    const modalEl = document.getElementById('recruiterFormModal');
    
    if (formEl) formEl.reset();
    if (modalEl) modalEl.classList.remove('hidden');
}

// Make showAddRecruiterModal globally available
window.showAddRecruiterModal = showAddRecruiterModal;

function handleRecruiterForm(e) {
    e.preventDefault();
    
    const getFieldValue = (id) => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
    };
    
    const name = getFieldValue('recruiterName');
    const email = getFieldValue('recruiterEmail');
    const company = getFieldValue('recruiterCompany');
    const password = getFieldValue('recruiterPassword');
    
    if (!name || !email || !company || !password) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Check if email already exists
    if (recruitersData.some(r => r.email === email)) {
        alert('A recruiter with this email already exists.');
        return;
    }
    
    const newId = recruitersData.length > 0 ? Math.max(...recruitersData.map(r => r.id)) + 1 : 1;
    const recruiter = {
        id: newId,
        name: name,
        email: email,
        company: company,
        password: password,
        status: 'active'
    };
    
    recruitersData.push(recruiter);
    closeModal();
    loadRecruitersTable();
    loadDashboardStats();
}

function approveRecruiter(id) {
    const recruiter = recruitersData.find(r => r.id === id);
    if (recruiter) {
        recruiter.status = 'active';
        loadRecruitersTable();
        loadDashboardStats();
    }
}

// Make approveRecruiter globally available
window.approveRecruiter = approveRecruiter;

function deleteRecruiter(id) {
    const recruiter = recruitersData.find(r => r.id === id);
    if (!recruiter) {
        alert('Recruiter not found.');
        return;
    }
    
    if (confirm(`Are you sure you want to delete ${recruiter.name}'s account? This action cannot be undone.`)) {
        recruitersData = recruitersData.filter(r => r.id !== id);
        loadRecruitersTable();
        loadDashboardStats();
    }
}

// Make deleteRecruiter globally available
window.deleteRecruiter = deleteRecruiter;

// Export Functions
function exportResults() {
    if (filteredAlumni.length === 0) {
        alert('No data to export. Please adjust your search filters.');
        return;
    }
    
    const data = filteredAlumni.map(alumni => ({
        'Name': alumni.name,
        'Email': alumni.email,
        'Current Role': alumni.current_role,
        'Current Company': alumni.current_company,
        'Experience (Years)': alumni.experience_years,
        'Functional Area': alumni.functional_area,
        'Industry': alumni.industry,
        'Location': alumni.location,
        'Key Skills': alumni.key_skills.join('; '),
        'Summary': alumni.summary
    }));
    
    downloadCSV(data, 'iima_agmp_alumni_search_results.csv');
}

// Make exportResults globally available
window.exportResults = exportResults;

function exportShortlist() {
    const shortlisted = alumniData.filter(alumni => shortlistedCandidates.has(alumni.id));
    
    if (shortlisted.length === 0) {
        alert('No shortlisted candidates to export.');
        return;
    }
    
    const data = shortlisted.map(alumni => ({
        'Name': alumni.name,
        'Email': alumni.email,
        'Phone': alumni.phone,
        'Current Role': alumni.current_role,
        'Current Company': alumni.current_company,
        'Experience (Years)': alumni.experience_years,
        'Functional Area': alumni.functional_area,
        'Industry': alumni.industry,
        'Location': alumni.location,
        'Key Skills': alumni.key_skills.join('; '),
        'Key Achievements': alumni.achievements.join('; '),
        'Professional Summary': alumni.summary
    }));
    
    downloadCSV(data, 'iima_agmp_shortlisted_candidates.csv');
}

// Make exportShortlist globally available
window.exportShortlist = exportShortlist;

function downloadCSV(data, filename) {
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => {
            const value = row[header] || '';
            return `"${value.toString().replace(/"/g, '""')}"`;
        }).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded'); // Debug log
    
    initializeData();
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Profile form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileForm);
    }
    
    // Recruiter form
    const recruiterForm = document.getElementById('recruiterForm');
    if (recruiterForm) {
        recruiterForm.addEventListener('submit', handleRecruiterForm);
    }
    
    // Close modals on background click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Set initial results count
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = alumniData.length;
    }
    
    // Initialize filtered alumni
    filteredAlumni = [...alumniData];
    
    console.log('Initialization complete'); // Debug log
});