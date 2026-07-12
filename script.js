/*
  Black Rose Protection static website.
  GitHub Pages friendly: all important defaults live in DEFAULT_DATA.
  Admin edits are previewed with localStorage. Use Export Updated script.js to publish changes.
*/

const ADMIN_PASSCODE = "blackrose";
const STORAGE_DATA_KEY = "brp_data_preview";
const STORAGE_SUBMISSIONS_KEY = "brp_local_submissions";
const STORAGE_WEBHOOKS_KEY = "brp_webhook_settings";
const STORAGE_ADMIN_AUTH = "brp_admin_authenticated";

/* === BLACK ROSE DEFAULT DATA START === */
const DEFAULT_DATA = {
  "siteSettings": {
    "companyName": "Black Rose Protection",
    "tagline": "Protecting what matters, with precision and loyalty.",
    "owner": "Roxy Rose",
    "intro": "Elite private protection and security solutions for individuals, businesses, events, and high-risk transport. Discretion. Precision. Loyalty.",
    "phone": "5206548088",
    "website": "blackroseprotection.site",
    "emailInviteUrl": "https://discord.gg/5hyT2CcJCD"
  },
  "services": [
    {
      "id": "personal-protection",
      "icon": "🛡️",
      "name": "Personal Protection",
      "description": "Executive and private protection tailored to your lifestyle, movement, and risk profile.",
      "startingPrice": "Calculated by contract",
      "active": true
    },
    {
      "id": "business-security",
      "icon": "🏢",
      "name": "Business Security",
      "description": "Reliable on-site presence for businesses, properties, staff, customers, and assets.",
      "startingPrice": "Calculated by contract",
      "active": true
    },
    {
      "id": "event-protection",
      "icon": "🎟️",
      "name": "Event Protection",
      "description": "Professional security for events, parties, openings, gatherings, and private venues.",
      "startingPrice": "Calculated by contract",
      "active": true
    },
    {
      "id": "high-risk-transport",
      "icon": "🚚",
      "name": "High-Risk Transport",
      "description": "Secure movement for valuable cargo, clients, assets, or sensitive situations.",
      "startingPrice": "Calculated by contract",
      "active": true
    },
    {
      "id": "patrol-coverage",
      "icon": "📍",
      "name": "Patrol Coverage",
      "description": "Visible deterrence, area monitoring, and rapid response for assigned locations.",
      "startingPrice": "Calculated by contract",
      "active": true
    }
  ],
  "addons": [
    {
      "id": "convoy-support",
      "name": "Second Vehicle / Convoy Support",
      "description": "Additional vehicle coverage for movement or escort work.",
      "price": 100000,
      "priceType": "flat",
      "active": true
    },
    {
      "id": "emergency-callout",
      "name": "Emergency Same-Day Callout",
      "description": "Priority response for urgent contract requests.",
      "price": 150000,
      "priceType": "flat",
      "active": true
    },
    {
      "id": "armed-detail",
      "name": "Armed / High-Risk Detail",
      "description": "Additional risk planning and readiness for dangerous details.",
      "price": 150000,
      "priceType": "flat",
      "active": true
    },
    {
      "id": "out-of-city",
      "name": "Out-of-City Travel",
      "description": "Coverage for contracts outside normal local operating areas.",
      "price": 75000,
      "priceType": "flat",
      "active": true
    },
    {
      "id": "equipment-loadout",
      "name": "Extended Equipment Loadout",
      "description": "Extra equipment and preparation for specialised work.",
      "price": 50000,
      "priceType": "flat",
      "active": true
    },
    {
      "id": "priority-handling",
      "name": "Priority Contract Handling",
      "description": "Expedited scheduling and priority contract review.",
      "price": 100000,
      "priceType": "flat",
      "active": true
    }
  ],
  "roster": [
    {
      "id": "roxy-rose",
      "name": "Roxy Rose",
      "rank": "Chief Executive Officer",
      "status": "Available",
      "specialty": "Company Leadership",
      "bio": "Founder of Black Rose Protection. Focused on loyalty, discretion, and professional contract coverage.",
      "imageUrl": "",
      "publicVisible": true,
      "bookable": true,
      "active": true
    },
    {
      "id": "jimmy-egan",
      "name": "Jimmy Egan",
      "rank": "Chief Operating Officer",
      "status": "Available",
      "specialty": "Close Protection",
      "bio": "Trusted protection officer experienced in client movement, business coverage, and field support.",
      "imageUrl": "",
      "publicVisible": true,
      "bookable": true,
      "active": true
    },
    {
      "id": "open-position",
      "name": "Open Position",
      "rank": "Recruit",
      "status": "In Training",
      "specialty": "Recruitment",
      "bio": "Black Rose Protection is accepting applications for motivated and professional applicants.",
      "imageUrl": "",
      "publicVisible": true,
      "bookable": false,
      "active": true
    }
  ],
  "costSettings": {
    "baseOperationFee": 50000,
    "employeeHourlyRate": 75000,
    "minimumHours": 1,
    "durationStep": 0.5,
    "riskFees": {
      "Low": 0,
      "Medium": 50000,
      "High": 150000,
      "Unknown": 75000
    }
  },
  "contractQuestions": [
    {
      "id": "fullName",
      "label": "Full Name",
      "type": "text",
      "required": true
    },
    {
      "id": "phone",
      "label": "Phone Number",
      "type": "tel",
      "required": true
    },
    {
      "id": "businessName",
      "label": "Business / Organisation Name",
      "type": "text",
      "required": false
    },
    {
      "id": "serviceNeeded",
      "label": "Service Needed",
      "type": "select",
      "required": true,
      "options": [
        "Personal Protection",
        "Business Security",
        "Event Protection",
        "High-Risk Transport",
        "Patrol Coverage",
        "Other"
      ]
    },
    {
      "id": "dateNeeded",
      "label": "Date Needed",
      "type": "date",
      "required": true
    },
    {
      "id": "timeNeeded",
      "label": "Time Needed",
      "type": "time",
      "required": true
    },
    {
      "id": "location",
      "label": "Location",
      "type": "text",
      "required": true
    },
    {
      "id": "duration",
      "label": "Expected Duration (Hours)",
      "type": "number",
      "required": true
    },
    {
      "id": "employeeCount",
      "label": "Employees Requested",
      "type": "employee-select",
      "required": true
    },
    {
      "id": "riskLevel",
      "label": "Risk Level",
      "type": "select",
      "required": true,
      "options": [
        "Low",
        "Medium",
        "High",
        "Unknown"
      ]
    },
    {
      "id": "vehicleSupport",
      "label": "Vehicle Support Needed",
      "type": "select",
      "required": true,
      "options": [
        "No",
        "Yes",
        "Unsure"
      ]
    },
    {
      "id": "extraDetails",
      "label": "Extra Details",
      "type": "textarea",
      "required": false
    },
    {
      "id": "contactPreference",
      "label": "Contact Preference",
      "type": "select",
      "required": true,
      "options": [
        "Phone",
        "Emails",
        "In Person"
      ]
    }
  ],
  "applicationQuestions": [
    {
      "id": "applicantName",
      "label": "Name",
      "type": "text",
      "required": true
    },
    {
      "id": "phone",
      "label": "Phone Number",
      "type": "tel",
      "required": true
    },
    {
      "id": "previousExperience",
      "label": "Previous Experience",
      "type": "textarea",
      "required": true
    },
    {
      "id": "reasonForJoining",
      "label": "Why do you want to join Black Rose Protection?",
      "type": "textarea",
      "required": true
    },
    {
      "id": "availability",
      "label": "Availability",
      "type": "text",
      "required": true
    },
    {
      "id": "strengths",
      "label": "Strengths",
      "type": "textarea",
      "required": true
    },
    {
      "id": "weaknesses",
      "label": "Weaknesses",
      "type": "textarea",
      "required": false
    },
    {
      "id": "preferredRole",
      "label": "Preferred Role",
      "type": "text",
      "required": false
    },
    {
      "id": "highRiskComfort",
      "label": "Comfortable With High-Risk Protection Work?",
      "type": "select",
      "required": true,
      "options": [
        "Yes",
        "No",
        "Unsure"
      ]
    }
  ]
};
/* === BLACK ROSE DEFAULT DATA END === */

let appData = loadData();

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadData() {
  const stored = localStorage.getItem(STORAGE_DATA_KEY);
  if (!stored) return clone(DEFAULT_DATA);
  try {
    return mergeData(clone(DEFAULT_DATA), JSON.parse(stored));
  } catch (error) {
    console.warn("Failed to parse stored BRP data", error);
    return clone(DEFAULT_DATA);
  }
}

function mergeData(defaults, overrides) {
  return {
    ...defaults,
    ...overrides,
    siteSettings: { ...defaults.siteSettings, ...(overrides.siteSettings || {}) },
    costSettings: {
      ...defaults.costSettings,
      ...(overrides.costSettings || {}),
      riskFees: { ...defaults.costSettings.riskFees, ...((overrides.costSettings || {}).riskFees || {}) }
    }
  };
}

function savePreviewData() {
  localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(appData));
}

function resetPreviewData() {
  appData = clone(DEFAULT_DATA);
  localStorage.removeItem(STORAGE_DATA_KEY);
}

function getWebhookSettings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_WEBHOOKS_KEY)) || { contractWebhookUrl: "", applicationWebhookUrl: "" };
  } catch {
    return { contractWebhookUrl: "", applicationWebhookUrl: "" };
  }
}

function saveWebhookSettings(settings) {
  localStorage.setItem(STORAGE_WEBHOOKS_KEY, JSON.stringify(settings));
}

function getSubmissions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_SUBMISSIONS_KEY)) || { contracts: [], applications: [] };
  } catch {
    return { contracts: [], applications: [] };
  }
}

function saveSubmissions(submissions) {
  localStorage.setItem(STORAGE_SUBMISSIONS_KEY, JSON.stringify(submissions));
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value) || 0);
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function slugify(value) {
  return String(value || "item").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "item";
}

function getBookableRoster() {
  return appData.roster.filter((member) => member.active !== false && member.bookable && member.name.toLowerCase() !== "open position");
}

function calculateAddonCost(addon, duration, employeeCount) {
  const price = Number(addon.price) || 0;
  switch (addon.priceType) {
    case "per hour": return price * duration;
    case "per employee": return price * employeeCount;
    case "per employee per hour": return price * employeeCount * duration;
    default: return price;
  }
}

function calculateEstimate(formValues = {}) {
  const settings = appData.costSettings;
  const duration = Math.max(Number(formValues.duration) || settings.minimumHours, settings.minimumHours);
  const employeeCount = Math.max(Number(formValues.employeeCount) || 0, 0);
  const riskLevel = formValues.riskLevel || "Unknown";
  const selectedAddonIds = formValues.addons || [];
  const activeAddons = appData.addons.filter((addon) => addon.active !== false && selectedAddonIds.includes(addon.id));
  const baseFee = Number(settings.baseOperationFee) || 0;
  const employeeHourlyRate = Number(settings.employeeHourlyRate) || 0;
  const employeeCost = employeeCount * duration * employeeHourlyRate;
  const riskFee = Number(settings.riskFees?.[riskLevel]) || 0;
  const addonBreakdown = activeAddons.map((addon) => ({ ...addon, calculatedCost: calculateAddonCost(addon, duration, employeeCount) }));
  const addonTotal = addonBreakdown.reduce((total, addon) => total + addon.calculatedCost, 0);
  const total = baseFee + employeeCost + riskFee + addonTotal;
  return { baseFee, employeeHourlyRate, duration, employeeCount, riskLevel, employeeCost, riskFee, addonBreakdown, addonTotal, total };
}

function init() {
  const page = document.body.dataset.page;
  if (page === "public") initPublicPage();
  if (page === "admin") initAdminPage();
}

document.addEventListener("DOMContentLoaded", init);

function initPublicPage() {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.querySelector(".nav-toggle")?.addEventListener("click", () => document.getElementById("mainNav")?.classList.toggle("open"));
  renderSiteSettings();
  renderServices();
  renderRoster();
  renderContractForm();
  renderApplicationForm();
}

function renderSiteSettings() {
  const settings = appData.siteSettings;
  const title = document.getElementById("heroTitle");
  const tagline = document.getElementById("heroTagline");
  const intro = document.getElementById("heroIntro");
  if (title) title.textContent = settings.companyName || "Black Rose Protection";
  if (tagline) tagline.textContent = settings.tagline || "Protecting what matters, with precision and loyalty.";
  if (intro) intro.textContent = settings.intro || "";
  ["emailNavLink", "emailHeroLink", "footerEmailLink"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = settings.emailInviteUrl || "#";
  });
}

function renderServices() {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;
  const services = appData.services.filter((service) => service.active !== false);
  grid.innerHTML = services.map((service) => `
    <article class="card reveal">
      <div class="icon-badge">${escapeHtml(service.icon || "✦")}</div>
      <h3>${escapeHtml(service.name)}</h3>
      <p>${escapeHtml(service.description)}</p>
      <span class="price-tag">${escapeHtml(service.startingPrice || "Available")}</span>
    </article>
  `).join("");
}

function renderRoster() {
  const grid = document.getElementById("rosterGrid");
  if (!grid) return;
  const members = appData.roster.filter((member) => member.publicVisible !== false && member.active !== false);
  grid.innerHTML = members.map((member) => `
    <article class="card roster-card reveal">
      <img class="avatar" src="${escapeHtml(member.imageUrl || "assets/icon.png")}" alt="${escapeHtml(member.name)}" onerror="this.src='assets/icon.png'" />
      <div>
        <h3>${escapeHtml(member.name)}</h3>
        <p><strong>${escapeHtml(member.rank)}</strong><br>${escapeHtml(member.specialty || "General Security")}</p>
        <span class="status-badge">${escapeHtml(member.status || "Available")}</span>
      </div>
      <p class="full-width" style="grid-column:1/-1">${escapeHtml(member.bio || "")}</p>
    </article>
  `).join("");
}

function renderQuestionField(question, context) {
  const required = question.required ? "required" : "";
  const label = `<label for="${context}-${question.id}">${escapeHtml(question.label)}${question.required ? " *" : ""}</label>`;
  const name = question.id;
  if (question.type === "textarea") {
    return `<div class="form-group full-width">${label}<textarea id="${context}-${question.id}" name="${name}" ${required}></textarea></div>`;
  }
  if (question.type === "select") {
    return `<div class="form-group"><label for="${context}-${question.id}">${escapeHtml(question.label)}${question.required ? " *" : ""}</label><select id="${context}-${question.id}" name="${name}" ${required}>${(question.options || []).map((opt) => `<option value="${escapeHtml(opt)}">${escapeHtml(opt)}</option>`).join("")}</select></div>`;
  }
  if (question.type === "employee-select") {
    const count = getBookableRoster().length;
    if (count === 0) {
      return `<div class="form-group"><label>${escapeHtml(question.label)}</label><select id="${context}-${question.id}" name="${name}" disabled><option>No employees available</option></select></div>`;
    }
    const options = Array.from({ length: count }, (_, index) => index + 1).map((value) => `<option value="${value}">${value} Employee${value > 1 ? "s" : ""}</option>`).join("");
    return `<div class="form-group">${label}<select id="${context}-${question.id}" name="${name}" ${required}>${options}</select></div>`;
  }
  const step = question.id === "duration" ? `step="${appData.costSettings.durationStep}" min="${appData.costSettings.minimumHours}" value="${appData.costSettings.minimumHours}"` : "";
  return `<div class="form-group">${label}<input id="${context}-${question.id}" name="${name}" type="${escapeHtml(question.type || "text")}" ${step} ${required} /></div>`;
}

function renderContractForm() {
  const fields = document.getElementById("contractFields");
  const addons = document.getElementById("requestAddons");
  const form = document.getElementById("contractForm");
  if (!fields || !addons || !form) return;
  fields.innerHTML = appData.contractQuestions.map((q) => renderQuestionField(q, "contract")).join("");
  addons.innerHTML = appData.addons.filter((addon) => addon.active !== false).map((addon) => `
    <label class="check-row">
      <input type="checkbox" name="addons" value="${escapeHtml(addon.id)}" />
      <span><strong>${escapeHtml(addon.name)}</strong><small>${escapeHtml(addon.description)} • ${escapeHtml(addon.priceType || "flat")}</small></span>
      <strong>${formatMoney(addon.price)}</strong>
    </label>
  `).join("");
  form.addEventListener("input", updateEstimate);
  form.addEventListener("change", updateEstimate);
  form.addEventListener("submit", submitContract);
  updateEstimate();
}

function getContractFormValues() {
  const form = document.getElementById("contractForm");
  if (!form) return {};
  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());
  values.addons = formData.getAll("addons");
  return values;
}

function updateEstimate() {
  const estimate = calculateEstimate(getContractFormValues());
  const lines = document.getElementById("estimateLines");
  const total = document.getElementById("estimateTotal");
  if (!lines || !total) return;
  lines.innerHTML = `
    <div class="estimate-line"><span>Base Operation Fee</span><strong>${formatMoney(estimate.baseFee)}</strong></div>
    <div class="estimate-line"><span>Employees</span><strong>${estimate.employeeCount} × ${estimate.duration} hr</strong></div>
    <div class="estimate-line"><span>Employee Cost</span><strong>${formatMoney(estimate.employeeCost)}</strong></div>
    <div class="estimate-line"><span>Risk Assessment Fee</span><strong>${formatMoney(estimate.riskFee)}</strong></div>
    <div class="estimate-line"><span>Operational Add-ons</span><strong>${formatMoney(estimate.addonTotal)}</strong></div>
  `;
  total.textContent = formatMoney(estimate.total);
}

async function submitContract(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.getElementById("contractMessage");
  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  const oldText = submitBtn.textContent;
  submitBtn.textContent = "Submitting...";
  const values = getContractFormValues();
  const estimate = calculateEstimate(values);
  const submission = { id: makeId("contract"), type: "contract", createdAt: new Date().toISOString(), status: "New", staffNotes: "", answers: values, estimate };
  const submissions = getSubmissions();
  submissions.contracts.unshift(submission);
  saveSubmissions(submissions);
  const webhookUrl = getWebhookSettings().contractWebhookUrl;
  let webhookResult = "";
  if (webhookUrl) {
    try {
      await sendDiscordEmbed(webhookUrl, buildContractEmbed(submission));
      webhookResult = " Sent to the contract channel.";
    } catch (error) {
      webhookResult = " Saved locally, but channel notification failed.";
      console.warn(error);
    }
  }
  message.className = "form-message success";
  message.textContent = `Contract request submitted.${webhookResult}`;
  form.reset();
  updateEstimate();
  submitBtn.disabled = false;
  submitBtn.textContent = oldText;
}

function renderApplicationForm() {
  const fields = document.getElementById("applicationFields");
  const form = document.getElementById("applicationForm");
  if (!fields || !form) return;
  fields.innerHTML = appData.applicationQuestions.map((q) => renderQuestionField(q, "application")).join("");
  form.addEventListener("submit", submitApplication);
}

async function submitApplication(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.getElementById("applicationMessage");
  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  const oldText = submitBtn.textContent;
  submitBtn.textContent = "Submitting...";
  const values = Object.fromEntries(new FormData(form).entries());
  const submission = { id: makeId("application"), type: "application", createdAt: new Date().toISOString(), status: "New", staffNotes: "", answers: values };
  const submissions = getSubmissions();
  submissions.applications.unshift(submission);
  saveSubmissions(submissions);
  const webhookUrl = getWebhookSettings().applicationWebhookUrl;
  let webhookResult = "";
  if (webhookUrl) {
    try {
      await sendDiscordEmbed(webhookUrl, buildApplicationEmbed(submission));
      webhookResult = " Sent to the application channel.";
    } catch (error) {
      webhookResult = " Saved locally, but channel notification failed.";
      console.warn(error);
    }
  }
  message.className = "form-message success";
  message.textContent = `Application submitted.${webhookResult}`;
  form.reset();
  submitBtn.disabled = false;
  submitBtn.textContent = oldText;
}

function buildContractEmbed(submission) {
  const a = submission.answers;
  const e = submission.estimate;
  return {
    username: "Black Rose Protection",
    embeds: [{
      title: "New Black Rose Contract Request",
      color: 0xD7A7B8,
      fields: [
        { name: "Client", value: a.fullName || "N/A", inline: true },
        { name: "Phone", value: a.phone || "N/A", inline: true },
        { name: "Business", value: a.businessName || "N/A", inline: true },
        { name: "Service", value: a.serviceNeeded || "N/A", inline: true },
        { name: "Date / Time", value: `${a.dateNeeded || "N/A"} ${a.timeNeeded || ""}`, inline: true },
        { name: "Location", value: a.location || "N/A", inline: true },
        { name: "Duration", value: `${e.duration} hour(s)`, inline: true },
        { name: "Employees", value: String(e.employeeCount), inline: true },
        { name: "Risk", value: a.riskLevel || "N/A", inline: true },
        { name: "Vehicle Support", value: a.vehicleSupport || "N/A", inline: true },
        { name: "Add-ons", value: e.addonBreakdown.map((x) => x.name).join(", ") || "None", inline: false },
        { name: "Estimated Total", value: formatMoney(e.total), inline: true },
        { name: "Price Breakdown", value: `Base: ${formatMoney(e.baseFee)}\nEmployees: ${formatMoney(e.employeeCost)}\nRisk: ${formatMoney(e.riskFee)}\nAdd-ons: ${formatMoney(e.addonTotal)}`, inline: false },
        { name: "Extra Details", value: a.extraDetails || "None", inline: false },
        { name: "Submission ID", value: submission.id, inline: false }
      ],
      footer: { text: "Black Rose Protection Contract System" },
      timestamp: submission.createdAt
    }]
  };
}

function buildApplicationEmbed(submission) {
  const a = submission.answers;
  return {
    username: "Black Rose Protection",
    embeds: [{
      title: "New Black Rose Recruitment Application",
      color: 0xD7A7B8,
      fields: [
        { name: "Applicant", value: a.applicantName || a.name || "N/A", inline: true },
        { name: "Phone", value: a.phone || "N/A", inline: true },
        { name: "Preferred Role", value: a.preferredRole || "N/A", inline: true },
        { name: "Experience", value: a.previousExperience || "N/A", inline: false },
        { name: "Reason for Joining", value: a.reasonForJoining || "N/A", inline: false },
        { name: "Availability", value: a.availability || "N/A", inline: true },
        { name: "Strengths", value: a.strengths || "N/A", inline: false },
        { name: "Weaknesses", value: a.weaknesses || "N/A", inline: false },
        { name: "High-Risk Comfort", value: a.highRiskComfort || "N/A", inline: true },
        { name: "Submission ID", value: submission.id, inline: false }
      ],
      footer: { text: "Black Rose Protection Recruitment System" },
      timestamp: submission.createdAt
    }]
  };
}

async function sendDiscordEmbed(webhookUrl, payload) {
  const response = await fetch(webhookUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(`Webhook failed: ${response.status}`);
}

// Admin
function initAdminPage() {
  if (sessionStorage.getItem(STORAGE_ADMIN_AUTH) === "true") showAdmin();
  document.getElementById("loginForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const passcode = document.getElementById("passcode").value.trim();
    if (passcode === ADMIN_PASSCODE) {
      sessionStorage.setItem(STORAGE_ADMIN_AUTH, "true");
      showAdmin();
    } else {
      const msg = document.getElementById("loginMessage");
      msg.className = "form-message error";
      msg.textContent = "Incorrect passcode.";
    }
  });
  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    sessionStorage.removeItem(STORAGE_ADMIN_AUTH);
    location.reload();
  });
}

function showAdmin() {
  document.getElementById("adminLogin")?.classList.add("hidden");
  document.getElementById("adminShell")?.classList.remove("hidden");
  document.getElementById("adminEmailLink").href = appData.siteSettings.emailInviteUrl || "#";
  document.querySelectorAll("[data-admin-tab]").forEach((button) => {
    button.addEventListener("click", (event) => switchAdminTab(event.currentTarget.dataset.adminTab));
  });
  document.getElementById("saveAdminBtn")?.addEventListener("click", saveAdminFromCurrentTab);
  renderAdminAll();
  switchAdminTab("overview");
}

function switchAdminTab(tab) {
  document.querySelectorAll(".admin-menu button").forEach((btn) => btn.classList.toggle("active", btn.dataset.adminTab === tab));
  document.querySelectorAll(".admin-section").forEach((section) => section.classList.toggle("active", section.dataset.section === tab));
  const title = document.getElementById("adminTitle");
  if (title) title.textContent = ({ overview: "Overview", site: "Site Settings", submissions: "Submissions", services: "Services & Add-ons", roster: "Roster Management", questions: "Form Questions", webhooks: "Discord Webhooks", export: "Export script.js" })[tab] || "Command";
}

function renderAdminAll() {
  renderAdminOverview();
  renderAdminSiteSettings();
  renderAdminSubmissions();
  renderAdminServices();
  renderAdminRoster();
  renderAdminQuestions();
  renderAdminWebhooks();
  renderAdminExport();
}

function renderAdminOverview() {
  const target = document.querySelector('[data-section="overview"]');
  const submissions = getSubmissions();
  if (!target) return;
  target.innerHTML = `
    <div class="stat-grid">
      ${statCard("Contracts", submissions.contracts.length)}
      ${statCard("Applications", submissions.applications.length)}
      ${statCard("Services", appData.services.filter(x => x.active !== false).length)}
      ${statCard("Bookable", getBookableRoster().length)}
    </div>
    <div class="panel admin-card" style="margin-top:18px">
      <h2>Command Notes</h2>
      <p class="small-note">This is a GitHub Pages website. Admin edits save locally for preview. Use Export Updated script.js, then upload the file to GitHub to publish changes for everyone.</p>
      <p class="small-note">Discord webhook URLs are stored only in this browser localStorage and are not included in exported files.</p>
    </div>
  `;
}
function statCard(label, value) { return `<div class="card stat-card"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`; }

function renderAdminSiteSettings() {
  const s = appData.siteSettings;
  const target = document.querySelector('[data-section="site"]');
  if (!target) return;
  target.innerHTML = `
    <div class="panel admin-card">
      <div class="admin-row">
        ${inputBlock("Company Name", "site-companyName", s.companyName)}
        ${inputBlock("Owner", "site-owner", s.owner)}
        ${inputBlock("Tagline", "site-tagline", s.tagline, "text", "full")}
        ${inputBlock("Phone", "site-phone", s.phone)}
        ${inputBlock("Website", "site-website", s.website)}
        ${inputBlock("Join the Emails URL", "site-emailInviteUrl", s.emailInviteUrl, "text", "full")}
        ${textareaBlock("Intro Text", "site-intro", s.intro, "full")}
      </div>
    </div>
  `;
}

function inputBlock(label, id, value = "", type = "text", extraClass = "") {
  return `<div class="form-group ${extraClass === "full" ? "full-width" : ""}"><label for="${id}">${escapeHtml(label)}</label><input id="${id}" type="${type}" value="${escapeHtml(value)}" /></div>`;
}
function textareaBlock(label, id, value = "", extraClass = "") {
  return `<div class="form-group ${extraClass === "full" ? "full-width" : ""}"><label for="${id}">${escapeHtml(label)}</label><textarea id="${id}">${escapeHtml(value)}</textarea></div>`;
}

function renderAdminServices() {
  const target = document.querySelector('[data-section="services"]');
  if (!target) return;
  target.innerHTML = `
    <div class="panel admin-card">
      <h2>Core Services</h2>
      <div class="editor-list" id="adminServicesList">${appData.services.map((service, index) => serviceEditor(service, index)).join("")}</div>
      <button class="btn btn-secondary" type="button" id="addServiceBtn">Add Service</button>
    </div>
    <div class="panel admin-card" style="margin-top:18px">
      <h2>Add-ons</h2>
      <div class="editor-list" id="adminAddonsList">${appData.addons.map((addon, index) => addonEditor(addon, index)).join("")}</div>
      <button class="btn btn-secondary" type="button" id="addAddonBtn">Add Add-on</button>
    </div>
  `;
  document.getElementById("addServiceBtn").addEventListener("click", () => { appData.services.push({ id: makeId("service"), icon: "✦", name: "New Service", description: "", startingPrice: "Calculated by contract", active: true }); renderAdminServices(); });
  document.getElementById("addAddonBtn").addEventListener("click", () => { appData.addons.push({ id: makeId("addon"), name: "New Add-on", description: "", price: 0, priceType: "flat", active: true }); renderAdminServices(); });
  bindRemoveButtons("service", appData.services, renderAdminServices);
  bindRemoveButtons("addon", appData.addons, renderAdminServices);
}

function serviceEditor(service, index) {
  return `<div class="editor-card" data-service-index="${index}">
    <div class="admin-row three">
      ${inputBlock("Icon", `service-${index}-icon`, service.icon)}
      ${inputBlock("Name", `service-${index}-name`, service.name)}
      ${inputBlock("Starting Price", `service-${index}-startingPrice`, service.startingPrice)}
      ${textareaBlock("Description", `service-${index}-description`, service.description, "full")}
      <label class="check-row"><input type="checkbox" id="service-${index}-active" ${service.active !== false ? "checked" : ""}> <span><strong>Active</strong></span></label>
    </div>
    <div class="editor-actions"><button class="btn btn-danger" type="button" data-remove-service="${index}">Remove</button></div>
  </div>`;
}
function addonEditor(addon, index) {
  return `<div class="editor-card" data-addon-index="${index}">
    <div class="admin-row three">
      ${inputBlock("Name", `addon-${index}-name`, addon.name)}
      ${inputBlock("Price", `addon-${index}-price`, addon.price, "number")}
      <div class="form-group"><label>Price Type</label><select id="addon-${index}-priceType">${["flat", "per hour", "per employee", "per employee per hour"].map((type) => `<option value="${type}" ${addon.priceType === type ? "selected" : ""}>${type}</option>`).join("")}</select></div>
      ${textareaBlock("Description", `addon-${index}-description`, addon.description, "full")}
      <label class="check-row"><input type="checkbox" id="addon-${index}-active" ${addon.active !== false ? "checked" : ""}> <span><strong>Active</strong></span></label>
    </div>
    <div class="editor-actions"><button class="btn btn-danger" type="button" data-remove-addon="${index}">Remove</button></div>
  </div>`;
}
function bindRemoveButtons(type, array, rerender) {
  document.querySelectorAll(`[data-remove-${type}]`).forEach((btn) => btn.addEventListener("click", () => { array.splice(Number(btn.dataset[`remove${type.charAt(0).toUpperCase()+type.slice(1)}`]), 1); rerender(); }));
}

function renderAdminRoster() {
  const target = document.querySelector('[data-section="roster"]');
  if (!target) return;
  target.innerHTML = `
    <div class="panel admin-card">
      <h2>Roster Management</h2>
      <div class="editor-list">${appData.roster.map((member, index) => rosterEditor(member, index)).join("")}</div>
      <button class="btn btn-secondary" type="button" id="addRosterBtn">Add Roster Member</button>
    </div>
  `;
  document.getElementById("addRosterBtn").addEventListener("click", () => { appData.roster.push({ id: makeId("member"), name: "New Member", rank: "Security Officer", status: "Available", specialty: "General Security", bio: "", imageUrl: "", publicVisible: true, bookable: true, active: true }); renderAdminRoster(); });
  bindRemoveButtons("member", appData.roster, renderAdminRoster);
}

function rosterEditor(member, index) {
  return `<div class="editor-card">
    <div class="admin-row three">
      ${inputBlock("Name", `member-${index}-name`, member.name)}
      ${inputBlock("Rank", `member-${index}-rank`, member.rank)}
      <div class="form-group"><label>Status</label><select id="member-${index}-status">${["Available", "On Duty", "Off Duty", "In Training", "Unavailable"].map((s) => `<option value="${s}" ${member.status === s ? "selected" : ""}>${s}</option>`).join("")}</select></div>
      ${inputBlock("Specialty", `member-${index}-specialty`, member.specialty)}
      ${inputBlock("Image URL", `member-${index}-imageUrl`, member.imageUrl)}
      ${textareaBlock("Bio", `member-${index}-bio`, member.bio, "full")}
      <label class="check-row"><input type="checkbox" id="member-${index}-publicVisible" ${member.publicVisible !== false ? "checked" : ""}> <span><strong>Public Visible</strong></span></label>
      <label class="check-row"><input type="checkbox" id="member-${index}-bookable" ${member.bookable ? "checked" : ""}> <span><strong>Bookable</strong></span></label>
      <label class="check-row"><input type="checkbox" id="member-${index}-active" ${member.active !== false ? "checked" : ""}> <span><strong>Active</strong></span></label>
    </div>
    <div class="editor-actions"><button class="btn btn-danger" type="button" data-remove-member="${index}">Remove</button></div>
  </div>`;
}

function renderAdminQuestions() {
  const target = document.querySelector('[data-section="questions"]');
  if (!target) return;
  target.innerHTML = `
    <div class="panel admin-card">
      <h2>Cost Settings</h2>
      <div class="admin-row three">
        ${inputBlock("Base Operation Fee", "cost-baseOperationFee", appData.costSettings.baseOperationFee, "number")}
        ${inputBlock("Employee Hourly Rate", "cost-employeeHourlyRate", appData.costSettings.employeeHourlyRate, "number")}
        ${inputBlock("Minimum Hours", "cost-minimumHours", appData.costSettings.minimumHours, "number")}
        ${inputBlock("Duration Step", "cost-durationStep", appData.costSettings.durationStep, "number")}
        ${inputBlock("Low Risk Fee", "cost-risk-Low", appData.costSettings.riskFees.Low, "number")}
        ${inputBlock("Medium Risk Fee", "cost-risk-Medium", appData.costSettings.riskFees.Medium, "number")}
        ${inputBlock("High Risk Fee", "cost-risk-High", appData.costSettings.riskFees.High, "number")}
        ${inputBlock("Unknown Risk Fee", "cost-risk-Unknown", appData.costSettings.riskFees.Unknown, "number")}
      </div>
    </div>
    <div class="panel admin-card" style="margin-top:18px">
      <h2>Form Questions</h2>
      <p class="small-note">Question structure is kept simple in this starter. Edit labels/options in DEFAULT_DATA if you need deeper custom question changes.</p>
      <div class="admin-row"><div><h3>Contract Questions</h3><ul>${appData.contractQuestions.map(q => `<li>${escapeHtml(q.label)}</li>`).join("")}</ul></div><div><h3>Application Questions</h3><ul>${appData.applicationQuestions.map(q => `<li>${escapeHtml(q.label)}</li>`).join("")}</ul></div></div>
    </div>
  `;
}

function renderAdminWebhooks() {
  const target = document.querySelector('[data-section="webhooks"]');
  const w = getWebhookSettings();
  if (!target) return;
  target.innerHTML = `
    <div class="panel admin-card">
      <p class="small-note">GitHub Pages is frontend-only. Webhook URLs entered here are saved in this browser only and may be visible from the browser. Use this only if you accept that risk.</p>
      ${inputBlock("Contract Webhook URL", "webhook-contract", w.contractWebhookUrl)}
      ${inputBlock("Application Webhook URL", "webhook-application", w.applicationWebhookUrl)}
      <p class="small-note">Webhook URLs are not included in exported script.js.</p>
    </div>
  `;
}

function renderAdminSubmissions() {
  const target = document.querySelector('[data-section="submissions"]');
  const submissions = getSubmissions();
  if (!target) return;
  const contracts = submissions.contracts.map((item) => submissionCard(item, "contract")).join("") || `<p class="small-note">No contract requests saved locally.</p>`;
  const applications = submissions.applications.map((item) => submissionCard(item, "application")).join("") || `<p class="small-note">No applications saved locally.</p>`;
  target.innerHTML = `
    <div class="panel admin-card"><h2>Contract Requests</h2><div class="editor-list">${contracts}</div></div>
    <div class="panel admin-card" style="margin-top:18px"><h2>Applications</h2><div class="editor-list">${applications}</div></div>
  `;
  document.querySelectorAll("[data-delete-submission]").forEach((btn) => btn.addEventListener("click", () => {
    const [type, id] = btn.dataset.deleteSubmission.split(":");
    const all = getSubmissions();
    const key = type === "contract" ? "contracts" : "applications";
    all[key] = all[key].filter((item) => item.id !== id);
    saveSubmissions(all);
    renderAdminSubmissions();
    renderAdminOverview();
  }));
}

function submissionCard(item, type) {
  const values = item.answers || {};
  const name = type === "contract" ? values.fullName : (values.applicantName || values.name);
  return `<article class="submission-card">
    <div class="submission-head"><div><h3>${escapeHtml(name || "Unknown")}</h3><div class="submission-meta">${escapeHtml(item.id)} • ${new Date(item.createdAt).toLocaleString()}</div></div><span class="status-badge">${escapeHtml(item.status || "New")}</span></div>
    <table class="data-table">${Object.entries(values).map(([key, value]) => `<tr><td>${escapeHtml(key)}</td><td>${escapeHtml(Array.isArray(value) ? value.join(", ") : value)}</td></tr>`).join("")}${item.estimate ? `<tr><td>Estimated Total</td><td>${formatMoney(item.estimate.total)}</td></tr>` : ""}</table>
    <div class="editor-actions"><button class="btn btn-danger" type="button" data-delete-submission="${type}:${item.id}">Delete</button></div>
  </article>`;
}

function renderAdminExport() {
  const target = document.querySelector('[data-section="export"]');
  if (!target) return;
  target.innerHTML = `
    <div class="panel admin-card">
      <h2>Export Updated script.js</h2>
      <p class="small-note">This patches only the DEFAULT_DATA block. It does not export webhook URLs or local submissions.</p>
      <div class="editor-actions">
        <button class="btn btn-primary" type="button" id="exportScriptBtn">Export Updated script.js</button>
        <button class="btn btn-secondary" type="button" id="exportJsonBtn">Export Data JSON</button>
        <button class="btn btn-danger" type="button" id="resetDataBtn">Reset Preview Data</button>
      </div>
      <hr style="border-color:var(--border); margin:24px 0">
      <p class="small-note">Fallback: if your browser cannot fetch script.js, paste your current script.js here and patch it manually.</p>
      <textarea class="export-area" id="scriptPaste" placeholder="Paste current script.js here..."></textarea>
      <button class="btn btn-secondary" type="button" id="patchPastedBtn">Patch Pasted script.js</button>
      <div class="form-message" id="exportMessage"></div>
    </div>
  `;
  document.getElementById("exportScriptBtn").addEventListener("click", exportPatchedScript);
  document.getElementById("exportJsonBtn").addEventListener("click", () => downloadFile("brp-data.json", JSON.stringify(appData, null, 2)));
  document.getElementById("resetDataBtn").addEventListener("click", () => { if (confirm("Reset preview data to defaults?")) { resetPreviewData(); renderAdminAll(); } });
  document.getElementById("patchPastedBtn").addEventListener("click", () => {
    const source = document.getElementById("scriptPaste").value;
    const patched = patchScriptSource(source);
    if (patched) downloadFile("script.js", patched);
  });
}

function saveAdminFromCurrentTab() {
  const active = document.querySelector(".admin-section.active")?.dataset.section;
  if (active === "site") readSiteSettingsFromAdmin();
  if (active === "services") readServicesFromAdmin();
  if (active === "roster") readRosterFromAdmin();
  if (active === "questions") readCostSettingsFromAdmin();
  if (active === "webhooks") readWebhooksFromAdmin();
  savePreviewData();
  renderAdminAll();
  switchAdminTab(active || "overview");
}

function readSiteSettingsFromAdmin() {
  ["companyName", "owner", "tagline", "phone", "website", "emailInviteUrl", "intro"].forEach((key) => {
    const id = `site-${key}`;
    const el = document.getElementById(id);
    if (el) appData.siteSettings[key] = el.value;
  });
}
function readServicesFromAdmin() {
  appData.services.forEach((service, i) => {
    ["icon", "name", "startingPrice", "description"].forEach((key) => { const el = document.getElementById(`service-${i}-${key}`); if (el) service[key] = el.value; });
    service.id = service.id || slugify(service.name);
    service.active = document.getElementById(`service-${i}-active`)?.checked ?? true;
  });
  appData.addons.forEach((addon, i) => {
    ["name", "description", "priceType"].forEach((key) => { const el = document.getElementById(`addon-${i}-${key}`); if (el) addon[key] = el.value; });
    addon.id = addon.id || slugify(addon.name);
    addon.price = Number(document.getElementById(`addon-${i}-price`)?.value || 0);
    addon.active = document.getElementById(`addon-${i}-active`)?.checked ?? true;
  });
}
function readRosterFromAdmin() {
  appData.roster.forEach((member, i) => {
    ["name", "rank", "status", "specialty", "imageUrl", "bio"].forEach((key) => { const el = document.getElementById(`member-${i}-${key}`); if (el) member[key] = el.value; });
    member.id = member.id || slugify(member.name);
    member.publicVisible = document.getElementById(`member-${i}-publicVisible`)?.checked ?? true;
    member.bookable = document.getElementById(`member-${i}-bookable`)?.checked ?? false;
    member.active = document.getElementById(`member-${i}-active`)?.checked ?? true;
  });
}
function readCostSettingsFromAdmin() {
  ["baseOperationFee", "employeeHourlyRate", "minimumHours", "durationStep"].forEach((key) => {
    const el = document.getElementById(`cost-${key}`);
    if (el) appData.costSettings[key] = Number(el.value);
  });
  ["Low", "Medium", "High", "Unknown"].forEach((risk) => {
    const el = document.getElementById(`cost-risk-${risk}`);
    if (el) appData.costSettings.riskFees[risk] = Number(el.value);
  });
}
function readWebhooksFromAdmin() {
  saveWebhookSettings({ contractWebhookUrl: document.getElementById("webhook-contract")?.value || "", applicationWebhookUrl: document.getElementById("webhook-application")?.value || "" });
}

async function exportPatchedScript() {
  const msg = document.getElementById("exportMessage");
  try {
    const response = await fetch("script.js", { cache: "no-store" });
    if (!response.ok) throw new Error("Could not fetch script.js");
    const source = await response.text();
    const patched = patchScriptSource(source);
    if (patched) {
      downloadFile("script.js", patched);
      msg.className = "form-message success";
      msg.textContent = "Updated script.js exported.";
    }
  } catch (error) {
    msg.className = "form-message error";
    msg.textContent = "Could not read current script.js. Use the paste fallback below.";
  }
}

function patchScriptSource(source) {
  const msg = document.getElementById("exportMessage");
  const start = "/* === BLACK ROSE DEFAULT DATA START === */";
  const end = "/* === BLACK ROSE DEFAULT DATA END === */";
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end);
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    if (msg) { msg.className = "form-message error"; msg.textContent = "Export failed because the DEFAULT_DATA marker block was not found."; }
    return null;
  }
  const before = source.slice(0, startIndex);
  const after = source.slice(endIndex + end.length);
  const cleanData = clone(appData);
  const block = `${start}\nconst DEFAULT_DATA = ${JSON.stringify(cleanData, null, 2)};\n${end}`;
  return `${before}${block}${after}`;
}
function downloadFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
