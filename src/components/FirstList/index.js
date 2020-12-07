import React from 'react';

import './style.scss';

const FirstList = ({name, value, onClick}) => {
    let index = 0;
    let elements;

    if (name) {
            elements = name.map((item, id) => {
            return (
                <p key={id} > {item}: {value[index++]} </p>
            )
        })
    }

    return (
    <div className='Item_FirstList' onClick={onClick}>
        {elements}
    </div>)
};

export default FirstList;