import Login from './pages/Login/Login';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [user]= useAuthState(auth)
  return (
    <Router>
        <Routes>
          { user? <Route path="/" element={<Home />} /> : <Route path="/login" element={<Login />} />}
          {/*<Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/category" element={<Category />} />*/}
        </Routes>
      </Router>

  );
}

export default App;
