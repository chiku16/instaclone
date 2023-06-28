import React,{ useEffect, createContext, useReducer, useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter,Route,Routes,useNavigate} from 'react-router-dom'
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Profile from './components/screens/Profile'
import SignUp from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost';
import {reducer, initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile';
import SubscribesUserPosts from './components/screens/SubscribesUserPosts';
import Reset from './components/screens/Reset';
import NewPassword from './components/screens/Newpassword';

export const UserContext = createContext();

const CustomRouting = () => {
  

   const navigate = useNavigate();
   
   const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(typeof(user),user)
    if (user) {
      dispatch({ type: "USER", payload: user });
      // navigate('/');//user logged in so redirect to home
    } else {
      navigate('/login')
    }
  }, []);//called when component mounts and get called only once

  return (

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/profile/:userid" element={<UserProfile />} />
          <Route path="/myfollowingpost" element={<SubscribesUserPosts />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/reset/:token1" element={<Reset />} />
        </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state: state, dispatch: dispatch }}>
      <BrowserRouter>
          <Navbar />
          <CustomRouting />
      </BrowserRouter>
     </UserContext.Provider>
  );
}
 
export default App;
