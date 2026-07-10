/* === BLACK ROSE DEFAULT DATA START === */
const DEFAULT_DATA = {
    "services": [
        { "id": "s1", "name": "Personal Protection", "desc": "Close-quarters executive protection and escorting.", "price": "Varies by risk level", "icon": "[ P-01 ]", "visible": true },
        { "id": "s2", "name": "Event Security", "desc": "Crowd control, access management, and threat mitigation.", "price": "Varies by scale", "icon": "[ E-02 ]", "visible": true },
        { "id": "s3", "name": "Business Security", "desc": "Static guarding and active monitoring for establishments.", "price": "Varies by footprint", "icon": "[ B-03 ]", "visible": true },
        { "id": "s4", "name": "Property Patrols", "desc": "Randomized armed patrols for private estates and compounds.", "price": "Starting at $75,000", "icon": "[ P-04 ]", "visible": true },
        { "id": "s5", "name": "High-Risk Transport", "desc": "Secure movement of VIPs or sensitive cargo across hostile zones.", "price": "Custom Quote", "icon": "[ T-05 ]", "visible": true },
        { "id": "s6", "name": "Private Escort Service", "desc": "Discreet companionship combined with lethal proficiency.", "price": "Starting at $100,000", "icon": "[ E-06 ]", "visible": true },
        { "id": "s7", "name": "Emergency Response", "desc": "Rapid deployment to active hostile situations.", "price": "$150,000+ Callout", "icon": "[ R-07 ]", "visible": true },
        { "id": "s8", "name": "Venue Security", "desc": "Doorstaff and interior oversight for clubs and lounges.", "price": "Contract based", "icon": "[ V-08 ]", "visible": true }
    ],
    "addons": [
        { "id": "a1", "name": "Marked Security Vehicle", "desc": "", "price": 50000, "priceType": "flat", "visible": true },
        { "id": "a2", "name": "Second Vehicle / Convoy Support", "desc": "", "price": 100000, "priceType": "flat", "visible": true },
        { "id": "a3", "name": "Emergency Same-Day Callout", "desc": "", "price": 150000, "priceType": "flat", "visible": true }
    ],
    "roster": [
        { "id": "r1", "name": "Roxy Rose", "rank": "Founder / Director", "status": "On Duty", "specialty": "Operations / High-Risk Details", "bio": "The architect of Black Rose. Lethal, precise, and demands absolute loyalty.", "image": "", "bookable": true, "visible": true },
        { "id": "r2", "name": "Jimmy Egan", "rank": "Senior Protection Officer", "status": "Available", "specialty": "Close Protection / Tactical Driving", "bio": "Veteran operator with a zero-failure rate.", "image": "", "bookable": true, "visible": true },
        { "id": "r3", "name": "Open Position", "rank": "Recruit", "status": "In Training", "specialty": "TBD", "bio": "We are currently seeking capable individuals.", "image": "", "bookable": false, "visible": true }
    ],
    "contractQuestions": [],
    "applicationQuestions": [],
    "costSettings": {
        "employeeHourlyRate": 75000, "baseOperationFee": 50000, "minimumHours": 1, "durationStep": 0.5,
        "riskFees": { "Low": 0, "Medium": 50000, "High": 150000, "Unknown": 75000 }
    }
};
/* === BLACK ROSE DEFAULT DATA END === */

document.getElementById('year').textContent = new Date().getFullYear();
function generateId() { return Date.now().toString(36) + Math.random().toString(36).substr(2, 5); }
function getTimestamp() { return new Date().toLocaleString('en-GB'); }
function formatMoney(amount) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount); }

// ==========================================
// CLOUD STATE MANAGEMENT
// ==========================================
let CLOUD_STATE = { siteData: null, requests: [], apps: [] };
let ADMIN_PASSCODE = "blackrose"; // Keep this simple for RP, not enterprise security

// Inject Admin Notes Dynamically
document.addEventListener("DOMContentLoaded", () => {
    const backupTab = document.getElementById('tab-backup');
    if (backupTab) {
        const note = document.createElement('p');
        note.className = "cyber-subtext";
        note.style = "color:#00ffaa; margin-bottom:1rem; padding:1rem; border:1px solid #00ffaa; background:rgba(0,255,170,0.1);";
        note.innerHTML = "> CLOUD SYNC ACTIVE: Changes saved through Netlify are visible globally to all visitors. LocalStorage is only used as a fallback if the connection drops. Webhooks and the admin passcode are managed in netlify/functions/config.js.";
        backupTab.prepend(note);
    }
});

async function bootTerminal() {
    try {
        const res = await fetch('/api/get-site-data');
        if (res.ok) {
            const data = await res.json();
            if (data) {
                CLOUD_STATE.siteData = data;
                localStorage.setItem('brp_siteData', JSON.stringify(data)); // Cache locally
            }
        }
    } catch (e) { console.log("Network error. Falling back to local cache."); }

    if (!CLOUD_STATE.siteData) {
        CLOUD_STATE.siteData = JSON.parse(localStorage.getItem('brp_siteData')) || DEFAULT_DATA;
    }
    renderPublicSite();
}
bootTerminal();

function getSiteData() { return CLOUD_STATE.siteData; }

// Generic Save function for Site Data or Submission Arrays
async function saveAdminData(key, data) {
    try {
        const res = await fetch('/api/save-site-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, data, passcode: ADMIN_PASSCODE })
        });
        if (!res.ok) throw new Error("Unauthorized or server error.");
        
        // Cache Locally
        if(key === 'siteData') {
            CLOUD_STATE.siteData = data;
            localStorage.setItem('brp_siteData', JSON.stringify(data));
            renderPublicSite();
        } else if (key === 'requests') {
            CLOUD_STATE.requests = data;
        } else if (key === 'apps') {
            CLOUD_STATE.apps = data;
        }
    } catch (e) {
        alert("CLOUD SAVE ERROR: " + e.message);
    }
}

// ==========================================
// PUBLIC SITE RENDERING & CALCULATOR
// ==========================================
let currentPriceBreakdown = {};

function renderPublicSite() {
    const data = getSiteData();

    document.getElementById('services-grid').innerHTML = data.services.filter(s => s.visible).map(s => `
        <div class="cyber-card">
            <span class="cyber-subtext">${s.icon || '// SYS.OP'}</span>
            <h3>${s.name} <span class="card-status status-available">ACTIVE</span></h3>
            <p>${s.desc}</p>
        </div>`).join('');

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

    const bookableRosterCount = data.roster.filter(r => r.bookable && r.visible && r.name !== 'Open Position').length;
    const staffSelect = document.getElementById('reqStaff');
    staffSelect.innerHTML = '';
    if (bookableRosterCount === 0) {
        staffSelect.innerHTML = `<option value="" disabled selected>No employees currently available</option>`;
    } else {
        staffSelect.innerHTML = `<option value="" disabled selected>Number of Employees Needed</option>`;
        for(let i = 1; i <= bookableRosterCount; i++) {
            staffSelect.innerHTML += `<option value="${i}">${i} Employee${i>1?'s':''}</option>`;
        }
    }

    document.getElementById('reqAddonsContainer').innerHTML = data.addons.filter(a => a.visible).map(a => `
        <label class="addon-checkbox">
            <input type="checkbox" name="contractAddons" value="${a.id}" data-price="${a.price}" data-type="${a.priceType}">
            ${a.name} (${formatMoney(a.price)})
        </label>`).join('');

    const durInput = document.getElementById('reqDuration');
    durInput.min = data.costSettings.minimumHours;
    durInput.step = data.costSettings.durationStep;

    calculateTotal(); 
}

function calculateTotal() {
    const data = getSiteData();
    const cs = data.costSettings;
    let base = parseFloat(cs.baseOperationFee) || 0;
    let empCount = parseInt(document.getElementById('reqStaff').value) || 0;
    let duration = parseFloat(document.getElementById('reqDuration').value) || 0;
    let empCost = empCount * duration * (parseFloat(cs.employeeHourlyRate) || 0);
    let riskSelection = document.getElementById('reqRisk').value;
    let riskFee = riskSelection ? (parseFloat(cs.riskFees[riskSelection]) || 0) : 0;
    let addonsTotal = 0; let selectedAddonNames = [];

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

    document.getElementById('calcBase').textContent = formatMoney(base);
    document.getElementById('calcEmpCost').textContent = formatMoney(empCost);
    document.getElementById('calcRisk').textContent = formatMoney(riskFee);
    document.getElementById('calcAddons').textContent = formatMoney(addonsTotal);
    document.getElementById('calcTotal').textContent = formatMoney(total);

    currentPriceBreakdown = {
        baseFee: base, employeeHourlyRate: parseFloat(cs.employeeHourlyRate), employeeCost: empCost,
        riskFee: riskFee, addonTotal: addonsTotal, estimatedTotal: total, selectedAddonNames: selectedAddonNames
    };
}

['reqStaff', 'reqDuration', 'reqRisk'].forEach(id => {
    document.getElementById(id).addEventListener('change', calculateTotal);
    document.getElementById(id).addEventListener('input', calculateTotal);
});
document.getElementById('reqAddonsContainer').addEventListener('change', calculateTotal);

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ==========================================
// FORM SUBMISSIONS (NETLIFY API)
// ==========================================
document.getElementById('requestForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button'); 
    btn.disabled = true; btn.textContent = "[ TRANSMITTING TO NETLIFY... ]";
    calculateTotal();
    
    const reqData = {
        id: generateId(), timestamp: getTimestamp(), status: 'New', notes: '',
        name: document.getElementById('reqName').value, phone: document.getElementById('reqPhone').value,
        business: document.getElementById('reqBusiness').value, service: document.getElementById('reqService').value,
        date: document.getElementById('reqDate').value, time: document.getElementById('reqTime').value,
        duration: document.getElementById('reqDuration').value, location: document.getElementById('reqLocation').value,
        staff: document.getElementById('reqStaff').value, vehicle: document.getElementById('reqVehicle').value,
        risk: document.getElementById('reqRisk').value, details: document.getElementById('reqDetails').value,
        contactPref: document.getElementById('reqContactPref').value,
        pricing: currentPriceBreakdown,
        totalCost: document.getElementById('calcTotal').innerText 
    };

    const statusEl = document.getElementById('reqStatus');
    try {
        const response = await fetch('/api/save-contract', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(reqData)
        });
        const result = await response.json();
        if (response.ok) {
            statusEl.className = "form-status success-text";
            statusEl.innerHTML = `<span>> ${result.message}</span>`;
            e.target.reset(); calculateTotal();
        } else throw new Error(result.error || "Transmission failure.");
    } catch (err) {
        statusEl.className = "form-status error-text";
        statusEl.innerHTML = `<span>> ERROR: ${err.message}</span>`;
    }
    setTimeout(() => { btn.disabled = false; btn.textContent = "[ TRANSMIT CONTRACT REQUEST ]"; }, 2000);
});

document.getElementById('applyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button'); 
    btn.disabled = true; btn.textContent = "[ SUBMITTING TO NETLIFY... ]";

    const appData = {
        id: generateId(), timestamp: getTimestamp(), status: 'New', notes: '',
        name: document.getElementById('appName').value, phone: document.getElementById('appPhone').value,
        experience: document.getElementById('appExp').value, whyJoin: document.getElementById('appWhy').value,
        availability: document.getElementById('appAvailability').value, strengths: document.getElementById('appStrengths').value,
        weaknesses: document.getElementById('appWeaknesses').value, role: document.getElementById('appRole').value,
        highRisk: document.getElementById('appHighRisk').value
    };

    const statusEl = document.getElementById('appStatus');
    try {
        const response = await fetch('/api/save-application', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(appData)
        });
        const result = await response.json();
        if (response.ok) {
            statusEl.className = "form-status success-text";
            statusEl.innerHTML = `<span>> ${result.message}</span>`;
            e.target.reset();
        } else throw new Error(result.error || "Processing error.");
    } catch (err) {
        statusEl.className = "form-status error-text";
        statusEl.innerHTML = `<span>> UPLINK ERROR: ${err.message}</span>`;
    }
    setTimeout(() => { btn.disabled = false; btn.textContent = "[ SUBMIT APPLICATION ]"; }, 2000);
});

// ==========================================
// ADMIN PANEL LOGIC 
// ==========================================
const adminModal = document.getElementById('adminModal');
document.getElementById('openAdminBtn').addEventListener('click', () => adminModal.style.display = 'block');
document.querySelector('.close-btn').addEventListener('click', () => adminModal.style.display = 'none');

async function fetchSubmissions() {
    const res = await fetch('/api/get-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: ADMIN_PASSCODE })
    });
    if (!res.ok) throw new Error("Authentication failed");
    const data = await res.json();
    CLOUD_STATE.requests = data.requests || [];
    CLOUD_STATE.apps = data.apps || [];
}

document.getElementById('loginBtn').addEventListener('click', async () => {
    const pass = document.getElementById('adminPass').value;
    if (pass.length > 0) { 
        ADMIN_PASSCODE = pass;
        document.getElementById('loginBtn').textContent = "[ AUTHENTICATING... ]";
        
        try {
            await fetchSubmissions();
            document.getElementById('adminLogin').style.display = 'none';
            document.getElementById('adminDashboard').style.display = 'block';
            refreshAdmin();
        } catch(e) {
            document.getElementById('loginError').textContent = "[ INVALID CREDENTIALS ]";
            document.getElementById('loginBtn').textContent = "ACCESS TERMINAL";
        }
    } else { document.getElementById('loginError').textContent = "[ ENTER PASSCODE ]"; }
});

document.getElementById('refreshDataBtn')?.addEventListener('click', async () => {
    const btn = document.getElementById('refreshDataBtn');
    btn.textContent = "↻ ..."; btn.disabled = true;
    try {
        await fetchSubmissions();
        refreshAdmin();
    } catch(e) {
        alert("REFRESH FAILED: " + e.message);
    }
    btn.textContent = "↻ Refresh"; btn.disabled = false;
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
    renderSubmissions('requests'); renderSubmissions('apps');
    renderEditorList('roster'); renderEditorList('services'); renderEditorList('addons');
    
    const cs = getSiteData().costSettings;
    document.getElementById('cs_hourly').value = cs.employeeHourlyRate; document.getElementById('cs_base').value = cs.baseOperationFee;
    document.getElementById('cs_minHrs').value = cs.minimumHours; document.getElementById('cs_stepHrs').value = cs.durationStep;
    document.getElementById('cs_riskLow').value = cs.riskFees.Low; document.getElementById('cs_riskMed').value = cs.riskFees.Medium;
    document.getElementById('cs_riskHigh').value = cs.riskFees.High; document.getElementById('cs_riskUnk').value = cs.riskFees.Unknown;
}

function renderAdminStats() {
    const reqs = CLOUD_STATE.requests; const apps = CLOUD_STATE.apps; const data = getSiteData();
    document.getElementById('adminStatsGrid').innerHTML = `
        <div class="cyber-card-small"><h4>Total Contracts</h4><h2>${reqs.length}</h2><p style="color:var(--crimson)">${reqs.filter(r=>r.status==='New').length} New</p></div>
        <div class="cyber-card-small"><h4>Total Apps</h4><h2>${apps.length}</h2><p style="color:var(--crimson)">${apps.filter(a=>a.status==='New').length} New</p></div>
        <div class="cyber-card-small"><h4>Roster Size</h4><h2>${data.roster.length}</h2></div>
        <div class="cyber-card-small"><h4>Active Services</h4><h2>${data.services.filter(s=>s.visible).length}</h2></div>
    `;
}

function renderSubmissions(type) {
    const subs = type === 'requests' ? CLOUD_STATE.requests : CLOUD_STATE.apps;
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
            <div class="sub-field"><strong>Details:</strong> ${sub.details}</div>
            <div class="sub-field"><strong>Contact Pref:</strong> ${sub.contactPref}</div>`;
        } else {
            detailsHtml = `
            <div class="sub-field"><strong>Applicant:</strong> ${sub.name} (${sub.phone}) | <strong>Role:</strong> ${sub.role}</div>
            <div class="sub-field"><strong>Avail:</strong> ${sub.availability} | <strong>High Risk OK:</strong> ${sub.highRisk}</div>
            <div class="sub-field"><strong>Exp:</strong> ${sub.experience}</div>
            <div class="sub-field"><strong>Why Join:</strong> ${sub.whyJoin}</div>
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

window.updateSubStatus = async (type, id, val) => { let subs = type === 'requests' ? CLOUD_STATE.requests : CLOUD_STATE.apps; let idx = subs.findIndex(s=>s.id===id); if(idx>-1) { subs[idx].status = val; await saveAdminData(type, subs); renderAdminStats(); renderSubmissions(type); } }
window.updateSubNote = async (type, id, val) => { let subs = type === 'requests' ? CLOUD_STATE.requests : CLOUD_STATE.apps; let idx = subs.findIndex(s=>s.id===id); if(idx>-1) { subs[idx].notes = val; await saveAdminData(type, subs); } }
window.deleteSub = async (type, id) => { if(!confirm("PURGE RECORD?")) return; let subs = type === 'requests' ? CLOUD_STATE.requests : CLOUD_STATE.apps; subs = subs.filter(s=>s.id!==id); await saveAdminData(type, subs); renderAdminStats(); renderSubmissions(type); }
window.clearSubmissions = async (type) => { if(confirm("PURGE ALL DATA IN THIS CATEGORY?")) { await saveAdminData(type, []); refreshAdmin(); } }

document.getElementById('costSettingsForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    let d = getSiteData();
    d.costSettings = {
        employeeHourlyRate: parseFloat(document.getElementById('cs_hourly').value), baseOperationFee: parseFloat(document.getElementById('cs_base').value),
        minimumHours: parseFloat(document.getElementById('cs_minHrs').value), durationStep: parseFloat(document.getElementById('cs_stepHrs').value),
        riskFees: { Low: parseFloat(document.getElementById('cs_riskLow').value), Medium: parseFloat(document.getElementById('cs_riskMed').value), High: parseFloat(document.getElementById('cs_riskHigh').value), Unknown: parseFloat(document.getElementById('cs_riskUnk').value) }
    };
    await saveAdminData('siteData', d);
    alert("COST CALCULATOR ALGORITHMS SECURED IN CLOUD.");
});

// --- Admin Data Editors ---
let currentEditorType = ''; let currentEditingId = null;
const editorModal = document.getElementById('itemEditorModal');
if(document.querySelector('.close-editor-btn')) { document.querySelector('.close-editor-btn').addEventListener('click', () => editorModal.style.display = 'none'); }

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

window.toggleVisibility = async (type, id) => { let d = getSiteData(); let item = d[type].find(i=>i.id===id); if(item){ item.visible = !item.visible; await saveAdminData('siteData', d); refreshAdmin(); } }
window.deleteItem = async (type, id) => { if(!confirm("DELETE RECORD?")) return; let d = getSiteData(); d[type] = d[type].filter(i=>i.id!==id); await saveAdminData('siteData', d); refreshAdmin(); }

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
    document.getElementById('itemEditorForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        let d = getSiteData();
        let item = currentEditingId ? d[currentEditorType].find(i=>i.id===currentEditingId) : { id: generateId(), visible: true };
        
        item.name = document.getElementById('ed_name')?.value || item.name;
        if(currentEditorType === 'roster') { item.rank = document.getElementById('ed_rank').value; item.status = document.getElementById('ed_status').value; item.specialty = document.getElementById('ed_specialty').value; item.bio = document.getElementById('ed_bio').value; item.image = document.getElementById('ed_image').value; item.bookable = document.getElementById('ed_bookable').checked;}
        else if(currentEditorType === 'services') { item.icon = document.getElementById('ed_icon').value; item.desc = document.getElementById('ed_desc').value;}
        else if(currentEditorType === 'addons') { item.price = parseFloat(document.getElementById('ed_price').value); item.priceType = document.getElementById('ed_priceType').value; }
    
        if(!currentEditingId) d[currentEditorType].push(item);
        await saveAdminData('siteData', d); refreshAdmin(); editorModal.style.display = 'none';
    });
}

// Marker Export Fallback System
document.getElementById('exportDataBtn').addEventListener('click', () => {
    const allData = { siteData: getSiteData(), requests: CLOUD_STATE.requests, apps: CLOUD_STATE.apps };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allData, null, 2));
    const dl = document.createElement('a'); dl.setAttribute("href", dataStr); dl.setAttribute("download", `BRP_Cloud_Backup_${getTimestamp().replace(/\D/g,'')}.json`); dl.click();
});

document.getElementById('importDataBtn').addEventListener('click', () => {
    const file = document.getElementById('importDataFile').files[0];
    if(!file) return alert("Select a JSON file first.");
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if(data.siteData) await saveAdminData('siteData', data.siteData);
            if(data.requests) await saveAdminData('requests', data.requests);
            if(data.apps) await saveAdminData('apps', data.apps);
            alert("CLOUD DATABASE RESTORED SUCCESSFULLY.");
            refreshAdmin(); renderPublicSite();
        } catch(err) { alert("INVALID JSON FILE."); }
    };
    reader.readAsText(file);
});

document.getElementById('resetDemoBtn').addEventListener('click', async () => {
    if(confirm("FACTORY RESET PUBLIC DATA? Contracts & Apps will be kept.")) {
        await saveAdminData('siteData', DEFAULT_DATA); refreshAdmin(); renderPublicSite();
    }
});

document.getElementById('exportScriptBtn')?.addEventListener('click', async () => {
    try {
        const response = await fetch('script.js');
        if (!response.ok) throw new Error('Fetch failed');
        const scriptContent = await response.text();
        patchAndDownloadScript(scriptContent);
    } catch (error) { alert("Use the fallback text box below."); }
});

document.getElementById('patchPastedScriptBtn')?.addEventListener('click', () => {
    const scriptContent = document.getElementById('fallbackScriptInput').value;
    if(!scriptContent.trim()) return alert("Paste script.js code first.");
    patchAndDownloadScript(scriptContent);
});

function patchAndDownloadScript(scriptContent) {
    const currentData = getSiteData(); 
    const updatedDefaultData = {
        services: currentData.services || [], addons: currentData.addons || [], roster: currentData.roster || [],
        contractQuestions: currentData.contractQuestions || [], applicationQuestions: currentData.applicationQuestions || [],
        costSettings: currentData.costSettings || {}
    };

    const startMarker = "/* === BLACK ROSE DEFAULT DATA START === */";
    const endMarker = "/* === BLACK ROSE DEFAULT DATA END === */";
    const startIndex = scriptContent.indexOf(startMarker);
    const endIndex = scriptContent.indexOf(endMarker);

    if (startIndex === -1 || endIndex === -1) return alert("Marker block not found.");

    const newBlock = `${startMarker}\nconst DEFAULT_DATA = ${JSON.stringify(updatedDefaultData, null, 4)};\n${endMarker}`;
    const patchedScript = scriptContent.substring(0, startIndex) + newBlock + scriptContent.substring(endIndex + endMarker.length);

    const blob = new Blob([patchedScript], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = "script.js";
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
}