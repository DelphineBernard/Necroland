import { Attraction, Tag, Category, Photo, Status } from "../models/index.js";
import slugify from 'slugify';
import sequelize from "../database.js";
import { QueryTypes } from "sequelize";

const mainController = {

    getAttractions: async (req, res) => {
        const attractions = await Attraction.findAll();
        res.json({ attractions });
    },

    getAttractionsByCategory: async (req, res) => {
        try {
            const category = req.params.category;
            const foundCategory = await Category.findOne({ where: { slug: category } });
            if (foundCategory) {
                const categoryId = foundCategory.id;
                const attractions = await Attraction.findAll({ where: { category_id: categoryId } });
                res.json({ attractions });
            }
        } catch (error) {
            console.log(error);
        }
    },

    getAttractionsByTag: async (req, res) => {
        try {
            const tag = req.params.tag;
            const foundTag = await Tag.findOne({
                where: { slug: tag },
                include: { model: Attraction, as: 'Attractions' },
            });
            if (foundTag) {
                const attractions = foundTag;
                res.json({ attractions });
            }
        } catch (error) {
            console.log(error);
        }
    },

    getAttractionsTags: async (req, res) => {
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
            console.error('Erreur lors de la récupération des tags de l\'attraction :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des tags de l\'attraction.' });
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
            console.error("Erreur lors de l'ajout de l'association :", error);
            res.status(500).json({ message: "Erreur lors de l'ajout de l'association." });
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
            console.error("Erreur lors de la suppression de l'association :", error);
            res.status(500).json({ message: "Erreur lors de la suppression de l'association." });
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
            console.log(error);
            res.status(500).json({ message: "Erreur lors de la création de l'attraction" });
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
            console.log("Erreur", error);
            res.status(500).json({ message: "Erreur lors de la mise à jour des informations de l'attraction" });
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
            console.error("Erreur lors de la suppression de l'attraction :", error);
            res.status(500).json({ message: "Erreur lors de la suppression de l'attraction." });
        }
    },

    getTags: async (req, res) => {
        const tags = await Tag.findAll();
        res.json({ tags });
    },

    addTag: async (req, res) => {
        try {
            const data = req.body;
            const tag = await Tag.create({
                name: data.name,
                slug: slugify(data.name, { remove: /[*+~.()'"!:@]/g, lower: true })
            })
            res.status(201).json({ message: "Tag créé avec succès" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur lors de la création du tag" });
        }
    },

    updateTag: async (req, res) => {
        try {
            const tagId = req.params.id;
            const tagDataToUpdate = { ...req.body };
            const newSlug = slugify(tagDataToUpdate.name, { remove: /[*+~.()'"!:@]/g, lower: true });
            tagDataToUpdate.slug = newSlug;
            delete tagDataToUpdate.id;
            const tag = await Tag.update(tagDataToUpdate, {
                where: { id: tagId }
            });
            res.status(200).json({ message: "Modifications enregistrées" });
        } catch (error) {
            console.log("Erreur", error);
            res.status(500).json({ message: "Erreur lors de la mise à jour des informations du tag" });
        }
    },

    deleteTag: async (req, res) => {
        try {
            const tagId = req.params.id;
            // Vérifier s'il existe des attractions liées à ce tag en effectuant une jointure
            const attractionsCount = await sequelize.query(
                `SELECT COUNT(*) AS count FROM attraction_has_tag WHERE tag_id = :tagId`,
                {
                    replacements: { tagId },
                    type: QueryTypes.SELECT
                }
            );
            if (attractionsCount[0].count > 0) {
                // Si des attractions sont liées à ce tag, renvoyer un message d'erreur
                return res.status(400).json({ message: "Ce tag est lié à des attractions et ne peut pas être supprimé" });
            }
            await Tag.destroy({
                where: { id: tagId }
            });
            res.status(200).json({ message: "Tag supprimé avec succès." });
        } catch (error) {
            console.error("Erreur lors de la suppression du tag :", error);
            res.status(500).json({ message: "Erreur lors de la suppression du tag." });
        }
    },

    getCategories: async (req, res) => {
        const categories = await Category.findAll()
        res.json({ categories })
    },

    addCategory: async (req, res) => {
        try {
            const data = req.body;
            const category = await Category.create({
                name: data.name,
                slug: slugify(data.name, { remove: /[*+~.()'"!:@]/g, lower: true })
            })
            res.status(201).json({ message: "Catégorie créée avec succès" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur lors de la création de la catégorie" });
        }
    },

    updateCategory: async (req, res) => {
        try {
            const categoryId = req.params.id;
            const categoryDataToUpdate = { ...req.body };
            const newSlug = slugify(categoryDataToUpdate.name, { remove: /[*+~.()'"!:@]/g, lower: true });
            categoryDataToUpdate.slug = newSlug;
            delete categoryDataToUpdate.id;
            const category = await Category.update(categoryDataToUpdate, {
                where: { id: categoryId }
            });
            res.status(200).json({ message: "Modifications enregistrées" });
        } catch (error) {
            console.log("Erreur", error);
            res.status(500).json({ message: "Erreur lors de la mise à jour de la catégorie" });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const categoryId = req.params.id;
            const attractionCount = await Attraction.count({
                where: {
                    category_id: categoryId
                }
            });
            if (attractionCount > 0) {
                res.status(400).json({ message: "Cette catégorie est liée à des attractions et ne peut pas être supprimée" })
            }
            await Category.destroy({
                where: {
                    id: categoryId
                }
            });
            res.status(200).json({ message: "Catégorie supprimée avec succès" });
        } catch (error) {
            console.error("Erreur lors de la suppression de la catégorie:", error);
            res.status(500).json({ message: "Erreur lors de la suppression de la catégorie" });
        }
    },

    getPhotos: async (req, res) => {
        const photos = await Photo.findAll()
        res.json({ photos })
    },

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
                return res.status(404).json({ message: "Attraction non trouvée." });
            }

            res.status(200).json(attraction.photos);
        } catch (error) {
            console.error("Erreur lors de la récupération des photos associées :", error);
            res.status(500).json({ message: "Erreur lors de la récupération des photos associées." });
        }
    },

    addPhoto: async (req, res) => {
        try {
            const { attractionId } = req.params;

            const attraction = await Attraction.findByPk(attractionId);
            if (!attraction) {
                return res.status(404).json({ message: "Attraction non trouvée." });
            }
            const { name } = req.body;
            const photo = await Photo.create({
                name: name,
                attraction_id: attractionId
            });
            res.status(201).json(photo);
        } catch (error) {
            console.error("Erreur lors de l'ajout de la photo :", error);
            res.status(500).json({ message: "Erreur lors de l'ajout de la photo." });
        }
    },

    deletePhoto: async (req, res) => {
        try {
            const { photoId } = req.params;
            const photo = await Photo.findByPk(photoId);
            if (!photo) {
                return res.status(404).json({ message: "Photo non trouvée." });
            }
            await photo.destroy();
            res.status(200).json({ message: "Photo supprimée avec succès." });
        } catch (error) {
            console.error("Erreur lors de la suppression de la photo :", error);
            res.status(500).json({ message: "Erreur lors de la suppression de la photo." });
        }
    },

    getStatus: async (req, res) => {
        const status = await Status.findAll();
        res.json({ status });
    },
}

export default mainController;