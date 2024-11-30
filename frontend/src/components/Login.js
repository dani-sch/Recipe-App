import React, { useState } from "react";
import axios from "axios";

function Login(){
    const[credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const[message, setMessage] = useState(""); //success/error message
    const[token, setToken] = useState("");  //store authentication token

    const handleChange = (e)=> {
        setCredentials({...credentials, [e.target.name]: e.target.value})};
    
    const handleSubmit = async (e) =>{
        e.preventDefault(); //prevent page reload
        try{
            const response = await axios.post("/api/users/login/", credentials);
            setToken(response.data.token);
            setMessage("Login Successful");
        } catch(error){
            setMessage("Invalid username or password.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input //username
                    name = "username"
                    onChange = {handleChange}
                    placeHolder = "Username"
                    required
                />
                <input //password
                    name = "password"
                    type = "password"
                    onChange = {handleChange}
                    placeHolder = "Password"
                    required
                />
                <button type = "submit">Login</button>
            </form>
            <p>{message}</p> 
            {token && <p>Your token: {token}</p>}
            
        </div>
    );
}
export default Login;
 