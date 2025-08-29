// Global State Management
let currentUser = null;
let currentPage = 'landing';
let alumniData = [];
let recruitersData = [];
let shortlistedCandidates = new Set();
let filteredAlumni = [];

// Demo data initialization
const initializeData = () => {
    // Initialize alumni data from provided JSON
    alumniData = [
        {
            id: 1,
            name: "Aakash Sant",
            email: "agmpbl15.aakashs@iima.ac.in",
            phone: "+91 XXXX XXXX XX",
            education: "Master of Commerce (M.Com), Bachelor of Commerce (B.Com)",
            current_role: "Head of Product and Strategy",
            current_company: "Svatantra Micro Housing Finance Corporation Limited",
            experience_years: 11,
            functional_area: "Strategy & Consulting",
            industry: "Financial Services",
            location: "India",
            summary: "Experienced business leader with over 11 years in affordable housing finance, currently heading Product and Strategy at Svatantra Micro Housing Finance Corporation Limited, driving growth, innovation, and financial inclusion.",
            key_skills: ["Business Strategy", "Product Innovation", "Strategic Planning", "Product Documentation", "Go-to-Market Strategy", "P&L Management", "Digital Communication", "Regulatory Compliance", "Stakeholder Management", "Risk Management"],
            achievements: ["Consistently delivered strong business growth by launching innovative products", "Expanded into new markets", "Enhanced operational efficiency", "Drove digital transformation", "Strengthened risk controls"],
            seeking_roles: ["Chief Strategy Officer", "VP Product Strategy", "General Manager - Strategy"]
        },
        {
            id: 2,
            name: "Abhijeet Nishane",
            email: "agmpbl15.abhijeetn@iima.ac.in",
            phone: "+91 XXXX XXXX XX",
            education: "Bachelor of Engineering in Mechanical",
            current_role: "Head Production",
            current_company: "Varroc Engineering Limited",
            experience_years: 7,
            functional_area: "Operations & Manufacturing",
            industry: "Automotive",
            location: "India",
            summary: "Experienced Operations leader with a strong track record in operational excellence, cost optimisation in EV manufacturing, currently heading production at Varroc Engineering Limited.",
            key_skills: ["Operations Management", "Business Management", "Lean Manufacturing", "Project Management", "EV Motors & Transmission", "Cost Optimization", "New Product Development", "CFT Leadership", "Risk Management"],
            achievements: ["Improved plant variable cost from 6% to 4%", "Delivered ₹70 Cr monthly revenue under budgeted labor cost", "Led VAVE/CI projects saving ₹5.2 Cr annually", "Achieved EBITDA of 9.6% against 8% target"],
            seeking_roles: ["Plant Manager", "Operations Director", "VP Operations"]
        },
        {
            id: 3,
            name: "Abhishek Kumar Jha",
            email: "agmpbl15.abhishekkumarj@iima.ac.in",
            phone: "+91 XXXX XXXX XX",
            education: "B.Tech in Electrical Engineering from NIT Bhopal",
            current_role: "Manager",
            current_company: "Engineering Firm",
            experience_years: 12,
            functional_area: "Project Management",
            industry: "Infrastructure",
            location: "India",
            summary: "Has experience of more than 12 years in project execution, which included liasoning with various Govt. agencies and executing work of 33 KV HT line",
            key_skills: ["Project Management Skills", "Financial Planning & Monitoring", "Budgeting", "Liasoning", "Government Relations"],
            achievements: ["Executed Projects worth more than $6 crores", "GRIHA 5 star rating building", "Commissioning of 33 KV HT line"],
            seeking_roles: ["Project Director", "Senior Manager - Projects", "Program Manager"]
        },
        {
            id: 4,
            name: "Abhishek Singh Dabi",
            email: "agmpbl15.abhisheks@iima.ac.in",
            phone: "+91 XXXX XXXX XX",
            education: "B.Tech - Applied Electronics & Instrumentation Engineering",
            current_role: "Operations Leader",
            current_company: "Truemeds",
            experience_years: 10,
            functional_area: "Operations & Manufacturing",
            industry: "Health-tech/E-commerce",
            location: "India",
            summary: "Operations leader with 10+ years of experience scaling startups across sectors like health-tech, agri-tech, food-tech, and logistics.",
            key_skills: ["Go-to-Market (GTM) Strategy", "Capacity Planning and Optimisation", "Operations Management", "Business Expansion", "Process Excellence", "Supply Chain Management", "Stakeholder Management"],
            achievements: ["Led ops expansion across 17+ states at Truemeds", "Reduced cost per order from ₹55 to ₹40 through automation at Zepto", "Scaled fleet from 12K to 18K in 12 months", "Built and led a 30+ member team", "Scaled GMV to ₹120 Cr/year at Bijak"],
            seeking_roles: ["COO", "VP Operations", "General Manager - Operations"]
        },
        {
            id: 5,
            name: "Ajay Dadhich",
            email: "agmpbl15.ajayd@iima.ac.in",
            phone: "+91 XXXX XXXX XX",
            education: "MBA - Marketing & Sales",
            current_role: "Associate Director",
            current_company: "Pine Labs",
            experience_years: 14,
            functional_area: "Finance",
            industry: "Fintech",
            location: "India",
            summary: "As an Associate Director at Pine Labs, brings over 14 years of expertise in Distribution, business planning, P&L management, and forecasting, with a focus on driving cost optimization and scaling revenue opportunities.",
            key_skills: ["Business Planning", "Financial Modelling", "Revenue Management", "Distribution Strategy", "Sales Planning", "Product Lifecycle Management", "Budgeting", "Regulatory Alignment", "Partnership Development"],
            achievements: ["Pivotal in growing CASA balances from 2,500 Cr to 4,000 Cr", "Launched innovative initiatives like Merchant Risk Framework", "Implemented Banking Correspondent program for UP Government"],
            seeking_roles: ["VP Business Planning", "Director - Strategy", "Chief Business Officer"]
        },
        {
            id: 6,
            name: "Ameya Kulkarni",
            email: "agmpbl15.ameyak@iima.ac.in",
            phone: "+91 XXXX XXXX XX",
            education: "PGDM – Operations Management, B.S. – Mechanical Engineering",
            current_role: "Deputy Project Manager",
            current_company: "EPCM Consulting",
            experience_years: 6,
            functional_area: "Project Management",
            industry: "EPCM/Chemical",
            location: "India",
            summary: "Project Management professional with 6+ years in EPCM, blending engineering delivery with financial and commercial control, now transitioning into business development roles.",
            key_skills: ["EPCM Delivery", "Project Scheduling", "Power BI Dashboards", "Contract/Risk Management", "Proposal Development", "Vendor & Interdisciplinary Coordination", "Project P&L", "Budgeting", "Billing & Cash Flow"],
            achievements: ["Delivered ₹100–500 Mn EPCM projects", "Employee of the Month Award 2021", "Excellence Award 2024", "Team Performance Award 2025"],
            seeking_roles: ["Senior Project Manager", "Business Development Manager", "Program Manager"]
        },
        {
            id: 7,
            name: "Chandrika Sarkar",
            email: "agmpbl15.chandrikas@iima.ac.in",
            phone: "+91 99753 08742",
            education: "BE - Information Technology",
            current_role: "Head of Human Resources",
            current_company: "Muse Wearables",
            experience_years: 18,
            functional_area: "HRM",
            industry: "Technology",
            location: "India",
            summary: "Seasoned HR and Talent Acquisition leader with over 18 years of experience across recruitment, compliance, learning, and strategic people operations.",
            key_skills: ["Talent Acquisition", "HR Compliance", "Employee Engagement", "Statutory Regulations", "L&D", "Onboarding", "Competency Mapping", "Culture Building", "Stakeholder Management", "Performance Management"],
            achievements: ["Led competency mapping to improve hiring accuracy", "Established Learning Lounges for continuous development", "Scaled startup from 25 to over 300 employees"],
            seeking_roles: ["CHRO", "VP Human Resources", "Director - Talent & Culture"]
        },
        {
            id: 8,
            name: "Hardikkumar Joshi",
            email: "agmpbl15.hardikkumarj@iima.ac.in",
            phone: "+91 XXXX XXXX XX",
            education: "PG Diploma in Business Administration Symbiosis Univ, B.E (Automobile Engineering)",
            current_role: "Associate Director of Products",
            current_company: "Perfios",
            experience_years: 15,
            functional_area: "Product Management",
            industry: "Fintech",
            location: "India",
            summary: "Associate Director of Products with 14+ years of experience in the Fintech industry. Led scalable LOS platforms, payment systems, and core banking platform enhancements.",
            key_skills: ["Strategic Product Leadership", "Product Strategy", "Monetization", "Revenue & P&L Management", "Product Lifecycle Management", "Platform and Ecosystem Building", "Data-driven Roadmap", "Customer Journey Mapping", "Financial Modelling"],
            achievements: ["Led digital loan onboarding platform for 30+ FIs", "Cut onboarding time by 50%", "Enabled ₹100 Cr+ monthly disbursals", "Drove ₹18 Cr ARR uplift"],
            seeking_roles: ["VP Product", "Chief Product Officer", "Head of Product Strategy"]
        },
        {
            id: 9,
            name: "Khushboo Sharma",
            email: "agmpbl15.khushboos@iima.ac.in",
            phone: "+91 95527 29088",
            education: "PGDM - University of Mumbai, B.E. (Electronics) - University of Pune",
            current_role: "Category Head - Smartphones",
            current_company: "Lava",
            experience_years: 10,
            functional_area: "Product Management",
            industry: "Consumer Electronics",
            location: "India",
            summary: "Seasoned product leader with strong background in digital product management and consumer experience, currently heading the Flagship smartphone category at Lava.",
            key_skills: ["Product Management", "Consumer/Market Understanding", "User Experience", "Cross-Functional Collaboration", "Supply Chain Management", "Digital Innovation"],
            achievements: ["Employee of the Month award twice at Havells", "Successfully delivered Super App crossing 1 million+ downloads", "Recognized for Rolls-Royce project cost savings"],
            seeking_roles: ["VP Product", "Chief Product Officer", "Head of Consumer Products"]
        },
        {
            id: 10,
            name: "Gayathry Premkumar",
            email: "agmpbl15.gayathryp@iima.ac.in",
            phone: "+91 99947 71894",
            education: "ICAgile - Product Management, B.Tech - 1st class Distinction",
            current_role: "Senior Consultant",
            current_company: "Big Four Consulting Firm",
            experience_years: 10,
            functional_area: "Strategy & Consulting",
            industry: "Consulting",
            location: "India",
            summary: "Strategic leader with 10+ years in consulting, digital ops, and supply chain transformation. Drives high-impact programs using data insights across industries.",
            key_skills: ["Digital Program Management", "Data-Driven Decision Making", "Supply Chain Strategy", "Product Ownership", "Business Analytics", "Stakeholder Management", "Agile Delivery"],
            achievements: ["Spearheaded $0.75M digital transformation initiative", "Enhanced supply chain visibility", "Received national recognition for consulting excellence"],
            seeking_roles: ["Partner - Strategy", "Director - Digital Transformation", "VP Strategy & Operations"]
        },
        {
            id: 11,
            name: "Dr. Nagarajan S",
            email: "agmpbl15.nagarajans@iima.ac.in",
            phone: "+91 XXXX XXXX XX",
            education: "B.Tech (Hons), M.Tech (Design) & Ph.D. (Biomechanics), IIT Madras",
            current_role: "Scientist E",
            current_company: "DEBEL, DRDO",
            experience_years: 18,
            functional_area: "Scientist/R&D",
            industry: "Defense/Research",
            location: "India",
            summary: "Senior scientist with 18 years dedicated to research and development of life support and augmentative systems, with aspiration to enhance societal impact.",
            key_skills: ["Product Design and Development", "Technology Management", "Innovation Management", "Technology Forecasting", "Strategic Thinking", "Systems Engineering", "Quality and Reliability"],
            achievements: ["Instrumental in conceptualization and design of life support systems", "Led augmentative exoskeleton systems development", "India's first augmentative exoskeleton system"],
            seeking_roles: ["Chief Technology Officer", "VP R&D", "Director - Innovation"]
        },
        {
            id: 12,
            name: "Heena Arora",
            email: "agmpbl15.heenaa@iima.ac.in",
            phone: "+91 98116 17471",
            education: "B.Sc. (Hons) Statistics - Hindu College, University of Delhi",
            current_role: "Strategic Consulting Professional",
            current_company: "Deloitte",
            experience_years: 12,
            functional_area: "Strategy & Consulting",
            industry: "Professional Services",
            location: "India",
            summary: "Strategy professional at Deloitte, advising CXOs and ExCo members on GTM, Sales and Operational excellence. Leverages AI, automation, and data to drive strategic decisions.",
            key_skills: ["Strategic Foresight", "Hypothesis-driven Problem Solving", "Business Model Innovation", "Data-driven Decision Making", "Stakeholder Management", "Digital Transformation"],
            achievements: ["Top 3% at Deloitte South Asia with President's Award 2024", "12+ Live the dot, move the dot awards", "Delivered strategic outcomes integrating digital tools"],
            seeking_roles: ["Principal - Strategy", "VP Strategy", "Chief Strategy Officer"]
        },
        {
            id: 13,
            name: "Nitesh Kumar Gupta",
            email: "agmpbl15.niteshg@iima.ac.in",
            phone: "+91 97119 87312",
            education: "Electronics & Communication Engineering-M.D.U",
            current_role: "Product Manager",
            current_company: "Amazon/Nokia/Radisys",
            experience_years: 17,
            functional_area: "Product Management",
            industry: "Telecom & Software",
            location: "India",
            summary: "Dynamic Product Leader with 17+ years comprehensive experience in Telecom & Software industries, driving global adoption of AI, EMS/NMS/OSS, and Cloud solutions.",
            key_skills: ["Cross-Functional Team Leadership", "Pre-Sales & Bid Management", "Product & GTM Strategy", "AI/ML", "Wireless (5G/4G)", "Telco Cloud", "Network Management"],
            achievements: ["Led €50–100M funnels", "Boosted NPS by 25%", "Closed multi-million-dollar deals with Tier-1 operators", "Pioneered automation solutions"],
            seeking_roles: ["VP Product", "Chief Product Officer", "Head of Product Strategy"]
        },
        {
            id: 14,
            name: "Ranjit Bhilare",
            email: "agmpbl15.ranjitb@iima.ac.in",
            phone: "+91 XXXX XXXX XX",
            education: "MBA, Mechanical Engineering",
            current_role: "Assistant General Manager",
            current_company: "Manufacturing Company",
            experience_years: 15,
            functional_area: "Operations & Manufacturing",
            industry: "Manufacturing/Automotive",
            location: "India",
            summary: "15 years experience in managing end to end Supply Chain, Project Management, Digitisation, Strategies, Data Analytics across diverse industries.",
            key_skills: ["Supply Chain Strategies", "Demand Forecasting", "Sales and Operations Planning", "Digitization - MRP, WMS, TMS", "Project Management", "Data Analysis and Modeling"],
            achievements: ["Successfully led ERP implementation (SAP+D365)", "Business process Automation in SCM", "Delivered Defence Systems & Automotive Projects", "Cost reduction through Strategic Sourcing"],
            seeking_roles: ["VP Supply Chain", "Chief Operations Officer", "General Manager - Operations"]
        },
        {
            id: 15,
            name: "Prachi Sharma",
            email: "agmpbl15.prachis@iima.ac.in",
            phone: "+91 XXXX XXXX XX",
            education: "BE Electrical & Electronics Engineering - BIT Mesra",
            current_role: "Senior Solution Consultant",
            current_company: "Seclore",
            experience_years: 6,
            functional_area: "Sales & Marketing",
            industry: "Cybersecurity/SaaS",
            location: "India",
            summary: "Expert in stakeholder engagement, cross-cultural collaboration, and driving innovative solutions. Seeking strategic roles in product-based companies.",
            key_skills: ["Product Design", "Solution Consulting", "Project & Stakeholder Management", "Data & Cybersecurity", "BI & Analytics", "Compliance (GDPR, HIPAA, CCPA)"],
            achievements: ["6 years of global experience in data security and analytics", "Led enterprise solutions and SaaS implementations", "Driving digital transformation initiatives"],
            seeking_roles: ["VP Solutions", "Chief Technology Officer", "Head of Product Solutions"]
        },
        {
            id: 16,
            name: "Tanmay Kumar Pandey",
            email: "agmpbl15.tanmayp@iima.ac.in",
            phone: "+91 88934 74813",
            education: "PMP (Training complete), B.Tech Computer Science",
            current_role: "Senior Member Technical Staff",
            current_company: "DuploCloud",
            experience_years: 9,
            functional_area: "IT/ITES/Software",
            industry: "Cloud Technology",
            location: "India",
            summary: "Engineering leader and cloud architect with 9+ years building scalable, cloud-native platforms. Strong in backend development, infrastructure automation, and product-focused problem solving.",
            key_skills: ["Cloud & Infrastructure", "AWS, Azure, Kubernetes", "DevOps & Security", "Backend Engineering", "AI & Automation", "Product & Leadership"],
            achievements: ["Delivered $1M+ infra savings at DuploCloud", "Built automation and tools", "Migrated 1000+ SaaS apps", "Published author of CS textbook"],
            seeking_roles: ["VP Engineering", "Chief Technology Officer", "Director - Cloud Architecture"]
        }
    ];

    // Initialize demo recruiters
    recruitersData = [
        {
            id: 1,
            name: "John Smith",
            email: "recruiter@company.com",
            password: "recruiter123",
            company: "Tech Innovations Corp",
            status: "active"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            email: "sarah.j@globaltech.com",
            password: "sarah123",
            company: "Global Tech Solutions",
            status: "active"
        },
        {
            id: 3,
            name: "Michael Chen",
            email: "m.chen@financeplus.com",
            password: "michael123",
            company: "Finance Plus Ltd",
            status: "pending"
        },
        {
            id: 4,
            name: "Lisa Rodriguez",
            email: "lisa@consultingpro.com",
            password: "lisa123",
            company: "Consulting Pro",
            status: "active"
        },
        {
            id: 5,
            name: "David Wilson",
            email: "d.wilson@manufacturing.com",
            password: "david123",
            company: "Advanced Manufacturing",
            status: "inactive"
        }
    ];

    // Initialize filtered alumni
    filteredAlumni = [...alumniData];
};

// Authentication Functions
window.showLogin = (type) => {
    const modal = document.getElementById('loginModal');
    const title = document.getElementById('loginTitle');
    const demoCredentials = document.getElementById('demoCredentials');
    
    if (type === 'admin') {
        title.textContent = 'Admin Login';
        demoCredentials.innerHTML = '<strong>Admin:</strong> admin@iima.ac.in / admin123';
    } else {
        title.textContent = 'Recruiter Login';
        demoCredentials.innerHTML = '<strong>Demo:</strong> recruiter@company.com / recruiter123';
    }
    
    modal.classList.remove('hidden');
    document.getElementById('loginEmail').focus();
};

const handleLogin = (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
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
        } else {
            alert('Invalid credentials or account not approved');
            return;
        }
    }
    
    closeModal();
    document.getElementById('loginForm').reset();
};

window.logout = () => {
    currentUser = null;
    showPage('landingPage');
    // Reset any active states
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.admin-section').forEach(section => section.classList.remove('active'));
    document.querySelectorAll('.recruiter-section').forEach(section => section.classList.remove('active'));
};

// Page Navigation
const showPage = (pageId) => {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    currentPage = pageId;
};

// Modal Management
window.closeModal = () => {
    document.querySelectorAll('.modal').forEach(modal => modal.classList.add('hidden'));
};

// Admin Dashboard Functions
window.showAdminSection = (sectionId) => {
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
            loadCharts();
            break;
        case 'profiles':
            loadProfilesTable();
            break;
        case 'recruiters':
            loadRecruitersTable();
            break;
    }
};

const initializeAdminDashboard = () => {
    // Set first nav button as active
    const firstNavBtn = document.querySelector('.admin-nav .nav-btn');
    if (firstNavBtn) {
        firstNavBtn.classList.add('active');
    }
    
    // Show dashboard section
    document.querySelectorAll('.admin-section').forEach(section => section.classList.remove('active'));
    document.getElementById('adminDashboardSection').classList.add('active');
    
    loadDashboardStats();
    setTimeout(loadCharts, 100); // Delay to ensure DOM is ready
};

const loadDashboardStats = () => {
    document.getElementById('totalAlumni').textContent = alumniData.length;
    document.getElementById('totalRecruiters').textContent = recruitersData.filter(r => r.status === 'active').length;
    
    const functionalAreas = [...new Set(alumniData.map(a => a.functional_area))];
    const industries = [...new Set(alumniData.map(a => a.industry))];
    
    document.getElementById('totalFunctions').textContent = functionalAreas.length;
    document.getElementById('totalIndustries').textContent = industries.length;
};

const loadCharts = () => {
    loadFunctionalChart();
    loadExperienceChart();
};

const loadFunctionalChart = () => {
    const ctx = document.getElementById('functionalChart');
    if (!ctx) return;
    
    // Calculate functional area distribution
    const functionalCounts = {};
    alumniData.forEach(alumni => {
        functionalCounts[alumni.functional_area] = (functionalCounts[alumni.functional_area] || 0) + 1;
    });
    
    const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454'];
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(functionalCounts),
            datasets: [{
                data: Object.values(functionalCounts),
                backgroundColor: colors.slice(0, Object.keys(functionalCounts).length),
                borderWidth: 2,
                borderColor: '#fff'
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
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
};

const loadExperienceChart = () => {
    const ctx = document.getElementById('experienceChart');
    if (!ctx) return;
    
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
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                borderWidth: 0,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
};

const loadProfilesTable = () => {
    const tbody = document.getElementById('profilesTableBody');
    tbody.innerHTML = '';
    
    alumniData.forEach(alumni => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${alumni.name}</td>
            <td>${alumni.current_role}</td>
            <td>${alumni.current_company}</td>
            <td>${alumni.functional_area}</td>
            <td>${alumni.experience_years} years</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn action-btn--edit" onclick="editProfile(${alumni.id})">Edit</button>
                    <button class="action-btn action-btn--delete" onclick="deleteProfile(${alumni.id})">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
};

const loadRecruitersTable = () => {
    const tbody = document.getElementById('recruitersTableBody');
    tbody.innerHTML = '';
    
    recruitersData.forEach(recruiter => {
        const row = document.createElement('tr');
        const statusClass = recruiter.status === 'active' ? 'status-badge--active' : 
                           recruiter.status === 'pending' ? 'status-badge--pending' : 'status-badge--inactive';
        
        row.innerHTML = `
            <td>${recruiter.name}</td>
            <td>${recruiter.email}</td>
            <td>${recruiter.company}</td>
            <td><span class="status-badge ${statusClass}">${recruiter.status.charAt(0).toUpperCase() + recruiter.status.slice(1)}</span></td>
            <td>
                <div class="action-buttons">
                    ${recruiter.status === 'pending' ? `<button class="action-btn action-btn--approve" onclick="approveRecruiter(${recruiter.id})">Approve</button>` : ''}
                    <button class="action-btn action-btn--delete" onclick="deleteRecruiter(${recruiter.id})">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
};

// Recruiter Dashboard Functions
window.showRecruiterSection = (sectionId) => {
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
};

const initializeRecruiterDashboard = () => {
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
};

const populateFilters = () => {
    const functionalFilter = document.getElementById('functionalFilter');
    const industryFilter = document.getElementById('industryFilter');
    
    // Populate functional areas
    const functionalAreas = [...new Set(alumniData.map(a => a.functional_area))].sort();
    functionalFilter.innerHTML = '<option value="">All Areas</option>';
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
};

const attachFilterListeners = () => {
    const searchInput = document.getElementById('searchInput');
    const functionalFilter = document.getElementById('functionalFilter');
    const industryFilter = document.getElementById('industryFilter');
    const experienceFilter = document.getElementById('experienceFilter');
    
    const applyFilters = () => {
        filterAlumni();
        loadAlumniGrid();
    };
    
    searchInput.addEventListener('input', applyFilters);
    functionalFilter.addEventListener('change', applyFilters);
    industryFilter.addEventListener('change', applyFilters);
    experienceFilter.addEventListener('change', applyFilters);
};

const filterAlumni = () => {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const functionalArea = document.getElementById('functionalFilter').value;
    const industry = document.getElementById('industryFilter').value;
    const experienceLevel = document.getElementById('experienceFilter').value;
    
    filteredAlumni = alumniData.filter(alumni => {
        // Search filter
        const matchesSearch = !searchTerm || 
            alumni.name.toLowerCase().includes(searchTerm) ||
            alumni.current_company.toLowerCase().includes(searchTerm) ||
            alumni.current_role.toLowerCase().includes(searchTerm) ||
            alumni.key_skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
            alumni.industry.toLowerCase().includes(searchTerm);
        
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
    document.getElementById('resultsCount').textContent = filteredAlumni.length;
};

window.clearFilters = () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('functionalFilter').value = '';
    document.getElementById('industryFilter').value = '';
    document.getElementById('experienceFilter').value = '';
    
    filteredAlumni = [...alumniData];
    loadAlumniGrid();
    document.getElementById('resultsCount').textContent = filteredAlumni.length;
};

const loadAlumniGrid = () => {
    const grid = document.getElementById('alumniGrid');
    grid.innerHTML = '';
    
    if (filteredAlumni.length === 0) {
        grid.innerHTML = '<div class="empty-state"><h3>No alumni found</h3><p>Try adjusting your search filters</p></div>';
        return;
    }
    
    filteredAlumni.forEach(alumni => {
        const card = createAlumniCard(alumni);
        grid.appendChild(card);
    });
};

const loadShortlistedGrid = () => {
    const grid = document.getElementById('shortlistGrid');
    grid.innerHTML = '';
    
    const shortlisted = alumniData.filter(alumni => shortlistedCandidates.has(alumni.id));
    
    if (shortlisted.length === 0) {
        grid.innerHTML = '<div class="empty-state"><h3>No shortlisted candidates</h3><p>Start browsing alumni profiles and shortlist candidates you\'re interested in</p></div>';
        return;
    }
    
    shortlisted.forEach(alumni => {
        const card = createAlumniCard(alumni, true);
        grid.appendChild(card);
    });
};

const createAlumniCard = (alumni, isShortlisted = false) => {
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
            <button class="shortlist-btn ${isInShortlist ? 'active' : ''}" onclick="toggleShortlist(${alumni.id})">
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
        if (!e.target.classList.contains('shortlist-btn')) {
            showProfileDetail(alumni);
        }
    });
    
    return card;
};

window.toggleShortlist = (alumniId) => {
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
        } else if (alumni) {
            btn.classList.remove('active');
            btn.textContent = '☆ Shortlist';
        }
    });
    
    // If we're in the shortlisted section, reload the grid
    if (document.getElementById('recruiterShortlistSection').classList.contains('active')) {
        loadShortlistedGrid();
    }
};

const updateShortlistCount = () => {
    document.getElementById('shortlistCount').textContent = shortlistedCandidates.size;
};

const showProfileDetail = (alumni) => {
    const modal = document.getElementById('profileModal');
    const title = document.getElementById('profileModalTitle');
    const details = document.getElementById('profileDetails');
    
    title.textContent = `${alumni.name} - Profile Details`;
    
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
                <p><strong>Experience:</strong> ${alumni.experience_years} years</p>
                <p><strong>Functional Area:</strong> ${alumni.functional_area}</p>
                <p><strong>Industry:</strong> ${alumni.industry}</p>
                <p><strong>Education:</strong> ${alumni.education}</p>
            </div>
            
            <div class="profile-section">
                <h4>Key Skills</h4>
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
                <h4>Seeking Roles</h4>
                <ul class="skills-list">
                    ${alumni.seeking_roles.map(role => `<li>${role}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
};

// CRUD Operations for Admin
window.showAddProfileModal = () => {
    document.getElementById('profileFormTitle').textContent = 'Add Alumni Profile';
    document.getElementById('profileForm').reset();
    document.getElementById('profileFormModal').classList.remove('hidden');
};

window.editProfile = (id) => {
    const alumni = alumniData.find(a => a.id === id);
    if (!alumni) return;
    
    document.getElementById('profileFormTitle').textContent = 'Edit Alumni Profile';
    
    // Populate form fields
    document.getElementById('profileName').value = alumni.name;
    document.getElementById('profileEmail').value = alumni.email;
    document.getElementById('profilePhone').value = alumni.phone;
    document.getElementById('profileEducation').value = alumni.education;
    document.getElementById('profileRole').value = alumni.current_role;
    document.getElementById('profileCompany').value = alumni.current_company;
    document.getElementById('profileExperience').value = alumni.experience_years;
    document.getElementById('profileFunctional').value = alumni.functional_area;
    document.getElementById('profileIndustry').value = alumni.industry;
    document.getElementById('profileLocation').value = alumni.location;
    document.getElementById('profileSummary').value = alumni.summary;
    document.getElementById('profileSkills').value = alumni.key_skills.join(', ');
    document.getElementById('profileAchievements').value = alumni.achievements.join(', ');
    
    // Store the ID for updating
    document.getElementById('profileForm').dataset.editId = id;
    
    document.getElementById('profileFormModal').classList.remove('hidden');
};

window.deleteProfile = (id) => {
    if (confirm('Are you sure you want to delete this profile?')) {
        alumniData = alumniData.filter(a => a.id !== id);
        loadProfilesTable();
        loadDashboardStats();
        loadCharts();
    }
};

const handleProfileForm = (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('profileName').value,
        email: document.getElementById('profileEmail').value,
        phone: document.getElementById('profilePhone').value,
        education: document.getElementById('profileEducation').value,
        current_role: document.getElementById('profileRole').value,
        current_company: document.getElementById('profileCompany').value,
        experience_years: parseInt(document.getElementById('profileExperience').value) || 0,
        functional_area: document.getElementById('profileFunctional').value,
        industry: document.getElementById('profileIndustry').value,
        location: document.getElementById('profileLocation').value,
        summary: document.getElementById('profileSummary').value,
        key_skills: document.getElementById('profileSkills').value.split(',').map(s => s.trim()).filter(s => s),
        achievements: document.getElementById('profileAchievements').value.split(',').map(s => s.trim()).filter(s => s),
        seeking_roles: []
    };
    
    const editId = document.getElementById('profileForm').dataset.editId;
    
    if (editId) {
        // Update existing profile
        const index = alumniData.findIndex(a => a.id === parseInt(editId));
        if (index !== -1) {
            alumniData[index] = { ...alumniData[index], ...formData };
        }
        delete document.getElementById('profileForm').dataset.editId;
    } else {
        // Add new profile
        const newId = Math.max(...alumniData.map(a => a.id)) + 1;
        alumniData.push({ id: newId, ...formData });
    }
    
    closeModal();
    loadProfilesTable();
    loadDashboardStats();
    loadCharts();
};

window.showAddRecruiterModal = () => {
    document.getElementById('recruiterForm').reset();
    document.getElementById('recruiterFormModal').classList.remove('hidden');
};

const handleRecruiterForm = (e) => {
    e.preventDefault();
    
    const newId = Math.max(...recruitersData.map(r => r.id)) + 1;
    const recruiter = {
        id: newId,
        name: document.getElementById('recruiterName').value,
        email: document.getElementById('recruiterEmail').value,
        company: document.getElementById('recruiterCompany').value,
        password: document.getElementById('recruiterPassword').value,
        status: 'active'
    };
    
    recruitersData.push(recruiter);
    closeModal();
    loadRecruitersTable();
    loadDashboardStats();
};

window.approveRecruiter = (id) => {
    const recruiter = recruitersData.find(r => r.id === id);
    if (recruiter) {
        recruiter.status = 'active';
        loadRecruitersTable();
        loadDashboardStats();
    }
};

window.deleteRecruiter = (id) => {
    if (confirm('Are you sure you want to delete this recruiter?')) {
        recruitersData = recruitersData.filter(r => r.id !== id);
        loadRecruitersTable();
        loadDashboardStats();
    }
};

// Export Functions
window.exportResults = () => {
    const data = filteredAlumni.map(alumni => ({
        Name: alumni.name,
        Email: alumni.email,
        'Current Role': alumni.current_role,
        'Current Company': alumni.current_company,
        'Experience (Years)': alumni.experience_years,
        'Functional Area': alumni.functional_area,
        Industry: alumni.industry,
        Location: alumni.location,
        'Key Skills': alumni.key_skills.join('; ')
    }));
    
    downloadCSV(data, 'alumni_search_results.csv');
};

window.exportShortlist = () => {
    const shortlisted = alumniData.filter(alumni => shortlistedCandidates.has(alumni.id));
    const data = shortlisted.map(alumni => ({
        Name: alumni.name,
        Email: alumni.email,
        Phone: alumni.phone,
        'Current Role': alumni.current_role,
        'Current Company': alumni.current_company,
        'Experience (Years)': alumni.experience_years,
        'Functional Area': alumni.functional_area,
        Industry: alumni.industry,
        Location: alumni.location,
        'Key Skills': alumni.key_skills.join('; '),
        'Key Achievements': alumni.achievements.join('; ')
    }));
    
    downloadCSV(data, 'shortlisted_candidates.csv');
};

const downloadCSV = (data, filename) => {
    if (data.length === 0) {
        alert('No data to export');
        return;
    }
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Profile form
    document.getElementById('profileForm').addEventListener('submit', handleProfileForm);
    
    // Recruiter form
    document.getElementById('recruiterForm').addEventListener('submit', handleRecruiterForm);
    
    // Close modals on click outside - fixed to prevent closing when clicking inside modal content
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
    if (document.getElementById('resultsCount')) {
        document.getElementById('resultsCount').textContent = alumniData.length;
    }
});