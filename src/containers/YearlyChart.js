import React, {Component} from "react";
import {Bar} from 'react-chartjs-2';
import Aux from '../hoc/Aux';
import './SalesChart.css';
import {MONTHS, LABELS} from '../constants';

const legend = {
    display: true,
    position: 'right'
};

const options = {
    title:{
      display:true,
      text:'Monthly sales (in $)',
      fontSize:20
    },
    maintainAspectRatio: true,
}

class YearlyChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentCountry: "all",
            sales: []
        }
    }

    componentDidMount(){
        if(this.props.allData)
            this.addCountryToCompare("all");
    }

    componentDidUpdate(prevProps){
        if(this.props.allData !== prevProps.allData){
            this.addCountryToCompare(this.state.currentCountry);
        }
    }

    countryWiseSales(data){
        return MONTHS.map(month => {
            let totalMonthSales = 0;
            data.forEach(item =>{
                if(month in item)
                    totalMonthSales += item[month];
            })
            return totalMonthSales;
        })
    }

    addCountryToCompare = (value="all") => {
        let countryData = []
        if(value === "all")
            countryData = this.props.allData;
        else
            countryData = this.props.allData.filter(item => item["Country"] === value);
        let sales = this.countryWiseSales(countryData);
        this.setState({
            sales: sales,
            currentCountry: value
        })
    }


    comparisionHolder = (countries) => {
        return (
            <div style={{padding:"20px 20px 0px",display:"flex",justifyContent:"start"}}>
                <select style={{padding:"10px 20px"}} name="" ref='countries' value={this.state.currentCountry} onChange = {e => this.addCountryToCompare(e.target.value)}>
                    <option value="all">All Countries</option>
                    {
                        Array.isArray(countries) && countries.map((data, index)=>{
                            return <option key={index} value={data}>{data}</option>
                        })
                    }
                </select>
            </div>
        )
    }

    getListFromData = (key) => {
        let newList = [];
        if(this.props.allData)
            newList = this.props.allData.map(item => item[key] ? item[key]: "");
        return [...new Set(newList)];
    }

    
    render() {
        const countries = this.getListFromData('Country');
        const datasets = [
            {
                label: this.state.currentCountry,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: this.state.sales
            }
        ];
        
        const chartData = {
            labels: LABELS,
            datasets
        }
        return(
            <Aux>
                {this.comparisionHolder(countries)}
                <div className="competitors-chart-container">
                    <Bar data={chartData} legend={legend} options={options}/>
                </div>
            </Aux>
        )
    }
}

export default YearlyChart;
