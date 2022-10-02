import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
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

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
      prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
      userAuth, 
      additonalInformation = { }
    ) => {
    if (!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();  
        
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additonalInformation
            }) ;
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)

  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)

  }

  export const signOutUser = async () => await signOut(auth);
