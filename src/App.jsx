import React, { useState, useMemo } from 'react';
import ObjectCalendars from './calendars.json';
import { calculateEvaluationDates } from './utils/dateCalculations';
import { CalendarIcon, BriefcaseIcon, CalendarDaysIcon, CalculatorIcon, AlertCircleIcon, ChevronDownIcon } from 'lucide-react';

export default function App() {
  const jobTitles = Object.keys(ObjectCalendars);
  const [jobTitle, setJobTitle] = useState(jobTitles[0] || '');

  const availableYears = ObjectCalendars[jobTitle]?.years || [];
  const [selectedYear, setSelectedYear] = useState(availableYears[0] || '');
  const [startDate, setStartDate] = useState('');

  const handleJobTitleChange = (e) => {
    const newTitle = e.target.value;
    setJobTitle(newTitle);
    const nextAvailableYears = ObjectCalendars[newTitle]?.years || [];
    setSelectedYear(nextAvailableYears[0] || '');
    setStartDate('');
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setStartDate('');
  };

  const evaluationDates = useMemo(() => {
    if (!startDate) return null;
    const config = ObjectCalendars[jobTitle];
    if (!config) return null;
    return calculateEvaluationDates(startDate, config.blackouts, config.maxDate);
  }, [jobTitle, startDate]);

  const minDate = selectedYear === "2025/2026" ? "2025-07-01" : "2026-07-01";
  const maxDate = selectedYear === "2025/2026" ? "2026-06-30" : "2027-06-30";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300">

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
              <CalculatorIcon className="w-48 h-48 text-indigo-600 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700" />
            </div>

            <div className="mb-8 relative">
              <div className="inline-flex items-center justify-center p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-4 shadow-sm ring-1 ring-indigo-100">
                <CalendarDaysIcon className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
                Evaluations Calculator
              </h1>
              <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm">
                Calculate evaluation dates using the employee’s position and start date, accounting for any non-working days.
              </p>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-slate-700 transition-colors">
                  <BriefcaseIcon className="w-4 h-4 mr-2 text-slate-400" />
                  Job Title
                </label>
                <div className="relative group/select">
                  <select
                    value={jobTitle}
                    onChange={handleJobTitleChange}
                    className="w-full appearance-none bg-slate-50/50 border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all hover:bg-slate-50 cursor-pointer shadow-sm"
                  >
                    {jobTitles.map((title) => (
                      <option key={title} value={title}>{title}</option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-focus-within/select:text-indigo-500 transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-slate-700 transition-colors">
                  <CalendarIcon className="w-4 h-4 mr-2 text-slate-400" />
                  Calendar Year
                </label>
                <div className="relative group/select">
                  <select
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="w-full appearance-none bg-slate-50/50 border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all hover:bg-slate-50 cursor-pointer shadow-sm"
                  >
                    {availableYears.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-focus-within/select:text-indigo-500 transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-slate-700 transition-colors">
                  <CalendarDaysIcon className="w-4 h-4 mr-2 text-slate-400" />
                  Start Date
                </label>
                <input
                  type="date"
                  min={minDate}
                  max={maxDate}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all hover:bg-slate-50 shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col h-full">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 flex-1 flex flex-col h-full relative overflow-hidden">

            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  Calculated Milestones
                </h2>
                <p className="text-sm text-slate-500 mt-1">Based on {selectedYear} working days</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center ring-1 ring-slate-100">
                <CalculatorIcon className="w-5 h-5 text-slate-400" />
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              {!evaluationDates ? (
                <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/30">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4 shadow-sm ring-1 ring-slate-100">
                    <CalendarDaysIcon className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">Ready to Calculate</h3>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">
                    Select a job title, calendar year, and start date to instantly view evaluation milestones.
                  </p>
                </div>
              ) : evaluationDates.error ? (
                <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-100 flex flex-col items-center text-center space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="p-3 bg-red-100 rounded-full text-red-600 mb-2">
                    <AlertCircleIcon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-lg">Calculation Out of Bounds</h3>
                  <p className="text-sm text-red-600/80 max-w-sm">
                    {evaluationDates.error}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <ResultCard
                    index="1"
                    label="1st Evaluation"
                    date={evaluationDates.eval1}
                    baseRule="2 months from start"
                    delay="delay-[0ms]"
                  />
                  <ResultCard
                    index="2"
                    label="2nd Evaluation"
                    date={evaluationDates.eval2}
                    baseRule="5 months from start"
                    delay="delay-[100ms]"
                  />
                  <ResultCard
                    index="3"
                    label="3rd Evaluation"
                    date={evaluationDates.eval3}
                    baseRule="6 months + 1 day from start"
                    delay="delay-[200ms]"
                  />
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

function ResultCard({ index, label, date, baseRule, delay }) {
  return (
    <div className={`group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 flex items-center gap-5 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 fill-mode-both ${delay}`}>

      <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 transform origin-left scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out" />

      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
        <span className="text-lg font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
          #{index}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-slate-900 truncate mb-1">
          {label}
        </h4>
        <p className="text-xs text-slate-500 truncate flex items-center">
          <CalendarIcon className="w-3 h-3 mr-1.5 opacity-70" />
          {baseRule}
        </p>
      </div>

      <div className="text-right pl-4">
        <span className="block text-xl md:text-2xl font-black text-indigo-600 tracking-tight">
          {date}
        </span>
      </div>
    </div>
  );
}
