import React, {useState,useContext} from "react";
import {Link, useNavigate,useParams} from 'react-router-dom';
import M from 'materialize-css';

const Login = ()=>{
    
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {token1} = useParams()
    console.log(token1)
    const submitData = () =>{
        
        fetch("/new-password",{
            method:"post",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({                               
                password,
                token1
            })
        }).then(response => response.json())
        .then(function (data) {
            console.log(data);
            if (data.error) {
                M.toast({ html: data.error, classes: "#c62828 red darken-3" });
            }
            else {
                    
                    M.toast({ html: data.message, classes: "#388e3c green darken-2" });
                    navigate('/login');
            }
        }).catch(error => {
            console.log(error);
        })
    }

        return(
            <div className="mycard">
                <div className="card auth-card input-field">
                    <h2>Instagram</h2>
                    <input 
                        type="password"
                        value={password}
                        placeholder="Enter New Password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                <button onClick={() => submitData()} className="btn waves-effect waves-light btn-large #64b5f6 blue darken-1">Update Password</button>
                </div>
            </div>
        )
    }

export default Login