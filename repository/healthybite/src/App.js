import Food from './pages/Food/Food';
import Login from './pages/Login/Login';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import firebase, { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'; import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyABXtMyR7Fi-xshZaVaelZMwkAldt4WB0M",
  authDomain: "healthybite-b2a20.firebaseapp.com",
  databaseURL: "https://healthybite-b2a20-default-rtdb.firebaseio.com",
  projectId: "healthybite-b2a20",
  storageBucket: "healthybite-b2a20.appspot.com",
  messagingSenderId: "1061070227538",
  appId: "1:1061070227538:web:7c622ae4edd5d0e68ff78b",
  measurementId: "G-K873CFX9CS"
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// }
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore =getFirestore(app)
function App() {
  const [user]= useAuthState(auth)
  return (
    <div>
      {user? <Food/>: <Login/>}
    </div>
  );
}

export default App;
