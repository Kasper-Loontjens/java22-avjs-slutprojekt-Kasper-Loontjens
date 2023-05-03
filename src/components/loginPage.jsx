import { getFirebase, patchFirebase } from "../js/htmlRequest.js";
import { useEffect, useState } from 'react'
import newUser from '../assets/newUser.json'



export default function LoginPage({user, setUser, setIsLoggedIn}){
    const [fireUsers, setFireUsers] = useState([]);
    const [allFirebase, setAllFirebase] = useState("");
    const tempNewUser = newUser;


    useEffect(
        ()=>{
            getFirebase("https://cardshop-260a1-default-rtdb.europe-west1.firebasedatabase.app/users/.json")
            .then(data=> {
                logFireUsers(data)
                setAllFirebase(data)
            })
        },[]
    )

    function logFireUsers(data){
        if(Array.isArray(data)){
            const newUsers = data.map(u => {return(
                u.name
            )})
            setFireUsers(newUsers)
            console.log(newUsers)
        }
    }

    let tempLoginName = ""
    function loginHandle(event){
        event.preventDefault();
        console.log(tempLoginName);
        console.log(allFirebase)
        
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


    function nameHandle(event){
        tempLoginName = event.target.value
    }  


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