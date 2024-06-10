import formatDate from "../utils/dateUtils.js";

const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
const optionsString = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };

describe('formatDate', () => {

    describe('Structure', () => {
      test('it should be a function', () => {
        expect(typeof formatDate).toBe('function');
      });
    });
  
    describe('Execution', () => {
      test('it should format date 2024/03/05 to 05/03/2024', () => {
        const result = formatDate("2024/03/05", options);
        expect(result).toBe("05/03/2024");
      });
      test('it should format date 2024/12/25 to 25/12/2024', () => {
        const result = formatDate("2024/12/25", options);
        expect(result).toBe("25/12/2024");
      });

      test('it should format date 2024/03/05 to mardi 5 mars 2024', () => {
        const result = formatDate("2024/03/05", optionsString);
        expect(result).toBe("mardi 5 mars 2024");
      });
      test('it should format date 2024/12/25 to mercredi 25 décembre 2024', () => {
        const result = formatDate("2024/12/25", optionsString);
        expect(result).toBe("mercredi 25 décembre 2024");
      });

      test('it should return "Invalid Date" for invalid date input', () => {
        const result = formatDate("invalid_date", options);
        expect(result).toBe("Invalid Date");
      });
    });
  });