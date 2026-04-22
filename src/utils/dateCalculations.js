export function parseLocalDate(dateStr) {
  if (!dateStr) return null;
  const [yyyy, mm, dd] = dateStr.split('-');
  return new Date(yyyy, mm - 1, dd);
}

export function formatDate(date) {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

export function calculateEvaluationDates(startDateStr, blackouts, maxDateStr) {
  const start = parseLocalDate(startDateStr);
  if (!start) return null;
  const maxDate = parseLocalDate(maxDateStr);

  const isWeekend = (d) => d.getDay() === 0 || d.getDay() === 6;
  const isBlackout = (d) => !!blackouts.find(b => b === formatDate(d));

  const addMonthsAndAdjust = (monthsToAdd, extraDays = 0) => {
    const targetDate = new Date(start);
    const day = targetDate.getDate();
    targetDate.setMonth(targetDate.getMonth() + monthsToAdd);
    
    if (targetDate.getDate() !== day) {
      targetDate.setDate(0); 
    }
    
    if (extraDays > 0) {
      targetDate.setDate(targetDate.getDate() + extraDays);
    }

    let holidayCount = 0;
    const current = new Date(start);
    
    current.setDate(current.getDate() + 1); 
    while (current <= targetDate) {
      if (isBlackout(current)) {
        holidayCount++;
      }
      current.setDate(current.getDate() + 1);
    }

    const finalDate = new Date(targetDate);
    finalDate.setDate(finalDate.getDate() + holidayCount);

    while (isWeekend(finalDate) || isBlackout(finalDate)) {
      finalDate.setDate(finalDate.getDate() + 1);
    }

    return {
      finalStr: formatDate(finalDate),
      baseStr: formatDate(targetDate)
    };
  };

  const eval1Result = addMonthsAndAdjust(2);
  const eval2Result = addMonthsAndAdjust(5);
  const eval3Result = addMonthsAndAdjust(6, 1);

  const final1 = parseLocalDate(eval1Result.finalStr);
  const final2 = parseLocalDate(eval2Result.finalStr);
  const final3 = parseLocalDate(eval3Result.finalStr);

  if (final1 > maxDate || final2 > maxDate || final3 > maxDate) {
    return { error: `Calculation exceeds available calendar data. The calendar for next year is not available for this role.` };
  }

  return {
    eval1: eval1Result.finalStr,
    eval2: eval2Result.finalStr,
    eval3: eval3Result.finalStr,
    base1: eval1Result.baseStr,
    base2: eval2Result.baseStr,
    base3: eval3Result.baseStr
  };
}
