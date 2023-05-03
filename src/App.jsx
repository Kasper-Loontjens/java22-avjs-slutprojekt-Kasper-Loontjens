import { useState } from 'react'
import LoginPage from './components/loginPage.jsx'
import Header from './components/header.jsx'
import ProductPage from './components/productPage.jsx'
import BasketPage from './components/basketPage.jsx'
import './App.css'
import CardLibrary from './components/cardLibrary.jsx'

function App() {
  const [user, setUser] = useState("")
  const [isLoggedIn , setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState("productPage")
  const [nrInBasket, setNrInBasket ] = useState(0)
  const [coinsToSpend, setCoinsToSpend] = useState(0)

  return (
   <div className='appDiv'>
    <Header setCurrentPage={setCurrentPage} nrInBasket={nrInBasket} user={user} coinsToSpend={coinsToSpend}/>
    {isLoggedIn == false && 
    <LoginPage user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>
    } 
    {(currentPage === "productPage" && isLoggedIn == true) && <ProductPage setUser={setUser} user={user} nrInBasket={nrInBasket} setNrInBasket={setNrInBasket} coinsToSpend={coinsToSpend} setCoinsToSpend={setCoinsToSpend}/>}
    {(currentPage === "basketPage" && isLoggedIn == true) && <BasketPage setUser={setUser} user={user} setNrInBasket={setNrInBasket} coinsToSpend={coinsToSpend} setCoinsToSpend={setCoinsToSpend} setCurrentPage={setCurrentPage}/>}
    {(currentPage === "libPage" && isLoggedIn == true) && <CardLibrary user={user} />}

    </div>
  )
}

export default App
