import {
  hasReportForbiddenJumps,
  isReportSafe,
  isReportSafeAfterRemovingAnyOne,
} from '.';

describe('Forbidden jumps detection', () => {
  it('Returns boolean that tells if the report contains a forbidden jump', () => {
    expect(hasReportForbiddenJumps([1, 2, 7, 5, 9])).toEqual(true);

    expect(hasReportForbiddenJumps([1, 3, 7, 5, 9, 10])).toEqual(true);

    expect(hasReportForbiddenJumps([1, 3, 7, 5, 7, 10])).toEqual(true);

    expect(hasReportForbiddenJumps([1, 4, 7, 10, 15])).toEqual(true);

    expect(hasReportForbiddenJumps([1, 2, 5, 7, 9])).toEqual(false);

    expect(hasReportForbiddenJumps([40, 37, 34, 31, 29])).toEqual(false);

    expect(hasReportForbiddenJumps([61, 60, 63, 65])).toEqual(false);

    expect(hasReportForbiddenJumps([12, 9, 8, 6, 3])).toEqual(false);
  });
});

describe('Safe / unsafe report detection', () => {
  it('Returns boolean that tells if the report is safe or not', () => {
    expect(isReportSafe([1, 2, 3, 4, 3, 5])).toEqual(false);

    expect(isReportSafe([1, 2, 7, 5, 9])).toEqual(false);

    expect(isReportSafe([68, 69, 70, 72, 76])).toEqual(false);

    expect(isReportSafe([68, 69, 70, 6, 72, 75])).toEqual(false);

    expect(isReportSafe([44, 40, 39, 38, 37, 36])).toEqual(false);

    expect(isReportSafe([43, 40, 39, 38, 37, 36])).toEqual(true);

    expect(isReportSafe([63, 60, 57, 54])).toEqual(true);
  });
});

describe('Safe-able / unsafe-able report detection', () => {
  it('Returns boolean that tells if the report is safe-able or not by removing one level', () => {
    expect(isReportSafeAfterRemovingAnyOne([1, 2, 7, 5, 9])).toEqual(false);

    expect(isReportSafeAfterRemovingAnyOne([68, 69, 70, 72, 76])).toEqual(true);

    expect(isReportSafeAfterRemovingAnyOne([44, 40, 39, 38, 37, 36])).toEqual(
      true,
    );

    expect(isReportSafeAfterRemovingAnyOne([43, 40, 44, 38, 37, 36])).toEqual(
      true,
    );

    expect(isReportSafeAfterRemovingAnyOne([70, 66, 69, 68, 67])).toEqual(true);

    expect(isReportSafeAfterRemovingAnyOne([7, 4, 7, 8, 9])).toEqual(true);
  });
});
