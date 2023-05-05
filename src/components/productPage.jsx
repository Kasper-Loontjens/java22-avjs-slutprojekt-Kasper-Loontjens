import AProduct from "./aProduct.jsx";
export default function ProductPage({setUser,user, nrInBasket, setNrInBasket, coinsToSpend, setCoinsToSpend}){
    
    // When The image of a product is clicked it will add that card to the basket if the user has enought coins to spend
    // The cost of all the cards in the basket will also be uppdated
    function handleClick(event){
        const tempUser = user
        const cardIndex = event.target.getAttribute("index")
        
        console.log(tempUser.cards[cardIndex].name)
        if(tempUser.cards[cardIndex].stock > 0 && user.coins >= (coinsToSpend + tempUser.cards[cardIndex].cost)){
            setCoinsToSpend(coinsToSpend + tempUser.cards[cardIndex].cost);
            
            tempUser.cards[cardIndex].stock --;
            tempUser.cards[cardIndex].inBasket ++;
            setNrInBasket(nrInBasket + 1)

            setUser(tempUser)

        }

    }

    // Maps out all buyable cards
    return(
        <div className="productPage">
            {user.cards.map( c=>
            <AProduct key={(c.name)} card={c} handleClick={handleClick}/>
            )}
        </div>
    )
}