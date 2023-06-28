import React,{useEffect,useState,useContext} from "react";
import './profile.css';
import {UserContext} from '../../App';
import { useParams } from "react-router-dom";

const Profile = ()=>{
    const [userProfile,setProfile] = useState(null)
    
    const { state, dispatch } = useContext(UserContext);
    const {userid} = useParams()
    // console.log(userid)
    const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
          
            setProfile(result)
        })
     },[])

     const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
             dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
             setProfile((prevState)=>{
                 return {
                     ...prevState,
                    //   user:data
                     user:{
                         ...prevState.user,
                         followers:[...prevState.user.followers,data._id]
                        }
                 }
             })
             setShowFollow(false)
        })
    }

    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
            
             setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
             setShowFollow(true)
             
        })
    }

    return(
        <>
            {userProfile ?  
                    <div className="main-container">
                    <div className="profile-container">
                        <div>
                            <img alt="not available" style={{ width: "166px", height: "166px", borderRadius: "83px" }} 
                             src={userProfile.user.pic}  />
                        </div>
                        <div className="details-section">
                            <h4>{userProfile.user.name}</h4>
                            <h5>{userProfile.user.email}</h5>
                            <div className="ff">
                                <h6>{userProfile.posts.length} posts</h6>
                                <h6>{userProfile.user.followers.length} followers</h6>
                                <h6>{userProfile.user.following.length} following</h6>
                            </div>
                            {showfollow?
                                <button style={{margin:"10px"}} onClick={() => followUser()} className="btn waves-effect waves-light btn-large #64b5f6 blue darken-1">Follow</button>
                             :
                                <button style={{margin:"10px"}} onClick={() => unfollowUser()} className="btn waves-effect waves-light btn-large #64b5f6 blue darken-1">Unfollow</button>
                            }
                        </div>
                    </div>
                    <div className="posts">
                        {
                            userProfile.posts.map(item=>{
                                return(
                                    <img key={item._id} src={item.photo} alt={item.title}/>
                                )
                            })
                        }
                        
                    </div>
                </div>
            
            : <h2>loading...</h2>}
        
        </>
    )
}

export default Profile