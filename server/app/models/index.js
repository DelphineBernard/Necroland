import Role from "./Role.js";
import User from "./User.js";
import Reservation from "./Reservation.js";

User.hasMany(Reservation, { foreignKey: "user_id", as: "reservations"});
Reservation.belongsTo(User, { foreignKey: "user_id", as: "user"});

Role.hasMany(User, { foreignKey: "role_id", as: "users"});
User.belongsTo(Role, { foreignKey: "role_id", as: "role"});

export {User, Reservation, Role };