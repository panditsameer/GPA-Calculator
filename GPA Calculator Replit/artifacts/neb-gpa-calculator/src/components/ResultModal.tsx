import { useState, useEffect, useRef, useCallback } from "react";
import type { CalculationResult, SubjectResult } from "@/pages/Calculator";

const GRADE_POINTS = [4.0, 3.6, 3.2, 2.8, 2.4, 2.0, 1.6];

function gpaToLetter(gpa: number): string {
  if (gpa > 3.60) return "A+";
  if (gpa > 3.20) return "A";
  if (gpa > 2.80) return "B+";
  if (gpa > 2.40) return "B";
  if (gpa > 2.00) return "C+";
  if (gpa > 1.60) return "C";
  if (gpa >= 1.60) return "D";
  return "NG";
}

function gradeColor(grade: string) {
  if (grade === "A+" || grade === "A") return "#059669";
  if (grade === "B+" || grade === "B") return "#ca8a04";
  if (grade === "C+" || grade === "C") return "#ea580c";
  return "#dc2626";
}

function motivation(grade: string): { emoji: string; msg: string } {
  if (grade === "A+") return { emoji: "🏆", msg: "Outstanding! Top of the class — your dedication paid off brilliantly!" };
  if (grade === "A")  return { emoji: "🌟", msg: "Excellent! You're in the top academic tier. Keep pushing!" };
  if (grade === "B+") return { emoji: "👏", msg: "Very good! A little more effort and you'll hit that A!" };
  if (grade === "B")  return { emoji: "💪", msg: "Good job! Solid performance above the average." };
  if (grade === "C+") return { emoji: "📚", msg: "Passed! Focus on weaker subjects to improve your GPA." };
  if (grade === "C")  return { emoji: "✅", msg: "You passed. There's meaningful room to grow — keep at it." };
  if (grade === "D")  return { emoji: "⚠️", msg: "Minimum grade achieved. Seek academic support and aim higher next time." };
  return { emoji: "❌", msg: "Below passing. Don't give up — get support and try again." };
}

function GpaRing({ gpa, grade }: { gpa: number; grade: string }) {
  const [animated, setAnimated] = useState(0);
  const RADIUS = 56;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const fraction = Math.min(gpa / 4.0, 1);
  const color = gradeColor(grade);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(fraction), 100);
    return () => clearTimeout(timer);
  }, [fraction]);

  return (
    <div className="flex flex-col items-center">
      <svg width="144" height="144" viewBox="0 0 144 144">
        <circle cx="72" cy="72" r={RADIUS} fill="none" stroke="currentColor" strokeWidth="10"
          className="text-slate-200 dark:text-slate-700" />
        <circle
          cx="72" cy="72" r={RADIUS} fill="none"
          stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - animated)}
          transform="rotate(-90 72 72)"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
        />
        <text x="72" y="66" textAnchor="middle" fontSize="22" fontWeight="bold" fill={color}>{gpa.toFixed(2)}</text>
        <text x="72" y="86" textAnchor="middle" fontSize="13" fontWeight="600" fill={color}>{grade}</text>
        <text x="72" y="100" textAnchor="middle" fontSize="9" fill="gray">/ 4.00</text>
      </svg>
    </div>
  );
}

function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d")!;
    const colors = ["#6366f1","#8b5cf6","#10b981","#f59e0b","#ef4444","#3b82f6","#ec4899","#06b6d4"];
    const particles = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      w: Math.random() * 10 + 4,
      h: Math.random() * 6 + 3,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 8,
      speed: Math.random() * 3.5 + 1.5,
      drift: (Math.random() - 0.5) * 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    let raf: number;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of particles) {
        p.y += p.speed; p.x += p.drift; p.angle += p.spin;
        if (p.y < canvas.height + 20) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (alive) raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[200]" />;
}

function WhatIfSection({ original }: { original: CalculationResult }) {
  const [grades, setGrades] = useState<{ theory: number; practical: number }[]>(
    original.subjects.map(s => ({ theory: s.theoryGrade!, practical: s.practicalGrade! }))
  );

  const liveGPA = (() => {
    let totalPts = 0, totalCH = 0;
    original.subjects.forEach((s, i) => {
      const t = grades[i].theory, p = grades[i].practical;
      totalPts += t * s.theoryCH + p * s.practicalCH;
      totalCH += s.creditHours;
    });
    return Math.round(totalPts / totalCH * 100) / 100;
  })();

  const liveGrade = gpaToLetter(liveGPA);
  const diff = liveGPA - original.finalGPA;

  return (
    <div className="mt-4">
      <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
        🔮 What-If Analyzer
        <span className="text-xs font-normal text-slate-400 dark:text-slate-500">Change grades to see updated GPA</span>
      </h3>
      <div className="space-y-2 mb-4">
        {original.subjects.map((s, i) => (
          <div key={i} className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300 w-36 shrink-0">{s.name}</span>
            <div className="flex gap-1 flex-1">
              <select
                value={grades[i].theory}
                onChange={e => {
                  const updated = [...grades];
                  updated[i] = { ...updated[i], theory: parseFloat(e.target.value) };
                  setGrades(updated);
                }}
                className="flex-1 text-xs rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 glass-input"
              >
                {GRADE_POINTS.map(g => (
                  <option key={g} value={g}>{gpaToLetter(g)} ({g.toFixed(1)}) TH</option>
                ))}
              </select>
              <select
                value={grades[i].practical}
                onChange={e => {
                  const updated = [...grades];
                  updated[i] = { ...updated[i], practical: parseFloat(e.target.value) };
                  setGrades(updated);
                }}
                className="flex-1 text-xs rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 glass-input"
              >
                {GRADE_POINTS.map(g => (
                  <option key={g} value={g}>{gpaToLetter(g)} ({g.toFixed(1)}) PR</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl px-4 py-3">
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400">New GPA</div>
          <div className="text-2xl font-bold" style={{ color: gradeColor(liveGrade) }}>{liveGPA.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Grade</div>
          <div className="text-xl font-bold" style={{ color: gradeColor(liveGrade) }}>{liveGrade}</div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-xs text-slate-500 dark:text-slate-400">Change</div>
          <div className={`text-lg font-bold ${diff >= 0 ? "text-emerald-600" : "text-red-500"}`}>
            {diff >= 0 ? "+" : ""}{diff.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

function buildNebText(result: CalculationResult): string {
  const line = "=".repeat(80);
  const dash = "-".repeat(71);
  const col = (s: string, w: number) => s.padEnd(w).slice(0, w);
  const rpad = (s: string, w: number) => s.padStart(w).slice(-w);
  let txt = "";
  txt += line + "\n";
  txt += "GOVERNMENT OF NEPAL\n";
  txt += "     NATIONAL EXAMINATION BOARD\n";
  txt += "SCHOOL LEAVING CERTIFICATE EXAMINATION\n";
  txt += "           GRADE SHEET\n";
  txt += line + "\n\n";
  txt += `THE GRADE(S) SECURED BY : ${result.studentName}\n`;
  txt += "DATE OF BIRTH : ................................................................\n";
  txt += "REGISTRATION NO ...................................... SYMBOL NO.: ...............\n";
  txt += "IN THE EXAMINATION CONDUCTED IN ........... B.S. (............ A.D.)\n\n";
  txt += col("SUBJECT CODE", 14) + col("SUBJECT", 27) + col("CH", 7) + col("GRADE", 7) + col("GP", 7) + col("FG", 6) + "REMARKS\n";
  txt += dash + "\n";
  for (const s of result.subjects) {
    const th = s.theoryGrade!;
    const ins = s.practicalGrade!;
    const fg = s.finalGradeLetter;
    txt += col(s.subjectCode, 14) + col(`${s.subjectCodeName} (TH)`, 27) + col(rpad(s.theoryCH.toFixed(2), 5), 7) + col(gpaToLetter(th), 7) + col(th.toFixed(1), 7) + col(fg, 6) + "-\n";
    txt += col("", 14) + col(`  ${s.subjectCodeName} (IN)`, 27) + col(rpad(s.practicalCH.toFixed(2), 5), 7) + col(gpaToLetter(ins), 7) + col(ins.toFixed(1), 7) + col(fg, 6) + "-\n";
  }
  txt += dash + "\n";
  txt += `Grade Point Average (GPA) = ${result.finalGPA.toFixed(2)}\n\n`;
  txt += line + "\n";
  txt += "PREPARED BY:                           CHECKED BY:                HEAD TEACHER\n";
  txt += "................................       ........................... ...........................\n";
  txt += `DATE OF ISSUE: ${result.issueDate}\n`;
  return txt;
}

function buildNebHtml(result: CalculationResult): string {
  const rows = result.subjects.map((s) => {
    const th = s.theoryGrade!;
    const ins = s.practicalGrade!;
    const fg = s.finalGradeLetter;
    return `
      <tr>
        <td>${s.subjectCode}</td><td>${s.subjectCodeName} (TH)</td>
        <td>${s.theoryCH.toFixed(2)}</td>
        <td style="color:${gradeColor(gpaToLetter(th))};font-weight:700">${gpaToLetter(th)}</td>
        <td>${th.toFixed(1)}</td>
        <td style="color:${gradeColor(fg)};font-weight:700">${fg}</td><td>-</td>
      </tr>
      <tr>
        <td></td><td style="padding-left:18px">${s.subjectCodeName} (IN)</td>
        <td>${s.practicalCH.toFixed(2)}</td>
        <td style="color:${gradeColor(gpaToLetter(ins))};font-weight:700">${gpaToLetter(ins)}</td>
        <td>${ins.toFixed(1)}</td>
        <td style="color:${gradeColor(fg)};font-weight:700">${fg}</td><td>-</td>
      </tr>`;
  }).join("");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>NEB Grade Sheet - ${result.studentName}</title>
  <style>
    @page{margin:2cm}*{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Courier New',monospace;font-size:12px;color:#111;background:#fff;padding:20px}
    .outer-border{border:2px solid #111;padding:20px}
    .header{text-align:center;margin-bottom:18px}
    .header h2{font-size:13px;font-weight:bold;letter-spacing:1px;margin:2px 0}
    .header h3{font-size:11px;font-weight:bold;letter-spacing:2px;margin:2px 0}
    hr{border:none;border-top:2px solid #111;margin:10px 0}hr.thin{border-top:1px solid #555}
    .info-section{margin:10px 0;font-size:11px;line-height:1.8}
    table{width:100%;border-collapse:collapse;margin:10px 0;font-size:11px}
    thead tr th{border-bottom:1px solid #111;border-top:1px solid #111;padding:4px 6px;font-weight:bold;text-align:left}
    tbody tr td{padding:3px 6px}
    .gpa-line{font-weight:bold;font-size:12px;margin:8px 0}
    .signatures{margin-top:30px;display:flex;justify-content:space-between;font-size:11px}
    .sig-block{text-align:center}.sig-block .label{font-weight:bold;margin-bottom:20px}
    .sig-block .line{border-top:1px solid #333;width:160px;margin:0 auto;padding-top:4px}
    .date-line{margin-top:16px;font-size:11px;font-weight:bold}
    @media print{body{padding:0}.no-print{display:none!important}}
  </style></head><body>
  <div class="outer-border">
    <div class="header"><div style="font-size:32px;margin-bottom:6px">🏛️</div>
      <h2>GOVERNMENT OF NEPAL</h2><h3>NATIONAL EXAMINATION BOARD</h3>
      <h2>SCHOOL LEAVING CERTIFICATE EXAMINATION</h2><h3>GRADE SHEET</h3>
    </div><hr>
    <div class="info-section">
      <p><strong>THE GRADE(S) SECURED BY :</strong> ${result.studentName}</p>
      <p><strong>DATE OF BIRTH :</strong> ................................................................</p>
      <p><strong>REGISTRATION NO</strong> ...................................... <strong>SYMBOL NO.:</strong> ...............</p>
      <p><strong>IN THE EXAMINATION CONDUCTED IN</strong> ........... B.S. (............ A.D.)</p>
    </div><hr class="thin">
    <table><thead><tr>
      <th style="width:80px">SUBJECT CODE</th><th>SUBJECT</th>
      <th style="width:50px">CH</th><th style="width:55px">GRADE</th>
      <th style="width:50px">GP</th><th style="width:45px">FG</th><th style="width:70px">REMARKS</th>
    </tr></thead><tbody>${rows}</tbody></table>
    <hr class="thin">
    <p class="gpa-line">Grade Point Average (GPA) = ${result.finalGPA.toFixed(2)}</p><hr>
    <div class="signatures">
      <div class="sig-block"><div class="label">PREPARED BY:</div><div class="line">................................</div></div>
      <div class="sig-block"><div class="label">CHECKED BY:</div><div class="line">................................</div></div>
      <div class="sig-block"><div class="label">HEAD TEACHER</div><div class="line">................................</div></div>
    </div>
    <div class="date-line">DATE OF ISSUE: ${result.issueDate}</div>
  </div></body></html>`;
}

export default function ResultModal({ result, onClose }: { result: CalculationResult; onClose: () => void }) {
  const [tab, setTab] = useState<"sheet" | "whatif">("sheet");
  const [copied, setCopied] = useState(false);
  const showConfetti = result.finalGrade === "A+";
  const { emoji, msg } = motivation(result.finalGrade);

  const gradeDist = result.subjects.reduce<Record<string, number>>((acc, s) => {
    acc[s.finalGradeLetter] = (acc[s.finalGradeLetter] ?? 0) + 1;
    return acc;
  }, {});

  function handleSavePDF() {
    const html = buildNebHtml(result);
    const win = window.open("", "_blank", "width=900,height=700");
    if (!win) return;
    win.document.write(html); win.document.close(); win.focus();
    setTimeout(() => win.print(), 500);
  }

  function handleSaveText() {
    const blob = new Blob([buildNebText(result)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `NEB_GradeSheet_${result.studentName.replace(/\s+/g, "_")}.txt`;
    a.click(); URL.revokeObjectURL(url);
  }

  function handleCopy() {
    const lines = result.subjects.map(s =>
      `${s.name}: TH=${gpaToLetter(s.theoryGrade!)} PR=${gpaToLetter(s.practicalGrade!)} → ${s.finalGradeLetter}`
    ).join("\n");
    const text = `NEB GPA Result — ${result.studentName}\nGPA: ${result.finalGPA.toFixed(2)} (${result.finalGrade})\nTotal Credits: ${result.totalCredits}\n\n${lines}\n\nDate: ${result.issueDate}`;
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  return (
    <>
      {showConfetti && <Confetti />}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto border border-slate-100 dark:border-gray-700 glass-card">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 z-10 rounded-t-2xl glass-card">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-gray-100">GPA Result</h2>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">{result.studentName}</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 text-2xl leading-none transition">&times;</button>
          </div>

          <div className="p-6">
            {/* GPA Ring + motivational */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 bg-slate-50 dark:bg-gray-800/50 rounded-2xl p-5">
              <GpaRing gpa={result.finalGPA} grade={result.finalGrade} />
              <div className="flex-1 text-center sm:text-left">
                <div className="text-3xl mb-1">{emoji}</div>
                <p className="text-slate-700 dark:text-slate-200 font-medium text-sm leading-relaxed">{msg}</p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                  <span className="text-xs bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full font-medium">
                    {result.totalCredits} Credit Hours
                  </span>
                  <span className="text-xs bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full font-medium">
                    {result.subjects.length} Subjects
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: gradeColor(result.finalGrade) + "22", color: gradeColor(result.finalGrade) }}>
                    {result.finalGrade} Grade
                  </span>
                </div>
              </div>
            </div>

            {/* Grade distribution */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 self-center">Grade breakdown:</span>
              {Object.entries(gradeDist).sort().map(([g, count]) => (
                <span key={g} className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: gradeColor(g) + "22", color: gradeColor(g) }}>
                  {g} ×{count}
                </span>
              ))}
            </div>

            {/* Subject bars */}
            <div className="space-y-2 mb-6">
              {result.subjects.map((s, i) => {
                const pct = (s.finalGrade / 4.0) * 100;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-slate-600 dark:text-slate-300 w-28 shrink-0 font-medium truncate">{s.name}</span>
                    <div className="flex-1 bg-slate-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: gradeColor(s.finalGradeLetter), transitionDelay: `${i * 80}ms` }}
                      />
                    </div>
                    <span className="text-xs font-bold w-6 text-right" style={{ color: gradeColor(s.finalGradeLetter) }}>
                      {s.finalGradeLetter}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 w-10 text-right">{s.finalGrade.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>

            {/* Tab switcher */}
            <div className="flex rounded-xl border border-slate-200 dark:border-gray-700 overflow-hidden mb-4">
              <button onClick={() => setTab("sheet")}
                className={`flex-1 py-2 text-sm font-medium transition ${tab === "sheet" ? "bg-indigo-600 text-white" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-gray-800"}`}>
                📋 Grade Sheet
              </button>
              <button onClick={() => setTab("whatif")}
                className={`flex-1 py-2 text-sm font-medium transition ${tab === "whatif" ? "bg-indigo-600 text-white" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-gray-800"}`}>
                🔮 What-If
              </button>
            </div>

            {tab === "sheet" && (
              <div className="rounded-xl border-2 border-slate-700 dark:border-slate-500 overflow-hidden font-mono text-xs bg-white dark:bg-gray-900">
                <div className="text-center py-4 border-b-2 border-slate-700 dark:border-slate-500 bg-slate-50 dark:bg-gray-800">
                  <div className="text-2xl mb-1">🏛️</div>
                  <div className="font-bold tracking-widest text-sm dark:text-gray-100">GOVERNMENT OF NEPAL</div>
                  <div className="font-bold tracking-widest text-xs mt-0.5 dark:text-gray-200">NATIONAL EXAMINATION BOARD</div>
                  <div className="font-bold text-sm mt-0.5 dark:text-gray-100">SCHOOL LEAVING CERTIFICATE EXAMINATION</div>
                  <div className="font-bold tracking-widest text-xs mt-0.5 dark:text-gray-200">GRADE SHEET</div>
                </div>
                <div className="px-5 py-3 border-b border-slate-300 dark:border-slate-600 text-[11px] leading-6 dark:text-gray-200">
                  <div><strong>THE GRADE(S) SECURED BY :</strong> {result.studentName}</div>
                  <div><strong>DATE OF BIRTH :</strong> ................................................................</div>
                  <div><strong>REGISTRATION NO</strong> ...................................... <strong>SYMBOL NO.:</strong> ...............</div>
                  <div><strong>IN THE EXAMINATION CONDUCTED IN</strong> ........... B.S. (............ A.D.)</div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr className="border-b border-t border-slate-700 dark:border-slate-500 bg-slate-100 dark:bg-gray-800">
                        <th className="text-left px-3 py-2 font-bold w-20 dark:text-gray-200">SUBJECT CODE</th>
                        <th className="text-left px-2 py-2 font-bold dark:text-gray-200">SUBJECT</th>
                        <th className="text-center px-2 py-2 font-bold w-12 dark:text-gray-200">CH</th>
                        <th className="text-center px-2 py-2 font-bold w-14 dark:text-gray-200">GRADE</th>
                        <th className="text-center px-2 py-2 font-bold w-12 dark:text-gray-200">GP</th>
                        <th className="text-center px-2 py-2 font-bold w-12 dark:text-gray-200">FG</th>
                        <th className="text-center px-2 py-2 font-bold w-16 dark:text-gray-200">REMARKS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.subjects.map((s, i) => {
                        const th = s.theoryGrade!;
                        const ins = s.practicalGrade!;
                        const fg = s.finalGradeLetter;
                        const rowBg = i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-slate-50/50 dark:bg-gray-800/50";
                        return (
                          <>
                            <tr key={`${i}-th`} className={rowBg}>
                              <td className="px-3 py-1.5 font-medium dark:text-gray-300">{s.subjectCode}</td>
                              <td className="px-2 py-1.5 dark:text-gray-300">{s.subjectCodeName} (TH)</td>
                              <td className="px-2 py-1.5 text-center dark:text-gray-300">{s.theoryCH.toFixed(2)}</td>
                              <td className="px-2 py-1.5 text-center font-bold" style={{ color: gradeColor(gpaToLetter(th)) }}>{gpaToLetter(th)}</td>
                              <td className="px-2 py-1.5 text-center dark:text-gray-300">{th.toFixed(1)}</td>
                              <td className="px-2 py-1.5 text-center font-bold" style={{ color: gradeColor(fg) }}>{fg}</td>
                              <td className="px-2 py-1.5 text-center text-slate-400">-</td>
                            </tr>
                            <tr key={`${i}-in`} className={rowBg}>
                              <td className="px-3 py-1.5"></td>
                              <td className="px-2 py-1.5 pl-5 dark:text-gray-300">{s.subjectCodeName} (IN)</td>
                              <td className="px-2 py-1.5 text-center dark:text-gray-300">{s.practicalCH.toFixed(2)}</td>
                              <td className="px-2 py-1.5 text-center font-bold" style={{ color: gradeColor(gpaToLetter(ins)) }}>{gpaToLetter(ins)}</td>
                              <td className="px-2 py-1.5 text-center dark:text-gray-300">{ins.toFixed(1)}</td>
                              <td className="px-2 py-1.5 text-center font-bold" style={{ color: gradeColor(fg) }}>{fg}</td>
                              <td className="px-2 py-1.5 text-center text-slate-400">-</td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="px-5 py-3 border-t border-slate-700 dark:border-slate-500 font-bold text-sm dark:text-gray-100">
                  Grade Point Average (GPA) = <span className="text-indigo-700 dark:text-indigo-400">{result.finalGPA.toFixed(2)}</span>
                </div>
                <div className="px-5 py-4 border-t-2 border-slate-700 dark:border-slate-500 bg-slate-50 dark:bg-gray-800 text-[11px]">
                  <div className="flex justify-between mb-5">
                    {["PREPARED BY:", "CHECKED BY:", "HEAD TEACHER"].map(label => (
                      <div key={label} className="text-center">
                        <div className="font-bold mb-4 dark:text-gray-200">{label}</div>
                        <div className="border-t border-slate-500 pt-1 w-36 dark:text-gray-400">................................</div>
                      </div>
                    ))}
                  </div>
                  <div className="font-bold dark:text-gray-200">DATE OF ISSUE: {result.issueDate}</div>
                </div>
              </div>
            )}

            {tab === "whatif" && <WhatIfSection original={result} />}

            {/* Action buttons */}
            <div className="mt-5 flex flex-wrap gap-2 justify-end">
              <button onClick={handleCopy}
                className="inline-flex items-center gap-2 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-slate-700 dark:text-slate-200 font-medium px-4 py-2.5 rounded-xl transition text-sm border border-slate-200 dark:border-gray-600">
                {copied ? "✅ Copied!" : "📋 Copy Result"}
              </button>
              <button onClick={handleSaveText}
                className="inline-flex items-center gap-2 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-slate-700 dark:text-slate-200 font-medium px-4 py-2.5 rounded-xl transition text-sm border border-slate-200 dark:border-gray-600">
                📄 Download .txt
              </button>
              <button onClick={handleSavePDF}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl shadow transition text-sm">
                🖨️ Save as PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
