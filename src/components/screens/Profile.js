import React,{useEffect,useState,useContext} from "react";
import './profile.css';
import {UserContext} from '../../App';

const Profile = ()=>{
    const { state, dispatch } = useContext(UserContext);
    const [mypics,setPics] = useState([])
    const [image, setImage] = useState("");
    // const [url, setUrl] = useState("");
    useEffect(()=>{
        fetch('/mypost',{
            // method: "get",
           headers: {
               "Authorization": "Bearer " + localStorage.getItem("token")
           }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            setPics(result.mypost)
        })
    },[])

    useEffect(()=>{
        if(image){
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "insta-app-clone");
            data.append("cloud_name", "instacloneapp124");
    
            fetch("https://api.cloudinary.com/v1_1/instacloneapp124/image/upload", {
                method: "post",
                body: data
            }).then(response => response.json())
                .then(data => {
                    
                    fetch('/updatepic',{
                        method:"put",
                        headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer "+localStorage.getItem("token")
                        },
                        body:JSON.stringify({
                            pic:data.url
                        })
                    }).then(res=>res.json())
                    .then(result=>{
                        console.log(result)
                        localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                        dispatch({type:"UPDATEPIC",payload:result.pic})
                        //window.location.reload()
                    })
                
                 })
                 .catch(err=>{
                     console.log(err)
                 })
                }
             },[image])

    const updatePhoto = (file) =>{
        setImage(file)     
    }

    return(
        
        <div className="main-container">
            <div className="D2">
            <div className="profile-container">
                <div>
                    <img alt="not available" style={{ width: "166px", height: "166px", borderRadius: "83px" }} 
                     src={state?state.pic:"loading.."}  />
                     
                </div>
                <div className="details-section">
                    <h4>{state?state.name:"loading.."}</h4>
                    <h5>{state?state.email:"loading.."}</h5>
                    <div className="ff">
                        <h6>{mypics.length} posts</h6>
                        <h6>{state?state.followers.length:"0"} followers</h6>
                        <h6>{state?state.following.length:"0"} following</h6>
                    </div>
                </div>
            </div>
                    <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Update Pic</span>
                    {/* <input type="file" onChange={(event) => setImage(event.target.files[0])} /> */}
                    <input type="file" onChange={(e) => updatePhoto(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>       
            </div>            
            <div className="posts">
                {
                    mypics.map(item=>{
                        return(
                            <img key={item._id} src={item.photo} alt={item.title}/>
                        )
                    })
                }
                
            </div>
        </div>
    )
}

export default Profile