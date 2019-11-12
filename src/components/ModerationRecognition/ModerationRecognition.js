import React from 'react'

const ModerationRecognition = ({imageUrl}) => {
    return (
        <div className='center ma'>
            <div className='absolute'>
                <img alt='' src={imageUrl} width='500px' height='auto'/>
            </div> 
        </div>
    );
}

export default ModerationRecognition;