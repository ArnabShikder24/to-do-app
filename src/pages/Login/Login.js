import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import './Login.css';

const Login = () => {
    const [ signInWithEmailAndPassword ,user, loading, error ] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, userG, loadingG, errorG] = useSignInWithGoogle(auth);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    if (user || userG) {
        navigate(from, {replace: true});
    }

    //login user with email password
    const logInHandle = async e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        await signInWithEmailAndPassword(email, password);
    }

    //google signin
    const handleGoogleLogin = () => {
        signInWithGoogle()
    }

    return (
        <div className='login text-center my-5'>
            <div>
                <h2>Login</h2><div className='underline mb-4'></div>
                <form onSubmit={logInHandle}>
                    <input className='custom-width mb-3 p-2' type="email" name='email' placeholder='Email' required/><br />
                    <input className='custom-width p-2 mb-3' type="password" name='password' placeholder='Password' required/><br />
                    <p className='text-danger'>{error && error.message}</p>
                    <p className='text-danger'>{errorG && errorG.message}</p>
                    <p>{loading && <Spinner animation="border" size="sm" />}</p>
                    <p>{loadingG && <Spinner animation="border" size="sm" />}</p>
                    <input className='w-25 p-2' type="submit" value="Login" />
                </form>
                <p className='m-0'>New in here? <Link className='text-decoration-none' to='/signup'>Create Account</Link></p>
                <div className='or'>
                    <div></div>
                    <p>or</p>
                    <div></div>
                </div>
                <button onClick={handleGoogleLogin} className='social-btn'><span>Login With Google</span></button>
            </div>
        </div>
    );
};

export default Login;