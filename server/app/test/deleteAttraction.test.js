import mainController from "../controllers/mainController.js";
import { Attraction } from '../models/index.js';

// We mock the Attraction model and his associations
jest.mock("../models/index.js", () => ({
    Attraction: {
        findByPk: jest.fn(),
        destroy: jest.fn(),
    },
    Photo: jest.fn(),
    Tag: jest.fn(),
}));

describe("MainController", () => {
    describe("deleteAttraction", () => {
        it("it should delete attraction successfully", async () => {
            // We mock attraction data without photos or tags
            const mockAttraction = {
                id: 1,
                photos: [],
                Tags: [],
                destroy: jest.fn()
            };

            // We configures the findByPk method so that it returns a resolved promise containing the mockAttraction object
            Attraction.findByPk.mockResolvedValue(mockAttraction);

            // We mock request and response objects
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // We call the function to test
            await mainController.deleteAttraction(req, res);

            // We check that res.status was called with status 200
            expect(res.status).toHaveBeenCalledWith(200);
            // We check that res.json was called with success message
            expect(res.json).toHaveBeenCalledWith({ message: "Attraction supprimée avec succès." });
            // We check that attraction.destroy was called
            expect(mockAttraction.destroy).toHaveBeenCalled();
        });

        it("it should return 404 if attraction not found", async () => {
            Attraction.findByPk.mockResolvedValue(null);

            // We mock request and response objects
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // We call the function to test
            await mainController.deleteAttraction(req, res);

            // We check that res.status was called with status 404
            expect(res.status).toHaveBeenCalledWith(404);
            // We check that res.json was called with the error message
            expect(res.json).toHaveBeenCalledWith({ message: "Attraction non trouvée." });
        });

        it("it should return 400 if attraction has associated photos", async () => {
            const mockAttraction = {
                id: 1,
                photos: [{ id: 1, url: "photo1.jpg" }],
                Tags: [],
                destroy: jest.fn()
            };

            Attraction.findByPk.mockResolvedValue(mockAttraction);

            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // We call the function to test
            await mainController.deleteAttraction(req, res);

            // We check that res.status was called with status 400
            expect(res.status).toHaveBeenCalledWith(400);
            // We check that res.json was called with the error message
            expect(res.json).toHaveBeenCalledWith({ message: "L'attraction a des photos associées et ne peut pas être supprimée." });
        });

        it("it should return 400 if attraction has associated tags", async () => {
            const mockAttraction = {
                id: 1,
                photos: [],
                Tags: [{ id: 1, name: "Tag1" }],
                destroy: jest.fn()
            };

            Attraction.findByPk.mockResolvedValue(mockAttraction);

            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await mainController.deleteAttraction(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "L'attraction a des tags associés et ne peut pas être supprimée." });
        });

        it("it should handle errors gracefully", async () => {
            const errorMessage = "Erreur lors de la suppression de l'attraction.";
            Attraction.findByPk.mockRejectedValue(new Error(errorMessage));

            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await mainController.deleteAttraction(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Erreur lors de la suppression de l'attraction." });
        });
    });
});