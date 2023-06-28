import React, {useState,useEffect} from "react";
 import {useNavigate} from 'react-router-dom';
 import './createPost.css';
 import M from 'materialize-css';


const CreatePost = () =>{

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    // const [Name, setName] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(url){

        
        fetch("/createpost", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                title: title,
                body: body,
                // Name: Name,
                pic: url
            })
        })
            .then(response => response.json())
            .then(function (data) {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" });
                }
                else {
                    M.toast({ html: "Post created successfully!", classes: "#388e3c green darken-2" });
                    navigate('/');
                }
            }).catch(error => {
                console.log(error);
            })
        }
    },[url])

    const submitPost = () => {
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

    // useEffect(() => {
    //     if (image) {//only call when the value of image exist
    //         //call to create post api
            // fetch("/createpost", {
            //     method: "post",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Authorization": "Bearer " + localStorage.getItem("token")
            //     },
            //     body: JSON.stringify({
            //         title: title,
            //         body: body,
            //         image: image
            //     })
            // })
            //     .then(response => response.json())
            //     .then(function (data) {
            //         if (data.error) {
            //             M.toast({ html: data.error, classes: "#c62828 red darken-3" });
            //         }
            //         else {
            //             M.toast({ html: "Post created successfully!", classes: "#388e3c green darken-2" });
            //             navigate('/');
            //         }
            //     }).catch(error => {
            //         console.log(error);
            //     })
    //     }
    // }, [image]);//only call when the value of image changes


    

    return(
        <div className="card create-post-container">
            <input
                type="text"
                value={title} 
                onChange={(event) => setTitle(event.target.value)}
                placeholder="post title" />
            
            <input
                value={body}
                onChange={(event) => setBody(event.target.value)}
                type="text" placeholder="post content" />
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Post Image</span>
                    {/* <input type="file" onChange={(event) => setImage(event.target.files[0])} /> */}
                    <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            {/* <button onClick={() => submitPost()} className="btn waves-effect waves-light btn-large #64b5f6 blue darken-1">Submit Post</button> */}
            <button onClick={() => submitPost()} className="btn waves-effect waves-light btn-large #64b5f6 blue darken-1">Submit Post</button>
        </div>
    )
}

export default CreatePost