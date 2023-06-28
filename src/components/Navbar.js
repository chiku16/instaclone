import React, { useContext } from "react";
import {Link, useNavigate} from 'react-router-dom'
import {UserContext} from '../App';

const Navbar = ()=>{

     const { state, dispatch } = useContext(UserContext);
     const navigate = useNavigate();

    const navList = () => {
        if (state) {//if the user object is present
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/createpost">CreatePost</Link></li>,
                 <li><Link to="/myfollowingpost">My following Posts</Link></li>,
                <li>
                    <button onClick={() => {
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                         navigate('/login')
                    }} className="btn #c62828 red darken-3">Logout</button>
                </li>
            ]
        } else {
            return [
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }

    return(
        <nav>
            <div className="nav-wrapper white">
                <Link to={state ? "/" : "/login"} className="brand-logo left">Instagram</Link>
                {/* <Link to={state ? "/" : "/login"} className="brand-logo left">Instagram</Link> */}
                <ul id="nav-mobile" className="right">
                        {navList()}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar