import Role from "./Role.js";
import User from "./User.js";
import Reservation from "./Reservation.js";
import Status from "./Status.js";
import Message from "./Message.js";
import Attraction from "./Attraction.js";
import Category from "./Category.js";
import Photo from "./Photo.js";
import Tag from "./Tag.js";

User.hasMany(Reservation, { foreignKey: "user_id", as: "userReservations"});
Reservation.belongsTo(User, { foreignKey: "user_id", as: "user"});

Role.hasMany(User, { foreignKey: "role_id", as: "users"});
User.belongsTo(Role, { foreignKey: "role_id", as: "role"});

Status.hasMany(Reservation, {foreignKey: "status_id", as: "statusReservations"});
Reservation.belongsTo(Status, {foreignKey: "status_id", as: "reservationStatus"});

Status.hasMany(Message, { foreignKey: "status_id", as: "messages"});
Message.belongsTo(Status, {foreignKey: "status_id", as: "messageStatus"});

Category.hasMany(Attraction, {foreignKey: "category_id", as: "attractions"});
Attraction.belongsTo(Category, {foreignKey: "category_id", as: "category"});

Attraction.hasMany(Photo, { foreignKey: "attraction_id", as: "photos"});
Photo.belongsTo(Attraction, { foreignKey: "attraction_id", as: "attraction"});

Attraction.belongsToMany(Tag, { through: 'attraction_has_tag', foreignKey: 'attraction_id', otherKey: 'tag_id' });
Tag.belongsToMany(Attraction, { through: 'attraction_has_tag', foreignKey: 'tag_id', otherKey: 'attraction_id' });

export {User, Reservation, Role, Status, Attraction, Category, Message, Photo, Tag};