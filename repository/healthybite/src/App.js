import Food from './pages/Food/Food';
import Login from './pages/Login/Login';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';

function App() {
  const [user]= useAuthState(auth)
  return (
    <div>
      {user? <Home/>: <Login/>}
    </div>
  );
}

export default App;
