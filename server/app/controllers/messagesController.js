import Message from "../models/Message.js";

const messagesController = {

    getMessages: async (req, res) => {
        try {
            const messages = await Message.findAll();
            res.status(200).json({ messages });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des messages", error });
        }
    },

    addMessage: async (req, res) => {
        try {
            const data = req.body;
            console.log(data)
            const message = await Message.create({
                object: data.object,
                content: data.content,
                email: data.email,
                lastname: data.lastname,
                firstname: data.firstname,
            })
            res.status(201).json({ message: "Message envoyé avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de l'envoi du message", error });
        }
    },

    changeStatusMessage: async (req, res) => {
        try {
            const messageId = req.params.id
            const message = await Message.update(
                { status_id: 4 },
                { where: { id: messageId } })
            res.status(200).json({ message: "Message classé" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour du statut du message", error });
        }
    },
}

export default messagesController;