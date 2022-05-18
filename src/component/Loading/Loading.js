import React from 'react';
import './Loading.css'

const Loading = () => {
    return (
        <div className='d-flex align-items-center justify-content-center my-5 py-5'>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default Loading;