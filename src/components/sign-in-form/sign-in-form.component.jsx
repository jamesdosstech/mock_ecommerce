import { useState } from 'react';

import {useDispatch} from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

import './sign-in-form.styles.scss';

import {googleSignInStart, emailSignInStart} from '../../store/user/user.action'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignInForm = () => {
    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

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
            dispatch(emailSignInStart(email, password))          
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
        dispatch(googleSignInStart())
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
                <div className='buttons-container'>
                    <Button type='submit'>SIGN IN</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm