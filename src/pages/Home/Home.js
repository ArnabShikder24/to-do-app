import React from 'react';
import { toast } from 'react-toastify';
import ToDo from '../../component/ToDo/ToDo';
import {useAuthState} from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Home = () => {
    const [user] = useAuthState(auth);

    const addToDo = e => {
        e.preventDefault()
        const name = e.target.name.value;
        const description = e.target.des.value;
        const email = user?.email;
        const info = {
            name,
            description,
            email,
            textDecoration: 'none'
        }
        fetch('https://ancient-plateau-88249.herokuapp.com/todo', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            toast("Task Added")        
        })
    }

    return (
        <div className='d-flex justify-content-center my-5'>
            <div>
            <form onSubmit={addToDo}>
                <input className='to_do mb-3 p-2' type="text" name='name' placeholder='Name' required/><br />
                <textarea className='to_do_textarea p-2 mb-3' type="text" name='des' placeholder='Description' required/><br />
                <input className='to_do p-2' type="submit" value="Add" />
            </form>
            <hr />
            <div>
               <ToDo></ToDo> 
            </div>
            </div>
        </div>
    );
};

export default Home;