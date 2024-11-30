import React, {useState} from "react";
import axios from "axios"; // Used to send requests to backend

function Register(){
    //form input values
    const[formData, setFormData]= useState({
        username:"", 
        email: "",
        password: "",
    });
    //Display message after registration (sucess or error)
    const[message, setMessage] = useState("");

    //Handles updating formData and changes to input fields
    const handleChange = (e)=> {
        setFormData({formData, [e.target.name]: e.target.value});
    }
    //handles form submission to register user
    const handleSubmit = async (e) =>{
        //prevents form from refreshing page
        e.preventDefault();
        try{
            const response = await axios.post("/api/users/register", formData);
            setMessage("Registration successful! You can now log in.");
        }catch(error){
            setMessage(
                error.response?.data?.username
                ? error.response.data.username[0]
                : "Something went wrong. Please try again."
            );
    }

    };
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input //username
                    name = "username"
                    onChange = {handleChange}
                    placeHolder = "Username"
                    required
                />
                <input //email
                    name = "email"
                    type = "email"
                    onChange = {handleChange}
                    placeHolder = "Email"
                    required
                />
                <input //password
                    name = "password"
                    type = "password"
                    onChange = {handleChange}
                    placeHolder = "Password"
                    required
                />
                <button type = "submit">Register</button>
            </form>
            <p>{message}</p> 
            
        </div>




    )
}
export default Register;