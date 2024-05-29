import {Attraction, Tag, Category, Photo, Status } from "../models/index.js";
import slugify from 'slugify';

const mainController = {

    getAttractions: async (req, res) => {
        const attractions = await Attraction.findAll();
        res.json({attractions});
    },

    getAttractionsByCategory: async (req, res) => {
        try {
            const category = req.params.category;
            const foundCategory = await Category.findOne({where: { slug: category }});
            if (foundCategory) {
                const categoryId = foundCategory.id;
                const attractions = await Attraction.findAll({where: { category_id: categoryId} });
                res.json({attractions});
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
                res.json({attractions});
            }
        } catch (error) {
            console.log(error);
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

    getTags: async (req, res) => {
        const tags = await Tag.findAll();
        res.json({tags});
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

    getCategories: async (req, res) => {
        const categories = await Category.findAll()
        res.json({categories})
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

    getPhotos: async (req, res) => {
        const photos = await Photo.findAll()
        res.json({photos})
    },

    getStatus: async (req, res) => {
        const status = await Status.findAll();
        res.json({status});
    },
}

export default mainController;