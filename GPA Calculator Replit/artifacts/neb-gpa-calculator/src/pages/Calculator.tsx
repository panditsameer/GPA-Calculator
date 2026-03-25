import { useState, useMemo } from "react";
import ResultModal from "@/components/ResultModal";

const THEORY_GRADES_75 = [
  { label: "A+ (67.5-75)", value: 4.0 },
  { label: "A (60-67.5)", value: 3.6 },
  { label: "B+ (52.5-60)", value: 3.2 },
  { label: "B (45-52.5)", value: 2.8 },
  { label: "C+ (37.5-45)", value: 2.4 },
  { label: "C (30-37.5)", value: 2.0 },
  { label: "D (26.25-30)", value: 1.6 },
];

const INTERNAL_GRADES_25 = [
  { label: "A+ (22.5-25)", value: 4.0 },
  { label: "A (20-22.5)", value: 3.6 },
  { label: "B+ (17.5-20)", value: 3.2 },
  { label: "B (15-17.5)", value: 2.8 },
  { label: "C+ (12.5-15)", value: 2.4 },
  { label: "C (10-12.5)", value: 2.0 },
  { label: "D (8.75-10)", value: 1.6 },
];

const THEORY_GRADES_100 = [
  { label: "A+ (90-100)", value: 4.0 },
  { label: "A (80-90)", value: 3.6 },
  { label: "B+ (70-80)", value: 3.2 },
  { label: "B (60-70)", value: 2.8 },
  { label: "C+ (50-60)", value: 2.4 },
  { label: "C (40-50)", value: 2.0 },
  { label: "D (35-40)", value: 1.6 },
];

const PRACTICAL_GRADES_50 = [
  { label: "A+ (45-50)", value: 4.0 },
  { label: "A (40-45)", value: 3.6 },
  { label: "B+ (35-40)", value: 3.2 },
  { label: "B (30-35)", value: 2.8 },
  { label: "C+ (25-30)", value: 2.4 },
  { label: "C (20-25)", value: 2.0 },
  { label: "D (17.5-20)", value: 1.6 },
];

interface SubjectConfig {
  name: string;
  totalMarks: number;
  theoryMarks: number;
  practicalMarks: number;
  creditHours: number;
  hasPractical: boolean;
  theoryGrades: typeof THEORY_GRADES_75;
  practicalGrades: typeof INTERNAL_GRADES_25;
}

const SUBJECT_CONFIGS: Record<string, SubjectConfig> = {
  accountancy: {
    name: "Accountancy",
    totalMarks: 100,
    theoryMarks: 75,
    practicalMarks: 25,
    creditHours: 5,
    hasPractical: true,
    theoryGrades: THEORY_GRADES_75,
    practicalGrades: INTERNAL_GRADES_25,
  },
  economics: {
    name: "Economics",
    totalMarks: 100,
    theoryMarks: 75,
    practicalMarks: 25,
    creditHours: 5,
    hasPractical: true,
    theoryGrades: THEORY_GRADES_75,
    practicalGrades: INTERNAL_GRADES_25,
  },
  computer: {
    name: "Computer Science",
    totalMarks: 100,
    theoryMarks: 50,
    practicalMarks: 50,
    creditHours: 5,
    hasPractical: true,
    theoryGrades: PRACTICAL_GRADES_50,
    practicalGrades: PRACTICAL_GRADES_50,
  },
  business: {
    name: "Business Studies",
    totalMarks: 100,
    theoryMarks: 75,
    practicalMarks: 25,
    creditHours: 5,
    hasPractical: true,
    theoryGrades: THEORY_GRADES_75,
    practicalGrades: INTERNAL_GRADES_25,
  },
  tourism: {
    name: "Tourism & Mountaineering",
    totalMarks: 100,
    theoryMarks: 75,
    practicalMarks: 25,
    creditHours: 5,
    hasPractical: true,
    theoryGrades: THEORY_GRADES_75,
    practicalGrades: INTERNAL_GRADES_25,
  },
  businessMath: {
    name: "Business Mathematics",
    totalMarks: 100,
    theoryMarks: 75,
    practicalMarks: 25,
    creditHours: 5,
    hasPractical: true,
    theoryGrades: THEORY_GRADES_75,
    practicalGrades: INTERNAL_GRADES_25,
  },
  hotel: {
    name: "Hotel Management",
    totalMarks: 100,
    theoryMarks: 75,
    practicalMarks: 25,
    creditHours: 5,
    hasPractical: true,
    theoryGrades: THEORY_GRADES_75,
    practicalGrades: INTERNAL_GRADES_25,
  },
};

export interface SubjectResult {
  name: string;
  subjectCode: string;
  subjectCodeName: string;
  theoryGrade: number | null;
  practicalGrade: number | null;
  finalGrade: number;
  finalGradeLetter: string;
  creditHours: number;
  theoryCH: number;
  practicalCH: number;
  hasPractical: boolean;
}

export interface CalculationResult {
  studentName: string;
  finalGPA: number;
  finalGrade: string;
  totalCredits: number;
  subjects: SubjectResult[];
  issueDate: string;
}

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

function finalSubjectGPA(theory: number, practical: number | null, hasPractical: boolean): number {
  if (!hasPractical || practical === null) return theory;
  return (theory + practical) / 2;
}

function GradeSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: number }[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition glass-input"
    >
      <option value="">{placeholder || "Select Grade"}</option>
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

export default function Calculator() {
  const [studentName, setStudentName] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const [mathSocialChoice, setMathSocialChoice] = useState<"math" | "social">("math");

  const [englishTheory, setEnglishTheory] = useState("");
  const [englishPractical, setEnglishPractical] = useState("");
  const [nepaliTheory, setNepaliTheory] = useState("");
  const [nepaliPractical, setNepaliPractical] = useState("");
  const [mathSocialTheory, setMathSocialTheory] = useState("");
  const [mathSocialPractical, setMathSocialPractical] = useState("");

  const [opt1Subject, setOpt1Subject] = useState("");
  const [opt1Theory, setOpt1Theory] = useState("");
  const [opt1Practical, setOpt1Practical] = useState("");

  const [opt2Subject, setOpt2Subject] = useState("");
  const [opt2Theory, setOpt2Theory] = useState("");
  const [opt2Practical, setOpt2Practical] = useState("");

  const [opt3Subject, setOpt3Subject] = useState("");
  const [opt3Theory, setOpt3Theory] = useState("");
  const [opt3Practical, setOpt3Practical] = useState("");

  function handleOptSubjectChange(opt: 1 | 2 | 3, val: string) {
    if (opt === 1) { setOpt1Subject(val); setOpt1Theory(""); setOpt1Practical(""); }
    if (opt === 2) { setOpt2Subject(val); setOpt2Theory(""); setOpt2Practical(""); }
    if (opt === 3) { setOpt3Subject(val); setOpt3Theory(""); setOpt3Practical(""); }
  }

  function handleMathSocialChoice(val: string) {
    setMathSocialChoice(val as "math" | "social");
    setMathSocialTheory("");
    setMathSocialPractical("");
  }

  function calculate() {
    setError("");

    if (!englishTheory || !englishPractical) {
      setError("Please fill in all grades for English.");
      return;
    }
    if (!nepaliTheory || !nepaliPractical) {
      setError("Please fill in all grades for Nepali.");
      return;
    }
    if (!mathSocialTheory || !mathSocialPractical) {
      setError(`Please fill in all grades for ${mathSocialChoice === "math" ? "Mathematics" : "Social Studies & Life Skills"}.`);
      return;
    }

    const opts = [
      { subject: opt1Subject, theory: opt1Theory, practical: opt1Practical, num: 1 },
      { subject: opt2Subject, theory: opt2Theory, practical: opt2Practical, num: 2 },
      { subject: opt3Subject, theory: opt3Theory, practical: opt3Practical, num: 3 },
    ];

    for (const opt of opts) {
      if (!opt.subject) {
        setError(`Please select a subject for Optional ${opt.num}.`);
        return;
      }
      if (!opt.theory || !opt.practical) {
        setError(`Please fill in all grades for Optional ${opt.num}.`);
        return;
      }
    }

    const subjects: SubjectResult[] = [];

    function makeSubject(
      name: string,
      subjectCode: string,
      subjectCodeName: string,
      theoryVal: string,
      practicalVal: string,
      creditHours: number,
      theoryRatio: number = 0.75,
    ): SubjectResult {
      const theory = parseFloat(theoryVal);
      const practical = parseFloat(practicalVal);
      const theoryCH = Math.round(creditHours * theoryRatio * 100) / 100;
      const practicalCH = Math.round(creditHours * (1 - theoryRatio) * 100) / 100;
      const subjectGPA = (theory * theoryCH + practical * practicalCH) / creditHours;
      return {
        name,
        subjectCode,
        subjectCodeName,
        theoryGrade: theory,
        practicalGrade: practical,
        finalGrade: subjectGPA,
        finalGradeLetter: gpaToLetter(subjectGPA),
        creditHours,
        theoryCH,
        practicalCH,
        hasPractical: true,
      };
    }

    subjects.push(makeSubject("Nepali", "001", "COM.NEPALI", nepaliTheory, nepaliPractical, 3, 0.75));
    subjects.push(makeSubject("English", "003", "COM.ENGLISH", englishTheory, englishPractical, 4, 0.75));
    const msName = mathSocialChoice === "math" ? "Mathematics" : "Social Studies & Life Skills";
    const msCode = mathSocialChoice === "math" ? "005" : "005";
    const msCodeName = mathSocialChoice === "math" ? "MATHEMATICS" : "SOCIAL STUDIES";
    subjects.push(makeSubject(msName, msCode, msCodeName, mathSocialTheory, mathSocialPractical, 5, 0.75));

    const optSubjectCodes: Record<string, { code: string; codeName: string; theoryRatio: number }> = {
      accountancy:  { code: "006", codeName: "ACCOUNT",             theoryRatio: 0.75 },
      economics:    { code: "007", codeName: "ECONOMICS",           theoryRatio: 0.75 },
      computer:     { code: "008", codeName: "COMPUTER SCIENCE",    theoryRatio: 0.50 },
      business:     { code: "009", codeName: "BUSINESS STUDIES",    theoryRatio: 0.75 },
      tourism:      { code: "010", codeName: "TOURISM",             theoryRatio: 0.75 },
      businessMath: { code: "011", codeName: "BUSINESS MATH",       theoryRatio: 0.75 },
      hotel:        { code: "012", codeName: "HOTEL MANAGEMENT",    theoryRatio: 0.75 },
    };

    for (const opt of opts) {
      const config = SUBJECT_CONFIGS[opt.subject];
      const codeInfo = optSubjectCodes[opt.subject];
      subjects.push(makeSubject(
        config.name, codeInfo.code, codeInfo.codeName,
        opt.theory, opt.practical, config.creditHours, codeInfo.theoryRatio
      ));
    }

    const totalCredits = subjects.reduce((sum, s) => sum + s.creditHours, 0);
    const weightedSum = subjects.reduce((sum, s) => sum + s.finalGrade * s.creditHours, 0);
    const finalGPA = weightedSum / totalCredits;

    const today = new Date();
    const issueDate = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;

    setResult({
      studentName: studentName || "Student",
      finalGPA: Math.round(finalGPA * 100) / 100,
      finalGrade: gpaToLetter(finalGPA),
      totalCredits,
      issueDate,
      subjects,
    });
    setShowModal(true);
  }

  const optSubjects = [
    { value: "accountancy", label: "Accountancy" },
    { value: "economics", label: "Economics" },
    { value: "computer", label: "Computer Science" },
    { value: "business", label: "Business Studies" },
    { value: "tourism", label: "Tourism & Mountaineering" },
    { value: "businessMath", label: "Business Mathematics" },
    { value: "hotel", label: "Hotel Management" },
  ];

  function OptionalSubjectCard({
    num,
    subject,
    theory,
    practical,
    onSubjectChange,
    onTheoryChange,
    onPracticalChange,
  }: {
    num: number;
    subject: string;
    theory: string;
    practical: string;
    onSubjectChange: (v: string) => void;
    onTheoryChange: (v: string) => void;
    onPracticalChange: (v: string) => void;
  }) {
    const config = subject ? SUBJECT_CONFIGS[subject] : null;
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 p-5 flex flex-col gap-3 glass-card">
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-base">Optional {num}</h3>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Subject</label>
          <select
            value={subject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition glass-input"
          >
            <option value="">Select Subject</option>
            {optSubjects.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Theory {config ? `(${config.theoryMarks})` : ""}
          </label>
          <GradeSelect
            value={theory}
            onChange={onTheoryChange}
            options={config ? config.theoryGrades : THEORY_GRADES_75}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Practical/Internal {config ? `(${config.practicalMarks})` : ""}
          </label>
          <GradeSelect
            value={practical}
            onChange={onPracticalChange}
            options={config ? config.practicalGrades : INTERNAL_GRADES_25}
          />
        </div>
      </div>
    );
  }

  const optTheoryRatio: Record<string, number> = {
    accountancy: 0.75, economics: 0.75, computer: 0.50,
    business: 0.75, tourism: 0.75, businessMath: 0.75, hotel: 0.75,
  };

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
    if (mathSocialTheory && mathSocialPractical) {
      const t = parseFloat(mathSocialTheory), p = parseFloat(mathSocialPractical);
      pairs.push({ gpa: (t * 3.75 + p * 1.25) / 5, ch: 5 });
    }
    for (const opt of [
      { s: opt1Subject, t: opt1Theory, p: opt1Practical },
      { s: opt2Subject, t: opt2Theory, p: opt2Practical },
      { s: opt3Subject, t: opt3Theory, p: opt3Practical },
    ]) {
      if (opt.s && opt.t && opt.p) {
        const config = SUBJECT_CONFIGS[opt.s];
        const ratio = optTheoryRatio[opt.s] ?? 0.75;
        const ch = config.creditHours;
        const t = parseFloat(opt.t), p = parseFloat(opt.p);
        pairs.push({ gpa: t * ratio + p * (1 - ratio), ch });
      }
    }
    if (pairs.length === 0) return null;
    const totalCH = pairs.reduce((s, p) => s + p.ch, 0);
    const totalPts = pairs.reduce((s, p) => s + p.gpa * p.ch, 0);
    return { gpa: Math.round(totalPts / totalCH * 100) / 100, filled: pairs.length, total: 6 };
  }, [englishTheory, englishPractical, nepaliTheory, nepaliPractical, mathSocialTheory, mathSocialPractical,
      opt1Subject, opt1Theory, opt1Practical, opt2Subject, opt2Theory, opt2Practical,
      opt3Subject, opt3Theory, opt3Practical]);

  return (
    <div>
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl px-4 py-3 text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-6 mb-6 glass-card">
          <div className="flex flex-col gap-1 max-w-sm">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Student Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition placeholder:text-slate-400 dark:placeholder:text-slate-500 glass-input"
            />
          </div>
        </div>

        <div className="mb-2">
          <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-sm font-bold">1</span>
            Compulsory Subjects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <SubjectCard
              title="English"
              theoryLabel="Theory (75)"
              practicalLabel="Internal (25)"
              theoryGrades={THEORY_GRADES_75}
              practicalGrades={INTERNAL_GRADES_25}
              theoryValue={englishTheory}
              practicalValue={englishPractical}
              onTheoryChange={setEnglishTheory}
              onPracticalChange={setEnglishPractical}
            />
            <SubjectCard
              title="Nepali"
              theoryLabel="Theory (75)"
              practicalLabel="Internal (25)"
              theoryGrades={THEORY_GRADES_75}
              practicalGrades={INTERNAL_GRADES_25}
              theoryValue={nepaliTheory}
              practicalValue={nepaliPractical}
              onTheoryChange={setNepaliTheory}
              onPracticalChange={setNepaliPractical}
            />
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700 p-5 flex flex-col gap-3 glass-card">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-base">
                {mathSocialChoice === "math" ? "Mathematics" : "Social Studies & Life Skills"}
              </h3>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Theory (75)</label>
                <GradeSelect value={mathSocialTheory} onChange={setMathSocialTheory} options={THEORY_GRADES_75} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Internal (25)</label>
                <GradeSelect value={mathSocialPractical} onChange={setMathSocialPractical} options={INTERNAL_GRADES_25} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Subject Choice</label>
                <select
                  value={mathSocialChoice}
                  onChange={(e) => handleMathSocialChoice(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition glass-input"
                >
                  <option value="math">Mathematics</option>
                  <option value="social">Social Studies &amp; Life Skills</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center text-sm font-bold">2</span>
            Optional Subjects <span className="text-sm font-normal text-slate-400 dark:text-slate-500">(Choose 3)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <OptionalSubjectCard
              num={1} subject={opt1Subject} theory={opt1Theory} practical={opt1Practical}
              onSubjectChange={(v) => handleOptSubjectChange(1, v)}
              onTheoryChange={setOpt1Theory} onPracticalChange={setOpt1Practical}
            />
            <OptionalSubjectCard
              num={2} subject={opt2Subject} theory={opt2Theory} practical={opt2Practical}
              onSubjectChange={(v) => handleOptSubjectChange(2, v)}
              onTheoryChange={setOpt2Theory} onPracticalChange={setOpt2Practical}
            />
            <OptionalSubjectCard
              num={3} subject={opt3Subject} theory={opt3Theory} practical={opt3Practical}
              onSubjectChange={(v) => handleOptSubjectChange(3, v)}
              onTheoryChange={setOpt3Theory} onPracticalChange={setOpt3Practical}
            />
          </div>
        </div>

        {liveGPA && (
          <div className="mb-5 flex items-center gap-4 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-xl px-5 py-3.5 transition-all">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{liveGPA.gpa.toFixed(2)}</div>
            <div>
              <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Live GPA Preview</div>
              <div className="text-xs text-indigo-500 dark:text-indigo-400">{liveGPA.filled} of {liveGPA.total} subjects filled</div>
            </div>
            <div className="ml-auto text-xl font-bold" style={{ color: liveGPA.gpa > 3.6 ? "#059669" : liveGPA.gpa > 2.8 ? "#ca8a04" : liveGPA.gpa > 1.6 ? "#ea580c" : "#dc2626" }}>
              {gpaToLetter(liveGPA.gpa)}
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={calculate}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg transition text-base"
          >
            <span>🎓</span> Calculate GPA
          </button>
        </div>

      {showModal && result && (
        <ResultModal result={result} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
