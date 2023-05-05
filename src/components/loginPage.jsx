import { getFirebase, patchFirebase } from "../js/htmlRequest.js";
import { useEffect, useState } from 'react'

// template for creating new user
import newUser from '../assets/newUser.json'


export default function LoginPage({user, setUser, setIsLoggedIn}){
    const [fireUsers, setFireUsers] = useState([]);
    const [allFirebase, setAllFirebase] = useState("");
    const tempNewUser = newUser;

    // Gets the data from firebase when page is loaded
    useEffect(
        ()=>{
            getFirebase("https://cardshop-260a1-default-rtdb.europe-west1.firebasedatabase.app/users/.json")
            .then(data=> {
                logFireUsers(data)
                setAllFirebase(data)
            })
        },[]
    )
    
    // Shows/maps all the customers in the database
    function logFireUsers(data){
        if(Array.isArray(data)){
            const newUsers = data.map(u => {return(
                u.name
            )})
            setFireUsers(newUsers)
            console.log(newUsers)
        }
    }

    // Lets the user login 
    let tempLoginName = ""
    function loginHandle(event){
        event.preventDefault();
        console.log(tempLoginName);
        console.log(allFirebase)
        
        // If user exist as customer loggs in as that user, if not this creates a new user/customer and saves it to database
        if (!checkLogin(allFirebase)){

            tempNewUser.name = tempLoginName
            tempNewUser.index = allFirebase.length

            const url = ("https://cardshop-260a1-default-rtdb.europe-west1.firebasedatabase.app/users/"+allFirebase.length+".json")
            patchFirebase(url, tempNewUser)
            setUser(tempNewUser)
            setIsLoggedIn(true)
        }
        event.target.reset();
    }

    // Checks if the user exist as a previous customer, if they do it loggs in as that user 
    function checkLogin(firebaseUsers){
        let check = false
        firebaseUsers.forEach(element => {
            if(element.name === tempLoginName){
                setUser(element) ; 
                console.log("shiii");
                setIsLoggedIn(true)
                check = true;  
            }
        })
        return check
    }

    // Holds users name written by user in form
    function nameHandle(event){
        tempLoginName = event.target.value
    }  

    // Shows a form for logging in aswell as all customers in database
    return(
        <div className="loginForm">
            <form onSubmit={loginHandle}>
                <p>Warning lowercase sensitive</p>
                <input onChange={nameHandle} type="text" />
                <button>Login</button>
            </form>
            {fireUsers.map(u => <p key={u}>{u}</p>)}
        </div>

    )
}