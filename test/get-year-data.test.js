const { getYearData, getNumberOfDaysInAYear, buildEmptyYear} = require('../middleware/get-year-data');

describe('Check if year is a leep year', ()  => {
    test('2020 is a leep year', () => {
        expect(getNumberOfDaysInAYear(2020)).toBe(366);
    });
    test('2019 is NOT a leep year', () => {
        expect(getNumberOfDaysInAYear(2019)).toBe(365);
    });
});

describe('Check structure of empty year object', ()  => {
    test('Returns two objects', () => {
        const emptyYear = buildEmptyYear(2, 2019);
        const mockEmptyYear = buildMockEmptyYear();
        expect(emptyYear).toEqual(mockEmptyYear);
    });
    test('Object has correct structure', () => {
        const mockEmptyYear = buildMockEmptyYear();
        const emptyYear = buildEmptyYear(1, 2019);
        expect(emptyYear[0]).toEqual(mockEmptyYear[0]);
    })
});

const buildMockEmptyYear = () => {
    return [
        {
            id: 0,
            date: '01-01-2019',
            rating: 0,
            note: ''
        },
        {
            id: 1,
            date: '02-01-2019',
            rating: 0,
            note: ''
        }
    ]
}