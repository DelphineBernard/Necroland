import {Attraction, Tag, Category, Photo, Status } from "../models/index.js";

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

    getTags: async (req, res) => {
        const tags = await Tag.findAll();
        res.json({tags});
    },

    getCategories: async (req, res) => {
        const categories = await Category.findAll()
        res.json({categories})
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