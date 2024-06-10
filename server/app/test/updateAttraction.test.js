import mainController from "../controllers/mainController.js";
import { Attraction } from '../models/index.js';

jest.mock("../models/index.js", () => ({
    Attraction: {
        update: jest.fn(), // We mock the Attraction model by giving it a update method who's a dummy function
    },
}));

describe("MainController", () => {
    describe("updateAttraction", () => {
        it("it should update attraction informations successfully", async () => {
            // We mock a query object with the data that the user would provide to update an attraction
            const mockReq = {
                params: { id: 1 },
                body: {
                    name: "Updated Attraction",
                    description: "Updated Description",
                    category_id: 2,
                },
            };

            // We configures the update method so that it returns a success
            Attraction.update.mockResolvedValue([1]); // Sequelize returs [numberOfAffectedRows]

            // We mock request and response objects
            const req = mockReq;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // We call the function to test
            await mainController.updateAttraction(req, res);

            // We check that res.status was called with status 200
            expect(res.status).toHaveBeenCalledWith(200);
            // We check that res.json was called with success message
            expect(res.json).toHaveBeenCalledWith({ message: "Modifications enregistrées" });

            // We check that Attraction.update was called with the correct parameters
            expect(Attraction.update).toHaveBeenCalledWith(
                {
                    name: "Updated Attraction",
                    description: "Updated Description",
                    category_id: 2,
                },
                { where: { id: 1 } }
            );
        });

        it("it should handle errors gracefully", async () => {
            // We configure the update method so that it throws an error
            Attraction.update.mockRejectedValue(new Error("Erreur lors de la mise à jour des informations de l'attraction"));

            // We mock a query object with the data that the user would provide to update an attraction
            const mockReq = {
                params: { id: 1 },
                body: {
                    name: "Updated Attraction",
                    description: "Updated Description",
                    category_id: 2,
                },
            };

            // We mock request and response objects
            const req = mockReq;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // We call the function to test
            await mainController.updateAttraction(req, res);

            // We check that res.status was called with status 500
            expect(res.status).toHaveBeenCalledWith(500);
            // We check that res.json was called with the error message
            expect(res.json).toHaveBeenCalledWith({ message: "Erreur lors de la mise à jour des informations de l'attraction" });
        });
    });
});