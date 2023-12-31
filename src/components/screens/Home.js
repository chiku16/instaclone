import React, { useState, useEffect, useContext } from "react";
import {UserContext} from '../../App';
import {Link, useNavigate} from 'react-router-dom';

const Home = ()=>{
    const [data, setData] = useState([]);
    const { state, dispatch } = useContext(UserContext);
    useEffect(() => {
        fetch("/allpost", {
             method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(response => response.json())
            .then(result => {
                 console.log(result);
                setData(result.posts);
            }).catch(error => {
                console.log(error);
            });
    }, []);

    const likePost = (id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result)
          const newData = data.map(item=>{
              if(item._id==result._id){
                  return result
              }else{
                  return item
              }
          })
          setData(newData)
        }).catch(err=>{
            console.log(err)
        })
  }

    const unlikePost = (id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("token")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
          const newData = data.map(item=>{
              if(item._id==result._id){
                  return result
              }else{
                  return item
              }
          })
          setData(newData)
        }).catch(err=>{
            console.log(err)
        })
  }

  const makeComment = (text,postId)=>{
    fetch('/comment',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
        },
        body:JSON.stringify({
            postId,
            text
        })
    })
.then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = data.map(item=>{
          if(item._id==result._id){
              return result
          }else{
              return item
          }
       })
      setData(newData)
    }).catch(err=>{
        console.log(err)
    })
  }

  const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
  }

    return(
        <div className="home">

           { 
                data.map(item=>{
                    
                        return(
                                
                                <div className="card home-card" key={item._id}>
                                    <h5 style={{padding:"6px"}}><Link to={ item.PostedBy._id !== state._id ? "/profile/"+item.PostedBy._id : "/profile/"}>{item.PostedBy.name}</Link> {item.PostedBy._id == state._id
                                        && <i className="material-icons" style={{float:"right"}}
                                        onClick={()=>deletePost(item._id)}
                                        >delete</i>
                                    }</h5>
                                    <div className="card-image">
                                        <img src={item.photo} />
                                    </div>
                                    <div className="card-content">
                                        <i className="material-icons" style={{ color: "red", marginRight: "10px" }}>favorite</i>
                                        {item.likes.includes(state._id)
                                        ?
                                            <i className="material-icons" onClick={()=>{unlikePost(item._id)}} >thumb_down</i>
                                        :    
                                            <i className="material-icons" onClick={()=>{likePost(item._id)}} >thumb_up</i>
                                        }
                                        <h6>{item.likes.length} likes</h6>
                                        <h6>{item.title}</h6>                                      
                                        <p>{item.body}</p>
                                        {
                                            item.comments.map(record=>{
                                                return(
                                                    <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.PostedBy.name}</span> {record.text}</h6>
                                                )
                                            })
                                        }
                                        <form onSubmit={(e)=>{
                                            e.preventDefault()
                                            makeComment(e.target[0].value,item._id)   
                                        }}>
                                            <input type="text" placeholder="add a comment" />
                                        </form>
                                    </div>
                                </div>
                        )
                })
            }
        </div>
    )
    // const [posts, setPosts] = useState([]); //initialize to empty array
    // const { state, dispatch } = useContext(UserContext);

    // useEffect(() => {
    //     fetch("/posts", {
    //         method: "get",
    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem("token")
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(function (data) {
    //             console.log(data);
    //             setPosts(data.posts);
    //         }).catch(error => {
    //             console.log(error);
    //         });
    // }, []);//we want to lad only once when component is mounting/loading thats why an empty array as dependency
        
    // return(
    //     <div className="home">
    //         {
    //             posts.map((post) => {
    //                 return (
                        
    //                     <div className="card home-card" key={post._id}>
    //                         <h5 style={{ padding: "10px" }}>
    //                             {console.log(post.author)}
                                
    //                             Ramesh

    //                         </h5>
                            
    //                         <div className="card-image">
    //                             <img src={post.image} />
    //                         </div>
    //                         <div className="card-content">
    //                             <i className="material-icons" style={{ color: "red", marginRight: "10px" }}>favorite</i>


                                
    //                             <h6>{post.title}</h6>
    //                             <p>{post.body}</p>
                                
                                
    //                         </div>
    //                     </div>
    //                 )
    //             })
    //         }
    //     </div>
    // )
}

export default Home