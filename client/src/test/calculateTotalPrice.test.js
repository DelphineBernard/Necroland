import { calculateTotalPrice } from "../routes/Reservation/index.jsx";

const mockPrices = [
    { duration: '1', hotel: false, price: 65.00 },
    { duration: '2', hotel: false, price: 110.00 },
    { duration: '3', hotel: false, price: 150.00 },
    { duration: '4', hotel: false, price: 185.00 },
    { duration: '2', hotel: true, price: 210.00 },
    { duration: '3', hotel: true, price: 385.00 },
    { duration: '4', hotel: true, price: 560.00 }
];


describe('calculateTotalPrice', () => {

    describe('Structure', () => {
      test('it should be a function', () => {
        expect(typeof calculateTotalPrice).toBe('function');
      });
    });
  
    describe('Execution', () => {
      test('it should give 210.00 for duration "2" and hotel "true"', () => {
        const result = calculateTotalPrice(mockPrices, '2', 'true');
        expect(result).toBe(210.00);
      });
      test('it should give 150.00 for duration "3" and hotel "false"', () => {
        const result = calculateTotalPrice(mockPrices, '3', 'false');
        expect(result).toBe(150.00);
      });
    });
  });