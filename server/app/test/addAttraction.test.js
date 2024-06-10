import mainController from "../controllers/mainController.js";
import { Attraction } from '../models/index.js';

jest.mock("../models/index.js", () => ({
    Attraction: {
        create: jest.fn(), // We mock the Attraction model by giving it a create method who's a dummy function
    },
}));

describe("MainController", () => {
    describe("addAttraction", () => {
        it("it should create a new attraction successfully", async () => {
            // We mock a query object with the data that the user would provide to create an attraction
            const mockReq = {
                body: {
                    name: "New Attraction",
                    description: "Description of the attraction",
                    category_id: 1,
                },
            };

            // We configures the create method so that it returns a new attraction
            Attraction.create.mockResolvedValue({});

            // We mock request and response objects
            const req = mockReq;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // We call the function to test
            await mainController.addAttraction(req, res);

            // We check that res.status was called with status 201
            expect(res.status).toHaveBeenCalledWith(201);
            // We check that res.json was called with success message
            expect(res.json).toHaveBeenCalledWith({ message: "Attraction créée avec succès" });

            // We check that Attraction.create was called with the correct parameters
            expect(Attraction.create).toHaveBeenCalledWith({
                name: "New Attraction",
                description: "Description of the attraction",
                category_id: 1,
            });
        });

        it("it should handle errors gracefully", async () => {
            // We configure the create method so that it throws an error
            Attraction.create.mockRejectedValue(new Error("Erreur lors de la création de l'attraction"));

            // We mock a query object with the data that the user would provide to create an attraction
            const mockReq = {
                body: {
                    name: "New Attraction",
                    description: "Description of the attraction",
                    category_id: 1,
                },
            };

            // We mock request and response objects
            const req = mockReq;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // We call the function to test
            await mainController.addAttraction(req, res);

            // We check that res.status was called with status 500
            expect(res.status).toHaveBeenCalledWith(500);
            // We check that res.json was called with the error message
            expect(res.json).toHaveBeenCalledWith({ message: "Erreur lors de la création de l'attraction" });
        });
    });
});