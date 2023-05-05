import { patchFirebase } from "../js/htmlRequest.js";
import { useState } from "react";

export default function BasketPage({setUser, user, setNrInBasket, coinsToSpend, setCoinsToSpend, setCurrentPage}){

    const [message, setMessage] = useState("")
    
    // Maps out all the cards the user has put in their basket
    const listItems = user.cards.map(c =>
        {if(c.inBasket > 0)
        return (
        <div className="aProduct" key={c.name}>
            <img index={c.i} src={c.imgUrl} alt="card" />
            <p >{c.name} {c.inBasket}x</p>
        </div>
        )
        }
    )

    // Removes all the cards the user has put in basket, and the current price for all the cards in basket
    function handleRestore(event){
        const tempUser = user
        tempUser.cards.forEach(card => {
            card.stock += card.inBasket;
            card.inBasket = 0;
        });
        setNrInBasket(0)
        setCoinsToSpend(0)
        setUser(tempUser)
        setCurrentPage("productPage")
    }

    // Adds the cards the user wants to buy to their library, spends the coins and uppdates the user on the database
    function handlePurchase(){
        const tempUser = user
        tempUser.cards.forEach(card => {
            card.bought += card.inBasket;
            card.inBasket = 0;
        });
        setNrInBasket(0)
        tempUser.coins -= coinsToSpend;
        setUser(tempUser);
        const url = ("https://cardshop-260a1-default-rtdb.europe-west1.firebasedatabase.app/users/"+user.index+".json")
        patchFirebase(url, user)
        setCoinsToSpend(0)
        if(coinsToSpend > 0){
            setMessage("Purchase comlete!")
        }
         
    }

    // Shows collective price of all cards in basket, all cards user wants to buy, and buttons for buying or reseting all cards in basket
    return(
        <div className="basketDiv">
            {listItems}
            <p>price: {coinsToSpend}</p>
            <button className="basketbutton" onClick={handlePurchase}>Purchase</button>
            <button className="basketbutton" onClick={handleRestore}>Restore</button>
            <h2>{message}</h2>
            
        </div>
    )

}