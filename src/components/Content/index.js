import React from 'react';

import './style.scss';
import FirstList from '../FirstList';
import SecondList from '../SecondList'

const Content = ({onClick, data}) => {
    const cards = data.map((item, id) => {
        return (
            <div className='Item' key={id}>
                <FirstList name={item.name} value={item.value} key={id} onClick={() => onClick(id)}/>
                {item.fetchOnClick ? 
                    <SecondList dividend={item.dividend} trading={item.trading} onClick={() => onClick(id)}/> 
                    : <p className='Item__OpenTxt'>Нажимите, чтобы развернуть</p>
                }
            </div>
        )
    });

    return (
    <div className='Content'>
        {cards}
    </div>
    );
};

export default Content;