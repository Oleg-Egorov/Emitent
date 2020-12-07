import React, { Component } from 'react';
import axios from 'axios';

import './style.scss';
import Loading from '../Loading';
import Content from '../Content';

export default class App extends Component {

    state = {
        items: [
            { id: 0, corp: 'MTSS', fetchOnClick: false },
            { id: 1, corp: 'SBER', fetchOnClick: false },
            { id: 2, corp: 'YNDX', fetchOnClick: false }
        ]
    };

    fetchFirtList() {
        axios.all([
            axios.get(`https://iss.moex.com/iss/securities.json?q=MTSS`),
            axios.get(`https://iss.moex.com/iss/securities.json?q=SBER`),
            axios.get(`https://iss.moex.com/iss/securities.json?q=YNDX`)
        ])
            .then((body) => 
            {
                this.setState(prevState => ({
                        items: [
                            {...prevState.items[0], name: body[0].data.securities.columns, value: body[0].data.securities.data[0]},
                            {...prevState.items[1], name: body[1].data.securities.columns, value: body[1].data.securities.data[9]},
                            {...prevState.items[2], name: body[2].data.securities.columns, value: body[2].data.securities.data[0]}
                        ]
                    })
                );
            });
    };

    fetchSecondList = (id) => {        
        axios.all([
            axios.get(`http://iss.moex.com/iss/securities/${this.state.items[id].corp}/dividends.json?iss.json=extended`),
            axios.get(`http://iss.moex.com/iss/history/engines/stock/markets/shares/boards/TQBR/securities/${this.state.items[id].corp}.json?iss.json=extended&amp;from=2020-01-01`)    
        ])
        .then((body) =>
        {
            const divArray = body[0].data[1].dividends[1];
            const tradeArray = body[1].data[1].history[1];

            this.setState((state) => {
                const items = this.toggleProperty(state.items, id, divArray, tradeArray);
                return { items };
              });
        });
    };

    toggleProperty = (arr, id, dividend, trading) => {
        const idx = arr.findIndex((item) => item.id === id);
        const oldItem = arr[idx];
        const value = !oldItem.fetchOnClick;
    
        const item = { 
            ...arr[idx], 
            fetchOnClick: value,
            dividend: dividend, 
            trading: trading
         };
        return [
          ...arr.slice(0, idx),
          item,
          ...arr.slice(idx + 1)
        ];
    };

    componentDidMount() {
        this.fetchFirtList();
    };

    render () {
        return(
            <div className='App'>
                { this.state.items[0].name ? 
                    <Content 
                        onClick={this.fetchSecondList}
                        data={this.state.items}/>
                    : <Loading />
                }
            </div>
        )
    };
};