const Card = ({name, img, description, category}) => {
    return (
        <article>
            <h3>{name}</h3>
            <img src={img} alt="" />
            <div>
                <p>{description}</p>
                <p>{category}</p>
                
                <button>Plus de photos</button>
            </div>
        </article>
    )
}

export default Card;