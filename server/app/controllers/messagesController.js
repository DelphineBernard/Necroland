import Message from "../models/Message.js";

const messagesController = {
    getMessages: async (req, res) => {
        const messages = await Message.findAll();
        res.json({messages});
    },

    addMessage: async (req, res) => {
        try {
            const data = req.body;
            const message = await Message.create({
                object: data.object,
                content: data.content,
                email: data.email,
                lastname: data.lastname,
                firstname: data.firstname,
            })
            res.status(201).json({ message: "Message envoyé avec succès" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur lors de l'envoi du message" });
        }
    },

    changeStatusMessage: async (req, res) => {
        try {
            const messageId = req.params.id
            const message = await Message.update( 
                {status_id: 4},
                {where: {id: messageId}})
                res.status(200).json({ message: "Message classé" });
        } catch (error) {
            console.log("Erreur", error);
            res.status(500).json({ message: "Erreur lors de la mise à jour du statut du message" });
        }
    },
}

export default messagesController;