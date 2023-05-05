export default function AProduct({card,handleClick}){
    return(
        // Shows a product
        <div className="aProduct">
            
            <img index={card.i} onClick={handleClick} src={card.imgUrl} alt="card" />
            <p>cost: {card.cost} / stock: {card.stock}</p>
                    
        </div>
    )
}