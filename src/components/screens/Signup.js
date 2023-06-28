import React, { useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';

const SignUp = ()=>{

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState(undefined);

    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])

    const uploadPic =()=>{
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-app-clone");
        data.append("cloud_name", "instacloneapp124");

        fetch("https://api.cloudinary.com/v1_1/instacloneapp124/image/upload", {
            method: "post",
            body: data
        }).then(response => response.json())
            .then(data => {
                //setImage(data.url);
                setUrl(data.url);
                console.log(data);
            })
            .catch(error => console.log(error));
    }
    const uploadFields =()=>{
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Enter valid email!", classes: "#c62828 red darken-3" });
            return
        }
        fetch("/signup",{
            method:"post",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                pic:url
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
    const submitData = () =>{
        if(image){
            uploadPic()
        }
        else{
            uploadFields()
        }
    }

    return(
        <div className="mycard">
        <div className="card auth-card input-field">
            <h2>Instagram</h2>
             <input 
            type="text"
            value={name}
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
            />
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
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Pic</span>
                    {/* <input type="file" onChange={(event) => setImage(event.target.files[0])} /> */}
                    <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button onClick={() => submitData()} className="btn waves-effect waves-light btn-large #64b5f6 blue darken-1">Signup</button>
            <h5>
                     <Link to="/login">Already have an account ?</Link>
             </h5>
            </div>
        </div>
    )
    
}

export default SignUp