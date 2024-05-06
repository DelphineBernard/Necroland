import Message from "../models/Message.js";

const messagesController = {
    getMessages: async (req, res) => {
        const messages = await Message.findAll();
        res.json({messages});
    }
}

export default messagesController;