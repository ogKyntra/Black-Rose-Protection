/* === BLACK ROSE DEFAULT DATA START === */
const DEFAULT_DATA = {
    "services": [
        {
            "id": "s1",
            "name": "Personal Protection",
            "desc": "Close-quarters executive protection and escorting.",
            "price": "Varies by risk level",
            "icon": "[ P-01 ]",
            "visible": true
        },
        {
            "id": "s2",
            "name": "Event Security",
            "desc": "Crowd control, access management, and threat mitigation.",
            "price": "Varies by scale",
            "icon": "[ E-02 ]",
            "visible": true
        },
        {
            "id": "s3",
            "name": "Business Security",
            "desc": "Static guarding and active monitoring for establishments.",
            "price": "Varies by footprint",
            "icon": "[ B-03 ]",
            "visible": true
        },
        {
            "id": "s4",
            "name": "Property Patrols",
            "desc": "Randomized armed patrols for private estates and compounds.",
            "price": "Starting at $75,000",
            "icon": "[ P-04 ]",
            "visible": true
        },
        {
            "id": "s5",
            "name": "High-Risk Transport",
            "desc": "Secure movement of VIPs or sensitive cargo across hostile zones.",
            "price": "Custom Quote",
            "icon": "[ T-05 ]",
            "visible": true
        },
        {
            "id": "s6",
            "name": "Private Escort Service",
            "desc": "Discreet companionship combined with lethal proficiency.",
            "price": "Starting at $100,000",
            "icon": "[ E-06 ]",
            "visible": true
        },
        {
            "id": "s7",
            "name": "Emergency Response",
            "desc": "Rapid deployment to active hostile situations.",
            "price": "$150,000+ Callout",
            "icon": "[ R-07 ]",
            "visible": true
        },
        {
            "id": "s8",
            "name": "Venue Security",
            "desc": "Doorstaff and interior oversight for clubs and lounges.",
            "price": "Contract based",
            "icon": "[ V-08 ]",
            "visible": true
        }
    ],
    "addons": [
        {
            "id": "a2",
            "name": "Second Vehicle / Convoy Support",
            "desc": "",
            "price": 100000,
            "priceType": "flat",
            "visible": true
        },
        {
            "id": "a3",
            "name": "Emergency Same-Day Callout",
            "desc": "",
            "price": 150000,
            "priceType": "flat",
            "visible": true
        },
        {
            "id": "a4",
            "name": "Armed / High-Risk Detail",
            "desc": "",
            "price": 150000,
            "priceType": "flat",
            "visible": true
        },
        {
            "id": "a5",
            "name": "Out-of-City Travel",
            "desc": "",
            "price": 75000,
            "priceType": "flat",
            "visible": true
        },
        {
            "id": "a6",
            "name": "Extended Equipment Loadout",
            "desc": "",
            "price": 50000,
            "priceType": "flat",
            "visible": true
        },
        {
            "id": "a7",
            "name": "Priority Contract Handling",
            "desc": "",
            "price": 100000,
            "priceType": "flat",
            "visible": true
        }
    ],
    "roster": [
        {
            "id": "r1",
            "name": "Roxy Rose",
            "rank": "Founder / Director",
            "status": "On Duty",
            "specialty": "Operations / High-Risk Details",
            "bio": "The architect of Black Rose. Lethal, precise, and demands absolute loyalty.",
            "image": "https://cdn.discordapp.com/attachments/1448494461012152424/1525130974848090264/Screenshot_2026-07-10_142545.png?ex=6a524467&is=6a50f2e7&hm=7dd025bd760266cd73541ad331d8cecb4ae2e1eab6e1e382ddef0ab90726575c&",
            "bookable": true,
            "visible": true
        },
        {
            "id": "r2",
            "name": "Jimmy Egan",
            "rank": "Chief Operating Officer",
            "status": "Available",
            "specialty": "Close Protection / Tactical Driving",
            "bio": "Veteran operator with a zero-failure rate on executive protection details.",
            "image": "",
            "bookable": true,
            "visible": true
        }
    ],
    "contractQuestions": [],
    "applicationQuestions": [],
    "costSettings": {
        "employeeHourlyRate": 75000,
        "baseOperationFee": 50000,
        "minimumHours": 1,
        "durationStep": 0.5,
        "riskFees": {
            "Low": 0,
            "Medium": 50000,
            "High": 150000,
            "Unknown": 75000
        }
    }
};
/* === BLACK ROSE DEFAULT DATA END === */

document.getElementById('year').textContent = new Date().getFullYear();

// ==========================================
// CORE DATA MANAGEMENT
// ==========================================
function getSiteData() {
    let data = JSON.parse(localStorage.getItem('brp_siteData'));
    if (!data || !data.costSettings) { data = DEFAULT_DATA; localStorage.setItem('brp_siteData', JSON.stringify(data)); }
    return data;
}
function saveSiteData(data) { localStorage.setItem('brp_siteData', JSON.stringify(data)); }
function getSubmissions(type) { return JSON.parse(localStorage.getItem(`brp_${type}`) || '[]'); }
function saveSubmissions(type, data) { localStorage.setItem(`brp_${type}`, JSON.stringify(data)); }
function generateId() { return Date.now().toString(36) + Math.random().toString(36).substr(2, 5); }
function getTimestamp() { return new Date().toLocaleString('en-GB'); }
function formatMoney(amount) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount); }

// ==========================================
// PUBLIC SITE RENDERING & CALCULATOR
// ==========================================
let currentPriceBreakdown = {};

function renderPublicSite() {
    const data = getSiteData();

    // Services
    document.getElementById('services-grid').innerHTML = data.services.filter(s => s.visible).map(s => `
        <div class="cyber-card">
            <span class="cyber-subtext">${s.icon || '// SYS.OP'}</span>
            <h3>${s.name} <span class="card-status status-available">ACTIVE</span></h3>
            <p>${s.desc}</p>
        </div>`).join('');

    // Roster
    document.getElementById('roster-grid').innerHTML = data.roster.filter(r => r.visible).map(r => {
        let statusClass = r.status.toLowerCase().replace(' ', '');
        let imgHtml = r.image ? `<img src="${r.image}" class="roster-img" alt="${r.name}">` : `<div class="roster-img">NO IMAGE DATA</div>`;
        return `
        <div class="cyber-card">
            ${imgHtml}
            <h3>${r.name}</h3>
            <span class="card-status status-${statusClass}">${r.status.toUpperCase()}</span>
            <p style="color: white; font-size: 0.85rem; margin-bottom: 5px;">RANK: ${r.rank.toUpperCase()}</p>
            <p style="font-size: 0.85rem; margin-bottom: 5px;">SPEC: ${r.specialty}</p>
            <hr style="border-color: #333; margin: 10px 0;">
            <p style="font-size: 0.85rem;">${r.bio}</p>
        </div>`;
    }).join('');

    // Populate Estimator Form Elements
    // 1. Employee limit
    const bookableRosterCount = data.roster.filter(r => r.bookable && r.visible && r.name !== 'Open Position').length;
    const staffSelect = document.getElementById('reqStaff');
    staffSelect.innerHTML = '';
    if (bookableRosterCount === 0) {
        staffSelect.innerHTML = `<option value="" disabled selected>No employees currently available for contract</option>`;
    } else {
        staffSelect.innerHTML = `<option value="" disabled selected>Number of Employees Needed</option>`;
        for(let i = 1; i <= bookableRosterCount; i++) {
            staffSelect.innerHTML += `<option value="${i}">${i} Employee${i>1?'s':''}</option>`;
        }
    }

    // 2. Add-ons
    document.getElementById('reqAddonsContainer').innerHTML = data.addons.filter(a => a.visible).map(a => `
        <label class="addon-checkbox">
            <input type="checkbox" name="contractAddons" value="${a.id}" data-price="${a.price}" data-type="${a.priceType}">
            ${a.name} (${formatMoney(a.price)})
        </label>
    `).join('');

    // Set constraints on duration
    const durInput = document.getElementById('reqDuration');
    durInput.min = data.costSettings.minimumHours;
    durInput.step = data.costSettings.durationStep;

    calculateTotal(); // Initial calc
}

function calculateTotal() {
    const data = getSiteData();
    const cs = data.costSettings;

    let base = parseFloat(cs.baseOperationFee) || 0;
    
    let staffStr = document.getElementById('reqStaff').value;
    let empCount = staffStr ? parseInt(staffStr) : 0;
    
    let durStr = document.getElementById('reqDuration').value;
    let duration = durStr ? parseFloat(durStr) : 0;
    
    let empCost = empCount * duration * (parseFloat(cs.employeeHourlyRate) || 0);
    
    let riskSelection = document.getElementById('reqRisk').value;
    let riskFee = riskSelection ? (parseFloat(cs.riskFees[riskSelection]) || 0) : 0;

    let addonsTotal = 0;
    let selectedAddonNames = [];
    document.querySelectorAll('input[name="contractAddons"]:checked').forEach(cb => {
        let p = parseFloat(cb.dataset.price) || 0;
        let type = cb.dataset.type || 'flat';
        
        let calculatedPrice = 0;
        if (type === 'flat') calculatedPrice = p;
        else if (type === 'per_hour') calculatedPrice = p * duration;
        else if (type === 'per_employee') calculatedPrice = p * empCount;
        else if (type === 'per_employee_per_hour') calculatedPrice = p * empCount * duration;
        
        addonsTotal += calculatedPrice;
        selectedAddonNames.push(cb.nextSibling.textContent.split('(')[0].trim());
    });

    let total = base + empCost + riskFee + addonsTotal;

    // Update DOM
    document.getElementById('calcBase').textContent = formatMoney(base);
    document.getElementById('calcEmpCost').textContent = formatMoney(empCost);
    document.getElementById('calcRisk').textContent = formatMoney(riskFee);
    document.getElementById('calcAddons').textContent = formatMoney(addonsTotal);
    document.getElementById('calcTotal').textContent = formatMoney(total);

    // Save state for submission
    currentPriceBreakdown = {
        baseFee: base,
        employeeHourlyRate: parseFloat(cs.employeeHourlyRate),
        employeeCost: empCost,
        riskFee: riskFee,
        addonTotal: addonsTotal,
        estimatedTotal: total,
        selectedAddonNames: selectedAddonNames
    };
}

// Bind Calculator Events
['reqStaff', 'reqDuration', 'reqRisk'].forEach(id => {
    document.getElementById(id).addEventListener('change', calculateTotal);
    document.getElementById(id).addEventListener('input', calculateTotal);
});
document.getElementById('reqAddonsContainer').addEventListener('change', calculateTotal);


renderPublicSite();

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ==========================================
// DISCORD WEBHOOK SYSTEM
// ==========================================
async function sendToDiscord(url, embed) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embed] })
        });
        return response.ok;
    } catch(e) { return false; }
}

// ==========================================
// FORM SUBMISSIONS
// ==========================================
document.getElementById('requestForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button'); 
    btn.disabled = true; btn.textContent = "[ SUBMITTING... ]";
    
    // Ensure accurate final calculation
    calculateTotal();
    const ts = getTimestamp();
    const sId = generateId();

    const reqData = {
        id: sId, timestamp: ts, status: 'New', notes: '',
        name: document.getElementById('reqName').value, phone: document.getElementById('reqPhone').value,
        business: document.getElementById('reqBusiness').value, service: document.getElementById('reqService').value,
        date: document.getElementById('reqDate').value, time: document.getElementById('reqTime').value,
        duration: document.getElementById('reqDuration').value, location: document.getElementById('reqLocation').value,
        staff: document.getElementById('reqStaff').value, vehicle: document.getElementById('reqVehicle').value,
        risk: document.getElementById('reqRisk').value, details: document.getElementById('reqDetails').value,
        contactPref: document.getElementById('reqContactPref').value,
        pricing: currentPriceBreakdown
    };
    
    const reqs = getSubmissions('requests'); reqs.push(reqData); saveSubmissions('requests', reqs);
    let statusMsg = "CONTRACT SAVED LOCALLY.";

    const settings = JSON.parse(localStorage.getItem('brp_settings') || '{}');
    if (settings.enableReqHook && settings.reqUrl) {
        const embed = {
            title: "🚨 New Black Rose Contract Request",
            color: 9109504, // Dark Crimson
            fields: [
                { name: "Client Name", value: reqData.name, inline: true },
                { name: "Phone Number", value: reqData.phone, inline: true },
                { name: "Business / Org", value: reqData.business || "N/A", inline: true },
                { name: "Service Needed", value: reqData.service, inline: true },
                { name: "Date & Time Needed", value: `${reqData.date} @ ${reqData.time}`, inline: true },
                { name: "Location", value: reqData.location, inline: true },
                { name: "Duration", value: `${reqData.duration} Hours`, inline: true },
                { name: "Employees Req.", value: reqData.staff, inline: true },
                { name: "Risk Level", value: reqData.risk, inline: true },
                { name: "Vehicle Support", value: reqData.vehicle, inline: true },
                { name: "Selected Add-ons", value: reqData.pricing.selectedAddonNames.join(', ') || "None", inline: false },
                { name: "Estimated Total", value: formatMoney(reqData.pricing.estimatedTotal), inline: false },
                { name: "Price Breakdown", value: `Base: ${formatMoney(reqData.pricing.baseFee)}\nEmp: ${formatMoney(reqData.pricing.employeeCost)}\nRisk: ${formatMoney(reqData.pricing.riskFee)}\nAddons: ${formatMoney(reqData.pricing.addonTotal)}`, inline: false },
                { name: "Extra Details", value: reqData.details || "None", inline: false },
                { name: "Contact Preference", value: reqData.contactPref, inline: true },
                { name: "Submission ID", value: reqData.id, inline: true }
            ],
            footer: { text: `Black Rose Protection Contract System • Timestamp: ${ts}` }
        };
        const ok = await sendToDiscord(settings.reqUrl, embed);
        statusMsg = ok ? "Request saved and sent to Discord." : "Request saved locally, but Discord webhook failed.";
    }

    const statusEl = document.getElementById('reqStatus');
    statusEl.innerHTML = `<span class='${statusMsg.includes("Discord webhook failed")?"error-text":"success-text"}'>${statusMsg}</span>`;
    e.target.reset(); 
    calculateTotal(); // Reset calc display
    setTimeout(() => { btn.disabled = false; btn.textContent = "[ TRANSMIT CONTRACT REQUEST ]"; }, 2000);
});

document.getElementById('applyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button'); 
    btn.disabled = true; btn.textContent = "[ SUBMITTING... ]";
    
    const ts = getTimestamp();
    const sId = generateId();

    const appData = {
        id: sId, timestamp: ts, status: 'New', notes: '',
        name: document.getElementById('appName').value, phone: document.getElementById('appPhone').value,
        experience: document.getElementById('appExp').value, why: document.getElementById('appWhy').value,
        availability: document.getElementById('appAvailability').value, strengths: document.getElementById('appStrengths').value,
        weaknesses: document.getElementById('appWeaknesses').value, role: document.getElementById('appRole').value,
        highRisk: document.getElementById('appHighRisk').value
    };
    const apps = getSubmissions('apps'); apps.push(appData); saveSubmissions('apps', apps);
    let statusMsg = "APPLICATION FILED LOCALLY.";

    const settings = JSON.parse(localStorage.getItem('brp_settings') || '{}');
    if (settings.enableAppHook && settings.appUrl) {
        const embed = {
            title: "📄 New Black Rose Recruitment Application",
            color: 9109504,
            fields: [
                { name: "Applicant Name", value: appData.name, inline: true },
                { name: "Phone Number", value: appData.phone, inline: true },
                { name: "Preferred Role", value: appData.role, inline: true },
                { name: "Availability", value: appData.availability, inline: true },
                { name: "High-Risk Work OK?", value: appData.highRisk, inline: true },
                { name: "Submission ID", value: appData.id, inline: true },
                { name: "Previous Experience", value: appData.experience, inline: false },
                { name: "Why Join?", value: appData.why, inline: false },
                { name: "Strengths", value: appData.strengths, inline: true },
                { name: "Weaknesses", value: appData.weaknesses, inline: true }
            ],
            footer: { text: `Black Rose Protection Recruitment System • Timestamp: ${ts}` }
        };
        const ok = await sendToDiscord(settings.appUrl, embed);
        statusMsg = ok ? "Application saved and sent to Discord." : "Application saved locally, but Discord webhook failed.";
    }

    const statusEl = document.getElementById('appStatus');
    statusEl.innerHTML = `<span class='${statusMsg.includes("Discord webhook failed")?"error-text":"success-text"}'>${statusMsg}</span>`;
    e.target.reset(); 
    setTimeout(() => { btn.disabled = false; btn.textContent = "[ SUBMIT APPLICATION ]"; }, 2000);
});

// ==========================================
// ADMIN PANEL LOGIC
// ==========================================
const adminModal = document.getElementById('adminModal');
document.getElementById('openAdminBtn').addEventListener('click', () => adminModal.style.display = 'block');
document.querySelector('.close-btn').addEventListener('click', () => adminModal.style.display = 'none');

document.getElementById('loginBtn').addEventListener('click', () => {
    if (document.getElementById('adminPass').value === 'blackrose') {
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        refreshAdmin();
    } else { document.getElementById('loginError').textContent = "[ ACCESS DENIED ]"; }
});

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        document.getElementById(e.target.dataset.tab).classList.add('active');
    });
});

function refreshAdmin() {
    renderAdminStats();
    renderSubmissions('requests');
    renderSubmissions('apps');
    renderEditorList('roster');
    renderEditorList('services');
    renderEditorList('addons');
    
    // Load Cost Settings
    const cs = getSiteData().costSettings;
    document.getElementById('cs_hourly').value = cs.employeeHourlyRate;
    document.getElementById('cs_base').value = cs.baseOperationFee;
    document.getElementById('cs_minHrs').value = cs.minimumHours;
    document.getElementById('cs_stepHrs').value = cs.durationStep;
    document.getElementById('cs_riskLow').value = cs.riskFees.Low;
    document.getElementById('cs_riskMed').value = cs.riskFees.Medium;
    document.getElementById('cs_riskHigh').value = cs.riskFees.High;
    document.getElementById('cs_riskUnk').value = cs.riskFees.Unknown;

    // Load Webhooks
    const settings = JSON.parse(localStorage.getItem('brp_settings') || '{}');
    document.getElementById('wh_req_enable').checked = settings.enableReqHook || false;
    document.getElementById('wh_req_url').value = settings.reqUrl || '';
    document.getElementById('wh_app_enable').checked = settings.enableAppHook || false;
    document.getElementById('wh_app_url').value = settings.appUrl || '';
}

function renderAdminStats() {
    const reqs = getSubmissions('requests'); const apps = getSubmissions('apps'); const data = getSiteData();
    document.getElementById('adminStatsGrid').innerHTML = `
        <div class="cyber-card-small"><h4>Total Contracts</h4><h2>${reqs.length}</h2><p style="color:var(--crimson)">${reqs.filter(r=>r.status==='New').length} New</p></div>
        <div class="cyber-card-small"><h4>Total Apps</h4><h2>${apps.length}</h2><p style="color:var(--crimson)">${apps.filter(a=>a.status==='New').length} New</p></div>
        <div class="cyber-card-small"><h4>Roster Size</h4><h2>${data.roster.length}</h2></div>
        <div class="cyber-card-small"><h4>Active Services</h4><h2>${data.services.filter(s=>s.visible).length}</h2></div>
    `;
}

function renderSubmissions(type) {
    const subs = getSubmissions(type);
    const container = document.getElementById(type === 'requests' ? 'adminRequestsList' : 'adminAppsList');
    if (subs.length === 0) { container.innerHTML = '<p>NO DATA FOUND.</p>'; return; }

    container.innerHTML = subs.slice().reverse().map(sub => {
        let statusClass = sub.status.toLowerCase().replace(' ', '');
        let selectOptions = type === 'requests' ? ['New', 'Pending', 'Accepted', 'Declined', 'Completed'] : ['New', 'Reviewed', 'Accepted', 'Declined'];
            
        let detailsHtml = '';
        if (type === 'requests') {
            let p = sub.pricing || { estimatedTotal: 0, selectedAddonNames: [] };
            detailsHtml = `
            <div class="sub-field"><strong>Client:</strong> ${sub.name} (${sub.phone}) | <strong>Org:</strong> ${sub.business || 'N/A'}</div>
            <div class="sub-field"><strong>Needs:</strong> ${sub.service} | <strong>Date:</strong> ${sub.date} @ ${sub.time} | <strong>Dur:</strong> ${sub.duration} Hrs</div>
            <div class="sub-field"><strong>Loc:</strong> ${sub.location} | <strong>Risk:</strong> ${sub.risk} | <strong>Staff Req:</strong> ${sub.staff} | <strong>Veh:</strong> ${sub.vehicle}</div>
            <div class="sub-field"><strong>Add-ons:</strong> ${p.selectedAddonNames.join(', ') || 'None'}</div>
            <div class="sub-field"><strong>ESTIMATED TOTAL:</strong> <span style="color:var(--crimson); font-weight:bold;">${formatMoney(p.estimatedTotal)}</span></div>
            <div class="sub-field" style="font-size:0.8rem; color:var(--text-dim);">Breakdown -> Base: ${formatMoney(p.baseFee)} | Emp: ${formatMoney(p.employeeCost)} | Risk: ${formatMoney(p.riskFee)} | Addons: ${formatMoney(p.addonTotal)}</div>
            <div class="sub-field"><strong>Details:</strong> ${sub.details}</div>
            <div class="sub-field"><strong>Contact Pref:</strong> ${sub.contactPref}</div>`;
        } else {
            detailsHtml = `
            <div class="sub-field"><strong>Applicant:</strong> ${sub.name} (${sub.phone}) | <strong>Role:</strong> ${sub.role}</div>
            <div class="sub-field"><strong>Avail:</strong> ${sub.availability} | <strong>High Risk OK:</strong> ${sub.highRisk}</div>
            <div class="sub-field"><strong>Exp:</strong> ${sub.experience}</div>
            <div class="sub-field"><strong>Why Join:</strong> ${sub.why}</div>
            <div class="sub-field"><strong>Str:</strong> ${sub.strengths} | <strong>Wk:</strong> ${sub.weaknesses}</div>`;
        }

        return `
        <div class="submission-card">
            <div class="sub-meta">ID: ${sub.id} // LOGGED: ${sub.timestamp} <span class="card-status status-${statusClass}" style="float:right">${sub.status.toUpperCase()}</span></div>
            ${detailsHtml}
            <div style="margin-top: 10px; border-top: 1px solid #333; padding-top: 10px; display:flex; gap:10px; align-items:flex-start;">
                <select style="width:150px; padding:0.5rem;" onchange="updateSubStatus('${type}', '${sub.id}', this.value)">
                    ${selectOptions.map(opt => `<option value="${opt}" ${sub.status === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                </select>
                <textarea placeholder="Staff Notes..." style="height:40px; padding:0.5rem;" onblur="updateSubNote('${type}', '${sub.id}', this.value)">${sub.notes || ''}</textarea>
                <button class="btn-danger btn-small" onclick="deleteSub('${type}', '${sub.id}')">DEL</button>
            </div>
        </div>`;
    }).join('');
}

window.updateSubStatus = (type, id, val) => { let subs = getSubmissions(type); let idx = subs.findIndex(s=>s.id===id); if(idx>-1) { subs[idx].status = val; saveSubmissions(type, subs); renderAdminStats(); renderSubmissions(type); } }
window.updateSubNote = (type, id, val) => { let subs = getSubmissions(type); let idx = subs.findIndex(s=>s.id===id); if(idx>-1) { subs[idx].notes = val; saveSubmissions(type, subs); } }
window.deleteSub = (type, id) => { if(!confirm("PURGE RECORD?")) return; let subs = getSubmissions(type); subs = subs.filter(s=>s.id!==id); saveSubmissions(type, subs); renderAdminStats(); renderSubmissions(type); }
window.clearSubmissions = (type) => { if(confirm("PURGE ALL DATA IN THIS CATEGORY?")) { saveSubmissions(type, []); refreshAdmin(); } }

// --- Admin Webhooks & Settings ---
document.getElementById('saveWebhooksBtn').addEventListener('click', () => {
    localStorage.setItem('brp_settings', JSON.stringify({
        enableReqHook: document.getElementById('wh_req_enable').checked,
        reqUrl: document.getElementById('wh_req_url').value,
        enableAppHook: document.getElementById('wh_app_enable').checked,
        appUrl: document.getElementById('wh_app_url').value
    }));
    alert("WEBHOOK CONFIGURATION SAVED LOCALLY.");
});

document.getElementById('btnTestReqWh').addEventListener('click', async () => {
    const url = document.getElementById('wh_req_url').value;
    if(!url) return alert("Enter URL first.");
    const ok = await sendToDiscord(url, { title: "🔧 Webhook Test", description: "BRP Contract network connection successful.", color: 9109504 });
    alert(ok ? "SUCCESS!" : "FAILED. Check URL.");
});

document.getElementById('btnTestAppWh').addEventListener('click', async () => {
    const url = document.getElementById('wh_app_url').value;
    if(!url) return alert("Enter URL first.");
    const ok = await sendToDiscord(url, { title: "🔧 Webhook Test", description: "BRP Recruitment network connection successful.", color: 9109504 });
    alert(ok ? "SUCCESS!" : "FAILED. Check URL.");
});

document.getElementById('costSettingsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    let d = getSiteData();
    d.costSettings = {
        employeeHourlyRate: parseFloat(document.getElementById('cs_hourly').value),
        baseOperationFee: parseFloat(document.getElementById('cs_base').value),
        minimumHours: parseFloat(document.getElementById('cs_minHrs').value),
        durationStep: parseFloat(document.getElementById('cs_stepHrs').value),
        riskFees: {
            Low: parseFloat(document.getElementById('cs_riskLow').value),
            Medium: parseFloat(document.getElementById('cs_riskMed').value),
            High: parseFloat(document.getElementById('cs_riskHigh').value),
            Unknown: parseFloat(document.getElementById('cs_riskUnk').value)
        }
    };
    saveSiteData(d);
    alert("COST CALCULATOR ALGORITHMS UPDATED.");
    renderPublicSite();
});

// --- Admin Data Editors ---
let currentEditorType = ''; let currentEditingId = null;
const editorModal = document.getElementById('itemEditorModal');
if(document.querySelector('.close-editor-btn')) {
    document.querySelector('.close-editor-btn').addEventListener('click', () => editorModal.style.display = 'none');
}

function renderEditorList(type) {
    const data = getSiteData()[type];
    const container = document.getElementById(`admin${type.charAt(0).toUpperCase() + type.slice(1)}List`);
    container.innerHTML = data.map(item => `
        <div class="admin-item-card ${item.visible ? '' : 'hidden'}">
            <h4 style="color:var(--crimson)">${item.name}</h4>
            <p style="font-size:0.8rem; color:var(--text-dim);">${type === 'addons' ? formatMoney(item.price) : (item.rank || item.price || 'Record Entry')}</p>
            <div class="admin-actions">
                <button class="btn-cyber-outline btn-small" onclick="editItem('${type}', '${item.id}')">Edit</button>
                <button class="btn-cyber-secondary btn-small" onclick="toggleVisibility('${type}', '${item.id}')">${item.visible ? 'Hide' : 'Show'}</button>
                <button class="btn-danger btn-small" onclick="deleteItem('${type}', '${item.id}')">Del</button>
            </div>
        </div>`).join('');
}

window.toggleVisibility = (type, id) => { let d = getSiteData(); let item = d[type].find(i=>i.id===id); if(item){ item.visible = !item.visible; saveSiteData(d); refreshAdmin(); renderPublicSite(); } }
window.deleteItem = (type, id) => { if(!confirm("DELETE RECORD?")) return; let d = getSiteData(); d[type] = d[type].filter(i=>i.id!==id); saveSiteData(d); refreshAdmin(); renderPublicSite(); }

window.openEditor = (type, id = null) => {
    currentEditorType = type; currentEditingId = id;
    const d = getSiteData()[type]; const item = id ? d.find(i=>i.id===id) : {};
    document.getElementById('editorTitle').textContent = id ? `EDIT ${type.toUpperCase()}` : `NEW ${type.toUpperCase()}`;
    
    let fieldsHtml = '';
    if(type === 'roster') {
        fieldsHtml = `<input type="text" id="ed_name" placeholder="Name" value="${item.name||''}" required> <input type="text" id="ed_rank" placeholder="Rank" value="${item.rank||''}" required> <select id="ed_status">${['Available','On Duty','Off Duty','In Training'].map(opt => `<option value="${opt}" ${item.status===opt?'selected':''}>${opt}</option>`).join('')}</select> <input type="text" id="ed_specialty" placeholder="Specialty" value="${item.specialty||''}" required> <textarea id="ed_bio" placeholder="Short Bio" rows="3" required>${item.bio||''}</textarea> <input type="text" id="ed_image" placeholder="Image URL (Optional)" value="${item.image||''}"> <label style="color:white; margin-top:10px; display:block;"><input type="checkbox" id="ed_bookable" ${item.bookable?'checked':''}> Available for Contract Selection (Bookable)</label>`;
    } else if (type === 'services') {
        fieldsHtml = `<input type="text" id="ed_name" placeholder="Service Name" value="${item.name||''}" required> <input type="text" id="ed_icon" placeholder="Icon Tag (e.g. [ S-01 ])" value="${item.icon||''}" required> <textarea id="ed_desc" placeholder="Description" rows="2" required>${item.desc||''}</textarea>`;
    } else if (type === 'addons') {
        let pType = item.priceType || 'flat';
        fieldsHtml = `<input type="text" id="ed_name" placeholder="Add-On Name" value="${item.name||''}" required> <input type="number" id="ed_price" placeholder="Price Amount" value="${item.price||0}" required> <select id="ed_priceType"><option value="flat" ${pType==='flat'?'selected':''}>Flat Fee</option><option value="per_hour" ${pType==='per_hour'?'selected':''}>Per Hour</option><option value="per_employee" ${pType==='per_employee'?'selected':''}>Per Employee</option><option value="per_employee_per_hour" ${pType==='per_employee_per_hour'?'selected':''}>Per Employee, Per Hour</option></select>`;
    }
    document.getElementById('editorFields').innerHTML = fieldsHtml; editorModal.style.display = 'block';
};

window.editItem = (type, id) => openEditor(type, id);

if(document.getElementById('itemEditorForm')) {
    document.getElementById('itemEditorForm').addEventListener('submit', (e) => {
        e.preventDefault();
        let d = getSiteData();
        let item = currentEditingId ? d[currentEditorType].find(i=>i.id===currentEditingId) : { id: generateId(), visible: true };
        
        item.name = document.getElementById('ed_name')?.value || item.name;
        
        if(currentEditorType === 'roster') { item.rank = document.getElementById('ed_rank').value; item.status = document.getElementById('ed_status').value; item.specialty = document.getElementById('ed_specialty').value; item.bio = document.getElementById('ed_bio').value; item.image = document.getElementById('ed_image').value; item.bookable = document.getElementById('ed_bookable').checked;}
        else if(currentEditorType === 'services') { item.icon = document.getElementById('ed_icon').value; item.desc = document.getElementById('ed_desc').value;}
        else if(currentEditorType === 'addons') { item.price = parseFloat(document.getElementById('ed_price').value); item.priceType = document.getElementById('ed_priceType').value; }
    
        if(!currentEditingId) d[currentEditorType].push(item);
        saveSiteData(d); refreshAdmin(); renderPublicSite(); editorModal.style.display = 'none';
    });
}

// ==========================================
// BACKUP & EXPORT SYSTEM (The Marker System)
// ==========================================
document.getElementById('exportDataBtn').addEventListener('click', () => {
    const allData = { siteData: getSiteData(), requests: getSubmissions('requests'), apps: getSubmissions('apps') };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allData, null, 2));
    const dl = document.createElement('a'); dl.setAttribute("href", dataStr); dl.setAttribute("download", `BRP_Backup_${getTimestamp().replace(/\D/g,'')}.json`); dl.click();
});

document.getElementById('importDataBtn').addEventListener('click', () => {
    const file = document.getElementById('importDataFile').files[0];
    if(!file) return alert("Select a JSON file first.");
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if(data.siteData) saveSiteData(data.siteData);
            if(data.requests) saveSubmissions('requests', data.requests);
            if(data.apps) saveSubmissions('apps', data.apps);
            alert("SYSTEM RESTORED SUCCESSFULLY.");
            refreshAdmin(); renderPublicSite();
        } catch(err) { alert("INVALID JSON FILE."); }
    };
    reader.readAsText(file);
});

document.getElementById('resetDemoBtn').addEventListener('click', () => {
    if(confirm("FACTORY RESET PUBLIC DATA? Contracts & Apps will be kept.")) {
        saveSiteData(DEFAULT_DATA); refreshAdmin(); renderPublicSite();
    }
});

// The Magic Export System
document.getElementById('exportScriptBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('script.js');
        if (!response.ok) throw new Error('Fetch failed');
        const scriptContent = await response.text();
        patchAndDownloadScript(scriptContent);
    } catch (error) {
        alert("Could not read current script.js. Please run this from GitHub Pages or a local server, not directly from file://.\n\nUse the fallback option below.");
        console.error(error);
    }
});

document.getElementById('patchPastedScriptBtn').addEventListener('click', () => {
    const scriptContent = document.getElementById('fallbackScriptInput').value;
    if(!scriptContent.trim()) { alert("Please paste your script.js code into the text box first."); return; }
    patchAndDownloadScript(scriptContent);
});

function patchAndDownloadScript(scriptContent) {
    const currentData = getSiteData(); 
    
    // Ensure accurate object format
    const updatedDefaultData = {
        services: currentData.services || [],
        addons: currentData.addons || [],
        roster: currentData.roster || [],
        contractQuestions: currentData.contractQuestions || [],
        applicationQuestions: currentData.applicationQuestions || [],
        costSettings: currentData.costSettings || {}
    };

    const startMarker = "/* === BLACK ROSE DEFAULT DATA START === */";
    const endMarker = "/* === BLACK ROSE DEFAULT DATA END === */";
    const startIndex = scriptContent.indexOf(startMarker);
    const endIndex = scriptContent.indexOf(endMarker);

    if (startIndex === -1 || endIndex === -1) {
        alert("Export failed because the DEFAULT_DATA marker block was not found in the script.");
        return;
    }

    const newBlock = `${startMarker}\nconst DEFAULT_DATA = ${JSON.stringify(updatedDefaultData, null, 4)};\n${endMarker}`;
    const patchedScript = scriptContent.substring(0, startIndex) + newBlock + scriptContent.substring(endIndex + endMarker.length);

    const blob = new Blob([patchedScript], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = "script.js";
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    
    alert("SUCCESS! script.js has been generated. Upload this file to your GitHub repository to make changes public.");
}