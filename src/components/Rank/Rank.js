import React from 'react'

const Rank = ({predRes}) => {
    return (
        <div>
            <div className='white f3'>
                {'Frank, your image is ...'}
            </div>
            <div className='white f1'>
                {predRes}
            </div>
        </div>
        
    );
}

export default Rank;
