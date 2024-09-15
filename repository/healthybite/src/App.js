import Login from './pages/Login/Login';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';
import Home from './pages/Home/Home';
import Category from './pages/Category/Category';

function App() {
  const [user]= useAuthState(auth)
  return (
    <div>
      {//user? <Home/>: <Login/>
      }
      <Category/>
    </div>
  );
}

export default App;
