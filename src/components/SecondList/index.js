import React from 'react';
// import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

import './style.scss';

const SecondList = ({dividend, trading, onClick}) => {
    const elements = dividend.map(({currenncyid, registryclosedate, value}, id) => {
        return (
            <p key={id}> {registryclosedate}: {value} {currenncyid} </p>
        )
    });

    let coords = 0;
    coords = trading.forEach((el, id, arr) => {
        if (id % 5 === 0) {
            return console.log([arr[id].OPEN, arr[id+4].CLOSE])
        }
    });

    console.log(coords)

    return (
        <React.Fragment>
            <div className='Item_SecondList' onClick={onClick}>
                <p>Транзакции</p>
                <p>Дата - Стоимость - Валюта</p>
                {elements}

                {/* {coords ? 
                    <XYPlot
                        width={350}
                        height={300}>
                        <HorizontalGridLines />
                        <LineSeries
                            data={coords}/>
                        <XAxis />
                        <YAxis />
                    </XYPlot> 
                    : null
                } */}
            </div>

            <p className='Item__OpenTxt'>Нажмите, чтобы скрыть</p>
    </React.Fragment>
    )
};

export default SecondList;