import Login from './pages/Login/Login';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfile from './pages/UserProfile/UserProfile';
import Category from './pages/Category/Category';
import Dashboard from './pages/Dashboard/Dashboard';
import { Plates } from './pages/Plates/Plates';
import { Drinks } from './pages/Drinks/Drinks';
import { Community } from './pages/Community/Community';
import Schedule from './pages/Schedule/Schedule';
import { createContext, useEffect, useState } from 'react';
import { getUserNotification, markNotificationAsRead } from './firebaseService';
import NotificationPopup from './components/NotificationPopup';

export const UserContext = createContext(null);

function App() {
  const [user] = useAuthState(auth);
  const [user_id, setUser_id]= useState(useAuthState(auth))
  const [notifications, setNotifications] = useState([]);
  const fetchNotification=async()=>{
    const fetchedNotifications = await getUserNotification(user_id);
    setNotifications(fetchedNotifications || []);
  }

  const handleDismissNotification = async (notificationId) => {
      try {
          await markNotificationAsRead(notificationId);
          setNotifications(notifications.filter(notif => notif.id !== notificationId));
      } catch (err) {
          console.error("Error dismissing notification:", err);
      }
  };

  useEffect(()=>{
    user_id && fetchNotification(user_id)
  },[user_id])
  
  useEffect(()=>{
    if(user){
      setUser_id(user.uid);
    }else{
      setUser_id(null);
    }
  },[user])

  return (
    <UserContext.Provider value={{user_id, setUser_id}} >
      <Router>
        {user_id && notifications.length> 0 && <NotificationPopup notifications={notifications} onDismiss={handleDismissNotification}/>}
        <Routes>
          <Route path="/healthyBite" element={<Login />}/>
          <Route path="/" element={<Home />}/>
          <Route path="/plates" element={<Plates/>}/>
          <Route path="/drinks" element={<Drinks/>}/>
          <Route path='/schedule' element={<Schedule/>}/>
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/category" element={<Category/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
