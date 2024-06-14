import { Attraction, Photo } from "../models/index.js";

const photosController = {

    getAttractionsPhotos: async (req, res) => {
        try {
            const { attractionId } = req.params;
            const attraction = await Attraction.findByPk(attractionId, {
                include: {
                    model: Photo,
                    as: 'photos'
                }
            });

            if (!attraction) {
                return res.status(404).json({ message: "Attraction non trouvée" });
            }

            res.status(200).json(attraction.photos);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des photos associées", error });
        }
    },

    addPhoto: async (req, res) => {
        try {
            const { attractionId } = req.params;

            const attraction = await Attraction.findByPk(attractionId);
            if (!attraction) {
                return res.status(404).json({ message: "Attraction non trouvée" });
            }
            const { name } = req.body;
            const photo = await Photo.create({
                name: name,
                attraction_id: attractionId
            });
            res.status(201).json(photo);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de l'ajout de la photo", error });
        }
    },

    deletePhoto: async (req, res) => {
        try {
            const { photoId } = req.params;
            const photo = await Photo.findByPk(photoId);
            if (!photo) {
                return res.status(404).json({ message: "Photo non trouvée" });
            }
            await photo.destroy();
            res.status(200).json({ message: "Photo supprimée avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de la photo", error });
        }
    },
}

export default photosController;