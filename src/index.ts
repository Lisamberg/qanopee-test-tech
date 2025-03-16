import * as fs from 'fs';

const MAX_INCREASE = 3;

export enum WAY {
  ASC = 'ASC',
  DESC = 'DESC',
}

//Utilisation d'un set pour réduire les doublons
//Comparaison de la taille avec l'original par la suite pour déduire l'information
export const reportContainsDuplicateNumbers = (report: number[]): boolean =>
  new Set(report).size !== report.length;

//Glaner le sens inc/dec en comparant le premier et le dernier level
export const getReportWay = (report: number[]): WAY => {
  const first = report[0];
  const last = report[report.length - 1];
  return first - last > 0 ? WAY.DESC : WAY.ASC;
};

//Trie et  une copie du report selon le sens passé en arg  et la retourne
const getSortedReport = (report: number[], way: WAY) => {
  const asc = (a: number, b: number) => a - b;
  const desc = (a: number, b: number) => b - a;

  const waySortingFn = way === WAY.ASC ? asc : desc;

  const copy = [...report];
  return copy.sort(waySortingFn);
};

//S'assurer du full increasing / decreasing du report
//Via une comparaison de liste trié vs original
export const isReportOneWay = (
  originalReport: number[],
  sortedReport: number[],
): boolean => {
  return originalReport.join() === sortedReport.join();
};

//Compare chaque level d'un report ordonné avec son suivant
//Le suivant doit respecter la régle d'une différence de 3 (+/-) max.
export const doLevelsRespectsMaxIncrease = (levels: number[]) => {
  return levels.every((level, index) => {
    const next = levels[index + 1];

    if (!next) {
      return true;
    }

    const comparison = level - next;

    return comparison >= -MAX_INCREASE && comparison <= MAX_INCREASE;
  });
};

//C'est ici que toutes nos problématiques sous découpés s'emboitent
const countSafeReports = (reports: number[][]) => {
  const count = reports.filter((report) => {
    const hasDuplicateNumbers = reportContainsDuplicateNumbers(report);

    //Inutile d'aller plus loin, dans tout les cas le report ne peut pas etre safe
    if (hasDuplicateNumbers) {
      return false;
    }

    const way = getReportWay(report);

    const sortedReport = getSortedReport(report, way);

    const isOneWay = isReportOneWay(sortedReport, report);

    if (!isOneWay) {
      return false;
    }

    return doLevelsRespectsMaxIncrease(sortedReport);
  });

  return count.length;
};

const file: string = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
const stringReports = file.split('\n');

//Suppression de la dernière ligne du fichier
if (stringReports[stringReports.length - 1] === '') {
  stringReports.pop();
}

const reports = stringReports.map((report) =>
  report.split(' ').map((stringLevel) => Number.parseInt(stringLevel)),
);

const count = countSafeReports(reports);
console.log(count);
