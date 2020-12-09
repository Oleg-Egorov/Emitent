import React from 'react';
import { isEmpty } from 'lodash';
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis, VictoryLabel } from "victory";

import './style.scss';

const SecondList = ({dividend, trading, onClick}) => {

    const elements = dividend.map(({currencyid, registryclosedate, value}, id) => {
        return (
            <div className='Item__Row' key={id}>
                <p> {registryclosedate}: </p>
                <p> {value} </p>
                <p> {currencyid} </p>
            </div>
        )
    });

    let arrayCoords = [];
    let week = 1;

    trading.forEach((el, id, arr) => {
        if (id % 5 === 0 && arr[id].OPEN && arr[id+4].CLOSE) {
            const priceChange = Number((arr[id+4].CLOSE * 100 / arr[id].OPEN - 100).toFixed(1));
            if (priceChange !== Infinity) {
                arrayCoords.push ({x: week++, y: priceChange});
            } else {
                arrayCoords.push ({x: week++, y: 0});
            }
        }
    });

    return (
        <React.Fragment>
            <div className='Item_SecondList' onClick={onClick}>
                <p>Транзакции</p>
                {isEmpty(dividend) ? 
                    <p>Нет информации!</p> : 
                    <React.Fragment>
                        <div className='Item__Row'>
                            <p>Дата</p>
                            <p>Стоимость</p>
                            <p>Валюта</p>
                        </div>
                        {elements}
                    </React.Fragment>
                }

                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={10}         
                >
                    <VictoryBar 
                        data={arrayCoords}
                        labels={({ datum }) => datum.y}
                        barRatio={0.9}
                        style={
                            { 
                                data: { fill: "skyblue", stroke: "midnightblue", strokeWidth: 1 }, 
                                labels: { fontSize: 8}
                            }
                        }
                    />

                    <VictoryAxis
                        tickFormat={date => date.toLocaleString("default", { month: "short" })}
                        style={{tickLabels: { fontSize: 10 }}}
                    />

                    <VictoryLabel
                        x={130}
                        y={330}
                        text="номер недели"
                    />

                    <VictoryAxis dependentAxis
                        label="изменение в процентах"
                        style={{axisLabel: {padding: 32, fontSize: 14, fontFamily: "Trebuchet MS"} }}
                    />

                </VictoryChart>
            </div>

            <p className='Item__OpenTxt'>Нажмите, чтобы скрыть</p>
    </React.Fragment>
    )
};

export default SecondList;