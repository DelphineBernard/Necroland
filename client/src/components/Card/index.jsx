import rollercoaster from "../../assets/img/rollercoaster.webp"

const Card = ({name, img, description, category}) => {
    return (
        <article className="card-content">
            
            <img src={rollercoaster} alt="" />
            <h3>{name}</h3>
            <div>
                <p>{description}</p>
                <p>{category}</p>
                
                <button>Plus de photos</button>
            </div>
        </article>
    )
}

export default Card;