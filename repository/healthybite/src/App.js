import Login from './pages/Login/Login';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';
import Home from './pages/Home/Home';
import UserProfile from './pages/UserProfile/UserProfile';

function App() {
  const [user]= useAuthState(auth)
  return (
    <div>
      {//user? <Home/>: 
        user? <UserProfile/>: <Login/>
      
      }
    </div>
  );
}

export default App;
