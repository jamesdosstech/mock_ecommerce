import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';

import { signInWithGooglePopUp, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'

import { UserContext } from '../../context/user.context';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext)

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            resetFormFields();
            const { user } = await signInAuthUserWithEmailAndPassword(
                email, 
                password
            );
            setCurrentUser(user);
            
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('wrong password homie');
                    break;
                case 'auth/user-not-found':
                    alert('you aint in the sys homie');
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopUp();
        await createUserDocumentFromAuth(user);
    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Email"
                    type='email' 
                    onChange={handleChange} 
                    value={email} 
                    name='email' 
                    required
                />
                <FormInput 
                    label="Password"
                    type='password' 
                    onChange={handleChange} 
                    value={password} 
                    name='password' 
                    required
                />
                <div className='button-container'>
                    <Button type='submit'>Submit</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType='google'>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm