import { Tag } from "../models/index.js";
import slugify from 'slugify';
import sequelize from "../database.js";
import { QueryTypes } from "sequelize";

const tagsController = {

    getTags: async (req, res) => {
        try {
            const tags = await Tag.findAll();
            res.status(200).json({ tags });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des tags", error });
        }
    },

    addTag: async (req, res) => {
        try {
            const data = req.body;
            const tag = await Tag.create({
                name: data.name,
                slug: slugify(data.name, { remove: /[*+~.()'"!:@]/g, lower: true })
            });
            res.status(201).json({ message: "Tag créé avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création du tag", error });
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
            res.status(500).json({ message: "Erreur lors de la mise à jour des informations du tag", error });
        }
    },

    deleteTag: async (req, res) => {
        try {
            const tagId = req.params.id;
            // Check if there are attractions linked to this tag
            const attractionsCount = await sequelize.query(
                `SELECT COUNT(*) AS count FROM attraction_has_tag WHERE tag_id = :tagId`,
                {
                    replacements: { tagId },
                    type: QueryTypes.SELECT
                }
            );
            if (attractionsCount[0].count > 0) {
                // If attractions are linked to this tag, return an error message
                return res.status(400).json({ message: "Ce tag est lié à des attractions et ne peut pas être supprimé" });
            }
            await Tag.destroy({
                where: { id: tagId }
            });
            res.status(200).json({ message: "Tag supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression du tag", error });
        }
    },
}

export default tagsController;