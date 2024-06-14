import { Attraction, Category } from "../models/index.js";
import slugify from 'slugify';

const categoriesController = {

    getCategories: async (req, res) => {
        try {
            const categories = await Category.findAll()
            res.status(200).json({ categories })
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des catégories", error });
        }
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
            res.status(500).json({ message: "Erreur lors de la création de la catégorie", error });
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
            res.status(500).json({ message: "Erreur lors de la mise à jour de la catégorie", error });
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
            res.status(500).json({ message: "Erreur lors de la suppression de la catégorie", error });
        }
    },
}

export default categoriesController;