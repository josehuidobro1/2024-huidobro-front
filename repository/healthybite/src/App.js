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
import { fetchUser, getIdToken, getUserNotification, markNotificationAsRead } from './firebaseService';
import NotificationPopup from './components/NotificationPopup';
import NotFound from './pages/NotFound/NotFound';
import Loading from './components/Loading';

export const UserContext = createContext(null);

function App() {
  const [token, setToken]=useState(null)
  const [user]=useAuthState(auth);
  const [user_id, setUser_id]= useState(null)
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading]=useState(false)
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

  const get_token=async()=>{
    try {
      const token = await getIdToken();
      setToken(token);
    } catch (err) {
      console.error("Error obteniendo el token:", err);
    }
  }

  useEffect(() => {
    console.log("USEEER ", user_id)
    if (user) {
      get_token();
      setUser_id(user.uid);
    } else {
      setUser_id(null);
    }
  }, [user]);

  useEffect(() => {
    console.log('user_id ', user_id)
    if (user_id && token) {
      fetchNotification();
    }
  }, [user_id, token]);

  return (
    <UserContext.Provider value={{user_id, setUser_id}} >
      <Router>
        {user_id && notifications.length> 0 && <NotificationPopup notifications={notifications} onDismiss={handleDismissNotification}/>}
        {loading ?
         (
          <Loading />
         ):
        (<Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="/" element={<Login />}/>
          <Route path="/plates" element={<Plates/>}/>
          <Route path="/drinks" element={<Drinks/>}/>
          <Route path='/schedule' element={<Schedule/>}/>
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/category" element={<Category/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        )}
      </Router>
    </UserContext.Provider>
  );
}

export default App;
