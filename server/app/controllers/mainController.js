import Attraction from "../models/Attraction.js";
import Tag from "../models/Tag.js";
import Category from "../models/Category.js";
import Photo from "../models/Photo.js";

const mainController = {
    getAttractions: async (req, res) => {
        const attractions = await Attraction.findAll();
        res.json({attractions});
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
}

export default mainController;