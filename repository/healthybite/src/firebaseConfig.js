import {useState} from 'react';
import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getFirestore,collection, addDoc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup,currentUser } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

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
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore =getFirestore(app)
