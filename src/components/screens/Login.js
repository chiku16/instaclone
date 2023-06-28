import React, {useState,useContext} from "react";
import {Link, useNavigate} from 'react-router-dom';
import M from 'materialize-css';
import {UserContext} from '../../App';

const Login = ()=>{
    const { state, dispatch } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitData = () =>{
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Enter valid email!", classes: "#c62828 red darken-3" });
            return
        }
        fetch("/signin",{
            method:"post",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
                
                email,
                password,
            })
        }).then(response => response.json())
        .then(function (data) {
            console.log(data);
            if (data.error) {
                M.toast({ html: data.error, classes: "#c62828 red darken-3" });
            }
            else {
                    localStorage.setItem("token", data.token);
                     localStorage.setItem("user", JSON.stringify(data.user));
                    // // dispatch the action and state to the reducer
                    dispatch({ type: "USER", payload: data.user });
                    M.toast({ html: "Login Successful!", classes: "#388e3c green darken-2" });
                    navigate('/');
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
                        type="text"
                        value={email}
                        placeholder="Email"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <input 
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                <button onClick={() => submitData()} className="btn waves-effect waves-light btn-large #64b5f6 blue darken-1">Login</button>
                <h5>
                     <Link to="/signup">Don't have an account ?</Link>
                 </h5>
                <h6>
                     <Link to="/reset">Forgot password</Link>
                 </h6>
                </div>
            </div>
        )
    // const { state, dispatch } = useContext(UserContext);
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const navigate = useNavigate();

    // const login = () => {
    //     if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
    //         M.toast({ html: "Enter valid email!", classes: "#c62828 red darken-3" });
    //         return
    //     }
    //     fetch("/login", {
    //         method: "post",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             email: email,
    //             password: password
    //         })
    //     })
    //         .then(response => response.json())
    //         .then(function (data) {
    //             console.log(data);
    //             if (data.error) {
    //                 M.toast({ html: data.error, classes: "#c62828 red darken-3" });
    //             }
    //             else {
                    // localStorage.setItem("token", data.token);
                    //  localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
                    // // dispatch the action and state to the reducer
                    // dispatch({ type: "USER", payload: data.userInfo });
                    // M.toast({ html: "Login Successful!", classes: "#388e3c green darken-2" });
                    // navigate('/');
    //             }
    //         }).catch(error => {
    //             console.log(error);
    //         })
    // }


    // return(
    //     <div className="mycard">
    //         <div className="card auth-card input-field">
    //             <h2>Instagram</h2>
    //             <input 
    //             type="text"
    //             placeholder="Email"
    //             value={email}
    //             onChange={(event) => setEmail(event.target.value)}
    //             />
    //             <input 
    //             type="text"
    //             placeholder="Password"
    //             value={password}
    //             onChange={(event) => setPassword(event.target.value)}
    //             />
    //             <button onClick={() => login()} className="btn waves-effect waves-light btn-large #64b5f6 blue darken-1">Login</button>
    //             <h5>
    //                 <Link to="/signup">Don't have an account ?</Link>
    //             </h5>
    //         </div>
    //     </div>
    // )
}

export default Login