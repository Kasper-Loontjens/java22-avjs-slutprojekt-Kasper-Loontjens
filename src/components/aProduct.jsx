export default function AProduct({card,handleClick}){
    return(
        <div className="aProduct">
            
            <img index={card.i} onClick={handleClick} src={card.imgUrl} alt="card" />
            <p>cost: {card.cost} / stock: {card.stock}</p>
                    
        </div>
    )
}