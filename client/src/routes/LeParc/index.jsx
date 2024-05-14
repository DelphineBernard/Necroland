import Alerte from "../../assets/icons/alerte.png";
import Plan from "../../assets/img/plan-du-parc.png";
import Securite from "../../assets/img/securite.jpg";
import Horreur from "../../assets/img/horreur-epique.jpg";
import Spectacles from "../../assets/img/spectacles.jpg";
import Attractions from "../../assets/img/attractions.png";


const LeParc = () => {
    return (
        <main>
            <section>
                <h2>Ouverture du parc dans 1 mois</h2>
                <p>
                    Necroland est bien plus qu'un simple parc d'attractions, c'est une expérience terrifiante, palpitante et mémorable qui plonge les visiteurs au coeur d'un univers post-apocalyptique où les zombies règnent en maîtres. Conçu pour les amateurs d'horreur, d'aventure et de frissons, Necroland est un lieu où l'imagination rencontre la réalité, offrant une expérience unique en son genre pour tous ceux qui osent y pénétrer.
                </p>
                <div>
                    <img src={Alerte} alt="" />
                    <p>Le parc est interdit au moins de 16 ans</p>
                </div>
            </section>
            <section>
                <h2>Franchissez les portes de Necroland pour une expérience inoubliable !</h2>
                <article>
                    <div>
                        <img src={Horreur} alt="" />
                    </div>
                    <div>
                        <h3>Horreur épique</h3>
                        <p>
                            Dès que les visiteurs franchissent les portes de Necroland, ils sont transportés dans un monde en ruines, rempli d'ombres lugubres et de créatures en quête de chair fraîche. Les décors, soigneusement conçus pour créer une ambiance terrifiante, plongent les visiteurs dans un scénario apocalyptique où chaque coin peut cacher un danger mortel.
                        </p>
                    </div>
                </article>
                <article>
                    <div>
                        <img src={Attractions} alt="" />
                    </div>
                    <div>
                        <h3>Des attractions à couper le souffle</h3>
                        <p>
                            Necroland propose une gamme d'attractions et de manèges à couper le souffle qui plairont aux amateurs de sensations fortes. Montez à bord de montagnes russes effrayantes qui traversent des cimetières hantés, affrontez des zombies dans des jeux interactifs et parcourez un labyrinthe terrifiant infesté de morts-vivants.
                        </p>
                    </div>
                </article>
                <article>
                    <div>
                        <img src={Spectacles} alt="" />
                    </div>
                    <div>
                        <h3>Des spectacles époustouflants</h3>
                        <p>
                            Nos spectacles en direct vous feront vivre des moments palpitants alors que des acteurs talentueux interagissent avec des zombies et des effets spéciaux à couper le souffle. Danse macabre, combats épiques et histoires sinistres vous tiendront en haleine tout au long de votre visite.
                        </p>
                    </div>
                </article>
                <article>
                    <div>
                        <img src={Securite} alt="" />
                    </div>
                    <div>
                        <h3>La sécurité avant tout</h3>
                        <p>
                            La sécurité de nos visiteurs est notre priorité absolue. Une équipe de professionnels expérimentés veille à ce que chaque attraction soit sûre tout en offrant des sensations fortes.
                        </p>
                    </div>
                </article>
            </section>
            <section>
                <h2>Plan du parc</h2>
                <div>
                    <img src={Plan} alt="" />
                </div>
                <ul>
                    <li><span>1</span>Feast of shadows</li>
                    <li><span>2</span>Pink elegance bistro</li>
                    <li><span>3</span>Dead encounter</li>
                    <li><span>4</span>Zombie parade</li>
                    <li><span>5</span>Undead plunge</li>
                    <li><span>6</span>Zombie thrill</li>
                </ul>
            </section>
        </main>
    )
}

export default LeParc;