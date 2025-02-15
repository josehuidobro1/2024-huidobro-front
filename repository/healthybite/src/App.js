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
import { useEffect, useState } from 'react';
import { getUserNotification, markNotificationAsRead } from './firebaseService';
import NotificationPopup from './components/NotificationPopup';

function App() {
  const [user]= useAuthState(auth)
  const [notifications, setNotifications] = useState([]);

  const fetchNotification=async()=>{
    const fetchedNotifications = await getUserNotification(user.uid);
    setNotifications(fetchedNotifications || []);
  }

  const handleDismissNotification = async (notificationId) => {
      try {
          await markNotificationAsRead(user.uid, notificationId);
          console.log('notificacion id ', notificationId)
          setNotifications(notifications.filter(notif => notif.id !== notificationId));
      } catch (err) {
          console.error("Error dismissing notification:", err);
      }
  };

  useEffect(()=>{
    user && fetchNotification(user.uid)
  },[])

  return (
    <Router>
        {user && notifications.length> 0 && <NotificationPopup notifications={notifications} onDismiss={handleDismissNotification}/>}
        <Routes>
          <Route path="/" element={ user ? <Home userId={user.uid} /> : <Login />} />
          <Route path="/plates" element={<Plates userId={user.uid} />}/>
          <Route path="/drinks" element={<Drinks userId={user.uid} />}/>
          <Route path='/schedule' element={<Schedule userId={user.uid} />}/>
          <Route path="/user-profile" element={<UserProfile  userId={user.uid} />} />
          <Route path="/resetPassword" element={<ResetPassword  userId={user.uid} />} />
          <Route path="/category" element={<Category userId={user.uid} />} />
          <Route path="/dashboard" element={<Dashboard  userId={user.uid} />} />
          <Route path="/community" element={<Community  userId={user.uid} />} />
        </Routes>
      </Router>

  );
}

export default App;
