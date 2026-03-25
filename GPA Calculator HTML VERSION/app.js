// ─── Data ────────────────────────────────────────────────────────────────────

const GRADE_POINTS = {"A+":4.0,"A":3.6,"B+":3.2,"B":2.8,"C+":2.4,"C":2.0,"D":1.6,"NG":0.0};
const GRADE_COLOR  = {"A+":"#f59e0b","A":"#10b981","B+":"#f59e0b","B":"#f59e0b","C+":"#ef4444","C":"#ef4444","D":"#ef4444","NG":"#6b7280"};
const GRADE_BG     = {"A+":"rgba(245,158,11,0.15)","A":"rgba(16,185,129,0.15)","B+":"rgba(245,158,11,0.12)","B":"rgba(245,158,11,0.1)","C+":"rgba(239,68,68,0.12)","C":"rgba(239,68,68,0.1)","D":"rgba(239,68,68,0.08)","NG":"rgba(107,114,128,0.1)"};

function gradeLetterFromGP(gp) {
  if (gp >= 4.0) return "A+";
  if (gp >= 3.6) return "A";
  if (gp >= 3.2) return "B+";
  if (gp >= 2.8) return "B";
  if (gp >= 2.4) return "C+";
  if (gp >= 2.0) return "C";
  if (gp >= 1.6) return "D";
  return "NG";
}
function gpFromMarks75(m) { if(m>=67.5)return 4.0;if(m>=60)return 3.6;if(m>=52.5)return 3.2;if(m>=45)return 2.8;if(m>=37.5)return 2.4;if(m>=30)return 2.0;if(m>=27)return 1.6;return 0.0; }
function gpFromMarks50(m) { if(m>=45)return 4.0;if(m>=40)return 3.6;if(m>=35)return 3.2;if(m>=30)return 2.8;if(m>=25)return 2.4;if(m>=20)return 2.0;if(m>=18)return 1.6;return 0.0; }
function gpFromMarks25(m) { if(m>=22.5)return 4.0;if(m>=20)return 3.6;if(m>=17.5)return 3.2;if(m>=15)return 2.8;if(m>=12.5)return 2.4;if(m>=10)return 2.0;if(m>=7.5)return 1.6;return 0.0; }

const T75 = [{label:"A+ (67.5–75)",gp:4.0},{label:"A (60–67.5)",gp:3.6},{label:"B+ (52.5–60)",gp:3.2},{label:"B (45–52.5)",gp:2.8},{label:"C+ (37.5–45)",gp:2.4},{label:"C (30–37.5)",gp:2.0},{label:"D (27–30)",gp:1.6},{label:"NG (< 27)",gp:0.0}];
const T50 = [{label:"A+ (45–50)",gp:4.0},{label:"A (40–45)",gp:3.6},{label:"B+ (35–40)",gp:3.2},{label:"B (30–35)",gp:2.8},{label:"C+ (25–30)",gp:2.4},{label:"C (20–25)",gp:2.0},{label:"D (18–20)",gp:1.6},{label:"NG (< 18)",gp:0.0}];
const I25 = [{label:"A+ (22.5–25)",gp:4.0},{label:"A (20–22.5)",gp:3.6},{label:"B+ (17.5–20)",gp:3.2},{label:"B (15–17.5)",gp:2.8},{label:"C+ (12.5–15)",gp:2.4},{label:"C (10–12.5)",gp:2.0},{label:"D (7.5–10)",gp:1.6},{label:"NG (< 7.5)",gp:0.0}];
const P50 = [{label:"A+ (45–50)",gp:4.0},{label:"A (40–45)",gp:3.6},{label:"B+ (35–40)",gp:3.2},{label:"B (30–35)",gp:2.8},{label:"C+ (25–30)",gp:2.4},{label:"C (20–25)",gp:2.0},{label:"D (15–20)",gp:1.6},{label:"NG (< 15)",gp:0.0}];

const MGMT_COMP = [
  {code:"003",name:"COM.ENGLISH",shortName:"English",theoryCH:3.0,practicalCH:1.0,theoryMarks:75,practicalMarks:25,theoryOptions:T75,practicalOptions:I25},
  {code:"001",name:"COM.NEPALI",shortName:"Nepali",theoryCH:2.25,practicalCH:0.75,theoryMarks:75,practicalMarks:25,theoryOptions:T75,practicalOptions:I25},
  {code:"005",name:"MATHEMATICS",shortName:"Mathematics",theoryCH:3.75,practicalCH:1.25,theoryMarks:75,practicalMarks:25,theoryOptions:T75,practicalOptions:I25},
];
const SCI_COMP = [
  {code:"003",name:"COM.ENGLISH",shortName:"English",theoryCH:3.0,practicalCH:1.0,theoryMarks:75,practicalMarks:25,theoryOptions:T75,practicalOptions:I25},
  {code:"001",name:"COM.NEPALI",shortName:"Nepali",theoryCH:2.25,practicalCH:0.75,theoryMarks:75,practicalMarks:25,theoryOptions:T75,practicalOptions:I25},
  {code:"201",name:"PHYSICS",shortName:"Physics",theoryCH:2.5,practicalCH:2.5,theoryMarks:50,practicalMarks:50,theoryOptions:T50,practicalOptions:P50},
];
const MGMT_OPT = [
  {label:"Accountancy",def:{code:"006",name:"ACCOUNT",shortName:"Accountancy",theoryCH:3.75,practicalCH:1.25,theoryMarks:75,practicalMarks:25,theoryOptions:T75,practicalOptions:I25}},
  {label:"Economics",def:{code:"007",name:"ECONOMICS",shortName:"Economics",theoryCH:3.75,practicalCH:1.25,theoryMarks:75,practicalMarks:25,theoryOptions:T75,practicalOptions:I25}},
  {label:"Computer Science",def:{code:"008",name:"COMPUTER SCIENCE",shortName:"Comp. Science",theoryCH:2.5,practicalCH:2.5,theoryMarks:50,practicalMarks:50,theoryOptions:T50,practicalOptions:P50}},
  {label:"Business Studies",def:{code:"009",name:"BUSINESS STUDIES",shortName:"Business Std.",theoryCH:3.75,practicalCH:1.25,theoryMarks:75,practicalMarks:25,theoryOptions:T75,practicalOptions:I25}},
  {label:"Marketing",def:{code:"010",name:"MARKETING",shortName:"Marketing",theoryCH:3.75,practicalCH:1.25,theoryMarks:75,practicalMarks:25,theoryOptions:T75,practicalOptions:I25}},
  {label:"Hotel Management",def:{code:"011",name:"HOTEL MGMT",shortName:"Hotel Mgmt.",theoryCH:3.75,practicalCH:1.25,theoryMarks:75,practicalMarks:25,theoryOptions:T75,practicalOptions:I25}},
];
const SCI_OPT = [
  {label:"Chemistry",def:{code:"202",name:"CHEMISTRY",shortName:"Chemistry",theoryCH:2.5,practicalCH:2.5,theoryMarks:50,practicalMarks:50,theoryOptions:T50,practicalOptions:P50}},
  {label:"Biology",def:{code:"203",name:"BIOLOGY",shortName:"Biology",theoryCH:2.5,practicalCH:2.5,theoryMarks:50,practicalMarks:50,theoryOptions:T50,practicalOptions:P50}},
  {label:"Mathematics",def:{code:"204",name:"MATHEMATICS",shortName:"Mathematics",theoryCH:2.5,practicalCH:2.5,theoryMarks:50,practicalMarks:50,theoryOptions:T50,practicalOptions:P50}},
  {label:"Computer Science",def:{code:"008",name:"COMPUTER SCIENCE",shortName:"Comp. Science",theoryCH:2.5,practicalCH:2.5,theoryMarks:50,practicalMarks:50,theoryOptions:T50,practicalOptions:P50}},
];

const UNIVERSITY_PROGRAMS = [
  {name:"MBBS / Medical",minGPA:3.6,stream:"science",desc:"Medical schools (BPKIHS, KIST, etc.)"},
  {name:"BDS (Dental)",minGPA:3.2,stream:"science",desc:"Dental colleges"},
  {name:"B.Sc. CSIT",minGPA:2.8,stream:"science",desc:"Computer Science & IT (TU)"},
  {name:"BE / B.Tech",minGPA:2.8,stream:"science",desc:"Engineering programs (IOE)"},
  {name:"BPharm",minGPA:2.8,stream:"science",desc:"Pharmacy programs"},
  {name:"B.Sc. (Hons)",minGPA:2.4,stream:"science",desc:"Science honors programs"},
  {name:"BBA / BBS",minGPA:2.8,stream:"management",desc:"Business programs (top colleges)"},
  {name:"BCA",minGPA:2.4,stream:"management",desc:"Computer Application"},
  {name:"BBA (Regular)",minGPA:2.0,stream:"management",desc:"Bachelor of Business Admin"},
  {name:"BBS (TU)",minGPA:2.0,stream:"management",desc:"Bachelor of Business Studies"},
  {name:"BA / Law / Others",minGPA:1.6,stream:"both",desc:"Humanities & general programs"},
];

// ─── State ────────────────────────────────────────────────────────────────────

const STORAGE_KEY    = "neb-gpa-semesters";
const FORM_KEY       = "neb-gpa-form";
const PREFS_KEY      = "neb-gpa-prefs";

let stream       = "Management";
let marksMode    = false;
let lightMode    = false;
let glassMode    = false;
let compEntries  = [];
let optEntries   = [];
let records      = [];
let currentResult = null;
let activeTab    = "sheet";
let showHistory  = false;
let whatifOverrides = {};

// ─── Preferences (theme/glass) ────────────────────────────────────────────────

function loadPrefs() {
  try {
    const p = JSON.parse(localStorage.getItem(PREFS_KEY) || "{}");
    lightMode = p.lightMode || false;
    glassMode = p.glassMode || false;
  } catch {}
}
function savePrefs() {
  localStorage.setItem(PREFS_KEY, JSON.stringify({lightMode, glassMode}));
}
function applyTheme() {
  document.documentElement.classList.toggle("light-mode", lightMode);
  document.documentElement.classList.toggle("glass-mode", glassMode);
  document.getElementById("light-btn").className = "btn-pill" + (lightMode ? " active-light" : "");
  document.getElementById("glass-btn").className = "btn-pill" + (glassMode ? " active-glass" : "");
  document.getElementById("light-btn").textContent = lightMode ? "☀️ Day" : "🌙 Night";
}

function toggleLight() {
  lightMode = !lightMode;
  applyTheme(); savePrefs();
}
function toggleGlass() {
  glassMode = !glassMode;
  applyTheme(); savePrefs();
}

// ─── Persistence ──────────────────────────────────────────────────────────────

function loadRecords() {
  try { records = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { records = []; }
}
function saveRecords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}
function loadForm() {
  try { return JSON.parse(localStorage.getItem(FORM_KEY) || "null"); } catch { return null; }
}
function saveForm() {
  const f = {
    stream, marksMode,
    studentName: document.getElementById("student-name").value,
    semesterLabel: document.getElementById("semester-label").value,
    compGrades: compEntries.map(e => ({theoryGP:e.theoryGP, practicalGP:e.practicalGP, theoryMarks:e.theoryMarks, practicalMarks:e.practicalMarks})),
    optCodes: optEntries.map(e => e.def.code),
    optGrades: optEntries.map(e => ({theoryGP:e.theoryGP, practicalGP:e.practicalGP, theoryMarks:e.theoryMarks, practicalMarks:e.practicalMarks})),
  };
  localStorage.setItem(FORM_KEY, JSON.stringify(f));
  updateLiveBar();
  updateCalcBtn();
}

// ─── Init ─────────────────────────────────────────────────────────────────────

function init() {
  loadPrefs();
  applyTheme();
  loadRecords();
  const saved = loadForm();
  stream    = saved?.stream    || "Management";
  marksMode = saved?.marksMode || false;

  const comp = stream === "Management" ? MGMT_COMP : SCI_COMP;
  compEntries = comp.map((def, i) => ({
    def,
    theoryGP:    saved?.compGrades?.[i]?.theoryGP    ?? null,
    practicalGP: saved?.compGrades?.[i]?.practicalGP ?? null,
    theoryMarks:    saved?.compGrades?.[i]?.theoryMarks    ?? "",
    practicalMarks: saved?.compGrades?.[i]?.practicalMarks ?? "",
  }));

  const optList = stream === "Management" ? MGMT_OPT : SCI_OPT;
  optEntries = [0,1,2].map(i => {
    const savedCode = saved?.optCodes?.[i];
    const optDef    = savedCode ? (optList.find(o=>o.def.code===savedCode)?.def ?? optList[i].def) : optList[i].def;
    return {
      def: optDef,
      theoryGP:    saved?.optGrades?.[i]?.theoryGP    ?? null,
      practicalGP: saved?.optGrades?.[i]?.practicalGP ?? null,
      theoryMarks:    saved?.optGrades?.[i]?.theoryMarks    ?? "",
      practicalMarks: saved?.optGrades?.[i]?.practicalMarks ?? "",
    };
  });

  if (saved?.studentName)  document.getElementById("student-name").value  = saved.studentName;
  if (saved?.semesterLabel) document.getElementById("semester-label").value = saved.semesterLabel;

  renderStreamUI();
  renderSubjects();
  updateLiveBar();
  updateCalcBtn();
}

// ─── Stream & Mode Toggles ────────────────────────────────────────────────────

function renderStreamUI() {
  document.getElementById("tab-mgmt").className = "stream-tab" + (stream==="Management"?" active-mgmt":"");
  document.getElementById("tab-sci").className  = "stream-tab" + (stream==="Science"   ?" active-sci":"");
  const desc = document.getElementById("stream-desc");
  if (stream === "Management") {
    desc.className   = "mgmt";
    desc.textContent = "Management Stream — English, Nepali, Math + 3 Optional Subjects";
  } else {
    desc.className   = "sci";
    desc.textContent = "Science Stream — English, Nepali, Physics + 3 Optional Subjects";
  }
  document.getElementById("marks-mode-badge").style.display = marksMode ? "inline" : "none";
  document.getElementById("marks-btn").className = "btn-pill" + (marksMode ? " active-marks" : "");
}

function switchStream(s) {
  stream = s;
  const optList = s==="Management" ? MGMT_OPT : SCI_OPT;
  const comp    = s==="Management" ? MGMT_COMP : SCI_COMP;
  compEntries = comp.map(def => ({def, theoryGP:null, practicalGP:null, theoryMarks:"", practicalMarks:""}));
  optEntries  = [0,1,2].map(i => ({def:optList[i].def, theoryGP:null, practicalGP:null, theoryMarks:"", practicalMarks:""}));
  renderStreamUI();
  renderSubjects();
  saveForm();
}

function toggleMarksMode() {
  marksMode = !marksMode;
  compEntries.forEach(e => { e.theoryGP=null; e.practicalGP=null; e.theoryMarks=""; e.practicalMarks=""; });
  optEntries.forEach(e  => { e.theoryGP=null; e.practicalGP=null; e.theoryMarks=""; e.practicalMarks=""; });
  renderStreamUI();
  renderSubjects();
  saveForm();
}

function toggleHistory() {
  showHistory = !showHistory;
  document.getElementById("history-btn").className = "btn-pill" + (showHistory ? " active-history" : "");
  const panel = document.getElementById("history-panel");
  panel.style.display = showHistory ? "block" : "none";
  if (showHistory) renderHistory();
}

// ─── Subject Rendering ────────────────────────────────────────────────────────

function buildGradeSelect(options, value, onChange) {
  const sel = document.createElement("select");
  sel.className = "grade-select";
  const ph = document.createElement("option"); ph.value=""; ph.textContent="Select grade";
  sel.appendChild(ph);
  options.forEach(o => {
    const opt = document.createElement("option");
    opt.value = o.gp; opt.textContent = o.label;
    if (value !== null && Math.abs(o.gp - value) < 0.001) opt.selected = true;
    sel.appendChild(opt);
  });
  sel.onchange = () => onChange(sel.value === "" ? null : parseFloat(sel.value));
  return sel;
}

function buildMarksInput(max, value, onChange) {
  const wrap = document.createElement("div"); wrap.className = "marks-row";
  const inp  = document.createElement("input");
  inp.type="number"; inp.min=0; inp.max=max; inp.step=0.5;
  inp.className="marks-input"; inp.value=value; inp.placeholder=`0–${max}`;
  const badge = document.createElement("span"); badge.className="marks-grade-badge";
  badge.style.display = "none";

  function refresh() {
    const n = parseFloat(inp.value);
    const valid = !isNaN(n) && n>=0 && n<=max;
    let gp = null;
    if (valid) { if(max===75)gp=gpFromMarks75(n); else if(max===50)gp=gpFromMarks50(n); else gp=gpFromMarks25(n); }
    const grade = gp!==null ? gradeLetterFromGP(gp) : null;
    if (grade) {
      badge.textContent = grade;
      badge.style.color = GRADE_COLOR[grade];
      badge.style.background = GRADE_BG[grade];
      badge.style.display = "";
    } else {
      badge.style.display = "none";
    }
    inp.style.borderColor = (valid||!inp.value) ? "rgba(255,255,255,0.1)" : "rgba(239,68,68,0.5)";
    onChange(inp.value, gp);
  }
  inp.oninput = refresh;
  if (value) refresh();
  wrap.appendChild(inp); wrap.appendChild(badge);
  return wrap;
}

function buildMiniGPA(entry) {
  if (entry.theoryGP===null || entry.practicalGP===null) return null;
  const total = entry.def.theoryCH + entry.def.practicalCH;
  const gp    = Math.round(((entry.theoryGP*entry.def.theoryCH + entry.practicalGP*entry.def.practicalCH)/total)*10)/10;
  const grade = gradeLetterFromGP(gp);
  const div   = document.createElement("div"); div.className="subject-gpa-mini";
  div.innerHTML = `<span class="label">Subject GPA</span><span style="font-weight:700;color:${GRADE_COLOR[grade]}">${grade} (${gp.toFixed(1)})</span>`;
  return div;
}

function buildSubjectCardBody(entry, onTheory, onPractical) {
  const frag = document.createDocumentFragment();

  const thG = document.createElement("div"); thG.className="field-group";
  const thL = document.createElement("div"); thL.className="field-label"; thL.textContent=`Theory (${entry.def.theoryMarks})`;
  thG.appendChild(thL);
  if (marksMode) {
    thG.appendChild(buildMarksInput(entry.def.theoryMarks, entry.theoryMarks, (v,gp)=>{ entry.theoryMarks=v; entry.theoryGP=gp; onTheory(gp); }));
  } else {
    thG.appendChild(buildGradeSelect(entry.def.theoryOptions, entry.theoryGP, gp=>{ entry.theoryGP=gp; onTheory(gp); }));
  }

  const prG = document.createElement("div"); prG.className="field-group";
  const prL = document.createElement("div"); prL.className="field-label"; prL.textContent=`Internal (${entry.def.practicalMarks})`;
  prG.appendChild(prL);
  if (marksMode) {
    prG.appendChild(buildMarksInput(entry.def.practicalMarks, entry.practicalMarks, (v,gp)=>{ entry.practicalMarks=v; entry.practicalGP=gp; onPractical(gp); }));
  } else {
    prG.appendChild(buildGradeSelect(entry.def.practicalOptions, entry.practicalGP, gp=>{ entry.practicalGP=gp; onPractical(gp); }));
  }

  frag.appendChild(thG); frag.appendChild(prG);
  return frag;
}

function renderSubjects() {
  // ── Compulsory ──
  const compGrid = document.getElementById("comp-grid"); compGrid.innerHTML="";
  compEntries.forEach((entry, i) => {
    const card  = document.createElement("div"); card.className="subject-card";
    const title = document.createElement("div"); title.className="subject-card-title"; title.textContent=entry.def.shortName;
    card.appendChild(title);
    const ref = {el:null};
    card.appendChild(buildSubjectCardBody(entry,
      ()=>{ updateMini(card,entry,ref); saveForm(); },
      ()=>{ updateMini(card,entry,ref); saveForm(); }
    ));
    const existing = buildMiniGPA(entry);
    if (existing) { card.appendChild(existing); ref.el=existing; }
    compGrid.appendChild(card);
  });

  // ── Optional ──
  const optGrid  = document.getElementById("opt-grid"); optGrid.innerHTML="";
  const optList  = stream==="Management" ? MGMT_OPT : SCI_OPT;
  optEntries.forEach((entry, i) => {
    const outer = document.createElement("div"); outer.className="opt-card";

    const sw = document.createElement("div"); sw.className="opt-select-wrap";
    const sl = document.createElement("div"); sl.className="field-label"; sl.textContent="Subject";
    const sel= document.createElement("select"); sel.className="grade-select";
    optList.forEach((o,oi)=>{
      const op=document.createElement("option"); op.value=oi; op.textContent=o.label;
      if (o.def.code===entry.def.code) op.selected=true;
      sel.appendChild(op);
    });
    sel.onchange = () => {
      const o = optList[parseInt(sel.value)];
      optEntries[i] = {def:o.def, theoryGP:null, practicalGP:null, theoryMarks:"", practicalMarks:""};
      renderSubjects(); saveForm();
    };
    sw.appendChild(sl); sw.appendChild(sel);
    outer.appendChild(sw);

    const ref = {el:null};
    outer.appendChild(buildSubjectCardBody(entry,
      ()=>{ updateMini(outer,entry,ref); saveForm(); },
      ()=>{ updateMini(outer,entry,ref); saveForm(); }
    ));
    const existing = buildMiniGPA(entry);
    if (existing) { outer.appendChild(existing); ref.el=existing; }
    optGrid.appendChild(outer);
  });
}

function updateMini(card, entry, ref) {
  if (ref.el) { ref.el.remove(); ref.el=null; }
  const mini = buildMiniGPA(entry);
  if (mini) { card.appendChild(mini); ref.el=mini; }
  updateLiveBar(); updateCalcBtn();
}

// ─── Live Bar ─────────────────────────────────────────────────────────────────

function getLiveResult() {
  const all    = [...compEntries,...optEntries];
  const filled = all.filter(e=>e.theoryGP!==null&&e.practicalGP!==null);
  if (!filled.length) return null;
  let tp=0, tc=0, hasNG=false;
  filled.forEach(e => {
    if (e.theoryGP===0.0) hasNG=true;
    const gp = e.theoryGP===0 ? 0 : Math.round(((e.theoryGP*e.def.theoryCH + e.practicalGP*e.def.practicalCH)/(e.def.theoryCH+e.def.practicalCH))*10)/10;
    tp += gp*(e.def.theoryCH+e.def.practicalCH); tc += e.def.theoryCH+e.def.practicalCH;
  });
  const gpa = tc>0 ? Math.round((tp/tc)*100)/100 : 0;
  return {gpa, grade:gradeLetterFromGP(gpa), hasNG, filledCount:filled.length, totalCount:6};
}

function updateLiveBar() {
  const live = getLiveResult();
  const wrap = document.getElementById("live-bar-wrap");
  if (!live) { wrap.style.display="none"; return; }
  wrap.style.display="";
  const ng = live.hasNG, color = ng?"#f87171":"#fbbf24";
  wrap.innerHTML = `
    <div class="live-bar ${ng?"fail":"normal"}">
      <div>
        <div style="display:flex;align-items:baseline">
          <span class="live-gpa-num" style="color:${color}">${ng?"NG":live.gpa.toFixed(2)}</span>
          <span class="live-gpa-label">Live GPA Preview</span>
        </div>
        <div class="live-filled">${live.filledCount} of ${live.totalCount} subjects filled</div>
        ${ng?'<div class="live-ng-warn">⚠ One or more subjects failed — overall GPA is NG</div>':""}
      </div>
      <div class="live-grade-right">
        <div class="live-grade-big" style="color:${color}">${live.grade}</div>
        <div class="live-grade-sub">${ng?"Failed":"/ 4.00"}</div>
      </div>
    </div>`;
}

function updateCalcBtn() {
  const all   = [...compEntries,...optEntries];
  const count = all.filter(e=>e.theoryGP!==null&&e.practicalGP!==null).length;
  const can   = count===6;
  const btn   = document.getElementById("calc-btn");
  const hint  = document.getElementById("calc-left-hint");
  btn.className = "calc-btn" + (can?" ready":" disabled");
  if (!can && count>0) { hint.style.display=""; hint.textContent=`(${6-count} left)`; }
  else { hint.style.display="none"; }
}

// ─── Compute Result ───────────────────────────────────────────────────────────

function computeSubjectResult(entry) {
  if (entry.theoryGP===null||entry.practicalGP===null) return null;
  const {def,theoryGP,practicalGP} = entry;
  if (theoryGP===0.0) return {
    subjectCode:def.code, subjectCodeName:def.name, shortName:def.shortName,
    theoryCH:def.theoryCH, practicalCH:def.practicalCH,
    theoryGrade:theoryGP, practicalGrade:practicalGP,
    finalGradeLetter:"NG", finalGP:0.0
  };
  const gp = Math.round(((theoryGP*def.theoryCH + practicalGP*def.practicalCH)/(def.theoryCH+def.practicalCH))*10)/10;
  return {
    subjectCode:def.code, subjectCodeName:def.name, shortName:def.shortName,
    theoryCH:def.theoryCH, practicalCH:def.practicalCH,
    theoryGrade:theoryGP, practicalGrade:practicalGP,
    finalGradeLetter:gradeLetterFromGP(gp), finalGP:gp
  };
}

function handleCalculate() {
  const all = [...compEntries,...optEntries];
  if (all.some(e=>e.theoryGP===null||e.practicalGP===null)) return;
  const subjects   = all.map(computeSubjectResult).filter(Boolean);
  const hasNG      = subjects.some(s=>s.finalGradeLetter==="NG");
  let finalGPA=0, totalCH=0;
  if (!hasNG) {
    let tp=0; subjects.forEach(s=>{ tp+=s.finalGP*(s.theoryCH+s.practicalCH); totalCH+=s.theoryCH+s.practicalCH; });
    finalGPA = totalCH>0 ? Math.round((tp/totalCH)*100)/100 : 0;
  } else {
    subjects.forEach(s=>{ totalCH+=s.theoryCH+s.practicalCH; });
  }
  const grade = hasNG?"NG":gradeLetterFromGP(finalGPA);
  const name  = document.getElementById("student-name").value || "Student";
  const issueDate = new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
  currentResult = {studentName:name, stream, finalGPA, finalGradeLetter:grade, totalCH, subjects, issueDate};
  if (finalGPA>=3.6&&!hasNG) launchConfetti();
  openModal(currentResult);
}

// ─── Confetti ─────────────────────────────────────────────────────────────────

function launchConfetti() {
  const c = document.getElementById("confetti-container"); c.innerHTML="";
  const colors=["#f59e0b","#10b981","#6366f1","#ec4899","#3b82f6","#f97316"];
  for (let i=0;i<60;i++) {
    const el=document.createElement("div"); el.className="confetti-piece";
    el.style.left=Math.random()*100+"%"; el.style.top="-10px";
    el.style.background=colors[i%colors.length];
    el.style.animationName="confetti-fall";
    el.style.animationDuration=(1.5+Math.random()*2)+"s";
    el.style.animationTimingFunction="ease-in";
    el.style.animationDelay=(Math.random()*1.5)+"s";
    el.style.animationFillMode="forwards";
    el.style.transform=`rotate(${Math.random()*360}deg)`;
    c.appendChild(el);
  }
  setTimeout(()=>{ c.innerHTML=""; },4000);
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function openModal(result) {
  whatifOverrides = {}; activeTab="sheet";
  document.getElementById("modal-sub").textContent=`${result.studentName} · ${result.stream}`;
  renderGaugeSummary(result);
  renderGradeBreakdown(result);
  renderSubjectBars(result);
  renderModalTabs(result);
  renderTabContent(result);
  document.getElementById("modal-overlay").style.display="flex";
  document.body.style.overflow="hidden";
}

function closeModal() {
  document.getElementById("modal-overlay").style.display="none";
  document.body.style.overflow="";
}

function handleOverlayClick(e) {
  if (e.target===document.getElementById("modal-overlay")) closeModal();
}

function getMotivational(gpa) {
  if (gpa>=3.9) return {text:"Exceptional! Near-perfect GPA — Summa Cum Laude!",emoji:"🏆"};
  if (gpa>=3.6) return {text:"Outstanding! You've earned an A — keep shining!",emoji:"⭐"};
  if (gpa>=3.2) return {text:"Very good! A little more effort and you'll hit that A!",emoji:"👏"};
  if (gpa>=2.8) return {text:"Good job! Stay consistent and push higher!",emoji:"💪"};
  if (gpa>=2.4) return {text:"You're passing! Focus more to improve your grades.",emoji:"📚"};
  if (gpa>=2.0) return {text:"Keep studying hard, improvement is within reach!",emoji:"🌱"};
  return {text:"Don't give up! Every effort takes you forward.",emoji:"💡"};
}

function renderGaugeSummary(result) {
  const {finalGPA:gpa, finalGradeLetter:grade} = result;
  const isNG = grade==="NG";
  const r=60, circ=2*Math.PI*r;
  const dash  = isNG?0:Math.min(gpa/4.0,1)*circ;
  const color = isNG?"#ef4444":gpa>=3.6?"#10b981":gpa>=2.8?"#f59e0b":"#ef4444";

  document.getElementById("gauge-track").style.stroke = isNG?"rgba(239,68,68,0.15)":"#2d3561";
  const fill = document.getElementById("gauge-fill");
  fill.style.stroke=color; fill.style.strokeDasharray=`${dash} ${circ}`;

  const center = document.getElementById("gauge-center");
  center.innerHTML = isNG
    ? `<div class="gauge-ng">NG</div><div class="gauge-ng-sub">NOT GRADED</div>`
    : `<div class="gauge-gpa" style="color:${color}">${gpa.toFixed(2)}</div><div class="gauge-grade" style="color:${color}">${grade}</div><div class="gauge-max">/ 4.00</div>`;

  const {text,emoji} = isNG?{text:"One or more subjects failed. Keep pushing forward!",emoji:"💪"}:getMotivational(gpa);
  document.getElementById("summary-emoji").textContent=emoji;
  document.getElementById("summary-msg").textContent=text;
  document.getElementById("summary-chips").innerHTML=`
    <span class="chip">${result.totalCH.toFixed(2)} Credit Hours</span>
    <span class="chip">${result.subjects.length} Subjects</span>
    <span class="chip chip-grade">${grade} Grade</span>`;
}

function renderGradeBreakdown(result) {
  const order=["A+","A","B+","B","C+","C","D","NG"], counts={};
  result.subjects.forEach(s=>{ counts[s.finalGradeLetter]=(counts[s.finalGradeLetter]||0)+1; });
  const wrap=document.getElementById("grade-breakdown");
  wrap.innerHTML=`<span class="label">Grade breakdown:</span>`;
  order.filter(g=>counts[g]).forEach(g=>{
    const sp=document.createElement("span"); sp.className="grade-pill";
    sp.style.background=GRADE_BG[g]; sp.style.color=GRADE_COLOR[g];
    sp.style.border=`1px solid ${GRADE_COLOR[g]}40`;
    sp.textContent=`${g} ×${counts[g]}`;
    wrap.appendChild(sp);
  });
}

function renderSubjectBars(result) {
  const wrap=document.getElementById("subject-bars"); wrap.innerHTML="";
  result.subjects.forEach(s=>{
    const pct=(s.finalGP/4.0)*100;
    const color=s.finalGP>=3.6?"#10b981":s.finalGP>=2.8?"#f59e0b":"#ef4444";
    const name=s.shortName||s.subjectCodeName.split(" ").map(w=>w[0]+w.slice(1).toLowerCase()).join(" ");
    const row=document.createElement("div"); row.className="bar-row";
    row.innerHTML=`
      <div class="bar-name" title="${name}">${name}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${color}"></div></div>
      <div class="bar-grade" style="color:${GRADE_COLOR[s.finalGradeLetter]}">${s.finalGradeLetter}</div>
      <div class="bar-gp">${s.finalGP.toFixed(1)}</div>`;
    wrap.appendChild(row);
  });
}

const TABS_DEF = [
  {id:"sheet",  label:"Grade Sheet", icon:"📋"},
  {id:"whatif", label:"What-If",     icon:"🤔"},
  {id:"target", label:"Target",      icon:"🎯"},
  {id:"uni",    label:"Programs",    icon:"🏛️"},
  {id:"achieve",label:"Badges",      icon:"🏅"},
];

function renderModalTabs(result) {
  const achievements=getAchievements(result);
  const unlocked=achievements.filter(a=>a.unlocked).length;
  const wrap=document.getElementById("modal-tabs"); wrap.innerHTML="";
  TABS_DEF.forEach(t=>{
    const btn=document.createElement("button");
    btn.className="tab-btn"+(t.id===activeTab?" active":" inactive");
    btn.innerHTML=`${t.icon} ${t.id==="achieve"&&unlocked>0?`Badges (${unlocked})`:t.label}`;
    btn.onclick=()=>{ activeTab=t.id; renderModalTabs(result); renderTabContent(result); };
    wrap.appendChild(btn);
  });
}

function renderTabContent(result) {
  const wrap=document.getElementById("tab-content"); wrap.innerHTML="";
  if (activeTab==="sheet")   wrap.appendChild(buildGradeSheet(result));
  else if (activeTab==="whatif")  wrap.appendChild(buildWhatIf(result));
  else if (activeTab==="target")  wrap.appendChild(buildTargetGPA(result));
  else if (activeTab==="uni")     wrap.appendChild(buildUniversity(result));
  else if (activeTab==="achieve") wrap.appendChild(buildAchievements(result));
}

// ─── Grade Sheet ──────────────────────────────────────────────────────────────

function buildGradeSheet(result) {
  const div=document.createElement("div"); div.className="grade-sheet";
  const rows=result.subjects.map(s=>{
    const thG=gradeLetterFromGP(s.theoryGrade), prG=gradeLetterFromGP(s.practicalGrade);
    return `<tr>
      <td>${s.subjectCode}</td><td>${s.subjectCodeName} (TH)</td><td>${s.theoryCH.toFixed(2)}</td>
      <td style="font-weight:700;color:${GRADE_COLOR[thG]}">${thG}</td><td>${s.theoryGrade.toFixed(1)}</td>
      <td style="font-weight:700;color:${GRADE_COLOR[s.finalGradeLetter]}">${s.finalGradeLetter}</td><td>-</td>
    </tr><tr>
      <td></td><td style="padding-left:12px">${s.subjectCodeName} (IN)</td><td>${s.practicalCH.toFixed(2)}</td>
      <td style="font-weight:700;color:${GRADE_COLOR[prG]}">${prG}</td><td>${s.practicalGrade.toFixed(1)}</td>
      <td style="font-weight:700;color:${GRADE_COLOR[s.finalGradeLetter]}">${s.finalGradeLetter}</td><td>-</td>
    </tr>`;
  }).join("");
  div.innerHTML=`
    <div class="gs-center"><div class="gs-emblem">🏛️</div>
      <div class="gs-h1">GOVERNMENT OF NEPAL</div>
      <div class="gs-h2">NATIONAL EXAMINATION BOARD</div>
      <div class="gs-h1">SCHOOL LEAVING CERTIFICATE EXAMINATION</div>
      <div class="gs-h2">GRADE SHEET</div>
    </div>
    <hr class="gs-divider"/>
    <div class="gs-info">
      <p><strong>THE GRADE(S) SECURED BY :</strong> ${result.studentName}</p>
      <p><strong>DATE OF BIRTH :</strong> ................................................................</p>
      <p><strong>REGISTRATION NO</strong> ...................................... <strong>SYMBOL NO.:</strong> ...............</p>
      <p><strong>IN THE EXAMINATION CONDUCTED IN</strong> ........... B.S. (............ A.D.)</p>
    </div>
    <hr class="gs-divider" style="opacity:0.4"/>
    <table class="gs-table">
      <thead><tr><th>CODE</th><th>SUBJECT</th><th>CH</th><th>GRADE</th><th>GP</th><th>FG</th><th>REMARKS</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <hr class="gs-divider" style="opacity:0.4"/>
    <div class="gs-gpa-line">Grade Point Average (GPA) = <span style="color:#f59e0b">${result.finalGPA.toFixed(2)}</span></div>
    <hr class="gs-divider"/>
    <div class="gs-sigs">
      ${["PREPARED BY:","CHECKED BY:","HEAD TEACHER"].map(l=>`<div><div class="gs-sig-label">${l}</div><div style="margin-bottom:16px"></div><div class="gs-sig-line">................................</div></div>`).join("")}
    </div>
    <div class="gs-date">DATE OF ISSUE: ${result.issueDate}</div>`;
  return div;
}

// ─── What-If ──────────────────────────────────────────────────────────────────

function buildWhatIf(result) {
  const div=document.createElement("div");
  div.innerHTML=`<p class="tip-text">Adjust grades per subject to simulate different outcomes.</p>`;
  const resultBox=document.createElement("div");

  function getProjected() {
    let tp=0,tc=0;
    result.subjects.forEach(s=>{
      const th=whatifOverrides[s.subjectCode]?.th??s.theoryGrade;
      const pr=whatifOverrides[s.subjectCode]?.pr??s.practicalGrade;
      tp+=th*s.theoryCH+pr*s.practicalCH; tc+=s.theoryCH+s.practicalCH;
    });
    const gpa=tc>0?Math.round((tp/tc)*100)/100:0;
    return {gpa, grade:gradeLetterFromGP(gpa)};
  }

  function updateResult() {
    const {gpa,grade}=getProjected(), diff=gpa-result.finalGPA;
    const cls=diff>0.005?"diff-pos":diff<-0.005?"diff-neg":"diff-neu";
    resultBox.className="whatif-result";
    resultBox.innerHTML=`
      <div>
        <div class="whatif-new-label">New GPA</div>
        <div style="display:flex;align-items:baseline">
          <span class="whatif-new-gpa">${gpa.toFixed(2)}</span>
          <span class="whatif-new-grade">${grade}</span>
        </div>
      </div>
      <div>
        <div class="whatif-diff-label">vs Current</div>
        <div class="whatif-diff ${cls}">${diff>0.005?"+":""}${diff.toFixed(2)}</div>
      </div>`;
  }

  result.subjects.forEach(s=>{
    const name=s.shortName||s.subjectCodeName.split(" ").map(w=>w[0]+w.slice(1).toLowerCase()).join(" ");
    const thOpts=s.theoryCH>=3?T75:T50, prOpts=s.practicalCH<=1.25?I25:P50;
    const row=document.createElement("div"); row.className="whatif-grid";
    const nm=document.createElement("div"); nm.className="whatif-name"; nm.textContent=name; nm.title=name;

    const thS=document.createElement("select"); thS.className="whatif-select";
    thOpts.forEach(o=>{ const op=document.createElement("option"); op.value=o.gp; op.textContent=`${gradeLetterFromGP(o.gp)} (${o.gp.toFixed(1)}) TH`; const cur=whatifOverrides[s.subjectCode]?.th??s.theoryGrade; if(Math.abs(o.gp-cur)<0.001)op.selected=true; thS.appendChild(op); });
    thS.onchange=()=>{ whatifOverrides[s.subjectCode]={th:parseFloat(thS.value),pr:whatifOverrides[s.subjectCode]?.pr??s.practicalGrade}; updateResult(); };

    const prS=document.createElement("select"); prS.className="whatif-select";
    prOpts.forEach(o=>{ const op=document.createElement("option"); op.value=o.gp; op.textContent=`${gradeLetterFromGP(o.gp)} (${o.gp.toFixed(1)}) PR`; const cur=whatifOverrides[s.subjectCode]?.pr??s.practicalGrade; if(Math.abs(o.gp-cur)<0.001)op.selected=true; prS.appendChild(op); });
    prS.onchange=()=>{ whatifOverrides[s.subjectCode]={th:whatifOverrides[s.subjectCode]?.th??s.theoryGrade,pr:parseFloat(prS.value)}; updateResult(); };

    row.appendChild(nm); row.appendChild(thS); row.appendChild(prS);
    div.appendChild(row);
  });
  updateResult(); div.appendChild(resultBox); return div;
}

// ─── Target GPA ───────────────────────────────────────────────────────────────

function buildTargetGPA(result) {
  const div=document.createElement("div");
  div.innerHTML=`<p class="tip-text">See what GPA you need to hit your target overall.</p>`;
  let tv="3.6";
  const row=document.createElement("div"); row.className="target-row";
  const lbl=document.createElement("span"); lbl.className="target-label"; lbl.textContent="Target GPA:";
  const inp=document.createElement("input"); inp.type="number"; inp.min=0; inp.max=4; inp.step=0.1;
  inp.className="target-input"; inp.value=tv;
  const ps=document.createElement("div"); ps.className="target-presets";
  const box=document.createElement("div"); box.className="target-box";

  function refreshPresets() {
    ps.querySelectorAll(".preset-btn").forEach(b=>{ b.className="preset-btn"+(b.dataset.val===tv?" active":" inactive"); });
  }
  function refreshBox() {
    const tGPA=parseFloat(tv)||0;
    const already=result.finalGPA>=tGPA, bad=tGPA>4||tGPA<0;
    const gap=Math.round((tGPA-result.finalGPA)*100)/100;
    const tc=result.subjects.reduce((s,r)=>s+r.theoryCH+r.practicalCH,0);
    const cp=result.subjects.reduce((s,r)=>s+r.finalGP*(r.theoryCH+r.practicalCH),0);
    const avg=(tGPA*tc-cp)/tc;
    const ng=gradeLetterFromGP(Math.min(4,Math.max(0,avg)));
    if (bad) {
      box.innerHTML=`<div style="text-align:center;padding:8px 0"><div style="color:#fbbf24;font-weight:700">Target must be between 0.00 and 4.00</div></div>`;
    } else if (already) {
      box.innerHTML=`<div class="target-already"><div class="big">🎉</div><div class="ok">You already achieved this target!</div><div class="sub">Your GPA (${result.finalGPA.toFixed(2)}) ≥ Target (${tGPA.toFixed(2)})</div></div>`;
    } else {
      box.innerHTML=`
        <div class="target-stat"><span class="target-stat-label">Current GPA</span><span class="target-stat-val" style="color:var(--text-white)">${result.finalGPA.toFixed(2)}</span></div>
        <div class="target-stat"><span class="target-stat-label">Target GPA</span><span class="target-stat-val" style="color:#fbbf24">${tGPA.toFixed(2)}</span></div>
        <div class="target-stat border-t"><span class="target-stat-label">GPA Needed</span><span class="target-stat-val" style="color:#818cf8">+${gap.toFixed(2)}</span></div>
        <div class="target-stat"><span class="target-stat-label">Equivalent Grade Needed</span><span class="target-stat-val" style="color:${GRADE_COLOR[ng]}">${ng}</span></div>
        <div class="target-tip">💡 You need to consistently achieve <strong style="color:var(--text-main)">${ng}</strong> grades to reach your target of ${tGPA.toFixed(2)}.</div>`;
    }
  }
  inp.oninput=()=>{ tv=inp.value; refreshPresets(); refreshBox(); };
  ["2.8","3.2","3.6","4.0"].forEach(v=>{
    const b=document.createElement("button"); b.className="preset-btn"+(v===tv?" active":" inactive");
    b.dataset.val=v; b.textContent=v;
    b.onclick=()=>{ tv=v; inp.value=v; refreshPresets(); refreshBox(); };
    ps.appendChild(b);
  });
  row.appendChild(lbl); row.appendChild(inp); row.appendChild(ps);
  div.appendChild(row); refreshBox(); div.appendChild(box); return div;
}

// ─── University ───────────────────────────────────────────────────────────────

function buildUniversity(result) {
  const div=document.createElement("div");
  div.innerHTML=`<p class="uni-note">Based on your GPA of <span style="color:#fbbf24;font-weight:700">${result.finalGPA.toFixed(2)}</span>:</p>`;
  const s=result.stream.toLowerCase();
  const elig=UNIVERSITY_PROGRAMS.filter(p=>result.finalGPA>=p.minGPA&&(p.stream===s||p.stream==="both"));
  const not =UNIVERSITY_PROGRAMS.filter(p=>result.finalGPA<p.minGPA&&(p.stream===s||p.stream==="both"));
  elig.forEach(p=>{ div.innerHTML+=`<div class="uni-row eligible"><span class="uni-check uni-eligible-check">✓</span><div style="flex:1;min-width:0"><div class="uni-name">${p.name}</div><div class="uni-desc">${p.desc}</div></div><span class="uni-min">≥${p.minGPA.toFixed(1)}</span></div>`; });
  not.slice(0,3).forEach(p=>{ div.innerHTML+=`<div class="uni-row locked"><span class="uni-check uni-locked-check">✗</span><div style="flex:1;min-width:0"><div class="uni-name">${p.name}</div><div class="uni-desc">${p.desc}</div></div><span class="uni-min">≥${p.minGPA.toFixed(1)}</span></div>`; });
  return div;
}

// ─── Achievements ─────────────────────────────────────────────────────────────

function getAchievements(result) {
  const gpa=result.finalGPA;
  const allA=result.subjects.every(s=>s.finalGradeLetter==="A+"||s.finalGradeLetter==="A");
  const hasNG=result.subjects.some(s=>s.finalGradeLetter==="NG");
  return [
    {id:"perfect",title:"Perfect Scholar",desc:"GPA of 4.00",icon:"🏆",unlocked:gpa>=4.0},
    {id:"summa",  title:"Summa Cum Laude",desc:"GPA ≥ 3.6",  icon:"⭐",unlocked:gpa>=3.6},
    {id:"honor",  title:"Honor Roll",     desc:"GPA ≥ 3.2",  icon:"🎖️",unlocked:gpa>=3.2},
    {id:"allstar",title:"All-Star",       desc:"All A or A+", icon:"🌟",unlocked:allA},
    {id:"pass",   title:"Graduate",       desc:"GPA ≥ 2.0",  icon:"🎓",unlocked:gpa>=2.0&&!hasNG},
    {id:"comeback",title:"Fighter",       desc:"Completed all subjects",icon:"💪",unlocked:result.subjects.length>=6},
  ];
}

function buildAchievements(result) {
  const div=document.createElement("div"); div.className="achievements-grid";
  getAchievements(result).forEach(a=>{
    const c=document.createElement("div"); c.className="achievement-card "+(a.unlocked?"unlocked":"locked");
    c.innerHTML=`<div class="ach-icon">${a.icon}</div><div class="ach-title">${a.title}</div><div class="ach-desc">${a.desc}</div>`;
    div.appendChild(c);
  });
  return div;
}

// ─── Download / Copy ──────────────────────────────────────────────────────────

function copyResult() {
  if (!currentResult) return;
  const r=currentResult;
  const lines=r.subjects.map(s=>`${s.subjectCodeName}: TH=${gradeLetterFromGP(s.theoryGrade)} IN=${gradeLetterFromGP(s.practicalGrade)} → ${s.finalGradeLetter} (${s.finalGP.toFixed(1)})`).join("\n");
  navigator.clipboard.writeText(`NEB GPA: ${r.finalGPA.toFixed(2)} (${r.finalGradeLetter})\n${r.studentName} | ${r.stream} | ${r.issueDate}\n\n${lines}`).catch(()=>{});
}

function downloadTxt() {
  if (!currentResult) return;
  const r=currentResult;
  let t=`NEB GRADE 12 GRADE SHEET\n${"=".repeat(50)}\nStudent: ${r.studentName}\nStream: ${r.stream}\nDate: ${r.issueDate}\n\n`;
  t+=`${"SUBJECT".padEnd(22)} ${"TH".padEnd(4)} ${"IN".padEnd(4)} ${"FG".padEnd(4)} GP\n${"-".repeat(44)}\n`;
  r.subjects.forEach(s=>{ t+=`${s.subjectCodeName.padEnd(22)} ${gradeLetterFromGP(s.theoryGrade).padEnd(4)} ${gradeLetterFromGP(s.practicalGrade).padEnd(4)} ${s.finalGradeLetter.padEnd(4)} ${s.finalGP.toFixed(1)}\n`; });
  t+=`\n${"=".repeat(44)}\nFINAL GPA: ${r.finalGPA.toFixed(2)} (${r.finalGradeLetter})\nTotal Credit Hours: ${r.totalCH.toFixed(2)}\n`;
  dlFile(`NEB_GradeSheet_${r.studentName.replace(/\s+/g,"_")}.txt`, t, "text/plain");
}

function downloadHTML() {
  if (!currentResult) return;
  const r=currentResult;
  const rows=r.subjects.map(s=>{
    const tg=gradeLetterFromGP(s.theoryGrade),pg=gradeLetterFromGP(s.practicalGrade);
    return `<tr><td>${s.subjectCode}</td><td>${s.subjectCodeName} (TH)</td><td>${s.theoryCH.toFixed(2)}</td><td style="color:${GRADE_COLOR[tg]};font-weight:700">${tg}</td><td>${s.theoryGrade.toFixed(1)}</td><td style="color:${GRADE_COLOR[s.finalGradeLetter]};font-weight:700">${s.finalGradeLetter}</td><td>-</td></tr>
    <tr><td></td><td style="padding-left:16px">${s.subjectCodeName} (IN)</td><td>${s.practicalCH.toFixed(2)}</td><td style="color:${GRADE_COLOR[pg]};font-weight:700">${pg}</td><td>${s.practicalGrade.toFixed(1)}</td><td style="color:${GRADE_COLOR[s.finalGradeLetter]};font-weight:700">${s.finalGradeLetter}</td><td>-</td></tr>`;
  }).join("");
  const html=`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>NEB Grade Sheet - ${r.studentName}</title>
<style>@page{margin:2cm}*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Courier New',monospace;font-size:12px;color:#111;background:#fff;padding:30px}.border-box{border:2px solid #111;padding:24px;max-width:800px;margin:auto}.header{text-align:center;margin-bottom:18px}.header .emblem{font-size:36px;margin-bottom:6px}.header h2{font-size:14px;font-weight:bold;letter-spacing:1px;margin:3px 0}.header h3{font-size:11px;font-weight:bold;letter-spacing:2px;margin:2px 0}hr{border:none;border-top:2px solid #111;margin:12px 0}hr.thin{border-top:1px solid #555}.info p{margin:3px 0;font-size:11px;line-height:1.8}table{width:100%;border-collapse:collapse;margin:10px 0;font-size:11px}thead th{border-bottom:1px solid #111;border-top:1px solid #111;padding:4px 6px;font-weight:bold;text-align:left}tbody td{padding:3px 6px}.gpa{font-weight:bold;font-size:13px;margin:8px 0}.sigs{display:flex;justify-content:space-between;margin-top:28px;font-size:11px}.sig .label{font-weight:bold;margin-bottom:18px}.sig .line{border-top:1px solid #333;width:150px;padding-top:3px}.date{margin-top:14px;font-size:11px;font-weight:bold}</style></head><body>
<div class="border-box"><div class="header"><div class="emblem">🏛️</div><h2>GOVERNMENT OF NEPAL</h2><h3>NATIONAL EXAMINATION BOARD</h3><h2>SCHOOL LEAVING CERTIFICATE EXAMINATION</h2><h3>GRADE SHEET</h3></div><hr><div class="info"><p><strong>THE GRADE(S) SECURED BY :</strong> ${r.studentName}</p><p><strong>DATE OF BIRTH :</strong> ................................................................</p><p><strong>REGISTRATION NO</strong> ...................................... <strong>SYMBOL NO.:</strong> ...............</p><p><strong>IN THE EXAMINATION CONDUCTED IN</strong> ........... B.S. (............ A.D.)</p></div><hr class="thin"><table><thead><tr><th>SUBJECT CODE</th><th>SUBJECT</th><th>CH</th><th>GRADE</th><th>GP</th><th>FG</th><th>REMARKS</th></tr></thead><tbody>${rows}</tbody></table><hr class="thin"><p class="gpa">Grade Point Average (GPA) = <span style="color:#c27803">${r.finalGPA.toFixed(2)}</span></p><hr><div class="sigs">${["PREPARED BY:","CHECKED BY:","HEAD TEACHER"].map(l=>`<div class="sig"><div class="label">${l}</div><div class="line">................................</div></div>`).join("")}</div><div class="date">DATE OF ISSUE: ${r.issueDate}</div></div></body></html>`;
  dlFile(`NEB_GradeSheet_${r.studentName.replace(/\s+/g,"_")}.html`, html, "text/html");
}

function dlFile(name, content, type) {
  const blob=new Blob([content],{type}), url=URL.createObjectURL(blob);
  const a=document.createElement("a"); a.href=url; a.download=name; a.click();
  URL.revokeObjectURL(url);
}

// ─── History ──────────────────────────────────────────────────────────────────

function saveSemester() {
  if (!currentResult) return;
  const label=document.getElementById("semester-label").value||"Semester";
  records.unshift({id:Date.now().toString(), label, result:currentResult, savedAt:Date.now()});
  saveRecords(); closeModal();
  showHistory=true;
  document.getElementById("history-btn").className="btn-pill active-history";
  document.getElementById("history-panel").style.display="block";
  renderHistory();
}

function clearHistory() {
  if (!confirm("Clear all saved semesters?")) return;
  records=[]; saveRecords(); renderHistory();
}

function renderHistory() {
  const body=document.getElementById("history-body");
  if (!records.length) {
    body.innerHTML=`<div class="history-empty"><div class="big-icon">📚</div>No saved semesters yet. Calculate your GPA and click "Save Semester"!</div>`;
    return;
  }
  let html="";
  if (records.length>=2) html+=buildTrendChartHTML(records);
  html+=`<div style="margin-top:8px">`;
  records.forEach(rec=>{
    html+=`<div class="semester-row">
      <div class="sem-info"><div class="sem-label">${esc(rec.label)}</div><div class="sem-sub">${esc(rec.result.studentName)} · ${esc(rec.result.stream)}</div></div>
      <div class="sem-gpa">${rec.result.finalGPA.toFixed(2)}</div>
      <div class="sem-grade" style="color:${GRADE_COLOR[rec.result.finalGradeLetter]};background:${GRADE_BG[rec.result.finalGradeLetter]}">${rec.result.finalGradeLetter}</div>
      <button class="sem-view" onclick="viewRecord('${rec.id}')">View</button>
      <button class="sem-del" onclick="deleteRecord('${rec.id}')">×</button>
    </div>`;
  });
  html+=`</div>`;
  if (records.length>1) {
    const avg=records.reduce((s,r)=>s+r.result.finalGPA,0)/records.length;
    const best=Math.max(...records.map(r=>r.result.finalGPA));
    html+=`<div class="sem-stats">
      <div class="sem-stat-row"><span class="sem-stat-label">Avg GPA across ${records.length} semesters</span><span class="sem-stat-avg">${avg.toFixed(2)}</span></div>
      <div class="sem-stat-row"><span class="sem-stat-label">Best semester</span><span class="sem-stat-best">${best.toFixed(2)}</span></div>
    </div>`;
  }
  body.innerHTML=html;
}

function buildTrendChartHTML(recs) {
  const gpas=recs.map(r=>r.result.finalGPA);
  const minG=Math.max(0,Math.min(...gpas)-0.3), maxG=Math.min(4,Math.max(...gpas)+0.3), range=maxG-minG||1;
  const W=400,H=140,PAD=32, xStep=(W-PAD*2)/(recs.length-1);
  const pts=recs.map((r,i)=>({x:PAD+i*xStep, y:H-PAD-((r.result.finalGPA-minG)/range)*(H-PAD*2), gpa:r.result.finalGPA, label:r.label}));
  const pathD=pts.map((p,i)=>`${i===0?"M":"L"} ${p.x} ${p.y}`).join(" ");
  const areaD=`${pathD} L ${pts[pts.length-1].x} ${H-PAD} L ${PAD} ${H-PAD} Z`;
  const ticks=[0,1,2,3,4].map(t=>{ const y=H-PAD-((t-minG)/range)*(H-PAD*2); if(y<PAD||y>H-PAD)return ""; return `<line x1="${PAD}" y1="${y}" x2="${W-PAD}" y2="${y}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/><text x="${PAD-4}" y="${y+4}" fill="rgba(255,255,255,0.3)" font-size="9" text-anchor="end">${t.toFixed(1)}</text>`; }).join("");
  const circles=pts.map((p,i)=>`<circle cx="${p.x}" cy="${p.y}" r="5" fill="#6366f1" stroke="#fff" stroke-width="2"/><text x="${p.x}" y="${H-PAD+14}" fill="rgba(255,255,255,0.4)" font-size="9" text-anchor="middle">${p.label.slice(0,6)}</text><text x="${p.x}" y="${p.y-10}" fill="#f59e0b" font-size="9" text-anchor="middle" font-weight="bold">${p.gpa.toFixed(2)}</text>`).join("");
  return `<div style="width:100%;overflow-x:auto;margin-bottom:8px"><svg viewBox="0 0 ${W} ${H}" style="width:100%;min-width:280px"><defs><linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6366f1" stop-opacity="0.4"/><stop offset="100%" stop-color="#6366f1" stop-opacity="0"/></linearGradient></defs>${ticks}<path d="${areaD}" fill="url(#chartGrad)"/><path d="${pathD}" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${circles}</svg></div>`;
}

function viewRecord(id) {
  const rec=records.find(r=>r.id===id); if(!rec)return;
  currentResult=rec.result; openModal(rec.result);
}
function deleteRecord(id) {
  records=records.filter(r=>r.id!==id); saveRecords(); renderHistory();
}
function esc(s) { return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

// ─── Boot ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", init);
