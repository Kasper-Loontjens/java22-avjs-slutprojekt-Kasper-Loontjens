import { patchFirebase } from "../js/htmlRequest.js";
import { useState } from "react";

export default function BasketPage({setUser, user, setNrInBasket, coinsToSpend, setCoinsToSpend, setCurrentPage}){

    const [message, setMessage] = useState("")
    

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