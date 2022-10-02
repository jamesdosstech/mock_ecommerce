import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up-form.styles.scss';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

import { UserContext } from '../../context/user.context';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            await createUserDocumentFromAuth( user, { displayName });
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