import { 
    signInWithGooglePopUp, 
    createUserDocumentFromAuth, 
    signInWithGoogleRedirect,
    auth 
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopUp();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>
                Click for Pop Sign In
            </button>
            <SignUpForm />
        </div>
    )
}

export default SignIn