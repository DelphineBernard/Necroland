import { Attraction, Tag, Category, Photo } from "../models/index.js";
import sequelize from "../database.js";
import { QueryTypes } from "sequelize";

const attractionsController = {

    getAttractions: async (req, res) => {
        try {
            const attractions = await Attraction.findAll({
                include: {
                    model: Photo,
                    as: 'photos',
                    attributes: ['name']
                }
            });
            res.status(200).json({ attractions });
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération des attractions', error });
        }
    },

    getAttractionsByCategory: async (req, res) => {
        try {
            const category = req.params.category;
            const foundCategory = await Category.findOne({ where: { slug: category } });
            if (foundCategory) {
                const categoryId = foundCategory.id;
                const attractions = await Attraction.findAll({
                    where: { category_id: categoryId },
                    include: {
                        model: Photo,
                        as: 'photos',
                        attributes: ['name']
                    }
                });
                res.status(200).json({ attractions });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération des attractions filtrées par catégorie', error });
        }
    },

    getAttractionsByTag: async (req, res) => {
        try {
            const tag = req.params.tag;
            const foundTag = await Tag.findOne({
                where: { slug: tag },
                include: {
                    model: Attraction,
                    as: 'Attractions',
                    include: {
                        model: Photo,
                        as: 'photos',
                        attributes: ['name']
                    }
                },
            });
            if (foundTag) {
                const attractions = foundTag;
                res.status(200).json({ attractions });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération des attractions filtrées par tag', error });
        }
    },

    getAttractionTags: async (req, res) => {
        try {
            const attractionId = req.params.id;
            const attraction = await Attraction.findByPk(attractionId, {
                include: {
                    model: Tag,
                    through: {
                        attributes: []
                    }
                }
            });

            if (!attraction) {
                return res.status(404).json({ message: 'Attraction non trouvée' });
            }
            res.status(200).json(attraction.Tags);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération des tags de l\'attraction', error });
        }
    },

    addTagToAttraction: async (req, res) => {
        try {
            const { attractionId } = req.params;
            const { tagId } = req.body;

            const association = await sequelize.query(
                `SELECT * FROM attraction_has_tag WHERE attraction_id = :attractionId AND tag_id = :tagId`,
                {
                    replacements: { attractionId, tagId },
                    type: QueryTypes.SELECT
                }
            );

            if (association.length > 0) {
                return res.status(400).json({ message: "L'association existe déjà." });
            }

            await sequelize.query(
                `INSERT INTO attraction_has_tag (attraction_id, tag_id) VALUES (:attractionId, :tagId)`,
                {
                    replacements: { attractionId, tagId },
                    type: QueryTypes.INSERT
                }
            );

            res.status(201).json({ message: "Tag associé avec succès." });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de l'ajout de l'association.", error });
        }
    },

    removeTagFromAttraction: async (req, res) => {
        try {
            const { attractionId, tagId } = req.params;
            const association = await sequelize.query(
                `SELECT * FROM attraction_has_tag WHERE attraction_id = :attractionId AND tag_id = :tagId`,
                {
                    replacements: { attractionId, tagId },
                    type: QueryTypes.SELECT
                }
            );

            if (association.length === 0) {
                return res.status(404).json({ message: "Association tag/attraction non trouvée." });
            }

            await sequelize.query(
                `DELETE FROM attraction_has_tag WHERE attraction_id = :attractionId AND tag_id = :tagId`,
                {
                    replacements: { attractionId, tagId },
                    type: QueryTypes.DELETE
                }
            );

            res.status(200).json({ message: "Association tag/attraction supprimée avec succès." });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de l'association.", error });
        }
    },

    addAttraction: async (req, res) => {
        try {
            const data = req.body;
            const attraction = await Attraction.create({
                name: data.name,
                description: data.description,
                category_id: Number(data.category_id),
            })
            res.status(201).json({ message: "Attraction créée avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création de l'attraction", error });
        }
    },

    updateAttraction: async (req, res) => {
        try {
            const attractionId = req.params.id;
            const attractionDataToUpdate = { ...req.body };
            delete attractionDataToUpdate.id;
            const attraction = await Attraction.update(attractionDataToUpdate, {
                where: { id: attractionId }
            });
            res.status(200).json({ message: "Modifications enregistrées" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour des informations de l'attraction", error });
        }
    },

    deleteAttraction: async (req, res) => {
        try {
            const attractionId = req.params.id;
            const attraction = await Attraction.findByPk(attractionId, {
                include: [
                    { model: Photo, as: 'photos' },
                    { model: Tag, through: 'attraction_has_tag' }
                ]
            });

            if (!attraction) {
                return res.status(404).json({ message: "Attraction non trouvée." });
            }

            // Vérifier si l'attraction a des photos associées
            if (attraction.photos.length > 0) {
                return res.status(400).json({ message: "L'attraction a des photos associées et ne peut pas être supprimée." });
            }

            // Vérifier si l'attraction a des tags associés
            if (attraction.Tags.length > 0) {
                return res.status(400).json({ message: "L'attraction a des tags associés et ne peut pas être supprimée." });
            }

            await attraction.destroy();
            res.status(200).json({ message: "Attraction supprimée avec succès." });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de l'attraction.", error });
        }
    },
}

export default attractionsController;