import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = () => {
    return(
        <Loader
           type='Oval'
           color='black'
           height={100}
           width={100}
        />
       );
};

export default Loading;