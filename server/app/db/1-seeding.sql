BEGIN;

SET CLIENT_ENCODING TO 'UTF-8';

TRUNCATE TABLE "role" CASCADE;
TRUNCATE TABLE "user" CASCADE;
TRUNCATE TABLE "status" CASCADE;
TRUNCATE TABLE "reservation";
TRUNCATE TABLE "category" CASCADE;
TRUNCATE TABLE "attraction" CASCADE;
TRUNCATE TABLE "tag" CASCADE;
TRUNCATE TABLE "photo";
TRUNCATE TABLE "message";
TRUNCATE TABLE "price";

INSERT INTO "role" (name) VALUES
('Membre'),
('Administrateur');

INSERT INTO "status" (label) VALUES
('Confirmée'),
('Annulée'),
('En cours de traitement'),
('Traité');

INSERT INTO "category" (name, slug) VALUES
('Rollercoaster', 'rollercoaster'),
('Restaurant', 'restaurant'),
('Expérience immersive', 'experience-immersive');

INSERT INTO "attraction" (name, description, category_id) VALUES

('Dead Encounter', 'Plongez dans l''horreur avec Dead Encounter, une expérience cauchemardesque qui vous emmènera au plus profond de vos frayeurs. Cette maison d''horreur interdite aux moins de 18 ans vous mettra au défi de survivre à une série de scènes terrifiantes. Des monstres sanguinaires aux apparitions effrayantes, chaque coin cache une horreur inimaginable. Oserez-vous affronter vos pires cauchemars ?', 3),

('Feast of shadows', 'Bienvenue à Feast of Shadows, le restaurant qui repousse les limites de la créativité culinaire. Vous serez plongé dans un univers sombre et mystérieux où les plats prennent vie sous une lumière tamisée. Notre menu propose une délicieuse sélection de mets horrifiques qui vous surprendront à chaque bouchée. Des plats étonnants, inspirés de l''univers macabre, vous attendent pour une expérience gastronomique inoubliable.', 2),

('Undead Plunge', 'Préparez-vous à vivre une aventure époustouflante avec Undead Plunge. Ce rollercoaster extrême, doté de 20 loopings à couper le souffle, est conçu pour les amateurs de sensations fortes en quête d''adrénaline. Montez à bord de votre wagon et préparez-vous à être propulsé à travers des boucles spectaculaires, des vrilles effrayantes et des descentes à grande vitesse. Undead Plunge vous promet une expérience de montagnes russes inoubliable que vous n''oserez pas oublier.', 1),

('Zombie parade', 'Bienvenue dans Zombie Parade, une expérience immersive où le cauchemar devient réalité. Alors que vous explorez le parc, des hordes de zombies affamés font leur apparition et vous traquent. Votre survie dépendra de votre capacité à échapper aux morsures des morts-vivants. Plongez dans l''horreur avec cette aventure effrayante où l''adrénaline monte à chaque coin. Oserez-vous survivre à la Zombie Parade ?', 3),

('Zombie thrill', 'Préparez-vous à une expérience de montagnes russes comme aucune autre avec Zombie Thrill. Ce rollercoaster ultra rapide vous propulse à des vitesses
vertigineuses atteignant 300 km/h. Vous ressentirez l''adrénaline monter en flèche tandis que vous survolez le parc à une vitesse fulgurante, enchaînant
des virages serrés et des descentes à couper le souffle. Zombie Thrill est conçu pour les amateurs de sensations fortes en quête d''une montée d''adrénaline inoubliable.', 1),

('Pink Elegance Bistro', 'Bienvenue au "Pink Elegance Bistro", un lieu où l''élégance rencontre la féminité dans une ambiance rose chatoyante. Notre restaurant girly friendly vous invite à plonger dans un monde de sophistication et de convivialité. Le décor rose, les détails élégants et une cuisine délicieuse créent une atmosphère chaleureuse et accueillante pour toutes les occasions. Que ce soit pour un déjeuner entre amies, un rendez-vous romantique ou une journée spéciale, Pink Elegance Bistro vous offre une expérience gastronomique exceptionnelle.', 2);

INSERT INTO "tag" (name, slug) VALUES
('Horreur', 'horreur'),
('Effrayant', 'effrayant'),
('Maison hantée', 'maison-hantee'),
('Adultes seulement', 'adultes-seulement'),
('Cuisine créative', 'cuisine-creative'),
('Macabre', 'macabre'),
('Ambiance sombre', 'ambiance-sombre'),
('Expérience gastronomique', 'experience-gastronomique'),
('Montagnes russes', 'montagnes-russes'),
('Adrénaline', 'adrenaline'),
('Looping', 'looping'),
('Survie', 'survie'),
('Aventure', 'aventure'),
('Vitesse', 'vitesse'),
('Convivial', 'convivial'),
('Chic', 'chic');

INSERT INTO "price" (duration, price, hotel) VALUES
(1, 65.00, false),
(2, 110.00, false),
(3, 150.00, false),
(4, 185.00, false),
(2, 210.00, true),
(3, 385.00, true),
(4, 560.00, true);

COMMIT;