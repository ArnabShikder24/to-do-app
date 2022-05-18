import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const SignUp = () => {
    const [ createUserWithEmailAndPassword, user, loading, error ] = useCreateUserWithEmailAndPassword(auth);
    const [signInWithGoogle, userG, loadingG, errorG] = useSignInWithGoogle(auth);
    const [updateProfile] = useUpdateProfile(auth);
    const [match, setMatch] = useState('');

    //create user with email password
    const signUphandle = async e => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirm = e.target.confirm.value;
        if(password !== confirm) {
            setMatch('Password Not Match! Please try again');
            return
        }
        setMatch('');
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
    }

    //handle google signUp
    const hangleGoogleSignUp = () => {
        signInWithGoogle();
    }

    return (
        <div className='login text-center my-5'>
            <div>
                <h2>Sign Up</h2><div className='underline mb-4'></div>
                <form onSubmit={signUphandle}>
                    <input className='custom-width mb-3 p-2' type="text" name='name' placeholder='Name' required/><br />
                    <input className='custom-width mb-3 p-2' type="email" name='email' placeholder='Email' required/><br />
                    <input className='custom-width p-2 mb-3' type="password" name='password' placeholder='Password' required/><br />
                    <input className='custom-width p-2 mb-2' type="password" name='confirm' placeholder='Confirm Password' required/><br />
                    <p className='text-danger'>{match}</p>
                    <p className='text-danger'>{error && error.message}</p>
                    <p className='text-danger'>{errorG && errorG.message}</p>
                    <p>{loading && <Spinner animation="border" size="sm" />}</p>
                    <p>{loadingG && <Spinner animation="border" size="sm" />}</p>
                    <p className='text-success'>{user && 'Signup Successfull'}</p>
                    <p className='text-success'>{userG && 'Signup Successfull'}</p>
                    <input className='w-25 p-2' type="submit" value="Sign Up" />
                </form>
                <p className='mt-2 mb-0'>Already have an Account? <Link className='text-decoration-none' to='/login'>Login</Link></p>
                <div className='or'>
                    <div></div>
                    <p>or</p>
                    <div></div>
                </div>
                <button onClick={hangleGoogleSignUp} className='social-btn'><span>SignUp With Google</span></button>
            </div>
        </div>
    );
};

export default SignUp;