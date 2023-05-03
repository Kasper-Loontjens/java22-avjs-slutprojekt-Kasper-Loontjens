import AProduct from "./aProduct.jsx";
export default function ProductPage({setUser,user, nrInBasket, setNrInBasket, coinsToSpend, setCoinsToSpend}){
    
    function handleClick(event){
        // console.log(event.target.getAttribute("alt"))
        const tempUser = user
        const cardIndex = event.target.getAttribute("index")
        
        console.log(tempUser.cards[cardIndex].name)
        if(tempUser.cards[cardIndex].stock > 0 && user.coins >= (coinsToSpend + tempUser.cards[cardIndex].cost)){
            setCoinsToSpend(coinsToSpend + tempUser.cards[cardIndex].cost);
            
            tempUser.cards[cardIndex].stock --;
            tempUser.cards[cardIndex].inBasket ++;
            setNrInBasket(nrInBasket + 1)

            setUser(tempUser)
            console.log(coinsToSpend)
            console.log(user.cards[cardIndex].stock)
            console.log(user.cards[cardIndex].inBasket)
        }

    }

    return(
        <div className="productPage">
            {user.cards.map( c=>
            <AProduct key={(c.name)} card={c} handleClick={handleClick}/>
            )}
        </div>
    )
}