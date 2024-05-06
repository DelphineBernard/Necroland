import User from "../models/User.js";
import Role from "../models/Role.js";

const usersController = {
    getUsers: async (req, res) => {
        const users = await User.findAll()
        res.json({users})
    },

    getRoles: async (req, res) => {
        const roles = await Role.findAll()
        res.json({roles})
    },
}

export default usersController;