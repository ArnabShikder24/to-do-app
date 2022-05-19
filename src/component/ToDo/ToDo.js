import React, {useState, useEffect} from 'react';

const ToDo = () => {
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        fetch('https://ancient-plateau-88249.herokuapp.com/todo')
        .then(res => res.json())
        .then(data => setTodo(data))
    }, [todo])

    const handleDelete = id => {
        const agree = window.confirm('Do you want to delete it?')
        if(agree) {
            fetch(`https://ancient-plateau-88249.herokuapp.com/todo/${id}`, {
                method: 'DELETE',
            })
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount > 0) {
                    const rest = todo.filter(a => a._id !== id);
                    setTodo(rest);
                }
            })
        }
    }

    const handleText = id => {
        const agree =  window.confirm('are you completed the task?')
        if(agree) {
            const update = {textDecoration: 'line-through'};

            fetch(`https://ancient-plateau-88249.herokuapp.com/todo/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(update)
            })
            .then(res => res.json())
            .thne(data =>  console.log(data))
        }
    }

    return (
        <div className='w-full mx-auto'>
            {
                todo.map(list => <div key={list._id} className='todo-card'>
                    <h4 style={{textDecoration: `${list.textDecoration}`}}>{list.name}</h4>
                    <p style={{textDecoration: `${list.textDecoration}`}}>{list.description}</p>
                    <button onClick={() => handleText(list._id)} className='btn btn-success'>complete</button>
                    <button onClick={() => handleDelete(list._id)} className='btn btn-danger'>X</button>
                    </div>
                )
            }
        </div>
    );
};

export default ToDo;