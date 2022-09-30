import { useState } from 'react';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const onHandleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value })
    }

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={() => {

            }}>
                <label>Display Name</label>
                <input type='text' onChange={onHandleChange} value={displayName} name='displayName' required/>

                <label>Email</label>
                <input type='email' onChange={onHandleChange} value={email} name='email' required/>

                <label>Password</label>
                <input type='password' onChange={onHandleChange} value={password} name='password' required/>

                <label>Confirm Password</label>
                <input type='password' onChange={onHandleChange} value={confirmPassword} name='confirmPassword' required/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default SignUpForm