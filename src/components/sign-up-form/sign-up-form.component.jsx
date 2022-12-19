import { useState } from 'react';

import {useDispatch} from 'react-redux';

import {signUpStart} from '../../store/user/user.action'

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up-form.styles.scss';
 
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName))
            resetFormFields();
        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('cannot create user, email already in use')
            } else {
            console.log('user creation encountered an error ', error)
            }
        }
    }

    return (
        <div className='sign-up-container'>
            <h2>Dont have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name"
                    type='text' 
                    onChange={handleChange} 
                    value={displayName} 
                    name='displayName' 
                    required
                />
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
                <FormInput 
                    label="Confirm Password"
                    type='password' 
                    onChange={handleChange} 
                    value={confirmPassword} 
                    name='confirmPassword' 
                    required
                />
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}

export default SignUpForm