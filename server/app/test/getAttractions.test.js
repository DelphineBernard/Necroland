import mainController from "../controllers/mainController.js";
import { Attraction } from "../models/index.js";

jest.mock("../models/index.js", () => ({
    Attraction: {
        findAll: jest.fn(), // We mock the Attraction model by giving it a findAll method who's a dummy function
    },
}));

describe("MainController", () => {
    describe("getAttractions", () => {
        it("it should return a list of attractions", async () => {
            // We mock a list of attractions
            const mockAttractions = [
                { id: 1, name: "Attraction A" },
                { id: 2, name: "Attraction B" },
            ];

            // We configure the findAll method so that it returns mockAttractions when called
            Attraction.findAll.mockResolvedValue(mockAttractions);

            // We mock request and response objects
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // We call the function to test
            await mainController.getAttractions(req, res);

            // We check that res.status was called with status 200
            expect(res.status).toHaveBeenCalledWith(200);
            // We check that res.json was called with mocked attractions
            expect(res.json).toHaveBeenCalledWith({ attractions: mockAttractions });
        });

        it("it should handle errors gracefully", async () => {
            // We configure the findAll method so that it throws an error
            const errorMessage = "Erreur lors de la récupération des attractions.";
            Attraction.findAll.mockRejectedValue(new Error(errorMessage));

            // We mock request and response objects
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // We call the function to test
            await mainController.getAttractions(req, res);

            // We check that res.status was called with status 500
            expect(res.status).toHaveBeenCalledWith(500);
            // We check that res.json was called with the error message
            expect(res.json).toHaveBeenCalledWith({ message: 'Erreur lors de la récupération des attractions.' });
        });
    });
});