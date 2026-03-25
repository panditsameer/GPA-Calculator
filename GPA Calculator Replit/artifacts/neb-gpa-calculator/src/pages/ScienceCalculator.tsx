import { useState, useMemo } from "react";
import ResultModal from "@/components/ResultModal";
import type { CalculationResult, SubjectResult } from "@/pages/Calculator";

const THEORY_GRADES_75 = [
  { label: "A+ (67.5-75)", value: 4.0 },
  { label: "A (60-67.5)", value: 3.6 },
  { label: "B+ (52.5-60)", value: 3.2 },
  { label: "B (45-52.5)", value: 2.8 },
  { label: "C+ (37.5-45)", value: 2.4 },
  { label: "C (30-37.5)", value: 2.0 },
  { label: "D (26.25-30)", value: 1.6 },
];

const PRACTICAL_GRADES_25 = [
  { label: "A+ (22.5-25)", value: 4.0 },
  { label: "A (20-22.5)", value: 3.6 },
  { label: "B+ (17.5-20)", value: 3.2 },
  { label: "B (15-17.5)", value: 2.8 },
  { label: "C+ (12.5-15)", value: 2.4 },
  { label: "C (10-12.5)", value: 2.0 },
  { label: "D (8.75-10)", value: 1.6 },
];

const GRADES_50 = [
  { label: "A+ (45-50)", value: 4.0 },
  { label: "A (40-45)", value: 3.6 },
  { label: "B+ (35-40)", value: 3.2 },
  { label: "B (30-35)", value: 2.8 },
  { label: "C+ (25-30)", value: 2.4 },
  { label: "C (20-25)", value: 2.0 },
  { label: "D (17.5-20)", value: 1.6 },
];

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

function GradeSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: number }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition glass-input"
    >
      <option value="">Select Grade</option>
      {options.map((opt) => (
        <option key={opt.value} value={String(opt.value)}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function SubjectCard({
  title,
  theoryLabel,
  practicalLabel,
  theoryGrades,
  practicalGrades,
  theoryValue,
  practicalValue,
  onTheoryChange,
  onPracticalChange,
  extra,
}: {
  title: string;
  theoryLabel: string;
  practicalLabel: string;
  theoryGrades: { label: string; value: number }[];
  practicalGrades: { label: string; value: number }[];
  theoryValue: string;
  practicalValue: string;
  onTheoryChange: (v: string) => void;
  onPracticalChange: (v: string) => void;
  extra?: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 p-5 flex flex-col gap-3 glass-card">
      <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-base">{title}</h3>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{theoryLabel}</label>
        <GradeSelect value={theoryValue} onChange={onTheoryChange} options={theoryGrades} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{practicalLabel}</label>
        <GradeSelect value={practicalValue} onChange={onPracticalChange} options={practicalGrades} />
      </div>
      {extra}
    </div>
  );
}

export default function ScienceCalculator() {
  const [studentName, setStudentName] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const [optionalSubject, setOptionalSubject] = useState<"computer" | "biology">("computer");

  const [englishTheory, setEnglishTheory] = useState("");
  const [englishPractical, setEnglishPractical] = useState("");
  const [nepaliTheory, setNepaliTheory] = useState("");
  const [nepaliPractical, setNepaliPractical] = useState("");
  const [physicsTheory, setPhysicsTheory] = useState("");
  const [physicsPractical, setPhysicsPractical] = useState("");
  const [chemistryTheory, setChemistryTheory] = useState("");
  const [chemistryPractical, setChemistryPractical] = useState("");
  const [mathTheory, setMathTheory] = useState("");
  const [mathPractical, setMathPractical] = useState("");
  const [optTheory, setOptTheory] = useState("");
  const [optPractical, setOptPractical] = useState("");

  function handleOptSubjectChange(val: string) {
    setOptionalSubject(val as "computer" | "biology");
    setOptTheory("");
    setOptPractical("");
  }

  function makeSubject(
    name: string, subjectCode: string, subjectCodeName: string,
    theoryVal: string, practicalVal: string, creditHours: number, theoryRatio: number,
  ): SubjectResult {
    const theory = parseFloat(theoryVal);
    const practical = parseFloat(practicalVal);
    const theoryCH = Math.round(creditHours * theoryRatio * 100) / 100;
    const practicalCH = Math.round(creditHours * (1 - theoryRatio) * 100) / 100;
    const subjectGPA = (theory * theoryCH + practical * practicalCH) / creditHours;
    return {
      name, subjectCode, subjectCodeName,
      theoryGrade: theory, practicalGrade: practical,
      finalGrade: subjectGPA, finalGradeLetter: gpaToLetter(subjectGPA),
      creditHours, theoryCH, practicalCH, hasPractical: true,
    };
  }

  function calculate() {
    setError("");
    const isComputer = optionalSubject === "computer";
    const fields: [string, string, string][] = [
      [englishTheory, englishPractical, "English"],
      [nepaliTheory, nepaliPractical, "Nepali"],
      [physicsTheory, physicsPractical, "Physics"],
      [chemistryTheory, chemistryPractical, "Chemistry"],
      [mathTheory, mathPractical, "Mathematics"],
      [optTheory, optPractical, isComputer ? "Computer Science" : "Biology"],
    ];
    for (const [th, pr, name] of fields) {
      if (!th || !pr) { setError(`Please fill in all grades for ${name}.`); return; }
    }

    const subjects: SubjectResult[] = [
      makeSubject("Nepali",      "001", "COM.NEPALI",       nepaliTheory,    nepaliPractical,    3, 0.75),
      makeSubject("English",     "003", "COM.ENGLISH",      englishTheory,   englishPractical,   4, 0.75),
      makeSubject("Physics",     "011", "PHYSICS",          physicsTheory,   physicsPractical,   5, 0.75),
      makeSubject("Chemistry",   "012", "CHEMISTRY",        chemistryTheory, chemistryPractical, 5, 0.75),
      makeSubject("Mathematics", "013", "MATHEMATICS",      mathTheory,      mathPractical,      5, 0.75),
    ];
    if (isComputer) {
      subjects.push(makeSubject("Computer Science", "014", "COMPUTER SCIENCE", optTheory, optPractical, 5, 0.50));
    } else {
      subjects.push(makeSubject("Biology", "015", "BIOLOGY", optTheory, optPractical, 5, 0.75));
    }

    const totalCredits = subjects.reduce((sum, s) => sum + s.creditHours, 0);
    const weightedSum  = subjects.reduce((sum, s) => sum + s.finalGrade * s.creditHours, 0);
    const finalGPA     = weightedSum / totalCredits;

    const today = new Date();
    const issueDate = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;

    setResult({
      studentName: studentName || "Student",
      finalGPA: Math.round(finalGPA * 100) / 100,
      finalGrade: gpaToLetter(finalGPA),
      totalCredits, subjects, issueDate,
    });
    setShowModal(true);
  }

  const isComputer = optionalSubject === "computer";
  const optTheoryLabel    = isComputer ? "Theory (50)"    : "Theory (75)";
  const optPracticalLabel = isComputer ? "Practical (50)" : "Practical (25)";
  const optTheoryGrades   = isComputer ? GRADES_50 : THEORY_GRADES_75;
  const optPracticalGrades = isComputer ? GRADES_50 : PRACTICAL_GRADES_25;

  const liveGPA = useMemo(() => {
    const pairs: { gpa: number; ch: number }[] = [];
    if (englishTheory && englishPractical) {
      const t = parseFloat(englishTheory), p = parseFloat(englishPractical);
      pairs.push({ gpa: (t * 3 + p * 1) / 4, ch: 4 });
    }
    if (nepaliTheory && nepaliPractical) {
      const t = parseFloat(nepaliTheory), p = parseFloat(nepaliPractical);
      pairs.push({ gpa: (t * 2.25 + p * 0.75) / 3, ch: 3 });
    }
    for (const [th, pr] of [[physicsTheory, physicsPractical], [chemistryTheory, chemistryPractical], [mathTheory, mathPractical]] as [string,string][]) {
      if (th && pr) {
        const t = parseFloat(th), p = parseFloat(pr);
        pairs.push({ gpa: t * 0.75 + p * 0.25, ch: 5 });
      }
    }
    if (optTheory && optPractical) {
      const t = parseFloat(optTheory), p = parseFloat(optPractical);
      const ratio = isComputer ? 0.50 : 0.75;
      pairs.push({ gpa: t * ratio + p * (1 - ratio), ch: 5 });
    }
    if (pairs.length === 0) return null;
    const totalCH = pairs.reduce((s, p) => s + p.ch, 0);
    const totalPts = pairs.reduce((s, p) => s + p.gpa * p.ch, 0);
    return { gpa: Math.round(totalPts / totalCH * 100) / 100, filled: pairs.length, total: 6 };
  }, [englishTheory, englishPractical, nepaliTheory, nepaliPractical,
      physicsTheory, physicsPractical, chemistryTheory, chemistryPractical,
      mathTheory, mathPractical, optTheory, optPractical, isComputer]);

  return (
    <div>
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-6 mb-6 glass-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-1 flex-1 max-w-sm">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Student Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition placeholder:text-slate-400 dark:placeholder:text-slate-500 glass-input"
            />
          </div>
          <div className="flex flex-col gap-1 max-w-xs">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Optional Subject</label>
            <select
              value={optionalSubject}
              onChange={(e) => handleOptSubjectChange(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition glass-input"
            >
              <option value="computer">Computer Science</option>
              <option value="biology">Biology</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl px-4 py-3 text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <SubjectCard title="English"   theoryLabel="Theory (75)"   practicalLabel="Practical (25)"
          theoryGrades={THEORY_GRADES_75} practicalGrades={PRACTICAL_GRADES_25}
          theoryValue={englishTheory} practicalValue={englishPractical}
          onTheoryChange={setEnglishTheory} onPracticalChange={setEnglishPractical} />
        <SubjectCard title="Nepali"    theoryLabel="Theory (75)"   practicalLabel="Practical (25)"
          theoryGrades={THEORY_GRADES_75} practicalGrades={PRACTICAL_GRADES_25}
          theoryValue={nepaliTheory} practicalValue={nepaliPractical}
          onTheoryChange={setNepaliTheory} onPracticalChange={setNepaliPractical} />
        <SubjectCard title="Physics"   theoryLabel="Theory (75)"   practicalLabel="Practical (25)"
          theoryGrades={THEORY_GRADES_75} practicalGrades={PRACTICAL_GRADES_25}
          theoryValue={physicsTheory} practicalValue={physicsPractical}
          onTheoryChange={setPhysicsTheory} onPracticalChange={setPhysicsPractical} />
        <SubjectCard title="Chemistry" theoryLabel="Theory (75)"   practicalLabel="Practical (25)"
          theoryGrades={THEORY_GRADES_75} practicalGrades={PRACTICAL_GRADES_25}
          theoryValue={chemistryTheory} practicalValue={chemistryPractical}
          onTheoryChange={setChemistryTheory} onPracticalChange={setChemistryPractical} />
        <SubjectCard title="Mathematics" theoryLabel="Theory (75)" practicalLabel="Practical (25)"
          theoryGrades={THEORY_GRADES_75} practicalGrades={PRACTICAL_GRADES_25}
          theoryValue={mathTheory} practicalValue={mathPractical}
          onTheoryChange={setMathTheory} onPracticalChange={setMathPractical} />
        <SubjectCard
          title={isComputer ? "Computer Science" : "Biology"}
          theoryLabel={optTheoryLabel} practicalLabel={optPracticalLabel}
          theoryGrades={optTheoryGrades} practicalGrades={optPracticalGrades}
          theoryValue={optTheory} practicalValue={optPractical}
          onTheoryChange={setOptTheory} onPracticalChange={setOptPractical} />
      </div>

      {liveGPA && (
        <div className="mb-5 flex items-center gap-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 rounded-xl px-5 py-3.5 transition-all">
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{liveGPA.gpa.toFixed(2)}</div>
          <div>
            <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Live GPA Preview</div>
            <div className="text-xs text-emerald-500 dark:text-emerald-400">{liveGPA.filled} of {liveGPA.total} subjects filled</div>
          </div>
          <div className="ml-auto text-xl font-bold" style={{ color: liveGPA.gpa > 3.6 ? "#059669" : liveGPA.gpa > 2.8 ? "#ca8a04" : liveGPA.gpa > 1.6 ? "#ea580c" : "#dc2626" }}>
            {gpaToLetter(liveGPA.gpa)}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={calculate}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg transition text-base"
        >
          🎓 Calculate GPA
        </button>
      </div>

      {showModal && result && (
        <ResultModal result={result} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
