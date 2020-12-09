import React from 'react';

import './style.scss';

const FirstList = ({name, value, open, onClick}) => {
    let index = 0;
    let elements;
    let ClassFirstName = 'Item_FirstList'

    if (open) {
        ClassFirstName += ' open'
    } else {
        ClassFirstName = 'Item_FirstList'
    }

    if (name) {
            elements = name.map((item, id) => {
            return (
                <div className='Item__Row' key={id}>
                    <p> {item}: </p>
                    <p> {value[index++]} </p>
                </div>
            )
        })
    }

    return (
    <div className={ClassFirstName} onClick={onClick}>
        {elements}
    </div>)
};

export default FirstList;