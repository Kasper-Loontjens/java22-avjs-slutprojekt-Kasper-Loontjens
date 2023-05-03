export default function Header({ setCurrentPage , nrInBasket, user, coinsToSpend}){
    
    function handleSetPage(event){
        setCurrentPage(event.target.getAttribute("val")) 
    }
    return(
        <div className="headerDiv">
            {user.coins >= 0 && 
            <div className="header">
                <h4>{user.name}</h4>
                <p>Coins: {user.coins}</p>
                <button onClick={handleSetPage} val="libPage">Library</button>
                <button onClick={handleSetPage} val="productPage">Products</button>
                <button onClick={handleSetPage} val="basketPage">Basket / {nrInBasket} / {coinsToSpend}</button>
            </div>}
        </div>
    )
}