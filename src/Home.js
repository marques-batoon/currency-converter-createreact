import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';

class RateGetter extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            base: 'USD',
            conv: 'JPY',
            amount: '0',
            rates: [],
            error: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeConv = this.handleChangeConv.bind(this);
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchRates = this.switchRates.bind(this);
        
    }
    handleChange(event) {
        this.setState({ base: event.target.value });
    }
    handleChangeConv(event) {
        this.setState({ conv: event.target.value });
    }
    handleChangeAmount(event) {
        this.setState({ amount: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        let{ base, conv, amount } = this.state;
        fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
        .then(checkStatus)
        .then(json)
        .then(data => {
            if (data.rates) {
                console.log(data);
                this.setState({ rates: data.rates, error: ''});
                console.log(this.state.rates);
                console.log(this.state.rates.JPY);
            }
        })
        .catch((error) => {
            this.setState({ error: error.message });
            console.log(error);
        })

        console.log(base);
        console.log(this.state.conv);
        console.log(amount);
    }
    switchRates(event){
        console.log("Switch!");
    }


    render() {
        const {base, conv, amount, rates, error} = this.state;
        return(
            <div className="container">
            <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-12 col-md-6">
                        <label htmlFor="amount">Amount</label>
                        <input type="number" step="0.01" onChange={this.handleChangeAmount} className="form-control" id="amount" placeholder="0.0"></input>
                    </div>
                    <div className="form-group col-12 col-md-6">
                        <label htmlFor="baseCurrency">From</label>
                        <select value={base} onChange={this.handleChange} className="form-control" id="baseCurrency">
                            <option>USD</option>
                            <option>JPY</option>
                            <option>CAD</option>
                            <option>HKD</option>
                            <option>SGD</option>
                        </select>

                        <button type="button" onClick={this.switchRates} className="btn btn-secondary d-block mt-2" id="button">Switch</button>

                        <label htmlFor="convCurrency">To</label>
                        <select value={conv} onChange={this.handleChangeConv} className="form-control" id="convCurrency">
                            <option>JPY</option>
                            <option>USD</option>
                            <option>CAD</option>
                            <option>HKD</option>
                            <option>SGD</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary d-inline btn-lg" id="convertButton">Convert</button>
                </div>
            </form>
        </div>
        )
    }
}
export default RateGetter;