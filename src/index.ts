import * as fs from 'fs';

const MAX_INCREASE = 3;
const TOLERANCE = Number.parseInt(process.env.TOLERANCE);

export const getReportsFromInputFile = () => {
  const file: string = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
  const stringReports = file.split('\n');

  //Suppression de la dernière ligne du fichier
  if (stringReports[stringReports.length - 1] === '') {
    stringReports.pop();
  }

  const reports = stringReports.map((report) =>
    report.split(' ').map((stringLevel) => Number.parseInt(stringLevel)),
  );

  return reports;
};

/**
 * Detection d'un saut interdit entre 2 levels (> 3)
 * @param report number[]
 * @returns
 */
export const hasReportForbiddenJumps = (report: number[]) => {
  return report.some((level, index, levels) => {
    const next = levels[index + 1];

    if (!next) {
      return false;
    }

    const comparison = level - next;
    const isJumpForbidden =
      comparison > MAX_INCREASE || comparison < -MAX_INCREASE;

    return isJumpForbidden;
  });
};

/**
 * Cette fonction effectue le test suivant:
 * Pour chaque élément de la list:
 * Si je le supprime du repport et que j'effectue un isValid
 * Et que le report est valide:
 * Alors on renvoi vrai et cela signifie que le rapport est safe-able en supprimant un level
 */
export const isReportSafeAfterCleaning = (report: number[]) => {
  return report.some((level, index) => {
    const copyReport = [...report];
    copyReport.splice(index, 1);
    return isReportSafe(copyReport);
  });
};

/**
 * Cette fonction s'assure du respect des 3 points suivants:
 * - Le report est totalement graduel
 * - Pas de doublons
 * - Pas de sauts interdits (> 3)
 */
export const isReportSafe = (report) => {
  const reportJoined = report.join();

  const sortedAsc = [...report].sort((a, b) => a - b);
  const sortedDesc = [...report].sort((a, b) => b - a);

  const isReportFullyGradual =
    sortedAsc.join() === reportJoined || sortedDesc.join() === reportJoined;

  //Décompte des doublons
  const set = new Set(sortedAsc);
  const countDuplicates = sortedAsc.length - set.size;

  return (
    !countDuplicates && isReportFullyGradual && !hasReportForbiddenJumps(report)
  );
};

const countSafeReports = (reports: number[][]) => {
  return reports.filter((report) => {
    if (!isReportSafe(report)) {
      return TOLERANCE && isReportSafeAfterCleaning(report);
    }
    return isReportSafe(report);
  }).length;
};

const reports = getReportsFromInputFile();
const count = countSafeReports(reports);
console.log(count);
