import React, { Component } from 'react';

import './style.scss';

export default class ErrorMessage extends Component {
    render() {
        return(
            <div className='Error'>
                <p className='Error__SmallText'>Ошибка</p>
            </div>
        );
    };
};