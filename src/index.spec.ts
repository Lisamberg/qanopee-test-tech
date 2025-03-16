import {
  WAY,
  doLevelsRespectsMaxIncrease,
  getReportWay,
  isReportOneWay,
  reportContainsDuplicateNumbers,
} from '.';

describe('Duplicates level detection', () => {
  it('Allows to detect duplicates in a level', () => {
    expect(reportContainsDuplicateNumbers([1, 2, 3, 3, 4, 5])).toBe(true);

    expect(reportContainsDuplicateNumbers([1, 2, 3, 4, 5])).toBe(false);
  });
});

describe('Getting level order (asc or desc)', () => {
  it('Infers what order should a level be', () => {
    expect(getReportWay([1, 2, 3, 4, 5])).toBe(WAY.ASC);
    expect(getReportWay([1, 6, 3, 2, 5])).toBe(WAY.ASC);

    expect(getReportWay([6, 8, 3, 2, 5])).toBe(WAY.DESC);
  });
});

describe('Getting level order (asc or desc)', () => {
  it('Infers what order should a level be', () => {
    expect(getReportWay([1, 2, 3, 4, 5])).toBe(WAY.ASC);
    expect(getReportWay([1, 6, 7, 8, 5])).toBe(WAY.ASC);

    expect(getReportWay([6, 8, 3, 2, 5])).toBe(WAY.DESC);
  });
});

describe('Make sur the "all ascending|increasing / descending|decreasing" business rule is respected for a level', () => {
  it('Compares sorted level with original level in order to determine if level"s order is good', () => {
    expect(
      isReportOneWay(
        [2, 5, 6, 8, 9],
        [2, 5, 6, 8, 9].sort((a, b) => a - b),
      ),
    ).toBe(true);

    expect(
      isReportOneWay(
        [2, 5, 8, 6, 9],
        [2, 5, 8, 6, 9].sort((a, b) => a - b),
      ),
    ).toBe(false);

    expect(
      isReportOneWay(
        [9, 6, 5, 8],
        [9, 6, 5, 8].sort((a, b) => b - a),
      ),
    ).toBe(false);
  });
});

describe('Make sur max increase is respected in a level', () => {
  it('Compares each level with the next one in order to determine if the max increase in respected', () => {
    expect(doLevelsRespectsMaxIncrease([1, 2, 6, 7, 9])).toBe(false);
    expect(doLevelsRespectsMaxIncrease([1, 2, 5, 7, 9])).toBe(true);
  });
});
