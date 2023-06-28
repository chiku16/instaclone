import React, { useState, useEffect, useContext } from "react";

const Home = ()=>{

    const [posts, setPosts] = useState([]); //initialize to empty array
    
    useEffect(() => {
        fetch("/posts", {
            method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => response.json())
            .then(function (data) {
                console.log(data);
                setPosts(data.posts);
            }).catch(error => {
                console.log(error);
            });
    }, []);//we want to lad only once when component is mounting/loading thats why an empty array as dependency

    return(
        <div className="home">
            {
                 posts.map((post) =>{
                        return(

                                <div className="card home-card" key={post._id}>
                                    <h5>Ramesh{post.author.fullName}</h5>
                                    <div className="card-image">
                                    <img alt="not available" src={post.image}/>
                                    </div>
                                    <div className="card-content">
                                        <i className="material-icons" style={{color:"red"}}>favorite</i>
                                        <h6>{post.title}</h6>
                                        <p>{post.body}</p>
                                        <input type="text" placeholder="Enter comment" />
                                    </div>
                                </div>            
                        )
                 })
            }
        </div>
    )
}

export default Home