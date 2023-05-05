export default function Header({ setCurrentPage , nrInBasket, user, coinsToSpend}){
    // Changes the the page between libraby, shop and basket
    function handleSetPage(event){
        setCurrentPage(event.target.getAttribute("val")) 
    }
    // Shows name, amount of coins the user has and buttons to switch pages
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