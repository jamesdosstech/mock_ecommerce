import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUPwvHlafCe1xd8pUvhOeNljlHHVq0vJ4",
    authDomain: "crown-database-27bbb.firebaseapp.com",
    projectId: "crown-database-27bbb",
    storageBucket: "crown-database-27bbb.appspot.com",
    messagingSenderId: "207084432085",
    appId: "1:207084432085:web:017feeb81e329db4dd505c"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();  
        
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            }) ;
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userDocRef;
  }
