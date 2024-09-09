import {useState} from 'react';
import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getFirestore,collection, addDoc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup,currentUser } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

const firebaseConfig = {
  // AGREGAR CREDENCIALES ACA //
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore =getFirestore(app)
